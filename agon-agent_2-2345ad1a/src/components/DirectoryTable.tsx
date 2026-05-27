import React from 'react';
import { Broker } from '../data/brokers';
import { BrokerLogo } from './BrokerLogo';
import { Star, Check, X, ArrowRight, Plus } from 'lucide-react';

interface DirectoryTableProps {
  brokers: Broker[];
  onSelect: (id: string) => void;
  onCompareToggle: (id: string) => void;
  selectedCompareIds: string[];
}

export const DirectoryTable: React.FC<DirectoryTableProps> = ({
  brokers,
  onSelect,
  onCompareToggle,
  selectedCompareIds
}) => {
  const renderBoolean = (val: boolean) => {
    return val ? (
      <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded text-[10px] font-bold border border-emerald-100 dark:border-emerald-900/20">
        Yes
      </span>
    ) : (
      <span className="text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-1.5 py-0.5 rounded text-[10px] font-medium">
        No
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px] freeze-first-col">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
              <th className="p-4 pl-6">Broker Platform</th>
              <th className="p-4">Account Opening</th>
              <th className="p-4">Delivery Brokerage</th>
              <th className="p-4">F&O</th>
              <th className="p-4">Annual AMC (+ GST)</th>
              <th className="p-4">Mutual Funds</th>
              <th className="p-4">Algo Trading</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
            {brokers.map((b) => {
              const isComparing = selectedCompareIds.includes(b.id);
              const isCompareDisabled = !isComparing && selectedCompareIds.length >= 3;

              return (
                <tr 
                  key={b.id} 
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10 transition-colors group"
                >
                  {/* Broker Name with Logo and Account Opening Link */}
                  <td className="p-4 pl-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-slate-800 dark:text-white text-sm">
                        {b.name}
                      </span>
                      <a 
                        href={b.accountOpeningUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                      >
                        Open Account ↗
                      </a>
                    </div>
                  </td>

                  {/* Account Opening Charges */}
                  <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">
                    {b.minDeposit === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 rounded font-bold">
                        Free (₹0)
                      </span>
                    ) : (
                      <span className="text-slate-700 dark:text-slate-300 font-bold">
                        ₹{b.minDeposit}
                      </span>
                    )}
                  </td>

                  {/* Delivery Brokerage */}
                  <td className="p-4">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 rounded">
                      {b.stockCommission === 0 ? 'Free (₹0)' : `₹${b.stockCommission}`}
                    </span>
                  </td>

                  {/* F&O */}
                  <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">
                    {b.optionsCommission.perContract === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 rounded font-bold">
                        Free (₹0)
                      </span>
                    ) : (
                      `₹${b.optionsCommission.perContract} / trade`
                    )}
                  </td>

                  {/* Annual AMC (+ GST) */}
                  <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">
                    {b.inactivityFee === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 rounded font-bold">
                        Free (₹0)
                      </span>
                    ) : (
                      `₹${b.inactivityFee} / yr`
                    )}
                  </td>

                  {/* Mutual Funds */}
                  <td className="p-4">
                    {renderBoolean(b.features.mutualFunds)}
                  </td>

                  {/* Algo Trading */}
                  <td className="p-4">
                    {renderBoolean(b.features.apiTrading)}
                  </td>

                  {/* Actions */}
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Compare Toggle */}
                      <button
                        onClick={() => onCompareToggle(b.id)}
                        disabled={isCompareDisabled}
                        className={`px-2 py-1.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                          isComparing
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                            : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed'
                        }`}
                      >
                        {isComparing ? 'Selected' : '+ Compare'}
                      </button>

                      {/* View Review */}
                      <button
                        onClick={() => onSelect(b.id)}
                        className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer transition-colors"
                        title="View Full Review"
                      >
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
