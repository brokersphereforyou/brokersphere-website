import { useEffect, useMemo, useState } from 'react';

type Scheme = { schemeCode: number; schemeName: string };
type NavPoint = { date: string; nav: string };

type FundDetails = {
  meta: {
    fund_house?: string;
    scheme_category?: string;
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
  oneYearReturn: number | null;
  threeYearCagr: number | null;
  fiveYearCagr: number | null;
  bestFor: string;
};

const categoryTabs = [
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

const keywords: Record<string, string[]> = {
  'Top Funds': ['large cap', 'mid cap', 'small cap', 'flexi cap', 'index', 'elss'],
  'Large Cap': ['large cap'],
  'Mid Cap': ['mid cap'],
  'Small Cap': ['small cap'],
  'Flexi Cap': ['flexi cap'],
  ELSS: ['elss', 'tax saver'],
  Index: ['index', 'nifty', 'sensex'],
  Debt: ['liquid', 'debt', 'bond', 'gilt'],
  Hybrid: ['hybrid', 'balanced advantage'],
  Gold: ['gold']
};

const blockedWords = [
  'regular',
  'idcw',
  'dividend',
  'bonus',
  'reinvestment',
  'weekly',
  'monthly',
  'quarterly',
  'half yearly',
  'plan i',
  'plan- i',
  'institutional',
  'super saver',
  'year plus',
  'income fund-gssif'
];

export default function MutualFundScreener() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [fundRows, setFundRows] = useState<FundRow[]>([]);
  const [activeCategory, setActiveCategory] = useState('Top Funds');
  const [sortBy, setSortBy] = useState('threeYearCagr');
  const [search, setSearch] = useState('');
  const [loadingSchemes, setLoadingSchemes] = useState(true);
  const [loadingFunds, setLoadingFunds] = useState(false);
  const [error, setError] = useState('');

  const parseDate = (dateText: string) => {
    const parts = dateText.split('-');
    if (parts.length !== 3) return null;
    const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const formatPercent = (value: number | null) => {
    if (value === null || Number.isNaN(value)) return 'N/A';
    return `${value.toFixed(2)}%`;
  };

  const formatNav = (value: number) => {
    if (!value || Number.isNaN(value)) return 'N/A';
    return `₹${value.toFixed(2)}`;
  };

  const sortLatestFirst = (data: NavPoint[]) => {
    return [...data].sort((a, b) => {
      const aTime = parseDate(a.date)?.getTime() || 0;
      const bTime = parseDate(b.date)?.getTime() || 0;
      return bTime - aTime;
    });
  };

  const isRecent = (date: Date | null) => {
    if (!date) return false;
    const diffDays = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 45;
  };

  const calculateReturn = (data: NavPoint[], daysBack: number, annualized = false) => {
    if (!data.length) return null;

    const latest = data[0];
    const latestDate = parseDate(latest.date);
    const latestNav = Number(latest.nav);

    if (!latestDate || !latestNav) return null;

    const targetDate = new Date(latestDate);
    targetDate.setDate(targetDate.getDate() - daysBack);

    const oldPoint = data.find((point) => {
      const pointDate = parseDate(point.date);
      return pointDate ? pointDate <= targetDate : false;
    });

    if (!oldPoint) return null;

    const oldNav = Number(oldPoint.nav);
    if (!oldNav) return null;

    if (annualized) {
      return (Math.pow(latestNav / oldNav, 365 / daysBack) - 1) * 100;
    }

    return ((latestNav - oldNav) / oldNav) * 100;
  };

  const getCategory = (name: string, apiCategory?: string) => {
    const text = `${name} ${apiCategory || ''}`.toLowerCase();

    if (text.includes('small cap')) return 'Small Cap';
    if (text.includes('mid cap')) return 'Mid Cap';
    if (text.includes('large cap')) return 'Large Cap';
    if (text.includes('flexi cap')) return 'Flexi Cap';
    if (text.includes('elss') || text.includes('tax saver')) return 'ELSS';
    if (text.includes('index') || text.includes('nifty') || text.includes('sensex')) return 'Index';
    if (text.includes('gold')) return 'Gold';
    if (text.includes('liquid') || text.includes('debt') || text.includes('bond') || text.includes('gilt')) return 'Debt';
    if (text.includes('hybrid') || text.includes('balanced')) return 'Hybrid';

    return 'Other';
  };

  const getRisk = (category: string) => {
    if (category === 'Debt') return 'Low to Moderate';
    if (category === 'Hybrid' || category === 'Gold') return 'Moderate';
    if (category === 'Large Cap' || category === 'Index') return 'High';
    return 'Very High';
  };

  const getBestFor = (category: string) => {
    if (category === 'Small Cap') return 'Aggressive long-term investors';
    if (category === 'Mid Cap') return 'High-growth investors';
    if (category === 'Large Cap') return 'Stable equity investors';
    if (category === 'Flexi Cap') return 'Diversified equity investors';
    if (category === 'ELSS') return 'Tax saving under 80C';
    if (category === 'Index') return 'Low-cost passive investing';
    if (category === 'Debt') return 'Low volatility / short-term parking';
    if (category === 'Hybrid') return 'Balanced investors';
    if (category === 'Gold') return 'Portfolio hedge';
    return 'General investors';
  };

  const isUsefulScheme = (name: string) => {
    const text = name.toLowerCase();
    if (!text.includes('direct')) return false;
    if (!text.includes('growth')) return false;
    return !blockedWords.some((word) => text.includes(word));
  };

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setLoadingSchemes(true);
        setError('');

        const cached = sessionStorage.getItem('bs-mf-schemes');
        if (cached) {
          setSchemes(JSON.parse(cached));
          setLoadingSchemes(false);
          return;
        }

        const response = await fetch('https://api.mfapi.in/mf');
        if (!response.ok) throw new Error('Unable to fetch schemes');

        const data: Scheme[] = await response.json();
        sessionStorage.setItem('bs-mf-schemes', JSON.stringify(data));
        setSchemes(data);
      } catch {
        setError('Unable to load mutual fund list. Please try again later.');
      } finally {
        setLoadingSchemes(false);
      }
    };

    fetchSchemes();
  }, []);

  const selectedSchemes = useMemo(() => {
    const query = search.trim().toLowerCase();
    const tabWords = keywords[activeCategory] || [];

    let result = schemes.filter((scheme) => isUsefulScheme(scheme.schemeName));

    if (query) {
      result = result.filter((scheme) =>
        scheme.schemeName.toLowerCase().includes(query)
      );
    } else {
      result = result.filter((scheme) => {
        const name = scheme.schemeName.toLowerCase();
        return tabWords.some((word) => name.includes(word));
      });
    }

    const unique = new Map<string, Scheme>();

    result.forEach((scheme) => {
      const cleanName = scheme.schemeName
        .toLowerCase()
        .replace(/direct/g, '')
        .replace(/growth/g, '')
        .replace(/option/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      if (!unique.has(cleanName)) unique.set(cleanName, scheme);
    });

    return Array.from(unique.values()).slice(0, 15);
  }, [schemes, activeCategory, search]);

  const loadFunds = async () => {
    try {
      setLoadingFunds(true);
      setError('');

      const rows = await Promise.all(
        selectedSchemes.map(async (scheme) => {
          const response = await fetch(`https://api.mfapi.in/mf/${scheme.schemeCode}`);
          if (!response.ok) return null;

          const details: FundDetails = await response.json();
          const sortedData = sortLatestFirst(details.data || []);
          const latest = sortedData[0];

          if (!latest) return null;

          const latestDate = parseDate(latest.date);
          if (!isRecent(latestDate)) return null;

          const latestNav = Number(latest.nav);
          const schemeName = details.meta?.scheme_name || scheme.schemeName;
          const category = getCategory(schemeName, details.meta?.scheme_category);

          if (category === 'Other') return null;

          const oneYearReturn = calculateReturn(sortedData, 365, false);
          const threeYearCagr = calculateReturn(sortedData, 1095, true);
          const fiveYearCagr = calculateReturn(sortedData, 1825, true);

          if (oneYearReturn === null && threeYearCagr === null) return null;

          return {
            schemeCode: scheme.schemeCode,
            schemeName,
            fundHouse: details.meta?.fund_house || 'N/A',
            category,
            risk: getRisk(category),
            latestNav,
            oneYearReturn,
            threeYearCagr,
            fiveYearCagr,
            bestFor: getBestFor(category)
          };
        })
      );

      const cleanRows = (rows.filter(Boolean) as FundRow[]).filter((fund) => {
        const value = fund.threeYearCagr ?? fund.oneYearReturn ?? 0;
        return value > -50 && value < 80;
      });

      setFundRows(cleanRows);
    } catch {
      setError('Unable to fetch fund returns right now. Please try again later.');
    } finally {
      setLoadingFunds(false);
    }
  };

  useEffect(() => {
    if (schemes.length > 0) loadFunds();
  }, [schemes, activeCategory]);

  const filteredRows = useMemo(() => {
    const result = [...fundRows];

    result.sort((a, b) => {
      const aValue = a[sortBy as keyof FundRow];
      const bValue = b[sortBy as keyof FundRow];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return bValue - aValue;
      }

      return 0;
    });

    return result;
  }, [fundRows, sortBy]);

  return (
    <section className="py-16 px-4 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Mutual Fund Screener
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Discover Indian mutual funds by category and compare NAV-based returns.
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
              <p className="text-xs text-slate-500 mt-2">
                Leave blank and use category tabs if you do not know the fund name.
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
              >
                <option value="threeYearCagr">Best 3Y CAGR</option>
                <option value="fiveYearCagr">Best 5Y CAGR</option>
                <option value="oneYearReturn">Best 1Y Return</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              3Y and 5Y returns are shown as annualized CAGR, not total absolute return.
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

        {loadingSchemes || loadingFunds ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
            <p className="font-bold text-slate-700">
              Loading mutual fund data...
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[900px]">
                <thead className="bg-slate-100 text-slate-700 text-xs uppercase">
                  <tr>
                    <th className="p-4">Fund</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Risk</th>
                    <th className="p-4">Latest NAV</th>
                    <th className="p-4">1Y Return</th>
                    <th className="p-4">3Y CAGR</th>
                    <th className="p-4">5Y CAGR</th>
                    <th className="p-4">Best For</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-6 text-center text-slate-500">
                        No suitable active funds found. Try another category.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((fund) => (
                      <tr key={fund.schemeCode} className="hover:bg-slate-50">
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
                        <td className="p-4 font-bold">{formatNav(fund.latestNav)}</td>
                        <td className="p-4 font-semibold">{formatPercent(fund.oneYearReturn)}</td>
                        <td className="p-4 font-bold text-emerald-700">{formatPercent(fund.threeYearCagr)}</td>
                        <td className="p-4 font-bold text-emerald-700">{formatPercent(fund.fiveYearCagr)}</td>
                        <td className="p-4 text-sm text-slate-700">{fund.bestFor}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-900 leading-relaxed">
          <strong>Important:</strong> NAV data is fetched from MFAPI. 3Y and 5Y returns are calculated as CAGR.
          Expense ratio, AUM, holdings, sector allocation and fund manager details are not available from this free NAV API.
          For those fields, you need a professional mutual fund data API or AMC factsheet database.
        </div>
      </div>
    </section>
  );
}
