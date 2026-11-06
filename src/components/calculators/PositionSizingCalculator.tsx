"use client";

import React, { useState } from "react";
import { ShieldAlert, Crosshair, CheckCircle2 } from "lucide-react";

export function PositionSizingCalculator() {
  const [capital, setCapital] = useState<number>(100000); // 1 Lakh
  const [riskPercent, setRiskPercent] = useState<number>(1); // 1%
  const [entryPrice, setEntryPrice] = useState<number>(2500);
  const [stopLoss, setStopLoss] = useState<number>(2450);
  const [targetPrice, setTargetPrice] = useState<number>(2650);

  const maxRiskAmount = (capital * riskPercent) / 100;
  const riskPerShare = Math.max(1, entryPrice - stopLoss);
  const rewardPerShare = Math.max(0, targetPrice - entryPrice);

  const allowedShares = Math.floor(maxRiskAmount / riskPerShare);
  const totalPositionCost = allowedShares * entryPrice;

  const rewardRiskRatio = riskPerShare > 0 ? (rewardPerShare / riskPerShare).toFixed(1) : "0";
  const potentialProfit = allowedShares * rewardPerShare;
  const potentialLoss = allowedShares * riskPerShare;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-emerald-600" />
            The 1% Rule & Position Sizing Calculator
          </h3>
          <p className="text-xs text-slate-500">
            Never blow up your account. Calculate exact share quantity based on strictly defined risk
          </p>
        </div>
        <div className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-mono text-emerald-800 self-start sm:self-auto font-semibold">
          Pro Trading Risk Tool
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-700 font-medium">Trading Capital (₹)</label>
              <input
                type="number"
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-700 font-medium">Risk per Trade (%)</label>
              <select
                value={riskPercent}
                onChange={(e) => setRiskPercent(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
              >
                <option value={0.5}>0.5% (Ultra Conservative)</option>
                <option value={1}>1.0% (Professional Standard)</option>
                <option value={2}>2.0% (Aggressive Max)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-700 font-medium">Entry Price (₹)</label>
              <input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-rose-700 font-medium">Stop Loss (₹)</label>
              <input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
                className="w-full bg-slate-50 border border-rose-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-rose-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-emerald-700 font-medium">Target Price (₹)</label>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-full bg-slate-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-emerald-700"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>Risk per share:</span>
              <span className="font-mono font-bold text-rose-600">₹{riskPerShare}</span>
            </div>
            <div className="flex justify-between">
              <span>Reward per share:</span>
              <span className="font-mono font-bold text-emerald-600">₹{rewardPerShare}</span>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">
              Calculated Max Allowed Position Size
            </span>
            <div className="text-3xl font-black font-mono text-emerald-700">
              {allowedShares} Shares
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Total Order Capital: ₹{totalPositionCost.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white border border-rose-200 rounded-xl space-y-0.5">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">If Stop-Loss Hit</span>
              <span className="text-base font-bold font-mono text-rose-600">
                -₹{potentialLoss.toLocaleString("en-IN")}
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                Exactly {riskPercent}% of account
              </span>
            </div>

            <div className="p-3 bg-white border border-emerald-200 rounded-xl space-y-0.5">
              <span className="text-slate-500 text-[10px] uppercase font-bold block">If Target Hit</span>
              <span className="text-base font-bold font-mono text-emerald-700">
                +₹{potentialProfit.toLocaleString("en-IN")}
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">
                Ratio: 1 : {rewardRiskRatio}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>
              Risk-to-Reward ratio is <strong>1:{rewardRiskRatio}</strong>. Professional traders only take trades with minimum 1:2 ratio!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
