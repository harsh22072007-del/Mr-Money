export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "Academy" | "Trading" | "MutualFunds" | "Milestone";
  requiredXP: number;
}

export const ALL_BADGES: BadgeDefinition[] = [
  {
    id: "WELCOME_TRADER",
    title: "Welcome to Dalal Street",
    description: "Started your financial literacy journey on Mr. Money.",
    icon: "award",
    category: "Milestone",
    requiredXP: 25,
  },
  {
    id: "COMPOUND_MAESTRO",
    title: "Rule of 72 Master",
    description: "Mastered compound interest and inflation dynamics in Level 1 Chapter 1.",
    icon: "zap",
    category: "Academy",
    requiredXP: 75,
  },
  {
    id: "DEBT_DETECTIVE",
    title: "Debt Trap Buster",
    description: "Calculated loan EMIs and voluntary debt prepayment mathematics.",
    icon: "shield-alert",
    category: "Academy",
    requiredXP: 125,
  },
  {
    id: "TAX_NINJA",
    title: "Tax Ninja (AY 2026-27)",
    description: "Decoded Old vs New tax regimes and calculated net taxable income.",
    icon: "file-text",
    category: "Academy",
    requiredXP: 185,
  },
  {
    id: "BUSINESS_ACUMEN",
    title: "Unit Economics Analyst",
    description: "Mastered business models, gross margins, EBITDA, and company profitability.",
    icon: "pie-chart",
    category: "Academy",
    requiredXP: 235,
  },
  {
    id: "EQUITY_PIONEER",
    title: "Capital Allocator",
    description: "Completed the interactive Equity vs Debt startup fundraising simulation.",
    icon: "briefcase",
    category: "Academy",
    requiredXP: 295,
  },
  {
    id: "STATEMENT_DECODER",
    title: "Financial Statement Sleuth",
    description: "Decoded how Income Statement, Balance Sheet, and Cash Flow connect.",
    icon: "layers",
    category: "Academy",
    requiredXP: 355,
  },
  {
    id: "SIP_WARRIOR",
    title: "Disciplined Wealth Builder",
    description: "Mastered Direct Growth mutual fund NAV mechanics and SIP rupee-cost averaging.",
    icon: "repeat",
    category: "MutualFunds",
    requiredXP: 405,
  },
  {
    id: "PRICE_ACTION_PRO",
    title: "Price Action & Candlestick Pro",
    description: "Mastered Japanese candlestick anatomy, OHLC, support/resistance, and volume.",
    icon: "trending-up",
    category: "Trading",
    requiredXP: 465,
  },
  {
    id: "RISK_GUARDIAN",
    title: "Risk Guardian & Master Financier",
    description: "Mastered position sizing, 1:2 risk-to-reward ratio, stop-loss discipline, and drawdown control.",
    icon: "crown",
    category: "Milestone",
    requiredXP: 535,
  },
];

export function calculateLevelFromXP(xp: number): {
  levelNumber: number;
  levelTitle: string;
  nextLevelXP: number;
  progressPercent: number;
} {
  if (xp < 100) {
    return {
      levelNumber: 1,
      levelTitle: "Level 1: Personal Finance Novice",
      nextLevelXP: 100,
      progressPercent: Math.min(100, Math.round((xp / 100) * 100)),
    };
  } else if (xp < 250) {
    return {
      levelNumber: 2,
      levelTitle: "Level 2: Business & Financial Analyst",
      nextLevelXP: 250,
      progressPercent: Math.min(100, Math.round(((xp - 100) / 150) * 100)),
    };
  } else if (xp < 500) {
    return {
      levelNumber: 3,
      levelTitle: "Level 3: Strategic Market Trader",
      nextLevelXP: 500,
      progressPercent: Math.min(100, Math.round(((xp - 250) / 250) * 100)),
    };
  } else {
    return {
      levelNumber: 4,
      levelTitle: "Level 4: Master Financier",
      nextLevelXP: 1000,
      progressPercent: 100,
    };
  }
}
