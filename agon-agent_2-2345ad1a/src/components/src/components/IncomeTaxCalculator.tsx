import { useState } from 'react';

export default function IncomeTaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState('1200000');
  const [standardDeduction, setStandardDeduction] = useState('75000');
  const [oldRegimeDeductions, setOldRegimeDeductions] = useState('150000');

  const income = Number(annualIncome) || 0;
  const stdDeduction = Number(standardDeduction) || 0;
  const oldDeductions = Number(oldRegimeDeductions) || 0;

  const taxableNew = Math.max(income - stdDeduction, 0);
  const taxableOld = Math.max(income - 50000 - oldDeductions, 0);

  const calculateNewRegimeTax = (amount: number) => {
    let tax = 0;

    const slabs = [
      { limit: 400000, rate: 0 },
      { limit: 800000, rate: 0.05 },
      { limit: 1200000, rate: 0.10 },
      { limit: 1600000, rate: 0.15 },
      { limit: 2000000, rate: 0.20 },
      { limit: 2400000, rate: 0.25 },
      { limit: Infinity, rate: 0.30 }
    ];

    let previousLimit = 0;

    for (const slab of slabs) {
      if (amount > previousLimit) {
        const taxableInSlab = Math.min(amount, slab.limit) - previousLimit;
        tax += taxableInSlab * slab.rate;
        previousLimit = slab.limit;
      }
    }

    const rebate = amount <= 1200000 ? Math.min(tax, 60000) : 0;
    return Math.max(tax - rebate, 0);
  };

  const calculateOldRegimeTax = (amount: number) => {
    let tax = 0;

    if (amount <= 250000) tax = 0;
    else if (amount <= 500000) tax = (amount - 250000) * 0.05;
    else if (amount <= 1000000) tax = 12500 + (amount - 500000) * 0.20;
    else tax = 112500 + (amount - 1000000) * 0.30;

    const rebate = amount <= 500000 ? Math.min(tax, 12500) : 0;
    return Math.max(tax - rebate, 0);
  };

  const newTaxBeforeCess = calculateNewRegimeTax(taxableNew);
  const oldTaxBeforeCess = calculateOldRegimeTax(taxableOld);

  const newCess = newTaxBeforeCess * 0.04;
  const oldCess = oldTaxBeforeCess * 0.04;

  const newTotalTax = newTaxBeforeCess + newCess;
  const oldTotalTax = oldTaxBeforeCess + oldCess;

  const betterRegime = newTotalTax <= oldTotalTax ? 'New Regime' : 'Old Regime';
  const taxSaving = Math.abs(newTotalTax - oldTotalTax);

  const formatCurrency = (value: number) =>
    `₹${Math.round(value).toLocaleString('en-IN')}`;

  return (
    <section className="py-16 px-4 bg-white text-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Income Tax Calculator
          </h2>
          <p className="text-slate-600">
            Compare old and new tax regime liability for FY 2025-26 / AY 2026-27.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Annual Gross Income</label>
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <label className="block mb-2 font-medium">
                Standard Deduction for New Regime
              </label>
              <input
                type="number"
                value={standardDeduction}
                onChange={(e) => setStandardDeduction(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <label className="block mb-2 font-medium">
                Old Regime Deductions
              </label>
              <input
                type="number"
                value={oldRegimeDeductions}
                onChange={(e) => setOldRegimeDeductions(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <p className="text-xs text-slate-500">
                Example deductions: 80C, 80D, HRA, home loan interest, NPS, etc.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold mb-5">Estimated Tax Result</h3>

              <div className="space-y-4">
                <p>
                  Taxable Income - New Regime:{' '}
                  <strong>{formatCurrency(taxableNew)}</strong>
                </p>

                <p>
                  Taxable Income - Old Regime:{' '}
                  <strong>{formatCurrency(taxableOld)}</strong>
                </p>

                <div className="border-t border-slate-200 pt-4 space-y-3">
                  <p>
                    New Regime Tax before Cess:{' '}
                    <strong>{formatCurrency(newTaxBeforeCess)}</strong>
                  </p>

                  <p>
                    New Regime Cess 4%:{' '}
                    <strong>{formatCurrency(newCess)}</strong>
                  </p>

                  <p className="font-bold text-emerald-700">
                    Total Tax - New Regime:{' '}
                    {formatCurrency(newTotalTax)}
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-4 space-y-3">
                  <p>
                    Old Regime Tax before Cess:{' '}
                    <strong>{formatCurrency(oldTaxBeforeCess)}</strong>
                  </p>

                  <p>
                    Old Regime Cess 4%:{' '}
                    <strong>{formatCurrency(oldCess)}</strong>
                  </p>

                  <p className="font-bold text-emerald-700">
                    Total Tax - Old Regime:{' '}
                    {formatCurrency(oldTotalTax)}
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                  <p className="font-bold text-emerald-800">
                    Better Option: {betterRegime}
                  </p>
                  <p className="text-sm text-emerald-700 mt-1">
                    Estimated Tax Difference: {formatCurrency(taxSaving)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-6 leading-relaxed">
            Disclaimer: This is a simplified income tax calculator for resident salaried individuals. It does not include surcharge, marginal relief, special-rate income, capital gains, business income, agriculture income, house property rules, HRA calculation, NPS employer contribution, or other advanced provisions. Please verify with a tax professional before filing your return.
          </p>
        </div>
      </div>
    </section>
  );
}
