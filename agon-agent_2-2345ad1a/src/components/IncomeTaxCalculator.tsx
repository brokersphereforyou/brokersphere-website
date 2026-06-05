import { useState } from 'react';

type BreakupRow = {
  slab: string;
  rate: string;
  taxableAmount: number;
  tax: number;
};

export default function IncomeTaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState('1200000');
  const [monthlyExpenses, setMonthlyExpenses] = useState('40000');
  const [currentInvestment, setCurrentInvestment] = useState('50000');
  const [healthInsurance, setHealthInsurance] = useState('25000');
  const [npsContribution, setNpsContribution] = useState('0');
  const [homeLoanInterest, setHomeLoanInterest] = useState('0');

  const [showNewBreakup, setShowNewBreakup] = useState(false);
  const [showOldBreakup, setShowOldBreakup] = useState(false);

  const income = Number(annualIncome) || 0;
  const expenses = Number(monthlyExpenses) || 0;
  const investment80C = Math.min(Number(currentInvestment) || 0, 150000);
  const insurance80D = Math.min(Number(healthInsurance) || 0, 25000);
  const nps80CCD = Math.min(Number(npsContribution) || 0, 50000);
  const homeLoan = Math.min(Number(homeLoanInterest) || 0, 200000);

  const newStandardDeduction = 75000;
  const oldStandardDeduction = 50000;

  const taxableNew = Math.max(income - newStandardDeduction, 0);
  const taxableOld = Math.max(
    income -
      oldStandardDeduction -
      investment80C -
      insurance80D -
      nps80CCD -
      homeLoan,
    0
  );

  const formatCurrency = (value: number) =>
    `₹${Math.round(value).toLocaleString('en-IN')}`;

  const calculateNewRegime = (amount: number) => {
    const slabs = [
      { from: 0, to: 400000, rate: 0, label: '₹0 - ₹4,00,000' },
      { from: 400000, to: 800000, rate: 0.05, label: '₹4,00,001 - ₹8,00,000' },
      { from: 800000, to: 1200000, rate: 0.10, label: '₹8,00,001 - ₹12,00,000' },
      { from: 1200000, to: 1600000, rate: 0.15, label: '₹12,00,001 - ₹16,00,000' },
      { from: 1600000, to: 2000000, rate: 0.20, label: '₹16,00,001 - ₹20,00,000' },
      { from: 2000000, to: 2400000, rate: 0.25, label: '₹20,00,001 - ₹24,00,000' },
      { from: 2400000, to: Infinity, rate: 0.30, label: 'Above ₹24,00,000' }
    ];

    let tax = 0;
    const breakup: BreakupRow[] = [];

    slabs.forEach((slab) => {
      const taxableAmount = Math.max(Math.min(amount, slab.to) - slab.from, 0);
      const slabTax = taxableAmount * slab.rate;

      if (taxableAmount > 0) {
        breakup.push({
          slab: slab.label,
          rate: `${slab.rate * 100}%`,
          taxableAmount,
          tax: slabTax
        });
      }

      tax += slabTax;
    });

    const rebate = amount <= 1200000 ? Math.min(tax, 60000) : 0;
    const taxAfterRebate = Math.max(tax - rebate, 0);
    const cess = taxAfterRebate * 0.04;
    const totalTax = taxAfterRebate + cess;

    return { tax, rebate, taxAfterRebate, cess, totalTax, breakup };
  };

  const calculateOldRegime = (amount: number) => {
    const slabs = [
      { from: 0, to: 250000, rate: 0, label: '₹0 - ₹2,50,000' },
      { from: 250000, to: 500000, rate: 0.05, label: '₹2,50,001 - ₹5,00,000' },
      { from: 500000, to: 1000000, rate: 0.20, label: '₹5,00,001 - ₹10,00,000' },
      { from: 1000000, to: Infinity, rate: 0.30, label: 'Above ₹10,00,000' }
    ];

    let tax = 0;
    const breakup: BreakupRow[] = [];

    slabs.forEach((slab) => {
      const taxableAmount = Math.max(Math.min(amount, slab.to) - slab.from, 0);
      const slabTax = taxableAmount * slab.rate;

      if (taxableAmount > 0) {
        breakup.push({
          slab: slab.label,
          rate: `${slab.rate * 100}%`,
          taxableAmount,
          tax: slabTax
        });
      }

      tax += slabTax;
    });

    const rebate = amount <= 500000 ? Math.min(tax, 12500) : 0;
    const taxAfterRebate = Math.max(tax - rebate, 0);
    const cess = taxAfterRebate * 0.04;
    const totalTax = taxAfterRebate + cess;

    return { tax, rebate, taxAfterRebate, cess, totalTax, breakup };
  };

  const newResult = calculateNewRegime(taxableNew);
  const oldResult = calculateOldRegime(taxableOld);

  const betterRegime =
    newResult.totalTax <= oldResult.totalTax ? 'New Regime' : 'Old Regime';

  const taxSaving = Math.abs(newResult.totalTax - oldResult.totalTax);

  const netAnnualNew = income - newResult.totalTax;
  const netMonthlyNew = netAnnualNew / 12;

  const netAnnualOld = income - oldResult.totalTax;
  const netMonthlyOld = netAnnualOld / 12;

  const annualExpenses = expenses * 12;
  const currentSavingsAfterExpenses = Math.max(income - annualExpenses, 0);

  const remaining80C = Math.max(150000 - investment80C, 0);
  const remainingNps = Math.max(50000 - nps80CCD, 0);
  const remainingHealthInsurance = Math.max(25000 - insurance80D, 0);

  const marginalOldRate =
    taxableOld > 1000000
      ? 0.30
      : taxableOld > 500000
      ? 0.20
      : taxableOld > 250000
      ? 0.05
      : 0;

  const scenario1Investment =
    remaining80C + remainingNps + remainingHealthInsurance;

  const scenario1TaxSaving = scenario1Investment * marginalOldRate * 1.04;

  const scenario2Investment =
    Math.min(remaining80C, 75000) +
    Math.min(remainingNps, 25000) +
    Math.min(remainingHealthInsurance, 15000);

  const scenario2TaxSaving = scenario2Investment * marginalOldRate * 1.04;

  const scenario3Investment =
    Math.min(remaining80C, 25000) + Math.min(remainingHealthInsurance, 10000);

  const scenario3TaxSaving = scenario3Investment * marginalOldRate * 1.04;

  const TaxBreakupTable = ({ result }: { result: ReturnType<typeof calculateNewRegime> }) => (
    <div className="mt-4 overflow-x-auto border border-slate-200 rounded-xl">
      <table className="w-full text-left text-xs min-w-[520px]">
        <thead className="bg-slate-50 text-slate-700 uppercase">
          <tr>
            <th className="p-3">Slab</th>
            <th className="p-3">Rate</th>
            <th className="p-3">Taxable Amount</th>
            <th className="p-3">Tax</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {result.breakup.map((row, index) => (
            <tr key={index}>
              <td className="p-3">{row.slab}</td>
              <td className="p-3">{row.rate}</td>
              <td className="p-3">{formatCurrency(row.taxableAmount)}</td>
              <td className="p-3 font-semibold">{formatCurrency(row.tax)}</td>
            </tr>
          ))}
          <tr>
            <td className="p-3 font-bold" colSpan={3}>Less: Rebate</td>
            <td className="p-3 font-bold">{formatCurrency(result.rebate)}</td>
          </tr>
          <tr>
            <td className="p-3 font-bold" colSpan={3}>Tax Before Cess</td>
            <td className="p-3 font-bold">{formatCurrency(result.taxAfterRebate)}</td>
          </tr>
          <tr>
            <td className="p-3 font-bold" colSpan={3}>Health & Education Cess 4%</td>
            <td className="p-3 font-bold">{formatCurrency(result.cess)}</td>
          </tr>
          <tr className="bg-emerald-50">
            <td className="p-3 font-extrabold text-emerald-700" colSpan={3}>
              Total Tax
            </td>
            <td className="p-3 font-extrabold text-emerald-700">
              {formatCurrency(result.totalTax)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <section className="py-16 px-4 bg-white text-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Income Tax Calculator
          </h2>
          <p className="text-slate-600">
            Compare old vs new tax regime, estimate monthly take-home salary and get old-regime tax-saving scenarios.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-5">Income & Investment Details</h3>

              <label className="block mb-2 font-medium">
                Annual Gross Income Including Bonus
              </label>
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <label className="block mb-2 font-medium">
                Monthly Expenses
              </label>
              <input
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <label className="block mb-2 font-medium">
                Current 80C Investment
              </label>
              <input
                type="number"
                value={currentInvestment}
                onChange={(e) => setCurrentInvestment(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <label className="block mb-2 font-medium">
                Health Insurance Premium
              </label>
              <input
                type="number"
                value={healthInsurance}
                onChange={(e) => setHealthInsurance(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <label className="block mb-2 font-medium">
                NPS Contribution
              </label>
              <input
                type="number"
                value={npsContribution}
                onChange={(e) => setNpsContribution(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <label className="block mb-2 font-medium">
                Home Loan Interest
              </label>
              <input
                type="number"
                value={homeLoanInterest}
                onChange={(e) => setHomeLoanInterest(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-800 leading-relaxed">
                Standard deduction considered automatically:
                <br />
                <strong>New Regime:</strong> ₹75,000
                <br />
                <strong>Old Regime:</strong> ₹50,000
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-5">Tax Result</h3>

              <div className="space-y-4">
                <p>
                  Taxable Income - New Regime:{' '}
                  <strong>{formatCurrency(taxableNew)}</strong>
                </p>

                <p>
                  Taxable Income - Old Regime:{' '}
                  <strong>{formatCurrency(taxableOld)}</strong>
                </p>

                <div className="border-t border-slate-200 pt-4">
                  <button
                    onClick={() => setShowNewBreakup(!showNewBreakup)}
                    className="w-full text-left font-bold text-emerald-700 hover:underline"
                  >
                    New Regime Tax before Cess:{' '}
                    {formatCurrency(newResult.taxAfterRebate)} {showNewBreakup ? '▲' : '▼'}
                  </button>

                  {showNewBreakup && <TaxBreakupTable result={newResult} />}

                  <p className="mt-3">
                    New Regime Cess 4%:{' '}
                    <strong>{formatCurrency(newResult.cess)}</strong>
                  </p>

                  <p className="font-bold text-emerald-700 mt-2">
                    Total Tax - New Regime: {formatCurrency(newResult.totalTax)}
                  </p>

                  <p className="text-sm text-slate-600 mt-1">
                    Net Monthly Take Home - New Regime:{' '}
                    <strong>{formatCurrency(netMonthlyNew)}</strong>
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <button
                    onClick={() => setShowOldBreakup(!showOldBreakup)}
                    className="w-full text-left font-bold text-emerald-700 hover:underline"
                  >
                    Old Regime Tax before Cess:{' '}
                    {formatCurrency(oldResult.taxAfterRebate)} {showOldBreakup ? '▲' : '▼'}
                  </button>

                  {showOldBreakup && <TaxBreakupTable result={oldResult} />}

                  <p className="mt-3">
                    Old Regime Cess 4%:{' '}
                    <strong>{formatCurrency(oldResult.cess)}</strong>
                  </p>

                  <p className="font-bold text-emerald-700 mt-2">
                    Total Tax - Old Regime: {formatCurrency(oldResult.totalTax)}
                  </p>

                  <p className="text-sm text-slate-600 mt-1">
                    Net Monthly Take Home - Old Regime:{' '}
                    <strong>{formatCurrency(netMonthlyOld)}</strong>
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

          <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2">
              Top 3 Old Regime Tax Saving Scenarios
            </h3>
            <p className="text-sm text-slate-500 mb-5">
              These suggestions apply only to the old regime and are based on your current investments, expenses and possible liquidity needs.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-emerald-100 bg-emerald-50 rounded-2xl p-5">
                <h4 className="font-bold text-emerald-800 mb-2">
                  1. Maximum Tax Saving
                </h4>
                <p className="text-sm text-slate-700 mb-3">
                  Best for long-term wealth creation and users who do not need this money soon.
                </p>
                <p className="text-xs text-slate-600">
                  Use remaining 80C, NPS and health insurance limits.
                </p>
                <p className="font-bold text-emerald-700 mt-3">
                  Suggested Investment: {formatCurrency(scenario1Investment)}
                </p>
                <p className="font-bold text-emerald-700">
                  Approx Tax Saving: {formatCurrency(scenario1TaxSaving)}
                </p>
              </div>

              <div className="border border-blue-100 bg-blue-50 rounded-2xl p-5">
                <h4 className="font-bold text-blue-800 mb-2">
                  2. Balanced Plan
                </h4>
                <p className="text-sm text-slate-700 mb-3">
                  Best if you may need money in 3-5 years but still want tax savings.
                </p>
                <p className="text-xs text-slate-600">
                  Split between 80C, NPS and insurance without locking too much cash.
                </p>
                <p className="font-bold text-blue-700 mt-3">
                  Suggested Investment: {formatCurrency(scenario2Investment)}
                </p>
                <p className="font-bold text-blue-700">
                  Approx Tax Saving: {formatCurrency(scenario2TaxSaving)}
                </p>
              </div>

              <div className="border border-amber-100 bg-amber-50 rounded-2xl p-5">
                <h4 className="font-bold text-amber-800 mb-2">
                  3. Liquidity First
                </h4>
                <p className="text-sm text-slate-700 mb-3">
                  Best if you need money in the short term for emergency, job change, house purchase or loan repayment.
                </p>
                <p className="text-xs text-slate-600">
                  Keep higher cash balance and invest only minimum amount for basic tax benefit.
                </p>
                <p className="font-bold text-amber-700 mt-3">
                  Suggested Investment: {formatCurrency(scenario3Investment)}
                </p>
                <p className="font-bold text-amber-700">
                  Approx Tax Saving: {formatCurrency(scenario3TaxSaving)}
                </p>
              </div>
            </div>

            <div className="mt-5 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
              Estimated annual amount left after monthly expenses:{' '}
              <strong>{formatCurrency(currentSavingsAfterExpenses)}</strong>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-6 leading-relaxed">
            Disclaimer: This is a simplified income tax calculator for educational purposes. It assumes resident individual taxation and does not include surcharge, marginal relief, capital gains, special-rate income, business income, detailed HRA calculation, employer NPS, house property loss rules, Form 16 adjustments or advanced deductions. Tax-saving scenarios are indicative and not financial advice. Please consult a qualified tax advisor before making tax or investment decisions.
          </p>
        </div>
      </div>
    </section>
  );
}
