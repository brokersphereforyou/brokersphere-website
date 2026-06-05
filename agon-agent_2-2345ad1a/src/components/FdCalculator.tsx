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

  const amountReceivedAfterTds = fdMaturityAmount - estimatedTds;
  const additionalTaxPayable = Math.max(estimatedTax - estimatedTds, 0);
  const refundExpected = Math.max(estimatedTds - estimatedTax, 0);
  const netTakeHomeAfterFinalTax = fdMaturityAmount - estimatedTax;

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
            Calculate fixed deposit maturity amount, tax estimate, TDS and final net take-home value.
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
                <p>Invested Amount: <strong>{formatCurrency(fdPrincipal)}</strong></p>
                <p>Gross Interest Earned: <strong>{formatCurrency(fdInterest)}</strong></p>
                <p className="text-2xl font-bold text-emerald-600">
                  Maturity Amount: {formatCurrency(fdMaturityAmount)}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900">Tax & Net Take Home Estimate</h4>

                <p className="text-sm text-slate-700">
                  Actual Tax Liability as per Selected Slab:{' '}
                  <strong>{formatCurrency(estimatedTax)}</strong>
                </p>

                <p className="text-sm text-slate-700">
                  Estimated Bank TDS:{' '}
                  <strong>{formatCurrency(estimatedTds)}</strong>
                </p>

                <p className="text-sm text-slate-700">
                  Amount Received after TDS:{' '}
                  <strong>{formatCurrency(amountReceivedAfterTds)}</strong>
                </p>

                {additionalTaxPayable > 0 ? (
                  <p className="text-sm text-red-600">
                    Additional Tax Payable while Filing ITR:{' '}
                    <strong>{formatCurrency(additionalTaxPayable)}</strong>
                  </p>
                ) : (
                  <p className="text-sm text-emerald-700">
                    Refund Expected while Filing ITR:{' '}
                    <strong>{formatCurrency(refundExpected)}</strong>
                  </p>
                )}

                <p className="text-lg font-bold text-emerald-700">
                  Net Take Home Amount after Final Tax:{' '}
                  {formatCurrency(netTakeHomeAfterFinalTax)}
                </p>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  TDS rule: Banks generally deduct TDS if annual FD interest exceeds ₹50,000 for non-senior citizens or ₹1,00,000 for senior citizens. Once the threshold is crossed, TDS is generally calculated on the interest credited, not only on the excess amount. TDS is 10% if PAN is available and may be 20% if PAN is not available. TDS is not final tax; final liability depends on your income tax slab and ITR filing. FD interest is taxable under “Income from Other Sources”.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-6">
            Note: FD result assumes quarterly compounding and uses average annual interest for TDS threshold estimation. Actual bank TDS may vary based on interest credit frequency, Form 15G/15H, PAN status, total income, and bank rules.
          </p>
        </div>
      </div>
    </section>
  );
}
