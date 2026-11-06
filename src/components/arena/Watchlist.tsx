"use client";

import React, { useState } from "react";
import { StockQuote, STOCKS_DATA } from "@/lib/market-data";
import { Search, TrendingUp, TrendingDown } from "lucide-react";

interface WatchlistProps {
  selectedSymbol: string;
  onSelectStock: (stock: StockQuote) => void;
}

export function Watchlist({ selectedSymbol, onSelectStock }: WatchlistProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSector, setActiveSector] = useState("All");

  const sectors = ["All", "Banking", "IT", "Auto", "Energy", "FMCG"];

  const filteredStocks = STOCKS_DATA.filter((stock) => {
    const matchesSearch =
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSector =
      activeSector === "All" ||
      stock.sector.toLowerCase().includes(activeSector.toLowerCase());

    return matchesSearch && matchesSector;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          NSE Watchlist
        </h3>
        <span className="text-[11px] text-slate-500 font-mono">
          {filteredStocks.length} Stocks
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="Search RELIANCE, TCS, INFY..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Sector filter pills */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
        {sectors.map((sec) => (
          <button
            key={sec}
            type="button"
            onClick={() => setActiveSector(sec)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all ${
              activeSector === sec
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Stocks List */}
      <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
        {filteredStocks.map((stock) => {
          const isSelected = stock.symbol === selectedSymbol;
          const isPositive = stock.change >= 0;

          return (
            <div
              key={stock.symbol}
              onClick={() => onSelectStock(stock)}
              className={`p-3 rounded-xl cursor-pointer transition-all border flex items-center justify-between ${
                isSelected
                  ? "bg-emerald-50/50 border-emerald-400 shadow-xs ring-1 ring-emerald-500/20"
                  : "bg-slate-50/60 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-slate-900">
                    {stock.symbol}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono truncate max-w-[120px]">
                    {stock.name}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {stock.sector}
                </div>
              </div>

              <div className="text-right space-y-0.5">
                <div className="font-mono font-bold text-xs text-slate-900">
                  ₹{stock.currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </div>
                <div
                  className={`text-[11px] font-mono font-semibold flex items-center justify-end gap-0.5 ${
                    isPositive ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {isPositive ? "+" : ""}
                  {stock.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
