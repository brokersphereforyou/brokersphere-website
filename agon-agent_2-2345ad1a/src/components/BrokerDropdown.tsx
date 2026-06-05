import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Broker } from '../data/brokers';

interface BrokerDropdownProps {
  brokers: Broker[];
  selectedIds: string[];
  onSelect: (brokerId: string) => void;
}

export default function BrokerDropdown({
  brokers,
  selectedIds,
  onSelect
}: BrokerDropdownProps) {
  const [open, setOpen] = useState(false);

  const availableBrokers = brokers.filter((broker) => !selectedIds.includes(broker.id));

  return (
    <div className="relative w-full sm:w-52">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-sm"
      >
        Add Broker...
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-full sm:w-64 max-h-72 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-xl z-[9999]">
          {availableBrokers.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-500">
              No brokers available
            </div>
          ) : (
            availableBrokers.map((broker) => (
              <button
                key={broker.id}
                type="button"
                onClick={() => {
                  onSelect(broker.id);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 border-b border-slate-100 last:border-b-0"
              >
                {broker.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
