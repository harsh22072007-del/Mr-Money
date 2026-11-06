import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/common/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mr. Money – Gamified Financial Literacy & Virtual Investment Platform",
  description:
    "Master banking, taxes, corporate finance, and virtual stock & mutual fund paper trading with Mr. Money.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-2">
          <p>
            <strong className="text-slate-800">Mr. Money</strong> is an educational paper trading & financial literacy simulation
            platform. All transactions use simulated virtual capital (₹1,00,000 initial grant).
          </p>
          <p className="text-[11px] text-slate-400">
            Stock quotes are delayed for educational demonstration under NSE learning principles. Mutual
            fund data sourced from AMFI historical benchmarks. Not financial advice.
          </p>
        </footer>
      </body>
    </html>
  );
}
