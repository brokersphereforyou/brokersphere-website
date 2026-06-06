import { useEffect, useMemo, useState } from 'react';

type Scheme = {
  schemeCode: number;
  schemeName: string;
};

type NavPoint = {
  date: string;
  nav: string;
};

type FundDetails = {
  meta: {
    fund_house?: string;
    scheme_type?: string;
    scheme_category?: string;
    scheme_code?: number;
    scheme_name?: string;
  };
  data: NavPoint[];
};

type FundRow = {
  schemeCode: number;
  schemeName: string;
  fundHouse: string;
  category: string;
  risk: string;
  latestNav: number;
  latestDate: string;
  oneMonthReturn: number | null;
  sixMonthReturn: number | null;
  oneYearReturn: number | null;
  threeYearReturn: number | null;
  fiveYearReturn: number | null;
  expenseRatio: string;
  aum: string;
  minSip: string;
  exitLoad: string;
  bestFor: string;
};

const categoryTabs = [
  'Top Funds',
  'Best SIP',
  'Large Cap',
  'Mid Cap',
  'Small Cap',
  'Flexi Cap',
  'ELSS',
  'Index',
  'Debt',
  'Hybrid'
];

const fundKeywordMap: Record<string, string[]> = {
  'Top Funds': ['direct growth'],
  'Best SIP': ['direct growth', 'growth'],
  'Large Cap': ['large cap direct growth'],
  'Mid Cap': ['mid cap direct growth'],
  'Small Cap': ['small cap direct growth'],
  'Flexi Cap': ['flexi cap direct growth'],
  ELSS: ['elss direct growth', 'tax saver direct growth'],
  Index: ['index direct growth', 'nifty direct growth', 'sensex direct growth'],
  Debt: ['liquid direct growth', 'debt direct growth', 'gilt direct growth'],
  Hybrid: ['hybrid direct growth', 'balanced advantage direct growth']
};

export default function MutualFundScreener() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [fundRows, setFundRows] = useState<FundRow[]>([]);
  const [activeCategory, setActiveCategory] = useState('Top Funds');
  const [riskFilter, setRiskFilter] = useState('All');
  const [sortBy, setSortBy] = useState('threeYearReturn');
  const [search, setSearch] = useState('');
  const [expandedFund, setExpandedFund] = useState<number | null>(null);
  const [loadingSchemes, setLoadingSchemes] = useState(true);
  const [loadingFunds, setLoadingFunds] = useState(false);
  const [error, setError] = useState('');

  const formatPercent = (value: number | null) => {
    if (value === null || Number.isNaN(value)) return 'N/A';
    return `${value.toFixed(2)}%`;
  };

  const formatNav = (value: number) => {
    if (!value || Number.isNaN(value)) return 'N/A';
    return `₹${value.toFixed(2)}`;
  };

  const formatDate = (value: string) => {
    if (!value || value === 'N/A') return 'N/A';

    const parts = value.split('-');
    if (parts.length !== 3) return value;

    const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateReturn = (data: NavPoint[], daysBack: number) => {
    if (!data || data.length < 2) return null;

    const latest = data[0];
    const latestNav = Number(latest.nav);

    if (!latestNav || Number.isNaN(latestNav)) return null;

    const latestDate = new Date(latest.date.split('-').reverse().join('-'));
    const targetDate = new Date(latestDate);
    targetDate.setDate(targetDate.getDate() - daysBack);

    const olderPoint = data.find((point) => {
      const pointDate = new Date(point.date.split('-').reverse().join('-'));
      return pointDate <= targetDate;
    });

    if (!olderPoint) return null;

    const olderNav = Number(olderPoint.nav);
    if (!olderNav || Number.isNaN(olderNav)) return null;

    return ((latestNav - olderNav) / olderNav) * 100;
  };

  const inferCategory = (name: string, apiCategory?: string) => {
    const text = `${name} ${apiCategory || ''}`.toLowerCase();

    if (text.includes('small cap')) return 'Small Cap';
    if (text.includes('mid cap')) return 'Mid Cap';
    if (text.includes('large cap')) return 'Large Cap';
    if (text.includes('flexi cap')) return 'Flexi Cap';
    if (text.includes('multi cap')) return 'Multi Cap';
    if (text.includes('elss') || text.includes('tax saver')) return 'ELSS';
    if (text.includes('index') || text.includes('nifty') || text.includes('sensex')) return 'Index';
    if (text.includes('liquid')) return 'Liquid';
    if (text.includes('debt') || text.includes('gilt') || text.includes('bond')) return 'Debt';
    if (text.includes('hybrid') || text.includes('balanced advantage') || text.includes('balanced')) return 'Hybrid';
    if (text.includes('gold')) return 'Gold';
    if (text.includes('contra')) return 'Contra';

    return apiCategory || 'Other';
  };

  const inferRisk = (category: string) => {
    if (['Debt', 'Liquid'].includes(category)) return 'Low to Moderate';
    if (['Hybrid', 'Gold'].includes(category)) return 'Moderate';
    if (['Large Cap', 'Index'].includes(category)) return 'High';
    return 'Very High';
  };

  const inferBestFor = (category: string) => {
    if (category === 'Small Cap') return 'Aggressive long-term investors';
    if (category === 'Mid Cap') return 'High-growth investors';
    if (category === 'Large Cap') return 'Stable equity investors';
    if (category === 'Flexi Cap') return 'Diversified equity investors';
    if (category === 'ELSS') return 'Tax saving under 80C';
    if (category === 'Index') return 'Low-cost passive investors';
    if (category === 'Debt' || category === 'Liquid') return 'Short-term parking / low volatility';
    if (category === 'Hybrid') return 'Balanced risk investors';
    return 'General investors';
  };

  const inferManualFields = (category: string) => {
    if (category === 'Index') {
      return {
        expenseRatio: 'Usually Low',
        aum: 'Check AMC',
        minSip: '₹100+',
        exitLoad: 'Check Scheme'
      };
    }

    if (category === 'Debt' || category === 'Liquid') {
      return {
        expenseRatio: 'Low to Moderate',
        aum: 'Check AMC',
        minSip: '₹100+',
        exitLoad: 'Usually Low / Nil'
      };
    }

    if (category === 'ELSS') {
      return {
        expenseRatio: 'Check Factsheet',
        aum: 'Check AMC',
        minSip: '₹500+',
        exitLoad: '3-year lock-in'
      };
    }

    return {
      expenseRatio: 'Check Factsheet',
      aum: 'Check AMC',
      minSip: '₹100+',
      exitLoad: 'Check Scheme'
    };
  };

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setLoadingSchemes(true);
        setError('');

        const response = await fetch('https://api.mfapi.in/mf');

        if (!response.ok) {
          throw new Error('Unable to fetch scheme list');
        }

        const data: Scheme[] = await response.json();
        setSchemes(data);
      } catch (err) {
        setError('Unable to load mutual fund list right now. Please try again later.');
      } finally {
        setLoadingSchemes(false);
      }
    };

    fetchSchemes();
  }, []);

  const selectedSchemes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (query) {
      return schemes
        .filter((scheme) => scheme.schemeName.toLowerCase().includes(query))
        .slice(0, 20);
    }

    const keywords = fundKeywordMap[activeCategory] || ['direct growth'];

    return schemes
      .filter((scheme) => {
        const name = scheme.schemeName.toLowerCase();

        if (!name.includes('direct')) return false;
        if (!name.includes('growth')) return false;

        return keywords.some((keyword) =>
          keyword
            .split(' ')
            .every((word) => name.includes(word))
        );
      })
      .slice(0, 18);
  }, [schemes, activeCategory, search]);

  const loadFunds = async () => {
    try {
      setLoadingFunds(true);
      setError('');
      setExpandedFund(null);

      const rows = await Promise.all(
        selectedSchemes.slice(0, 15).map(async (scheme) => {
          const response = await fetch(`https://api.mfapi.in/mf/${scheme.schemeCode}`);

          if (!response.ok) return null;

          const details: FundDetails = await response.json();

          const latest = details.data?.[0];
          const latestNav = Number(latest?.nav || 0);
          const schemeName = details.meta?.scheme_name || scheme.schemeName;
          const category = inferCategory(schemeName, details.meta?.scheme_category);
          const manual = inferManualFields(category);

          return {
            schemeCode: scheme.schemeCode,
            schemeName,
            fundHouse: details.meta?.fund_house || 'N/A',
            category,
            risk: inferRisk(category),
            latestNav,
            latestDate: latest?.date || 'N/A',
            oneMonthReturn: calculateReturn(details.data, 30),
            sixMonthReturn: calculateReturn(details.data, 180),
            oneYearReturn: calculateReturn(details.data, 365),
            threeYearReturn: calculateReturn(details.data, 1095),
            fiveYearReturn: calculateReturn(details.data, 1825),
            expenseRatio: manual.expenseRatio,
            aum: manual.aum,
            minSip: manual.minSip,
            exitLoad: manual.exitLoad,
            bestFor: inferBestFor(category)
          };
        })
      );

      setFundRows(rows.filter(Boolean) as FundRow[]);
    } catch (err) {
      setError('Unable to fetch fund details right now. Please try again later.');
    } finally {
      setLoadingFunds(false);
    }
  };

  useEffect(() => {
    if (schemes.length > 0) {
      loadFunds();
    }
  }, [schemes, activeCategory]);

  const filteredRows = useMemo(() => {
    let result = [...fundRows];

    if (riskFilter !== 'All') {
      result = result.filter((fund) => fund.risk === riskFilter);
    }

    result.sort((a, b) => {
      const aValue = a[sortBy as keyof FundRow];
      const bValue = b[sortBy as keyof FundRow];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return bValue - aValue;
      }

      return 0;
    });

    return result;
  }, [fundRows, riskFilter, sortBy]);

  const topThree = filteredRows.slice(0, 3);

  return (
    <section className="py-16 px-4 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Mutual Fund Screener
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Discover mutual funds by category, risk, investment style and recent NAV-based returns.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveCategory(tab);
                  setSearch('');
                }}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap ${
                  activeCategory === tab && !search
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-4 gap-4 mt-5">
            <div className="lg:col-span-2">
              <label className="block text-sm font-bold mb-2">
                Search Fund House or Fund Name
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Optional: HDFC, SBI, ICICI, Parag Parikh..."
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
              />
              <p className="text-xs text-slate-500 mt-2">
                You can also leave this blank and use the category tabs above.
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Risk Level</label>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
              >
                <option value="All">All Risk Levels</option>
                <option value="Low to Moderate">Low to Moderate</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Very High">Very High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
              >
                <option value="threeYearReturn">Best 3Y Return</option>
                <option value="fiveYearReturn">Best 5Y Return</option>
                <option value="oneYearReturn">Best 1Y Return</option>
                <option value="sixMonthReturn">Best 6M Return</option>
                <option value="oneMonthReturn">Best 1M Return</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              NAV and return data are fetched live from MFAPI. Other fields are factsheet guidance.
            </p>

            <button
              onClick={loadFunds}
              disabled={loadingSchemes || loadingFunds}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold disabled:opacity-60"
            >
              {loadingFunds ? 'Loading Funds...' : 'Refresh Funds'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-4 mb-6 text-sm font-semibold">
            {error}
          </div>
        )}

        {topThree.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {topThree.map((fund, index) => (
              <div key={fund.schemeCode} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="text-xs font-bold text-emerald-700 mb-2">
                  #{index + 1} in current filter
                </div>
                <h3 className="font-extrabold text-slate-900 mb-2 line-clamp-2">
                  {fund.schemeName}
                </h3>
                <p className="text-sm text-slate-600 mb-3">{fund.category} • {fund.risk}</p>
                <div className="flex justify-between text-sm">
                  <span>3Y Return</span>
                  <strong className="text-emerald-700">{formatPercent(fund.threeYearReturn)}</strong>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Latest NAV</span>
                  <strong>{formatNav(fund.latestNav)}</strong>
                </div>
              </div>
            ))}
          </div>
        )}

        {loadingSchemes || loadingFunds ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
            <p className="font-bold text-slate-700">Loading mutual fund data...</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[1050px]">
                <thead className="bg-slate-100 text-slate-700 text-xs uppercase">
                  <tr>
                    <th className="p-4">Fund</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Risk</th>
                    <th className="p-4">Latest NAV</th>
                    <th className="p-4">1Y</th>
                    <th className="p-4">3Y</th>
                    <th className="p-4">5Y</th>
                    <th className="p-4">Best For</th>
                    <th className="p-4">Details</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-6 text-center text-slate-500">
                        No funds found. Try another category or search term.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((fund) => (
                      <>
                        <tr key={fund.schemeCode} className="hover:bg-slate-50">
                          <td className="p-4">
                            <div className="font-bold text-slate-900 max-w-[320px]">
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

                          <td className="p-4 text-sm font-semibold">
                            {fund.risk}
                          </td>

                          <td className="p-4">
                            <div className="font-bold">{formatNav(fund.latestNav)}</div>
                            <div className="text-xs text-slate-500">
                              Updated: {formatDate(fund.latestDate)}
                            </div>
                          </td>

                          <td className="p-4 font-semibold">{formatPercent(fund.oneYearReturn)}</td>
                          <td className="p-4 font-bold text-emerald-700">{formatPercent(fund.threeYearReturn)}</td>
                          <td className="p-4 font-bold text-emerald-700">{formatPercent(fund.fiveYearReturn)}</td>

                          <td className="p-4 text-sm text-slate-700 max-w-[180px]">
                            {fund.bestFor}
                          </td>

                          <td className="p-4">
                            <button
                              onClick={() =>
                                setExpandedFund(
                                  expandedFund === fund.schemeCode ? null : fund.schemeCode
                                )
                              }
                              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
                            >
                              {expandedFund === fund.schemeCode ? 'Hide' : 'View'}
                            </button>
                          </td>
                        </tr>

                        {expandedFund === fund.schemeCode && (
                          <tr>
                            <td colSpan={9} className="p-5 bg-slate-50">
                              <div className="grid md:grid-cols-4 gap-4">
                                <div className="bg-white border border-slate-200 rounded-xl p-4">
                                  <h4 className="font-bold mb-3">NAV Details</h4>
                                  <p className="text-sm mb-2"><strong>Latest NAV:</strong> {formatNav(fund.latestNav)}</p>
                                  <p className="text-sm"><strong>Updated:</strong> {formatDate(fund.latestDate)}</p>
                                </div>

                                <div className="bg-white border border-slate-200 rounded-xl p-4">
                                  <h4 className="font-bold mb-3">Cost Details</h4>
                                  <p className="text-sm mb-2"><strong>Expense Ratio:</strong> {fund.expenseRatio}</p>
                                  <p className="text-sm mb-2"><strong>AUM:</strong> {fund.aum}</p>
                                  <p className="text-sm"><strong>Exit Load:</strong> {fund.exitLoad}</p>
                                </div>

                                <div className="bg-white border border-slate-200 rounded-xl p-4">
                                  <h4 className="font-bold mb-3">Investment Details</h4>
                                  <p className="text-sm mb-2"><strong>Min SIP:</strong> {fund.minSip}</p>
                                  <p className="text-sm mb-2"><strong>Risk:</strong> {fund.risk}</p>
                                  <p className="text-sm"><strong>Best For:</strong> {fund.bestFor}</p>
                                </div>

                                <div className="bg-white border border-slate-200 rounded-xl p-4">
                                  <h4 className="font-bold mb-3">Returns</h4>
                                  <p className="text-sm mb-2"><strong>1M:</strong> {formatPercent(fund.oneMonthReturn)}</p>
                                  <p className="text-sm mb-2"><strong>6M:</strong> {formatPercent(fund.sixMonthReturn)}</p>
                                  <p className="text-sm mb-2"><strong>1Y:</strong> {formatPercent(fund.oneYearReturn)}</p>
                                  <p className="text-sm"><strong>3Y:</strong> {formatPercent(fund.threeYearReturn)}</p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-900 leading-relaxed">
          <strong>Important:</strong> NAV and return calculations are based on live MFAPI NAV history.
          Expense ratio, AUM, exit load, fund manager, holdings and sector allocation are not available from this free NAV API.
          For a fully professional screener with live factsheet data, you need a paid mutual fund data API or monthly AMC factsheet update system.
        </div>

        <p className="text-xs text-slate-500 mt-5 leading-relaxed">
          Disclaimer: This tool is for educational purposes only. Returns are calculated from available NAV history and may differ from official fund-house returns due to date availability and calculation method. Please verify scheme documents, riskometer, expense ratio, exit load and factsheet before investing.
        </p>
      </div>
    </section>
  );
}
