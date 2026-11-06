"use client";

import React, { useState } from "react";
import { AcademyChapter, QuizQuestion } from "@/lib/academy-content";
import { X, CheckCircle, AlertCircle, Zap, Award, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface QuizModalProps {
  chapter: AcademyChapter;
  onClose: () => void;
  onSuccess: (xpEarned: number, newBadge: any) => void;
}

export function QuizModal({ chapter, onClose, onSuccess }: QuizModalProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const question: QuizQuestion = chapter.quiz[currentIdx];
  const isCorrect = selectedOption === question.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    if (idx === question.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < chapter.quiz.length) {
      setCurrentIdx((i) => i + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setQuizFinished(true);

    try {
      const res = await fetch("/api/academy/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapterId: chapter.id,
          quizScore: score + (isCorrect ? 1 : 0),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (e) {}

        setTimeout(() => {
          onSuccess(data.xpEarned || chapter.xpReward, data.newBadge);
        }, 1800);
      }
    } catch (e) {
      console.error("Quiz submission error:", e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg border border-amber-200">
              <Zap className="w-4 h-4 fill-amber-500" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Knowledge Check</h3>
              <p className="text-[11px] text-slate-500">
                Question {currentIdx + 1} of {chapter.quiz.length} • +{chapter.xpReward} XP Reward
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!quizFinished ? (
          <div className="space-y-4">
            {/* Question title */}
            <h4 className="text-base font-semibold text-slate-900 leading-snug">
              {question.question}
            </h4>

            {/* Options list */}
            <div className="space-y-2">
              {question.options.map((option, idx) => {
                let btnStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";

                if (hasAnswered) {
                  if (idx === question.correctIndex) {
                    btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold ring-1 ring-emerald-500";
                  } else if (idx === selectedOption) {
                    btnStyle = "bg-rose-50 border-rose-500 text-rose-800 ring-1 ring-rose-500";
                  } else {
                    btnStyle = "opacity-40 bg-slate-50 border-slate-200 text-slate-400";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={hasAnswered}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {hasAnswered && idx === question.correctIndex && (
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    )}
                    {hasAnswered && idx === selectedOption && idx !== question.correctIndex && (
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mr. Money Feedback message */}
            {hasAnswered && (
              <div
                className={`p-4 rounded-xl border text-xs space-y-1.5 animate-in fade-in ${
                  isCorrect
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-rose-50 border-rose-200 text-rose-900"
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  <span>🧐 Mr. Money says:</span>
                  <span>{question.mrMoneyFeedback}</span>
                </div>
                <p className="text-slate-700 font-normal">{question.explanation}</p>
              </div>
            )}

            {/* Next button */}
            {hasAnswered && (
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
              >
                {currentIdx + 1 < chapter.quiz.length ? "Next Question →" : "Complete Chapter Assessment"}
              </button>
            )}
          </div>
        ) : (
          /* Finished summary */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-0.5 mx-auto">
              <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center shadow-xs">
                <Sparkles className="w-8 h-8 text-amber-500 animate-bounce" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900">Chapter Mastered!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You scored {score} of {chapter.quiz.length}. Mr. Money has awarded you +{chapter.xpReward} XP!
            </p>

            {chapter.badgeReward && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-800">
                <Award className="w-4 h-4 text-amber-600" />
                Badge Unlocked: {chapter.badgeReward}
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              Continue Learning
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
