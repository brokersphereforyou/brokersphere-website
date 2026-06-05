import { useState } from 'react';

export default function FdCalculator() {
  const [fdAmount, setFdAmount] = useState('100000');
  const [fdRate, setFdRate] = useState('7');
  const [fdYears, setFdYears] = useState('5');
  const [taxSlab, setTaxSlab] = useState('10');
  const [isSeniorCitizen, setIsSeniorCitizen] = useState(false);
  const [hasPan, setHasPan] = useState(true);

  const fdPrincipal = Number(fdAmount) || 0;
  const fdAnnualRate = (Number(fdRate) || 0) / 100;
  const fdPeriod = Number(fdYears) || 0;
  const taxRate = (Number(taxSlab) || 0) / 100;

  const fdMaturityAmount =
    fdPrincipal * Math.pow(1 + fdAnnualRate / 4, 4 * fdPeriod);

  const fdInterest = fdMaturityAmount - fdPrincipal;

  const estimatedTax = fdInterest * taxRate;

  const annualInterest = fdPeriod > 0 ? fdInterest / fdPeriod : 0;
  const tdsThreshold = isSeniorCitizen ? 100000 : 50000;
  const tdsRate = hasPan ? 0.10 : 0.20;

  const estimatedTds =
    annualInterest > tdsThreshold ? fdInterest * tdsRate : 0;

  const netTakeHomeAfterTaxAndTds = fdMaturityAmount - estimatedTax;

  const formatCurrency = (value: number) =>
    `₹${Math.round(value).toLocaleString('en-IN')}`;

  return (
    <section className="py-16 px-4 bg-white text-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            FD Calculator
          </h2>
          <p className="text-slate-600">
            Calculate fixed deposit maturity amount, tax estimate, TDS and net take-home value.
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

              <label className="block mb-2 font-medium">Your Income Tax Slab</label>
              <select
                value={taxSlab}
                onChange={(e) => setTaxSlab(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              >
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="10">10%</option>
                <option value="20">20%</option>
                <option value="30">30%</option>
              </select>

              <label className="flex items-center gap-2 text-sm font-medium mb-3">
                <input
                  type="checkbox"
                  checked={isSeniorCitizen}
                  onChange={(e) => setIsSeniorCitizen(e.target.checked)}
                />
                Senior Citizen
              </label>

              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={hasPan}
                  onChange={(e) => setHasPan(e.target.checked)}
                />
                PAN Available
              </label>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold mb-5">Estimated Results</h3>

              <div className="space-y-4">
                <p>
                  Invested Amount:{' '}
                  <strong>{formatCurrency(fdPrincipal)}</strong>
                </p>

                <p>
                  Gross Interest Earned:{' '}
                  <strong>{formatCurrency(fdInterest)}</strong>
                </p>

                <p className="text-2xl font-bold text-emerald-600">
                  Maturity Amount: {formatCurrency(fdMaturityAmount)}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900">
                  Tax & Net Take Home Estimate
                </h4>

                <p className="text-sm text-slate-700">
                  Tax on FD Interest as per Selected Slab:{' '}
                  <strong>{formatCurrency(estimatedTax)}</strong>
                </p>

                <p className="text-sm text-slate-700">
                  Estimated Bank TDS:{' '}
                  <strong>{formatCurrency(estimatedTds)}</strong>
                </p>

                <p className="text-lg font-bold text-emerald-700">
                  Net Take Home Amount after Tax & TDS:{' '}
                  {formatCurrency(netTakeHomeAfterTaxAndTds)}
                </p>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  <strong>TDS Rule:</strong> Banks generally deduct TDS if annual FD
                  interest exceeds ₹50,000 for non-senior citizens or ₹1,00,000
                  for senior citizens. TDS is normally deducted at 10% when PAN is
                  available and may be 20% without PAN.

                  <br /><br />

                  <strong>Disclaimer:</strong> FD interest is taxable as “Income
                  from Other Sources” as per your applicable income tax slab. TDS is
                  not an additional tax; it is only an advance tax deducted by the
                  bank. The net take-home amount shown is an estimate after applying
                  the selected tax slab on total FD interest. Your actual tax,
                  refund, or additional payable amount may vary based on your total
                  income, deductions, tax regime, Form 15G/15H eligibility, PAN
                  status, bank-specific practices, and final ITR filing.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-6">
            Note: FD result assumes quarterly compounding and uses average annual
            interest for TDS threshold estimation. Actual maturity value and TDS may
            vary based on bank rules, interest credit frequency, compounding method,
            tax regime, PAN status, and Form 15G/15H eligibility.
          </p>
        </div>
      </div>
    </section>
  );
}
