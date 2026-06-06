import React, { useMemo, useState } from 'react';
import { brokersData } from '../data/brokers';
import { BrokerLogo } from './BrokerLogo';
import { BookOpen, Search, ArrowRight } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  category:
    | 'Comparison'
    | 'Intraday'
    | 'Charges'
    | 'Beginners'
    | 'Mutual Funds'
    | 'SIP'
    | 'Tax'
    | 'Investment Guide';
  readTime: string;
  summary: string;
  keywords: string[];
  content: string[];
}

const blogPosts: BlogPost[] = [
  {
    slug: 'best-demat-account-india-2026',
    title: 'Best Demat Account in India 2026: Zerodha vs Groww vs Angel One vs Upstox',
    category: 'Comparison',
    readTime: '8 min read',
    summary:
      'Compare Zerodha, Groww, Angel One and Upstox to find the best Demat account based on charges, platform, features and investor type.',
    keywords: ['best demat account india', 'zerodha vs groww', 'best broker india'],
    content: [
      'Opening a Demat account is the first step towards investing in stocks, ETFs, IPOs, bonds and mutual funds. With many brokers offering low-cost plans, choosing the right platform can be confusing.',
      'Zerodha is suitable for investors and traders who want a powerful trading platform, low brokerage and strong reliability. Kite is one of the most used trading platforms in India.',
      'Groww is best suited for beginners who want a simple app experience. It is easy to use and works well for first-time investors who mainly want to invest in stocks and mutual funds.',
      'Angel One is useful for users who want research, advisory support and a wide range of products. It combines discount pricing with full-service features.',
      'Upstox is a good choice for active traders who need charting tools, speed and competitive brokerage.',
      'Final verdict: Zerodha is best overall, Groww is best for beginners, Angel One is best for research support and Upstox is best for active traders.'
    ]
  },
  {
    slug: 'zerodha-vs-groww-vs-angel-one-vs-upstox',
    title: 'Zerodha vs Groww vs Angel One vs Upstox: Complete Comparison 2026',
    category: 'Comparison',
    readTime: '9 min read',
    summary:
      'A detailed comparison of Zerodha, Groww, Angel One and Upstox across brokerage, trading platforms, research tools and investor suitability.',
    keywords: ['zerodha vs groww', 'angel one vs upstox', 'broker comparison'],
    content: [
      'Zerodha, Groww, Angel One and Upstox are among the most popular brokers in India. Each broker is useful for a different type of investor or trader.',
      'Zerodha is strong in platform reliability, charting, order execution and long-term trust. It is ideal for serious investors and active traders.',
      'Groww focuses on simplicity. It is best for beginners who want to invest without dealing with complex trading tools.',
      'Angel One provides research reports, advisory tools and a broad product ecosystem. It is suitable for users who want more guidance.',
      'Upstox is trading-focused and works well for users interested in intraday and F&O trading.',
      'Choose based on your usage: beginners can consider Groww, serious investors can consider Zerodha, research-focused users can consider Angel One and active traders can consider Upstox.'
    ]
  },
  {
    slug: 'best-mutual-funds-india-2026',
    title: 'Best Mutual Funds in India 2026 for Long-Term Wealth Creation',
    category: 'Mutual Funds',
    readTime: '10 min read',
    summary:
      'A practical guide to selecting mutual funds for SIP, long-term wealth creation, tax saving and passive investing.',
    keywords: ['best mutual funds india', 'best sip funds', 'top mutual funds'],
    content: [
      'Mutual funds are one of the easiest ways to build long-term wealth in India. They allow investors to participate in equity, debt, hybrid and gold assets without directly selecting individual securities.',
      'A good mutual fund should be evaluated based on consistency, risk, expense ratio, fund manager experience, portfolio quality and long-term performance.',
      'Large cap funds are suitable for investors looking for relatively stable equity exposure. Mid cap and small cap funds carry higher risk but may offer higher long-term growth potential.',
      'Flexi cap funds provide diversified exposure across large, mid and small cap stocks. Index funds are suitable for low-cost passive investors.',
      'ELSS funds provide tax benefits under Section 80C but come with a 3-year lock-in period.',
      'Do not choose a fund only based on last 1-year return. Compare 3-year, 5-year, rolling returns, expense ratio, downside performance and risk level before investing.'
    ]
  },
  {
    slug: 'sip-calculator-guide',
    title: 'SIP Calculator Guide: How Much Should You Invest Every Month?',
    category: 'SIP',
    readTime: '7 min read',
    summary:
      'Understand SIP investing, compounding, expected returns and how to use a SIP calculator for your financial goals.',
    keywords: ['sip calculator', 'monthly sip investment', 'sip returns'],
    content: [
      'A Systematic Investment Plan, or SIP, allows you to invest a fixed amount every month in mutual funds. It is one of the most disciplined methods of long-term investing.',
      'SIP helps investors benefit from rupee cost averaging. When markets fall, your SIP buys more units. When markets rise, the value of accumulated units grows.',
      'A SIP calculator uses monthly investment amount, expected annual return and investment period to estimate future value.',
      'For example, a monthly SIP of ₹10,000 for 20 years at an assumed 12% return can create a significant long-term corpus due to compounding.',
      'Beginners can start with ₹1,000 to ₹5,000 per month. Salaried investors may target 15% to 25% of income for regular investments.',
      'SIP does not guarantee returns, but it helps build discipline and reduces emotional investing decisions.'
    ]
  },
  {
    slug: 'income-tax-slabs-old-vs-new-regime',
    title: 'Income Tax Slabs FY 2026-27: Old vs New Regime Explained',
    category: 'Tax',
    readTime: '8 min read',
    summary:
      'A simple explanation of old and new tax regimes, tax slabs, deductions and how to choose the right regime.',
    keywords: ['income tax slabs', 'old vs new tax regime', 'income tax calculator'],
    content: [
      'Choosing between the old and new tax regime is important for salaried individuals and business owners.',
      'The new tax regime generally offers lower slab rates but fewer deductions. It may be suitable for users who do not claim many exemptions or investments.',
      'The old tax regime allows deductions such as Section 80C, Section 80D, HRA, home loan interest and NPS contribution.',
      'If your eligible deductions are high, the old regime may reduce your taxable income significantly.',
      'If you have fewer investments and want a simpler structure, the new regime may be better.',
      'Always compare both regimes before filing your return. BrokerSphere Income Tax Calculator can help estimate which option may be better.'
    ]
  },
  {
    slug: 'how-to-start-investing-stock-market-india',
    title: 'How to Start Investing in Stock Market in India: Beginner Guide 2026',
    category: 'Beginners',
    readTime: '9 min read',
    summary:
      'A simple beginner guide for Indians who want to start investing in stocks, ETFs and mutual funds.',
    keywords: ['stock market beginners', 'how to invest in stocks', 'demat account'],
    content: [
      'Starting your stock market journey can feel confusing, but the basics are simple. You need a Demat account, trading account, bank account and a clear investment plan.',
      'The first step is to open a Demat account with a registered broker. Compare brokerage, AMC, trading platform, customer support and investment options before choosing.',
      'Beginners should avoid investing large amounts immediately. Start small, learn gradually and focus on understanding risk.',
      'Avoid following random stock tips, overtrading, using leverage and investing without research.',
      'For most beginners, diversified mutual funds or index funds may be easier than direct stock picking.',
      'The goal should be long-term wealth creation, not quick profits.'
    ]
  },
  {
    slug: 'best-elss-mutual-funds-tax-saving',
    title: 'Best ELSS Mutual Funds for Tax Saving in 2026',
    category: 'Mutual Funds',
    readTime: '7 min read',
    summary:
      'Understand ELSS mutual funds, 80C tax benefit, lock-in period, risk and how to select the right tax-saving fund.',
    keywords: ['best elss funds', 'tax saving mutual funds', '80c investment'],
    content: [
      'ELSS, or Equity Linked Savings Scheme, is a tax-saving mutual fund category eligible under Section 80C.',
      'Investments in ELSS can help reduce taxable income under the old tax regime, subject to the overall Section 80C limit.',
      'ELSS funds have a 3-year lock-in period, which is shorter than many other tax-saving products.',
      'Since ELSS funds invest mainly in equities, they carry market risk. They are suitable for investors who can stay invested for the long term.',
      'Before selecting an ELSS fund, compare long-term returns, fund manager experience, expense ratio, portfolio quality and risk.',
      'ELSS should not be selected only for tax saving. It should fit your long-term investment plan.'
    ]
  },
  {
    slug: 'fd-vs-debt-mutual-fund',
    title: 'FD vs Debt Mutual Fund: Which is Better for Indian Investors?',
    category: 'Investment Guide',
    readTime: '7 min read',
    summary:
      'Compare fixed deposits and debt mutual funds based on risk, tax, liquidity, returns and suitability.',
    keywords: ['fd vs debt mutual fund', 'fixed deposit vs mutual fund', 'safe investment'],
    content: [
      'Fixed deposits and debt mutual funds are both popular options for conservative investors, but they work differently.',
      'FDs offer predictable interest and are easier to understand. They are suitable for investors who want certainty and lower complexity.',
      'Debt mutual funds invest in bonds, treasury bills, corporate debt and money market instruments. Returns can fluctuate based on interest rates and credit risk.',
      'FD interest is taxable as per your income tax slab. Debt mutual fund taxation depends on current tax rules and holding period.',
      'FDs are useful for emergency funds and short-term goals. Debt funds may be considered by investors who understand interest rate and credit risk.',
      'Choose based on safety, liquidity, tax impact and your investment horizon.'
    ]
  },
  {
    slug: 'brokerage-calculator-guide-india',
    title: 'Brokerage Calculator Guide: How Trading Charges Affect Your Profit',
    category: 'Charges',
    readTime: '6 min read',
    summary:
      'Learn how brokerage, STT, exchange charges, GST, SEBI charges and DP charges affect your final trading profit.',
    keywords: ['brokerage calculator', 'trading charges india', 'brokerage charges'],
    content: [
      'Many traders focus only on buying and selling prices, but trading charges can significantly affect net profit.',
      'Common charges include brokerage, STT, exchange transaction charges, GST, SEBI charges, stamp duty and DP charges.',
      'Intraday and F&O traders should calculate charges before entering trades because frequent trading increases total cost.',
      'Delivery investors should understand DP charges because they are usually applied when selling holdings.',
      'A brokerage calculator helps estimate the real cost of trading before placing an order.',
      'Lower brokerage is useful, but platform reliability, customer support and order execution are equally important.'
    ]
  },
  {
    slug: 'options-trading-beginners-india',
    title: 'Options Trading for Beginners in India: Risks and Reality',
    category: 'Intraday',
    readTime: '8 min read',
    summary:
      'Understand option buying, option selling, time decay, risk management and why beginners should be careful with F&O trading.',
    keywords: ['options trading india', 'option buying', 'f&o trading'],
    content: [
      'Options trading has become very popular in India, but it is also one of the riskiest areas for beginners.',
      'Option buyers pay a premium and can lose the entire premium if the trade goes wrong. Time decay works against option buyers.',
      'Option sellers collect premium but face large risk if the market moves sharply against them.',
      'Beginners should avoid trading options with borrowed money or emergency funds.',
      'Risk management is more important than prediction. Always use position sizing, stop loss and defined-risk strategies.',
      'Options trading should be treated as a high-risk activity, not as a quick income source.'
    ]
  }
];

export const BlogHub: React.FC<{ onSelectBroker: (id: string) => void }> = ({
  onSelectBroker
}) => {
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(blogPosts.map((post) => post.category)))];
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === 'All' || post.category === activeCategory;

      const query = searchQuery.toLowerCase();

      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.keywords.some((keyword) => keyword.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const activePost = useMemo(() => {
    return blogPosts.find((post) => post.slug === selectedPostSlug) || null;
  }, [selectedPostSlug]);

  return (
    <div className="space-y-6">
      {activePost ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <button
            onClick={() => setSelectedPostSlug(null)}
            className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            ← Back to All Blogs
          </button>

          <div className="space-y-3">
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold uppercase tracking-wider rounded">
              {activePost.category}
            </span>

            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
              {activePost.title}
            </h1>

            <div className="flex flex-wrap gap-3 text-xs text-slate-500">
              <span>{activePost.readTime}</span>
              <span>•</span>
              <span>Updated for 2026</span>
              <span>•</span>
              <span>BrokerSphere Research</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-5 text-sm text-slate-700 leading-relaxed">
            {activePost.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">
              Compare popular brokers:
            </h4>

            <div className="flex flex-wrap gap-2">
              {brokersData.slice(0, 8).map((broker) => (
                <button
                  key={broker.id}
                  onClick={() => onSelectBroker(broker.id)}
                  className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 cursor-pointer"
                >
                  <BrokerLogo id={broker.id} className="w-5 h-5" />
                  {broker.name} Review
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <BookOpen size={20} />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Trading Guides & Blogs
                </h2>
                <p className="text-sm text-slate-500">
                  SEO-friendly investing, trading, mutual fund and tax guides for Indian users.
                </p>
              </div>
            </div>

            <div className="relative">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search blogs, brokers, SIP, tax, mutual funds..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  X
                </button>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
                    activeCategory === category
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
              <p className="text-sm font-semibold text-slate-500">
                No blogs found. Try another keyword or category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.slug}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center gap-3">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-extrabold uppercase tracking-wider rounded">
                        {post.category}
                      </span>

                      <span className="text-[10px] text-slate-500 font-semibold">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-600 transition-colors duration-200 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1 max-w-[70%]">
                      {post.keywords.slice(0, 2).map((keyword) => (
                        <span
                          key={keyword}
                          className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium"
                        >
                          #{keyword.toLowerCase().replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedPostSlug(post.slug)}
                      className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap"
                    >
                      Read
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
