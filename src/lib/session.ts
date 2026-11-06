import { cookies } from "next/headers";
import { prisma } from "./db";
import crypto from "crypto";

export const SESSION_COOKIE = "mr_money_session";
export const INITIAL_CAPITAL = 100000.0;

export async function getSessionToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);
  return sessionCookie?.value || null;
}

export async function getOrCreateSession(tokenOverride?: string) {
  let token = tokenOverride || (await getSessionToken());

  if (token) {
    const existing = await prisma.demoSession.findUnique({
      where: { sessionToken: token },
      include: {
        wallet: {
          include: {
            holdings: true,
            mfHoldings: true,
            sipSchedules: true,
            orders: {
              orderBy: { createdAt: "desc" },
              take: 20,
            },
            ledgerEntries: {
              orderBy: { createdAt: "desc" },
              take: 25,
            },
          },
        },
        progress: true,
        badges: true,
      },
    });

    if (existing) {
      return existing;
    }
  }

  // Create fresh session if not found or token absent
  const newToken = crypto.randomUUID();

  const newSession = await prisma.$transaction(async (tx) => {
    const session = await tx.demoSession.create({
      data: {
        sessionToken: newToken,
        displayName: "Guest Investor",
      },
    });

    const wallet = await tx.virtualWallet.create({
      data: {
        sessionId: session.id,
        balance: INITIAL_CAPITAL,
      },
    });

    await tx.walletLedger.create({
      data: {
        walletId: wallet.id,
        amount: INITIAL_CAPITAL,
        balanceAfter: INITIAL_CAPITAL,
        type: "INITIAL_GRANT",
        description: "Initial Virtual Seed Capital ₹1,00,000 granted for Market Arena",
      },
    });

    await tx.userProgress.create({
      data: {
        sessionId: session.id,
        xp: 25, // bonus starting XP
        coins: 100,
        unlockedLevel: 1,
        completedLessons: "[]",
        completedQuizzes: "[]",
      },
    });

    // Award welcome badge
    await tx.userBadge.create({
      data: {
        sessionId: session.id,
        badgeId: "WELCOME_TRADER",
        title: "Welcome to Dalal Street",
        description: "Started your financial literacy journey on Mr. Money",
        icon: "award",
      },
    });

    return session;
  });

  // Re-fetch fully populated session
  const populated = await prisma.demoSession.findUnique({
    where: { id: newSession.id },
    include: {
      wallet: {
        include: {
          holdings: true,
          mfHoldings: true,
          sipSchedules: true,
          orders: {
            orderBy: { createdAt: "desc" },
            take: 20,
          },
          ledgerEntries: {
            orderBy: { createdAt: "desc" },
            take: 25,
          },
        },
      },
      progress: true,
      badges: true,
    },
  });

  return populated!;
}
