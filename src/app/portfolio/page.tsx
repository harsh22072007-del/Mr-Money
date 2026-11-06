"use client";

import React, { useState, useEffect } from "react";
import { MrMoneyMascot } from "@/components/mascot/MrMoneyMascot";
import {
  PieChart,
  Layers,
  History,
  ShieldCheck,
} from "lucide-react";

export default function PortfolioPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "ledger">("overview");

  const fetchPortfolio = async () => {
    try {
      const res = await fetch("/api/session");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error("Error fetching portfolio:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const wallet = data?.wallet;
  const cash = wallet?.balance || 0;
  const stockVal = wallet?.stockHoldingsValue || 0;
  const mfVal = wallet?.mfHoldingsValue || 0;
  const netWorth = wallet?.totalNetWorth || cash;
  const invested = wallet?.totalInvested || 0;
  const unrealizedPnL = wallet?.unrealizedPnL || 0;
  const realizedPnL = wallet?.realizedPnL || 0;

  const totalReturnPercent = invested > 0 ? (unrealizedPnL / invested) * 100 : 0;

  const cashPct = netWorth > 0 ? (cash / netWorth) * 100 : 100;
  const stockPct = netWorth > 0 ? (stockVal / netWorth) * 100 : 0;
  const mfPct = netWorth > 0 ? (mfVal / netWorth) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Mentor Header */}
      <MrMoneyMascot
        quote="True financial intelligence is seeing all your assets in one unified cockpit. Track your asset allocation closely to ensure you are never overexposed to one single basket."
        mood="mentor"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Worth */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Total Net Worth
          </span>
          <div className="text-2xl font-black font-mono text-slate-900">
            ₹{netWorth.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </div>
          <span className="text-xs text-slate-500">Cash + Equities + Mutual Funds</span>
        </div>

        {/* Unrealized P&L */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Unrealized P&L
          </span>
          <div
            className={`text-2xl font-black font-mono flex items-center gap-1 ${
              unrealizedPnL >= 0 ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {unrealizedPnL >= 0 ? "+" : ""}₹
            {unrealizedPnL.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            <span className="text-xs font-semibold">
              ({unrealizedPnL >= 0 ? "+" : ""}
              {totalReturnPercent.toFixed(2)}%)
            </span>
          </div>
          <span className="text-xs text-slate-500">Paper Gains / Losses</span>
        </div>

        {/* Realized P&L */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Realized P&L
          </span>
          <div
            className={`text-2xl font-black font-mono ${
              realizedPnL >= 0 ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {realizedPnL >= 0 ? "+" : ""}₹
            {realizedPnL.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </div>
          <span className="text-xs text-slate-500">Booked from closed trades</span>
        </div>

        {/* Liquid Cash */}
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Available Virtual Cash
          </span>
          <div className="text-2xl font-black font-mono text-emerald-700">
            ₹{cash.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </div>
          <span className="text-xs text-slate-500 font-mono">{cashPct.toFixed(1)}% of Portfolio</span>
        </div>
      </div>

      {/* Asset Allocation Bar */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-emerald-600" />
            Asset Allocation Breakdown
          </h3>
          <span className="text-xs text-slate-500 font-mono">100% Capital Accounted</span>
        </div>

        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
          <div
            style={{ width: `${cashPct}%` }}
            className="bg-emerald-500 transition-all duration-300"
            title={`Liquid Cash: ${cashPct.toFixed(1)}%`}
          />
          <div
            style={{ width: `${stockPct}%` }}
            className="bg-blue-500 transition-all duration-300"
            title={`Equities: ${stockPct.toFixed(1)}%`}
          />
          <div
            style={{ width: `${mfPct}%` }}
            className="bg-amber-500 transition-all duration-300"
            title={`Mutual Funds: ${mfPct.toFixed(1)}%`}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-md bg-emerald-500 inline-block" />
            <span className="text-slate-700">
              Cash: ₹{cash.toLocaleString("en-IN", { maximumFractionDigits: 0 })} ({cashPct.toFixed(0)}
              %)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-md bg-blue-500 inline-block" />
            <span className="text-slate-700">
              Stocks: ₹{stockVal.toLocaleString("en-IN", { maximumFractionDigits: 0 })} (
              {stockPct.toFixed(0)}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-md bg-amber-500 inline-block" />
            <span className="text-slate-700">
              Mutual Funds: ₹{mfVal.toLocaleString("en-IN", { maximumFractionDigits: 0 })} (
              {mfPct.toFixed(0)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Tabs: Overview vs Immutable Ledger Audit */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "overview"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            Holdings Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ledger")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "ledger"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <History className="w-4 h-4 text-blue-400" />
            Immutable Ledger Audit Trail ({wallet?.ledgerEntries?.length || 0})
          </button>
        </div>

        {activeTab === "overview" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Direct Stock Holdings */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Direct Stock Holdings ({wallet?.holdings?.length || 0})
              </h4>
              {(wallet?.holdings || []).length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  No stock holdings currently in your portfolio.
                </div>
              ) : (
                <div className="space-y-3">
                  {(wallet?.holdings || []).map((h: any) => (
                    <div
                      key={h.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block">{h.symbol}</span>
                        <span className="text-[10px] text-slate-500">
                          {h.quantity} Shares @ avg ₹{h.averagePrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-slate-900 font-mono block">
                          ₹{h.currentValue.toLocaleString("en-IN")}
                        </span>
                        <span
                          className={`text-[11px] font-mono font-semibold ${
                            h.pnl >= 0 ? "text-emerald-600" : "text-rose-600"
                          }`}
                        >
                          {h.pnl >= 0 ? "+" : ""}₹{h.pnl} ({h.pnlPercent.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mutual Fund Holdings */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Mutual Fund Holdings ({wallet?.mfHoldings?.length || 0})
              </h4>
              {(wallet?.mfHoldings || []).length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  No mutual fund investments yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {(wallet?.mfHoldings || []).map((m: any) => (
                    <div
                      key={m.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 block line-clamp-1">
                          {m.schemeName}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {m.units.toFixed(3)} Units • {m.category}
                        </span>
                      </div>
                      <div className="text-right flex-shrink-0 ml-3">
                        <span className="font-bold text-slate-900 font-mono block">
                          ₹{m.currentValue.toLocaleString("en-IN")}
                        </span>
                        <span
                          className={`text-[11px] font-mono font-semibold ${
                            m.pnl >= 0 ? "text-emerald-600" : "text-rose-600"
                          }`}
                        >
                          {m.pnl >= 0 ? "+" : ""}₹{m.pnl} ({m.pnlPercent.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Ledger Audit Table */
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Double-Entry Ledger Invariant Audit
                </h4>
                <p className="text-[11px] text-slate-500">
                  Every financial event is recorded server-side into this immutable ledger.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Transaction Type</th>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3 text-right">Debit / Credit</th>
                    <th className="py-2.5 px-3 text-right">Balance After</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {(wallet?.ledgerEntries || []).map((entry: any) => {
                    const isCredit = entry.amount >= 0;
                    const dateStr = new Date(entry.createdAt).toLocaleString("en-IN", {
                      dateStyle: "short",
                      timeStyle: "short",
                    });

                    return (
                      <tr key={entry.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3 text-slate-500">{dateStr}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              entry.type === "INITIAL_GRANT"
                                ? "bg-amber-50 text-amber-800 border border-amber-200"
                                : entry.type.includes("BUY")
                                ? "bg-rose-50 text-rose-800 border border-rose-200"
                                : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            }`}
                          >
                            {entry.type}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-700 font-sans">{entry.description}</td>
                        <td
                          className={`py-3 px-3 text-right font-bold ${
                            isCredit ? "text-emerald-700" : "text-rose-700"
                          }`}
                        >
                          {isCredit ? "+" : ""}₹{entry.amount.toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-3 text-right text-slate-900 font-bold">
                          ₹{entry.balanceAfter.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
