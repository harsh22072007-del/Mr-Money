import { NextResponse } from "next/server";
import { getOrCreateSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { STOCKS_DATA, MUTUAL_FUNDS_DATA } from "@/lib/market-data";

export async function GET() {
  try {
    const session = await getOrCreateSession();

    // Recompute live invested value and total net worth
    let stockHoldingsValue = 0;
    let mfHoldingsValue = 0;

    const enrichedHoldings = (session.wallet?.holdings || []).map((h) => {
      const liveStock = STOCKS_DATA.find((s) => s.symbol === h.symbol);
      const currentPrice = liveStock ? liveStock.currentPrice : h.currentPrice;
      const currentVal = currentPrice * h.quantity;
      const investedVal = h.averagePrice * h.quantity;
      const pnl = currentVal - investedVal;
      const pnlPercent = (pnl / investedVal) * 100;
      stockHoldingsValue += currentVal;

      return {
        ...h,
        currentPrice,
        currentValue: Number(currentVal.toFixed(2)),
        investedValue: Number(investedVal.toFixed(2)),
        pnl: Number(pnl.toFixed(2)),
        pnlPercent: Number(pnlPercent.toFixed(2)),
      };
    });

    const enrichedMfHoldings = (session.wallet?.mfHoldings || []).map((mfh) => {
      const liveMf = MUTUAL_FUNDS_DATA.find((m) => m.schemeCode === mfh.schemeCode);
      const currentNav = liveMf ? liveMf.nav : mfh.currentNav;
      const currentVal = currentNav * mfh.units;
      const pnl = currentVal - mfh.investedAmount;
      const pnlPercent = mfh.investedAmount > 0 ? (pnl / mfh.investedAmount) * 100 : 0;
      mfHoldingsValue += currentVal;

      return {
        ...mfh,
        currentNav,
        currentValue: Number(currentVal.toFixed(2)),
        pnl: Number(pnl.toFixed(2)),
        pnlPercent: Number(pnlPercent.toFixed(2)),
      };
    });

    const cashBalance = session.wallet?.balance || 0;
    const totalNetWorth = Number((cashBalance + stockHoldingsValue + mfHoldingsValue).toFixed(2));
    const totalInvested = Number(
      (
        enrichedHoldings.reduce((acc, h) => acc + h.investedValue, 0) +
        enrichedMfHoldings.reduce((acc, m) => acc + m.investedAmount, 0)
      ).toFixed(2)
    );
    const totalUnrealizedPnL = Number((totalNetWorth - (cashBalance + totalInvested)).toFixed(2));

    const response = NextResponse.json({
      session: {
        id: session.id,
        displayName: session.displayName,
      },
      wallet: {
        id: session.wallet?.id,
        balance: session.wallet?.balance,
        stockHoldingsValue: Number(stockHoldingsValue.toFixed(2)),
        mfHoldingsValue: Number(mfHoldingsValue.toFixed(2)),
        totalInvested,
        totalNetWorth,
        unrealizedPnL: totalUnrealizedPnL,
        realizedPnL: session.wallet?.realizedPnL || 0,
        holdings: enrichedHoldings,
        mfHoldings: enrichedMfHoldings,
        sipSchedules: session.wallet?.sipSchedules || [],
        orders: session.wallet?.orders || [],
        ledgerEntries: session.wallet?.ledgerEntries || [],
      },
      progress: session.progress,
      badges: session.badges,
    });

    // Ensure session cookie is set
    response.cookies.set("mr_money_session", session.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Session GET error:", error);
    return NextResponse.json(
      { error: "Failed to initialize guest session: " + error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getOrCreateSession();
    const body = await req.json();
    const { displayName } = body;

    if (!displayName || typeof displayName !== "string") {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    const updated = await prisma.demoSession.update({
      where: { id: session.id },
      data: { displayName: displayName.trim().slice(0, 30) },
    });

    return NextResponse.json({ success: true, displayName: updated.displayName });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
