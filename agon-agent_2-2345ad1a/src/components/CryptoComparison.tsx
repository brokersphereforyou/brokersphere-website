import { useMemo, useState } from 'react';
import { Search, ShieldCheck, Globe2, AlertTriangle } from 'lucide-react';

type CryptoPlatform = {
  name: string;
  type: 'Indian' | 'Global';
  status: 'Active in India' | 'Global Access' | 'Check Before Use';
  tradingFee: string;
  coins: string;
  inrSupport: string;
  futures: string;
  staking: string;
  cryptoSip: string;
  bestFor: string;
  rating: number;
  riskNote: string;
};

const cryptoPlatforms: CryptoPlatform[] = [
  {
    name: 'CoinDCX',
    type: 'Indian',
    status: 'Active in India',
    tradingFee: 'Low to Medium',
    coins: '500+',
    inrSupport: 'Yes',
    futures: 'Yes',
    staking: 'Yes',
    cryptoSip: 'Yes',
    bestFor: 'Indian beginners and active traders',
    rating: 4.5,
    riskNote: 'Indian platform; verify latest fees and TDS rules.'
  },
  {
    name: 'CoinSwitch',
    type: 'Indian',
    status: 'Active in India',
    tradingFee: 'Spread based',
    coins: '250+',
    inrSupport: 'Yes',
    futures: 'Limited / Check',
    staking: 'Limited',
    cryptoSip: 'Yes',
    bestFor: 'Simple crypto investing',
    rating: 4.3,
    riskNote: 'Good for beginners; check spread before buying.'
  },
  {
    name: 'Mudrex',
    type: 'Indian',
    status: 'Active in India',
    tradingFee: 'Low to Medium',
    coins: '350+',
    inrSupport: 'Yes',
    futures: 'Check',
    staking: 'Yes',
    cryptoSip: 'Yes',
    bestFor: 'Crypto baskets and SIP-style investing',
    rating: 4.4,
    riskNote: 'Check product risk before using coin baskets.'
  },
  {
    name: 'ZebPay',
    type: 'Indian',
    status: 'Active in India',
    tradingFee: 'Medium',
    coins: '150+',
    inrSupport: 'Yes',
    futures: 'No / Limited',
    staking: 'Yes',
    cryptoSip: 'No / Limited',
    bestFor: 'Long-term crypto holders',
    rating: 4.0,
    riskNote: 'Older Indian exchange; verify current fee structure.'
  },
  {
    name: 'Unocoin',
    type: 'Indian',
    status: 'Active in India',
    tradingFee: 'Medium',
    coins: 'Limited',
    inrSupport: 'Yes',
    futures: 'No',
    staking: 'No / Limited',
    cryptoSip: 'Yes',
    bestFor: 'Bitcoin-focused users',
    rating: 3.8,
    riskNote: 'Limited coins compared with larger exchanges.'
  },
  {
    name: 'Giottus',
    type: 'Indian',
    status: 'Active in India',
    tradingFee: 'Low to Medium',
    coins: '200+',
    inrSupport: 'Yes',
    futures: 'Check',
    staking: 'Yes',
    cryptoSip: 'Check',
    bestFor: 'Indian altcoin investors',
    rating: 4.0,
    riskNote: 'Check liquidity before trading small coins.'
  },
  {
    name: 'Binance',
    type: 'Global',
    status: 'Global Access',
    tradingFee: 'Low',
    coins: '350+',
    inrSupport: 'P2P / Check',
    futures: 'Yes',
    staking: 'Yes',
    cryptoSip: 'Auto-invest',
    bestFor: 'Advanced global crypto traders',
    rating: 4.7,
    riskNote: 'Global platform; Indian users should verify latest FIU/compliance and INR access.'
  },
  {
    name: 'Coinbase',
    type: 'Global',
    status: 'Active in India',
    tradingFee: 'Medium to High',
    coins: '200+',
    inrSupport: 'Yes / rolling out',
    futures: 'Limited / Check',
    staking: 'Yes',
    cryptoSip: 'Recurring buy',
    bestFor: 'Users wanting a large global brand',
    rating: 4.4,
    riskNote: 'Verify Indian INR deposit/withdrawal availability before use.'
  },
  {
    name: 'KuCoin',
    type: 'Global',
    status: 'Global Access',
    tradingFee: 'Low',
    coins: '700+',
    inrSupport: 'P2P / Check',
    futures: 'Yes',
    staking: 'Yes',
    cryptoSip: 'Trading bot / recurring features',
    bestFor: 'Altcoin and global market users',
    rating: 4.3,
    riskNote: 'Global platform; verify latest India access and compliance.'
  },
  {
    name: 'Bybit',
    type: 'Global',
    status: 'Check Before Use',
    tradingFee: 'Low',
    coins: '500+',
    inrSupport: 'P2P / Check',
    futures: 'Yes',
    staking: 'Yes',
    cryptoSip: 'Auto-invest',
    bestFor: 'Advanced futures traders',
    rating: 4.2,
    riskNote: 'High-risk derivatives platform; check India availability and compliance before use.'
  },
  {
    name: 'OKX',
    type: 'Global',
    status: 'Check Before Use',
    tradingFee: 'Low',
    coins: '300+',
    inrSupport: 'P2P / Check',
    futures: 'Yes',
    staking: 'Yes',
    cryptoSip: 'Earn products',
    bestFor: 'Global crypto trading tools',
    rating: 4.1,
    riskNote: 'Check India availability, restrictions and withdrawal support.'
  },
  {
    name: 'Kraken',
    type: 'Global',
    status: 'Check Before Use',
    tradingFee: 'Low to Medium',
    coins: '200+',
    inrSupport: 'No direct INR / Check',
    futures: 'Yes',
    staking: 'Yes',
    cryptoSip: 'No / Limited',
    bestFor: 'Security-focused global users',
    rating: 4.2,
    riskNote: 'May not be convenient for INR users.'
  }
];

export default function CryptoComparison() {
  const [search, setSearch] = useState('');
  const [platformType, setPlatformType] = useState<'All' | 'Indian' | 'Global'>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');

  const filteredPlatforms = useMemo(() => {
    let result = [...cryptoPlatforms];

    if (platformType !== 'All') {
      result = result.filter((item) => item.type === platformType);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.bestFor.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [search, platformType, sortBy]);

  return (
    <section className="py-16 px-4 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Crypto Trading Platform Comparison
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Compare Indian and global crypto exchanges by fees, INR support, coins,
            futures, staking, crypto SIP and suitability for Indian users.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-6">
          <div className="grid lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-bold mb-2">
                Search Platform
              </label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Example: CoinDCX, Binance, Coinbase, KuCoin..."
                  className="w-full pl-10 p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Platform Type
              </label>
              <select
                value={platformType}
                onChange={(e) => setPlatformType(e.target.value as any)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
              >
                <option value="All">All Platforms</option>
                <option value="Indian">Indian Platforms</option>
                <option value="Global">Global Platforms</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900"
              >
                <option value="rating">Highest Rating</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {filteredPlatforms.slice(0, 3).map((platform, index) => (
            <div
              key={platform.name}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="text-xs font-bold text-emerald-700 mb-2">
                #{index + 1} in current filter
              </div>
              <h3 className="font-extrabold text-slate-900 mb-2">
                {platform.name}
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                {platform.type} • {platform.status}
              </p>
              <div className="flex justify-between text-sm">
                <span>Rating</span>
                <strong className="text-emerald-700">{platform.rating}/5</strong>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Best For</span>
                <strong className="text-right max-w-[180px]">{platform.bestFor}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1200px]">
              <thead className="bg-slate-100 text-slate-700 text-xs uppercase">
                <tr>
                  <th className="p-4">Platform</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Trading Fee</th>
                  <th className="p-4">Coins</th>
                  <th className="p-4">INR Support</th>
                  <th className="p-4">Futures</th>
                  <th className="p-4">Staking</th>
                  <th className="p-4">Crypto SIP</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Best For</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredPlatforms.map((platform) => (
                  <tr key={platform.name} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">
                        {platform.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {platform.riskNote}
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-bold ${
                          platform.type === 'Indian'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {platform.type === 'Indian' ? 'Indian' : 'Global'}
                      </span>
                    </td>

                    <td className="p-4 text-sm font-semibold">
                      {platform.status}
                    </td>
                    <td className="p-4 text-sm">{platform.tradingFee}</td>
                    <td className="p-4 text-sm">{platform.coins}</td>
                    <td className="p-4 text-sm">{platform.inrSupport}</td>
                    <td className="p-4 text-sm">{platform.futures}</td>
                    <td className="p-4 text-sm">{platform.staking}</td>
                    <td className="p-4 text-sm">{platform.cryptoSip}</td>
                    <td className="p-4 font-bold text-emerald-700">
                      {platform.rating}/5
                    </td>
                    <td className="p-4 text-sm text-slate-700 max-w-[220px]">
                      {platform.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-900 leading-relaxed">
            <div className="flex items-center gap-2 font-bold mb-2">
              <AlertTriangle size={18} />
              Important Crypto Risk Disclaimer
            </div>
            Crypto is highly volatile and can result in major losses. This comparison is for education only.
            Always verify whether a platform is currently available, compliant, and suitable for Indian users before depositing money.
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-sm text-emerald-900 leading-relaxed">
            <div className="flex items-center gap-2 font-bold mb-2">
              <ShieldCheck size={18} />
              India Tax Reminder
            </div>
            In India, crypto gains are generally taxed under VDA rules. TDS and tax treatment can change,
            so users should consult a qualified tax advisor before trading or investing.
          </div>
        </div>

        <div className="mt-5 bg-blue-50 border border-blue-200 rounded-2xl p-5 text-sm text-blue-900 leading-relaxed">
          <div className="flex items-center gap-2 font-bold mb-2">
            <Globe2 size={18} />
            Global Platform Note
          </div>
          Global exchanges may offer more coins and advanced products, but INR support, withdrawals,
          compliance, and availability for Indian users can change quickly. Use only after verifying latest status.
        </div>
      </div>
    </section>
  );
}
