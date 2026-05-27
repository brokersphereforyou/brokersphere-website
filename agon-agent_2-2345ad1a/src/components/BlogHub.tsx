import React, { useState, useMemo } from 'react';
import { Broker, brokersData } from '../data/brokers';
import { BrokerLogo } from './BrokerLogo';
import { BookOpen, Search, ArrowRight, Star, CheckCircle, AlertTriangle, TrendingUp, Sparkles, HelpCircle } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  category: 'Comparison' | 'Intraday' | 'Charges' | 'Beginners';
  readTime: string;
  summary: string;
  keywords: string[];
  content: React.ReactNode;
}

export const BlogHub: React.FC<{ onSelectBroker: (id: string) => void }> = ({ onSelectBroker }) => {
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sourced from actual high-intent SEO search queries in India
  const blogPosts = useMemo((): BlogPost[] => [
    {
      slug: 'zerodha-vs-groww-beginner-comparison',
      title: 'Zerodha vs Groww: Which is Better for Beginners in 2025?',
      category: 'Comparison',
      readTime: '6 min read',
      summary: 'An in-depth, unbiased comparison between Indias two largest discount brokers. We analyze account opening charges, AMC, Kite vs Groww terminal usability, and delivery brokerage.',
      keywords: ['Zerodha vs Groww', 'best broker for beginners', 'Zerodha hidden charges', 'Groww AMC'],
      content: (
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            If you are entering the Indian stock market for the first time, you have almost certainly narrowed your choices down to **Zerodha** and **Groww**. Together, they hold over 60% of active retail demat accounts in India. 
          </p>
          <p>
            But while both are discount brokers charging a flat ₹20 per trade, their design philosophies, charges, and target audiences are completely different. Let\'s break them down side-by-side.
          </p>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">1. The Cost of Investing: Account Opening & AMC</h3>
          <p>
            For a beginner starting with small capital, upfront fees can be a major friction point. Here is where the comparison starts:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>**Groww** is 100% free to start. There are **₹0 account opening fees** and **₹0 lifetime Annual Maintenance Charges (AMC)**. If you do not buy any stocks for a year, you pay absolutely nothing.</li>
            <li>**Zerodha** charges a one-time **₹200 account opening fee** (online) and a recurring **₹300/year AMC** (billed quarterly at ₹75). </li>
          </ul>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">2. Brokerage Charges: Delivery vs Intraday</h3>
          <p>
            While both charge flat fees, long-term investors should note a crucial difference in delivery brokerage:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>**Zerodha** offers completely **₹0 (Free) Equity Delivery brokerage**. When you buy shares and hold them for more than one day, you pay zero brokerage.</li>
            <li>**Groww** charges **₹20 or 0.05%** (whichever is lower) per executed order on delivery trades. If you make 10 delivery purchases in a month, you pay up to ₹200, whereas you pay ₹0 at Zerodha.</li>
          </ul>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">3. Platforms: Kite vs Groww App</h3>
          <p>
            The trading terminal is where you will spend all your time:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>**Groww App** is designed like a clean, minimalist banking app. It displays stocks, mutual funds, and fixed deposits on a unified dashboard. It is incredibly easy to navigate but lacks advanced technical analysis and option chain visualizers.</li>
            <li>**Zerodha Kite** is a high-speed, institutional-grade trading terminal. It features advanced TradingView integration, multi-chart layouts, instant GTT orders, and deep options analytics via Sensibull. It has a slight learning curve but is far more powerful.</li>
          </ul>

          <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-4 mt-6">
            <span className="font-bold text-slate-800 dark:text-white text-xs block mb-1">💡 The Verdict:</span>
            <p className="text-xs">
              Choose **Groww** if you are a passive investor looking to invest in mutual funds and stocks occasionally and want to avoid yearly maintenance bills. Choose **Zerodha** if you plan to actively build a stock portfolio (saving on delivery brokerage) or trade derivatives/intraday where Kite\'s speed is essential.
            </p>
          </div>
        </div>
      )
    },
    {
      slug: 'best-brokers-for-intraday-trading-india',
      title: 'Best Stock Brokers for Intraday Trading in India (2025)',
      category: 'Intraday',
      readTime: '5 min read',
      summary: 'Active day trading requires lightning-fast execution, advanced charting, cheap margin funding (MTF), and robust APIs. We compare Dhan, Zerodha, and Upstox for intraday specialists.',
      keywords: ['best broker for intraday India', 'lowest brokerage broker', 'Dhan vs Zerodha', 'intraday trading platforms'],
      content: (
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Unlike long-term investing, intraday day trading is a battle of seconds. A platform crash, slow order routing, or high margin interest rates can wipe out your day\'s profits instantly. 
          </p>
          <p>
            To succeed as an intraday trader in India, your broker must possess three pillars: **high-speed terminal stability**, **free developer APIs**, and **cheap Margin Trading Facility (MTF) rates**.
          </p>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">1. Dhan: The Modern Super-Trader App</h3>
          <p>
            Founded in 2021, **Dhan** has taken the Indian trading community by storm by building features exclusively for day traders:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>**Direct TradingView Integration**: You can trade directly from TradingView charts (`tv.dhan.co`) with instant drag-and-drop order placement.</li>
            <li>**Free DhanHQ API**: Retail algorithmic traders get premium high-speed APIs completely free.</li>
            <li>**Cheapest MTF**: Dhan offers the lowest Margin Trading Facility rate in India starting at **10.5% p.a.**</li>
            <li>**Women Trader Discount**: Dhan offers a flat 50% discount on F&O and Intraday brokerage (₹10 instead of ₹20) for all verified women-led trading accounts.</li>
          </ul>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">2. Zerodha: The Stable Powerhouse</h3>
          <p>
            **Zerodha** remains the industry benchmark for server stability:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>**Unrivalled Server Uptime**: Kite rarely lags or crashes, even during massive market volatility (such as Union Budget days).</li>
            <li>**Advanced Orders**: Supports Iceberg orders (slicing large orders into smaller ones) and GTT orders.</li>
            <li>**Paid API**: Kite Connect API costs ₹2,000/month, which is a major drawback for low-volume algorithmic traders.</li>
          </ul>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">3. Angel One: Full Service combined with Flat Pricing</h3>
          <p>
            **Angel One** is ideal for traders who want discount pricing but still appreciate daily trading recommendations:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>**Free Daily Trading Tips**: Receives daily intraday research calls, option strategies, and technical calls.</li>
            <li>**Free SmartAPI**: Highly reliable, completely free developer APIs.</li>
            <li>**Leverage**: Up to 4x leverage on delivery holdings via MTF.</li>
          </ul>

          <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-4 mt-6">
            <span className="font-bold text-slate-800 dark:text-white text-xs block mb-1">📊 Recommendation:</span>
            <p className="text-xs">
              For pure chartist and algorithmic day traders, **Dhan** is the absolute best and cheapest platform. If your priority is rock-solid reliability and clean order slicing for large volumes, **Zerodha Kite** remains the king.
            </p>
          </div>
        </div>
      )
    },
    {
      slug: 'demat-dp-charges-hidden-fees-explained',
      title: 'Hidden Demat Charges in India: DP Charges & AMC Explained',
      category: 'Charges',
      readTime: '4 min read',
      summary: 'Many stockbrokers advertise "₹0 delivery brokerage" but hit investors with Demat DP charges when they sell. We expose the hidden depository charges and compare them across top brokers.',
      keywords: ['DP charges comparison', 'Zerodha hidden charges', 'Upstox hidden charges', 'what is DP charge'],
      content: (
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Have you ever sold a stock in India and noticed your final account balance was slightly lower than expected? You likely got hit by **Demat DP (Depository Participant) Charges**. 
          </p>
          <p>
            Brokers love to market "₹0 delivery commissions" in bold letters, but they rarely mention the DP charge, which is levied on *every single stock sell transaction* you make. Let\'s expose how this works and compare who is secretly charging you the most.
          </p>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">What is a DP Charge?</h3>
          <p>
            In India, your shares are not kept by your broker (like Zerodha or Groww). They are kept in central national vaults called Depositories (**CDSL** or **NSDL**). 
          </p>
          <p>
            Whenever you sell shares from your portfolio, your broker has to debit them from CDSL/NSDL. The depository charges a small fee for this transaction. The broker passes this fee to you, usually with a significant markup!
          </p>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">How is it calculated?</h3>
          <p>
            DP charges are levied **per company (ISIN) per day**, regardless of the quantity of shares you sell.
          </p>
          <p>
            *Example:* If you sell 1 share of Reliance and 100 shares of Tata Motors on Monday:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>You will be charged 1 DP fee for Reliance.</li>
            <li>You will be charged 1 DP fee for Tata Motors.</li>
            <li>Total: **2 DP charges**. It does not matter if you sold 1 share or 1,000 shares.</li>
          </ul>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">DP Charges Comparison (2025)</h3>
          <div className="overflow-x-auto my-4 border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold">
                  <th className="p-3">Broker</th>
                  <th className="p-3">DP Charge per Sell</th>
                  <th className="p-3">With 18% GST</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                <tr>
                  <td className="p-3 font-bold">Dhan</td>
                  <td className="p-3">₹12.50</td>
                  <td className="p-3 font-semibold text-emerald-600">₹14.75 (Lowest)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Zerodha</td>
                  <td className="p-3">₹13.50</td>
                  <td className="p-3">₹15.93</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Groww</td>
                  <td className="p-3">₹13.50</td>
                  <td className="p-3">₹15.93</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">5paisa</td>
                  <td className="p-3">₹15.50</td>
                  <td className="p-3">₹18.29</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Upstox</td>
                  <td className="p-3">₹18.50</td>
                  <td className="p-3">₹21.83</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Angel One</td>
                  <td className="p-3">₹20.00</td>
                  <td className="p-3 font-semibold text-rose-500">₹23.60 (Highest)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-4 mt-6">
            <span className="font-bold text-slate-800 dark:text-white text-xs block mb-1">💡 Smart Saving Tip:</span>
            <p className="text-xs">
              If you are a small investor holding micro-portfolios (selling stocks worth ₹100 to ₹500), a ₹23 DP charge can eat up 5% to 10% of your capital! To minimize DP charges, avoid selling your stock holdings in tiny, multiple daily orders. Sell them in a single batch transaction to incur only one DP fee.
            </p>
          </div>
        </div>
      )
    },
    {
      slug: 'options-trading-beginners-risks-realities',
      title: 'Options Trading for Beginners in India: Risks & SEBI Realities',
      category: 'Intraday',
      readTime: '7 min read',
      summary: 'Options trading is highly trending in India, but SEBI reports show 9 out of 10 retail traders lose money. We explain Option Buying vs Selling and how to manage risks responsibly.',
      keywords: ['options trading India', '9 out of 10 traders lose', 'option buying vs selling', 'SEBI options report'],
      content: (
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Derivative trading, especially **Futures & Options (F&O)**, has exploded in popularity in India over the last few years. Driven by social media screenshots and the promise of quick returns, millions of retail investors have opened trading accounts to speculate on weekly index expiries (Nifty 50, Bank Nifty, FinNifty).
          </p>
          <p>
            However, the Securities and Exchange Board of India (SEBI) recently released a shocking study: **9 out of 10 individual traders in the equity F&O segment incurred net losses**, with an average loss of **₹1.1 Lakh** per trader. 
          </p>
          <p>
            If you want to trade options without becoming part of this statistic, you must understand the mechanics, the mathematics, and the severe risks involved.
          </p>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">1. Option Buying vs Option Selling (Writing)</h3>
          <p>
            There are two sides to every options contract, and they have completely opposite risk-reward profiles:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>**Option Buying (Long)**: You pay a small premium up front to buy the right to trade. Your maximum loss is limited to the premium you paid, while your profit potential is theoretically unlimited. This is highly attractive to beginners because it requires very little capital (as low as ₹1,000). However, **time decay (Theta)** works against you every second, and option buyers lose money on average 70% of the time.</li>
            <li>**Option Selling (Short/Writing)**: You collect the premium up front and assume the obligation to trade. Your maximum profit is limited to the premium collected, while your risk of loss is mathematically unlimited. This requires substantial capital (typically ₹1 Lakh+ per lot) but has a much higher statistical win rate (around 70%) because time decay works in your favor.</li>
          </ul>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">2. The Silent Killer: Time Decay (Theta)</h3>
          <p>
            Options are depreciating assets. Every contract has an expiry date. As that date approaches, the "Time Value" of the option premium melts away. If the market stays completely flat, an option buyer will watch their investment slowly shrink to zero, while an option seller will pocket the entire premium as pure profit. This is why beginners who blindly buy Call or Put options on flat trading days lose their entire capital.
          </p>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">3. How to Trade Options Responsibly</h3>
          <p>
            If you are determined to learn options trading, follow these strict risk-management rules:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>**Never trade with borrowed money** or your core savings. Only use capital you are 100% prepared to lose.</li>
            <li>**Start with Paper Trading**: Dhan and Angel One (via Sensibull) offer virtual trading platforms. Practice risk-free for at least 3 months before deploying real cash.</li>
            <li>**Use Defined-Risk Spreads**: Instead of buying naked options, learn spreads (like Bull Call Spreads or Iron Condors) which buy and sell options simultaneously to cap both your maximum profit and maximum loss.</li>
            <li>**Set Hard Stop-Losses**: Never let a small loss balloon into a catastrophic account blow-out. Set an automated stop-loss order with your broker on every single trade.</li>
          </ul>

          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/20 rounded-xl p-4 mt-6">
            <span className="font-bold text-red-700 dark:text-red-400 text-xs block mb-1">⚠️ SEBI Mandatory Risk Disclosure:</span>
            <p className="text-xs text-red-600 dark:text-red-300">
              "9 out of 10 individual traders in equity Futures and Options Segment incurred net losses. On average, loss makers registered net trading loss close to ₹50,000. Over and above, transaction costs (brokerage, STT, exchange fees) added another 15% to 25% to their losses."
            </p>
          </div>
        </div>
      )
    },
    {
      slug: 'mtf-margin-trading-facility-vs-intraday',
      title: 'Margin Trading Facility (MTF) vs Intraday Leverage: Safe Trading',
      category: 'Intraday',
      readTime: '5 min read',
      summary: 'Want to buy more stocks than your cash balance allows? We compare MTF (holding stocks on leverage) vs Intraday margin and explain how to avoid margin calls and interest traps.',
      keywords: ['what is MTF India', 'margin trading facility', 'broker leverage comparison', 'Dhan MTF rate'],
      content: (
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Leverage is a double-edged sword. It can amplify your trading profits significantly, but it can also accelerate your losses and wipe out your trading account in a single bad trade. 
          </p>
          <p>
            In the Indian stock market, there are two primary ways to trade with leverage: **Intraday Margin** and **Margin Trading Facility (MTF)**. Understanding the differences between them is crucial for protecting your capital.
          </p>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">1. Intraday Margin: Fast and High-Risk</h3>
          <p>
            Intraday margin is designed strictly for day traders who enter and exit positions on the same trading day:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>**Leverage**: Brokers typically provide up to **5x leverage** on index and highly liquid large-cap stocks.</li>
            <li>**Time Limit**: You must close (square off) your position before the market closes (usually around 3:15 PM IST). If you fail to do so, your broker will automatically sell your shares and charge an auto-square-off penalty of ₹50 + GST.</li>
            <li>**Interest Cost**: Zero. Since the position is closed on the same day, no interest is charged on the borrowed margin.</li>
          </ul>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">2. Margin Trading Facility (MTF): Leverage for Holding</h3>
          <p>
            If you want to buy stocks today but hold them for days, weeks, or months without paying the full purchase price up front, you use **MTF**:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>**Leverage**: Brokers provide up to **3x to 4x leverage** (meaning you pay 25% of the stock value as margin, and the broker funds the remaining 75%).</li>
            <li>**Time Limit**: You can hold the position as long as you maintain the required maintenance margin and pay the daily interest charges. There is no strict square-off deadline.</li>
            <li>**Interest Cost**: Brokers charge a daily interest rate on the funded amount. This rate varies heavily from broker to broker, ranging from **10.5% p.a. (Dhan)** to **12.5% p.a. (Upstox/Groww)**.</li>
          </ul>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">The Danger of the "Margin Call"</h3>
          <p>
            When you buy stocks on MTF, you pledge your shares as collateral. If the stock price falls, the total value of your collateral decreases. If it falls below the broker\'s required **Maintenance Margin**:
          </p>
          <p>
            The broker will issue a **Margin Call**, demanding that you instantly deposit more cash into your account to cover the deficit. If you fail to add funds within 24 to 48 hours, the broker has the legal right to sell your shares on the open market at a loss to recover their borrowed funds, leaving you with a severely damaged account.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/20 rounded-xl p-4 mt-6">
            <span className="font-bold text-amber-800 dark:text-amber-400 text-xs block mb-1">📊 Comparison Verdict:</span>
            <p className="text-xs">
              If you are a swing trader wanting to hold stocks for a few weeks to catch a trend, **MTF** is an excellent tool—but choose your broker wisely. At 10.5% p.a., **Dhan** is the cheapest MTF provider in India. If you are a day trader who exits positions before 3:15 PM, stick to **Intraday Margin** to completely avoid paying interest fees.
            </p>
          </div>
        </div>
      )
    },
    {
      slug: 'indian-stock-market-taxes-stt-ltcg-explained',
      title: 'Taxes on Stock Trading in India: STT, LTCG, & STCG Demystified',
      category: 'Charges',
      readTime: '6 min read',
      summary: 'Trading profits are taxable! We break down the complex Indian tax structure for equity investors, including Short-Term Capital Gains (STCG), Long-Term Capital Gains (LTCG), and Securities Transaction Tax (STT).',
      keywords: ['stock taxes India', 'STCG tax rate', 'LTCG on shares', 'what is STT charge'],
      content: (
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Making money in the Indian stock market is an incredible feeling, but don\'t forget that the tax department (Income Tax Department) wants their share of your profits. 
          </p>
          <p>
            In India, stock market taxation depends on two factors: **how long you held the asset** (Capital Gains) and **your trading frequency** (Business Income). Let\'s break down the taxes you will pay as an investor or active trader in 2025.
          </p>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">1. Long-Term Capital Gains (LTCG)</h3>
          <p>
            If you buy equity shares or equity-oriented mutual funds and hold them for **more than 12 months** before selling, your profits are classified as Long-Term Capital Gains:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>**Tax Exemption**: LTCG profits up to **₹1.25 Lakh** in a single financial year are completely tax-free!</li>
            <li>**Tax Rate**: Any LTCG profits exceeding ₹1.25 Lakh are taxed at a flat rate of **12.5%** (revised in the latest Union Budget). Indexation benefits are not available for equity shares.</li>
          </ul>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">2. Short-Term Capital Gains (STCG)</h3>
          <p>
            If you buy shares and sell them **within 12 months** of purchase, your profits are classified as Short-Term Capital Gains:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>**Tax Rate**: STCG profits are taxed at a flat rate of **20%**, regardless of your personal income tax slab. No basic exemptions apply to STCG.</li>
          </ul>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">3. Intraday & F&O Trading: Business Income</h3>
          <p>
            If you do day trading (buying and selling on the same day) or trade derivative contracts (Futures & Options), the Income Tax department does not treat your profits as capital gains. Instead, they are treated as **Business Income**:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>**Intraday Trading**: Classified as **Speculative Business Income**. These profits are added to your regular income and taxed at your personal **slab rates** (up to 30%+). Speculative losses can only be offset against speculative profits.</li>
            <li>**F&O Trading**: Classified as **Non-Speculative Business Income**. Like intraday, F&O profits are taxed at your slab rates. However, F&O losses are highly useful—they can be offset against other business income or capital gains and carried forward for up to 8 years. You can also claim business expenses (like internet, laptop depreciation, books, and brokerages) to reduce your taxable income.</li>
          </ul>

          <h3 className="text-base font-bold text-slate-800 dark:text-white mt-6 mb-2">4. Securities Transaction Tax (STT)</h3>
          <p>
            STT is a direct tax levied by the Government of India on every purchase and sale of securities on registered exchanges (NSE and BSE). It is automatically collected by your broker and listed on your contract note:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>**Equity Delivery**: 0.1% on both Buy and Sell transactions.</li>
            <li>**Equity Intraday**: 0.025% on Sell transactions only.</li>
            <li>**F&O Futures**: 0.02% on Sell transactions only.</li>
            <li>**F&O Options**: 0.1% of the option premium on Sell transactions.</li>
          </ul>

          <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl p-4 mt-6">
            <span className="font-bold text-slate-800 dark:text-white text-xs block mb-1">💡 Pro Tax-Saving Tip:</span>
            <p className="text-xs">
              Under Section 112A, you can participate in "Tax Harvesting". At the end of every financial year, you can sell your long-term stock holdings to realize up to ₹1.25 Lakh of tax-free profits, and immediately buy them back on the same day. This raises your purchase cost basis and permanently saves you thousands of rupees in future LTCG taxes!
            </p>
          </div>
        </div>
      )
    }
  ], []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [blogPosts, searchQuery]);

  const activePost = useMemo(() => {
    return blogPosts.find(p => p.slug === selectedPostSlug) || null;
  }, [blogPosts, selectedPostSlug]);

  return (
    <div className="space-y-6">
      {activePost ? (
        /* Blog Detail View */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <button
            onClick={() => setSelectedPostSlug(null)}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            ← Back to All Guides
          </button>

          <div className="space-y-3">
            <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 text-[10px] font-bold uppercase tracking-wider rounded">
              {activePost.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {activePost.title}
            </h1>
            <div className="flex gap-4 text-xs text-slate-400">
              <span>{activePost.readTime}</span>
              <span>•</span>
              <span>Verified 2025 Data</span>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6">
            {activePost.content}
          </div>

          {/* Call to Action inside post */}
          <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6 space-y-4">
            <h4 className="font-bold text-slate-800 dark:text-white text-sm">Compare these platforms yourself:</h4>
            <div className="flex flex-wrap gap-2">
              {brokersData.map(b => (
                <button
                  key={b.id}
                  onClick={() => onSelectBroker(b.id)}
                  className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer"
                >
                  <BrokerLogo id={b.id} className="w-5 h-5" />
                  {b.name} Review
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Blog Grid View */
        <div className="space-y-6">
          {/* Search bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search trading guides, blogs, comparisons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  X
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div 
                key={post.slug}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 text-[9px] font-extrabold uppercase tracking-wider rounded">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{post.readTime}</span>
                  </div>

                  <h3 className="font-bold text-slate-800 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1 max-w-[70%]">
                    {post.keywords.slice(0, 2).map(k => (
                      <span key={k} className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-medium">
                        #{k.toLowerCase().replace(/\s+/g, '')}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedPostSlug(post.slug)}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    Read Guide →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
