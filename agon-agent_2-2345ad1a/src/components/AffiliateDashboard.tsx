import React, { useState, useEffect } from 'react';
import { Broker, brokersData } from '../data/brokers';
import { BrokerLogo } from './BrokerLogo';
import { ShieldCheck, Copy, Check, Save, ExternalLink, HelpCircle, TrendingUp, Sparkles, DollarSign, Award } from 'lucide-react';

export const AffiliateDashboard: React.FC = () => {
  // Store custom affiliate links in state and local storage
  const [links, setLinks] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('broker_affiliate_links');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Default fallback values (can be empty or actual links)
    const defaults: Record<string, string> = {};
    brokersData.forEach(b => {
      defaults[b.id] = b.accountOpeningUrl;
    });
    return defaults;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleLinkChange = (id: string, value: string) => {
    setLinks(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSaveLinks = () => {
    localStorage.setItem('broker_affiliate_links', JSON.stringify(links));
    setSavedSuccess(true);
    
    // Dispatch custom event so other components (like BrokerDetail) know the links updated
    window.dispatchEvent(new Event('affiliate_links_updated'));

    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold uppercase tracking-wider">
          <Sparkles size={12} />
          Monetization & Traffic Engine
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          How to Earn Money with Your <span className="text-emerald-400">BrokerSphere</span> Comparison Website
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
          The absolute best way to monetize a financial comparison website in India is through **Broker Affiliate/Partner Programs** (Sub-broking). When users compare brokers on your website and click "Open Account Online", they will register using **your referral links**. You earn ₹100 - ₹300 per account opening, plus **10% to 40% lifetime brokerage sharing** on every trade they execute!
        </p>
      </div>

      {/* Grid: Affiliate Link Manager & Promotional Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Link Manager */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white text-base">Affiliate Link Manager</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Replace default links with your partner referral links.</p>
              </div>
            </div>

            <button
              onClick={handleSaveLinks}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer transition-all"
            >
              <Save size={13} />
              Save All Links
            </button>
          </div>

          {savedSuccess && (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-3.5 rounded-xl text-xs font-bold text-center">
              ✓ All affiliate links updated successfully! All "Open Account" buttons across the site now use your custom links.
            </div>
          )}

          {/* Links Input Fields */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1 no-scrollbar">
            {brokersData.map((b) => (
              <div 
                key={b.id} 
                className="p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 shrink-0">
                  <BrokerLogo id={b.id} className="w-10 h-10" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-white text-xs block">{b.name}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Partner link</span>
                  </div>
                </div>

                <div className="flex-grow">
                  <input
                    type="url"
                    placeholder={`Paste your ${b.name} partner link...`}
                    value={links[b.id] || ''}
                    onChange={(e) => handleLinkChange(b.id, e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Traffic & Promotion Strategy Guide */}
        <div className="lg:col-span-5 space-y-6">
          {/* Top Partner Programs */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-1.5">
              <Award size={16} className="text-amber-500" />
              Top Indian Partner Programs to Join
            </h3>

            <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-400">
              {[
                { name: 'Zerodha Associate Program', share: 'Flat ₹100 per account + 10% brokerage sharing for life.', link: 'https://zerodha.com/associates/' },
                { name: 'Dhan Partner Program', share: 'Industry-leading 20% to 40% brokerage sharing for life.', link: 'https://dhan.co/partner-program/' },
                { name: 'Angel One Partner', share: 'Earn up to ₹300 per activation + up to 35% revenue sharing.', link: 'https://www.angelone.in/partner' },
                { name: 'Groww Partner', share: 'Earn per active client trade + mutual fund distributor commission.', link: 'https://groww.in/' }
              ].map((prog, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-white">{prog.name}</span>
                    <a 
                      href={prog.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-0.5"
                    >
                      Join
                      <ExternalLink size={10} />
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{prog.share}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Strategies */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-white text-sm border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-1.5">
              <TrendingUp size={16} className="text-blue-500" />
              How to Drive Traffic (SEO & Forums)
            </h3>

            <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <div className="space-y-1">
                <span className="font-bold text-slate-800 dark:text-white block">1. Dominate Reddit & Quora (High Intent)</span>
                <p>
                  Search Google or Reddit for topics like **"Zerodha vs Groww"**, **"Best broker for intraday"**, or **"Dhan hidden charges"**. Provide honest, highly detailed answers summarizing key differences, and leave a link back to your BrokerSphere comparison tool for them to calculate their own fees.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-800 dark:text-white block">2. Publish Comparison Blogs (SEO Engine)</span>
                <p>
                  Write high-intent comparison articles (refer to our **SEO Blogs** tab!). Google loves structured table comparisons, which is why your frozen-column tables will rank exceptionally well on search engines.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-800 dark:text-white block">3. Target "Hidden Charges" & AMC Keywords</span>
                <p>
                  Most retail traders search for "DP charges comparison" or "Zero AMC brokers". Use your **Fee Estimator** tool as a lead-generation widget to show them exactly how much they are overpaying their current banks!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
