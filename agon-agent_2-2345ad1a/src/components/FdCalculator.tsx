import { useState } from 'react';

export default function FdCalculator() {
  const [fdAmount, setFdAmount] = useState('100000');
  const [fdRate, setFdRate] = useState('7');
  const [fdYears, setFdYears] = useState('5');

  const fdPrincipal = Number(fdAmount) || 0;
  const fdAnnualRate = (Number(fdRate) || 0) / 100;
  const fdPeriod = Number(fdYears) || 0;

  const fdMaturityAmount =
    fdPrincipal * Math.pow(1 + fdAnnualRate / 4, 4 * fdPeriod);

  const fdInterest = fdMaturityAmount - fdPrincipal;

  const formatCurrency = (value: number) =>
    `₹${Math.round(value).toLocaleString('en-IN')}`;

  return (
    <section className="py-16 px-4 bg-white text-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            FD Calculator
          </h2>
          <p className="text-slate-600">
            Calculate your fixed deposit maturity amount and estimated interest.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">FD Investment Amount</label>
              <input
                type="number"
                value={fdAmount}
                onChange={(e) => setFdAmount(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <label className="block mb-2 font-medium">Annual Interest Rate (%)</label>
              <input
                type="number"
                value={fdRate}
                onChange={(e) => setFdRate(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <label className="block mb-2 font-medium">FD Tenure (Years)</label>
              <input
                type="number"
                value={fdYears}
                onChange={(e) => setFdYears(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold mb-5">Estimated Results</h3>

              <div className="space-y-4">
                <p>Invested Amount: <strong>{formatCurrency(fdPrincipal)}</strong></p>
                <p>Estimated Interest: <strong>{formatCurrency(fdInterest)}</strong></p>
                <p className="text-2xl font-bold text-emerald-600">
                  Maturity Amount: {formatCurrency(fdMaturityAmount)}
                </p>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed mt-6">
                Note: FD result assumes quarterly compounding. Actual maturity value may vary by bank, compounding frequency, TDS, and tax rules.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
