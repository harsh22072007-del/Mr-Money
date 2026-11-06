"use client";

import React, { useState } from "react";
import { MutualFundData } from "@/lib/market-data";
import { X, ArrowUpRight, Repeat, Wallet, CheckCircle2, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface InvestModalProps {
  fund: MutualFundData | null;
  mode: "LUMP" | "SIP";
  availableCash: number;
  onClose: () => void;
  onSuccess: () => void;
}

export function InvestModal({
  fund,
  mode,
  availableCash,
  onClose,
  onSuccess,
}: InvestModalProps) {
  if (!fund) return null;

  const [amount, setAmount] = useState<number>(mode === "SIP" ? 1000 : 5000);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  const unitsAllotted = fund.nav > 0 ? (amount / fund.nav).toFixed(3) : "0.000";
  const minRequired = mode === "SIP" ? fund.minSip : fund.minLumpSum;
  const hasSufficientCash = mode === "SIP" || availableCash >= amount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setLoading(true);

    try {
      const res = await fetch("/api/mutual-funds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: mode === "SIP" ? "SETUP_SIP" : "BUY_LUMP",
          schemeCode: fund.schemeCode,
          amount,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Transaction failed");

      setFeedback({ type: "success", message: data.message });

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {}

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                {mode === "SIP" ? "Monthly SIP" : "Lump-Sum Investment"}
              </span>
              <span className="text-xs text-slate-500">{fund.category}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">
              {fund.schemeName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-700 font-medium">Investment Amount (₹)</span>
              <span className="text-slate-500 font-mono">
                Min: ₹{minRequired.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="number"
              min={minRequired}
              step={500}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-500"
            />

            {/* Quick chips */}
            <div className="flex items-center gap-2 pt-1">
              {[1000, 2500, 5000, 10000, 25000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className="flex-1 py-1.5 text-xs font-mono font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors"
                >
                  ₹{preset.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          </div>

          {/* Allocation Preview Card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Applicable NAV:</span>
              <span className="font-mono text-slate-900 font-bold">₹{fund.nav.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Units to be Allotted:</span>
              <span className="font-mono text-emerald-700 font-bold">{unitsAllotted} Units</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Expense Ratio (Direct Plan):</span>
              <span className="font-mono text-slate-700">{fund.expenseRatio}%</span>
            </div>
          </div>

          {/* Available Cash check */}
          <div className="flex items-center justify-between text-xs text-slate-600 px-1">
            <span className="flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-emerald-600" />
              Available Virtual Cash:
            </span>
            <span className="font-mono font-bold text-slate-900">
              ₹{availableCash.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
                feedback.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-rose-50 border-rose-200 text-rose-800"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={!hasSufficientCash || amount < minRequired || loading}
            className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 ${
              hasSufficientCash && amount >= minRequired
                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing Investment...
              </>
            ) : mode === "SIP" ? (
              <>
                <Repeat className="w-4 h-4" />
                Confirm Monthly SIP of ₹{amount.toLocaleString("en-IN")}
              </>
            ) : (
              <>
                <ArrowUpRight className="w-4 h-4" />
                Invest ₹{amount.toLocaleString("en-IN")} Lump-Sum
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
