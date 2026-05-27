import React from 'react';
import { Shield, Info, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-12 mt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-extrabold text-base">
                ₹
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">BrokerSphere</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              BrokerSphere is an independent, advertisement-supported financial comparison platform. We aim to empower Indian retail traders with unbiased data, transparent cost calculations, and intelligent matching tools.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 text-sm">Educational Resources</h4>
            <ul className="space-y-2 text-slate-400">
              <li><span className="hover:text-emerald-400 transition-colors cursor-pointer">Understanding DP Charges</span></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-pointer">What is Margin Trading Facility (MTF)?</span></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-pointer">How to Avoid Intraday Auto-Squareoff Fees</span></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-pointer">CDSL vs NSDL Depositories Explained</span></li>
            </ul>
          </div>

          {/* Disclaimers & Security */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 text-sm flex items-center gap-1">
              <Shield size={14} className="text-emerald-500" />
              SEBI Registered Protection
            </h4>
            <p className="text-slate-400 leading-relaxed">
              All compared brokers are registered with SEBI (Securities and Exchange Board of India). Your shares are held securely with national depositories CDSL or NSDL, protecting your holdings against broker insolvency.
            </p>
          </div>
        </div>

        {/* Regulatory Disclaimers Box */}
        <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800/60 space-y-3">
          <div className="flex items-center gap-1.5 font-bold text-slate-200 text-xs">
            <Info size={14} className="text-emerald-500" />
            FINANCIAL DISCLOSURE & RISK WARNING:
          </div>
          <p className="text-slate-500 leading-relaxed text-[11px]">
            Trading in stocks, futures, options, commodities, and currencies involves significant risk of loss and is not suitable for every investor. The valuation of equities, F&O contracts, and commodities may fluctuate, and as a result, clients may lose more than their original investment. Margin Trading Facility (MTF) involves borrowing funds to leverage transactions, which can magnify both profits and losses.
          </p>
          <p className="text-slate-500 leading-relaxed text-[11px]">
            BrokerSphere is not a registered broker-dealer, investment advisor, or financial planner. All broker specifications, commissions, AMC charges, and margin rates are sourced from publicly available broker websites and are subject to change without notice. While we strive to maintain highly accurate and up-to-date fee calculations, we cannot guarantee the complete accuracy of all compared rates. Please verify all trading specifications directly with your broker before opening or funding an account.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-6 text-slate-500 text-[11px]">
          <span>© {new Date().getFullYear()} BrokerSphere. All rights reserved. Made for Indian retail investors.</span>
          <div className="flex gap-4">
            <button onClick={onOpenPrivacy} className="hover:text-slate-300 transition-colors cursor-pointer outline-none">Privacy Policy</button>
            <span>•</span>
            <button onClick={onOpenTerms} className="hover:text-slate-300 transition-colors cursor-pointer outline-none">Terms of Service</button>
            <span>•</span>
            <a href="https://www.sebi.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors cursor-pointer flex items-center gap-0.5">
              SEBI.gov.in
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
