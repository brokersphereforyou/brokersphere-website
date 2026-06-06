import React from 'react';

const exchanges = [
  {
    name: 'Binance',
    country: 'Global',
    spotFee: '0.10%',
    futuresFee: '0.02% / 0.05%',
    coins: '350+',
    rating: '9.5/10'
  },
  {
    name: 'Bybit',
    country: 'Global',
    spotFee: '0.10%',
    futuresFee: '0.02% / 0.055%',
    coins: '500+',
    rating: '9.3/10'
  },
  {
    name: 'Coinbase',
    country: 'USA',
    spotFee: '0.40%',
    futuresFee: 'N/A',
    coins: '250+',
    rating: '8.8/10'
  },
  {
    name: 'Kraken',
    country: 'USA',
    spotFee: '0.16%',
    futuresFee: '0.02% / 0.05%',
    coins: '250+',
    rating: '9.0/10'
  },
  {
    name: 'CoinDCX',
    country: 'India',
    spotFee: '0.50%',
    futuresFee: '0.02% / 0.05%',
    coins: '500+',
    rating: '8.5/10'
  },
  {
    name: 'Mudrex',
    country: 'India',
    spotFee: '0.25%',
    futuresFee: 'No Futures',
    coins: '350+',
    rating: '8.7/10'
  },
  {
    name: 'ZebPay',
    country: 'India',
    spotFee: '0.15%',
    futuresFee: 'No Futures',
    coins: '150+',
    rating: '8.0/10'
  }
];

export default function CryptoExchangeCompare() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left p-4">Exchange</th>
              <th className="text-left p-4">Country</th>
              <th className="text-left p-4">Spot Fee</th>
              <th className="text-left p-4">Futures Fee</th>
              <th className="text-left p-4">Coins</th>
              <th className="text-left p-4">Rating</th>
            </tr>
          </thead>

          <tbody>
            {exchanges.map((exchange) => (
              <tr
                key={exchange.name}
                className="border-t border-slate-100"
              >
                <td className="p-4 font-bold">{exchange.name}</td>
                <td className="p-4">{exchange.country}</td>
                <td className="p-4">{exchange.spotFee}</td>
                <td className="p-4">{exchange.futuresFee}</td>
                <td className="p-4">{exchange.coins}</td>
                <td className="p-4 text-emerald-600 font-bold">
                  {exchange.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
