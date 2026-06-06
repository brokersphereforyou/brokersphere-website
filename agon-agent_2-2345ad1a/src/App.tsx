import React, { useState, useMemo, useEffect } from 'react';
import { brokersData } from './data/brokers';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BrokerCard } from './components/BrokerCard';
import { CompareMatrix } from './components/CompareMatrix';
import { BrokerFinder } from './components/BrokerFinder';
import { FeeCalculator } from './components/FeeCalculator';
import { Glossary } from './components/Glossary';
import { BrokerDetail } from './components/BrokerDetail';
import { DirectoryTable } from './components/DirectoryTable';
import { BlogHub } from './components/BlogHub';
import InvestmentCalculator from './components/InvestmentCalculator';
import EmiCalculator from './components/EmiCalculator';
import FdCalculator from './components/FdCalculator';
import IncomeTaxCalculator from './components/IncomeTaxCalculator';
import MutualFundScreener from './components/MutualFundScreener';
import CryptoComparison from './components/CryptoComparison';
import {
  Search,
  Filter,
  ArrowLeftRight,
  X,
  SlidersHorizontal,
  Layers,
  Award,
  Coins,
  LayoutGrid,
  TableProperties
} from 'lucide-react';

type ActiveTab =
  | 'brokers'
  | 'compare'
  | 'finder'
  | 'calculator'
  | 'investment'
  | 'emi'
  | 'fd'
  | 'incometax'
  | 'crypto'
  | 'mutualfund'
  | 'glossary'
  | 'blogs';

const tabToPath: Record<ActiveTab, string> = {
  brokers: '/',
  compare: '/compare',
  finder: '/broker-finder',
  calculator: '/brokerage-calculator',
  investment: '/sip-calculator',
  emi: '/emi-calculator',
  fd: '/fd-calculator',
  incometax: '/income-tax-calculator',
  crypto: '/crypto-exchange-comparison',
  mutualfund: '/mutual-fund-screener',
  glossary: '/glossary',
  blogs: '/blogs'
};

const pathToTab: Record<string, ActiveTab> = {
  '/': 'brokers',
  '/compare': 'compare',
  '/broker-finder': 'finder',
  '/brokerage-calculator': 'calculator',
  '/sip-calculator': 'investment',
  '/emi-calculator': 'emi',
  '/fd-calculator': 'fd',
  '/income-tax-calculator': 'incometax',
  '/crypto-exchange-comparison': 'crypto',
  '/mutual-fund-screener': 'mutualfund',
  '/glossary': 'glossary',
  '/blogs': 'blogs'
};

const getInitialTab = (): ActiveTab => {
  return pathToTab[window.location.pathname] || 'brokers';
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(getInitialTab());
  const [selectedBrokerId, setSelectedBrokerId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [amcFilter, setAmcFilter] = useState<'all' | 'zero-amc' | 'paid-amc'>('all');
  const [openingFilter, setOpeningFilter] = useState<'all' | 'zero-opening' | 'paid-opening'>('all');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);
  const [affiliateLinks, setAffiliateLinks] = useState<Record<string, string>>({});

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setSelectedBrokerId(null);

    const newPath = tabToPath[tab];

    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const tab = pathToTab[window.location.pathname] || 'brokers';
      setActiveTab(tab);
      setSelectedBrokerId(null);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const syncAffiliateLinks = () => {
    const saved = localStorage.getItem('broker_affiliate_links');

    if (saved) {
      try {
        setAffiliateLinks(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    syncAffiliateLinks();
    window.addEventListener('affiliate_links_updated', syncAffiliateLinks);

    return () => {
      window.removeEventListener('affiliate_links_updated', syncAffiliateLinks);
    };
  }, []);

  const brokersWithAffiliateLinks = useMemo(() => {
    return brokersData.map((b) => {
      const customUrl = affiliateLinks[b.id];

      if (customUrl && customUrl.trim() !== '') {
        return {
          ...b,
          accountOpeningUrl: customUrl
        };
      }

      return b;
    });
  }, [affiliateLinks]);

  useEffect(() => {
    const stored = localStorage.getItem('selected_compare_ids');

    if (stored) {
      try {
        setSelectedCompareIds(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleCompareToggle = (id: string) => {
    let updated: string[];

    if (selectedCompareIds.includes(id)) {
      updated = selectedCompareIds.filter((item) => item !== id);
    } else {
      if (selectedCompareIds.length >= 3) return;
      updated = [...selectedCompareIds, id];
    }

    setSelectedCompareIds(updated);
    localStorage.setItem('selected_compare_ids', JSON.stringify(updated));
  };

  const handleRemoveCompare = (id: string) => {
    const updated = selectedCompareIds.filter((item) => item !== id);
    setSelectedCompareIds(updated);
    localStorage.setItem('selected_compare_ids', JSON.stringify(updated));
  };

  const handleClearCompare = () => {
    setSelectedCompareIds([]);
    localStorage.setItem('selected_compare_ids', JSON.stringify([]));
  };

  const handleAddCompare = (id: string) => {
    if (selectedCompareIds.length >= 3) return;
    if (selectedCompareIds.includes(id)) return;

    const updated = [...selectedCompareIds, id];
    setSelectedCompareIds(updated);
    localStorage.setItem('selected_compare_ids', JSON.stringify(updated));
  };

  const handleFeatureToggle = (featureKey: string) => {
    if (selectedFeatures.includes(featureKey)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== featureKey));
    } else {
      setSelectedFeatures([...selectedFeatures, featureKey]);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setAmcFilter('all');
    setOpeningFilter('all');
    setSelectedFeatures([]);
  };

  const filteredBrokers = useMemo(() => {
    return brokersWithAffiliateLinks.filter((broker) => {
      const matchesSearch =
        broker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        broker.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        broker.targetAudience.toLowerCase().includes(searchQuery.toLowerCase()) ||
        broker.pros.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
        broker.cons.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesAmc =
        amcFilter === 'all' ||
        (amcFilter === 'zero-amc' && broker.inactivityFee === 0) ||
        (amcFilter === 'paid-amc' && broker.inactivityFee > 0);

      const matchesOpening =
        openingFilter === 'all' ||
        (openingFilter === 'zero-opening' && broker.minDeposit === 0) ||
        (openingFilter === 'paid-opening' && broker.minDeposit > 0);

      const matchesFeatures = selectedFeatures.every((feat) => {
        if (feat === 'fractional') return broker.features.fractionalShares;
        if (feat === 'paper') return broker.features.paperTrading;
        if (feat === 'robo') return broker.features.roboAdvisor;
        if (feat === 'api') return broker.features.apiTrading;
        if (feat === 'charting') return broker.features.researchTools === 'Advanced';
        return true;
      });

      return matchesSearch && matchesAmc && matchesOpening && matchesFeatures;
    });
  }, [brokersWithAffiliateLinks, searchQuery, amcFilter, openingFilter, selectedFeatures]);

  const selectedBroker = useMemo(() => {
    return brokersWithAffiliateLinks.find((b) => b.id === selectedBrokerId) || null;
  }, [brokersWithAffiliateLinks, selectedBrokerId]);

  const handlePopularCompare = (id1: string, id2: string) => {
    const updated = [id1, id2];
    setSelectedCompareIds(updated);
    localStorage.setItem('selected_compare_ids', JSON.stringify(updated));
    handleTabChange('compare');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col transition-colors duration-300">
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onBackToBrokers={() => setSelectedBrokerId(null)}
        compareCount={selectedCompareIds.length}
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedBroker ? (
          <BrokerDetail
            broker={selectedBroker}
            onBack={() => setSelectedBrokerId(null)}
            onAddToCompare={handleCompareToggle}
            isComparing={selectedCompareIds.includes(selectedBroker.id)}
            compareCount={selectedCompareIds.length}
          />
        ) : (
          <>
            {activeTab === 'brokers' && (
              <div className="space-y-8">
                <div className="text-center max-w-3xl mx-auto space-y-4 py-4">
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                    Find Your Perfect <span className="text-emerald-600">Trading Platform</span>
                  </h1>

                  <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                    Compare commissions, intraday brokerage, AMC charges, margin rates, and technical tools for top-tier Indian brokers.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                  {[
                    {
                      label: 'Top-Tier Brokers',
                      value: `${brokersWithAffiliateLinks.length} Platforms`,
                      icon: Layers,
                      color: 'text-blue-500 bg-blue-50'
                    },
                    {
                      label: 'Cheapest Brokerage',
                      value: 'Flat ₹10 - ₹20/trade',
                      icon: Coins,
                      color: 'text-emerald-500 bg-emerald-50'
                    },
                    {
                      label: 'Zero AMC Accounts',
                      value: 'Dhan, Groww, Fyers, Kotak',
                      icon: Award,
                      color: 'text-amber-500 bg-amber-50'
                    }
                  ].map((stat, idx) => {
                    const Icon = stat.icon;

                    return (
                      <div key={idx} className="flex items-center gap-3 justify-center md:justify-start">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${stat.color}`}>
                          <Icon size={18} />
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                            {stat.label}
                          </span>
                          <span className="font-bold text-slate-800 text-sm">
                            {stat.value}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Popular Head-to-Head Comparisons
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        title: 'Zerodha vs Groww',
                        desc: 'Discount Pioneer vs Modern Beginner App',
                        id1: 'zerodha',
                        id2: 'groww'
                      },
                      {
                        title: 'Dhan vs Angel One',
                        desc: 'Super Trading Terminal vs Research & Advisory',
                        id1: 'dhan',
                        id2: 'angelone'
                      },
                      {
                        title: 'Upstox vs HDFC Sky',
                        desc: 'Tata-Backed Tech Charts vs Bank-Grade Security',
                        id1: 'upstox',
                        id2: 'hdfcsky'
                      }
                    ].map((comp, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePopularCompare(comp.id1, comp.id2)}
                        className="p-4 border border-slate-200 rounded-xl text-left bg-white transition-all duration-300 cursor-pointer group hover:scale-[1.01] hover:shadow-sm"
                      >
                        <span className="font-extrabold text-slate-800 text-sm group-hover:text-emerald-600 transition-colors block">
                          {comp.title}
                        </span>

                        <span className="text-slate-400 text-[11px] font-medium block mt-1">
                          {comp.desc}
                        </span>

                        <span className="text-[10px] font-bold text-emerald-600 mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Compare side-by-side →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {viewMode === 'cards' && (
                    <div className="hidden lg:block space-y-6">
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <span className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                            <SlidersHorizontal size={15} />
                            Filter Platforms
                          </span>

                          {(searchQuery || amcFilter !== 'all' || openingFilter !== 'all' || selectedFeatures.length > 0) && (
                            <button
                              onClick={handleResetFilters}
                              className="text-xs text-emerald-600 font-bold hover:underline cursor-pointer"
                            >
                              Reset All
                            </button>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Annual Maintenance
                          </label>

                          {[
                            { id: 'all', label: 'All AMC Charges' },
                            { id: 'zero-amc', label: 'Zero AMC Only' },
                            { id: 'paid-amc', label: 'Paid AMC Charges' }
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => setAmcFilter(opt.id as any)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold cursor-pointer ${
                                amcFilter === opt.id
                                  ? 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500'
                                  : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Account Opening Fee
                          </label>

                          {[
                            { id: 'all', label: 'Any Opening Fee' },
                            { id: 'zero-opening', label: 'Free Account Opening' },
                            { id: 'paid-opening', label: 'Paid Account Opening' }
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => setOpeningFilter(opt.id as any)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold cursor-pointer ${
                                openingFilter === opt.id
                                  ? 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500'
                                  : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>

                        <div className="space-y-2.5">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            Key Features
                          </label>

                          {[
                            { key: 'paper', label: 'Paper Trading' },
                            { key: 'robo', label: 'Direct Mutual Funds' },
                            { key: 'api', label: 'Free API Access' },
                            { key: 'charting', label: 'Advanced Charting' }
                          ].map((feat) => {
                            const isChecked = selectedFeatures.includes(feat.key);

                            return (
                              <button
                                key={feat.key}
                                onClick={() => handleFeatureToggle(feat.key)}
                                className="flex items-center gap-2 w-full text-left cursor-pointer group"
                              >
                                <div
                                  className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 ${
                                    isChecked
                                      ? 'bg-emerald-500 border-emerald-500 text-white'
                                      : 'border-slate-300'
                                  }`}
                                >
                                  {isChecked && <span className="text-[10px] font-bold">✓</span>}
                                </div>

                                <span className="text-xs font-semibold text-slate-600">
                                  {feat.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={`${viewMode === 'table' ? 'lg:col-span-4' : 'lg:col-span-3'} space-y-6`}>
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                      <div className="relative flex-grow w-full md:max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                        <input
                          type="text"
                          placeholder="Search brokers..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800"
                        />

                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            <X size={15} />
                          </button>
                        )}
                      </div>

                      {viewMode === 'table' && (
                        <div className="hidden md:flex flex-wrap items-center gap-2.5">
                          <select
                            value={amcFilter}
                            onChange={(e) => setAmcFilter(e.target.value as any)}
                            className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold px-3 py-2 rounded-lg cursor-pointer"
                          >
                            <option value="all">All AMC Charges</option>
                            <option value="zero-amc">Zero AMC Only</option>
                            <option value="paid-amc">Paid AMC Charges</option>
                          </select>

                          <select
                            value={openingFilter}
                            onChange={(e) => setOpeningFilter(e.target.value as any)}
                            className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold px-3 py-2 rounded-lg cursor-pointer"
                          >
                            <option value="all">Any Opening Fee</option>
                            <option value="zero-opening">Free Opening</option>
                            <option value="paid-opening">Paid Opening</option>
                          </select>
                        </div>
                      )}

                      <div className="flex items-center gap-3 w-full md:w-auto justify-end shrink-0">
                        <button
                          onClick={() => setShowMobileFilters(true)}
                          className={`${viewMode === 'table' ? 'md:hidden' : 'lg:hidden'} flex items-center justify-center p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 cursor-pointer`}
                        >
                          <Filter size={18} />
                        </button>

                        <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200/60">
                          <button
                            onClick={() => setViewMode('table')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                              viewMode === 'table'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'text-slate-500'
                            }`}
                          >
                            <TableProperties size={13} />
                            Table
                          </button>

                          <button
                            onClick={() => setViewMode('cards')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer ${
                              viewMode === 'cards'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'text-slate-500'
                            }`}
                          >
                            <LayoutGrid size={13} />
                            Cards
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-semibold">
                      <span>
                        Showing {filteredBrokers.length} of {brokersWithAffiliateLinks.length} Platforms
                      </span>

                      {selectedCompareIds.length > 0 && (
                        <button
                          onClick={() => handleTabChange('compare')}
                          className="text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowLeftRight size={13} />
                          Compare selected ({selectedCompareIds.length})
                        </button>
                      )}
                    </div>

                    {filteredBrokers.length > 0 ? (
                      viewMode === 'table' ? (
                        <DirectoryTable
                          brokers={filteredBrokers}
                          onSelect={setSelectedBrokerId}
                          onCompareToggle={handleCompareToggle}
                          selectedCompareIds={selectedCompareIds}
                        />
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {filteredBrokers.map((broker) => (
                            <BrokerCard
                              key={broker.id}
                              broker={broker}
                              onSelect={setSelectedBrokerId}
                              onCompareToggle={handleCompareToggle}
                              isComparing={selectedCompareIds.includes(broker.id)}
                              compareCount={selectedCompareIds.length}
                            />
                          ))}
                        </div>
                      )
                    ) : (
                      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
                        <SlidersHorizontal size={40} className="text-slate-300 mx-auto mb-4" />

                        <h4 className="font-bold text-slate-800 text-lg mb-1">
                          No Brokers Match Your Criteria
                        </h4>

                        <button
                          onClick={handleResetFilters}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg cursor-pointer"
                        >
                          Reset All Filters
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {showMobileFilters && (
                  <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
                    <div className="w-full max-w-xs bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <span className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                            <SlidersHorizontal size={15} />
                            Filter Platforms
                          </span>

                          <button
                            onClick={() => setShowMobileFilters(false)}
                            className="text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            <X size={18} />
                          </button>
                        </div>

                        <button
                          onClick={handleResetFilters}
                          className="w-full py-2 border border-slate-200 text-slate-600 font-bold text-xs rounded-lg"
                        >
                          Reset Filters
                        </button>

                        <button
                          onClick={() => setShowMobileFilters(false)}
                          className="w-full py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'compare' && (
              <div className="space-y-6">
                <div className="text-center max-w-3xl mx-auto space-y-2 py-4">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Broker Comparison <span className="text-emerald-600">Matrix</span>
                  </h1>

                  <p className="text-slate-500 text-sm">
                    Analyze key commissions, features, and account parameters across up to three platforms side-by-side.
                  </p>
                </div>

                <CompareMatrix
                  selectedIds={selectedCompareIds}
                  onRemove={handleRemoveCompare}
                  onAdd={handleAddCompare}
                  onClear={handleClearCompare}
                  onSelectBroker={setSelectedBrokerId}
                />
              </div>
            )}

            {activeTab === 'finder' && (
              <div className="space-y-6">
                <div className="text-center max-w-3xl mx-auto space-y-2 py-4">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Platform <span className="text-emerald-600">Finder Quiz</span>
                  </h1>

                  <p className="text-slate-500 text-sm">
                    Answer 4 quick questions to find the best broker matching your capital, style, and goal.
                  </p>
                </div>

                <BrokerFinder
                  onSelectBroker={setSelectedBrokerId}
                  onAddToCompare={handleAddCompare}
                  selectedCompareIds={selectedCompareIds}
                />
              </div>
            )}

            {activeTab === 'calculator' && (
              <div className="space-y-6">
                <div className="text-center max-w-3xl mx-auto space-y-2 py-4">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Annual Fee <span className="text-emerald-600">Estimator</span>
                  </h1>

                  <p className="text-slate-500 text-sm">
                    Input your anticipated trading frequency and margin balance to estimate real annual platform fees.
                  </p>
                </div>

                <FeeCalculator />
              </div>
            )}

            {activeTab === 'investment' && (
              <div className="space-y-6">
                <InvestmentCalculator />
              </div>
            )}

            {activeTab === 'emi' && (
              <div className="space-y-6">
                <EmiCalculator />
              </div>
            )}

            {activeTab === 'fd' && (
              <div className="space-y-6">
                <FdCalculator />
              </div>
            )}

            {activeTab === 'incometax' && (
              <div className="space-y-6">
                <IncomeTaxCalculator />
              </div>
            )}

            {activeTab === 'crypto' && (
              <div className="space-y-6">
                <CryptoComparison />
              </div>
            )}

            {activeTab === 'mutualfund' && (
              <div className="space-y-6">
                <MutualFundScreener />
              </div>
            )}

            {activeTab === 'glossary' && (
              <div className="space-y-6">
                <div className="text-center max-w-3xl mx-auto space-y-2 py-4">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Equities & Brokerage <span className="text-emerald-600">Glossary</span>
                  </h1>

                  <p className="text-slate-500 text-sm">
                    Learn about Indian stock market terms, rules, and fees.
                  </p>
                </div>

                <Glossary />
              </div>
            )}

            {activeTab === 'blogs' && (
              <div className="space-y-6">
                <div className="text-center max-w-3xl mx-auto space-y-2 py-4">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Trading Guides & <span className="text-emerald-600">Blogs</span>
                  </h1>

                  <p className="text-slate-500 text-sm">
                    Read high-quality articles, trading strategies, and guides to help you navigate Indian stock markets.
                  </p>
                </div>

                <BlogHub onSelectBroker={setSelectedBrokerId} />
              </div>
            )}
          </>
        )}
      </main>

      <Footer
        onOpenPrivacy={() => setShowPrivacyModal(true)}
        onOpenTerms={() => setShowTermsModal(true)}
      />

      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 md:p-8 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-slate-900 border-b pb-2">
              Privacy Policy
            </h3>

            <p className="text-xs text-slate-500">Last updated: February 2025</p>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              <p className="font-bold text-sm text-slate-800">
                1. Information We Collect
              </p>

              <p>
                BrokerSphere operates as an informational directory and comparison tool. We do not collect, store, or transmit personally identifiable financial information.
              </p>

              <p className="font-bold text-sm text-slate-800">
                2. Cookies and Local Storage
              </p>

              <p>
                We use browser Local Storage to save theme preferences and comparison lists.
              </p>

              <p className="font-bold text-sm text-slate-800">
                3. Third-Party Links
              </p>

              <p>
                Our directory contains links to official broker websites. Once you leave BrokerSphere, you are governed by their policies.
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg cursor-pointer shadow-sm"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 md:p-8 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-slate-900 border-b pb-2">
              Terms of Service
            </h3>

            <p className="text-xs text-slate-500">Last updated: February 2025</p>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              <p className="font-bold text-sm text-slate-800">
                1. Disclaimer of Financial Advice
              </p>

              <p>
                BrokerSphere is for educational and comparison purposes only. We are not a SEBI-registered investment advisor or stockbroker.
              </p>

              <p className="font-bold text-sm text-slate-800">
                2. Accuracy of Broker Specifications
              </p>

              <p>
                Broker fees and charges may change. Always verify details on the broker’s official website.
              </p>

              <p className="font-bold text-sm text-slate-800">
                3. User Reviews Conduct
              </p>

              <p>
                Reviews should be honest, non-abusive and non-promotional.
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg cursor-pointer shadow-sm"
              >
                Accept & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
