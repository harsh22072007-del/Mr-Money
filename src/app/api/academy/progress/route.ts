import { NextResponse } from "next/server";
import { getOrCreateSession } from "@/lib/session";
import { prisma } from "@/lib/db";
import { CHAPTERS_DATA } from "@/lib/academy-content";
import { ALL_BADGES } from "@/lib/gamification";

export async function POST(req: Request) {
  try {
    const session = await getOrCreateSession();
    const body = await req.json();
    const { chapterId } = body;

    const chapter = CHAPTERS_DATA.find((c) => c.id === chapterId);
    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    const currentProgress = session.progress;
    const completedList: string[] = JSON.parse(currentProgress?.completedLessons || "[]");

    const isAlreadyCompleted = completedList.includes(chapterId);

    if (isAlreadyCompleted) {
      return NextResponse.json({
        success: true,
        alreadyCompleted: true,
        message: "Chapter already completed previously.",
        progress: currentProgress,
      });
    }

    completedList.push(chapterId);

    const xpEarned = chapter.xpReward;
    const newXP = (currentProgress?.xp || 0) + xpEarned;
    const newCoins = (currentProgress?.coins || 0) + 25;

    // Determine unlocked level
    let unlockedLevel = currentProgress?.unlockedLevel || 1;
    if (newXP >= 250 && unlockedLevel < 3) {
      unlockedLevel = 3;
    } else if (newXP >= 100 && unlockedLevel < 2) {
      unlockedLevel = 2;
    }

    const updatedProgress = await prisma.userProgress.update({
      where: { sessionId: session.id },
      data: {
        xp: newXP,
        coins: newCoins,
        completedLessons: JSON.stringify(completedList),
        unlockedLevel,
        lastActiveDate: new Date(),
      },
    });

    // Check all badges unlockable by XP points
    const eligibleBadges = ALL_BADGES.filter((b) => newXP >= b.requiredXP);
    let newlyAwardedBadge = null;

    for (const b of eligibleBadges) {
      const existing = await prisma.userBadge.findUnique({
        where: { sessionId_badgeId: { sessionId: session.id, badgeId: b.id } },
      });

      if (!existing) {
        const created = await prisma.userBadge.create({
          data: {
            sessionId: session.id,
            badgeId: b.id,
            title: b.title,
            description: b.description,
            icon: b.icon,
          },
        });
        if (b.id === chapter.badgeReward || !newlyAwardedBadge) {
          newlyAwardedBadge = created;
        }
      }
    }

    return NextResponse.json({
      success: true,
      xpEarned,
      coinsEarned: 25,
      newBadge: newlyAwardedBadge,
      progress: updatedProgress,
      message: `Completed "${chapter.title}"! Earned +${xpEarned} XP!`,
    });
  } catch (error: any) {
    console.error("Academy progress POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
