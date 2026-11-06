"use client";

import React, { useState, useEffect } from "react";
import { STOCKS_DATA, StockQuote, isMarketOpen } from "@/lib/market-data";
import { TradingChart } from "@/components/arena/TradingChart";
import { OrderTicket } from "@/components/arena/OrderTicket";
import { Watchlist } from "@/components/arena/Watchlist";
import { OrderBookTable } from "@/components/arena/OrderBookTable";
import { MrMoneyMascot } from "@/components/mascot/MrMoneyMascot";
import { ShieldCheck, Clock } from "lucide-react";

export default function MarketArenaPage() {
  const [selectedStock, setSelectedStock] = useState<StockQuote>(STOCKS_DATA[0]);
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchWallet = async () => {
    try {
      const res = await fetch("/api/session");
      if (res.ok) {
        const data = await res.json();
        setWallet(data.wallet);
      }
    } catch (e) {
      console.error("Error fetching wallet in Arena:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const currentHolding = (wallet?.holdings || []).find(
    (h: any) => h.symbol === selectedStock.symbol
  );
  const ownedQty = currentHolding ? currentHolding.quantity : 0;
  const availableCash = wallet?.balance || 100000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Mentor Tip */}
      <MrMoneyMascot
        quote="Welcome to the Market Arena! This is a realistic paper trading simulator backed by an immutable ledger. Always remember: managing risk is 10x more important than picking winning stocks!"
        mood="excited"
        compact
      />

      {/* Indices Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase block">NIFTY 50</span>
            <span className="text-sm font-black font-mono text-slate-900">24,180.50</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            +0.60%
          </span>
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase block">SENSEX</span>
            <span className="text-sm font-black font-mono text-slate-900">79,480.20</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            +0.58%
          </span>
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase block">
              Virtual Cash
            </span>
            <span className="text-sm font-black font-mono text-emerald-700">
              ₹{availableCash.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
            </span>
          </div>
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
        </div>

        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase block">
              Market Session
            </span>
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              Arena Active
            </span>
          </div>
          <Clock className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Main Terminal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Chart & Fundamentals & Orderbook */}
        <div className="lg:col-span-8 space-y-6">
          {/* Chart */}
          <TradingChart
            symbol={selectedStock.symbol}
            name={selectedStock.name}
            currentPrice={selectedStock.currentPrice}
            change={selectedStock.change}
            changePercent={selectedStock.changePercent}
          />

          {/* Fundamentals Strip */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Company Fundamentals • {selectedStock.name}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">{selectedStock.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase block font-sans">
                  Market Cap
                </span>
                <span className="font-bold text-slate-900">
                  ₹{(selectedStock.marketCapCr / 100000).toFixed(2)} Lakh Cr
                </span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase block font-sans">P/E Ratio</span>
                <span className="font-bold text-slate-800">{selectedStock.peRatio}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase block font-sans">P/B Ratio</span>
                <span className="font-bold text-slate-800">{selectedStock.pbRatio}</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase block font-sans">
                  Dividend Yield
                </span>
                <span className="font-bold text-emerald-700">{selectedStock.dividendYield}%</span>
              </div>
            </div>
          </div>

          {/* Holdings & Orderbook */}
          <OrderBookTable
            holdings={wallet?.holdings || []}
            orders={wallet?.orders || []}
            onSelectSymbol={(sym) => {
              const stock = STOCKS_DATA.find((s) => s.symbol === sym);
              if (stock) setSelectedStock(stock);
            }}
          />
        </div>

        {/* Right Column: Order Ticket & Watchlist */}
        <div className="lg:col-span-4 space-y-6">
          <OrderTicket
            stock={selectedStock}
            availableCash={availableCash}
            ownedQuantity={ownedQty}
            onOrderSuccess={fetchWallet}
          />

          <Watchlist
            selectedSymbol={selectedStock.symbol}
            onSelectStock={(stk) => setSelectedStock(stk)}
          />
        </div>
      </div>
    </div>
  );
}
