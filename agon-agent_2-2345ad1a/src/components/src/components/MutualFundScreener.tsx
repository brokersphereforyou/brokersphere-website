import { useMemo, useState } from 'react';

type Fund = {
  name: string;
  category: string;
  risk: 'Low' | 'Moderate' | 'High' | 'Very High';
  oneYear: number;
  threeYear: number;
  fiveYear: number;
  expenseRatio: number;
  aum: number;
  minSip: number;
};

const funds: Fund[] = [
  {
    name: 'Parag Parikh Flexi Cap Fund',
    category: 'Flexi Cap',
    risk: 'Very High',
    oneYear: 24.5,
    threeYear: 19.2,
    fiveYear: 21.4,
    expenseRatio: 0.65,
    aum: 76000,
    minSip: 1000
  },
  {
    name: 'HDFC Mid-Cap Opportunities Fund',
    category: 'Mid Cap',
    risk: 'Very High',
    oneYear: 32.4,
    threeYear: 27.8,
    fiveYear: 25.1,
    expenseRatio: 0.78,
    aum: 78000,
    minSip: 100
  },
  {
    name: 'Nippon India Small Cap Fund',
    category: 'Small Cap',
    risk: 'Very High',
    oneYear: 35.6,
    threeYear: 30.4,
    fiveYear: 28.6,
    expenseRatio: 0.68,
    aum: 62000,
    minSip: 100
  },
  {
    name: 'ICICI Prudential Bluechip Fund',
    category: 'Large Cap',
    risk: 'High',
    oneYear: 18.2,
    threeYear: 16.8,
    fiveYear: 17.4,
    expenseRatio: 0.82,
    aum: 59000,
    minSip: 100
  },
  {
    name: 'Axis ELSS Tax Saver Fund',
    category: 'ELSS',
    risk: 'Very High',
    oneYear: 15.4,
    threeYear: 13.8,
    fiveYear: 14.6,
    expenseRatio: 0.74,
    aum: 36000,
    minSip: 500
  },
  {
    name: 'SBI Contra Fund',
    category: 'Contra',
    risk: 'Very High',
    oneYear: 28.1,
    threeYear: 25.4,
    fiveYear: 23.7,
    expenseRatio: 0.71,
    aum: 33000,
    minSip: 500
  },
  {
    name: 'HDFC Balanced Advantage Fund',
    category: 'Hybrid',
    risk: 'Moderate',
    oneYear: 14.2,
    threeYear: 13.1,
    fiveYear: 12.5,
    expenseRatio: 0.79,
    aum: 88000,
    minSip: 100
  },
  {
    name: 'ICICI Prudential Liquid Fund',
    category: 'Debt',
    risk: 'Low',
    oneYear: 7.1,
    threeYear: 6.4,
    fiveYear: 5.9,
    expenseRatio: 0.21,
    aum: 51000,
    minSip: 100
  }
];

export default function MutualFundScreener() {
  const [category, setCategory] = useState('All');
  const [risk, setRisk] = useState('All');
  const [sortBy, setSortBy] = useState('fiveYear');

  const formatCurrency = (value: number) =>
    `₹${value.toLocaleString('en-IN')} Cr`;

  const filteredFunds = useMemo(() => {
    let result = [...funds];

    if (category !== 'All') {
      result = result.filter((fund) => fund.category === category);
    }

    if (risk !== 'All') {
      result = result.filter((fund) => fund.risk === risk);
    }

    result.sort((a, b) => {
      if (sortBy === 'oneYear') return b.oneYear - a.oneYear;
      if (sortBy === 'threeYear') return b.threeYear - a.threeYear;
      if (sortBy === 'fiveYear') return b.fiveYear - a.fiveYear;
      if (sortBy === 'expenseRatio') return a.expenseRatio - b.expenseRatio;
      return b.fiveYear - a.fiveYear;
    });

    return result;
  }, [category, risk, sortBy]);

  const categories = ['All', 'Large Cap', 'Mid Cap', 'Small Cap', 'Flexi Cap', 'ELSS', 'Hybrid', 'Debt', 'Contra'];
  const risks = ['All', 'Low', 'Moderate', 'High', 'Very High'];

  return (
    <section className="py-16 px-4 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Mutual Fund Screener
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Filter and compare mutual funds by category, risk level, returns, expense ratio, AUM and minimum SIP amount.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Fund Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Risk Level</label>
              <select
                value={risk}
                onChange={(e) => setRisk(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
              >
                {risks.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
              >
                <option value="fiveYear">Best 5Y Returns</option>
                <option value="threeYear">Best 3Y Returns</option>
                <option value="oneYear">Best 1Y Returns</option>
                <option value="expenseRatio">Lowest Expense Ratio</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[900px]">
              <thead className="bg-slate-100 text-slate-700 text-xs uppercase">
                <tr>
                  <th className="p-4">Fund Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Risk</th>
                  <th className="p-4">1Y Return</th>
                  <th className="p-4">3Y Return</th>
                  <th className="p-4">5Y Return</th>
                  <th className="p-4">Expense Ratio</th>
                  <th className="p-4">AUM</th>
                  <th className="p-4">Min SIP</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredFunds.map((fund) => (
                  <tr key={fund.name} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">{fund.name}</td>
                    <td className="p-4 text-sm">{fund.category}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold">
                        {fund.risk}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-700">{fund.oneYear}%</td>
                    <td className="p-4 font-semibold text-slate-700">{fund.threeYear}%</td>
                    <td className="p-4 font-bold text-emerald-700">{fund.fiveYear}%</td>
                    <td className="p-4">{fund.expenseRatio}%</td>
                    <td className="p-4">{formatCurrency(fund.aum)}</td>
                    <td className="p-4 font-semibold">₹{fund.minSip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-5 leading-relaxed">
          Disclaimer: This mutual fund screener uses sample/static fund data for educational purposes only. Returns are indicative and may not reflect current market values. Please verify latest NAV, returns, risk rating, expense ratio and scheme documents before investing.
        </p>
      </div>
    </section>
  );
}
