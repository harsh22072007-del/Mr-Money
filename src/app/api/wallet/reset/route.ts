import { NextResponse } from "next/server";
import { getOrCreateSession, INITIAL_CAPITAL } from "@/lib/session";
import { prisma } from "@/lib/db";

export async function POST() {
  try {
    const session = await getOrCreateSession();
    if (!session.wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    const walletId = session.wallet.id;

    await prisma.$transaction(async (tx) => {
      // 1. Calculate final portfolio value for historical archive
      const stockHoldings = await tx.stockHolding.findMany({ where: { walletId } });
      const mfHoldings = await tx.mutualFundHolding.findMany({ where: { walletId } });

      const stockVal = stockHoldings.reduce((sum, h) => sum + h.currentPrice * h.quantity, 0);
      const mfVal = mfHoldings.reduce((sum, m) => sum + m.currentNav * m.units, 0);
      const finalPortfolioValue = Number((session.wallet!.balance + stockVal + mfVal).toFixed(2));

      // 2. Create archive record
      await tx.portfolioArchive.create({
        data: {
          sessionId: session.id,
          finalPortfolioValue,
          realizedPnL: session.wallet!.realizedPnL,
          summary: JSON.stringify({
            cash: session.wallet!.balance,
            stocksCount: stockHoldings.length,
            mfCount: mfHoldings.length,
            realizedPnL: session.wallet!.realizedPnL,
          }),
        },
      });

      // 3. Delete existing holdings and pending orders
      await tx.stockHolding.deleteMany({ where: { walletId } });
      await tx.mutualFundHolding.deleteMany({ where: { walletId } });
      await tx.stockOrder.deleteMany({ where: { walletId, status: "PENDING" } });

      // 4. Reset wallet balance and realized P&L
      await tx.virtualWallet.update({
        where: { id: walletId },
        data: {
          balance: INITIAL_CAPITAL,
          investedValue: 0,
          realizedPnL: 0,
        },
      });

      // 5. Append ledger entry for audit trail
      await tx.walletLedger.create({
        data: {
          walletId,
          amount: INITIAL_CAPITAL - session.wallet!.balance,
          balanceAfter: INITIAL_CAPITAL,
          type: "RESET",
          description: `Portfolio archived & wallet reset to fresh ₹${INITIAL_CAPITAL.toLocaleString("en-IN")}`,
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: `Wallet successfully reset to ₹${INITIAL_CAPITAL.toLocaleString("en-IN")}! Previous portfolio archived.`,
    });
  } catch (error: any) {
    console.error("Wallet reset error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
