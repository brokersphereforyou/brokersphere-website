import React, { useState, useMemo } from 'react';
import { Broker, brokersData } from '../data/brokers';
import { BrokerLogo } from './BrokerLogo';
import { Calculator, AlertCircle, Info } from 'lucide-react';

interface BrokerCostBreakdown {
  broker: Broker;
  deliveryCost: number;
  intradayCost: number;
  dpCost: number;
  marginCost: number;
  totalCost: number;
  marginRateUsed: number;
}

export const FeeCalculator: React.FC = () => {
  // User input states (Indian terminology)
  const [deliveryTrades, setDeliveryTrades] = useState<number>(5); // monthly delivery buy/sell trades
  const [intradayTrades, setIntradayTrades] = useState<number>(15); // monthly intraday/F&O trades
  const [marginBalance, setMarginBalance] = useState<number>(0); // MTF margin balance (in ₹)
  const [stocksSold, setStocksSold] = useState<number>(8); // Number of times stock sold from Demat (DP charges apply per sell instance)

  // Advanced calculations
  const calculatedCosts = useMemo((): BrokerCostBreakdown[] => {
    return brokersData.map((broker) => {
      // 1. Delivery Cost: e.g. Zerodha is ₹0, Groww/Upstox/Dhan is ₹20 or %
      // Let's assume average delivery trade value of ₹25,000 for percentage calculations
      const avgTradeValue = 25000;
      let deliveryCostPerTrade = broker.stockCommission;
      if (broker.id === 'groww') {
        deliveryCostPerTrade = Math.min(20, avgTradeValue * 0.0005);
      } else if (broker.id === 'upstox') {
        deliveryCostPerTrade = Math.min(20, avgTradeValue * 0.025);
      } else if (broker.id === 'hdfcsky') {
        deliveryCostPerTrade = Math.min(20, avgTradeValue * 0.001);
      }
      const deliveryCost = deliveryTrades * 12 * deliveryCostPerTrade;

      // 2. Intraday / F&O Cost: Flat ₹20 per trade for most, ₹0 for ICICI Direct intraday under Neo
      let intradayCostPerTrade = broker.optionsCommission.perContract;
      if (broker.id === 'icicidirect') {
        intradayCostPerTrade = 20; // F&O is ₹20, intraday is ₹0. We take ₹20 as a safe standard
      }
      const intradayCost = intradayTrades * 12 * intradayCostPerTrade;

      // 3. DP Charges (Demat Debit fee): Charged when selling delivery shares
      const dpCost = stocksSold * 12 * broker.cryptoFeeRate;

      // 4. Margin Trading Facility (MTF) Cost
      let marginRateUsed = broker.marginRateBase;
      const marginCost = (marginBalance * marginRateUsed) / 100;

      // 5. AMC (Annual Maintenance Charge)
      const amcCost = broker.inactivityFee;

      const totalCost = deliveryCost + intradayCost + dpCost + marginCost + amcCost;

      return {
        broker,
        deliveryCost,
        intradayCost,
        dpCost,
        marginCost,
        totalCost: Number(totalCost.toFixed(2)),
        marginRateUsed
      };
    }).sort((a, b) => a.totalCost - b.totalCost); // Sort cheapest to most expensive
  }, [deliveryTrades, intradayTrades, marginBalance, stocksSold]);

  const maxTotalCost = useMemo(() => {
    const costs = calculatedCosts.map(c => c.totalCost);
    const max = Math.max(...costs);
    return max === 0 ? 1 : max;
  }, [calculatedCosts]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: INPUT SLIDERS */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="w-9 h-9 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
            <Calculator size={18} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white text-base">Cost Estimator Inputs</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Simulate your volume to estimate real annual Indian broker fees.</p>
          </div>
        </div>

        {/* Delivery Trades Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              Delivery Stock Purchases / Month
            </label>
            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono font-bold text-slate-800 dark:text-white">
              {deliveryTrades}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            step="2"
            value={deliveryTrades}
            onChange={(e) => setDeliveryTrades(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-[10px] text-slate-400 block">Estimated {deliveryTrades * 12} delivery buy orders per year.</span>
        </div>

        {/* Intraday & F&O Trades Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label className="font-bold text-slate-700 dark:text-slate-300">
              Intraday & F&O Orders / Month
            </label>
            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono font-bold text-slate-800 dark:text-white">
              {intradayTrades}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="150"
            step="5"
            value={intradayTrades}
            onChange={(e) => setIntradayTrades(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-[10px] text-slate-400 block">Estimated {intradayTrades * 12} derivative/intraday trades per year.</span>
        </div>

        {/* Demat Debit Sales Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label className="font-bold text-slate-700 dark:text-slate-300">
              Demat Stock Sell Instances / Month
            </label>
            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono font-bold text-slate-800 dark:text-white">
              {stocksSold}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            step="2"
            value={stocksSold}
            onChange={(e) => setStocksSold(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-[10px] text-slate-400 block">DP Charges are levied per stock sold per day.</span>
        </div>

        {/* Margin Funding Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <label className="font-bold text-slate-700 dark:text-slate-300">
              Average MTF Balance (Leverage)
            </label>
            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono font-bold text-slate-800 dark:text-white">
              ₹{marginBalance.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="500000"
            step="10000"
            value={marginBalance}
            onChange={(e) => setMarginBalance(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-[10px] text-slate-400 block">Borrowed funds to leverage stock delivery holdings.</span>
        </div>

        {/* Educational Note */}
        <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/60 rounded-xl p-4 text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
            <Info size={14} className="text-emerald-500" />
            Indian Brokerage Cost Structure:
          </div>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            In India, stockbrokers charge three main direct fees: **Brokerage** (mostly flat ₹20/trade), **Demat DP Charges** (₹13.5 to ₹20 + 18% GST whenever you sell shares), and **AMC** (Annual Maintenance Charges). Regulatory charges like STT, Stamp Duty, and SEBI turnover fees are identical across all brokers and are excluded here.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: DETAILED RESULTS CHART */}
      <div className="lg:col-span-7 space-y-5">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800/80 mb-5">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-base">Estimated Annual Costs</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs">Total estimated annual platform charges (lower is better).</p>
            </div>
            <span className="text-[10px] uppercase font-extrabold tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded">
              Sorted: Lowest Cost
            </span>
          </div>

          {/* Bar Chart */}
          <div className="space-y-4">
            {calculatedCosts.map((item) => {
              const percentage = (item.totalCost / maxTotalCost) * 100;
              
              return (
                <div key={item.broker.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <BrokerLogo id={item.broker.id} className="w-6 h-6 rounded-md" />
                      <span className="font-bold text-slate-700 dark:text-slate-300">{item.broker.name}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-800 dark:text-white text-sm">
                      ₹{item.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / yr
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800/60 h-4 rounded-md overflow-hidden flex">
                    {item.totalCost > 0 ? (
                      <div 
                        className={`h-full rounded-md transition-all duration-500 ${
                          item.totalCost === calculatedCosts[0].totalCost 
                            ? 'bg-emerald-500' 
                            : item.totalCost === calculatedCosts[calculatedCosts.length - 1].totalCost 
                            ? 'bg-rose-500' 
                            : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.max(percentage, 2)}%` }}
                      />
                    ) : (
                      <div className="h-full bg-emerald-500/20 text-[10px] px-2 flex items-center text-emerald-600 dark:text-emerald-400 font-bold">
                        100% Free (₹0)
                      </div>
                    )}
                  </div>

                  {/* Cost Breakdown Subtitles */}
                  {item.totalCost > 0 && (
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-400 font-medium pl-8">
                      {item.deliveryCost > 0 && (
                        <span>Delivery: <strong className="text-slate-600 dark:text-slate-300 font-semibold">₹{item.deliveryCost.toFixed(0)}</strong></span>
                      )}
                      {item.intradayCost > 0 && (
                        <span>Intraday/F&O: <strong className="text-slate-600 dark:text-slate-300 font-semibold">₹{item.intradayCost.toFixed(0)}</strong></span>
                      )}
                      {item.dpCost > 0 && (
                        <span>DP Charges: <strong className="text-slate-600 dark:text-slate-300 font-semibold">₹{item.dpCost.toFixed(0)}</strong></span>
                      )}
                      {item.broker.inactivityFee > 0 && (
                        <span>AMC: <strong className="text-slate-600 dark:text-slate-300 font-semibold">₹{item.broker.inactivityFee}</strong></span>
                      )}
                      {item.marginCost > 0 && (
                        <span>
                          MTF ({item.marginRateUsed}%): <strong className="text-slate-600 dark:text-slate-300 font-semibold">₹{item.marginCost.toFixed(0)}</strong>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Fee breakdown advice */}
        <div className="bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-xs space-y-3">
          <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5 text-sm">
            <Info size={16} className="text-blue-500" />
            Indian Broker Selection Insights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-500 dark:text-slate-400 leading-relaxed">
            <div className="space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 text-xs block">For Long-Term Investors:</span>
              <p>
                If you buy and hold shares for the long term, **Zerodha** and **Dhan** are highly cost-effective because they charge **₹0 brokerage** on delivery trades. Groww charges up to ₹20 per trade.
              </p>
            </div>
            <div className="space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 text-xs block">For Active Margin (MTF) Users:</span>
              <p>
                If you buy shares on leverage, **Dhan** offers the cheapest Margin Trading Facility (MTF) rate in India starting at just **10.5% p.a.**, saving you thousands of rupees compared to full-service bank brokers charging 12% to 15%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
