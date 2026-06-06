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

type ExtraFundInfo = {
  expenseRatio: string;
  aum: string;
  exitLoad: string;
  riskLevel: string;
  fundManager: string;
  topHoldings: string[];
  sectorAllocation: string[];
};

type FundRow = {
  schemeCode: number;
  schemeName: string;
  fundHouse: string;
  category: string;
  latestNav: number;
  latestDate: string;
  oneMonthReturn: number | null;
  sixMonthReturn: number | null;
  oneYearReturn: number | null;
  threeYearReturn: number | null;
  extra: ExtraFundInfo;
};

const manualFundInfo: Record<string, ExtraFundInfo> = {
  default: {
    expenseRatio: 'Check Factsheet',
    aum: 'Check Factsheet',
    exitLoad: 'Check Scheme Document',
    riskLevel: 'Check Riskometer',
    fundManager: 'Check AMC Website',
    topHoldings: ['Available in AMC factsheet'],
    sectorAllocation: ['Available in AMC factsheet']
  },
  hdfc: {
    expenseRatio: 'Factsheet-based',
    aum: 'Factsheet-based',
    exitLoad: 'Check Scheme Document',
    riskLevel: 'High to Very High',
    fundManager: 'Check HDFC MF factsheet',
    topHoldings: ['Banks', 'IT', 'Energy', 'Consumer Stocks'],
    sectorAllocation: ['Financials', 'Technology', 'Energy', 'Consumer']
  },
  sbi: {
    expenseRatio: 'Factsheet-based',
    aum: 'Factsheet-based',
    exitLoad: 'Check Scheme Document',
    riskLevel: 'High to Very High',
    fundManager: 'Check SBI MF factsheet',
    topHoldings: ['Large Cap Stocks', 'Banks', 'Industrials'],
    sectorAllocation: ['Financials', 'Industrials', 'Energy']
  },
  icici: {
    expenseRatio: 'Factsheet-based',
    aum: 'Factsheet-based',
    exitLoad: 'Check Scheme Document',
    riskLevel: 'Moderate to Very High',
    fundManager: 'Check ICICI Prudential MF factsheet',
    topHoldings: ['Banks', 'Auto', 'Telecom', 'Energy'],
    sectorAllocation: ['Financials', 'Auto', 'Telecom', 'Energy']
  },
  parag: {
    expenseRatio: 'Factsheet-based',
    aum: 'Factsheet-based',
    exitLoad: 'Check Scheme Document',
    riskLevel: 'Very High',
    fundManager: 'Check PPFAS factsheet',
    topHoldings: ['Indian Equities', 'Global Equities', 'Cash'],
    sectorAllocation: ['Financials', 'Technology', 'Consumer', 'Global Stocks']
  }
};

export default function MutualFundScreener() {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [fundRows, setFundRows] = useState<FundRow[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('oneYearReturn');
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState('');
  const [expandedFund, setExpandedFund] = useState<number | null>(null);

  const formatPercent = (value: number | null) => {
    if (value === null || Number.isNaN(value)) return 'N/A';
    return `${value.toFixed(2)}%`;
  };

  const formatNav = (value: number) => {
    if (!value || Number.isNaN(value)) return 'N/A';
    return `₹${value.toFixed(2)}`;
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
    if (text.includes('index')) return 'Index';
    if (text.includes('liquid')) return 'Liquid';
    if (text.includes('debt') || text.includes('gilt') || text.includes('bond')) return 'Debt';
    if (text.includes('hybrid') || text.includes('balanced')) return 'Hybrid';
    if (text.includes('gold')) return 'Gold';
    if (text.includes('contra')) return 'Contra';

    return apiCategory || 'Other';
  };

  const getExtraFundInfo = (schemeName: string): ExtraFundInfo => {
    const name = schemeName.toLowerCase();

    if (name.includes('hdfc')) return manualFundInfo.hdfc;
    if (name.includes('sbi')) return manualFundInfo.sbi;
    if (name.includes('icici')) return manualFundInfo.icici;
    if (name.includes('parag') || name.includes('ppfas')) return manualFundInfo.parag;

    return manualFundInfo.default;
  };

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('https://api.mfapi.in/mf');

        if (!response.ok) {
          throw new Error('Unable to fetch mutual fund scheme list');
        }

        const data: Scheme[] = await response.json();
        setSchemes(data.slice(0, 1000));
      } catch (err) {
        setError('Unable to load mutual fund data right now. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  const matchedSchemes = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = schemes;

    if (query) {
      result = result.filter((scheme) =>
        scheme.schemeName.toLowerCase().includes(query)
      );
    }

    return result.slice(0, 25);
  }, [schemes, search]);

  const loadFundDetails = async () => {
    try {
      setLoadingDetails(true);
      setError('');

      const selectedSchemes = matchedSchemes.slice(0, 12);

      const rows = await Promise.all(
        selectedSchemes.map(async (scheme) => {
          const response = await fetch(`https://api.mfapi.in/mf/${scheme.schemeCode}`);

          if (!response.ok) return null;

          const details: FundDetails = await response.json();

          const latest = details.data?.[0];
          const latestNav = Number(latest?.nav || 0);
          const schemeName = details.meta?.scheme_name || scheme.schemeName;

          const row: FundRow = {
            schemeCode: scheme.schemeCode,
            schemeName,
            fundHouse: details.meta?.fund_house || 'N/A',
            category: inferCategory(schemeName, details.meta?.scheme_category),
            latestNav,
            latestDate: latest?.date || 'N/A',
            oneMonthReturn: calculateReturn(details.data, 30),
            sixMonthReturn: calculateReturn(details.data, 180),
            oneYearReturn: calculateReturn(details.data, 365),
            threeYearReturn: calculateReturn(details.data, 1095),
            extra: getExtraFundInfo(schemeName)
          };

          return row;
        })
      );

      setFundRows(rows.filter(Boolean) as FundRow[]);
    } catch (err) {
      setError('Unable to load fund details right now. Please try again later.');
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    if (schemes.length > 0 && fundRows.length === 0) {
      const timer = setTimeout(() => {
        loadFundDetails();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [schemes]);

  const filteredRows = useMemo(() => {
    let result = [...fundRows];

    if (category !== 'All') {
      result = result.filter((fund) => fund.category === category);
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
  }, [fundRows, category, sortBy]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(fundRows.map((fund) => fund.category)));
    return ['All', ...unique.sort()];
  }, [fundRows]);

  return (
    <section className="py-16 px-4 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Mutual Fund Screener
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Search Indian mutual funds using live NAV data, compare recent returns,
            and view additional factsheet-based fund information.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-6">
          <div className="grid lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-bold mb-2">
                Search Mutual Fund
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Example: HDFC, SBI, Parag Parikh, Small Cap"
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
              >
                <option value="oneYearReturn">Best 1Y Return</option>
                <option value="sixMonthReturn">Best 6M Return</option>
                <option value="oneMonthReturn">Best 1M Return</option>
                <option value="threeYearReturn">Best 3Y Return</option>
                <option value="latestNav">Highest NAV</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              NAV and return data are fetched live. Factsheet items need AMC/paid API/manual updates.
            </p>

            <button
              onClick={loadFundDetails}
              disabled={loading || loadingDetails}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold disabled:opacity-60"
            >
              {loadingDetails ? 'Loading Funds...' : 'Refresh Screener'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-4 mb-6 text-sm font-semibold">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
            <p className="font-bold text-slate-700">
              Loading mutual fund scheme list...
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[1300px]">
                <thead className="bg-slate-100 text-slate-700 text-xs uppercase">
                  <tr>
                    <th className="p-4">Fund Name</th>
                    <th className="p-4">Fund House</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Latest NAV</th>
                    <th className="p-4">NAV Date</th>
                    <th className="p-4">1M</th>
                    <th className="p-4">6M</th>
                    <th className="p-4">1Y</th>
                    <th className="p-4">3Y</th>
                    <th className="p-4">Expense Ratio</th>
                    <th className="p-4">AUM</th>
                    <th className="p-4">Risk</th>
                    <th className="p-4">Details</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={13} className="p-6 text-center text-slate-500">
                        No fund data loaded. Search for a fund and click Refresh Screener.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((fund) => (
                      <>
                        <tr key={fund.schemeCode} className="hover:bg-slate-50">
                          <td className="p-4 font-bold text-slate-900 max-w-[320px]">
                            {fund.schemeName}
                          </td>
                          <td className="p-4 text-sm text-slate-700">
                            {fund.fundHouse}
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold">
                              {fund.category}
                            </span>
                          </td>
                          <td className="p-4 font-bold">
                            {formatNav(fund.latestNav)}
                          </td>
                          <td className="p-4 text-sm text-slate-600">
                            {fund.latestDate}
                          </td>
                          <td className="p-4 font-semibold">
                            {formatPercent(fund.oneMonthReturn)}
                          </td>
                          <td className="p-4 font-semibold">
                            {formatPercent(fund.sixMonthReturn)}
                          </td>
                          <td className="p-4 font-bold text-emerald-700">
                            {formatPercent(fund.oneYearReturn)}
                          </td>
                          <td className="p-4 font-bold text-emerald-700">
                            {formatPercent(fund.threeYearReturn)}
                          </td>
                          <td className="p-4 text-sm">
                            {fund.extra.expenseRatio}
                          </td>
                          <td className="p-4 text-sm">
                            {fund.extra.aum}
                          </td>
                          <td className="p-4 text-sm">
                            {fund.extra.riskLevel}
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
                            <td colSpan={13} className="p-5 bg-slate-50">
                              <div className="grid md:grid-cols-3 gap-5">
                                <div className="bg-white border border-slate-200 rounded-xl p-4">
                                  <h4 className="font-bold mb-3">Fund Details</h4>
                                  <p className="text-sm mb-2">
                                    <strong>Fund Manager:</strong> {fund.extra.fundManager}
                                  </p>
                                  <p className="text-sm mb-2">
                                    <strong>Exit Load:</strong> {fund.extra.exitLoad}
                                  </p>
                                  <p className="text-sm">
                                    <strong>Risk Level:</strong> {fund.extra.riskLevel}
                                  </p>
                                </div>

                                <div className="bg-white border border-slate-200 rounded-xl p-4">
                                  <h4 className="font-bold mb-3">Top Holdings</h4>
                                  <ul className="text-sm list-disc list-inside space-y-1">
                                    {fund.extra.topHoldings.map((item) => (
                                      <li key={item}>{item}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="bg-white border border-slate-200 rounded-xl p-4">
                                  <h4 className="font-bold mb-3">Sector Allocation</h4>
                                  <ul className="text-sm list-disc list-inside space-y-1">
                                    {fund.extra.sectorAllocation.map((item) => (
                                      <li key={item}>{item}</li>
                                    ))}
                                  </ul>
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
          <strong>Important:</strong> NAV and return calculations are live from MFAPI.
          Expense ratio, AUM, fund manager, holdings, sector allocation and exit load are factsheet-based/manual fields in this version.
          To make those fields fully live, you will need a paid mutual fund data API or a monthly AMC factsheet update system.
        </div>

        <p className="text-xs text-slate-500 mt-5 leading-relaxed">
          Disclaimer: This tool is for educational purposes only. Returns are calculated from available NAV history and may differ from official fund-house returns due to date availability and calculation method. Please verify scheme documents, riskometer, expense ratio, exit load and factsheet before investing.
        </p>
      </div>
    </section>
  );
}
