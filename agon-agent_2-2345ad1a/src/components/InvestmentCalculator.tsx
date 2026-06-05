import { useState } from 'react';

export default function InvestmentCalculator() {
  const [mode, setMode] = useState<'sip' | 'lumpsum'>('sip');

  const [sipAmount, setSipAmount] = useState('5000');
  const [lumpsumAmount, setLumpsumAmount] = useState('100000');
  const [rate, setRate] = useState('12');
  const [years, setYears] = useState('10');

  const sip = Number(sipAmount) || 0;
  const lumpsum = Number(lumpsumAmount) || 0;
  const annualReturn = Number(rate) || 0;
  const investmentYears = Number(years) || 0;

  const months = investmentYears * 12;
  const monthlyRate = annualReturn / 12 / 100;
  const annualRate = annualReturn / 100;

  const sipFutureValue =
    monthlyRate > 0
      ? sip *
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate))
      : sip * months;

  const sipInvested = sip * months;
  const sipReturns = sipFutureValue - sipInvested;

  const lumpsumFutureValue = lumpsum * Math.pow(1 + annualRate, investmentYears);
  const lumpsumReturns = lumpsumFutureValue - lumpsum;

  const currentReturns = mode === 'sip' ? sipReturns : lumpsumReturns;
  const currentFutureValue = mode === 'sip' ? sipFutureValue : lumpsumFutureValue;

  const stcgTax = currentReturns > 0 ? currentReturns * 0.20 : 0;
  const taxableLtcg = currentReturns > 125000 ? currentReturns - 125000 : 0;
  const ltcgTax = taxableLtcg * 0.125;

  const netAfterStcg = currentFutureValue - stcgTax;
  const netAfterLtcg = currentFutureValue - ltcgTax;

  const formatCurrency = (value: number) =>
    `₹${Math.round(value).toLocaleString('en-IN')}`;

  return (
    <section className="py-16 px-4 bg-white text-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            SIP & Lumpsum Calculator
          </h2>
          <p className="text-slate-600">
            Calculate estimated mutual fund returns for SIP and lumpsum investments.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setMode('sip')}
              className={`flex-1 py-3 rounded-xl font-semibold ${
                mode === 'sip'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              SIP
            </button>

            <button
              onClick={() => setMode('lumpsum')}
              className={`flex-1 py-3 rounded-xl font-semibold ${
                mode === 'lumpsum'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              Lumpsum
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {mode === 'sip' ? (
                <>
                  <label className="block mb-2 font-medium">Monthly SIP Amount</label>
                  <input
                    type="number"
                    value={sipAmount}
                    onChange={(e) => setSipAmount(e.target.value)}
                    className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
                  />
                </>
              ) : (
                <>
                  <label className="block mb-2 font-medium">Lumpsum Investment Amount</label>
                  <input
                    type="number"
                    value={lumpsumAmount}
                    onChange={(e) => setLumpsumAmount(e.target.value)}
                    className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
                  />
                </>
              )}

              <label className="block mb-2 font-medium">Expected Annual Return (%)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <label className="block mb-2 font-medium">Investment Period (Years)</label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold mb-5">Estimated Results</h3>

              {mode === 'sip' ? (
                <div className="space-y-4">
                  <p>Invested Amount: <strong>{formatCurrency(sipInvested)}</strong></p>
                  <p>Estimated Returns: <strong>{formatCurrency(sipReturns)}</strong></p>
                  <p className="text-2xl font-bold text-emerald-600">
                    Total Value: {formatCurrency(sipFutureValue)}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>Invested Amount: <strong>{formatCurrency(lumpsum)}</strong></p>
                  <p>Estimated Returns: <strong>{formatCurrency(lumpsumReturns)}</strong></p>
                  <p className="text-2xl font-bold text-emerald-600">
                    Total Value: {formatCurrency(lumpsumFutureValue)}
                  </p>
                </div>
              )}

              <div className="mt-6 pt-5 border-t border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900">Tax Estimate</h4>

                <p className="text-sm text-slate-700">
                  Short Term Tax <span className="text-xs text-slate-500">(up to 12 months)</span>: 
                  <strong> {formatCurrency(stcgTax)}</strong>
                </p>

                <p className="text-sm text-slate-700">
                  Net Take Home after Short Term Tax: 
                  <strong> {formatCurrency(netAfterStcg)}</strong>
                </p>

                <p className="text-sm text-slate-700">
                  Long Term Tax <span className="text-xs text-slate-500">(more than 12 months)</span>: 
                  <strong> {formatCurrency(ltcgTax)}</strong>
                </p>

                <p className="text-sm text-slate-700">
                  Net Take Home after Long Term Tax: 
                  <strong> {formatCurrency(netAfterLtcg)}</strong>
                </p>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Tax estimate assumes equity mutual fund taxation: STCG at 20% and LTCG at 12.5% on gains above ₹1.25 lakh. Cess, surcharge, slab impact, and fund category differences are not included.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-6">
            Note: This calculator provides estimated returns only. Actual mutual fund returns may vary.
          </p>
        </div>
      </div>
    </section>
  );
}
