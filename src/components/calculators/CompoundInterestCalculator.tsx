"use client";

import React, { useState } from "react";
import { Sparkles, Info } from "lucide-react";

export function CompoundInterestCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [annualRate, setAnnualRate] = useState<number>(12);
  const [years, setYears] = useState<number>(15);

  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  const totalInvested = monthlyInvestment * totalMonths;
  const futureValue =
    monthlyRate > 0
      ? monthlyInvestment *
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
        (1 + monthlyRate)
      : totalInvested;

  const totalInterestGained = Math.max(0, futureValue - totalInvested);

  const inflationRate = 0.06;
  const inflationAdjustedValue = futureValue / Math.pow(1 + inflationRate, years);

  const ruleOf72Years = annualRate > 0 ? (72 / annualRate).toFixed(1) : "N/A";

  const investedPercent = futureValue > 0 ? (totalInvested / futureValue) * 100 : 100;
  const gainPercent = 100 - investedPercent;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Compound Interest & SIP Calculator
          </h3>
          <p className="text-xs text-slate-500">
            Witness how small monthly investments balloon into generational wealth over time
          </p>
        </div>
        <div className="px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-mono text-amber-800 self-start sm:self-auto font-semibold">
          Rule of 72: Doubles in {ruleOf72Years} yrs
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Sliders */}
        <div className="lg:col-span-6 space-y-5">
          {/* Monthly Investment */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700 font-medium">Monthly Investment</span>
              <span className="font-mono font-bold text-emerald-700 text-base">
                ₹{monthlyInvestment.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={100000}
              step={500}
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full accent-emerald-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹500</span>
              <span>₹50,000</span>
              <span>₹1,00,000</span>
            </div>
          </div>

          {/* Expected Return Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700 font-medium">Expected Return Rate (p.a.)</span>
              <span className="font-mono font-bold text-amber-700 text-base">{annualRate}%</span>
            </div>
            <input
              type="range"
              min={4}
              max={25}
              step={0.5}
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>4% (FD / Debt)</span>
              <span>12% (NIFTY 50)</span>
              <span>25% (High Alpha)</span>
            </div>
          </div>

          {/* Time Horizon */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700 font-medium">Investment Horizon</span>
              <span className="font-mono font-bold text-blue-700 text-base">{years} Years</span>
            </div>
            <input
              type="range"
              min={1}
              max={35}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-blue-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>35 Years</span>
            </div>
          </div>
        </div>

        {/* Output Cards */}
        <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
              Expected Maturity Value
            </span>
            <div className="text-3xl font-extrabold font-mono text-emerald-700 tracking-tight">
              ₹{Math.round(futureValue).toLocaleString("en-IN")}
            </div>
          </div>

          {/* Visual Ratio Bar */}
          <div className="space-y-1.5">
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${investedPercent}%` }}
                className="bg-slate-400 transition-all duration-300"
                title={`Invested: ${investedPercent.toFixed(1)}%`}
              />
              <div
                style={{ width: `${gainPercent}%` }}
                className="bg-emerald-500 transition-all duration-300"
                title={`Wealth Gained: ${gainPercent.toFixed(1)}%`}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                Invested: ₹{Math.round(totalInvested).toLocaleString("en-IN")} (
                {investedPercent.toFixed(0)}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Interest: ₹{Math.round(totalInterestGained).toLocaleString("en-IN")} (
                {gainPercent.toFixed(0)}%)
              </span>
            </div>
          </div>

          {/* Inflation warning metric */}
          <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs shadow-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <Info className="w-4 h-4 text-blue-500" />
              <span>Real Purchasing Power (at 6% Inflation):</span>
            </div>
            <span className="font-mono font-bold text-slate-800">
              ₹{Math.round(inflationAdjustedValue).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
