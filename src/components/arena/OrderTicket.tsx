"use client";

import React, { useState } from "react";
import { StockQuote } from "@/lib/market-data";
import { ArrowUpRight, ArrowDownRight, Wallet, CheckCircle2, AlertCircle } from "lucide-react";

interface OrderTicketProps {
  stock: StockQuote;
  availableCash: number;
  ownedQuantity: number;
  onOrderSuccess?: () => void;
}

export function OrderTicket({
  stock,
  availableCash,
  ownedQuantity,
  onOrderSuccess,
}: OrderTicketProps) {
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT">("MARKET");
  const [quantity, setQuantity] = useState<number>(1);
  const [limitPrice, setLimitPrice] = useState<number>(stock.currentPrice);
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const priceToUse = orderType === "MARKET" ? stock.currentPrice : limitPrice;
  const grossValue = priceToUse * quantity;
  const simulatedFees = Number((grossValue * 0.0005).toFixed(2));
  const netTotal = side === "BUY" ? grossValue + simulatedFees : grossValue - simulatedFees;

  const canExecuteBuy = side === "BUY" && availableCash >= netTotal && quantity > 0;
  const canExecuteSell = side === "SELL" && ownedQuantity >= quantity && quantity > 0;
  const canSubmit = side === "BUY" ? canExecuteBuy : canExecuteSell;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: stock.symbol,
          side,
          type: orderType,
          quantity,
          price: priceToUse,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Order execution failed");
      }

      setFeedback({
        type: "success",
        message: data.message || "Order executed successfully!",
      });

      if (onOrderSuccess) {
        onOrderSuccess();
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err.message || "Failed to place order.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-5 shadow-sm">
      {/* Side Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 border border-slate-200 rounded-xl">
        <button
          type="button"
          onClick={() => {
            setSide("BUY");
            setFeedback(null);
          }}
          className={`py-2 text-xs font-black uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            side === "BUY"
              ? "bg-emerald-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <ArrowUpRight className="w-4 h-4" />
          Buy {stock.symbol}
        </button>
        <button
          type="button"
          onClick={() => {
            setSide("SELL");
            setFeedback(null);
          }}
          className={`py-2 text-xs font-black uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            side === "SELL"
              ? "bg-rose-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <ArrowDownRight className="w-4 h-4" />
          Sell {stock.symbol}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Order Type */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium">Order Execution Type</span>
          <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setOrderType("MARKET")}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                orderType === "MARKET"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Market
            </button>
            <button
              type="button"
              onClick={() => setOrderType("LIMIT")}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                orderType === "LIMIT"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Limit
            </button>
          </div>
        </div>

        {/* Quantity */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-700 font-medium">Quantity (Shares)</span>
            <span className="text-slate-500 font-mono">
              You own: <strong className="text-slate-900">{ownedQuantity}</strong>
            </span>
          </div>
          <div className="relative">
            <input
              type="number"
              min={1}
              step={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-1.5 pt-1">
            {[1, 5, 10, 25, 50, 100].map((qty) => (
              <button
                key={qty}
                type="button"
                onClick={() => setQuantity(qty)}
                className="flex-1 py-1 text-[11px] font-mono font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors"
              >
                +{qty}
              </button>
            ))}
          </div>
        </div>

        {/* Limit Price Input if LIMIT */}
        {orderType === "LIMIT" && (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-700 font-medium">Limit Price (₹)</span>
              <span className="text-slate-500 font-mono">LTP: ₹{stock.currentPrice}</span>
            </div>
            <input
              type="number"
              step={0.5}
              value={limitPrice}
              onChange={(e) => setLimitPrice(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>
        )}

        {/* Breakdown Card */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Estimated Value:</span>
            <span className="font-mono text-slate-900 font-semibold">
              ₹{grossValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Simulated Charges (0.05%):</span>
            <span className="font-mono text-slate-800">₹{simulatedFees.toFixed(2)}</span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex justify-between font-bold">
            <span className="text-slate-700">Total Order Outflow:</span>
            <span
              className={`font-mono text-sm ${
                side === "BUY" ? "text-emerald-700" : "text-amber-700"
              }`}
            >
              ₹{netTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Wallet Balance Check */}
        <div className="flex items-center justify-between text-[11px] text-slate-600 px-1">
          <span className="flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-emerald-600" />
            Available Cash:
          </span>
          <span className="font-mono font-bold text-slate-900">
            ₹{availableCash.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Feedback message */}
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!canSubmit || loading}
          className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 ${
            side === "BUY"
              ? canSubmit
                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
              : canSubmit
              ? "bg-rose-600 hover:bg-rose-500 text-white"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Executing Virtual Order...
            </>
          ) : (
            <>
              {side === "BUY" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {side === "BUY"
                ? `Execute Buy • ₹${netTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
                : `Execute Sell • ${quantity} Shares`}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
