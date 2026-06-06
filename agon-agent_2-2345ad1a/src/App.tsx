import React, { useState, useMemo, useEffect } from 'react';
import { brokersData, Broker } from './data/brokers';
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
import { 
  Search, 
  Sparkles, 
  Filter, 
  ArrowLeftRight, 
  X, 
  SlidersHorizontal, 
  Layers, 
  TrendingUp, 
  Award, 
  Coins, 
  Activity,
  LayoutGrid,
  TableProperties,
  BookOpen,
  DollarSign
} from 'lucide-react';

export default function App() {
  // Navigation states
const [activeTab, setActiveTab] = useState<'brokers' | 'compare' | 'finder' | 'calculator' | 'investment' | 'emi' | 'fd' | 'incometax' | 'mutualfund' | 'glossary' | 'blogs'>('brokers');
const [selectedBrokerId, setSelectedBrokerId] = useState<string | null>(null);
const [viewMode, setViewMode] = useState<'table' | 'cards'>('table'); // Default to table for easy comparison format!

  // Comparison list states (up to 3 brokers)
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);

  // Directory filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [amcFilter, setAmcFilter] = useState<'all' | 'zero-amc' | 'paid-amc'>('all');
  const [openingFilter, setOpeningFilter] = useState<'all' | 'zero-opening' | 'paid-opening'>('all'); // Default to all opening charges
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Policy Modal States
  const [showPrivacyModal, setShowPrivacyModal] = useState<boolean>(false);
  const [showTermsModal, setShowTermsModal] = useState<boolean>(false);

  // Affiliate Link Override System
  const [affiliateLinks, setAffiliateLinks] = useState<Record<string, string>>({});

  // Sync custom affiliate links from local storage
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
    
    // Listen for custom update event from AffiliateDashboard
    window.addEventListener('affiliate_links_updated', syncAffiliateLinks);
    return () => {
      window.removeEventListener('affiliate_links_updated', syncAffiliateLinks);
    };
  }, []);

  // Map brokers with custom affiliate links if they exist
  const brokersWithAffiliateLinks = useMemo(() => {
    return brokersData.map(b => {
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

  // Load comparison IDs from localStorage on start
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

  // Save comparison IDs to localStorage when modified
  const handleCompareToggle = (id: string) => {
    let updated: string[];
    if (selectedCompareIds.includes(id)) {
      updated = selectedCompareIds.filter(item => item !== id);
    } else {
      if (selectedCompareIds.length >= 3) return; // Cap at 3
      updated = [...selectedCompareIds, id];
    }
    setSelectedCompareIds(updated);
    localStorage.setItem('selected_compare_ids', JSON.stringify(updated));
  };

  const handleRemoveCompare = (id: string) => {
    const updated = selectedCompareIds.filter(item => item !== id);
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

  // Feature checkbox toggle
  const handleFeatureToggle = (featureKey: string) => {
    if (selectedFeatures.includes(featureKey)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== featureKey));
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

  // Filter brokers based on inputs
  const filteredBrokers = useMemo(() => {
    return brokersWithAffiliateLinks.filter((broker) => {
      // 1. Search filter (name, tagline, target audience, pros/cons)
      const matchesSearch = 
        broker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        broker.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        broker.targetAudience.toLowerCase().includes(searchQuery.toLowerCase()) ||
        broker.pros.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
        broker.cons.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. AMC filter
      const matchesAmc = 
        amcFilter === 'all' || 
        (amcFilter === 'zero-amc' && broker.inactivityFee === 0) ||
        (amcFilter === 'paid-amc' && broker.inactivityFee > 0);

      // 3. Account opening filter
      const matchesOpening = 
        openingFilter === 'all' || 
        (openingFilter === 'zero-opening' && broker.minDeposit === 0) ||
        (openingFilter === 'paid-opening' && broker.minDeposit > 0);

      // 4. Features checklist filter
      const matchesFeatures = selectedFeatures.every((feat) => {
        if (feat === 'fractional') return broker.features.fractionalShares; 
        if (feat === 'paper') return broker.features.paperTrading;
        if (feat === 'robo') return broker.features.roboAdvisor; // Direct MF
        if (feat === 'api') return broker.features.apiTrading;
        if (feat === 'charting') return broker.features.researchTools === 'Advanced';
        return true;
      });

      return matchesSearch && matchesAmc && matchesOpening && matchesFeatures;
    });
  }, [brokersWithAffiliateLinks, searchQuery, amcFilter, openingFilter, selectedFeatures]);

  // Find currently selected broker object
  const selectedBroker = useMemo(() => {
    return brokersWithAffiliateLinks.find(b => b.id === selectedBrokerId) || null;
  }, [brokersWithAffiliateLinks, selectedBrokerId]);

  const handlePopularCompare = (id1: string, id2: string) => {
    const updated = [id1, id2];
    setSelectedCompareIds(updated);
    localStorage.setItem('selected_compare_ids', JSON.stringify(updated));
    setActiveTab('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col transition-colors duration-300">
      {/* 1. Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedBrokerId(null); // Clear selected broker detail view when changing tab
        }} 
        onBackToBrokers={() => setSelectedBrokerId(null)}
        compareCount={selectedCompareIds.length}
      />

      {/* 3. Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* If a specific broker detail page is open, render that regardless of tab */}
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
            {/* TAB 1: BROKER DIRECTORY */}
            {activeTab === 'brokers' && (
              <div className="space-y-8">
                {/* Hero Banner Section */}
                <div className="text-center max-w-3xl mx-auto space-y-4 py-4">
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                    Find Your Perfect <span className="text-emerald-600">Trading Platform</span>
                  </h1>
                  <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                    Compare commissions, intraday brokerage, AMC charges, margin rates, and technical tools for top-tier Indian brokers. Filter by your trading style or use our interactive matching tools.
                  </p>
                </div>

                {/* Quick Stats Banner */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
                  {[
                    { label: 'Top-Tier Brokers', value: `${brokersWithAffiliateLinks.length} Platforms`, icon: Layers, color: 'text-blue-500 bg-blue-50' },
                    { label: 'Cheapest Brokerage', value: 'Flat ₹10 - ₹20/trade', icon: Coins, color: 'text-emerald-500 bg-emerald-50' },
                    { label: 'Zero AMC Accounts', value: 'Dhan, Groww, Fyers, Kotak', icon: Award, color: 'text-amber-500 bg-amber-50' }
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className="flex items-center gap-3 justify-center md:justify-start">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${stat.color}`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">{stat.label}</span>
                          <span className="font-bold text-slate-800 text-sm">{stat.value}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Popular Head-to-Head Comparisons */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Popular Head-to-Head Comparisons</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        title: 'Zerodha vs Groww',
                        desc: 'Discount Pioneer vs Modern Beginner App',
                        id1: 'zerodha',
                        id2: 'groww',
                        color: 'from-[#387ed1]/10 to-[#00d09c]/10 hover:from-[#387ed1]/20 hover:to-[#00d09c]/20 border-[#387ed1]/20'
                      },
                      {
                        title: 'Dhan vs Angel One',
                        desc: 'Super Trading Terminal vs Research & Advisory',
                        id1: 'dhan',
                        id2: 'angelone',
                        color: 'from-[#ffe600]/10 to-[#0f348c]/10 hover:from-[#ffe600]/20 hover:to-[#0f348c]/20 border-[#ffe600]/20'
                      },
                      {
                        title: 'Upstox vs HDFC Sky',
                        desc: 'Tata-Backed Tech Charts vs Bank-Grade Security',
                        id1: 'upstox',
                        id2: 'hdfcsky',
                        color: 'from-[#3f165a]/10 to-[#0c2340]/10 hover:from-[#3f165a]/20 hover:to-[#0c2340]/20 border-[#3f165a]/20'
                      }
                    ].map((comp, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePopularCompare(comp.id1, comp.id2)}
                        className="p-4 border border-slate-200 rounded-xl text-left bg-gradient-to-br transition-all duration-300 cursor-pointer group flex flex-col justify-between h-full hover:scale-[1.01] hover:shadow-sm"
                      >
                        <div>
                          <span className="font-extrabold text-slate-800 text-sm group-hover:text-emerald-600 transition-colors block">
                            {comp.title}
                          </span>
                          <span className="text-slate-400 text-[11px] font-medium block mt-1">
                            {comp.desc}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Compare side-by-side →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search & Filters Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Left Sidebar Filters (Desktop) - Hidden if Table View is active for full width comparison */}
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

                        {/* AMC Filter */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Annual Maintenance (AMC)</label>
                          <div className="space-y-1.5">
                            {[
                              { id: 'all', label: 'All AMC Charges' },
                              { id: 'zero-amc', label: 'Zero AMC Only' },
                              { id: 'paid-amc', label: 'Paid AMC Charges' }
                            ].map((opt) => (
                              <button
                                key={opt.id}
                                onClick={() => setAmcFilter(opt.id as any)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  amcFilter === opt.id
                                    ? 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Account Opening Filter */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Opening Fee</label>
                          <div className="space-y-1.5">
                            {[
                              { id: 'all', label: 'Any Opening Fee' },
                              { id: 'zero-opening', label: 'Free Account Opening (₹0)' },
                              { id: 'paid-opening', label: 'Paid Account Opening' }
                            ].map((opt) => (
                              <button
                                key={opt.id}
                                onClick={() => setOpeningFilter(opt.id as any)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  openingFilter === opt.id
                                    ? 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-500'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Feature Checkboxes */}
                        <div className="space-y-2.5">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Key Features</label>
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
                                <div className={`w-4.5 h-4.5 rounded border transition-colors flex items-center justify-center shrink-0 ${
                                  isChecked 
                                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                                    : 'border-slate-300 group-hover:border-emerald-500'
                                }`}>
                                  {isChecked && <span className="text-[10px] font-bold">✓</span>}
                                </div>
                                <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-800">
                                  {feat.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Right Content Column (Spans full width if Table View is active) */}
                  <div className={`${viewMode === 'table' ? 'lg:col-span-4' : 'lg:col-span-3'} space-y-6`}>
                    
                    {/* Search bar, filters & View Mode triggers */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                      <div className="relative flex-grow w-full md:max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="text"
                          placeholder="Search brokers by name, target audience, pros, cons..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
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

                      {/* Filter Controls Row (Inline if in Table View) */}
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
                            <option value="zero-opening">Free Opening (₹0)</option>
                            <option value="paid-opening">Paid Account Opening</option>
                          </select>
                        </div>
                      )}

                      <div className="flex items-center gap-3 w-full md:w-auto justify-end shrink-0">
                        {/* Mobile Filter Trigger */}
                        <button
                          onClick={() => setShowMobileFilters(true)}
                          className={`${viewMode === 'table' ? 'md:hidden' : 'lg:hidden'} flex items-center justify-center p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 cursor-pointer`}
                          title="Open Filters"
                        >
                          <Filter size={18} />
                        </button>

                        {/* View Mode Toggle */}
                        <div className="bg-slate-100 p-1 rounded-xl flex border border-slate-200/60">
                          <button
                            onClick={() => setViewMode('table')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                              viewMode === 'table'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                            title="Table Comparison View"
                          >
                            <TableProperties size={13} />
                            Table
                          </button>
                          <button
                            onClick={() => setViewMode('cards')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                              viewMode === 'cards'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                            title="Detail Cards View"
                          >
                            <LayoutGrid size={13} />
                            Cards
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Results Count & Active Tags */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-semibold">
                      <span>Showing {filteredBrokers.length} of {brokersWithAffiliateLinks.length} Platforms</span>
                      
                      {/* Comparison quick link */}
                      {selectedCompareIds.length > 0 && (
                        <button
                          onClick={() => setActiveTab('compare')}
                          className="text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowLeftRight size={13} />
                          Compare selected ({selectedCompareIds.length})
                        </button>
                      )}
                    </div>

                    {/* Main Content Render (Switch Table vs Cards) */}
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
                        <h4 className="font-bold text-slate-800 text-lg mb-1">No Brokers Match Your Criteria</h4>
                        <p className="text-slate-500 text-sm max-w-md mx-auto mb-5">
                          Try adjusting your search query or removing some feature filters to see more platforms.
                        </p>
                        <button
                          onClick={handleResetFilters}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg cursor-pointer transition-colors shadow-sm"
                        >
                          Reset All Filters
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Filters Modal */}
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

                        {/* AMC Filter */}
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Annual Maintenance (AMC)</label>
                          <div className="space-y-1.5">
                            {[
                              { id: 'all', label: 'All AMC Charges' },
                              { id: 'zero-amc', label: 'Zero AMC Only' },
                              { id: 'paid-amc', label: 'Paid AMC Charges' }
                            ].map((opt) => (
                              <button
                                key={opt.id}
                                onClick={() => {
                                  setAmcFilter(opt.id as any);
                                  if (viewMode === 'table') setShowMobileFilters(false);
                                }}
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
                        </div>

                        {/* Account Opening Filter */}
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Account Opening Fee</label>
                          <div className="space-y-1.5">
                            {[
                              { id: 'all', label: 'Any Opening Fee' },
                              { id: 'zero-opening', label: 'Free Opening (₹0)' },
                              { id: 'paid-opening', label: 'Paid Account Opening' }
                            ].map((opt) => (
                              <button
                                key={opt.id}
                                onClick={() => {
                                  setOpeningFilter(opt.id as any);
                                  if (viewMode === 'table') setShowMobileFilters(false);
                                }}
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
                        </div>

                        {/* Feature Checkboxes */}
                        <div className="space-y-2.5">
                          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Key Features</label>
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
                                <div className={`w-4.5 h-4.5 rounded border transition-colors flex items-center justify-center shrink-0 ${
                                  isChecked 
                                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                                    : 'border-slate-300'
                                }`}>
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

                      <div className="space-y-2 pt-6 border-t border-slate-100">
                        <button
                          onClick={handleResetFilters}
                          className="w-full py-2 border border-slate-200 text-slate-600 hover:text-slate-800 font-bold text-xs rounded-lg cursor-pointer"
                        >
                          Reset Filters
                        </button>
                        <button
                          onClick={() => setShowMobileFilters(false)}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg cursor-pointer shadow-sm"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SIDE-BY-SIDE COMPARE MATRIX */}
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

            {/* TAB 3: BROKER FINDER QUIZ */}
            {activeTab === 'finder' && (
              <div className="space-y-6">
                <div className="text-center max-w-3xl mx-auto space-y-2 py-4">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Platform <span className="text-emerald-600">Finder Quiz</span>
                  </h1>
                  <p className="text-slate-500 text-sm">
                    Answer 4 quick questions to find the absolute best broker matching your capital, style, and goal.
                  </p>
                </div>

                <BrokerFinder
                  onSelectBroker={setSelectedBrokerId}
                  onAddToCompare={handleAddCompare}
                  selectedCompareIds={selectedCompareIds}
                />
              </div>
            )}

            {/* TAB 4: FEE ESTIMATOR */}
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
            
            {/* TAB 4B: SIP & LUMPSUM CALCULATOR */}
            {activeTab === 'investment' && (
             <div className="space-y-6">
               <InvestmentCalculator />
              </div>
              )} 

           {/* TAB: EMI CALCULATOR */}
           {activeTab === 'emi' && (
            <div className="space-y-6">
              <EmiCalculator />
            </div>
           )}

           {/* TAB: FD CALCULATOR */}
           {activeTab === 'fd' && (
             <div className="space-y-6">
              <FdCalculator />
            </div>
            )}

            {/* TAB: INCOME TAX CALCULATOR */}
            {activeTab === 'incometax' && (
             <div className="space-y-6">
              <IncomeTaxCalculator />
            </div>
            )}

            {activeTab === 'mutualfund' && (
             <div className="space-y-6">
              <MutualFundScreener />
           </div>
            )}
            
            {/* TAB 5: TRADING GLOSSARY */}
            {activeTab === 'glossary' && (
              <div className="space-y-6">
                <div className="text-center max-w-3xl mx-auto space-y-2 py-4">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Equities & Brokerage <span className="text-emerald-600">Glossary</span>
                  </h1>
                  <p className="text-slate-500 text-sm">
                    Learn about Indian stock market terms, rules, and fees like Demat DP charges, MTF leverage, AMC, and SEBI regulations.
                  </p>
                </div>

                <Glossary />
              </div>
            )}

            {/* TAB 6: TRADING GUIDES & BLOGS */}
            {activeTab === 'blogs' && (
              <div className="space-y-6">
                <div className="text-center max-w-3xl mx-auto space-y-2 py-4">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
                    Trading Guides & <span className="text-emerald-600">Blogs</span>
                  </h1>
                  <p className="text-slate-500 text-sm">
                    Read high-quality articles, trading strategies, and guides to help you navigate the Indian stock markets.
                  </p>
                </div>

                <BlogHub onSelectBroker={setSelectedBrokerId} />
              </div>
            )}
          </>
        )}
      </main>

      {/* 4. Footer Section */}
      <Footer 
        onOpenPrivacy={() => setShowPrivacyModal(true)} 
        onOpenTerms={() => setShowTermsModal(true)} 
      />

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 md:p-8 space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-slate-900 border-b pb-2">Privacy Policy</h3>
            <p className="text-xs text-slate-500">Last updated: February 2025</p>
            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              <p className="font-bold text-sm text-slate-800">1. Information We Collect</p>
              <p>
                BrokerSphere operates as an informational directory and comparison tool. We do not collect, store, or transmit any personally identifiable financial information. Any user-submitted reviews (such as your name and trading style) are saved strictly inside your own browser's local storage and are never uploaded to our servers.
              </p>
              <p className="font-bold text-sm text-slate-800">2. Cookies and Local Storage</p>
              <p>
                We use standard browser Local Storage to save your theme preferences (Dark/Light mode) and your selected comparison lists so you don't lose them when you refresh the page. We do not track your browsing history across third-party websites.
              </p>
              <p className="font-bold text-sm text-slate-800">3. Third-Party Links</p>
              <p>
                Our directory contains links to official account opening pages of SEBI-registered stockbrokers (such as Zerodha, Groww, Angel One, and Dhan). Once you click these links and navigate to their platforms, you are governed by their respective privacy policies. We encourage you to read their security guidelines before submitting documents.
              </p>
              <p className="font-bold text-sm text-slate-800">4. Children's Privacy</p>
              <p>
                Our platform is intended strictly for individuals above the age of 18 who are eligible to open demat accounts in India. We do not knowingly collect or target information from minors.
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

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 md:p-8 space-y-4 shadow-2xl relative">
            <button 
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-slate-900 border-b pb-2">Terms of Service</h3>
            <p className="text-xs text-slate-500">Last updated: February 2025</p>
            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              <p className="font-bold text-sm text-slate-800">1. Disclaimer of Financial Advice</p>
              <p>
                The information provided on BrokerSphere is for educational and general comparison purposes only. We are not a SEBI-registered investment advisor or stockbroker. Stock trading, options, and derivatives carry significant market risk. Please perform your own due diligence or consult a certified financial planner before making investment decisions.
              </p>
              <p className="font-bold text-sm text-slate-800">2. Accuracy of Broker Specifications</p>
              <p>
                While we make every attempt to ensure that broker fees, AMC, DP charges, and MTF interest rates are completely accurate and up-to-date, brokers frequently modify their pricing structures. We cannot be held liable for any typographical errors or outdated pricing. Always verify the current tariff sheet on the broker's official website before funding your trading account.
              </p>
              <p className="font-bold text-sm text-slate-800">3. User Reviews Conduct</p>
              <p>
                When submitting reviews, you agree to post honest, non-abusive, and non-promotional feedback based on your actual experience with the platform. We reserve the right to moderate and delete any reviews containing spam, promotional links, or vulgar language.
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
