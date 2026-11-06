"use client";

import React, { useState, useEffect } from "react";
import { ALL_BADGES, calculateLevelFromXP, BadgeDefinition } from "@/lib/gamification";
import { MrMoneyMascot } from "@/components/mascot/MrMoneyMascot";
import {
  Award,
  Zap,
  Flame,
  CheckCircle2,
  Lock,
  Sparkles,
  ShieldAlert,
  TrendingUp,
  FileText,
  Briefcase,
  Layers,
  Repeat,
  Crown,
  PieChart,
} from "lucide-react";

export default function AchievementsPage() {
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const res = await fetch("/api/session");
        if (res.ok) {
          const json = await res.json();
          setSessionData(json);
        }
      } catch (e) {
        console.error("Error loading achievements:", e);
      }
    };
    loadSession();
  }, []);

  const progress = sessionData?.progress;
  const userXP = progress?.xp || 25;
  const userCoins = progress?.coins || 100;
  const streakDays = progress?.streakDays || 1;
  const userBadges = sessionData?.badges || [];

  const levelInfo = calculateLevelFromXP(userXP);

  const getBadgeIcon = (iconName: string, isUnlocked: boolean) => {
    const colorClass = isUnlocked ? "" : "opacity-40 grayscale";

    switch (iconName) {
      case "award":
        return <Award className={`w-6 h-6 text-amber-500 ${colorClass}`} />;
      case "trending-up":
        return <TrendingUp className={`w-6 h-6 text-emerald-600 ${colorClass}`} />;
      case "zap":
        return <Zap className={`w-6 h-6 text-amber-500 fill-amber-500 ${colorClass}`} />;
      case "shield-alert":
        return <ShieldAlert className={`w-6 h-6 text-rose-500 ${colorClass}`} />;
      case "file-text":
        return <FileText className={`w-6 h-6 text-emerald-600 ${colorClass}`} />;
      case "briefcase":
        return <Briefcase className={`w-6 h-6 text-blue-600 ${colorClass}`} />;
      case "layers":
        return <Layers className={`w-6 h-6 text-purple-600 ${colorClass}`} />;
      case "repeat":
        return <Repeat className={`w-6 h-6 text-teal-600 ${colorClass}`} />;
      case "crown":
        return <Crown className={`w-6 h-6 text-amber-500 fill-amber-500 ${colorClass}`} />;
      case "pie-chart":
        return <PieChart className={`w-6 h-6 text-indigo-600 ${colorClass}`} />;
      default:
        return <Sparkles className={`w-6 h-6 text-amber-500 ${colorClass}`} />;
    }
  };

  const unlockedCount = ALL_BADGES.filter((b) => userXP >= b.requiredXP).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Mentor Header */}
      <MrMoneyMascot
        quote="Achievements are locked until you prove your financial mettle! Complete Academy lessons, pass the quizzes, and earn XP points to unlock these badges."
        mood="mentor"
      />

      {/* Level Banner Card */}
      <div className="p-6 md:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Current Rank & Mastery
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">{levelInfo.levelTitle}</h2>
            <p className="text-xs text-slate-600">
              Badges are strictly unlocked via XP points earned through Academy quizzes.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Total XP</span>
              <span className="text-2xl font-black font-mono text-amber-700">{userXP} XP</span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Reward Coins
              </span>
              <span className="text-2xl font-black font-mono text-emerald-700">
                🪙 {userCoins}
              </span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Streak</span>
              <span className="text-2xl font-black font-mono text-orange-600 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 fill-orange-500 text-orange-500" />
                {streakDays}d
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar towards Next Level */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-600">
            <span>Progress to Next Rank</span>
            <span className="font-mono text-amber-800 font-bold">
              {userXP} / {levelInfo.nextLevelXP} XP ({levelInfo.progressPercent}%)
            </span>
          </div>
          <div className="h-3 w-full bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
            <div
              style={{ width: `${Math.max(5, levelInfo.progressPercent)}%` }}
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Achievements Showcase (XP Locked)
            </h3>
            <p className="text-xs text-slate-500">
              {unlockedCount} of {ALL_BADGES.length} Badges Unlocked with Current XP
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = userXP >= badge.requiredXP;
            const progressPercent = Math.min(100, Math.round((userXP / badge.requiredXP) * 100));
            const xpRemaining = Math.max(0, badge.requiredXP - userXP);

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? "bg-white border-amber-300 ring-1 ring-amber-400/30 shadow-sm"
                    : "bg-slate-50/70 border-slate-200 opacity-80"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                        isUnlocked
                          ? "bg-amber-50 border-amber-200 shadow-xs"
                          : "bg-slate-100 border-slate-200"
                      }`}
                    >
                      {getBadgeIcon(badge.icon, isUnlocked)}
                    </div>

                    {isUnlocked ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Unlocked
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600 border border-slate-300 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        {badge.requiredXP} XP
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      {badge.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-200 space-y-2">
                  {isUnlocked ? (
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-mono">{badge.category}</span>
                      <span className="text-emerald-700 font-mono text-[10px] font-semibold">
                        Unlocked at {badge.requiredXP} XP
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>XP Progress</span>
                        <span>
                          {userXP} / {badge.requiredXP} XP ({progressPercent}%)
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${progressPercent}%` }}
                          className="h-full bg-slate-400 rounded-full"
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 block italic">
                        Earn {xpRemaining} more XP in Academy to unlock
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
