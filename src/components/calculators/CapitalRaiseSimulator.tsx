"use client";

import React, { useState } from "react";
import { Briefcase, Building2, RefreshCw } from "lucide-react";

export function CapitalRaiseSimulator() {
  const [chosenMode, setChosenMode] = useState<"equity" | "debt" | null>(null);
  const [marketScenario, setMarketScenario] = useState<"boom" | "slump">("slump");
  const [hasSimulated, setHasSimulated] = useState<boolean>(false);

  const handleSimulate = (mode: "equity" | "debt") => {
    setChosenMode(mode);
    setHasSimulated(true);
  };

  const handleReset = () => {
    setChosenMode(null);
    setHasSimulated(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Founder's Dilemma: Equity vs Debt Capital Raise
          </h3>
          <p className="text-xs text-slate-500">
            You are the founder of VoltSpeed (EV Battery Tech). You need ₹5 Crores to expand production.
          </p>
        </div>
        <div className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-mono text-blue-700 self-start sm:self-auto font-semibold">
          Corporate Finance Sim
        </div>
      </div>

      {!hasSimulated ? (
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <h4 className="text-sm font-semibold text-slate-800">The Startup Situation:</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your company has patented an indigenous fast-charging battery. Demand is soaring, but your
              current workshop is maxed out. You urgently require{" "}
              <strong className="text-slate-900">₹5,00,00,000 (₹5 Crores)</strong> to lease an automated
              facility in Pune. Two term sheets lie on your desk:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option 1: Equity */}
            <div className="p-5 bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-2xl space-y-4 transition-all shadow-xs">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                <Building2 className="w-5 h-5 text-blue-600" />
                Option A: Venture Capital Equity
              </div>
              <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside">
                <li>Raise ₹5 Crores for <strong>25% equity ownership</strong>.</li>
                <li>Post-money valuation: ₹20 Crores.</li>
                <li><strong>No monthly repayments or interest</strong>.</li>
                <li>VC takes a board seat and shares voting power.</li>
              </ul>
              <button
                type="button"
                onClick={() => handleSimulate("equity")}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
              >
                Choose Equity (Sell 25% Shares)
              </button>
            </div>

            {/* Option 2: Debt */}
            <div className="p-5 bg-slate-50 border border-slate-200 hover:border-amber-400 rounded-2xl space-y-4 transition-all shadow-xs">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                <Briefcase className="w-5 h-5 text-amber-600" />
                Option B: Bank Term Loan (Debt)
              </div>
              <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside">
                <li>Borrow ₹5 Crores at <strong>11% interest p.a.</strong> (5-year tenure).</li>
                <li>Retain <strong>100% founder ownership</strong> (zero dilution).</li>
                <li><strong>Mandatory Monthly EMI: ₹10.86 Lakhs</strong>.</li>
                <li>Failure to pay triggers factory seizure and insolvency.</li>
              </ul>
              <button
                type="button"
                onClick={() => handleSimulate("debt")}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
              >
                Choose Debt (Borrow ₹5 Cr Loan)
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Simulation Results View */
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Scenario Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-xs font-semibold text-slate-700">
              Test Market Conditions after 2 Years:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMarketScenario("boom")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  marketScenario === "boom"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                🚀 Scenario 1: EV Market Boom
              </button>
              <button
                type="button"
                onClick={() => setMarketScenario("slump")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  marketScenario === "slump"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                📉 Scenario 2: Industry Downturn
              </button>
            </div>
          </div>

          {/* Outcome Card */}
          <div
            className={`p-5 rounded-2xl border ${
              chosenMode === "equity"
                ? marketScenario === "boom"
                  ? "bg-blue-50 border-blue-200"
                  : "bg-emerald-50 border-emerald-200"
                : marketScenario === "boom"
                ? "bg-emerald-50 border-emerald-200"
                : "bg-rose-50 border-rose-200"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                  Fundraising Choice: {chosenMode === "equity" ? "Equity Financing" : "Debt Financing"}
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                  {chosenMode === "equity" && marketScenario === "boom" && "Unicorn Trajectory!"}
                  {chosenMode === "equity" && marketScenario === "slump" && "Survival & Resilience!"}
                  {chosenMode === "debt" && marketScenario === "boom" && "Maximum Founder Wealth!"}
                  {chosenMode === "debt" && marketScenario === "slump" && "Severe Liquidity Distress & Default!"}
                </h4>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg transition-colors shadow-xs"
              >
                <RefreshCw className="w-3 h-3" />
                Try Other Choice
              </button>
            </div>

            <div className="mt-3 text-xs text-slate-700 leading-relaxed space-y-2">
              {chosenMode === "equity" && marketScenario === "slump" && (
                <p>
                  <strong>Why you survived:</strong> During the EV slump, your revenue dropped to
                  just ₹1.2 Crores/year. Because equity has <strong>no compulsory interest payments</strong>,
                  you did not default. The VC absorbed the loss alongside you. You weathered the winter and
                  kept the doors open!
                </p>
              )}

              {chosenMode === "debt" && marketScenario === "slump" && (
                <p className="text-rose-800">
                  <strong>The Debt Trap:</strong> Revenue crashed to ₹1.2 Crores, but the bank
                  insisted on its <strong>₹10.86 Lakhs monthly EMI (₹1.30 Cr/yr)</strong>. Your
                  entire revenue couldn't even cover loan interest! The bank froze your accounts and
                  initiated NCLT insolvency proceedings.
                </p>
              )}

              {chosenMode === "debt" && marketScenario === "boom" && (
                <p className="text-emerald-800">
                  <strong>The Leverage Jackpot:</strong> Revenue exploded to ₹25 Crores/year!
                  Because you paid a fixed 11% interest to the bank, you retained <strong>100% of the equity</strong>.
                  Your company is now valued at ₹100 Crores, and you didn't surrender a single share!
                </p>
              )}

              {chosenMode === "equity" && marketScenario === "boom" && (
                <p>
                  <strong>Solid Growth:</strong> You diluted 25%, but the company achieved massive
                  scale. Your remaining 75% stake is worth ₹75 Crores! The VC provided valuable board
                  introductions to automotive OEMs.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
