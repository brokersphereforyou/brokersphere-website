export interface MarginRateTier {
  limit: number;
  rate: number;
}

export interface Broker {
  id: string;
  name: string;
  logoColor: string; // Tailwind color class for logo background
  tagline: string;
  rating: number;
  ratingsBreakdown: {
    usability: number;
    mobileApp: number;
    research: number;
    pricing: number;
    customerService: number;
  };
  targetAudience: string;
  minDeposit: number; // For Indian brokers, this is mapped to Online Account Opening Fee (in ₹)
  stockCommission: number; // Delivery Brokerage (in ₹)
  optionsCommission: {
    base: number; // Flat Intraday/F&O Brokerage (in ₹)
    perContract: number; // Flat Intraday/F&O Brokerage (in ₹)
  };
  cryptoFee: string; // Mapped to Demat DP Charges (e.g. "₹13.5 + GST")
  cryptoFeeRate: number; // DP Fee with GST for calculations (in ₹)
  marginRateBase: number; // MTF (Margin Trading Facility) Interest Rate % p.a.
  marginRateTiers: MarginRateTier[]; // MTF rates or account tiers
  inactivityFee: number; // Mapped to Annual Maintenance Charges (AMC) (in ₹)
  wireFee: number; // Fund transfer fee (Netbanking) (in ₹)
  features: {
    fractionalShares: boolean; // Not supported in India
    paperTrading: boolean; // Virtual/Paper Trading support
    roboAdvisor: boolean; // Direct Mutual Funds support (roboAdvisor flag used as proxy)
    researchTools: 'Basic' | 'Standard' | 'Advanced';
    liveData: boolean;
    mobileApp: 'Basic' | 'Good' | 'Excellent';
    apiTrading: boolean;
    shortSelling: boolean;
    usStocks: boolean; // Mapped to US Stocks trading support
    mutualFunds: boolean; // Mapped to Mutual Funds buying support
  };
  investmentProducts: string[];
  accountTypes: string[];
  customerSupport: {
    phone: string;
    chat: string;
    email: string;
  };
  pros: string[];
  cons: string[];
  verdict: string;
  yearFounded: number;
  headquarters: string;
  accountOpeningUrl: string; // Official account opening link
}

export const brokersData: Broker[] = [
  {
    id: 'zerodha',
    name: 'Zerodha',
    logoColor: 'bg-sky-500 text-white',
    tagline: 'The pioneer of discount brokerage in India with the legendary Kite terminal',
    rating: 4.8,
    ratingsBreakdown: {
      usability: 4.9,
      mobileApp: 4.8,
      research: 4.2,
      pricing: 4.7,
      customerService: 4.5
    },
    targetAudience: 'All investors, active day traders, F&O traders, and passive savers',
    minDeposit: 200, // Account Opening Fee
    stockCommission: 0, // Free Delivery Brokerage
    optionsCommission: {
      base: 20, // Flat ₹20 per trade for Intraday/F&O
      perContract: 20
    },
    cryptoFee: '₹13.5 + GST per debit transaction',
    cryptoFeeRate: 15.93, // DP Charges + 18% GST
    marginRateBase: 12.0, // MTF / Loan against shares
    marginRateTiers: [
      { limit: 100000, rate: 12.0 }
    ],
    inactivityFee: 300, // AMC of ₹300/year
    wireFee: 9, // Netbanking charge, UPI is free
    features: {
      fractionalShares: false,
      paperTrading: false,
      roboAdvisor: true, // Coin for direct mutual funds
      researchTools: 'Advanced',
      liveData: true,
      mobileApp: 'Excellent',
      apiTrading: true, // Kite Connect API (Paid - ₹2,000/mo)
      shortSelling: true,
      usStocks: false, // Not natively supported
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'Commodities', 'Currency Derivatives', 'Sovereign Gold Bonds (SGB)', 'Govt. Securities'],
    accountTypes: ['Equity & Demat Account', 'Commodity Trading Account', 'NRI Trading Account (NRE/NRO)', 'Corporate / Partnership Account', 'HUFF / Trust Account', 'Joint Demat Account'],
    customerSupport: {
      phone: '+91 80 4718 1888 (Mon-Sat)',
      chat: 'Support Ticketing System',
      email: 'support@zerodha.com'
    },
    pros: [
      'Zero brokerage on equity delivery and direct mutual funds forever',
      'Kite is an incredibly clean, lightning-fast, and stable trading platform',
      'Console offers outstanding portfolio analytics, P&L heatmaps, and tax-ready reports',
      'Zerodha Varsity is the gold standard for free financial education in India',
      'Highly ethical broker with no pushy sales calls, tips, or spam notifications'
    ],
    cons: [
      'Charges ₹200 for online account opening and ₹300/year AMC',
      'Does not offer Margin Trading Facility (MTF) to buy stocks on leverage',
      'No built-in stock tips, advisory, or daily research recommendations'
    ],
    verdict: 'Zerodha is India\'s largest and most trusted discount broker. Its flagship web/mobile platform, Kite, is unmatched in speed and stability. It is perfect for both long-term investors looking for zero delivery fees and professional F&O traders demanding lightning-fast execution.',
    yearFounded: 2010,
    headquarters: 'Bengaluru, Karnataka',
    accountOpeningUrl: 'https://zerodha.com/open-account/'
  },
  {
    id: 'groww',
    name: 'Groww',
    logoColor: 'bg-teal-500 text-white',
    tagline: 'Super simple, intuitive platform designed for beginners and mutual fund investors',
    rating: 4.6,
    ratingsBreakdown: {
      usability: 4.9,
      mobileApp: 4.9,
      research: 3.8,
      pricing: 4.5,
      customerService: 4.0
    },
    targetAudience: 'Beginners, long-term investors, and direct mutual fund buyers',
    minDeposit: 0, // Free Account Opening
    stockCommission: 20, // ₹20 or 0.05% per trade
    optionsCommission: {
      base: 20, // Flat ₹20 per trade for F&O
      perContract: 20
    },
    cryptoFee: '₹13.5 + GST per debit transaction',
    cryptoFeeRate: 15.93,
    marginRateBase: 12.5, // MTF Rate
    marginRateTiers: [
      { limit: 100000, rate: 12.5 }
    ],
    inactivityFee: 0, // Zero lifetime AMC!
    wireFee: 0, // UPI, Netbanking is free
    features: {
      fractionalShares: false,
      paperTrading: false,
      roboAdvisor: true, // Groww MF Direct
      researchTools: 'Basic',
      liveData: true,
      mobileApp: 'Excellent',
      apiTrading: false,
      shortSelling: true,
      usStocks: true, // Supports investing in US Stocks
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'Sovereign Gold Bonds (SGB)', 'Fixed Deposits'],
    accountTypes: ['Trading & Demat Account', 'Mutual Fund Only Account'],
    customerSupport: {
      phone: '+91 80 6822 0000',
      chat: '24/7 Live In-app Chat',
      email: 'support@groww.in'
    },
    pros: [
      'Zero account opening fees and zero lifetime AMC (Annual Maintenance)',
      'Extremely clean, modern, and clutter-free mobile app interface',
      'One-click investing in direct mutual funds with zero commissions',
      'Seamless UPI integration for instant deposits and withdrawals',
      'Excellent educational content for complete stock market beginners'
    ],
    cons: [
      'Charges ₹20 or 0.05% brokerage on equity delivery (Zerodha is free)',
      'Lacks advanced charting and indicator features for serious technical traders',
      'Does not support commodity or currency trading'
    ],
    verdict: 'Groww is the absolute best choice for beginners, millennials, and mutual fund investors in India. Its zero AMC and ultra-simple design remove all friction from entering the market, although active intraday and F&O traders will find its tools too basic.',
    yearFounded: 2016,
    headquarters: 'Bengaluru, Karnataka',
    accountOpeningUrl: 'https://groww.in/'
  },
  {
    id: 'angelone',
    name: 'Angel One',
    logoColor: 'bg-blue-600 text-white',
    tagline: 'Full-service advisory and research combined with discount pricing',
    rating: 4.7,
    ratingsBreakdown: {
      usability: 4.6,
      mobileApp: 4.7,
      research: 4.8,
      pricing: 4.6,
      customerService: 4.4
    },
    targetAudience: 'Active traders, investors who want daily stock recommendations, and margin users',
    minDeposit: 0, // Free Account Opening
    stockCommission: 0, // Free Delivery Brokerage
    optionsCommission: {
      base: 20, // Flat ₹20 per trade for F&O/Intraday
      perContract: 20
    },
    cryptoFee: '₹20 + GST per debit transaction',
    cryptoFeeRate: 23.60,
    marginRateBase: 12.0, // MTF interest rate
    marginRateTiers: [
      { limit: 100000, rate: 12.0 }
    ],
    inactivityFee: 240, // AMC of ₹240/year (Waived for 1st Year)
    wireFee: 10, // Netbanking charge, UPI is free
    features: {
      fractionalShares: false,
      paperTrading: true, // Sensibull integration
      roboAdvisor: true, // ARQ Prime robo advisory
      researchTools: 'Advanced',
      liveData: true,
      mobileApp: 'Excellent',
      apiTrading: true, // SmartAPI (Free)
      shortSelling: true,
      usStocks: true, // Partnered Vested support
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'Commodities', 'Currency Derivatives', 'SGBs', 'Bonds', 'Loans'],
    accountTypes: ['Equity & Demat Account', 'Commodity Trading Account', 'NRI Trading Account', 'Minor Demat Account'],
    customerSupport: {
      phone: '1800 1020 (Toll-Free)',
      chat: 'In-app Virtual Assistant & Chat',
      email: 'support@angelone.in'
    },
    pros: [
      'Zero brokerage on equity delivery trades',
      'Free daily research reports, stock recommendations, and intraday tips',
      'ARQ Prime robo-advisory engine automatically suggests high-performing portfolios',
      'Excellent Margin Trading Facility (MTF) with up to 4x leverage',
      'Free API access (SmartAPI) for algorithmic and automated trading'
    ],
    cons: [
      'DP charges are slightly higher (₹20 + GST) compared to Zerodha/Groww',
      'App can occasionally feel cluttered with too many banners, offers, and loan ads',
      'AMC of ₹20/month starts after the first free year'
    ],
    verdict: 'Angel One (formerly Angel Broking) perfectly bridges the gap between traditional full-service brokers and modern discount brokers. It is an exceptional choice for traders who want flat ₹20 pricing but still value expert stock recommendations, margin funding, and automated robo-advisory.',
    yearFounded: 1987,
    headquarters: 'Mumbai, Maharashtra',
    accountOpeningUrl: 'https://www.angelone.in/open-demat-account'
  },
  {
    id: 'upstox',
    name: 'Upstox',
    logoColor: 'bg-purple-800 text-white',
    tagline: 'High-tech trading platforms backed by Ratan Tata',
    rating: 4.5,
    ratingsBreakdown: {
      usability: 4.5,
      mobileApp: 4.6,
      research: 4.0,
      pricing: 4.5,
      customerService: 4.2
    },
    targetAudience: 'Active day traders, technical chartists, and derivative traders',
    minDeposit: 0, // Free Account Opening
    stockCommission: 20, // ₹20 or 2.5% whichever is lower per delivery trade
    optionsCommission: {
      base: 20, // Flat ₹20 per trade for F&O/Intraday
      perContract: 20
    },
    cryptoFee: '₹18.5 + GST per debit transaction',
    cryptoFeeRate: 21.83,
    marginRateBase: 12.5, // MTF Rate
    marginRateTiers: [
      { limit: 100000, rate: 12.5 }
    ],
    inactivityFee: 0, // Zero AMC! (Upstox AMC is now completely free)
    wireFee: 7, // Netbanking charge, UPI is free
    features: {
      fractionalShares: false,
      paperTrading: false,
      roboAdvisor: true, // Direct Mutual Funds
      researchTools: 'Advanced',
      liveData: true,
      mobileApp: 'Excellent',
      apiTrading: true, // Upstox API (Free)
      shortSelling: true,
      usStocks: true, // Supports US Stocks
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'Commodities', 'Currency Derivatives', 'SGBs'],
    accountTypes: ['Trading & Demat Account', 'NRI Trading Account', 'Corporate Account'],
    customerSupport: {
      phone: '+91 22 6130 9999',
      chat: 'In-app ticket & Chatbot',
      email: 'support@upstox.com'
    },
    pros: [
      'Backed by premium institutional investors including Mr. Ratan Tata',
      'Upstox Pro Web and Mobile offer advanced TradingView charts with 100+ indicators',
      'Robust API (Upstox API) is completely free for retail algorithmic traders',
      'Excellent mutual fund platform with direct schemes',
      'Very fast order placement and reliable servers during peak market hours'
    ],
    cons: [
      'Charges brokerage on equity delivery (up to ₹20 per trade)',
      'Demat debit DP charges are relatively high at ₹18.5 + GST'
    ],
    verdict: 'Upstox is a powerful, tech-focused broker built for active stock and options traders. Its TradingView integration, robust APIs, and high-speed execution engine make it a formidable competitor to Zerodha, especially for traders who prioritize charting and design.',
    yearFounded: 2009,
    headquarters: 'Mumbai, Maharashtra',
    accountOpeningUrl: 'https://upstox.com/open-demat-account/'
  },
  {
    id: 'dhan',
    name: 'Dhan',
    logoColor: 'bg-yellow-400 text-black',
    tagline: 'The ultimate modern platform for super traders and active investors',
    rating: 4.7,
    ratingsBreakdown: {
      usability: 4.8,
      mobileApp: 4.7,
      research: 4.6,
      pricing: 4.9,
      customerService: 4.5
    },
    targetAudience: 'Professional day traders, scalpers, options traders, and TradingView users',
    minDeposit: 0, // Free Account Opening
    stockCommission: 0, // Free Delivery Brokerage
    optionsCommission: {
      base: 20, // Flat ₹20 per trade (₹10 for women!)
      perContract: 20
    },
    cryptoFee: '₹12.5 + GST per debit transaction',
    cryptoFeeRate: 14.75,
    marginRateBase: 10.5, // Lowest MTF Rate in India!
    marginRateTiers: [
      { limit: 100000, rate: 10.5 }
    ],
    inactivityFee: 0, // Zero lifetime AMC!
    wireFee: 0, // UPI & Netbanking are 100% free
    features: {
      fractionalShares: false,
      paperTrading: true, // TradingView integration
      roboAdvisor: false,
      researchTools: 'Advanced',
      liveData: true,
      mobileApp: 'Excellent',
      apiTrading: true, // DhanHQ API (Free)
      shortSelling: true,
      usStocks: false,
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'Commodities', 'Currency Derivatives', 'SGBs', 'Bonds'],
    accountTypes: ['Trading & Demat Account', 'Corporate Account', 'HUFF Account'],
    customerSupport: {
      phone: '+91 22 4890 6273',
      chat: 'Live Chat on Web/App',
      email: 'help@dhan.co'
    },
    pros: [
      'Zero account opening fees, zero lifetime AMC, and zero delivery brokerage',
      'Direct trading from TradingView charts (tv.dhan.co) with instant order routing',
      'Unbelievable 50% brokerage discount (₹10/trade) for all verified women traders',
      'Lowest Margin Funding (MTF) rate in India starting at just 10.5% p.a.',
      'Robust DhanHQ API is completely free with lightning-fast execution speeds'
    ],
    cons: [
      'No mutual fund SIPs directly integrated into the core web terminal (needs Dhan app)',
      'Relatively new platform (founded in 2021) compared to older legacy brokers',
      'Interface can feel dense with features and options analytics for absolute beginners'
    ],
    verdict: 'Dhan is a revolution for active retail traders in India. With zero AMC, direct TradingView chart execution, free algorithmic APIs, special discounts for women, and the cheapest margin interest rates, it is rapidly becoming the broker of choice for the modern Indian trading community.',
    yearFounded: 2021,
    headquarters: 'Mumbai, Maharashtra',
    accountOpeningUrl: 'https://dhan.co/'
  },
  {
    id: 'hdfcsky',
    name: 'HDFC Sky',
    logoColor: 'bg-blue-800 text-white',
    tagline: 'Discount brokerage backed by the trust and security of HDFC Bank',
    rating: 4.4,
    ratingsBreakdown: {
      usability: 4.4,
      mobileApp: 4.3,
      research: 4.5,
      pricing: 4.4,
      customerService: 4.6
    },
    targetAudience: 'HDFC Bank customers, premium investors, and long-term stock buyers',
    minDeposit: 0, // Free Account Opening
    stockCommission: 20, // ₹20 or 0.1% whichever is lower per delivery trade
    optionsCommission: {
      base: 20, // Flat ₹20 per trade for F&O/Intraday
      perContract: 20
    },
    cryptoFee: '₹15 + GST per debit transaction',
    cryptoFeeRate: 17.70,
    marginRateBase: 12.0, // MTF Rate
    marginRateTiers: [
      { limit: 100000, rate: 12.0 }
    ],
    inactivityFee: 240, // AMC of ₹240/year (Waived for 1st Year)
    wireFee: 0, // Free transfers for HDFC accounts
    features: {
      fractionalShares: false,
      paperTrading: false,
      roboAdvisor: true, // HDFC Direct Mutual Funds
      researchTools: 'Standard',
      liveData: true,
      mobileApp: 'Good',
      apiTrading: false,
      shortSelling: true,
      usStocks: true, // Full US Stock integration
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'US Stocks', 'SGBs', 'Bonds'],
    accountTypes: ['Trading & Demat Account', '3-in-1 Bank & Demat Account', 'NRI Account'],
    customerSupport: {
      phone: '1800 210 2345',
      chat: 'In-app Helpdesk',
      email: 'skysupport@hdfcsec.com'
    },
    pros: [
      'Backed by India\'s largest private bank, offering institutional-grade security',
      'Allows seamless 3-in-1 account integration (Savings + Demat + Trading)',
      'Includes direct access to invest in US Stocks (fractional US shares available)',
      'Provides free premium research recommendations and equity ideas from HDFC Securities',
      'Very clean, modern mobile app compared to HDFC Securities\' older platforms'
    ],
    cons: [
      'Charges brokerage on delivery trades (₹20 or 0.1%) unlike Zerodha/Dhan',
      'Annual Maintenance Charge (AMC) of ₹240/year kicks in after 1st year',
      'Lacks advanced technical analysis features and API support'
    ],
    verdict: 'HDFC Sky is HDFC Bank\'s answer to discount brokers like Groww and Zerodha. It is the perfect choice for investors who want discount pricing (₹20 trades) but demand the security, trust, research, and seamless banking integration of a major 3-in-1 financial institution.',
    yearFounded: 2023,
    headquarters: 'Mumbai, Maharashtra',
    accountOpeningUrl: 'https://www.hdfcsky.com/'
  },
  {
    id: 'icicidirect',
    name: 'ICICI Direct',
    logoColor: 'bg-orange-500 text-white',
    tagline: 'Premium 3-in-1 banking broker with the discount Neo pricing plan',
    rating: 4.3,
    ratingsBreakdown: {
      usability: 4.1,
      mobileApp: 4.2,
      research: 4.9,
      pricing: 4.0,
      customerService: 4.5
    },
    targetAudience: 'Passive investors, high net-worth individuals (HNIs), and ICICI bank customers',
    minDeposit: 0, // Free Account Opening
    stockCommission: 20, // Flat ₹20 per delivery trade under Neo Plan
    optionsCommission: {
      base: 20, // Flat ₹20 for F&O/Intraday
      perContract: 20
    },
    cryptoFee: '₹20 + GST per debit transaction',
    cryptoFeeRate: 23.60,
    marginRateBase: 11.5, // MTF under Prime/Neo
    marginRateTiers: [
      { limit: 100000, rate: 11.5 }
    ],
    inactivityFee: 300, // AMC of ₹300/year (Waived for 1st Year)
    wireFee: 0, // Instant funds transfer from ICICI Savings account
    features: {
      fractionalShares: false,
      paperTrading: false,
      roboAdvisor: true, // ICICI Direct Mutual Funds
      researchTools: 'Advanced',
      liveData: true,
      mobileApp: 'Good',
      apiTrading: true, // ICICI Direct API (Free)
      shortSelling: true,
      usStocks: true, // Direct global trading
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'Commodities', 'Currency Derivatives', 'SGBs', 'Corporate FDs', 'Insurance'],
    accountTypes: ['3-in-1 Demat Account', 'NRI Trading Account', 'Corporate Demat Account'],
    customerSupport: {
      phone: '1860 123 1122',
      chat: 'Live Web Chat & Support Desk',
      email: 'helpdesk@icicidirect.com'
    },
    pros: [
      'Seamless 3-in-1 account links your ICICI Bank account directly to your demat',
      'Award-winning research team offers highly accurate long-term stock recommendations',
      'ICICI Direct Neo Plan slashes intraday brokerage to ₹0 and delivery/F&O to flat ₹20',
      'Outstanding Margin Funding (e-ATM) lets you receive cash within 30 minutes of selling stocks',
      'Huge branch network across India for offline face-to-face support'
    ],
    cons: [
      'Neo Plan requires a one-time subscription fee of ₹299 + GST to activate',
      'High DP charges (₹20 + GST) and annual AMC of ₹300',
      'Mobile app interface is cluttered with insurance, loans, and banking cross-sells'
    ],
    verdict: 'ICICI Direct is a powerhouse full-service broker. While traditional plans are extremely expensive, the ICICI Direct Neo plan makes it highly competitive with discount brokers. It is the gold standard for long-term investors and HNIs who want elite research and bank-grade integration.',
    yearFounded: 2000,
    headquarters: 'Mumbai, Maharashtra',
    accountOpeningUrl: 'https://www.icicidirect.com/'
  },
  {
    id: '5paisa',
    name: '5paisa',
    logoColor: 'bg-rose-600 text-white',
    tagline: 'Ultra-discount flat ₹20 pricing with powerful mobile trading tools',
    rating: 4.2,
    ratingsBreakdown: {
      usability: 4.3,
      mobileApp: 4.4,
      research: 4.2,
      pricing: 4.6,
      customerService: 3.9
    },
    targetAudience: 'Budget-conscious active traders and technical analysts',
    minDeposit: 0, // Free Account Opening
    stockCommission: 20, // Flat ₹20 per delivery trade (₹10 on Ultra pack)
    optionsCommission: {
      base: 20, // Flat ₹20 for F&O/Intraday (₹10 on Ultra pack)
      perContract: 20
    },
    cryptoFee: '₹15.5 + GST per debit transaction',
    cryptoFeeRate: 18.29,
    marginRateBase: 12.5, // MTF Rate
    marginRateTiers: [
      { limit: 100000, rate: 12.5 }
    ],
    inactivityFee: 300, // AMC of ₹300/year (Waived if portfolio is under ₹50k)
    wireFee: 10, // Netbanking charge, UPI is free
    features: {
      fractionalShares: false,
      paperTrading: false,
      roboAdvisor: true, // Direct Mutual Funds
      researchTools: 'Standard',
      liveData: true,
      mobileApp: 'Excellent',
      apiTrading: true, // Developer API (Free)
      shortSelling: true,
      usStocks: false,
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'Commodities', 'Currency Derivatives', 'Gold'],
    accountTypes: ['Trading & Demat Account', 'NRI Account', 'Minor Account'],
    customerSupport: {
      phone: '+91 89766 89766',
      chat: 'In-app Chatbot Support',
      email: 'support@5paisa.com'
    },
    pros: [
      'Flat ₹20 brokerage across all segments (delivery, intraday, derivatives)',
      'Ultra Trader subscription packs drop brokerage to just ₹10 per executed trade',
      'Provides robust research advisory and stock recommendations directly in the app',
      'Excellent mobile app with clean charts, indicators, and derivative analytics',
      'Easy direct investing in mutual funds and gold'
    ],
    cons: [
      'Subscription packs cost ₹499/month to unlock the best pricing and features',
      'Customer support can feel heavily automated with chatbots',
      'DP charges are higher than Zerodha and Dhan'
    ],
    verdict: '5paisa is an excellent budget-friendly broker for active traders. Its subscription packs offer some of the cheapest trading rates in India (₹10 per trade), making it highly lucrative for high-volume traders, though casual investors may find the monthly pack fees unnecessary.',
    yearFounded: 2016,
    headquarters: 'Thane, Maharashtra',
    accountOpeningUrl: 'https://www.5paisa.com/'
  },
  {
    id: 'kotaksecurities',
    name: 'Kotak Securities (Kotak Neo)',
    logoColor: 'bg-red-600 text-white',
    tagline: 'Trade at flat ₹10 for F&O and intraday with the powerful Kotak Neo app',
    rating: 4.5,
    ratingsBreakdown: {
      usability: 4.4,
      mobileApp: 4.5,
      research: 4.7,
      pricing: 4.8,
      customerService: 4.3
    },
    targetAudience: 'Active intraday traders, options traders, youth under 30, and Kotak Bank customers',
    minDeposit: 0, // Free Account Opening
    stockCommission: 20, // ₹20 per executed order for delivery
    optionsCommission: {
      base: 10, // Flat ₹10 Intraday & F&O Brokerage under Youth/Neo Plan!
      perContract: 10
    },
    cryptoFee: '₹13.5 + GST per debit transaction',
    cryptoFeeRate: 15.93,
    marginRateBase: 11.5, // MTF interest rate
    marginRateTiers: [
      { limit: 100000, rate: 11.5 }
    ],
    inactivityFee: 0, // Free AMC for the first year, then ₹50/month
    wireFee: 0, // UPI is free
    features: {
      fractionalShares: false,
      paperTrading: false,
      roboAdvisor: true, // Direct Mutual Funds
      researchTools: 'Advanced',
      liveData: true,
      mobileApp: 'Excellent',
      apiTrading: true, // Neo API (Free)
      shortSelling: true,
      usStocks: true,
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'Commodities', 'Currency Derivatives', 'SGBs', 'Bonds'],
    accountTypes: ['3-in-1 Demat Account', 'Trading Account', 'NRI Account'],
    customerSupport: {
      phone: '1800 209 9191',
      chat: 'WhatsApp & Web Live Chat',
      email: 'service.securities@kotak.com'
    },
    pros: [
      'Absolutely flat ₹10 brokerage on all Intraday and F&O trades under Youth/Neo Plan',
      'Free account opening and zero AMC for the first year',
      'Kotak Neo API is completely free for automated algorithmic trading',
      'Backed by Kotak Mahindra Bank, offering premium 3-in-1 account benefits',
      'Free daily stock tips, fundamental research, and market advisory'
    ],
    cons: [
      'Delivery trades still cost ₹20 per trade (unlike Zerodha/Dhan)',
      'AMC of ₹50/month starts after the first free year',
      'Neo app can occasionally experience minor lag during high-volatility hours'
    ],
    verdict: 'Kotak Securities has hit a home run with its Kotak Neo brand. By offering flat ₹10 F&O and intraday trading, free APIs, and zero AMC for the first year, it is an absolute paradise for active day traders and scalpers, especially those under 30 who get special free plans.',
    yearFounded: 1994,
    headquarters: 'Mumbai, Maharashtra',
    accountOpeningUrl: 'https://www.kotaksecurities.com/'
  },
  {
    id: 'motilaloswal',
    name: 'Motilal Oswal',
    logoColor: 'bg-amber-600 text-white',
    tagline: 'Premium full-service broker with legendary research and solid advisory',
    rating: 4.4,
    ratingsBreakdown: {
      usability: 4.2,
      mobileApp: 4.3,
      research: 5.0,
      pricing: 3.8,
      customerService: 4.6
    },
    targetAudience: 'High net-worth investors, long-term wealth builders, and advisory-seeking clients',
    minDeposit: 0, // Free Account Opening
    stockCommission: 0, // Free Delivery Brokerage under lifetime plan
    optionsCommission: {
      base: 20, // Flat ₹20 on discount plans
      perContract: 20
    },
    cryptoFee: '₹15.5 + GST per debit transaction',
    cryptoFeeRate: 18.29,
    marginRateBase: 12.0, // MTF Rate
    marginRateTiers: [
      { limit: 100000, rate: 12.0 }
    ],
    inactivityFee: 199, // AMC of ₹199/year as specified by user (Waived for 1st Year)
    wireFee: 0, // UPI is free
    features: {
      fractionalShares: false,
      paperTrading: false,
      roboAdvisor: true, // Intelligent Advisory Portfolios
      researchTools: 'Advanced',
      liveData: true,
      mobileApp: 'Good',
      apiTrading: true, // Free Developer API
      shortSelling: true,
      usStocks: true,
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'Commodities', 'Currency Derivatives', 'PMS (Portfolio Management)', 'AIFs', 'Gold'],
    accountTypes: ['Demat & Trading Account', 'NRI Investment Account', 'PMS Account', 'Corporate Demat Account'],
    customerSupport: {
      phone: '+91 22 4054 8000',
      chat: 'Dedicated Relationship Manager & Chat',
      email: 'query@motilaloswal.com'
    },
    pros: [
      'Unrivalled, award-winning research reports and stock picks (Top-rated in India)',
      'Free dedicated Relationship Manager (RM) to assist you with trades and advice',
      'Zero delivery brokerage under selected premium plans',
      'Outstanding portfolio management services (PMS) and customized advice',
      'Free account opening and zero AMC for the first year'
    ],
    cons: [
      'Demat AMC of ₹299/year starts after the first free year',
      'Traditional percentage-based plans can be highly expensive if you don\'t opt for flat ₹20 plans',
      'App can feel overwhelming with too many research reports, mutual funds, and advisory popups'
    ],
    verdict: 'Motilal Oswal is the gold standard of full-service stockbroking in India. If you are an investor who needs highly professional stock recommendations, expert research, and a personal relationship manager to guide you, their platform is worth every rupee.',
    yearFounded: 1987,
    headquarters: 'Mumbai, Maharashtra',
    accountOpeningUrl: 'https://www.motilaloswal.com/'
  },
  {
    id: 'sharekhan',
    name: 'Sharekhan',
    logoColor: 'bg-red-700 text-white',
    tagline: 'Legacy full-service broker owned by BNP Paribas with robust educational resources',
    rating: 4.3,
    ratingsBreakdown: {
      usability: 4.0,
      mobileApp: 4.1,
      research: 4.8,
      pricing: 3.7,
      customerService: 4.4
    },
    targetAudience: 'Long-term investors, technical traders, and wealth-management seekers',
    minDeposit: 0, // Free Account Opening
    stockCommission: 20, // Flat pricing under modern discount plans
    optionsCommission: {
      base: 20, // Flat ₹20 on F&O
      perContract: 20
    },
    cryptoFee: '₹15.5 + GST per debit transaction',
    cryptoFeeRate: 18.29,
    marginRateBase: 13.0, // MTF Rate
    marginRateTiers: [
      { limit: 100000, rate: 13.0 }
    ],
    inactivityFee: 400, // AMC of ₹400/year (Waived for 1st Year)
    wireFee: 10, // Netbanking fee
    features: {
      fractionalShares: false,
      paperTrading: false,
      roboAdvisor: true, // Invesco / Sharekhan Robo
      researchTools: 'Advanced',
      liveData: true,
      mobileApp: 'Good',
      apiTrading: true, // Sharekhan API (Free)
      shortSelling: true,
      usStocks: false,
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'Commodities', 'Currency Derivatives', 'SGBs', 'PMS'],
    accountTypes: ['Classic Demat Account', 'NRI Trading Account', 'TradeFirst Account'],
    customerSupport: {
      phone: '1800 22 7500 (Toll-free)',
      chat: 'Web Live Chat & Local Branches',
      email: 'myaccount@sharekhan.com'
    },
    pros: [
      'Owned by BNP Paribas, offering global trust and top-tier financial backing',
      'Sharekhan Classroom offers exceptional, free live webinars and trading courses',
      'Superb research team providing highly reliable daily trade ideas and mutual fund picks',
      'TradeTiger is a highly respected, powerful desktop terminal for active chartists',
      'Over 3,000 physical branches across India for offline face-to-face support'
    ],
    cons: [
      'High Demat AMC of ₹400/year starting after the first year',
      'Standard percentage-based brokerage is very high unless you request flat ₹20 plans',
      'Mobile app is slightly outdated compared to modern platforms like Groww and Dhan'
    ],
    verdict: 'Sharekhan is a trustworthy legacy brand that has successfully served Indian investors for over two decades. Backed by BNP Paribas, it is highly recommended for investors who value offline branch support, high-quality stock tips, and top-tier educational classrooms.',
    yearFounded: 2000,
    headquarters: 'Mumbai, Maharashtra',
    accountOpeningUrl: 'https://www.sharekhan.com/'
  },
  {
    id: 'paytmmoney',
    name: 'Paytm Money',
    logoColor: 'bg-sky-600 text-white',
    tagline: 'Ultra-low cost discount brokerage with a simplified mobile interface',
    rating: 4.3,
    ratingsBreakdown: {
      usability: 4.6,
      mobileApp: 4.7,
      research: 3.5,
      pricing: 4.8,
      customerService: 3.8
    },
    targetAudience: 'Budget-conscious beginners, mutual fund lovers, and retail stock buyers',
    minDeposit: 0, // Free Account Opening
    stockCommission: 15, // Flat ₹15 per delivery trade (Cheaper than Zerodha/Groww!)
    optionsCommission: {
      base: 15, // Flat ₹15 per trade for F&O (Lowest standard rate!)
      perContract: 15
    },
    cryptoFee: '₹13.5 + GST per debit transaction',
    cryptoFeeRate: 15.93,
    marginRateBase: 12.0, // MTF Rate
    marginRateTiers: [
      { limit: 100000, rate: 12.0 }
    ],
    inactivityFee: 0, // Zero AMC! (Platform fee of ₹30/month applies)
    wireFee: 0, // UPI is free
    features: {
      fractionalShares: false,
      paperTrading: false,
      roboAdvisor: true, // Direct Mutual Funds
      researchTools: 'Standard',
      liveData: true,
      mobileApp: 'Excellent',
      apiTrading: true, // Developer API (Free)
      shortSelling: true,
      usStocks: false,
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'National Pension System (NPS)', 'Gold'],
    accountTypes: ['Trading & Demat Account', 'Mutual Fund Only Account'],
    customerSupport: {
      phone: '+91 120 460 6060',
      chat: 'In-app Helpdesk ticketing',
      email: 'feedback@paytmmoney.com'
    },
    pros: [
      'Flat ₹15 brokerage is 25% cheaper than Zerodha, Groww, and Upstox',
      'Zero account opening fees and zero annual maintenance charges (AMC)',
      'Highly integrated with the Paytm ecosystem, allowing instant UPI fund transfers',
      'Excellent platform for buying Direct Mutual Funds and NPS schemes',
      'Completely free developer API for algorithmic trading'
    ],
    cons: [
      'Charges a "Platform Fee" of ₹30/month which acts like a hidden AMC',
      'Lacks advanced options analytics and technical scanners for professional traders',
      'No commodity or currency trading support'
    ],
    verdict: 'Paytm Money is a highly aggressive discount broker offering flat ₹15 trades, making it one of the cheapest legal stockbrokers in India. It is a fantastic choice for cost-conscious retail investors, although advanced derivative traders will find its features a bit restricted.',
    yearFounded: 2017,
    headquarters: 'Noida, Uttar Pradesh',
    accountOpeningUrl: 'https://www.paytmmoney.com/'
  },
  {
    id: 'fyers',
    name: 'Fyers',
    logoColor: 'bg-green-600 text-white',
    tagline: 'High-performance charting platform built strictly for professional technical traders',
    rating: 4.6,
    ratingsBreakdown: {
      usability: 4.8,
      mobileApp: 4.6,
      research: 4.1,
      pricing: 4.7,
      customerService: 4.2
    },
    targetAudience: 'Technical day traders, price action scalpers, and algorithmic traders',
    minDeposit: 0, // Free Account Opening
    stockCommission: 0, // Free Delivery Brokerage
    optionsCommission: {
      base: 20, // Flat ₹20 per trade for F&O
      perContract: 20
    },
    cryptoFee: '₹12.5 + GST per debit transaction',
    cryptoFeeRate: 14.75,
    marginRateBase: 11.9, // MTF Rate
    marginRateTiers: [
      { limit: 100000, rate: 11.9 }
    ],
    inactivityFee: 0, // Zero lifetime AMC!
    wireFee: 0, // UPI & Netbanking are free
    features: {
      fractionalShares: false,
      paperTrading: true, // Fyers Web Simulator
      roboAdvisor: false,
      researchTools: 'Advanced',
      liveData: true,
      mobileApp: 'Good',
      apiTrading: true, // Fyers API (Free)
      shortSelling: true,
      usStocks: false,
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'Commodities', 'Currency Derivatives'],
    accountTypes: ['Trading & Demat Account', 'Corporate Account', 'NRI Trading Account'],
    customerSupport: {
      phone: '+91 80 6000 1111',
      chat: 'In-app Chat & Web Community',
      email: 'support@fyers.in'
    },
    pros: [
      'Unbelievably advanced TradingView chart integration (best in India)',
      'Zero account opening fees, zero delivery brokerage, and zero lifetime AMC',
      'Fyers API v2 is completely free and highly praised for its speed and uptime',
      'Fyers One desktop terminal is packed with advanced stock scanners and heatmaps',
      'Supports drag-and-drop order placement directly on live charts'
    ],
    cons: [
      'No direct robo-advisory or direct mutual fund SIPs inside the core web terminal',
      'Mobile app interface is highly technical and can be confusing for complete beginners',
      'Customer support team can sometimes take longer to resolve complex queries'
    ],
    verdict: 'Fyers is a top-tier discount broker built by traders, for traders. If you are a technical analyst, price action chartist, or algorithmic coder, Fyers offers the absolute best TradingView setup in the country alongside zero AMC and zero delivery fees.',
    yearFounded: 2015,
    headquarters: 'Bengaluru, Karnataka',
    accountOpeningUrl: 'https://fyers.in/'
  },
  {
    id: 'aliceblue',
    name: 'Alice Blue',
    logoColor: 'bg-blue-500 text-white',
    tagline: 'Flat ₹15 brokerage across all segments with the robust ANT platform',
    rating: 4.4,
    ratingsBreakdown: {
      usability: 4.2,
      mobileApp: 4.3,
      research: 3.8,
      pricing: 4.9,
      customerService: 4.1
    },
    targetAudience: 'High-volume intraday traders and budget-conscious F&O scalpers',
    minDeposit: 0, // Free Account Opening
    stockCommission: 0, // Free Delivery Brokerage!
    optionsCommission: {
      base: 15, // Flat ₹15 per trade (Save 25% on every order!)
      perContract: 15
    },
    cryptoFee: '₹15 + GST per debit transaction',
    cryptoFeeRate: 17.70,
    marginRateBase: 12.0, // MTF Rate
    marginRateTiers: [
      { limit: 100000, rate: 12.0 }
    ],
    inactivityFee: 0, // Zero lifetime AMC! (Alice Blue has zero AMC charges)
    wireFee: 10, // Netbanking charge, UPI is free
    features: {
      fractionalShares: false,
      paperTrading: false,
      roboAdvisor: true, // Direct Mutual Funds
      researchTools: 'Standard',
      liveData: true,
      mobileApp: 'Good',
      apiTrading: true, // ANT API (Free)
      shortSelling: true,
      usStocks: false,
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'Commodities', 'Currency Derivatives'],
    accountTypes: ['Trading & Demat Account', 'NRI Trading Account', 'HUFF Account'],
    customerSupport: {
      phone: '+91 80 4549 0855',
      chat: 'Web Live Chat Support',
      email: 'askus@aliceblueindia.com'
    },
    pros: [
      'Flat ₹15 per trade brokerage saves massive costs for high-volume derivative traders',
      'Zero brokerage on Equity Delivery trades (completely free long-term investing)',
      'ANT API is completely free for automated trading and algorithmic execution',
      'Provides up to 5x intraday leverage on selected stocks',
      'Free online account opening with Zero lifetime AMC charges'
    ],
    cons: [
      'Mobile app (ANT Mobi) interface is slightly outdated compared to Zerodha or Dhan',
      'Lacks advanced fundamental research and daily advisory'
    ],
    verdict: 'Alice Blue is a highly competitive discount broker that beats Zerodha and Groww on pricing by offering flat ₹15 trades. With free delivery brokerage and free APIs, it is an incredibly lucrative option for active intraday and options traders looking to slash their transaction costs.',
    yearFounded: 2006,
    headquarters: 'Bengaluru, Karnataka',
    accountOpeningUrl: 'https://aliceblueonline.com/'
  },
  {
    id: 'iiflsecurities',
    name: 'IIFL Securities',
    logoColor: 'bg-blue-900 text-white',
    tagline: 'Elite research and wealth advisory with modern flat-rate pricing structures',
    rating: 4.3,
    ratingsBreakdown: {
      usability: 4.1,
      mobileApp: 4.2,
      research: 4.9,
      pricing: 4.1,
      customerService: 4.4
    },
    targetAudience: 'Wealth investors, research-oriented traders, and premium banking clients',
    minDeposit: 0, // Free Account Opening
    stockCommission: 20, // Flat ₹20 under modern Z20 plan
    optionsCommission: {
      base: 20, // Flat ₹20 for F&O
      perContract: 20
    },
    cryptoFee: '₹20 + GST per debit transaction',
    cryptoFeeRate: 23.60,
    marginRateBase: 12.0, // MTF Rate
    marginRateTiers: [
      { limit: 100000, rate: 12.0 }
    ],
    inactivityFee: 250, // AMC of ₹250/year (Waived for 1st Year)
    wireFee: 0, // UPI is free
    features: {
      fractionalShares: false,
      paperTrading: false,
      roboAdvisor: true, // IIFL Robo Advisor
      researchTools: 'Advanced',
      liveData: true,
      mobileApp: 'Good',
      apiTrading: true, // IIFL API (Free)
      shortSelling: true,
      usStocks: true,
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'Commodities', 'Currency Derivatives', 'Bonds', 'NCDs', 'PMS'],
    accountTypes: ['Trading & Demat Account', 'NRI Trading Account', 'Corporate Trading Account'],
    customerSupport: {
      phone: '1860 267 3000',
      chat: 'In-app Chat & Dedicated Relationship Manager',
      email: 'cs@iifl.com'
    },
    pros: [
      'Highly professional, industry-leading research reports and fundamental picks',
      'The modern "Z20 Plan" offers flat ₹20 trades, making it highly competitive',
      'Dedicated relationship managers available for premium accounts',
      'Excellent mobile trading app (IIFL Markets) is highly rated for its clean interface',
      'Free account opening and zero AMC for the first year'
    ],
    cons: [
      'Charges AMC of ₹250/year starting after the first free year',
      'DP charges are on the higher side at ₹20 + GST',
      'Traditional percentage plans are highly expensive if you don\'t actively opt for the Z20 plan'
    ],
    verdict: 'IIFL Securities is an exceptional full-service broker that has successfully modernized. By offering flat ₹20 trades alongside their award-winning research reports and dedicated relationship managers, they provide an incredibly balanced platform for both long-term wealth builders and active traders.',
    yearFounded: 1995,
    headquarters: 'Mumbai, Maharashtra',
    accountOpeningUrl: 'https://www.indiainfoline.com/'
  },
  {
    id: 'choicebroking',
    name: 'Choice Broking',
    logoColor: 'bg-blue-700 text-white',
    tagline: 'Full-service expert stock recommendations with zero delivery brokerage plans',
    rating: 4.3,
    ratingsBreakdown: {
      usability: 4.2,
      mobileApp: 4.3,
      research: 4.6,
      pricing: 4.3,
      customerService: 4.4
    },
    targetAudience: 'Investors wanting stock recommendations, advisory services, and flat discount pricing',
    minDeposit: 0, // Free Account Opening
    stockCommission: 0, // Free Delivery Brokerage!
    optionsCommission: {
      base: 20, // Flat ₹20 per trade for F&O
      perContract: 20
    },
    cryptoFee: '₹15 + GST per debit transaction',
    cryptoFeeRate: 17.70,
    marginRateBase: 12.0, // MTF Rate
    marginRateTiers: [
      { limit: 100000, rate: 12.0 }
    ],
    inactivityFee: 200, // AMC of ₹200/year (Waived for 1st Year)
    wireFee: 0, // UPI is free
    features: {
      fractionalShares: false,
      paperTrading: false,
      roboAdvisor: true, // Direct Mutual Funds
      researchTools: 'Standard',
      liveData: true,
      mobileApp: 'Excellent',
      apiTrading: false,
      shortSelling: true,
      usStocks: false,
      mutualFunds: true
    },
    investmentProducts: ['Equity Stocks', 'ETFs', 'Mutual Funds', 'IPOs', 'Futures & Options (F&O)', 'Commodities', 'Currency Derivatives', 'SGBs', 'Bonds'],
    accountTypes: ['Trading & Demat Account', 'NRI Trading Account', 'Corporate Demat Account'],
    customerSupport: {
      phone: '+91 22 6707 9999',
      chat: 'In-app Chat & Local Branches',
      email: 'customercare@choiceindia.com'
    },
    pros: [
      'Zero brokerage on Equity Delivery (long-term buy-and-hold investing)',
      'Free daily fundamental research, technical stock picks, and market analysis',
      'Free online account opening and zero AMC for the first year',
      'Highly rated mobile app (Choice FinX) is clean, stable, and easy to use',
      'Dedicated relationship managers to assist with offline trades and advisory'
    ],
    cons: [
      'Demat AMC of ₹200/year starts after the first free year',
      'Lacks advanced developer APIs for algorithmic trading',
      'Lacks direct US Stock trading'
    ],
    verdict: 'Choice Broking is an excellent, fast-growing full-service broker in India. By combining the best aspects of discount brokers (₹0 delivery brokerage and flat ₹20 F&O) with full-service benefits (free daily tips, expert stock recommendations, and physical branches), it is a superb choice for retail investors.',
    yearFounded: 1993,
    headquarters: 'Mumbai, Maharashtra',
       accountOpeningUrl: 'https://choiceindia.com/'
  },
  {
    id: 'capmint',
    name: 'CapMint',
    logoColor: 'bg-emerald-600 text-white',
    tagline: 'Low-cost broker with flat ₹15 pricing',
    rating: 4.2,
    ratingsBreakdown: {
      usability: 4.2,
      mobileApp: 4.1,
      research: 3.8,
      pricing: 4.7,
      customerService: 4.0
    },
    targetAudience: 'Beginner traders and F&O traders',
    minDeposit: 0,
    stockCommission: 0,
    optionsCommission: {
      base: 15,
      perContract: 15
    },
    cryptoFee: '₹13.5 + GST per debit transaction',
    cryptoFeeRate: 15.93,
    marginRateBase: 12.0,
    marginRateTiers: [
      { limit: 100000, rate: 12.0 }
    ],
    inactivityFee: 0,
    wireFee: 0,
    features: {
      fractionalShares: false,
      paperTrading: false,
      roboAdvisor: false,
      researchTools: 'Basic',
      liveData: true,
      mobileApp: 'Good',
      apiTrading: false,
      shortSelling: true,
      usStocks: false,
      mutualFunds: false
    },
    investmentProducts: [
      'Equity Stocks',
      'ETFs',
      'IPOs',
      'Futures & Options (F&O)'
    ],
    accountTypes: ['Trading & Demat Account'],
    customerSupport: {
      phone: 'Official website',
      chat: 'Available',
      email: 'Official website'
    },
    pros: [
      'Zero account opening fee',
      'Zero AMC',
      '₹0 delivery brokerage',
      '₹15 flat F&O brokerage'
    ],
    cons: [
      'Newer broker',
      'Limited research tools'
    ],
    verdict: 'CapMint is a low-cost broker focused on traders seeking simple pricing and low brokerage.',
    yearFounded: 2023,
    headquarters: 'India',
    accountOpeningUrl: 'https://www.capmint.com/'
  }
];

export interface Review {
  id: string;
  brokerId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  tradingStyle: 'Beginner' | 'Active Trader' | 'Long-term Investor' | 'Options Trader' | 'Crypto Trader';
}

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    brokerId: 'zerodha',
    userName: 'Rohan Sharma',
    rating: 5,
    title: 'The gold standard for trading in India',
    comment: 'I have tried almost every broker, but Kite by Zerodha is simply unbeatable. Zero delivery charges and zero mutual fund fees. The console is incredibly helpful for filing taxes. No spam calls or tips is the best part.',
    date: '2025-01-15',
    tradingStyle: 'Long-term Investor'
  },
  {
    id: 'rev-2',
    brokerId: 'zerodha',
    userName: 'Karthik Pillai',
    rating: 4,
    title: 'Excellent, but Kite Connect API should be free',
    comment: 'Kite is flawless for F&O. However, charging ₹2,000/month for Kite Connect API is steep when other brokers like Dhan and Angel One offer automated trading APIs completely free. Otherwise, it is the best.',
    date: '2025-02-10',
    tradingStyle: 'Active Trader'
  },
  {
    id: 'rev-3',
    brokerId: 'groww',
    userName: 'Ananya Goel',
    rating: 5,
    title: 'Perfect for beginners and direct SIPs',
    comment: 'I started my mutual fund SIPs here. The app is so easy to use, unlike traditional banking portals. Zero AMC means I don\'t have to worry about maintenance charges when I am not trading. Highly recommended!',
    date: '2025-02-20',
    tradingStyle: 'Beginner'
  },
  {
    id: 'rev-4',
    brokerId: 'groww',
    userName: 'Vikram Singh',
    rating: 3,
    title: 'Good for investing, poor for trading',
    comment: 'For stocks and mutual funds, it is great. But they charge ₹20 even for delivery trades (Zerodha is free), and the F&O charting is very basic. If you want to trade options, look at Dhan or Upstox.',
    date: '2025-01-28',
    tradingStyle: 'Beginner'
  },
  {
    id: 'rev-5',
    brokerId: 'dhan',
    userName: 'Siddharth Mehta',
    rating: 5,
    title: 'Direct TradingView integration is amazing',
    comment: 'Dhan is a godsend for active traders. Being able to trade directly from tv.dhan.co with TradingView indicators is a dream come true. Plus, zero AMC and lowest MTF rates. Incredibly fast execution.',
    date: '2025-02-18',
    tradingStyle: 'Active Trader'
  },
  {
    id: 'rev-6',
    brokerId: 'angelone',
    userName: 'Meera Deshmukh',
    rating: 5,
    title: 'Great recommendations and MTF',
    comment: 'I use their ARQ Prime stock recommendations and they have given me solid returns. The margin trading facility (MTF) is very helpful for short term trades. Discount broker pricing with full-service advice!',
    date: '2025-02-05',
    tradingStyle: 'Long-term Investor'
  },
  {
    id: 'rev-7',
    brokerId: 'upstox',
    userName: 'Rahul Nair',
    rating: 4,
    title: 'Very reliable charts and high speed',
    comment: 'Upstox Pro Web is incredibly solid. Their TradingView charting tools are very responsive. Excellent for options scalping. I wish delivery was completely free, but flat ₹20 is still highly competitive.',
    date: '2025-02-22',
    tradingStyle: 'Options Trader'
  },
  {
    id: 'rev-8',
    brokerId: 'icicidirect',
    userName: 'Preeti Patel',
    rating: 4,
    title: 'Best 3-in-1 bank integration and research',
    comment: 'Under the Neo plan, it is very affordable. The research recommendations are highly professional. The bank-demat integration saves me time and effort in transferring funds. Excellent for long term investing.',
    date: '2025-01-10',
    tradingStyle: 'Long-term Investor'
  }
];

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'Fees' | 'Trading Rules' | 'Features' | 'General';
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Brokerage Charges',
    definition: 'The fee charged by a stockbroker to execute buy or sell orders. Discount brokers in India typically charge zero brokerage on Equity Delivery (long-term buy-and-hold) and a flat ₹20 per trade for Intraday and F&O derivatives.',
    category: 'Fees'
  },
  {
    term: 'Demat DP Charges',
    definition: 'Depository Participant (DP) charges are levied by depositories (CDSL or NDSL) and stockbrokers whenever you sell (debit) shares from your Demat account. In India, this is typically a flat fee around ₹13.5 to ₹20 + 18% GST per stock per day, regardless of quantity.',
    category: 'Fees'
  },
  {
    term: 'Direct Mutual Funds',
    definition: 'Mutual fund schemes where you buy directly from the asset management company (AMC) without any distributors or agents. Direct mutual funds have zero commissions/distributor fees, leading to a lower expense ratio and higher returns (up to 1.5% p.a. more) than regular schemes.',
    category: 'Features'
  },
  {
    term: 'Margin Trading Facility (MTF)',
    definition: 'A SEBI-approved facility that allows investors to buy up to 4x quantity of stocks by borrowing a portion of the funds from their stockbroker. Brokers charge an interest rate (typically 10.5% to 15% p.a.) on the borrowed margin amount.',
    category: 'Trading Rules'
  },
  {
    term: 'Annual Maintenance Charges (AMC)',
    definition: 'A yearly maintenance fee charged by depository participants (brokers) to maintain and secure your Demat account. Some brokers charge zero lifetime AMC (like Groww and Dhan), while others charge ₹150 to ₹300 per year.',
    category: 'Fees'
  },
  {
    term: 'Unified Payments Interface (UPI)',
    definition: 'A real-time payment system in India that allows instant transfer of funds from bank accounts to trading accounts. It is 100% free with zero transaction charges, making it the most popular way to fund stock portfolios.',
    category: 'General'
  },
  {
    term: 'GTT (Good Till Triggered) Order',
    definition: 'An advanced order type that allows you to set buy or sell trigger prices that remain valid for up to 1 year. The order is automatically sent to the exchange only when the stock hits your specific target price, eliminating the need to track charts daily.',
    category: 'Features'
  },
  {
    term: 'Intraday Square-off Time',
    definition: 'The specific time of day (typically 3:15 PM to 3:20 PM IST) when brokers automatically close (square off) all open intraday positions if the trader has not closed them manually. Brokers charge an auto-square-off penalty (typically ₹50 + GST) for this service.',
    category: 'Trading Rules'
  },
  {
    term: 'SGB (Sovereign Gold Bonds)',
    definition: 'Government securities denominated in grams of gold, issued by the Reserve Bank of India (RBI). They offer a secure way to invest in gold with an additional 2.5% p.a. fixed interest payout and are 100% exempt from capital gains tax if held till maturity (8 years).',
    category: 'General'
  },
  {
    term: '3-in-1 Demat Account',
    definition: 'An integrated financial account that combines a Savings Bank Account, a Demat Account, and a Trading Account under a single banking group (like ICICI Direct or HDFC Sky). It allows instant, frictionless fund transfers and high-security transactions.',
    category: 'General'
  }
];
