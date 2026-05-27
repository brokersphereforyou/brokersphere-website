import React, { useState } from 'react';
import { Broker, brokersData } from '../data/brokers';
import { BrokerLogo } from './BrokerLogo';
import { Check, X, Star, Sparkles, HelpCircle, ArrowLeftRight, Trash2, Plus } from 'lucide-react';

interface CompareMatrixProps {
  selectedIds: string[];
  onRemove: (id: string) => void;
  onAdd: (id: string) => void;
  onClear: () => void;
  onSelectBroker: (id: string) => void;
}

export const CompareMatrix: React.FC<CompareMatrixProps> = ({
  selectedIds,
  onRemove,
  onAdd,
  onClear,
  onSelectBroker
}) => {
  const [activeSection, setActiveSection] = useState<'all' | 'basic' | 'fees' | 'features' | 'products'>('all');

  const selectedBrokers = brokersData.filter(b => selectedIds.includes(b.id));
  const availableBrokers = brokersData.filter(b => !selectedIds.includes(b.id));

  // Render rating stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1 justify-center">
        <Star size={14} className="fill-amber-400 text-amber-400" />
        <span className="font-bold text-slate-800 dark:text-white text-sm">{rating}</span>
      </div>
    );
  };

  const renderBoolean = (val: boolean) => {
    return val ? (
      <div className="flex justify-center">
        <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
          <Check size={14} className="stroke-[3]" />
        </div>
      </div>
    ) : (
      <div className="flex justify-center">
        <div className="w-6 h-6 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-500 border border-rose-100 dark:border-rose-900/30">
          <X size={14} className="stroke-[3]" />
        </div>
      </div>
    );
  };

  const renderTextBadge = (text: string, style: 'green' | 'blue' | 'purple' | 'gray') => {
    const styles = {
      green: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30',
      blue: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/30',
      purple: 'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-900/30',
      gray: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold border ${styles[style]}`}>
        {text}
      </span>
    );
  };

  // If no brokers are selected
  if (selectedBrokers.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center max-w-3xl mx-auto shadow-sm">
        <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-100 dark:border-emerald-900/30">
          <ArrowLeftRight size={28} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Compare Trading Platforms Side-by-Side</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto mb-6">
          Select up to 3 brokers to compare their commissions, margin rates, investment products, research tools, and more side-by-side.
        </p>

        <div className="space-y-4">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">Choose Brokers to Add</span>
          <div className="flex flex-wrap justify-center gap-2.5">
            {brokersData.map((b) => (
              <button
                key={b.id}
                onClick={() => onAdd(b.id)}
                className="px-4 py-2 bg-slate-50 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-slate-800/80 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              >
                <BrokerLogo id={b.id} className="w-5 h-5" />
                {b.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selection Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row gap-5 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
            <ArrowLeftRight size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white text-base">Comparing {selectedBrokers.length} of 3 platforms</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Add more or swap platforms to refine your decision.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Selected Badges */}
          <div className="flex flex-wrap gap-2 mr-2">
            {selectedBrokers.map(b => (
              <div key={b.id} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                <BrokerLogo id={b.id} className="w-4 h-4" />
                {b.name.split(' ')[0]}
                <button 
                  onClick={() => onRemove(b.id)}
                  className="text-slate-400 hover:text-rose-500 cursor-pointer transition-colors ml-1"
                  title="Remove broker"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>

          {/* Add Dropdown or Quick Add buttons */}
          {selectedBrokers.length < 3 && availableBrokers.length > 0 && (
            <div className="relative">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    onAdd(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3 py-2 rounded-lg border-none cursor-pointer outline-none shadow-sm transition-all"
              >
                <option value="" className="text-slate-800 dark:text-white bg-white dark:bg-slate-900">Add Broker...</option>
                {availableBrokers.map(b => (
                  <option 
                    key={b.id} 
                    value={b.id} 
                    className="text-slate-800 dark:text-white bg-white dark:bg-slate-900"
                  >
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedBrokers.length > 0 && (
            <button
              onClick={onClear}
              className="px-3 py-2 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1"
            >
              <Trash2 size={13} />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200 dark:border-slate-800">
        {(['all', 'basic', 'fees', 'features', 'products'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSection(tab)}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg border-b-2 transition-all duration-200 shrink-0 capitalize cursor-pointer ${
              activeSection === tab
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/10'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {tab === 'all' ? 'All Specifications' : tab + ' Info'}
          </button>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed min-w-[640px] freeze-first-col">
            {/* Sticky Header */}
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800">
                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/4">Broker Specs</th>
                {selectedBrokers.map(b => (
                  <th key={b.id} className="p-4 text-center border-l border-slate-200/60 dark:border-slate-800/60">
                    <div className="flex flex-col items-center">
                      <BrokerLogo id={b.id} className="w-10 h-10 mb-2" />
                      <span className="font-bold text-slate-800 dark:text-white text-sm line-clamp-1">{b.name}</span>
                      <button
                        onClick={() => onSelectBroker(b.id)}
                        className="mt-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        Read Review
                      </button>
                    </div>
                  </th>
                ))}
                {/* Empty column slots to keep table layout consistent if less than 3 brokers are selected */}
                {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                  <th key={`empty-h-${i}`} className="p-4 text-center border-l border-slate-200/60 dark:border-slate-800/60 text-slate-300 dark:text-slate-700">
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="w-10 h-10 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center mb-2">
                        <Plus size={16} className="text-slate-400" />
                      </div>
                      <span className="text-xs text-slate-400 font-medium italic">Empty slot</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* SECTION: BASIC INFO */}
              {(activeSection === 'all' || activeSection === 'basic') && (
                <>
                  <tr className="bg-slate-100/50 dark:bg-slate-800/30">
                    <td colSpan={4} className="p-3 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Basic Information
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Overall Rating</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60">
                        {renderStars(b.rating)}
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-rating-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Target Audience</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300 font-medium">
                        {b.targetAudience}
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-target-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Account Opening Fee</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60 font-bold text-slate-800 dark:text-white text-sm">
                        {b.minDeposit === 0 ? 'Free (₹0)' : `₹${b.minDeposit}`}
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-min-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Year Founded</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300">
                        {b.yearFounded}
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-founded-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Headquarters</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300">
                        {b.headquarters}
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-hq-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                </>
              )}

              {/* SECTION: FEES & RATES */}
              {(activeSection === 'all' || activeSection === 'fees') && (
                <>
                  <tr className="bg-slate-100/50 dark:bg-slate-800/30">
                    <td colSpan={4} className="p-3 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Commissions, Rates, & Fees
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Delivery Brokerage</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60">
                        {b.stockCommission === 0 
                          ? renderTextBadge('Free (₹0)', 'green') 
                          : <span className="font-bold text-slate-800 dark:text-white">₹{b.stockCommission}</span>}
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-stockfee-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Intraday & F&O Brokerage</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300 font-bold">
                        ₹{b.optionsCommission.perContract} / trade
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-optfee-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Demat DP Charges</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60 text-xs text-slate-700 dark:text-slate-300 font-medium">
                        {b.cryptoFee}
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-cryptfee-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">MTF Interest Rate (Base)</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60">
                        <span className={`font-bold ${b.marginRateBase < 11 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-white'}`}>
                          {b.marginRateBase}% p.a.
                        </span>
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-marginfee-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Annual AMC (+ GST)</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60">
                        {b.inactivityFee === 0 
                          ? renderTextBadge('Free (₹0)', 'green') 
                          : <span className="font-bold text-slate-800 dark:text-white">₹{b.inactivityFee}/yr</span>}
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-inactfee-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Fund Transfer Fee</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60 text-xs font-semibold">
                        {b.wireFee === 0 
                          ? renderTextBadge('Free', 'green') 
                          : <span className="text-slate-700 dark:text-slate-300">₹{b.wireFee} (Netbanking)</span>}
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-wirefee-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                </>
              )}

              {/* SECTION: FEATURES */}
              {(activeSection === 'all' || activeSection === 'features') && (
                <>
                  <tr className="bg-slate-100/50 dark:bg-slate-800/30">
                    <td colSpan={4} className="p-3 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Platform Features
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Paper/Virtual Trading</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60">
                        {renderBoolean(b.features.paperTrading)}
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-paper-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Direct Mutual Funds</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60">
                        {renderBoolean(b.features.roboAdvisor)}
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-robo-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Research & Charting</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60">
                        {b.features.researchTools === 'Advanced' 
                          ? renderTextBadge('Advanced', 'purple')
                          : b.features.researchTools === 'Standard'
                          ? renderTextBadge('Standard', 'blue')
                          : renderTextBadge('Basic', 'gray')}
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-research-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Trading App Quality</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60">
                        {b.features.mobileApp === 'Excellent' 
                          ? renderTextBadge('Excellent', 'green')
                          : b.features.mobileApp === 'Good'
                          ? renderTextBadge('Good', 'blue')
                          : renderTextBadge('Basic', 'gray')}
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-mobile-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Algo Trading Supported</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60">
                        {renderBoolean(b.features.apiTrading)}
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-api-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Intraday Short Selling</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60">
                        {renderBoolean(b.features.shortSelling)}
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-short-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                </>
              )}

              {/* SECTION: PRODUCTS */}
              {(activeSection === 'all' || activeSection === 'products') && (
                <>
                  <tr className="bg-slate-100/50 dark:bg-slate-800/30">
                    <td colSpan={4} className="p-3 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Investment Products
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Available Products</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60">
                        <div className="flex flex-wrap gap-1 justify-center max-w-[200px] mx-auto">
                          {b.investmentProducts.map(p => (
                            <span key={p} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium border border-slate-200/40 dark:border-slate-700/40">
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-products-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Supported Accounts</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                        <div className="line-clamp-3 text-xs" title={b.accountTypes.join(', ')}>
                          {b.accountTypes.slice(0, 3).join(', ')}
                          {b.accountTypes.length > 3 && '...'}
                        </div>
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-accounts-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Customer Support</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 text-center border-l border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-600 dark:text-slate-300">
                        <div className="font-semibold text-slate-800 dark:text-white mb-0.5">{b.customerSupport.phone}</div>
                        <div className="text-slate-500 text-[10px]">{b.customerSupport.chat}</div>
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-support-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                </>
              )}

              {/* SECTION: PROS & CONS */}
              {activeSection === 'all' && (
                <>
                  <tr className="bg-slate-100/50 dark:bg-slate-800/30">
                    <td colSpan={4} className="p-3 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Pros & Cons Summary
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 vertical-align-top">Key Advantages</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 border-l border-slate-100 dark:border-slate-800/60 text-xs">
                        <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 list-disc list-inside">
                          {b.pros.slice(0, 3).map((pro, idx) => (
                            <li key={idx} className="leading-relaxed"><span className="text-emerald-600 dark:text-emerald-400 font-medium">{pro}</span></li>
                          ))}
                        </ul>
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-pros-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 vertical-align-top">Key Drawbacks</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 border-l border-slate-100 dark:border-slate-800/60 text-xs">
                        <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 list-disc list-inside">
                          {b.cons.slice(0, 3).map((con, idx) => (
                            <li key={idx} className="leading-relaxed"><span className="text-rose-600 dark:text-rose-400 font-medium">{con}</span></li>
                          ))}
                        </ul>
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-cons-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 vertical-align-top">Expert Verdict</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 border-l border-slate-100 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed">
                        "{b.verdict}"
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-verdict-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60">
                    <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 vertical-align-top">Account Opening</td>
                    {selectedBrokers.map(b => (
                      <td key={b.id} className="p-4 border-l border-slate-100 dark:border-slate-800/60 text-center">
                        <a
                          href={b.accountOpeningUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-sm transition-all hover:scale-[1.03]"
                        >
                          Open Account Online
                        </a>
                      </td>
                    ))}
                    {Array.from({ length: 3 - selectedBrokers.length }).map((_, i) => (
                      <td key={`empty-action-${i}`} className="p-4 border-l border-slate-100 dark:border-slate-800/60" />
                    ))}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
