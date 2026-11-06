import { NextResponse } from "next/server";
import { getOrCreateSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { recordTransaction } from "@/lib/ledger";
import { getStock } from "@/lib/market-data";

export async function GET() {
  try {
    const session = await getOrCreateSession();
    if (!session.wallet) {
      return NextResponse.json({ error: "No wallet found" }, { status: 404 });
    }

    const orders = await prisma.stockOrder.findMany({
      where: { walletId: session.wallet.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getOrCreateSession();
    if (!session.wallet) {
      return NextResponse.json({ error: "No wallet found" }, { status: 404 });
    }

    const body = await req.json();
    const { symbol, side, type = "MARKET", quantity, price } = body;

    if (!symbol || !side || !quantity || quantity <= 0) {
      return NextResponse.json(
        { error: "Invalid order parameters. Quantity must be greater than 0." },
        { status: 400 }
      );
    }

    const stock = getStock(symbol);
    if (!stock) {
      return NextResponse.json(
        { error: `Stock symbol ${symbol} not found in NIFTY 50 universe.` },
        { status: 404 }
      );
    }

    const walletId = session.wallet.id;
    const numQty = Math.floor(Number(quantity));

    // Slippage simulation: +/- 0.05%
    const slippageFactor = side === "BUY" ? 1.0005 : 0.9995;
    const baseExecutionPrice = type === "MARKET" ? stock.currentPrice : Number(price) || stock.currentPrice;
    const executedPrice = Number((baseExecutionPrice * slippageFactor).toFixed(2));
    const totalTradeValue = Number((executedPrice * numQty).toFixed(2));

    // Handle Limit orders that aren't immediately executable
    if (type === "LIMIT") {
      const limitPrice = Number(price);
      const isSatisfied =
        side === "BUY" ? stock.currentPrice <= limitPrice : stock.currentPrice >= limitPrice;

      if (!isSatisfied) {
        // Queue as PENDING limit order
        const pendingOrder = await prisma.stockOrder.create({
          data: {
            walletId,
            symbol: stock.symbol,
            name: stock.name,
            side,
            type: "LIMIT",
            quantity: numQty,
            price: limitPrice,
            status: "PENDING",
          },
        });

        return NextResponse.json({
          success: true,
          status: "PENDING",
          message: `Limit order placed! Queued until ${stock.symbol} hits ₹${limitPrice.toLocaleString("en-IN")}.`,
          order: pendingOrder,
        });
      }
    }

    // Immediate Execution via Transaction
    const result = await prisma.$transaction(async (tx) => {
      if (side === "BUY") {
        // Verify balance
        const currentWallet = await tx.virtualWallet.findUnique({ where: { id: walletId } });
        if (!currentWallet || currentWallet.balance < totalTradeValue) {
          throw new Error(
            `Insufficient funds! Order requires ₹${totalTradeValue.toLocaleString(
              "en-IN"
            )}, but available cash is ₹${(currentWallet?.balance || 0).toLocaleString("en-IN")}.`
          );
        }

        // Debit cash in ledger
        await recordTransaction(tx, {
          walletId,
          amount: -totalTradeValue,
          type: "STOCK_BUY",
          description: `Bought ${numQty} shares of ${stock.symbol} @ ₹${executedPrice.toLocaleString("en-IN")}`,
        });

        // Create or update stock holding
        const existingHolding = await tx.stockHolding.findUnique({
          where: { walletId_symbol: { walletId, symbol: stock.symbol } },
        });

        if (existingHolding) {
          const totalNewQty = existingHolding.quantity + numQty;
          const weightedAvgPrice = Number(
            (
              (existingHolding.quantity * existingHolding.averagePrice + totalTradeValue) /
              totalNewQty
            ).toFixed(2)
          );

          await tx.stockHolding.update({
            where: { id: existingHolding.id },
            data: {
              quantity: totalNewQty,
              averagePrice: weightedAvgPrice,
              currentPrice: stock.currentPrice,
            },
          });
        } else {
          await tx.stockHolding.create({
            data: {
              walletId,
              symbol: stock.symbol,
              name: stock.name,
              quantity: numQty,
              averagePrice: executedPrice,
              currentPrice: stock.currentPrice,
            },
          });
        }

        // Create filled order
        const order = await tx.stockOrder.create({
          data: {
            walletId,
            symbol: stock.symbol,
            name: stock.name,
            side: "BUY",
            type,
            quantity: numQty,
            price: baseExecutionPrice,
            executedPrice,
            status: "FILLED",
            executedAt: new Date(),
          },
        });

        // Award badge: FIRST_TRADE
        const existingBadge = await tx.userBadge.findUnique({
          where: { sessionId_badgeId: { sessionId: session.id, badgeId: "FIRST_TRADE" } },
        });
        if (!existingBadge) {
          await tx.userBadge.create({
            data: {
              sessionId: session.id,
              badgeId: "FIRST_TRADE",
              title: "First Market Execution",
              description: "Executed your first trade in Mr. Money Market Arena!",
              icon: "trending-up",
            },
          });
          // Also grant bonus XP
          await tx.userProgress.update({
            where: { sessionId: session.id },
            data: { xp: { increment: 25 }, coins: { increment: 20 } },
          });
        }

        return order;
      } else {
        // SELL
        const holding = await tx.stockHolding.findUnique({
          where: { walletId_symbol: { walletId, symbol: stock.symbol } },
        });

        if (!holding || holding.quantity < numQty) {
          throw new Error(
            `Insufficient shares! You own ${holding?.quantity || 0} shares of ${stock.symbol}, but attempted to sell ${numQty}.`
          );
        }

        const realizedTradePnL = Number(((executedPrice - holding.averagePrice) * numQty).toFixed(2));

        // Credit cash via ledger
        await recordTransaction(tx, {
          walletId,
          amount: totalTradeValue,
          type: "STOCK_SELL",
          description: `Sold ${numQty} shares of ${stock.symbol} @ ₹${executedPrice.toLocaleString("en-IN")}`,
        });

        // Update wallet realized PnL
        await tx.virtualWallet.update({
          where: { id: walletId },
          data: {
            realizedPnL: { increment: realizedTradePnL },
          },
        });

        // Update holding
        if (holding.quantity === numQty) {
          await tx.stockHolding.delete({ where: { id: holding.id } });
        } else {
          await tx.stockHolding.update({
            where: { id: holding.id },
            data: {
              quantity: holding.quantity - numQty,
              currentPrice: stock.currentPrice,
            },
          });
        }

        // Create filled order
        const order = await tx.stockOrder.create({
          data: {
            walletId,
            symbol: stock.symbol,
            name: stock.name,
            side: "SELL",
            type,
            quantity: numQty,
            price: baseExecutionPrice,
            executedPrice,
            status: "FILLED",
            executedAt: new Date(),
          },
        });

        return order;
      }
    });

    return NextResponse.json({
      success: true,
      status: "FILLED",
      message: `Order Executed! ${side} ${numQty} ${stock.symbol} @ ₹${executedPrice.toLocaleString("en-IN")}`,
      order: result,
    });
  } catch (error: any) {
    console.error("Order POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
