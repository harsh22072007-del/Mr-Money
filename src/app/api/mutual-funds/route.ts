import { NextResponse } from "next/server";
import { getOrCreateSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { recordTransaction } from "@/lib/ledger";
import { getMutualFund, MUTUAL_FUNDS_DATA } from "@/lib/market-data";

export async function GET() {
  try {
    const session = await getOrCreateSession();
    const holdings = session.wallet?.mfHoldings || [];
    const sips = session.wallet?.sipSchedules || [];

    return NextResponse.json({
      funds: MUTUAL_FUNDS_DATA,
      holdings,
      sips,
    });
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
    const { action, schemeCode, amount } = body;

    const fund = getMutualFund(schemeCode);
    if (!fund) {
      return NextResponse.json({ error: "Mutual fund scheme not found." }, { status: 404 });
    }

    const walletId = session.wallet.id;

    if (action === "SETUP_SIP") {
      const sipAmount = Number(amount);
      if (!sipAmount || sipAmount < fund.minSip) {
        return NextResponse.json(
          { error: `Minimum SIP amount for this scheme is ₹${fund.minSip.toLocaleString("en-IN")}.` },
          { status: 400 }
        );
      }

      const sip = await prisma.sipSchedule.create({
        data: {
          walletId,
          schemeCode: fund.schemeCode,
          schemeName: fund.schemeName,
          monthlyAmount: sipAmount,
          frequency: "MONTHLY",
          status: "ACTIVE",
          dayOfMonth: 5,
        },
      });

      // Award SIP_WARRIOR badge
      const existingBadge = await prisma.userBadge.findUnique({
        where: { sessionId_badgeId: { sessionId: session.id, badgeId: "SIP_WARRIOR" } },
      });
      if (!existingBadge) {
        await prisma.userBadge.create({
          data: {
            sessionId: session.id,
            badgeId: "SIP_WARRIOR",
            title: "Disciplined Wealth Builder",
            description: "Started your first automated SIP in Mr. Money!",
            icon: "repeat",
          },
        });
        await prisma.userProgress.update({
          where: { sessionId: session.id },
          data: { xp: { increment: 30 }, coins: { increment: 25 } },
        });
      }

      return NextResponse.json({
        success: true,
        message: `SIP of ₹${sipAmount.toLocaleString("en-IN")}/month activated for ${fund.schemeName}!`,
        sip,
      });
    }

    // Default: BUY_LUMP
    const lumpAmount = Number(amount);
    if (!lumpAmount || lumpAmount < fund.minLumpSum) {
      return NextResponse.json(
        { error: `Minimum lump-sum investment is ₹${fund.minLumpSum.toLocaleString("en-IN")}.` },
        { status: 400 }
      );
    }

    const unitsPurchased = Number((lumpAmount / fund.nav).toFixed(3));

    const result = await prisma.$transaction(async (tx) => {
      // Check cash balance
      const currentWallet = await tx.virtualWallet.findUnique({ where: { id: walletId } });
      if (!currentWallet || currentWallet.balance < lumpAmount) {
        throw new Error(
          `Insufficient funds! Investment requires ₹${lumpAmount.toLocaleString(
            "en-IN"
          )}, but available cash is ₹${(currentWallet?.balance || 0).toLocaleString("en-IN")}.`
        );
      }

      // Debit ledger
      await recordTransaction(tx, {
        walletId,
        amount: -lumpAmount,
        type: "MF_BUY",
        description: `Invested ₹${lumpAmount.toLocaleString("en-IN")} in ${fund.schemeName} (Allotted ${unitsPurchased} units @ NAV ₹${fund.nav})`,
      });

      // Update or create MF holding
      const existing = await tx.mutualFundHolding.findUnique({
        where: { walletId_schemeCode: { walletId, schemeCode: fund.schemeCode } },
      });

      if (existing) {
        const totalUnits = Number((existing.units + unitsPurchased).toFixed(3));
        const totalInvested = Number((existing.investedAmount + lumpAmount).toFixed(2));
        const avgNav = Number((totalInvested / totalUnits).toFixed(2));

        await tx.mutualFundHolding.update({
          where: { id: existing.id },
          data: {
            units: totalUnits,
            investedAmount: totalInvested,
            averageNav: avgNav,
            currentNav: fund.nav,
          },
        });
      } else {
        await tx.mutualFundHolding.create({
          data: {
            walletId,
            schemeCode: fund.schemeCode,
            schemeName: fund.schemeName,
            category: fund.category,
            units: unitsPurchased,
            averageNav: fund.nav,
            currentNav: fund.nav,
            investedAmount: lumpAmount,
          },
        });
      }

      // Check diversification badge (if user has both stocks and mutual funds)
      const stockCount = await tx.stockHolding.count({ where: { walletId } });
      if (stockCount > 0) {
        const divBadge = await tx.userBadge.findUnique({
          where: { sessionId_badgeId: { sessionId: session.id, badgeId: "DIVERSIFICATION_PRO" } },
        });
        if (!divBadge) {
          await tx.userBadge.create({
            data: {
              sessionId: session.id,
              badgeId: "DIVERSIFICATION_PRO",
              title: "Prudent Asset Allocator",
              description: "Holds both direct equities and diversified mutual funds!",
              icon: "layers",
            },
          });
          await tx.userProgress.update({
            where: { sessionId: session.id },
            data: { xp: { increment: 40 }, coins: { increment: 30 } },
          });
        }
      }

      return { unitsPurchased, lumpAmount };
    });

    return NextResponse.json({
      success: true,
      message: `Successfully invested ₹${result.lumpAmount.toLocaleString(
        "en-IN"
      )}! Allotted ${result.unitsPurchased} units @ NAV ₹${fund.nav}`,
    });
  } catch (error: any) {
    console.error("Mutual Fund POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getOrCreateSession();
    if (!session.wallet) {
      return NextResponse.json({ error: "No wallet found" }, { status: 404 });
    }

    const body = await req.json();
    const { schemeCode, unitsToRedeem } = body;

    const fund = getMutualFund(schemeCode);
    if (!fund) {
      return NextResponse.json({ error: "Mutual fund not found" }, { status: 404 });
    }

    const walletId = session.wallet.id;
    const units = Number(unitsToRedeem);

    if (!units || units <= 0) {
      return NextResponse.json({ error: "Invalid units to redeem" }, { status: 400 });
    }

    const result = await prisma.$transaction(async (tx) => {
      const holding = await tx.mutualFundHolding.findUnique({
        where: { walletId_schemeCode: { walletId, schemeCode } },
      });

      if (!holding || holding.units < units) {
        throw new Error(
          `Insufficient units! You own ${holding?.units.toFixed(3) || "0"} units, attempted to redeem ${units}.`
        );
      }

      const redemptionValue = Number((units * fund.nav).toFixed(2));

      // Credit cash via ledger
      await recordTransaction(tx, {
        walletId,
        amount: redemptionValue,
        type: "MF_SELL",
        description: `Redeemed ${units} units of ${fund.schemeName} @ NAV ₹${fund.nav}`,
      });

      const remainingUnits = Number((holding.units - units).toFixed(3));

      if (remainingUnits < 0.001) {
        await tx.mutualFundHolding.delete({ where: { id: holding.id } });
      } else {
        const remainingInvested = Number(((holding.investedAmount / holding.units) * remainingUnits).toFixed(2));
        await tx.mutualFundHolding.update({
          where: { id: holding.id },
          data: {
            units: remainingUnits,
            investedAmount: remainingInvested,
            currentNav: fund.nav,
          },
        });
      }

      return { redemptionValue };
    });

    return NextResponse.json({
      success: true,
      message: `Redeemed ${units} units! ₹${result.redemptionValue.toLocaleString("en-IN")} credited to your wallet.`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
