import { useState, useRef, useEffect } from 'react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableBrokers = brokers.filter(
    (broker) => !selectedIds.includes(broker.id)
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative w-full sm:w-56"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
      >
        Add Broker...
        <ChevronDown size={16} />
      </button>

      {open && (
        <div
          className="
            absolute
            top-full
            right-0
            mt-2
            w-72
            bg-white
            border
            border-slate-200
            rounded-xl
            shadow-2xl
            z-[99999]
            max-h-[400px]
            overflow-y-auto
          "
        >
          {availableBrokers.length === 0 ? (
            <div className="p-4 text-slate-500">
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
                className="
                  block
                  w-full
                  text-left
                  px-4
                  py-3
                  text-slate-800
                  hover:bg-emerald-50
                  hover:text-emerald-700
                  border-b
                  border-slate-100
                "
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
