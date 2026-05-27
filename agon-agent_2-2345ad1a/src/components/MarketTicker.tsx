import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  history: number[];
}

const initialTickers: TickerData[] = [
  { symbol: 'NIFTY 50', name: 'NSE Index', price: 22450.30, change: 84.50, changePercent: 0.38, history: [22310, 22350, 22390, 22420, 22400, 22430, 22450.30] },
  { symbol: 'SENSEX', name: 'BSE Index', price: 73878.15, change: 298.40, changePercent: 0.41, history: [73400, 73520, 73650, 73780, 73710, 73820, 73878.15] },
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2985.40, change: 12.50, changePercent: 0.42, history: [2960, 2965, 2972, 2980, 2975, 2982, 2985.40] },
  { symbol: 'TCS', name: 'Tata Consultancy', price: 4122.10, change: -18.30, changePercent: -0.44, history: [4150, 4145, 4138, 4132, 4140, 4128, 4122.10] },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: 1445.60, change: 8.20, changePercent: 0.57, history: [1432, 1435, 1438, 1442, 1440, 1443, 1445.60] },
  { symbol: 'INFY', name: 'Infosys Ltd', price: 1612.30, change: -24.50, changePercent: -1.50, history: [1645, 1638, 1630, 1622, 1628, 1618, 1612.30] },
  { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', price: 978.20, change: 14.30, changePercent: 1.48, history: [955, 960, 968, 972, 969, 974, 978.20] }
];

export const MarketTicker: React.FC = () => {
  const [tickers, setTickers] = useState<TickerData[]>(initialTickers);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prevTickers) =>
        prevTickers.map((ticker) => {
          // Random fluctuation between -0.3% and +0.3%
          const percentage = (Math.random() * 0.6 - 0.3) / 100;
          const priceDiff = ticker.price * percentage;
          const newPrice = Number((ticker.price + priceDiff).toFixed(2));
          const newChange = Number((ticker.change + priceDiff).toFixed(2));
          const newChangePercent = Number(((newChange / (newPrice - newChange)) * 100).toFixed(2));
          
          // Update history, keeping last 10 points
          const newHistory = [...ticker.history.slice(1), newPrice];

          return {
            ...ticker,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            history: newHistory
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Helper to draw a small SVG sparkline
  const drawSparkline = (history: number[], isPositive: boolean) => {
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min === 0 ? 1 : max - min;
    const height = 24;
    const width = 60;
    const points = history
      .map((val, idx) => {
        const x = (idx / (history.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg className="w-16 h-6 ml-2 inline-block overflow-visible" width={width} height={height}>
        <polyline
          fill="none"
          stroke={isPositive ? '#10B981' : '#EF4444'}
          strokeWidth="1.5"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 text-slate-300 py-2.5 px-4 overflow-hidden text-xs select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-slate-400 mr-4 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          LIVE INDIAN MARKET DATA:
        </div>
        
        <div 
          ref={containerRef}
          className="flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth w-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tickers.map((ticker) => {
            const isPositive = ticker.change >= 0;
            return (
              <div 
                key={ticker.symbol} 
                className="flex items-center gap-3 shrink-0 bg-slate-950/40 hover:bg-slate-950/80 px-3 py-1 rounded-md border border-slate-800/60 transition-all duration-300"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white">{ticker.symbol}</span>
                    <span className="text-[10px] text-slate-500 hidden md:inline">{ticker.name}</span>
                  </div>
                  <span className="font-mono text-slate-300 font-medium">₹{ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>

                <div className="flex flex-col items-end">
                  <span className={`flex items-center font-mono font-semibold text-[11px] ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {isPositive ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />}
                    {isPositive ? '+' : ''}{ticker.changePercent}%
                  </span>
                  <span className={`font-mono text-[10px] ${isPositive ? 'text-emerald-600/80' : 'text-rose-600/80'}`}>
                    {isPositive ? '+' : ''}{ticker.change}
                  </span>
                </div>

                {drawSparkline(ticker.history, isPositive)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
