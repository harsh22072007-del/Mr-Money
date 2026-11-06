"use client";

import React, { useState, useEffect } from "react";
import { MUTUAL_FUNDS_DATA, MutualFundData } from "@/lib/market-data";
import { FundCard } from "@/components/mutual-funds/FundCard";
import { InvestModal } from "@/components/mutual-funds/InvestModal";
import { MrMoneyMascot } from "@/components/mascot/MrMoneyMascot";
import { Layers, Sparkles } from "lucide-react";

export default function MutualFundsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedFund, setSelectedFund] = useState<MutualFundData | null>(null);
  const [investMode, setInvestMode] = useState<"LUMP" | "SIP">("LUMP");
  const [modalOpen, setModalOpen] = useState(false);
  const [wallet, setWallet] = useState<any>(null);
  const [redeemLoading, setRedeemLoading] = useState(false);

  const categories = [
    "All",
    "Flexi Cap",
    "Large Cap",
    "Mid Cap",
    "Small Cap",
    "Index",
    "Debt",
    "Gold",
  ];

  const fetchSession = async () => {
    try {
      const res = await fetch("/api/session");
      if (res.ok) {
        const data = await res.json();
        setWallet(data.wallet);
      }
    } catch (e) {
      console.error("Error fetching session:", e);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const filteredFunds = MUTUAL_FUNDS_DATA.filter(
    (f) => activeCategory === "All" || f.category === activeCategory
  );

  const handleInvest = (fund: MutualFundData, mode: "LUMP" | "SIP") => {
    setSelectedFund(fund);
    setInvestMode(mode);
    setModalOpen(true);
  };

  const handleRedeem = async (schemeCode: string, unitsToRedeem: number) => {
    if (!confirm(`Are you sure you want to redeem ${unitsToRedeem.toFixed(3)} units?`)) return;

    try {
      setRedeemLoading(true);
      const res = await fetch("/api/mutual-funds", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schemeCode, unitsToRedeem }),
      });

      if (res.ok) {
        await fetchSession();
      }
    } catch (e) {
      console.error("Error redeeming units:", e);
    } finally {
      setRedeemLoading(false);
    }
  };

  const mfHoldings = wallet?.mfHoldings || [];
  const sipSchedules = wallet?.sipSchedules || [];
  const availableCash = wallet?.balance || 100000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Mentor Header */}
      <MrMoneyMascot
        quote="Mutual funds are the easiest vehicle for retail wealth building in India. By choosing Direct Plans, you cut out middleman commissions, and an automated SIP ensures you never have to time the market!"
        mood="mentor"
      />

      {/* Holdings & SIP Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Mutual Fund Portfolio Value
          </span>
          <div className="text-2xl font-black font-mono text-emerald-700">
            ₹{(wallet?.mfHoldingsValue || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </div>
          <span className="text-xs text-slate-500">{mfHoldings.length} Funds Held</span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Active Monthly SIPs
          </span>
          <div className="text-2xl font-black font-mono text-amber-700">
            ₹
            {sipSchedules
              .reduce((sum: number, s: any) => sum + s.monthlyAmount, 0)
              .toLocaleString("en-IN")}{" "}
            <span className="text-xs text-slate-500 font-sans font-normal">/ month</span>
          </div>
          <span className="text-xs text-slate-500">{sipSchedules.length} Automated SIPs</span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-1 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            Liquid Virtual Cash
          </span>
          <div className="text-2xl font-black font-mono text-slate-900">
            ₹{availableCash.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </div>
          <span className="text-xs text-slate-500">Ready to Deploy</span>
        </div>
      </div>

      {/* Active Holdings Table (if any) */}
      {mfHoldings.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            Your Mutual Fund Portfolio
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2.5 px-3">Scheme Name</th>
                  <th className="py-2.5 px-3">Units</th>
                  <th className="py-2.5 px-3">Avg NAV</th>
                  <th className="py-2.5 px-3">Current NAV</th>
                  <th className="py-2.5 px-3">Invested Value</th>
                  <th className="py-2.5 px-3">Current Value</th>
                  <th className="py-2.5 px-3">P&L</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {mfHoldings.map((h: any) => {
                  const isPositive = (h.pnl || 0) >= 0;
                  return (
                    <tr key={h.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-sans font-semibold text-slate-900">
                        {h.schemeName}
                      </td>
                      <td className="py-3 px-3 text-slate-700">{h.units.toFixed(3)}</td>
                      <td className="py-3 px-3 text-slate-500">₹{h.averageNav.toFixed(2)}</td>
                      <td className="py-3 px-3 text-slate-700">₹{h.currentNav.toFixed(2)}</td>
                      <td className="py-3 px-3 text-slate-500">
                        ₹{h.investedAmount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-3 text-slate-900 font-bold">
                        ₹{h.currentValue.toLocaleString("en-IN")}
                      </td>
                      <td
                        className={`py-3 px-3 font-bold ${
                          isPositive ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {isPositive ? "+" : ""}₹{h.pnl.toLocaleString("en-IN")} (
                        {isPositive ? "+" : ""}
                        {h.pnlPercent.toFixed(2)}%)
                      </td>
                      <td className="py-3 px-3 text-right font-sans">
                        <button
                          type="button"
                          onClick={() => handleRedeem(h.schemeCode, h.units)}
                          disabled={redeemLoading}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 rounded-lg text-[11px] font-semibold transition-colors border border-slate-200"
                        >
                          Redeem
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Explorer Header & Category Filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Explore Direct Growth Mutual Funds
            </h2>
            <p className="text-xs text-slate-500">
              Curated top-performing funds across equity, debt, and gold asset classes
            </p>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Funds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFunds.map((fund) => (
            <FundCard key={fund.schemeCode} fund={fund} onInvest={handleInvest} />
          ))}
        </div>
      </div>

      {/* Invest Modal */}
      {modalOpen && selectedFund && (
        <InvestModal
          fund={selectedFund}
          mode={investMode}
          availableCash={availableCash}
          onClose={() => setModalOpen(false)}
          onSuccess={fetchSession}
        />
      )}
    </div>
  );
}
