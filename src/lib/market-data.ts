export interface StockQuote {
  symbol: string;
  name: string;
  sector: string;
  currentPrice: number;
  prevClose: number;
  openPrice: number;
  dayHigh: number;
  dayLow: number;
  volume: number;
  change: number;
  changePercent: number;
  marketCapCr: number; // in Crores
  peRatio: number;
  pbRatio: number;
  dividendYield: number;
  description: string;
}

export interface MutualFundData {
  schemeCode: string;
  schemeName: string;
  category: "Flexi Cap" | "Large Cap" | "Mid Cap" | "Small Cap" | "Index" | "Debt" | "Thematic" | "Gold";
  amc: string;
  nav: number;
  prevNav: number;
  change: number;
  changePercent: number;
  expenseRatio: number;
  cagr3Y: number;
  cagr5Y: number;
  aumCr: number;
  riskRating: "Low" | "Moderate" | "Moderately High" | "Very High";
  minSip: number;
  minLumpSum: number;
  description: string;
}

export const STOCKS_DATA: StockQuote[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    sector: "Energy & Conglomerate",
    currentPrice: 2984.5,
    prevClose: 2955.0,
    openPrice: 2962.0,
    dayHigh: 2998.0,
    dayLow: 2950.2,
    volume: 5824100,
    change: 29.5,
    changePercent: 1.0,
    marketCapCr: 2019400,
    peRatio: 28.4,
    pbRatio: 2.3,
    dividendYield: 0.35,
    description: "India's largest company by market cap, spanning oil refining, telecom (Jio), retail, and green energy.",
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    sector: "Information Technology",
    currentPrice: 4120.0,
    prevClose: 4145.0,
    openPrice: 4135.0,
    dayHigh: 4160.0,
    dayLow: 4095.0,
    volume: 2410800,
    change: -25.0,
    changePercent: -0.6,
    marketCapCr: 1490200,
    peRatio: 31.8,
    pbRatio: 13.9,
    dividendYield: 1.25,
    description: "Flagship IT services and consulting arm of Tata Group with global presence and high return on equity.",
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    sector: "Banking & Financials",
    currentPrice: 1685.2,
    prevClose: 1670.0,
    openPrice: 1675.0,
    dayHigh: 1692.5,
    dayLow: 1668.0,
    volume: 12450000,
    change: 15.2,
    changePercent: 0.91,
    marketCapCr: 1285000,
    peRatio: 18.6,
    pbRatio: 2.7,
    dividendYield: 1.15,
    description: "India's largest private sector bank following its historic merger with housing finance giant HDFC.",
  },
  {
    symbol: "INFY",
    name: "Infosys Ltd",
    sector: "Information Technology",
    currentPrice: 1845.0,
    prevClose: 1825.0,
    openPrice: 1832.0,
    dayHigh: 1858.0,
    dayLow: 1822.0,
    volume: 6730200,
    change: 20.0,
    changePercent: 1.1,
    marketCapCr: 765400,
    peRatio: 29.5,
    pbRatio: 8.8,
    dividendYield: 2.1,
    description: "Pioneer in Indian IT services, enterprise digital transformation, cloud migrations, and generative AI services.",
  },
  {
    symbol: "ICICIBANK",
    name: "ICICI Bank Ltd",
    sector: "Banking & Financials",
    currentPrice: 1242.0,
    prevClose: 1230.0,
    openPrice: 1235.0,
    dayHigh: 1249.5,
    dayLow: 1231.0,
    volume: 9140000,
    change: 12.0,
    changePercent: 0.98,
    marketCapCr: 875200,
    peRatio: 17.8,
    pbRatio: 3.1,
    dividendYield: 0.85,
    description: "Top-tier private bank known for digital agility, retail lending, and industry-leading return ratios.",
  },
  {
    symbol: "ITC",
    name: "ITC Ltd",
    sector: "FMCG & Hotels",
    currentPrice: 482.4,
    prevClose: 480.0,
    openPrice: 481.5,
    dayHigh: 486.0,
    dayLow: 479.2,
    volume: 11200000,
    change: 2.4,
    changePercent: 0.5,
    marketCapCr: 602100,
    peRatio: 29.2,
    pbRatio: 8.4,
    dividendYield: 2.85,
    description: "Diversified conglomerate with cigarettes, branded packaged foods, agri-business, paperboards, and hotels.",
  },
  {
    symbol: "TATAMOTORS",
    name: "Tata Motors Ltd",
    sector: "Automotive & EV",
    currentPrice: 940.0,
    prevClose: 928.0,
    openPrice: 932.0,
    dayHigh: 948.5,
    dayLow: 925.0,
    volume: 8500200,
    change: 12.0,
    changePercent: 1.29,
    marketCapCr: 345000,
    peRatio: 10.4,
    pbRatio: 3.8,
    dividendYield: 0.65,
    description: "India's electric vehicle leader and owner of luxury British automaker Jaguar Land Rover (JLR).",
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel Ltd",
    sector: "Telecommunications",
    currentPrice: 1612.0,
    prevClose: 1605.0,
    openPrice: 1608.0,
    dayHigh: 1625.0,
    dayLow: 1600.0,
    volume: 4120300,
    change: 7.0,
    changePercent: 0.44,
    marketCapCr: 915000,
    peRatio: 64.2,
    pbRatio: 8.6,
    dividendYield: 0.5,
    description: "Pan-India and Africa telecom giant with strong ARPU growth and enterprise digital connectivity services.",
  },
  {
    symbol: "SBIN",
    name: "State Bank of India",
    sector: "Public Sector Banking",
    currentPrice: 818.5,
    prevClose: 825.0,
    openPrice: 822.0,
    dayHigh: 828.0,
    dayLow: 815.0,
    volume: 14500000,
    change: -6.5,
    changePercent: -0.79,
    marketCapCr: 730400,
    peRatio: 10.8,
    pbRatio: 1.6,
    dividendYield: 1.7,
    description: "The nation's largest public sector bank with over 22,000 branches serving over 480 million customers.",
  },
  {
    symbol: "LT",
    name: "Larsen & Toubro Ltd",
    sector: "Capital Goods & Infrastructure",
    currentPrice: 3620.0,
    prevClose: 3590.0,
    openPrice: 3600.0,
    dayHigh: 3645.0,
    dayLow: 3585.0,
    volume: 1820400,
    change: 30.0,
    changePercent: 0.84,
    marketCapCr: 498000,
    peRatio: 37.1,
    pbRatio: 5.2,
    dividendYield: 0.95,
    description: "India's premier engineering, procurement, construction, and high-tech manufacturing multinational.",
  },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki India",
    sector: "Automotive",
    currentPrice: 12150.0,
    prevClose: 12050.0,
    openPrice: 12080.0,
    dayHigh: 12240.0,
    dayLow: 12010.0,
    volume: 480200,
    change: 100.0,
    changePercent: 0.83,
    marketCapCr: 382000,
    peRatio: 26.5,
    pbRatio: 4.3,
    dividendYield: 1.05,
    description: "Passenger vehicle market share leader in India known for fuel efficiency and strong hybrid models.",
  },
  {
    symbol: "TITAN",
    name: "Titan Company Ltd",
    sector: "Consumer Discretionary",
    currentPrice: 3420.0,
    prevClose: 3450.0,
    openPrice: 3445.0,
    dayHigh: 3465.0,
    dayLow: 3395.0,
    volume: 980400,
    change: -30.0,
    changePercent: -0.87,
    marketCapCr: 303600,
    peRatio: 84.5,
    pbRatio: 24.2,
    dividendYield: 0.32,
    description: "Tata Group's lifestyle jewel: Tanishq jewellery, Fastrack, Titan watches, and Mia.",
  },
];

export const MUTUAL_FUNDS_DATA: MutualFundData[] = [
  {
    schemeCode: "122639",
    schemeName: "Parag Parikh Flexi Cap Fund - Direct Plan - Growth",
    category: "Flexi Cap",
    amc: "PPFAS Mutual Fund",
    nav: 79.84,
    prevNav: 79.12,
    change: 0.72,
    changePercent: 0.91,
    expenseRatio: 0.62,
    cagr3Y: 22.4,
    cagr5Y: 24.1,
    aumCr: 72450,
    riskRating: "Very High",
    minSip: 1000,
    minLumpSum: 1000,
    description: "Value-oriented fund investing across Indian large, mid, small caps and selective US tech leaders.",
  },
  {
    schemeCode: "118989",
    schemeName: "Mirae Asset Large Cap Fund - Direct Plan - Growth",
    category: "Large Cap",
    amc: "Mirae Asset Mutual Fund",
    nav: 114.65,
    prevNav: 113.85,
    change: 0.8,
    changePercent: 0.7,
    expenseRatio: 0.54,
    cagr3Y: 16.8,
    cagr5Y: 17.2,
    aumCr: 39500,
    riskRating: "Very High",
    minSip: 500,
    minLumpSum: 5000,
    description: "Bluechip portfolio targeting top 100 Indian companies with established business models.",
  },
  {
    schemeCode: "147944",
    schemeName: "HDFC NIFTY 50 Index Fund - Direct Plan - Growth",
    category: "Index",
    amc: "HDFC Mutual Fund",
    nav: 24.88,
    prevNav: 24.71,
    change: 0.17,
    changePercent: 0.69,
    expenseRatio: 0.2,
    cagr3Y: 14.9,
    cagr5Y: 16.1,
    aumCr: 16200,
    riskRating: "Very High",
    minSip: 500,
    minLumpSum: 100,
    description: "Ultra low-cost passive index fund replicating India's flagship 50-stock index with minimal tracking error.",
  },
  {
    schemeCode: "120503",
    schemeName: "Nippon India Small Cap Fund - Direct Plan - Growth",
    category: "Small Cap",
    amc: "Nippon India Mutual Fund",
    nav: 172.4,
    prevNav: 170.1,
    change: 2.3,
    changePercent: 1.35,
    expenseRatio: 0.69,
    cagr3Y: 29.5,
    cagr5Y: 33.2,
    aumCr: 58900,
    riskRating: "Very High",
    minSip: 1000,
    minLumpSum: 5000,
    description: "High alpha small-cap fund picking emerging niche businesses with substantial runway for expansion.",
  },
  {
    schemeCode: "119551",
    schemeName: "ICICI Prudential Liquid Fund - Direct Plan - Growth",
    category: "Debt",
    amc: "ICICI Prudential Mutual Fund",
    nav: 368.42,
    prevNav: 368.21,
    change: 0.21,
    changePercent: 0.06,
    expenseRatio: 0.22,
    cagr3Y: 7.2,
    cagr5Y: 6.4,
    aumCr: 45200,
    riskRating: "Low",
    minSip: 1000,
    minLumpSum: 500,
    description: "Low-volatility debt fund parking capital in up to 91-day maturity instruments. Ideal for emergency cash.",
  },
  {
    schemeCode: "127042",
    schemeName: "Motilal Oswal Midcap Fund - Direct Plan - Growth",
    category: "Mid Cap",
    amc: "Motilal Oswal Mutual Fund",
    nav: 98.75,
    prevNav: 97.4,
    change: 1.35,
    changePercent: 1.39,
    expenseRatio: 0.65,
    cagr3Y: 28.2,
    cagr5Y: 26.8,
    aumCr: 21300,
    riskRating: "Very High",
    minSip: 500,
    minLumpSum: 500,
    description: "Focused QGLP (Quality, Growth, Longevity, Price) investing in high-conviction mid-sized businesses.",
  },
  {
    schemeCode: "135781",
    schemeName: "SBI Sovereign Gold ETF FoF - Direct Plan - Growth",
    category: "Gold",
    amc: "SBI Mutual Fund",
    nav: 23.45,
    prevNav: 23.3,
    change: 0.15,
    changePercent: 0.64,
    expenseRatio: 0.35,
    cagr3Y: 17.8,
    cagr5Y: 15.4,
    aumCr: 4800,
    riskRating: "Moderate",
    minSip: 500,
    minLumpSum: 500,
    description: "Digital hedge investing directly in 99.5% pure physical gold and sovereign gold instruments without making charges.",
  },
];

export function getStock(symbol: string): StockQuote | undefined {
  return STOCKS_DATA.find((s) => s.symbol.toUpperCase() === symbol.toUpperCase());
}

export function getMutualFund(code: string): MutualFundData | undefined {
  return MUTUAL_FUNDS_DATA.find((mf) => mf.schemeCode === code);
}

/**
 * Generates realistic synthetic historical OHLC data for Lightweight Charts
 */
export function generateCandlestickData(basePrice: number, days: number = 60) {
  const result: { time: string; open: number; high: number; low: number; close: number; volume: number }[] = [];
  let current = basePrice * 0.85; // start lower 60 days ago
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    // skip weekends
    if (d.getDay() === 0 || d.getDay() === 6) continue;

    const timeStr = d.toISOString().split("T")[0];
    const dailyVol = 0.018; // 1.8% daily volatility
    const trend = 0.0012; // slight upward drift
    const change = (Math.random() - 0.48) * 2 * dailyVol + trend;

    const open = current;
    const close = Number((open * (1 + change)).toFixed(2));
    const high = Number((Math.max(open, close) * (1 + Math.random() * 0.012)).toFixed(2));
    const low = Number((Math.min(open, close) * (1 - Math.random() * 0.012)).toFixed(2));
    const volume = Math.floor(100000 + Math.random() * 800000);

    result.push({
      time: timeStr,
      open,
      high,
      low,
      close,
      volume,
    });

    current = close;
  }

  // Ensure last candle closes near basePrice
  if (result.length > 0) {
    result[result.length - 1].close = basePrice;
    result[result.length - 1].high = Math.max(result[result.length - 1].high, basePrice);
  }

  return result;
}

/**
 * Checks if Indian stock markets are currently open (IST 09:15 to 15:30, Mon-Fri)
 */
export function isMarketOpen(demoOverride: boolean = true): {
  isOpen: boolean;
  message: string;
} {
  if (demoOverride) {
    return {
      isOpen: true,
      message: "Market Arena Live (Demo Mode Active - Instant Execution)",
    };
  }

  // IST is UTC + 5:30
  const now = new Date();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const istMinutes = utcHours * 60 + utcMinutes + 330;
  const day = now.getUTCDay();

  // Weekend
  if (day === 0 || day === 6) {
    return {
      isOpen: false,
      message: "Markets Closed (Weekend). Limit orders will wait for Monday 09:15 IST.",
    };
  }

  // 09:15 = 555 minutes, 15:30 = 930 minutes
  if (istMinutes >= 555 && istMinutes <= 930) {
    return {
      isOpen: true,
      message: "Regular Market Hours (09:15 - 15:30 IST)",
    };
  }

  return {
    isOpen: false,
    message: "After-Hours Session. Market orders rejected; limit orders queued for 09:15 IST.",
  };
}
