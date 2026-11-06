export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  mrMoneyFeedback: string;
}

export interface AcademyChapter {
  id: string;
  level: 1 | 2 | 3;
  chapterNumber: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  xpReward: number;
  badgeReward?: string;
  conceptIntro: string;
  mrMoneyQuote: string;
  deepDive: string[];
  realWorldExample: {
    title: string;
    description: string;
  };
  interactiveType:
    | "interest_calc"
    | "emi_calc"
    | "tax_calc"
    | "capital_raise_sim"
    | "margin_calc"
    | "position_sizing_calc"
    | "none";
  quiz: QuizQuestion[];
}

export const ACADEMY_LEVELS = [
  {
    level: 1,
    title: "Level 1: Banking & Taxes",
    description:
      "Master personal cash flow, banking systems, debt traps, EMIs, and Indian taxation under AY 2026-27.",
    badgeId: "TAX_NINJA",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
    accent: "text-emerald-700",
  },
  {
    level: 2,
    title: "Level 2: Financial Intelligence",
    description:
      "Learn how businesses generate cash, unit economics, equity vs debt fundraising, and 3-way financial statement connections.",
    badgeId: "STATEMENT_DECODER",
    color: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-500/30",
    accent: "text-blue-700",
  },
  {
    level: 3,
    title: "Level 3: Investing & Trading",
    description:
      "Navigate mutual fund SIPs, candlestick anatomy, technical indicators, and strict position-sizing risk management.",
    badgeId: "RISK_GUARDIAN",
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30",
    accent: "text-amber-700",
  },
];

export const CHAPTERS_DATA: AcademyChapter[] = [
  // ================= LEVEL 1 =================
  {
    id: "lvl1-ch1-money-banking",
    level: 1,
    chapterNumber: 1,
    title: "Understanding Money, Banking & Compounding",
    subtitle: "How the RBI, banking reserves, UPI, and compound interest shape your wealth",
    estimatedMinutes: 6,
    xpReward: 50,
    badgeReward: "COMPOUND_MAESTRO",
    mrMoneyQuote:
      "Welcome, friend! Money left idle under your mattress loses purchasing power every single hour due to inflation. Let's make your money work harder than you do!",
    conceptIntro:
      "Money is a medium of exchange, store of value, and unit of account. When you deposit money in a bank, the bank keeps a fraction as cash reserve (CRR) and lends the rest to businesses and home buyers. In return, you earn interest. But the true superpower is Compound Interest — earning interest on your interest.",
    deepDive: [
      "Simple Interest (SI = P × R × T / 100) pays you interest only on your initial capital.",
      "Compound Interest (A = P(1 + r/n)^(nt)) pays interest on both principal and accumulated interest. Over 15-20 years, compounding accounts for over 70% of total wealth creation.",
      "The Rule of 72: Divide 72 by the annual interest rate to find out how many years it takes for your money to double. At 12% returns, money doubles in 72 ÷ 12 = 6 years!",
      "Inflation is the silent wealth destroyer. If inflation is 6% and your savings account yields 3.5%, your real return is -2.5% per year.",
      "UPI (Unified Payments Interface) operated by NPCI processes over 14 billion instant transactions per month at zero MDR for consumers.",
    ],
    realWorldExample: {
      title: "The ₹5,000/month Compounding Miracle",
      description:
        "If an 18-year-old Indian student invests ₹5,000/month in a NIFTY 50 index fund yielding 12% annually, by age 48 (30 years) they invest ₹18 Lakhs total. But their wealth reaches ₹1.76 Crores! Compounding generated ₹1.58 Crores of pure profit.",
    },
    interactiveType: "interest_calc",
    quiz: [
      {
        id: "q1-1",
        question:
          "According to the Rule of 72, if an investment earns a steady 8% annual return, approximately how many years will it take to double?",
        options: ["6 years", "9 years", "12 years", "18 years"],
        correctIndex: 1,
        explanation:
          "72 divided by 8 = 9 years! At 8% annual return, your money doubles every 9 years.",
        mrMoneyFeedback:
          "Bang on! The Rule of 72 is the quickest mental math trick every smart investor carries in their pocket.",
      },
      {
        id: "q1-2",
        question:
          "If retail inflation in India is 6% per annum and your savings account pays 3% interest, what is your real purchasing power growth?",
        options: ["+3% per year", "+9% per year", "-3% per year (losing purchasing power)", "0% (breakeven)"],
        correctIndex: 2,
        explanation:
          "Real Return = Nominal Interest - Inflation (3% - 6% = -3%). Your money buys 3% fewer goods every year.",
        mrMoneyFeedback:
          "Exactly right. Keeping all your emergency savings in low-yield savings accounts guarantees wealth destruction.",
      },
    ],
  },
  {
    id: "lvl1-ch2-loans-debt",
    level: 1,
    chapterNumber: 2,
    title: "Loans, Debt & The EMI Trap",
    subtitle: "Secured vs unsecured loans, amortisation math, and beating high interest debt",
    estimatedMinutes: 7,
    xpReward: 50,
    badgeReward: "DEBT_DETECTIVE",
    mrMoneyQuote:
      "Debt is like fire: harnessed properly, it can cook your meal (buying a productive home); handled carelessly, it burns down the house. Let's master the math behind EMIs!",
    conceptIntro:
      "An Equated Monthly Installment (EMI) consists of both principal repayment and interest. In the initial years of any loan, your EMI goes mostly toward interest, while only a small slice reduces the actual principal. Understanding how prepayments dramatically cut total interest is the key to financial freedom.",
    deepDive: [
      "Secured Loans (Home loans, Vehicle loans) have collateral attached. Interest rates are lower (8.5% - 10%).",
      "Unsecured Loans (Personal loans, Credit cards) have no collateral. Interest rates are high (12% to 42% on credit card revolving balances!).",
      "Loan Amortization: In early years, interest dominates. Making just one extra EMI prepayment per year can slash a 20-year home loan down to 14 years and save lakhs in interest.",
      "CIBIL & Credit Scores: Ranging from 300 to 900. A score of 750+ qualifies you for the lowest loan interest rates. Keep your credit utilization below 30%.",
    ],
    realWorldExample: {
      title: "The ₹50 Lakh Home Loan Secret",
      description:
        "On a ₹50 Lakh home loan at 9% interest for 20 years, the monthly EMI is ₹44,986. Over 20 years, total interest paid is ₹57.9 Lakhs — more than the loan itself! Prepaying just ₹5,000 extra per month saves ₹18 Lakhs in interest.",
    },
    interactiveType: "emi_calc",
    quiz: [
      {
        id: "q2-1",
        question:
          "In the first year of a 20-year home loan, what makes up the largest portion of your monthly EMI?",
        options: [
          "Principal repayment",
          "Interest payment to the lender",
          "Processing fee",
          "GST tax credit",
        ],
        correctIndex: 1,
        explanation:
          "Because the outstanding principal balance is at its highest, the initial EMIs are overwhelmingly made up of interest charges.",
        mrMoneyFeedback:
          "Spot on! Lenders collect their interest first. That is why early voluntary prepayments deliver the highest ROI.",
      },
      {
        id: "q2-2",
        question:
          "What is generally considered an ideal Credit Utilization Ratio on your credit cards to maintain a healthy CIBIL score?",
        options: [
          "100% of your limit",
          "Below 30% of your credit limit",
          "Exactly 75%",
          "0% (never swipe)",
        ],
        correctIndex: 1,
        explanation:
          "Utilizing below 30% of your total assigned credit limit signals responsible borrowing and keeps your CIBIL score in the 750+ green zone.",
        mrMoneyFeedback:
          "Well done! Never max out your credit cards even if you intend to pay in full at billing cycle end.",
      },
    ],
  },
  {
    id: "lvl1-ch3-taxes",
    level: 1,
    chapterNumber: 3,
    title: "Income Tax Masterclass (AY 2026-27)",
    subtitle: "New vs Old Tax Regime, 87A rebate, standard deduction, and ITR filings",
    estimatedMinutes: 8,
    xpReward: 60,
    badgeReward: "TAX_NINJA",
    mrMoneyQuote:
      "Taxes are the single largest lifetime expense for salaried professionals. Understanding how Indian tax slabs and exemptions work is the fastest legal pay raise you'll ever give yourself!",
    conceptIntro:
      "In India, direct tax is paid on individual income. We currently have two parallel regimes: the Old Tax Regime (higher tax rates but allows deductions like 80C, 80D, HRA, and Home Loan interest) and the New Tax Regime (default, lower tax slabs, flat ₹75,000 standard deduction, and complete tax rebate up to ₹7.75 Lakhs taxable income under Section 87A).",
    deepDive: [
      "Financial Year (FY) is the year you earn income (April 1 to March 31). Assessment Year (AY 2026-27) is the succeeding evaluation year.",
      "New Tax Regime (Default): 0-3L: Nil, 3-7L: 5%, 7-10L: 10%, 10-12L: 15%, 12-15L: 20%, Above 15L: 30%.",
      "Section 87A Rebate: Under the New Regime, if net taxable income is up to ₹7 Lakhs (gross salary ₹7.75L after ₹75,000 std deduction), net tax payable is ₹0!",
      "Form 16 is your TDS certificate from employers. AIS shows all bank interest, share dividends, and stock trades reported to the IT Department.",
    ],
    realWorldExample: {
      title: "The ₹7.75 Lakh Zero-Tax Threshold",
      description:
        "A fresher earning ₹7.75 Lakhs gross salary chooses the New Regime. Standard deduction of ₹75,000 brings taxable income to ₹7.00 Lakhs. The tax of ₹20,000 is 100% rebated under Section 87A, resulting in ₹0 net tax payable!",
    },
    interactiveType: "tax_calc",
    quiz: [
      {
        id: "q6-1",
        question:
          "Under the New Tax Regime (AY 2026-27), up to what gross salaried income do you effectively pay ZERO income tax after standard deduction and Section 87A rebate?",
        options: ["₹3,00,000", "₹5,00,000", "₹7,75,000", "₹12,00,000"],
        correctIndex: 2,
        explanation:
          "Gross salary ₹7.75 Lakhs minus ₹75,000 standard deduction equals ₹7.00 Lakhs taxable income, which receives full Section 87A tax rebate.",
        mrMoneyFeedback:
          "Exceptional! This makes the New Regime exceptionally friendly for young graduates and entry-level professionals.",
      },
    ],
  },

  // ================= LEVEL 2 =================
  {
    id: "lvl2-ch1-business-models",
    level: 2,
    chapterNumber: 1,
    title: "Business Models, Unit Economics & Margins",
    subtitle: "Gross Margin vs EBITDA vs Net Profit, and how Indian giants generate sustainable cash",
    estimatedMinutes: 7,
    xpReward: 50,
    badgeReward: "BUSINESS_ACUMEN",
    mrMoneyQuote:
      "Revenue is vanity, profit is sanity, but cash flow is reality! Never judge a company just by how big its sales are — look at how much cash actually trickles down to the bottom line.",
    conceptIntro:
      "A business exists to generate value and convert that value into profit. Gross Margin measures production efficiency (Revenue minus direct Cost of Goods Sold). Operating Margin (EBITDA) measures core operational efficiency before interest and taxes. Net Profit is what shareholders actually get to keep.",
    deepDive: [
      "Gross Profit = Revenue - Cost of Goods Sold (COGS). High gross margins (60%+) give companies pricing power.",
      "EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) shows raw operational cash generation.",
      "Unit Economics: Profit made on a single transaction. (e.g. Swiggy earning ₹25 per food order after delivery partner fee, restaurant take-rate, and cloud server cost).",
      "Fixed vs Variable Costs: Software and tech companies scale rapidly because additional users have near-zero marginal cost.",
      "Negative Working Capital: Retailers like Avenue Supermarts (DMart) collect cash upfront from customers but pay suppliers after 30-45 days, effectively funding growth with vendor capital for free!",
    ],
    realWorldExample: {
      title: "DMart vs E-Commerce Burn Rate",
      description:
        "While venture-funded quick-commerce startups lost ₹50 per order on heavy delivery subsidies, Radhakishan Damani built DMart owning its store real estate, negotiating aggressive bulk discounts, and generating consistent 7% EBITDA margins.",
    },
    interactiveType: "margin_calc",
    quiz: [
      {
        id: "q2-ch1-1",
        question:
          "If an Indian enterprise has ₹100 Crores in revenue, ₹40 Crores in COGS, and ₹35 Crores in operational overheads (salaries, tech), what is its Operating EBITDA?",
        options: ["₹60 Crores", "₹25 Crores", "₹5 Crores", "₹75 Crores"],
        correctIndex: 1,
        explanation:
          "Gross Profit = 100 - 40 = 60 Cr. EBITDA = Gross Profit - Operating Overheads = 60 - 35 = ₹25 Crores.",
        mrMoneyFeedback:
          "Excellent accounting calculation! EBITDA is the primary metric institutional fund managers look at when valuing operating businesses.",
      },
      {
        id: "q2-ch1-2",
        question:
          "Why is 'Negative Working Capital' considered a major financial advantage for retailers like DMart?",
        options: [
          "They have zero bank loans",
          "They collect customer cash immediately but pay suppliers weeks later, creating free internal float",
          "They don't have to pay GST",
          "It guarantees 100% gross margin",
        ],
        correctIndex: 1,
        explanation:
          "Negative working capital means your suppliers fund your operational expansion without charging you interest.",
        mrMoneyFeedback:
          "Sharp eye! Warren Buffett famously used the same 'float' concept in insurance to build Berkshire Hathaway.",
      },
    ],
  },
  {
    id: "lvl2-ch2-capital-raise",
    level: 2,
    chapterNumber: 2,
    title: "How Companies Raise Capital: Equity vs Debt",
    subtitle: "Venture Capital, IPOs, dilution, interest obligations, and the growth equation",
    estimatedMinutes: 8,
    xpReward: 60,
    badgeReward: "EQUITY_PIONEER",
    mrMoneyQuote:
      "When a business wants to build factories or hire engineers, it needs capital. Should it sell shares (equity) or borrow from lenders (debt)? Every CEO faces this crucible!",
    conceptIntro:
      "Equity financing means selling fractional ownership of the company. You don't have to pay back the money if things go south, but you permanently share future profits and voting control. Debt financing means borrowing money: you retain 100% ownership, but you are legally bound to pay fixed interest and principal regardless of whether you make a profit.",
    deepDive: [
      "Venture Capital & Angel rounds: Early-stage risk capital where investors accept high failure rates in exchange for massive equity upside.",
      "Dilution: If you own 100% of 100 shares, and issue 50 new shares to an investor for ₹10 Lakhs, you now own 100 out of 150 shares (66.7%). Your percentage dropped, but 66.7% of a bigger pie is worth far more.",
      "Cost of Debt vs Cost of Equity: Debt is cheaper because interest is tax-deductible and lenders have liquidation priority. But excess debt causes bankruptcy.",
      "IPO (Initial Public Offering): The transition from a privately held company to listing shares on public stock exchanges like NSE and BSE.",
    ],
    realWorldExample: {
      title: "Zomato's Journey from Seed to Dalal Street",
      description:
        "Deepinder Goyal started Foodiebay (Zomato) bootstrapping. Over a decade, Zomato raised hundreds of millions in equity, diluting founder ownership to ~5%. In 2021, Zomato launched its ₹9,375 Crore IPO on NSE, creating massive wealth for public shareholders.",
    },
    interactiveType: "capital_raise_sim",
    quiz: [
      {
        id: "q2-ch3-1",
        question:
          "What is the primary risk a company takes when choosing heavy DEBT financing over equity financing?",
        options: [
          "Diluting founder voting power",
          "Mandatory interest payments even during zero-revenue periods, risking insolvency",
          "Surrendering company board seats to bondholders",
          "Being forced to delist from NSE",
        ],
        correctIndex: 1,
        explanation:
          "Debt contracts are legally binding obligations. If cash flows dry up, unpaid interest triggers NCLT insolvency proceedings.",
        mrMoneyFeedback:
          "Spot on! Debt boosts returns when times are good (financial leverage), but crushes companies in downturns.",
      },
    ],
  },
  {
    id: "lvl2-ch3-financial-statements",
    level: 2,
    chapterNumber: 3,
    title: "Connecting the Three Financial Statements",
    subtitle: "Income Statement, Balance Sheet & Cash Flow: The holy trinity of fundamental analysis",
    estimatedMinutes: 8,
    xpReward: 60,
    badgeReward: "STATEMENT_DECODER",
    mrMoneyQuote:
      "A company can show hundreds of crores in paper profits on its Income Statement and still go bankrupt next week if its Cash Flow is negative! Never buy a stock until you check all three statements.",
    conceptIntro:
      "Fundamental analysis relies on three interconnected financial statements: The Income Statement (revenue, expenses, net profit over a quarter/year), The Balance Sheet (snapshot of Assets = Liabilities + Equity at a specific date), and The Cash Flow Statement (actual cash entering and leaving via Operating, Investing, and Financing activities).",
    deepDive: [
      "The Golden Connection: Net Profit from the Income Statement flows into Retained Earnings on the Balance Sheet, and serves as the starting line for Cash Flow from Operations (CFO).",
      "Non-Cash Expenses: Depreciation is subtracted on the Income Statement to reduce tax, but added back in the Cash Flow statement because no actual cash left the bank account.",
      "Free Cash Flow (FCF) = Operating Cash Flow minus Capital Expenditure (CapEx). This is the true cash available to pay dividends, repurchase shares, or reinvest.",
      "Working Capital = Current Assets - Current Liabilities. If working capital balloons, cash gets locked up in unpaid customer invoices (receivables) or unsold warehouse goods (inventory).",
    ],
    realWorldExample: {
      title: "Tata Motors: Turning ₹28,000 Cr Loss into FCF Gold",
      description:
        "When Tata Motors faced massive debt and loss at JLR, new management focused on Free Cash Flow: cutting CapEx, optimizing working capital, and using operational cash flows to repay debt, sending the stock up over 8x on NSE.",
    },
    interactiveType: "none",
    quiz: [
      {
        id: "q2-ch4-1",
        question:
          "Why is Depreciation added BACK to Net Profit on the Cash Flow Statement?",
        options: [
          "Because depreciation is tax-exempt",
          "Because depreciation is a non-cash accounting expense; no physical money left the company's bank account",
          "To inflate company stock price",
          "Because SEBI mandates higher cash reserves",
        ],
        correctIndex: 1,
        explanation:
          "Depreciation spreads the historical cost of an asset over its lifetime on paper. Since no actual cash was paid out during the current period, it must be added back to compute real operational cash.",
        mrMoneyFeedback:
          "Masterful deduction! Understanding non-cash items separates casual gamblers from genuine fundamental analysts.",
      },
      {
        id: "q2-ch4-2",
        question:
          "What is Free Cash Flow (FCF)?",
        options: [
          "Cash given away for free by the government",
          "Operating Cash Flow minus Capital Expenditures (CapEx)",
          "Gross Revenue minus Dividend payouts",
          "Cash stored in current accounts without interest",
        ],
        correctIndex: 1,
        explanation:
          "Free Cash Flow represents the actual surplus cash generated by core operations after maintaining and expanding physical assets.",
        mrMoneyFeedback:
          "Bullseye! Free Cash Flow is the single most reliable predictor of long-term share price compounding.",
      },
    ],
  },
  {
    id: "lvl2-ch4-capital-raising",
    level: 2,
    chapterNumber: 4,
    title: "Capital Raising & Financing Choices",
    subtitle: "Debt vs equity, dilution, IPOs, and choosing the best financing mix",
    estimatedMinutes: 8,
    xpReward: 60,
    badgeReward: "CAPITAL_STRATEGIST",
    mrMoneyQuote:
      "A company is not just buying growth — it is choosing how much ownership and risk it is willing to sell to build that growth. The smartest founders balance leverage, dilution, and speed.",
    conceptIntro:
      "Every business eventually needs capital. It can raise money through equity, debt, venture capital, bank loans, rights issues, or IPOs. Each option changes the company's risk profile, control, and long-term flexibility. The right choice depends on stage, cash flow stability, and how much ownership the founder is willing to surrender.",
    deepDive: [
      "Equity financing sells ownership. It does not require fixed repayment, but it dilutes existing shareholders and can reduce founder control.",
      "Debt financing creates a repayment obligation. It avoids dilution but increases financial leverage and requires steady cash flow to service interest.",
      "Venture capital and private equity funds bring capital, network, and strategic support but often want rapid growth and a strong return path.",
      "IPO, FPO, and rights issues are public-market financing tools that allow large-scale capital access, but they also bring stricter compliance, scrutiny, and headline volatility.",
      "Dilution is not always bad: raising capital for a profitable use of funds can improve scale, market share, and long-term shareholder value.",
    ],
    realWorldExample: {
      title: "Zomato's Path to Public Capital",
      description:
        "Zomato used venture capital and then an IPO to raise growth capital at scale. While early investors gained big returns, founder dilution was meaningful. The company traded off control for access to public markets and expansion capital.",
    },
    interactiveType: "capital_raise_sim",
    quiz: [
      {
        id: "q2-ch4-1",
        question:
          "Which financing option generally avoids immediate repayment pressure but dilutes ownership?",
        options: [
          "Bank term loan",
          "Convertible debt",
          "Equity financing",
          "Credit card borrowing",
        ],
        correctIndex: 2,
        explanation:
          "Equity financing raises capital by issuing shares. It reduces the founder's ownership percentage, but it avoids mandatory interest payments and principal repayment pressure.",
        mrMoneyFeedback:
          "Exactly. Equity is powerful for growth, but it trades control for capital.",
      },
      {
        id: "q2-ch4-2",
        question:
          "What is the main danger of heavy debt financing during a business downturn?",
        options: [
          "Dividend tax hits",
          "Mandatory interest payments can cause insolvency if revenues fall",
          "Loss of board seats",
          "Compulsory public listing",
        ],
        correctIndex: 1,
        explanation:
          "Debt brings fixed obligations. During weak cash-flow periods, interest costs can overwhelm the business and push it toward distress or default.",
        mrMoneyFeedback:
          "Correct. Leverage amplifies upside and downside — the risk is real.",
      },
    ],
  },
  {
    id: "lvl2-ch5-macroeconomics-sectors",
    level: 2,
    chapterNumber: 5,
    title: "Macroeconomics, Sectors & Business Cycles",
    subtitle: "GDP, interest rates, inflation, sector rotation, and how the economy shapes company profits",
    estimatedMinutes: 9,
    xpReward: 70,
    badgeReward: "ECONOMY_READER",
    mrMoneyQuote:
      "The economy is the weather system for businesses. A great company in the wrong macro climate can still underperform, while a decent business in the right cycle can compound beautifully.",
    conceptIntro:
      "Macro trends affect revenue, margins, borrowing costs, consumption patterns, and valuation. The economy moves through phases: expansion, slowdown, recovery, and recession. Sector leadership changes with inflation, GDP growth, interest rates, and government policy. Understanding these cycles helps analysts choose better companies and better timing.",
    deepDive: [
      "GDP growth drives corporate revenues, industrial output, and employment. Strong GDP usually supports consumer demand and capex spending.",
      "Inflation reduces purchasing power and can squeeze margins if companies cannot pass costs to customers.",
      "RBI interest-rate decisions affect borrowing costs, home loan affordability, and risk appetite in equity markets.",
      "Cyclical sectors like autos, capital goods, and banks tend to outperform in growth phases, while defensive sectors like FMCG and utilities perform better in downturns.",
      "Sectoral analysis helps explain why the same broad market can have winners and losers at the same time.",
    ],
    realWorldExample: {
      title: "Auto Stocks During Rate Cuts",
      description:
        "When the RBI lowers rates or signals easing, auto and housing-linked sectors often benefit. Lower loan costs boost car demand and real-estate sentiment, which can lift company order books and valuations.",
    },
    interactiveType: "none",
    quiz: [
      {
        id: "q2-ch5-1",
        question:
          "Why do rising interest rates often hurt companies with high debt and consumer financing demand?",
        options: [
          "They lower tax rates",
          "Borrowing costs rise and demand can cool down",
          "They increase government subsidies",
          "They improve margins automatically",
        ],
        correctIndex: 1,
        explanation:
          "Higher rates raise financing costs and can slow consumer and business spending, which negatively affects revenues and profitability.",
        mrMoneyFeedback:
          "Exactly. Macro policy is not abstract — it hits balance sheets directly.",
      },
      {
        id: "q2-ch5-2",
        question:
          "Which sectors usually benefit most when the economy is expanding rapidly?",
        options: [
          "Utilities and staples only",
          "Autos, capital goods, banks, and discretionary consumption",
          "Gold mining only",
          "Insurance companies with no growth",
        ],
        correctIndex: 1,
        explanation:
          "Cyclical sectors are more sensitive to growth, demand, and credit expansion; they often enjoy stronger earnings and valuation expansion during booms.",
        mrMoneyFeedback:
          "Correct. Growth phases are where cyclical sectors tend to shine.",
      },
    ],
  },

  // ================= LEVEL 3 =================
  {
    id: "lvl3-ch1-mutual-funds",
    level: 3,
    chapterNumber: 1,
    title: "Mutual Funds & The Art of Asset Allocation",
    subtitle: "Direct vs Regular plans, expense ratios, NAV calculations, and SIP discipline",
    estimatedMinutes: 8,
    xpReward: 50,
    badgeReward: "SIP_WARRIOR",
    mrMoneyQuote:
      "Don't put all your eggs in one basket, but don't buy so many baskets that you can't keep track of them! Let's understand how top fund managers construct winning portfolios.",
    conceptIntro:
      "A Mutual Fund pools capital from thousands of retail investors to buy a diversified basket of stocks, bonds, or gold. The value of one unit is called the Net Asset Value (NAV). Choosing 'Direct Plans' bypasses distributor brokerages, saving you up to 1% to 1.5% in compounding fees every year.",
    deepDive: [
      "NAV (Net Asset Value): Total Scheme Assets minus Liabilities divided by Total Outstanding Units. Units are calculated to 3 decimal places upon investment.",
      "Expense Ratio: The annual percentage fee deducted daily by the AMC. A 1% difference in expense ratio over 25 years can eat up over 25% of your final accumulated corpus!",
      "SIP (Systematic Investment Plan) automates rupee-cost averaging: you buy more units when markets crash and fewer units when markets are pricey.",
      "Active vs Passive Index Funds: Passive index funds (like HDFC Nifty 50) track the index with rock-bottom 0.1% to 0.2% expense ratios.",
    ],
    realWorldExample: {
      title: "Direct vs Regular Plan: The ₹35 Lakh Fee Difference",
      description:
        "Two friends invest ₹10,000/month in identical equity funds generating 13% gross return over 25 years. Friend A chooses 'Direct' (0.5% fee), Friend B chooses 'Regular' (1.8% fee). Friend A ends up with ₹2.01 Crores, while Friend B ends with ₹1.64 Crores. The broker pocketed ₹37 Lakhs!",
    },
    interactiveType: "none",
    quiz: [
      {
        id: "q3-ch1-1",
        question:
          "Why do financial planners universally advise retail investors in India to choose 'Direct Plans' instead of 'Regular Plans' of mutual funds?",
        options: [
          "Direct plans guarantee higher dividends",
          "Direct plans have no distributor commissions, resulting in a lower expense ratio and higher compounding returns",
          "Direct plans are exempt from capital gains tax",
          "Regular plans are banned by SEBI",
        ],
        correctIndex: 1,
        explanation:
          "Direct plans eliminate distributor trail commissions, passing 100% of those savings directly into higher NAV growth for the investor.",
        mrMoneyFeedback:
          "Brilliant! Always verify the word 'Direct' in your mutual fund statement.",
      },
    ],
  },
  {
    id: "lvl3-ch2-candlesticks",
    level: 3,
    chapterNumber: 2,
    title: "Price Action & Japanese Candlestick Anatomy",
    subtitle: "Decoding buyers vs sellers, OHLC bars, support/resistance, and volume confirmation",
    estimatedMinutes: 8,
    xpReward: 60,
    badgeReward: "PRICE_ACTION_PRO",
    mrMoneyQuote:
      "A candlestick chart is not just lines and colors — it is a visual battleground between buyers (bulls) and sellers (bears). Learn to read the footprints of institutional capital!",
    conceptIntro:
      "Every candle on a trading chart encapsulates four key price points over a timeframe: Open, High, Low, and Close (OHLC). The 'body' shows the price range between open and close. The 'wicks' (or shadows) show extreme highs and lows rejected during the session. Understanding price action allows traders to spot trend reversals early.",
    deepDive: [
      "Bullish Candle (Green): Close > Open. Shows buyers were in control.",
      "Bearish Candle (Red): Close < Open. Shows sellers pushed prices downward.",
      "Hammer Pattern: A small body at the top with a long lower shadow (at least 2x the body). It shows sellers tried to crash the stock, but massive institutional buyers stepped in and rejected lower prices.",
      "Bearish Engulfing: A large red candle whose body completely covers the preceding green candle, signaling a strong shift in momentum toward sellers.",
      "Support and Resistance: Support is a price floor where buying demand consistently outweighs selling pressure. Resistance is a ceiling where supply caps price advances.",
      "Volume Confirmation: Breakouts with high volume indicate institutional participation; breakouts on low volume are frequently fakeouts.",
    ],
    realWorldExample: {
      title: "The NIFTY 50 Support Bounce",
      description:
        "When NIFTY 50 touched 23,800 during a sharp market correction, it formed a textbook Daily Hammer with 2.5x average trading volume. Institutional mutual funds bought the dip, sparking a 1,200-point rally back to 25,000.",
    },
    interactiveType: "none",
    quiz: [
      {
        id: "q3-ch2-1",
        question:
          "What does a 'Hammer' candlestick with a long lower wick at the bottom of a downtrend indicate?",
        options: [
          "Sellers have total control and prices will crash further",
          "Buyers rejected lower price levels and aggressive demand entered the market, hinting at a bullish reversal",
          "The company announced a stock split",
          "Market volatility is zero",
        ],
        correctIndex: 1,
        explanation:
          "The long lower shadow proves that despite intra-session selling, strong buyers pushed the price back up toward the day's high before close.",
        mrMoneyFeedback:
          "Spot on! Candlestick wicks reveal where institutional buyers stepped in to absorb supply.",
      },
      {
        id: "q3-ch2-2",
        question:
          "Why is trading VOLUME critical when analyzing a stock breakout above resistance?",
        options: [
          "Volume determines broker commission rates",
          "High volume confirms broad institutional backing, whereas low volume breakouts often turn into fakeout traps",
          "SEBI only permits high volume trades",
          "Volume has no correlation with price",
        ],
        correctIndex: 1,
        explanation:
          "Volume represents the conviction of market participants. Big institutional funds cannot enter a stock without leaving massive volume footprints.",
        mrMoneyFeedback:
          "Golden rule of technical analysis! Never trust a breakout that lacks volume conviction.",
      },
    ],
  },
  {
    id: "lvl3-ch3-risk-management",
    level: 3,
    chapterNumber: 3,
    title: "Risk Management, Stop Loss & The 1% Rule",
    subtitle: "Position sizing math, 1:2 risk-to-reward ratio, and avoiding emotional wipeouts",
    estimatedMinutes: 8,
    xpReward: 70,
    badgeReward: "RISK_GUARDIAN",
    mrMoneyQuote:
      "Amateurs focus on how much money they can make on a trade; professional traders obsess over how much money they could lose! If you protect your downside, the upside takes care of itself.",
    conceptIntro:
      "Even a trading strategy with a 40% win rate can make fortunes if your average winning trade is 3x larger than your average losing trade (1:3 Risk-to-Reward ratio). The cornerstone of risk management is 'The 1% Rule': never risk more than 1% of your total trading capital on any single trade.",
    deepDive: [
      "The 1% Rule: If your virtual portfolio is ₹1,00,000, your maximum allowable loss on a trade is 1% = ₹1,000.",
      "Position Sizing Formula: Position Quantity = (Capital × Risk%) / (Entry Price - Stop Loss Price). This mathematical formula tells you the exact number of shares to buy.",
      "Stop Loss Order: An automatic market order that triggers when a stock drops to your predetermined price, cutting your loss before it balloons into an existential disaster.",
      "Risk-to-Reward Ratio (R:R): Only enter trades where potential reward is at least 2x your risk (1:2 R:R). With a 1:2 ratio, you can be wrong 50% of the time and still be consistently profitable!",
      "Trading Psychology: Overtrading, averaging down on losing trades, and revenge trading after a loss are the three fastest ways retail traders wipe out their demat accounts.",
    ],
    realWorldExample: {
      title: "The Math of Asymmetric Risk-Reward",
      description:
        "A trader takes 10 trades risking ₹1,000 to make ₹2,500 (1:2.5 R:R). They lose 6 trades (6 × -₹1,000 = -₹6,000) and win only 4 trades (4 × +₹2,500 = +₹10,000). Despite being wrong 60% of the time, they pocketed ₹4,000 net profit!",
    },
    interactiveType: "position_sizing_calc",
    quiz: [
      {
        id: "q3-ch3-1",
        question:
          "If your virtual wallet has ₹1,00,000 and you adhere to the 1% Rule, what is the maximum amount of money you are allowed to lose if your Stop-Loss gets hit?",
        options: ["₹10,000", "₹5,000", "₹1,000", "₹500"],
        correctIndex: 2,
        explanation:
          "1% of ₹1,00,000 is exactly ₹1,000. By keeping risk strictly capped at ₹1,000, you can endure multiple consecutive losses without catastrophic account drawdown.",
        mrMoneyFeedback:
          "Bang on! Surviving losing streaks is the only prerequisite to compounding wealth on Dalal Street.",
      },
      {
        id: "q3-ch3-2",
        question:
          "You buy a stock at ₹1,000 with a Stop-Loss at ₹950 (Risk = ₹50) and a Target Price of ₹1,100 (Reward = ₹100). What is your Risk-to-Reward Ratio?",
        options: ["1 : 1", "1 : 2", "1 : 4", "2 : 1"],
        correctIndex: 1,
        explanation:
          "Risk = ₹50 per share. Reward = ₹100 per share. Ratio = 50 : 100 = 1 : 2.",
        mrMoneyFeedback:
          "Flawless! A 1:2 ratio means every winner pays for two losers. That is the statistical foundation of professional trading.",
      },
    ],
  },
  {
    id: "lvl3-ch4-portfolio-rebalancing",
    level: 3,
    chapterNumber: 4,
    title: "Portfolio Construction & Rebalancing",
    subtitle: "Goal-based investing, asset allocation, diversification, and keeping your portfolio aligned with risk",
    estimatedMinutes: 9,
    xpReward: 75,
    badgeReward: "LONG_TERM_THINKER",
    mrMoneyQuote:
      "A portfolio is not a collection of favorite stocks — it is a system for surviving uncertainty while compounding wealth. Balance matters more than prediction.",
    conceptIntro:
      "Portfolio construction starts with the investor's goal, timeline, and ability to tolerate volatility. Asset allocation determines how much capital sits in equities, debt, gold, and cash. Rebalancing keeps a portfolio on track when one asset class outperforms and shifts the risk profile away from plan.",
    deepDive: [
      "Goal-based investing means matching the asset mix to the time horizon: short-term goals need safety; long-term goals can absorb equity risk.",
      "Diversification reduces the risk of any single security or sector destroying wealth. Correlation matters more than the number of holdings.",
      "Rebalancing means selling winners and buying laggards to restore target weights when the portfolio drifts.",
      "A 60/40 or 70/30 allocation is a starting point, not a religion. Your ideal mix depends on your income, age, risk tolerance, and cash-flow requirements.",
    ],
    realWorldExample: {
      title: "The 30-Year Retirement Portfolio",
      description:
        "A 25-year-old investor with a 30-year horizon can allocate a larger share to equities and still tolerate volatility. A 50-year-old nearing retirement may choose more debt and gold to preserve capital and protect against drawdowns.",
    },
    interactiveType: "none",
    quiz: [
      {
        id: "q3-ch4-1",
        question:
          "Why is rebalancing important even when a portfolio is performing well?",
        options: [
          "It guarantees higher returns every year",
          "It restores the target asset allocation and controls drift in risk",
          "It eliminates all market risk",
          "It ensures tax-free returns",
        ],
        correctIndex: 1,
        explanation:
          "As winners outperform, a portfolio can become riskier than intended. Rebalancing brings the mix back in line with strategy and risk tolerance.",
        mrMoneyFeedback:
          "Exactly. Discipline matters more than excitement.",
      },
    ],
  },
  {
    id: "lvl3-ch5-behavioral-finance",
    level: 3,
    chapterNumber: 5,
    title: "Behavioral Finance & Investment Psychology",
    subtitle: "Biases, FOMO, loss aversion, and how to build a repeatable investing process",
    estimatedMinutes: 8,
    xpReward: 80,
    badgeReward: "DISCIPLINE_KEEPER",
    mrMoneyQuote:
      "The hardest part of investing is not math — it is controlling your own emotions when price charts start screaming at you. A plan beats panic every single time.",
    conceptIntro:
      "Many investors do not fail because they lack intelligence; they fail because they lack process. Fear, greed, recency bias, herd mentality, and overconfidence distort decisions. Long-term wealth is built not by being right every day, but by being disciplined enough to follow a process when markets are noisy.",
    deepDive: [
      "Loss aversion means the pain of losing ₹1,000 feels worse than the joy of gaining ₹1,000. This pushes investors to exit winners too early and hold losers too long.",
      "FOMO drives impulsive buying at the top; recency bias makes the latest event feel more important than long-term evidence.",
      "A trading journal helps track decisions, entry logic, and emotional triggers so behavior can be corrected systematically.",
      "A repeatable plan beats hype. Good systems are boring, but boring systems compound.",
    ],
    realWorldExample: {
      title: "The FOMO Trap in Small Caps",
      description:
        "Investors pile into a hot small-cap stock after a 40% rally, convinced the trend will continue. The stock reverses sharply, and investors who chased momentum at the peak lock in losses because they were acting on emotion, not process.",
    },
    interactiveType: "none",
    quiz: [
      {
        id: "q3-ch5-1",
        question:
          "What is the most likely behavioral mistake behind 'buying at the top after a strong rally'?",
        options: [
          "Index rebalancing",
          "FOMO and recency bias",
          "Tax-loss harvesting",
          "Dividend smoothing",
        ],
        correctIndex: 1,
        explanation:
          "When a stock has already risen sharply, investors often chase the trend because recent performance feels more important than valuation or fundamentals.",
        mrMoneyFeedback:
          "Correct. Every market peak has a crowd. Good investors avoid getting swept up by it.",
      },
      {
        id: "q3-ch5-2",
        question:
          "Why is a trading journal useful for long-term success?",
        options: [
          "It helps track taxes",
          "It reveals emotional patterns and execution mistakes so strategy can improve",
          "It guarantees profits",
          "It replaces risk management",
        ],
        correctIndex: 1,
        explanation:
          "A journal turns abstract trading decisions into evidence. You can review mistakes, identify recurring biases, and maintain a disciplined process.",
        mrMoneyFeedback:
          "Exactly. Data beats memory when you are trying to improve as an investor.",
      },
    ],
  },
];
