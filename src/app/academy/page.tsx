"use client";

import React, { useState, useEffect } from "react";
import { ACADEMY_LEVELS, CHAPTERS_DATA, AcademyChapter } from "@/lib/academy-content";
import { MrMoneyMascot } from "@/components/mascot/MrMoneyMascot";
import { CompoundInterestCalculator } from "@/components/calculators/CompoundInterestCalculator";
import { LoanEmiCalculator } from "@/components/calculators/LoanEmiCalculator";
import { IncomeTaxCalculator } from "@/components/calculators/IncomeTaxCalculator";
import { CapitalRaiseSimulator } from "@/components/calculators/CapitalRaiseSimulator";
import { BusinessMarginCalculator } from "@/components/calculators/BusinessMarginCalculator";
import { PositionSizingCalculator } from "@/components/calculators/PositionSizingCalculator";
import { QuizModal } from "@/components/academy/QuizModal";
import {
  Lock,
  CheckCircle2,
  Zap,
  Clock,
  Sparkles,
  ArrowRight,
  Unlock,
  ShieldCheck,
} from "lucide-react";

export default function AcademyPage() {
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);
  const [userXP, setUserXP] = useState(25);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [activeQuizChapter, setActiveQuizChapter] = useState<AcademyChapter | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  const fetchProgress = async () => {
    try {
      const res = await fetch("/api/session");
      if (res.ok) {
        const data = await res.json();
        if (data.progress) {
          setUserXP(data.progress.xp);
          setCompletedChapters(JSON.parse(data.progress.completedLessons || "[]"));
        }
      }
    } catch (e) {
      console.error("Error fetching academy progress:", e);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const currentLevelConfig = ACADEMY_LEVELS.find((l) => l.level === activeLevel)!;
  const levelChapters = CHAPTERS_DATA.filter((c) => c.level === activeLevel);

  useEffect(() => {
    if (!levelChapters.length) return;

    const unlockedChapters = levelChapters.filter(
      (chapter, index) => index === 0 || completedChapters.includes(levelChapters[index - 1].id)
    );

    const nextSelected =
      unlockedChapters.find((chapter) => chapter.id === selectedChapterId) ??
      unlockedChapters[unlockedChapters.length - 1] ??
      levelChapters[0];

    setSelectedChapterId(nextSelected.id);
  }, [activeLevel, completedChapters, levelChapters, selectedChapterId]);

  const activeChapter =
    levelChapters.find((chapter) => chapter.id === selectedChapterId) ?? levelChapters[0] ?? null;

  const handleQuizSuccess = (xpEarned: number, newBadge: any) => {
    fetchProgress();
    setActiveQuizChapter(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Mentor Greeting */}
      <MrMoneyMascot
        quote="Welcome to sequential learning! Each chapter builds on the previous one. Study the concept, try the practical calculator, and pass the quiz to unlock the next chapter."
        mood="mentor"
      />

      {/* Academy Level Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ACADEMY_LEVELS.map((lvl) => {
          const isSelected = activeLevel === lvl.level;

          return (
            <div
              key={lvl.level}
              onClick={() => setActiveLevel(lvl.level as 1 | 2 | 3)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? "bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                  : "bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Level {lvl.level}
                </span>
                <span className="flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  <Unlock className="w-3 h-3 text-emerald-600" />
                  Active Level
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1.5">{lvl.title}</h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {lvl.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Active Level Header */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700">
              Sequential Mastery Mode
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-mono">
              Complete quiz to unlock next chapter
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">{currentLevelConfig.title}</h2>
          <p className="text-xs text-slate-600 max-w-2xl">{currentLevelConfig.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">
              Your Current XP
            </span>
            <span className="text-base font-black font-mono text-amber-700">{userXP} XP</span>
          </div>
        </div>
      </div>

      {/* Sequential Chapters List */}
      <div className="grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-6">
        <aside className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Chapter path
              </p>
              <h3 className="text-lg font-black text-slate-900">{currentLevelConfig.title}</h3>
            </div>
            <div className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-1 text-[10px] font-bold text-emerald-700">
              {levelChapters.length} chapters
            </div>
          </div>

          <div className="space-y-2">
            {levelChapters.map((chapter, index) => {
              const isUnlocked = index === 0 || completedChapters.includes(levelChapters[index - 1].id);
              const isCompleted = completedChapters.includes(chapter.id);
              const isSelected = activeChapter?.id === chapter.id;

              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => isUnlocked && setSelectedChapterId(chapter.id)}
                  disabled={!isUnlocked}
                  className={`w-full text-left rounded-2xl border p-3 transition-all ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 shadow-sm"
                      : isUnlocked
                        ? "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                        : "border-dashed border-slate-200 bg-slate-50 opacity-80"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black font-mono ${
                          isCompleted
                            ? "bg-emerald-600 text-white"
                            : isUnlocked
                              ? "bg-slate-900 text-white"
                              : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : chapter.chapterNumber}
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">{chapter.title}</p>
                        <p className="text-[10px] text-slate-500">{chapter.estimatedMinutes} mins</p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : !isUnlocked ? (
                        <Lock className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="space-y-6">
          {activeChapter && (() => {
            const chapterIndex = levelChapters.findIndex((chapter) => chapter.id === activeChapter.id);
            const isUnlocked = chapterIndex === 0 || completedChapters.includes(levelChapters[chapterIndex - 1].id);
            const isCompleted = completedChapters.includes(activeChapter.id);

            if (!isUnlocked) {
              return (
                <div className="bg-slate-50/80 border border-slate-200 border-dashed rounded-3xl p-6 md:p-8 shadow-xs">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-700">Chapter locked</h3>
                      <p className="text-xs text-slate-500">Complete the previous chapter to continue.</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white border border-slate-200 rounded-2xl text-xs text-slate-600">
                    <strong className="text-slate-800">Next unlock:</strong> finish the preceding chapter and pass its quiz.
                  </div>
                </div>
              );
            }

            return (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center font-black font-mono text-emerald-700">
                      {activeChapter.chapterNumber}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-900">{activeChapter.title}</h3>
                      <p className="text-xs text-slate-500">{activeChapter.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{activeChapter.estimatedMinutes} mins</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-lg text-xs font-bold text-amber-800">
                      <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>+{activeChapter.xpReward} XP</span>
                    </div>

                    {isCompleted && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-bold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-sm text-slate-700 leading-relaxed font-normal">
                  {activeChapter.conceptIntro}
                </div>

                <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-2xl flex items-start gap-3">
                  <div className="text-2xl select-none">🧐</div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                      Mr. Money's Golden Rule
                    </span>
                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      "{activeChapter.mrMoneyQuote}"
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Key Financial Mechanisms
                  </h4>
                  <ul className="text-xs text-slate-700 space-y-2">
                    {activeChapter.deepDive.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    🇮🇳 Indian Real-World Case Study
                  </span>
                  <h5 className="text-sm font-bold text-slate-900">{activeChapter.realWorldExample.title}</h5>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {activeChapter.realWorldExample.description}
                  </p>
                </div>

                {activeChapter.interactiveType === "interest_calc" && <CompoundInterestCalculator />}
                {activeChapter.interactiveType === "emi_calc" && <LoanEmiCalculator />}
                {activeChapter.interactiveType === "tax_calc" && <IncomeTaxCalculator />}
                {activeChapter.interactiveType === "margin_calc" && <BusinessMarginCalculator />}
                {activeChapter.interactiveType === "capital_raise_sim" && <CapitalRaiseSimulator />}
                {activeChapter.interactiveType === "position_sizing_calc" && <PositionSizingCalculator />}

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveQuizChapter(activeChapter)}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>
                      {isCompleted
                        ? "Re-take Knowledge Quiz"
                        : "Complete Quiz to Unlock Next Chapter"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Quiz Modal */}
      {activeQuizChapter && (
        <QuizModal
          chapter={activeQuizChapter}
          onClose={() => setActiveQuizChapter(null)}
          onSuccess={handleQuizSuccess}
        />
      )}
    </div>
  );
}
