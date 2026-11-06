"use client";

import React, { useState } from "react";
import { PieChart, TrendingUp, AlertCircle } from "lucide-react";

export function BusinessMarginCalculator() {
  const [revenue, setRevenue] = useState<number>(10000000); // 1 Crore
  const [cogsPercent, setCogsPercent] = useState<number>(45); // 45% Cost of Goods Sold
  const [opexPercent, setOpexPercent] = useState<number>(30); // 30% Salaries & Marketing
  const [depreciationTaxPercent, setDepreciationTaxPercent] = useState<number>(10);

  const cogs = (revenue * cogsPercent) / 100;
  const grossProfit = revenue - cogs;
  const grossMargin = (grossProfit / revenue) * 100;

  const opex = (revenue * opexPercent) / 100;
  const ebitda = grossProfit - opex;
  const ebitdaMargin = (ebitda / revenue) * 100;

  const depTax = (revenue * depreciationTaxPercent) / 100;
  const netProfit = ebitda - depTax;
  const netMargin = (netProfit / revenue) * 100;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-indigo-600" />
            Unit Economics & Profit Margin Waterfall
          </h3>
          <p className="text-xs text-slate-500">
            See how top-line Revenue shrinks into Gross Profit, EBITDA, and bottom-line Net Profit
          </p>
        </div>
        <div className="px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-mono text-indigo-700 self-start sm:self-auto font-semibold">
          Financial Intelligence Sim
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Sliders */}
        <div className="lg:col-span-6 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700 font-medium">Annual Revenue</span>
              <span className="font-mono font-bold text-slate-900 text-base">
                ₹{(revenue / 10000000).toFixed(2)} Crore
              </span>
            </div>
            <input
              type="range"
              min={1000000}
              max={50000000}
              step={1000000}
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full accent-indigo-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700 font-medium">Cost of Goods Sold (COGS)</span>
              <span className="font-mono font-bold text-slate-700 text-base">{cogsPercent}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              step={1}
              value={cogsPercent}
              onChange={(e) => setCogsPercent(Number(e.target.value))}
              className="w-full accent-slate-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Direct raw materials, manufacturing & inventory costs.</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700 font-medium">Operating Expenses (OPEX)</span>
              <span className="font-mono font-bold text-slate-700 text-base">{opexPercent}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={1}
              value={opexPercent}
              onChange={(e) => setOpexPercent(Number(e.target.value))}
              className="w-full accent-slate-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Salaries, tech servers, marketing, office rent.</p>
          </div>
        </div>

        {/* Waterfall Outcome */}
        <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
          <div className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded-xl">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Gross Profit</span>
              <span className="text-base font-bold font-mono text-slate-900">
                ₹{Math.round(grossProfit).toLocaleString("en-IN")}
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
              {grossMargin.toFixed(1)}% Margin
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded-xl">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Operating EBITDA</span>
              <span className="text-base font-bold font-mono text-slate-900">
                ₹{Math.round(ebitda).toLocaleString("en-IN")}
              </span>
            </div>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
              ebitda >= 0 ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-rose-700 bg-rose-50 border-rose-200"
            }`}>
              {ebitdaMargin.toFixed(1)}% EBITDA
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded-xl">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Net Profit (Bottom Line)</span>
              <span className={`text-lg font-black font-mono ${netProfit >= 0 ? "text-emerald-700" : "text-rose-600"}`}>
                ₹{Math.round(netProfit).toLocaleString("en-IN")}
              </span>
            </div>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
              netMargin >= 0 ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-rose-700 bg-rose-50 border-rose-200"
            }`}>
              {netMargin.toFixed(1)}% Net Margin
            </span>
          </div>

          <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">
            <strong>Key Takeaway:</strong> A company can have ₹100 Crores in revenue, but if COGS and OPEX consume 95%, Net Profit is only ₹5 Crores. High-margin businesses create the most shareholder value!
          </p>
        </div>
      </div>
    </div>
  );
}
