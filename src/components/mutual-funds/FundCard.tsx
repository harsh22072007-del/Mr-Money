"use client";

import React from "react";
import { MutualFundData } from "@/lib/market-data";
import { Repeat, ArrowUpRight } from "lucide-react";

interface FundCardProps {
  fund: MutualFundData;
  onInvest: (fund: MutualFundData, mode: "LUMP" | "SIP") => void;
}

export function FundCard({ fund, onInvest }: FundCardProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "Moderate":
        return "text-amber-700 bg-amber-50 border-amber-200";
      default:
        return "text-rose-700 bg-rose-50 border-rose-200";
    }
  };

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 space-y-4 shadow-sm flex flex-col justify-between transition-all">
      <div className="space-y-3">
        {/* Category & Risk Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
            {fund.category}
          </span>
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getRiskColor(
              fund.riskRating
            )}`}
          >
            {fund.riskRating} Risk
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
            {fund.schemeName}
          </h3>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">{fund.amc}</p>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2">{fund.description}</p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-center">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-sans">NAV</span>
            <span className="text-xs font-bold text-slate-900">₹{fund.nav.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-sans">3Y CAGR</span>
            <span className="text-xs font-bold text-emerald-600">+{fund.cagr3Y}%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-sans">Expense</span>
            <span className="text-xs font-bold text-slate-700">{fund.expenseRatio}%</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
        <button
          type="button"
          onClick={() => onInvest(fund, "LUMP")}
          className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
        >
          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
          Lump Sum
        </button>
        <button
          type="button"
          onClick={() => onInvest(fund, "SIP")}
          className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
        >
          <Repeat className="w-3.5 h-3.5" />
          Start SIP
        </button>
      </div>
    </div>
  );
}
