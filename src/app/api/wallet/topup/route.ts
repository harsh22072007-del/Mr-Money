import { NextResponse } from "next/server";
import { getOrCreateSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { recordTransaction } from "@/lib/ledger";

export async function POST(req: Request) {
  try {
    const session = await getOrCreateSession();
    if (!session.wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    const body = await req.json();
    const { amount } = body;
    const depositAmount = Number(amount);

    if (!depositAmount || depositAmount < 100 || depositAmount > 10000000) {
      return NextResponse.json(
        { error: "Invalid top-up amount. Must be between ₹100 and ₹1,00,00,000." },
        { status: 400 }
      );
    }

    const walletId = session.wallet.id;

    const result = await prisma.$transaction(async (tx) => {
      return await recordTransaction(tx, {
        walletId,
        amount: depositAmount,
        type: "TOP_UP",
        description: `Added ₹${depositAmount.toLocaleString("en-IN")} virtual capital to wallet`,
      });
    });

    return NextResponse.json({
      success: true,
      newBalance: result.wallet.balance,
      message: `Successfully added ₹${depositAmount.toLocaleString("en-IN")} to your virtual wallet!`,
    });
  } catch (error: any) {
    console.error("Wallet top-up error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
