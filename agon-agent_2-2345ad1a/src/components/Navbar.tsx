import React, { useEffect, useState } from 'react';
import { Sun, Moon, Sparkles, ArrowLeftRight, Calculator, BookOpen, Layers, GraduationCap, DollarSign, Award } from 'lucide-react';

interface NavbarProps {
  activeTab: 'brokers' | 'compare' | 'finder' | 'calculator' | 'glossary' | 'blogs';
  setActiveTab: (tab: 'brokers' | 'compare' | 'finder' | 'calculator' | 'glossary' | 'blogs') => void;
  onBackToBrokers: () => void;
  compareCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onBackToBrokers,
  compareCount
}) => {
  useEffect(() => {
    // Force light mode as requested
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => {
              onBackToBrokers();
              setActiveTab('brokers');
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:bg-emerald-500 transition-colors">
              ₹
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-800 text-base tracking-tight leading-none">BrokerSphere</span>
              <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mt-0.5">Smart Comparisons</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {[
              { id: 'brokers', label: 'Directory', icon: Layers },
              { id: 'compare', label: 'Compare Tool', icon: ArrowLeftRight, badge: compareCount > 0 ? compareCount : undefined },
              { id: 'finder', label: 'Broker Finder Quiz', icon: Sparkles },
              { id: 'calculator', label: 'Fee Estimator', icon: Calculator },
              { id: 'blogs', label: 'Trading Guides & Blogs', icon: BookOpen },
              { id: 'glossary', label: 'Trading Glossary', icon: GraduationCap }
            ].map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onBackToBrokers();
                    setActiveTab(link.id as any);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer relative ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-600 rounded-b-none font-extrabold'
                      : 'text-slate-800 hover:text-black hover:bg-slate-200/60 font-semibold'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-emerald-500' : 'text-slate-400'} />
                  {link.label}
                  {link.badge !== undefined && (
                    <span className="ml-1 px-1.5 py-0.5 text-[9px] font-extrabold bg-emerald-500 text-white rounded-full leading-none">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* CTA/Finder Quiz */}
            <button
              onClick={() => {
                onBackToBrokers();
                setActiveTab('finder');
              }}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-505 active:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Sparkles size={13} />
              Find My Broker
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Header (Horizontal scroll on smaller screens) */}
      <div className="lg:hidden border-t border-slate-100 bg-slate-50/80 py-2 px-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-1">
          {[
            { id: 'brokers', label: 'Directory', icon: Layers },
            { id: 'compare', label: 'Compare', icon: ArrowLeftRight, badge: compareCount > 0 ? compareCount : undefined },
            { id: 'finder', label: 'Quiz', icon: Sparkles },
            { id: 'calculator', label: 'Fees', icon: Calculator },
            { id: 'blogs', label: 'Blogs & Guides', icon: BookOpen },
            { id: 'glossary', label: 'Glossary', icon: GraduationCap }
          ].map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onBackToBrokers();
                  setActiveTab(link.id as any);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                <Icon size={12} />
                <span>{link.label}</span>
                {link.badge !== undefined && (
                  <span className={`ml-1 px-1.5 py-0.5 text-[8px] font-extrabold rounded-full leading-none ${
                    isActive ? 'bg-white text-emerald-600' : 'bg-emerald-500 text-white'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
