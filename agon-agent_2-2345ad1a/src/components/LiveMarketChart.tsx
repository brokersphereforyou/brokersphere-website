import React, { useEffect, useRef } from 'react';
import { AreaChart, TrendingUp, Info } from 'lucide-react';

export const LiveMarketChart: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically insert TradingView Widget script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        ['NSE:NIFTY|1D'],
        ['BSE:SENSEX|1D'],
        ['NSE:BANKNIFTY|1D'],
        ['NSE:RELIANCE|1D'],
        ['NSE:TCS|1D'],
        ['NSE:HDFCBANK|1D']
      ],
      chartOnly: false,
      width: '100%',
      height: 420,
      locale: 'en',
      colorTheme: 'dark',
      gridLineColor: 'rgba(240, 243, 250, 0.06)',
      fontColor: '#787b86',
      isTransparent: false,
      showFloatingTooltip: true,
      scalePosition: 'no',
      scaleMode: 'Normal',
      fontFamily: '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif',
      noOverlaps: false,
      textFontSize: '12',
      valuesTracking: '1',
      changeMode: 'price-and-percent',
      chartType: 'area',
      maLineColor: '#2962FF',
      maLineWidth: 1,
      maLength: 9,
      headerFontSize: '14',
      backgroundColor: '#0f172a', // Matches Tailwind dark:bg-slate-900 / slate-900
      lineWidth: 2,
      lineColor: '#10b981', // emerald-500
      topColor: 'rgba(16, 185, 129, 0.3)',
      bottomColor: 'rgba(16, 185, 129, 0.05)'
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = ''; // Clear previous content
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
            <AreaChart size={18} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-1.5">
              Live Real-Time Indian Market Indexes
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                Live Feed
              </span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Real-time charts powered legally by TradingView. No API keys required.</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 bg-slate-50 dark:bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800/40">
          <Info size={13} className="text-blue-500 shrink-0" />
          <span>Updates during NSE/BSE market hours (9:15 AM - 3:30 PM IST)</span>
        </div>
      </div>

      {/* TradingView Widget Container */}
      <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800/50">
        <div ref={containerRef} className="tradingview-widget-container w-full h-[420px]">
          <div className="tradingview-widget-container__widget w-full h-full"></div>
        </div>
      </div>
    </div>
  );
};
