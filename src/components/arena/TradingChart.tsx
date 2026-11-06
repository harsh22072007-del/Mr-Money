"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  IChartApi,
  CandlestickSeries,
  HistogramSeries,
  CandlestickData,
  Time,
} from "lightweight-charts";
import { generateCandlestickData } from "@/lib/market-data";
import { Clock } from "lucide-react";

interface TradingChartProps {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
}

export function TradingChart({
  symbol,
  name,
  currentPrice,
  change,
  changePercent,
}: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "3M" | "1Y">("1M");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.remove();
      chartInstanceRef.current = null;
    }

    const container = chartContainerRef.current;

    const chart = createChart(container, {
      width: container.clientWidth || 600,
      height: 380,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#64748b",
      },
      grid: {
        vertLines: { color: "#f1f5f9" },
        horzLines: { color: "#f1f5f9" },
      },
      timeScale: {
        borderColor: "#e2e8f0",
        timeVisible: true,
      },
      rightPriceScale: {
        borderColor: "#e2e8f0",
      },
      crosshair: {
        vertLine: { color: "#94a3b8", width: 1, style: 1 },
        horzLine: { color: "#94a3b8", width: 1, style: 1 },
      },
    });

    chartInstanceRef.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#10b981",
      downColor: "#f43f5e",
      borderUpColor: "#10b981",
      borderDownColor: "#f43f5e",
      wickUpColor: "#10b981",
      wickDownColor: "#f43f5e",
    });

    let days = 30;
    if (timeframe === "1D") days = 5;
    else if (timeframe === "1W") days = 10;
    else if (timeframe === "3M") days = 90;
    else if (timeframe === "1Y") days = 250;

    const rawData = generateCandlestickData(currentPrice, days);

    const formattedData: CandlestickData<Time>[] = rawData.map((d) => ({
      time: d.time as Time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));

    candleSeries.setData(formattedData);

    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: "#e2e8f0",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    volumeSeries.setData(
      rawData.map((d) => ({
        time: d.time as Time,
        value: d.volume,
        color: d.close >= d.open ? "#10b98133" : "#f43f5e33",
      }))
    );

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (container && chartInstanceRef.current) {
        chartInstanceRef.current.applyOptions({
          width: container.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove();
        chartInstanceRef.current = null;
      }
    };
  }, [symbol, currentPrice, timeframe]);

  const isPositive = change >= 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 font-mono tracking-tight">{symbol}</h2>
            <span className="text-xs text-slate-500 font-medium truncate max-w-[200px] sm:max-w-xs">
              {name}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-700 font-bold">
              NSE
            </span>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-slate-900">
              ₹{currentPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
            <span
              className={`text-sm font-bold font-mono flex items-center ${
                isPositive ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {isPositive ? "+" : ""}
              {change.toFixed(2)} ({isPositive ? "+" : ""}
              {changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Timeframe selector & disclaimer */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1">
            {(["1D", "1W", "1M", "3M", "1Y"] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  timeframe === tf
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-800 font-semibold">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Delayed · Educational</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div ref={chartContainerRef} className="w-full rounded-xl overflow-hidden min-h-[380px]" />
    </div>
  );
}
