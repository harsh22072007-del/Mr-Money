"use client";

import React from "react";
import { Sparkles, HelpCircle, AlertTriangle, Lightbulb } from "lucide-react";

interface MrMoneyMascotProps {
  quote?: string;
  mood?: "mentor" | "excited" | "thinking" | "warning";
  compact?: boolean;
}

export function MrMoneyMascot({
  quote = "Smart investing is not about getting rich overnight — it's about compounding your wealth steadily and never losing sleep!",
  mood = "mentor",
  compact = false,
}: MrMoneyMascotProps) {
  const getMoodIcon = () => {
    switch (mood) {
      case "excited":
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case "thinking":
        return <HelpCircle className="w-4 h-4 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      default:
        return <Lightbulb className="w-4 h-4 text-emerald-600" />;
    }
  };

  const getMoodBadge = () => {
    switch (mood) {
      case "excited":
        return "Mr. Money Celebrates!";
      case "thinking":
        return "Mr. Money Ponders...";
      case "warning":
        return "Mr. Money Advises Caution";
      default:
        return "Mr. Money's Pro Tip";
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-500 p-0.5">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-black text-amber-600 text-sm">
            ₹M
          </div>
        </div>
        <p className="text-xs text-slate-700 italic leading-snug">{quote}</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 p-4 md:p-5 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Mascot Avatar */}
      <div className="relative flex-shrink-0">
        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-500 p-0.5 shadow-sm">
          <div className="w-full h-full bg-white rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
            {/* Mascot face graphic */}
            <div className="text-2xl select-none">🧐</div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 font-mono mt-0.5">
              Mr. Money
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full border border-slate-200 shadow-xs">
          {getMoodIcon()}
        </div>
      </div>

      {/* Speech content */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-wide uppercase text-amber-700 flex items-center gap-1.5">
            {getMoodIcon()}
            {getMoodBadge()}
          </span>
          <span className="text-[11px] text-slate-500 font-mono">• Financial Mentor</span>
        </div>
        <p className="text-sm md:text-base text-slate-800 leading-relaxed font-sans font-medium">
          "{quote}"
        </p>
      </div>
    </div>
  );
}
