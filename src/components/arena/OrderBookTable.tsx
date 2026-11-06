"use client";

import React, { useState } from "react";
import { Layers, Clock } from "lucide-react";

interface HoldingItem {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  investedValue?: number;
  currentValue?: number;
  pnl?: number;
  pnlPercent?: number;
}

interface OrderItem {
  id: string;
  symbol: string;
  name: string;
  side: string;
  type: string;
  quantity: number;
  price: number;
  executedPrice?: number | null;
  status: string;
  createdAt: string | Date;
}

interface OrderBookTableProps {
  holdings: HoldingItem[];
  orders: OrderItem[];
  onSelectSymbol?: (symbol: string) => void;
}

export function OrderBookTable({ holdings, orders, onSelectSymbol }: OrderBookTableProps) {
  const [activeTab, setActiveTab] = useState<"holdings" | "orders">("holdings");

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 space-y-4 shadow-sm">
      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("holdings")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "holdings"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            Stock Holdings ({holdings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "orders"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Clock className="w-4 h-4 text-blue-400" />
            Order Book & Executions ({orders.length})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "holdings" ? (
        holdings.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">
            No stock holdings yet. Execute a trade in the order ticket above to start your portfolio!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-medium">
                  <th className="py-2.5 px-3">Stock</th>
                  <th className="py-2.5 px-3">Qty</th>
                  <th className="py-2.5 px-3">Avg. Buy Price</th>
                  <th className="py-2.5 px-3">Current LTP</th>
                  <th className="py-2.5 px-3">Invested Value</th>
                  <th className="py-2.5 px-3">Current Value</th>
                  <th className="py-2.5 px-3 text-right">P&L (Returns)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {holdings.map((h) => {
                  const investedVal = h.investedValue || h.averagePrice * h.quantity;
                  const currentVal = h.currentValue || h.currentPrice * h.quantity;
                  const pnl = h.pnl !== undefined ? h.pnl : currentVal - investedVal;
                  const pnlPercent =
                    h.pnlPercent !== undefined
                      ? h.pnlPercent
                      : (pnl / investedVal) * 100;
                  const isPositive = pnl >= 0;

                  return (
                    <tr
                      key={h.id}
                      onClick={() => onSelectSymbol && onSelectSymbol(h.symbol)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900 block">{h.symbol}</span>
                        <span className="text-[10px] text-slate-500 font-sans">{h.name}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-800">{h.quantity}</td>
                      <td className="py-3 px-3 text-slate-600">
                        ₹{h.averagePrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-3 text-slate-800">
                        ₹{h.currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-3 text-slate-500">
                        ₹{investedVal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-3 px-3 text-slate-900 font-bold">
                        ₹{currentVal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                      </td>
                      <td className="py-3 px-3 text-right font-bold">
                        <span className={isPositive ? "text-emerald-600" : "text-rose-600"}>
                          {isPositive ? "+" : ""}₹
                          {pnl.toLocaleString("en-IN", { minimumFractionDigits: 2 })} (
                          {isPositive ? "+" : ""}
                          {pnlPercent.toFixed(2)}%)
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      ) : (
        /* Orders View */
        orders.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs">No orders recorded.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-medium">
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-3">Stock</th>
                  <th className="py-2.5 px-3">Side</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Qty</th>
                  <th className="py-2.5 px-3">Executed Price</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {orders.map((o) => {
                  const dateStr = new Date(o.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <tr key={o.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 text-slate-500">{dateStr}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{o.symbol}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            o.side === "BUY"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {o.side}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{o.type}</td>
                      <td className="py-3 px-3 text-slate-800">{o.quantity}</td>
                      <td className="py-3 px-3 text-slate-600">
                        {o.executedPrice ? `₹${o.executedPrice.toLocaleString("en-IN")}` : "—"}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            o.status === "FILLED"
                              ? "bg-emerald-50 text-emerald-700"
                              : o.status === "PENDING"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}
