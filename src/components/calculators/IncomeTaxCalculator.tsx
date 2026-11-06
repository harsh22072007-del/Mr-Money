"use client";

import React, { useState } from "react";
import { FileText, CheckCircle2 } from "lucide-react";

export function IncomeTaxCalculator() {
  const [grossSalary, setGrossSalary] = useState<number>(950000); // 9.5 Lakhs
  const [sec80C, setSec80C] = useState<number>(150000); // Max 1.5L
  const [sec80D, setSec80D] = useState<number>(25000); // Health insurance
  const [hra, setHra] = useState<number>(60000); // HRA exemption

  // --- NEW REGIME (AY 2026-27) ---
  const standardDeductionNew = 75000;
  const taxableIncomeNew = Math.max(0, grossSalary - standardDeductionNew);

  let taxNewBeforeRebate = 0;
  if (taxableIncomeNew > 1500000) {
    taxNewBeforeRebate =
      400000 * 0.05 + 300000 * 0.1 + 200000 * 0.15 + 300000 * 0.2 + (taxableIncomeNew - 1500000) * 0.3;
  } else if (taxableIncomeNew > 1200000) {
    taxNewBeforeRebate = 400000 * 0.05 + 300000 * 0.1 + 200000 * 0.15 + (taxableIncomeNew - 1200000) * 0.2;
  } else if (taxableIncomeNew > 1000000) {
    taxNewBeforeRebate = 400000 * 0.05 + 300000 * 0.1 + (taxableIncomeNew - 1000000) * 0.15;
  } else if (taxableIncomeNew > 700000) {
    taxNewBeforeRebate = 400000 * 0.05 + (taxableIncomeNew - 700000) * 0.1;
  } else if (taxableIncomeNew > 300000) {
    taxNewBeforeRebate = (taxableIncomeNew - 300000) * 0.05;
  }

  const rebate87ANew = taxableIncomeNew <= 700000 ? taxNewBeforeRebate : 0;
  const netTaxNewBeforeCess = Math.max(0, taxNewBeforeRebate - rebate87ANew);
  const totalTaxNew = Math.round(netTaxNewBeforeCess * 1.04); // 4% cess

  // --- OLD REGIME ---
  const standardDeductionOld = 50000;
  const totalDeductionsOld = standardDeductionOld + Math.min(150000, sec80C) + sec80D + hra;
  const taxableIncomeOld = Math.max(0, grossSalary - totalDeductionsOld);

  let taxOldBeforeRebate = 0;
  if (taxableIncomeOld > 1000000) {
    taxOldBeforeRebate = 250000 * 0.05 + 500000 * 0.2 + (taxableIncomeOld - 1000000) * 0.3;
  } else if (taxableIncomeOld > 500000) {
    taxOldBeforeRebate = 250000 * 0.05 + (taxableIncomeOld - 500000) * 0.2;
  } else if (taxableIncomeOld > 250000) {
    taxOldBeforeRebate = (taxableIncomeOld - 250000) * 0.05;
  }

  const rebate87AOld = taxableIncomeOld <= 500000 ? Math.min(12500, taxOldBeforeRebate) : 0;
  const netTaxOldBeforeCess = Math.max(0, taxOldBeforeRebate - rebate87AOld);
  const totalTaxOld = Math.round(netTaxOldBeforeCess * 1.04);

  const diff = totalTaxOld - totalTaxNew;
  const isNewBetter = diff >= 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            Income Tax Simulator (Assessment Year 2026-27)
          </h3>
          <p className="text-xs text-slate-500">
            Compare New Tax Regime (Default) vs Old Tax Regime with live slab calculations
          </p>
        </div>
        <div className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-mono text-emerald-800 self-start sm:self-auto font-semibold">
          FY 2025-26 • AY 2026-27 Rules
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Salary & Deductions Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700 font-medium">Gross Annual Salary (CTC)</span>
              <span className="font-mono font-bold text-emerald-700 text-base">
                ₹{grossSalary.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min={300000}
              max={3000000}
              step={25000}
              value={grossSalary}
              onChange={(e) => setGrossSalary(Number(e.target.value))}
              className="w-full accent-emerald-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹3 Lakhs</span>
              <span>₹15 Lakhs</span>
              <span>₹30 Lakhs</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Old Regime Deductions (Ignored in New Regime)
            </span>

            {/* 80C */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Section 80C (PPF, ELSS, EPF, LIC)</span>
                <span className="font-mono text-slate-800 font-semibold">
                  ₹{sec80C.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={150000}
                step={5000}
                value={sec80C}
                onChange={(e) => setSec80C(Number(e.target.value))}
                className="w-full accent-slate-500 bg-slate-200 h-1.5 rounded cursor-pointer"
              />
            </div>

            {/* 80D */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Section 80D (Health Insurance)</span>
                <span className="font-mono text-slate-800 font-semibold">
                  ₹{sec80D.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={50000}
                step={2500}
                value={sec80D}
                onChange={(e) => setSec80D(Number(e.target.value))}
                className="w-full accent-slate-500 bg-slate-200 h-1.5 rounded cursor-pointer"
              />
            </div>

            {/* HRA */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">HRA Exemption Claimed</span>
                <span className="font-mono text-slate-800 font-semibold">
                  ₹{hra.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={250000}
                step={10000}
                value={hra}
                onChange={(e) => setHra(Number(e.target.value))}
                className="w-full accent-slate-500 bg-slate-200 h-1.5 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Side-by-side Regime Comparison */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* New Regime Card */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                isNewBetter
                  ? "bg-emerald-50/50 border-emerald-300 shadow-sm ring-1 ring-emerald-500/20"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase text-emerald-800">New Regime</span>
                {isNewBetter && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                    Recommended
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] text-slate-500 block">Std. Deduction</span>
                  <span className="text-xs font-mono text-slate-700">₹75,000</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Taxable Income</span>
                  <span className="text-xs font-mono text-slate-700 font-semibold">
                    ₹{taxableIncomeNew.toLocaleString("en-IN")}
                  </span>
                </div>
                {rebate87ANew > 0 && (
                  <div>
                    <span className="text-[10px] text-emerald-700 block font-semibold">
                      Sec 87A Rebate
                    </span>
                    <span className="text-xs font-mono text-emerald-700 font-bold">
                      -₹{Math.round(rebate87ANew).toLocaleString("en-IN")} (Zero Tax)
                    </span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] text-slate-500 block font-medium">Total Tax</span>
                  <div className="text-xl font-black font-mono text-emerald-700">
                    ₹{totalTaxNew.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>

            {/* Old Regime Card */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                !isNewBetter
                  ? "bg-emerald-50/50 border-emerald-300 shadow-sm ring-1 ring-emerald-500/20"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase text-blue-700">Old Regime</span>
                {!isNewBetter && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                    Recommended
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] text-slate-500 block">Total Deductions</span>
                  <span className="text-xs font-mono text-slate-700">
                    ₹{totalDeductionsOld.toLocaleString("en-IN")}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Taxable Income</span>
                  <span className="text-xs font-mono text-slate-700 font-semibold">
                    ₹{taxableIncomeOld.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] text-slate-500 block font-medium">Total Tax</span>
                  <div className="text-xl font-black font-mono text-slate-900">
                    ₹{totalTaxOld.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verdict Alert */}
          <div
            className={`p-3 rounded-xl border flex items-center gap-3 text-xs ${
              isNewBetter
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
            <div>
              <strong>
                {isNewBetter ? "New Tax Regime Wins!" : "Old Tax Regime Wins!"}
              </strong>{" "}
              You save{" "}
              <span className="font-mono font-bold underline">
                ₹{Math.abs(diff).toLocaleString("en-IN")}
              </span>{" "}
              in taxes by selecting the {isNewBetter ? "New" : "Old"} regime for AY 2026-27.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
