import { useMemo, useState } from 'react';

type FundRow = {
  schemeName: string;
  fundHouse: string;
  category: string;
  risk: string;
  latestNav: string;
  oneYearReturn: number;
  threeYearCagr: number;
  fiveYearCagr: number;
  expenseRatio: string;
  aum: string;
  bestFor: string;
};

const sampleFunds: FundRow[] = [
  // Large Cap
  {
    schemeName: 'ICICI Prudential Bluechip Fund - Direct Growth',
    fundHouse: 'ICICI Prudential Mutual Fund',
    category: 'Large Cap',
    risk: 'High',
    latestNav: 'Check AMC',
    oneYearReturn: 18.2,
    threeYearCagr: 16.8,
    fiveYearCagr: 17.4,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Stable equity investors'
  },
  {
    schemeName: 'Mirae Asset Large Cap Fund - Direct Growth',
    fundHouse: 'Mirae Asset Mutual Fund',
    category: 'Large Cap',
    risk: 'High',
    latestNav: 'Check AMC',
    oneYearReturn: 17.4,
    threeYearCagr: 15.9,
    fiveYearCagr: 16.8,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Long-term large cap investors'
  },
  {
    schemeName: 'Nippon India Large Cap Fund - Direct Growth',
    fundHouse: 'Nippon India Mutual Fund',
    category: 'Large Cap',
    risk: 'High',
    latestNav: 'Check AMC',
    oneYearReturn: 21.1,
    threeYearCagr: 18.6,
    fiveYearCagr: 18.9,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Stable wealth creation'
  },

  // Mid Cap
  {
    schemeName: 'HDFC Mid-Cap Opportunities Fund - Direct Growth',
    fundHouse: 'HDFC Mutual Fund',
    category: 'Mid Cap',
    risk: 'Very High',
    latestNav: 'Check AMC',
    oneYearReturn: 32.4,
    threeYearCagr: 27.8,
    fiveYearCagr: 25.1,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'High-growth investors'
  },
  {
    schemeName: 'Motilal Oswal Midcap Fund - Direct Growth',
    fundHouse: 'Motilal Oswal Mutual Fund',
    category: 'Mid Cap',
    risk: 'Very High',
    latestNav: 'Check AMC',
    oneYearReturn: 35.2,
    threeYearCagr: 29.4,
    fiveYearCagr: 26.2,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Aggressive growth investors'
  },
  {
    schemeName: 'Edelweiss Mid Cap Fund - Direct Growth',
    fundHouse: 'Edelweiss Mutual Fund',
    category: 'Mid Cap',
    risk: 'Very High',
    latestNav: 'Check AMC',
    oneYearReturn: 28.8,
    threeYearCagr: 24.6,
    fiveYearCagr: 22.7,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Long-term mid cap exposure'
  },

  // Small Cap
  {
    schemeName: 'Nippon India Small Cap Fund - Direct Growth',
    fundHouse: 'Nippon India Mutual Fund',
    category: 'Small Cap',
    risk: 'Very High',
    latestNav: 'Check AMC',
    oneYearReturn: 35.6,
    threeYearCagr: 30.4,
    fiveYearCagr: 28.6,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Aggressive long-term investors'
  },
  {
    schemeName: 'SBI Small Cap Fund - Direct Growth',
    fundHouse: 'SBI Mutual Fund',
    category: 'Small Cap',
    risk: 'Very High',
    latestNav: 'Check AMC',
    oneYearReturn: 31.2,
    threeYearCagr: 26.8,
    fiveYearCagr: 24.5,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'High-risk wealth creation'
  },
  {
    schemeName: 'Axis Small Cap Fund - Direct Growth',
    fundHouse: 'Axis Mutual Fund',
    category: 'Small Cap',
    risk: 'Very High',
    latestNav: 'Check AMC',
    oneYearReturn: 26.4,
    threeYearCagr: 23.1,
    fiveYearCagr: 22.4,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Long-term aggressive SIP'
  },

  // Flexi Cap
  {
    schemeName: 'Parag Parikh Flexi Cap Fund - Direct Growth',
    fundHouse: 'PPFAS Mutual Fund',
    category: 'Flexi Cap',
    risk: 'Very High',
    latestNav: 'Check AMC',
    oneYearReturn: 24.5,
    threeYearCagr: 19.2,
    fiveYearCagr: 21.4,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Diversified long-term investors'
  },
  {
    schemeName: 'HDFC Flexi Cap Fund - Direct Growth',
    fundHouse: 'HDFC Mutual Fund',
    category: 'Flexi Cap',
    risk: 'Very High',
    latestNav: 'Check AMC',
    oneYearReturn: 27.6,
    threeYearCagr: 21.8,
    fiveYearCagr: 20.7,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Flexible equity allocation'
  },
  {
    schemeName: 'Kotak Flexicap Fund - Direct Growth',
    fundHouse: 'Kotak Mutual Fund',
    category: 'Flexi Cap',
    risk: 'Very High',
    latestNav: 'Check AMC',
    oneYearReturn: 20.4,
    threeYearCagr: 17.6,
    fiveYearCagr: 18.1,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Diversified equity investors'
  },

  // ELSS
  {
    schemeName: 'Mirae Asset ELSS Tax Saver Fund - Direct Growth',
    fundHouse: 'Mirae Asset Mutual Fund',
    category: 'ELSS',
    risk: 'Very High',
    latestNav: 'Check AMC',
    oneYearReturn: 20.1,
    threeYearCagr: 17.5,
    fiveYearCagr: 18.3,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Tax saving under 80C'
  },
  {
    schemeName: 'Quant ELSS Tax Saver Fund - Direct Growth',
    fundHouse: 'Quant Mutual Fund',
    category: 'ELSS',
    risk: 'Very High',
    latestNav: 'Check AMC',
    oneYearReturn: 26.8,
    threeYearCagr: 24.2,
    fiveYearCagr: 23.5,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Aggressive tax saving'
  },
  {
    schemeName: 'DSP ELSS Tax Saver Fund - Direct Growth',
    fundHouse: 'DSP Mutual Fund',
    category: 'ELSS',
    risk: 'Very High',
    latestNav: 'Check AMC',
    oneYearReturn: 18.7,
    threeYearCagr: 16.9,
    fiveYearCagr: 17.2,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Tax saving with equity exposure'
  },

  // Index
  {
    schemeName: 'HDFC Index Fund Nifty 50 Plan - Direct Growth',
    fundHouse: 'HDFC Mutual Fund',
    category: 'Index',
    risk: 'High',
    latestNav: 'Check AMC',
    oneYearReturn: 17.6,
    threeYearCagr: 15.4,
    fiveYearCagr: 16.2,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Low-cost passive investors'
  },
  {
    schemeName: 'UTI Nifty 50 Index Fund - Direct Growth',
    fundHouse: 'UTI Mutual Fund',
    category: 'Index',
    risk: 'High',
    latestNav: 'Check AMC',
    oneYearReturn: 17.2,
    threeYearCagr: 15.1,
    fiveYearCagr: 16.0,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Passive Nifty exposure'
  },
  {
    schemeName: 'ICICI Prudential Nifty Next 50 Index Fund - Direct Growth',
    fundHouse: 'ICICI Prudential Mutual Fund',
    category: 'Index',
    risk: 'High',
    latestNav: 'Check AMC',
    oneYearReturn: 22.4,
    threeYearCagr: 18.3,
    fiveYearCagr: 17.9,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Passive high-growth exposure'
  },

  // Debt
  {
    schemeName: 'ICICI Prudential Liquid Fund - Direct Growth',
    fundHouse: 'ICICI Prudential Mutual Fund',
    category: 'Debt',
    risk: 'Low to Moderate',
    latestNav: 'Check AMC',
    oneYearReturn: 7.1,
    threeYearCagr: 6.4,
    fiveYearCagr: 5.9,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Short-term parking'
  },
  {
    schemeName: 'HDFC Liquid Fund - Direct Growth',
    fundHouse: 'HDFC Mutual Fund',
    category: 'Debt',
    risk: 'Low to Moderate',
    latestNav: 'Check AMC',
    oneYearReturn: 7.0,
    threeYearCagr: 6.3,
    fiveYearCagr: 5.8,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Emergency fund parking'
  },
  {
    schemeName: 'SBI Magnum Gilt Fund - Direct Growth',
    fundHouse: 'SBI Mutual Fund',
    category: 'Debt',
    risk: 'Moderate',
    latestNav: 'Check AMC',
    oneYearReturn: 8.2,
    threeYearCagr: 6.9,
    fiveYearCagr: 6.5,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Debt allocation'
  },

  // Hybrid
  {
    schemeName: 'HDFC Balanced Advantage Fund - Direct Growth',
    fundHouse: 'HDFC Mutual Fund',
    category: 'Hybrid',
    risk: 'Moderate',
    latestNav: 'Check AMC',
    oneYearReturn: 14.2,
    threeYearCagr: 13.1,
    fiveYearCagr: 12.5,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Balanced risk investors'
  },
  {
    schemeName: 'ICICI Prudential Balanced Advantage Fund - Direct Growth',
    fundHouse: 'ICICI Prudential Mutual Fund',
    category: 'Hybrid',
    risk: 'Moderate',
    latestNav: 'Check AMC',
    oneYearReturn: 13.8,
    threeYearCagr: 12.7,
    fiveYearCagr: 12.2,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Conservative equity investors'
  },
  {
    schemeName: 'Edelweiss Balanced Advantage Fund - Direct Growth',
    fundHouse: 'Edelweiss Mutual Fund',
    category: 'Hybrid',
    risk: 'Moderate',
    latestNav: 'Check AMC',
    oneYearReturn: 12.9,
    threeYearCagr: 11.8,
    fiveYearCagr: 11.6,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Moderate risk investors'
  },

  // Gold
  {
    schemeName: 'SBI Gold Fund - Direct Growth',
    fundHouse: 'SBI Mutual Fund',
    category: 'Gold',
    risk: 'Moderate',
    latestNav: 'Check AMC',
    oneYearReturn: 15.5,
    threeYearCagr: 13.8,
    fiveYearCagr: 12.9,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Portfolio hedge'
  },
  {
    schemeName: 'Nippon India Gold Savings Fund - Direct Growth',
    fundHouse: 'Nippon India Mutual Fund',
    category: 'Gold',
    risk: 'Moderate',
    latestNav: 'Check AMC',
    oneYearReturn: 16.1,
    threeYearCagr: 14.1,
    fiveYearCagr: 13.2,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Gold allocation'
  },
  {
    schemeName: 'HDFC Gold Fund - Direct Growth',
    fundHouse: 'HDFC Mutual Fund',
    category: 'Gold',
    risk: 'Moderate',
    latestNav: 'Check AMC',
    oneYearReturn: 15.8,
    threeYearCagr: 13.9,
    fiveYearCagr: 13.0,
    expenseRatio: 'Check AMC',
    aum: 'Check AMC',
    bestFor: 'Inflation hedge'
  }
];

const categories = [
  'Top Funds',
  'Large Cap',
  'Mid Cap',
  'Small Cap',
  'Flexi Cap',
  'ELSS',
  'Index',
  'Debt',
  'Hybrid',
  'Gold'
];

export default function MutualFundScreener() {
  const [activeCategory, setActiveCategory] = useState('Top Funds');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'oneYearReturn' | 'threeYearCagr' | 'fiveYearCagr'>('threeYearCagr');

  const filteredFunds = useMemo(() => {
    let result = [...sampleFunds];

    if (activeCategory !== 'Top Funds') {
      result = result.filter((fund) => fund.category === activeCategory);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (fund) =>
          fund.schemeName.toLowerCase().includes(query) ||
          fund.fundHouse.toLowerCase().includes(query) ||
          fund.category.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => b[sortBy] - a[sortBy]);

    return result;
  }, [activeCategory, search, sortBy]);

  const formatPercent = (value: number) => `${value.toFixed(2)}%`;

  return (
    <section className="py-16 px-4 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Mutual Fund Screener
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Explore mutual funds by category, risk profile, fund house and estimated return profile.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4 mt-5">
            <div className="lg:col-span-2">
              <label className="block text-sm font-bold mb-2">
                Optional Search
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Example: HDFC, SBI, ICICI, Parag Parikh"
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
              >
                <option value="threeYearCagr">Best 3Y CAGR</option>
                <option value="fiveYearCagr">Best 5Y CAGR</option>
                <option value="oneYearReturn">Best 1Y Return</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {filteredFunds.slice(0, 3).map((fund, index) => (
            <div key={fund.schemeName} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="text-xs font-bold text-emerald-700 mb-2">
                #{index + 1} in current filter
              </div>
              <h3 className="font-extrabold text-slate-900 mb-2">
                {fund.schemeName}
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                {fund.category} • {fund.risk}
              </p>
              <div className="flex justify-between text-sm">
                <span>3Y CAGR</span>
                <strong className="text-emerald-700">
                  {formatPercent(fund.threeYearCagr)}
                </strong>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>5Y CAGR</span>
                <strong className="text-emerald-700">
                  {formatPercent(fund.fiveYearCagr)}
                </strong>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1100px]">
              <thead className="bg-slate-100 text-slate-700 text-xs uppercase">
                <tr>
                  <th className="p-4">Fund</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Risk</th>
                  <th className="p-4">Latest NAV</th>
                  <th className="p-4">1Y Return</th>
                  <th className="p-4">3Y CAGR</th>
                  <th className="p-4">5Y CAGR</th>
                  <th className="p-4">Expense Ratio</th>
                  <th className="p-4">AUM</th>
                  <th className="p-4">Best For</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredFunds.map((fund) => (
                  <tr key={fund.schemeName} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 max-w-[340px]">
                        {fund.schemeName}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {fund.fundHouse}
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold">
                        {fund.category}
                      </span>
                    </td>

                    <td className="p-4 text-sm font-semibold">{fund.risk}</td>
                    <td className="p-4 font-bold">{fund.latestNav}</td>
                    <td className="p-4 font-semibold">{formatPercent(fund.oneYearReturn)}</td>
                    <td className="p-4 font-bold text-emerald-700">{formatPercent(fund.threeYearCagr)}</td>
                    <td className="p-4 font-bold text-emerald-700">{formatPercent(fund.fiveYearCagr)}</td>
                    <td className="p-4 text-sm">{fund.expenseRatio}</td>
                    <td className="p-4 text-sm">{fund.aum}</td>
                    <td className="p-4 text-sm text-slate-700">{fund.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-900 leading-relaxed">
          <strong>Important:</strong> This screener currently uses curated fallback data to keep the website stable.
          For accurate live NAV, AUM, expense ratio, holdings, sector allocation and fund manager details,
          connect a professional mutual fund data API or maintain an AMC factsheet database.
        </div>
      </div>
    </section>
  );
}
