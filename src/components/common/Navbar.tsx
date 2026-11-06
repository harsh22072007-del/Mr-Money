"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Wallet,
  BookOpen,
  TrendingUp,
  PieChart,
  Award,
  RotateCcw,
  Menu,
  X,
  Flame,
  Zap,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number>(100000);
  const [userXP, setUserXP] = useState<number>(25);
  const [streakDays, setStreakDays] = useState<number>(1);
  const [isResetting, setIsResetting] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const refreshSession = async () => {
    try {
      const res = await fetch("/api/session");
      if (res.ok) {
        const data = await res.json();
        if (data.wallet) {
          setWalletBalance(data.wallet.balance);
        }
        if (data.progress) {
          setUserXP(data.progress.xp);
          setStreakDays(data.progress.streakDays || 1);
        }
      }
    } catch (e) {
      console.error("Error refreshing session:", e);
    }
  };

  useEffect(() => {
    refreshSession();
    const interval = setInterval(refreshSession, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleResetWallet = async () => {
    try {
      setIsResetting(true);
      const res = await fetch("/api/wallet/reset", { method: "POST" });
      if (res.ok) {
        await refreshSession();
        setResetModalOpen(false);
        window.location.reload();
      }
    } catch (e) {
      console.error("Error resetting wallet:", e);
    } finally {
      setIsResetting(false);
    }
  };

  const navLinks = [
    { href: "/", label: "Dashboard", icon: PieChart },
    { href: "/academy", label: "Academy", icon: BookOpen },
    { href: "/arena", label: "Market Arena", icon: TrendingUp },
    { href: "/mutual-funds", label: "Mutual Funds", icon: Wallet },
    { href: "/portfolio", label: "Portfolio", icon: PieChart },
    { href: "/achievements", label: "Achievements", icon: Award },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-500 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center font-black text-emerald-600 text-lg">
                ₹
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Mr. Money
                </span>
                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-semibold uppercase">
                  Beta
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">Fintech & EdTech Arena</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-slate-100 text-slate-900 shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User Pills & Wallet */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cash Balance Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl shadow-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 leading-none">
                  Virtual Cash
                </span>
                <span className="text-sm font-bold font-mono text-emerald-700 leading-tight">
                  ₹{walletBalance.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            {/* XP Pill */}
            <Link
              href="/achievements"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 border border-amber-200 rounded-xl hover:border-amber-300 transition-colors shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold font-mono text-amber-800">{userXP} XP</span>
            </Link>

            {/* Streak */}
            <div
              title={`${streakDays} Day Learning Streak`}
              className="hidden md:flex items-center gap-1 px-2 py-1.5 bg-orange-50 border border-orange-200 rounded-xl text-orange-700 text-xs font-bold shadow-xs"
            >
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              <span>{streakDays}d</span>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => setResetModalOpen(true)}
              title="Reset Wallet to ₹1,00,000"
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-md">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? "bg-slate-100 text-slate-900 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Reset Confirmation Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Reset Virtual Portfolio?</h3>
                <p className="text-xs text-slate-500">Archive current history & restart with ₹1,00,000</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              This will safely archive your existing stock and mutual fund holdings into historical
              records and restore your cash balance to a pristine{" "}
              <strong className="text-emerald-700 font-mono">₹1,00,000</strong>. Your learning XP and
              unlocked badges will stay intact!
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setResetModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetWallet}
                disabled={isResetting}
                className="px-4 py-2 text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
              >
                {isResetting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-4 h-4" />
                    Confirm Reset
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
