import React, { useEffect } from 'react';
import {
  Sparkles,
  ArrowLeftRight,
  Calculator,
  BookOpen,
  Layers,
  GraduationCap,
  PiggyBank
} from 'lucide-react';

interface NavbarProps {
  activeTab:
    | 'brokers'
    | 'compare'
    | 'finder'
    | 'calculator'
    | 'investment'
    | 'emi'
    | 'fd'
    | 'incometax'
    | 'glossary'
    | 'blogs';
  setActiveTab: (
    tab:
      | 'brokers'
      | 'compare'
      | 'finder'
      | 'calculator'
      | 'investment'
      | 'emi'
      | 'fd'
      | 'incometax'
      | 'glossary'
      | 'blogs'
  ) => void;
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
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  const desktopLinks = [
    { id: 'brokers', label: 'Directory', icon: Layers },
    {
      id: 'compare',
      label: 'Compare Tool',
      icon: ArrowLeftRight,
      badge: compareCount > 0 ? compareCount : undefined
    },
    { id: 'calculator', label: 'Brokerage Calculator', icon: Calculator },
    { id: 'investment', label: 'SIP Calculator', icon: PiggyBank },
    { id: 'emi', label: 'EMI Calculator', icon: Calculator },
    { id: 'fd', label: 'FD Calculator', icon: Calculator },
    { id: 'incometax', label: 'Income Tax Calculator', icon: Calculator },
    { id: 'finder', label: 'Broker Finder Quiz', icon: Sparkles },
    { id: 'blogs', label: 'Guides', icon: BookOpen },
    { id: 'glossary', label: 'Glossary', icon: GraduationCap }
  ];

  const mobileLinks = [
    { id: 'brokers', label: 'Home', icon: Layers },
    {
      id: 'compare',
      label: 'Compare',
      icon: ArrowLeftRight,
      badge: compareCount > 0 ? compareCount : undefined
    },
    { id: 'calculator', label: 'Brokerage', icon: Calculator },
    { id: 'investment', label: 'SIP', icon: PiggyBank },
    { id: 'emi', label: 'EMI', icon: Calculator },
    { id: 'fd', label: 'FD', icon: Calculator },
    { id: 'incometax', label: 'Tax', icon: Calculator },
    { id: 'finder', label: 'Quiz', icon: Sparkles },
    { id: 'blogs', label: 'Blogs', icon: BookOpen },
    { id: 'glossary', label: 'Terms', icon: GraduationCap }
  ];

  const handleClick = (id: any) => {
    onBackToBrokers();
    setActiveTab(id);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div
            onClick={() => handleClick('brokers')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-extrabold text-base sm:text-lg shadow-md">
              ₹
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-slate-800 text-sm sm:text-base tracking-tight leading-none">
                BrokerSphere
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold tracking-wider uppercase mt-0.5">
                Smart Comparisons
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {desktopLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleClick(link.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[11px] font-bold tracking-wide transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-600 rounded-b-none'
                      : 'text-slate-800 hover:text-black hover:bg-slate-200/60'
                  }`}
                >
                  <Icon size={13} className={isActive ? 'text-emerald-500' : 'text-slate-400'} />
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

          <button
            onClick={() => handleClick('finder')}
            className="hidden sm:flex lg:hidden items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm"
          >
            <Sparkles size={13} />
            Find
          </button>
        </div>
      </div>

      <div className="lg:hidden border-t border-slate-100 bg-white px-2 py-2">
        <div className="grid grid-cols-5 gap-1.5">
          {mobileLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className={`relative flex flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-2 min-h-[48px] text-[10px] font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-700 border border-slate-100'
                }`}
              >
                <Icon size={14} />
                <span className="leading-none whitespace-nowrap">{link.label}</span>

                {link.badge !== undefined && (
                  <span
                    className={`absolute top-1 right-1 px-1 text-[8px] font-extrabold rounded-full ${
                      isActive ? 'bg-white text-emerald-600' : 'bg-emerald-500 text-white'
                    }`}
                  >
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
