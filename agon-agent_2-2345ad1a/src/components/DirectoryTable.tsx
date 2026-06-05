import React from 'react';
import { Broker } from '../data/brokers';
import { ArrowRight } from 'lucide-react';

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
      <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-bold border border-emerald-100">
        Yes
      </span>
    ) : (
      <span className="text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-medium">
        No
      </span>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px] freeze-first-col bg-white">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 text-[10px] uppercase font-bold tracking-wider">
              <th className="p-4 pl-6 bg-slate-50 text-slate-700">Broker Platform</th>
              <th className="p-4 bg-slate-50 text-slate-700">Account Opening</th>
              <th className="p-4 bg-slate-50 text-slate-700">Delivery Brokerage</th>
              <th className="p-4 bg-slate-50 text-slate-700">F&O</th>
              <th className="p-4 bg-slate-50 text-slate-700">Annual AMC (+ GST)</th>
              <th className="p-4 bg-slate-50 text-slate-700">Mutual Funds</th>
              <th className="p-4 bg-slate-50 text-slate-700">Algo Trading</th>
              <th className="p-4 pr-6 text-right bg-slate-50 text-slate-700">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs bg-white">
            {brokers.map((b) => {
              const isComparing = selectedCompareIds.includes(b.id);
              const isCompareDisabled = !isComparing && selectedCompareIds.length >= 3;

              return (
                <tr 
                  key={b.id} 
                  className="bg-white hover:bg-slate-50 transition-colors group"
                >
                  <td className="p-4 pl-6 bg-white text-slate-900">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-slate-900 text-sm">
                        {b.name}
                      </span>
                      <a 
                        href={b.accountOpeningUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5"
                      >
                        Open Account ↗
                      </a>
                    </div>
                  </td>

                  <td className="p-4 font-semibold bg-white text-slate-800">
                    {b.minDeposit === 0 ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded font-bold">
                        Free (₹0)
                      </span>
                    ) : (
                      <span className="text-slate-800 font-bold">
                        ₹{b.minDeposit}
                      </span>
                    )}
                  </td>

                  <td className="p-4 bg-white">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                      {b.stockCommission === 0 ? 'Free (₹0)' : `₹${b.stockCommission}`}
                    </span>
                  </td>

                  <td className="p-4 font-semibold bg-white text-slate-800">
                    {b.optionsCommission.perContract === 0 ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded font-bold">
                        Free (₹0)
                      </span>
                    ) : (
                      `₹${b.optionsCommission.perContract} / trade`
                    )}
                  </td>

                  <td className="p-4 font-semibold bg-white text-slate-800">
                    {b.inactivityFee === 0 ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded font-bold">
                        Free (₹0)
                      </span>
                    ) : (
                      `₹${b.inactivityFee} / yr`
                    )}
                  </td>

                  <td className="p-4 bg-white">
                    {renderBoolean(b.features.mutualFunds)}
                  </td>

                  <td className="p-4 bg-white">
                    {renderBoolean(b.features.apiTrading)}
                  </td>

                  <td className="p-4 pr-6 text-right bg-white">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onCompareToggle(b.id)}
                        disabled={isCompareDisabled}
                        className={`px-2 py-1.5 rounded-lg border text-[10px] font-bold transition-all cursor-pointer ${
                          isComparing
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed'
                        }`}
                      >
                        {isComparing ? 'Selected' : '+ Compare'}
                      </button>

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
