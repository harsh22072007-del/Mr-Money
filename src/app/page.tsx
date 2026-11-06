"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { STOCKS_DATA, MUTUAL_FUNDS_DATA } from "@/lib/market-data";
import { ACADEMY_LEVELS } from "@/lib/academy-content";
import {
  TrendingUp,
  BookOpen,
  Wallet,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/session");
        if (res.ok) {
          const json = await res.json();
          setSessionData(json);
        }
      } catch (e) {
        console.error("Error loading home session:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  const wallet = sessionData?.wallet;
  const progress = sessionData?.progress;
  const cash = wallet?.balance || 100000;
  const netWorth = wallet?.totalNetWorth || 100000;
  const unrealizedPnL = wallet?.unrealizedPnL || 0;
  const userXP = progress?.xp || 25;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Hero Section */}
      <div className="relative p-6 sm:p-8 md:p-10 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>India's Premier Financial Literacy & Trading Sandbox</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Master Money.
            </h1>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Step into an authentic Indian financial learning experience. All modules, simulators, and
              calculators are <strong>fully unlocked</strong>. Deploy your{" "}
              <strong className="text-emerald-700 font-mono font-bold">₹1,00,000 virtual seed capital</strong> in
              NSE stocks and AMFI mutual funds right away.
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/arena"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Launch Market Arena
              </Link>
              <Link
                href="/academy"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                Explore Academy
              </Link>
              <Link
                href="/mutual-funds"
                className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-slate-200 shadow-xs flex items-center gap-2"
              >
                <Wallet className="w-4 h-4 text-amber-500" />
                Explore Mutual Funds
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Net Worth & Portfolio Snapshot Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Portfolio Net Worth
          </span>
          <div className="text-2xl font-black font-mono text-slate-900">
            ₹{netWorth.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </div>
          <span className="text-xs text-slate-500">Cash + Equities + Mutual Funds</span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Available Virtual Cash
          </span>
          <div className="text-2xl font-black font-mono text-emerald-600">
            ₹{cash.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </div>
          <span className="text-xs text-slate-500">Liquid Purchasing Power</span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Unrealized Returns
          </span>
          <div
            className={`text-2xl font-black font-mono flex items-center gap-1 ${
              unrealizedPnL >= 0 ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {unrealizedPnL >= 0 ? "+" : ""}₹
            {unrealizedPnL.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </div>
          <span className="text-xs text-slate-500">From Active Holdings</span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Learning Status
          </span>
          <div className="text-2xl font-black font-mono text-amber-600 flex items-center gap-2">
            <Zap className="w-5 h-5 fill-amber-500 text-amber-500" />
            {userXP} XP
          </div>
          <span className="text-xs text-emerald-700 font-bold">All 3 Levels Unlocked</span>
        </div>
      </div>

      {/* Live Market Indices Ticker Strip */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-6 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase text-slate-800">NSE Indices</span>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">NIFTY 50:</span>
            <span className="text-slate-700">24,180.50</span>
            <span className="text-emerald-600 font-bold">+0.60%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">SENSEX:</span>
            <span className="text-slate-700">79,480.20</span>
            <span className="text-emerald-600 font-bold">+0.58%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">NIFTY BANK:</span>
            <span className="text-slate-700">51,820.10</span>
            <span className="text-emerald-600 font-bold">+0.74%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">INDIA VIX:</span>
            <span className="text-slate-700">13.85</span>
            <span className="text-rose-600 font-bold">-2.10%</span>
          </div>
        </div>
      </div>

      {/* Academy Roadmap Section (Everything Unlocked) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              Mr. Money Academy (All Levels Unlocked)
            </h2>
            <p className="text-xs text-slate-500">
              Explore interactive calculators, simulations, and quizzes without barriers
            </p>
          </div>
          <Link
            href="/academy"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            Open Full Academy <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ACADEMY_LEVELS.map((lvl) => (
            <div
              key={lvl.level}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-sm hover:border-slate-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                    Level {lvl.level}
                  </span>
                  <span className="p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{lvl.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{lvl.description}</p>
              </div>

              <Link
                href="/academy"
                className="py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200"
              >
                Explore Level {lvl.level}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Arena & Mutual Funds Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Arena Spotlight */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                NIFTY 50 Market Arena
              </h3>
              <p className="text-xs text-slate-500">Trade bluechip stocks with ₹1,00,000 virtual cash</p>
            </div>
            <Link
              href="/arena"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              Open Broker Terminal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2">
            {STOCKS_DATA.slice(0, 4).map((stock) => (
              <Link
                key={stock.symbol}
                href="/arena"
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between text-xs transition-colors"
              >
                <div>
                  <span className="font-mono font-bold text-slate-900 block">{stock.symbol}</span>
                  <span className="text-[10px] text-slate-500">{stock.name}</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-slate-900 block">
                    ₹{stock.currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`text-[10px] font-semibold ${
                      stock.change >= 0 ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {stock.change >= 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mutual Funds Spotlight */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-amber-500" />
                Direct Mutual Funds & SIPs
              </h3>
              <p className="text-xs text-slate-500">Zero-commission wealth creation vehicles</p>
            </div>
            <Link
              href="/mutual-funds"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
            >
              View All Schemes <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2">
            {MUTUAL_FUNDS_DATA.slice(0, 4).map((fund) => (
              <Link
                key={fund.schemeCode}
                href="/mutual-funds"
                className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between text-xs transition-colors"
              >
                <div>
                  <span className="font-semibold text-slate-900 block line-clamp-1">
                    {fund.schemeName}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {fund.category} • Exp: {fund.expenseRatio}%
                  </span>
                </div>
                <div className="text-right font-mono flex-shrink-0 ml-3">
                  <span className="font-bold text-slate-900 block">NAV ₹{fund.nav.toFixed(2)}</span>
                  <span className="text-[10px] font-semibold text-emerald-600">
                    +{fund.cagr3Y}% 3Y
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
