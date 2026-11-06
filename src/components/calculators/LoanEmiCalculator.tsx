"use client";

import React, { useState } from "react";
import { ShieldAlert, TrendingDown, CheckCircle2 } from "lucide-react";

export function LoanEmiCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // 50 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.75); // 8.75%
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [monthlyPrepayment, setMonthlyPrepayment] = useState<number>(5000);

  const r = interestRate / 100 / 12;
  const n = tenureYears * 12;

  const baseEmi =
    r > 0 ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loanAmount / n;
  const totalBasePayment = baseEmi * n;
  const totalBaseInterest = totalBasePayment - loanAmount;

  let balance = loanAmount;
  let monthsWithPrepay = 0;
  let totalInterestWithPrepay = 0;
  const totalMonthlyOutflow = baseEmi + monthlyPrepayment;

  while (balance > 0 && monthsWithPrepay < n) {
    const monthlyInterest = balance * r;
    totalInterestWithPrepay += monthlyInterest;
    const principalPaid = totalMonthlyOutflow - monthlyInterest;

    balance -= principalPaid;
    monthsWithPrepay++;
    if (balance <= 0) break;
  }

  const interestSaved = Math.max(0, totalBaseInterest - totalInterestWithPrepay);
  const monthsSaved = Math.max(0, n - monthsWithPrepay);
  const yearsSaved = (monthsSaved / 12).toFixed(1);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            Loan EMI & Prepayment Freedom Simulator
          </h3>
          <p className="text-xs text-slate-500">
            Learn why voluntary principal prepayments destroy bank interest charges
          </p>
        </div>
        <div className="px-3 py-1 bg-rose-50 border border-rose-200 rounded-full text-xs font-mono text-rose-700 self-start sm:self-auto font-semibold">
          Avoid the Debt Trap
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-4">
          {/* Loan Amount */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700 font-medium">Principal Loan Amount</span>
              <span className="font-mono font-bold text-slate-900 text-base">
                ₹{loanAmount.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={15000000}
              step={100000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-rose-500 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹1 Lakh</span>
              <span>₹50 Lakhs</span>
              <span>₹1.5 Crores</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700 font-medium">Interest Rate (p.a.)</span>
              <span className="font-mono font-bold text-amber-700 text-base">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={7}
              max={18}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>7% (Govt / Prime)</span>
              <span>8.75% (Home Loan)</span>
              <span>18% (Personal Loan)</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700 font-medium">Loan Tenure</span>
              <span className="font-mono font-bold text-blue-700 text-base">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-blue-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Prepayment Slider */}
          <div className="space-y-1.5 pt-2 border-t border-slate-200">
            <div className="flex justify-between items-center text-sm">
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Extra Monthly Prepayment
              </span>
              <span className="font-mono font-bold text-emerald-700 text-base">
                +₹{monthlyPrepayment.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={50000}
              step={1000}
              value={monthlyPrepayment}
              onChange={(e) => setMonthlyPrepayment(Number(e.target.value))}
              className="w-full accent-emerald-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Prepaying even ₹2,000 to ₹5,000 directly slashes your principal balance.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-3 bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Monthly EMI
              </span>
              <div className="text-xl font-bold font-mono text-slate-900">
                ₹{Math.round(baseEmi).toLocaleString("en-IN")}
              </div>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1 shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Total Base Interest
              </span>
              <div className="text-xl font-bold font-mono text-rose-600">
                ₹{Math.round(totalBaseInterest).toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          {/* Prepayment Impact Card */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <TrendingDown className="w-4 h-4 text-emerald-600" />
              Prepayment Power Impact:
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-[11px] text-slate-600">Interest Saved:</span>
                <div className="text-lg font-extrabold font-mono text-emerald-700">
                  ₹{Math.round(interestSaved).toLocaleString("en-IN")}
                </div>
              </div>
              <div>
                <span className="text-[11px] text-slate-600">Time Shaved Off:</span>
                <div className="text-lg font-extrabold font-mono text-amber-700">
                  {yearsSaved} Years
                </div>
              </div>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed pt-1">
              By prepaying ₹{monthlyPrepayment.toLocaleString("en-IN")}/mo, you pay off your loan in{" "}
              <strong>{(monthsWithPrepay / 12).toFixed(1)} years</strong> instead of {tenureYears} years!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
