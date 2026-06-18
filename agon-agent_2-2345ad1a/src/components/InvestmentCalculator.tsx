import { useState } from 'react';

export default function InvestmentCalculator() {
  const [mode, setMode] = useState<'sip' | 'lumpsum'>('sip');
  const [monthlyAmount, setMonthlyAmount] = useState('5000');
  const [lumpsumAmount, setLumpsumAmount] = useState('100000');
  const [annualReturn, setAnnualReturn] = useState('12');
  const [years, setYears] = useState('10');
  const [showTaxBreakup, setShowTaxBreakup] = useState(false);

  const rate = Number(annualReturn) / 100 / 12;
  const periodMonths = Number(years) * 12;

  const sipAmount = Number(monthlyAmount) || 0;
  const oneTimeAmount = Number(lumpsumAmount) || 0;

  const investedAmount =
    mode === 'sip' ? sipAmount * periodMonths : oneTimeAmount;

  const futureValue =
    mode === 'sip'
      ? sipAmount *
        ((Math.pow(1 + rate, periodMonths) - 1) / rate) *
        (1 + rate)
      : oneTimeAmount * Math.pow(1 + Number(annualReturn) / 100, Number(years));

  const estimatedReturns = futureValue - investedAmount;

  const isLongTerm = Number(years) > 1;
  const ltcgExemption = isLongTerm ? 125000 : 0;
  const taxableGain = isLongTerm
    ? Math.max(estimatedReturns - ltcgExemption, 0)
    : Math.max(estimatedReturns, 0);

  const taxRate = isLongTerm ? 0.125 : 0.20;
  const taxAmount = taxableGain * taxRate;
  const netTakeHome = futureValue - taxAmount;

  const formatCurrency = (value: number) =>
    `₹${Math.round(value).toLocaleString('en-IN')}`;

  return (
    <section className="py-16 px-4 bg-white text-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            SIP & Lumpsum Calculator
          </h2>
          <p className="text-slate-600">
            Calculate estimated mutual fund returns for SIP and lumpsum investments.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setMode('sip')}
                  className={`p-3 rounded-xl font-bold ${
                    mode === 'sip'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border border-slate-300 text-slate-900'
                  }`}
                >
                  SIP
                </button>

                <button
                  onClick={() => setMode('lumpsum')}
                  className={`p-3 rounded-xl font-bold ${
                    mode === 'lumpsum'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border border-slate-300 text-slate-900'
                  }`}
                >
                  Lumpsum
                </button>
              </div>

              {mode === 'sip' ? (
                <>
                  <label className="block mb-2 font-medium">
                    Monthly SIP Amount
                  </label>
                  <input
                    type="number"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(e.target.value)}
                    className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
                  />
                </>
              ) : (
                <>
                  <label className="block mb-2 font-medium">
                    Lumpsum Investment Amount
                  </label>
                  <input
                    type="number"
                    value={lumpsumAmount}
                    onChange={(e) => setLumpsumAmount(e.target.value)}
                    className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
                  />
                </>
              )}

              <label className="block mb-2 font-medium">
                Expected Annual Return (%)
              </label>
              <input
                type="number"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <label className="block mb-2 font-medium">
                Investment Period (Years)
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold mb-5">Estimated Results</h3>

              <div className="space-y-4">
                <p>
                  Invested Amount:{' '}
                  <strong>{formatCurrency(investedAmount)}</strong>
                </p>

                <p>
                  Estimated Returns:{' '}
                  <strong>{formatCurrency(estimatedReturns)}</strong>
                </p>

                <p className="text-2xl font-bold text-emerald-600">
                  Total Value: {formatCurrency(futureValue)}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 space-y-4">
                <h4 className="text-lg font-bold text-slate-900">
                  Tax Estimate
                </h4>

                <p className="text-sm text-slate-700">
                  Tax Category Applied:{' '}
                  <strong>
                    {isLongTerm
                      ? 'Long Term Capital Gain'
                      : 'Short Term Capital Gain'}
                  </strong>
                </p>

                <p className="text-sm text-slate-600">
                  {isLongTerm
                    ? 'Long term means investment period is more than 12 months.'
                    : 'Short term means investment period is 12 months or less.'}
                </p>

                <button
                  onClick={() => setShowTaxBreakup(!showTaxBreakup)}
                  className="text-sm font-bold text-emerald-700 underline cursor-pointer"
                >
                  Tax Amount: {formatCurrency(taxAmount)}{' '}
                  {showTaxBreakup ? '▲' : '▼'}
                </button>

                {showTaxBreakup && (
                  <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <h5 className="font-bold mb-3 text-slate-900">
                      Tax Calculation Breakdown
                    </h5>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between gap-4">
                        <span>Invested Amount</span>
                        <strong>{formatCurrency(investedAmount)}</strong>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span>Current Value</span>
                        <strong>{formatCurrency(futureValue)}</strong>
                      </div>

                      <div className="flex justify-between gap-4 border-t pt-2">
                        <span>Capital Gain</span>
                        <strong>{formatCurrency(estimatedReturns)}</strong>
                      </div>

                      {isLongTerm && (
                        <div className="flex justify-between gap-4">
                          <span>LTCG Exemption</span>
                          <strong>{formatCurrency(ltcgExemption)}</strong>
                        </div>
                      )}

                      <div className="flex justify-between gap-4">
                        <span>Taxable Gain</span>
                        <strong>{formatCurrency(taxableGain)}</strong>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span>Tax Rate</span>
                        <strong>{isLongTerm ? '12.5%' : '20%'}</strong>
                      </div>

                      <div className="flex justify-between gap-4 border-t pt-2 text-emerald-700 font-bold">
                        <span>Total Tax</span>
                        <span>{formatCurrency(taxAmount)}</span>
                      </div>
                    </div>

                    <div className="mt-4 text-xs text-slate-500 leading-relaxed">
                      Formula used:{' '}
                      {isLongTerm
                        ? 'Taxable Gain = Capital Gain - ₹1,25,000 exemption. Tax = Taxable Gain × 12.5%.'
                        : 'Taxable Gain = Capital Gain. Tax = Taxable Gain × 20%.'}
                    </div>
                  </div>
                )}

                <p className="text-xl font-bold text-emerald-700">
                  Net Take Home Amount: {formatCurrency(netTakeHome)}
                </p>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Tax estimate assumes equity mutual fund taxation: STCG at 20%
                  and LTCG at 12.5% on gains above ₹1.25 lakh. Cess, surcharge,
                  slab impact, indexation, debt fund taxation and fund category
                  differences are not included.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-6">
            Disclaimer: This calculator is for educational purposes only.
            Actual returns and tax may vary based on scheme type, holding period,
            government rules and your personal tax situation.
          </p>
        </div>
      </div>
    </section>
  );
}
