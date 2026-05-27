import React from 'react';
import { Broker } from '../data/brokers';
import { BrokerLogo } from './BrokerLogo';
import { Star, CheckCircle, AlertTriangle, ArrowRight, Plus, Check } from 'lucide-react';

interface BrokerCardProps {
  broker: Broker;
  onSelect: (id: string) => void;
  onCompareToggle: (id: string) => void;
  isComparing: boolean;
  compareCount: number;
}

export const BrokerCard: React.FC<BrokerCardProps> = ({
  broker,
  onSelect,
  onCompareToggle,
  isComparing,
  compareCount
}) => {
  // Render half or full stars
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={15} className="fill-amber-400 text-amber-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative inline-block">
            <Star size={15} className="text-slate-300" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star size={15} className="fill-amber-400 text-amber-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={15} className="text-slate-300 dark:text-slate-600" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      {/* Header with logo name and rating */}
      <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <BrokerLogo id={broker.id} className="w-12 h-12" />
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white text-lg group-hover:text-emerald-500 transition-colors duration-200">
              {broker.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="flex">{renderStars(broker.rating)}</div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">{broker.rating}</span>
            </div>
          </div>
        </div>
        
        {/* Compare Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCompareToggle(broker.id);
          }}
          disabled={!isComparing && compareCount >= 3}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold border transition-all duration-200 cursor-pointer ${
            isComparing
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400'
              : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed'
          }`}
        >
          {isComparing ? (
            <>
              <Check size={13} className="stroke-[3]" />
              Selected
            </>
          ) : (
            <>
              <Plus size={13} />
              Compare
            </>
          )}
        </button>
      </div>

      {/* Tagline */}
      <div className="px-5 py-3.5 bg-slate-50/50 dark:bg-slate-950/20 text-slate-600 dark:text-slate-300 text-sm italic">
        "{broker.tagline}"
      </div>

      {/* Quick Stats Grid */}
      <div className="p-5 grid grid-cols-2 gap-4 border-b border-slate-100 dark:border-slate-800/80 text-xs">
        <div>
          <span className="text-slate-400 block mb-0.5">Account Opening</span>
          <span className="font-bold text-slate-700 dark:text-slate-200">
            {broker.minDeposit === 0 ? 'Free (₹0)' : `₹${broker.minDeposit}`}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block mb-0.5">Delivery Brokerage</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            {broker.stockCommission === 0 ? 'Free (₹0)' : `₹${broker.stockCommission}`}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block mb-0.5">Intraday / F&O Fee</span>
          <span className="font-bold text-slate-700 dark:text-slate-200">
            ₹{broker.optionsCommission.perContract} / trade
          </span>
        </div>
        <div>
          <span className="text-slate-400 block mb-0.5">MTF Interest Rate</span>
          <span className="font-bold text-slate-700 dark:text-slate-200">
            {broker.marginRateBase}% p.a.
          </span>
        </div>
      </div>

      {/* Features Badges */}
      <div className="px-5 py-4 flex-grow">
        <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-2">Key Features</span>
        <div className="flex flex-wrap gap-1.5">
          {broker.features.paperTrading && (
            <span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 text-[11px] font-medium border border-purple-100 dark:border-purple-900/30">
              Paper Trading
            </span>
          )}
          {broker.features.roboAdvisor && (
            <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-[11px] font-medium border border-indigo-100 dark:border-indigo-900/30">
              Direct Mutual Funds
            </span>
          )}
          {broker.features.apiTrading && (
            <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 text-[11px] font-medium border border-amber-100 dark:border-amber-900/30">
              Free API Access
            </span>
          )}
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-medium">
            {broker.features.researchTools} Research
          </span>
        </div>

        {/* Pros Preview */}
        <div className="mt-4 space-y-1.5">
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-1">Top Pros</span>
          {broker.pros.slice(0, 2).map((pro, index) => (
            <div key={index} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
              <CheckCircle size={13} className="text-emerald-500 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{pro}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Action */}
      <div className="p-5 pt-0 mt-auto flex gap-2">
        <a
          href={broker.accountOpeningUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
        >
          Open Account
        </a>
        <button
          onClick={() => onSelect(broker.id)}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all duration-200 cursor-pointer"
        >
          View Review
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
