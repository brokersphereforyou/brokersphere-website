import { useState } from 'react';

type BreakupRow = {
  slab: string;
  rate: string;
  taxableAmount: number;
  tax: number;
};

type DeductionItem = {
  id: string;
  section: string;
  name: string;
  amount: string;
};

type ExpenseItem = {
  id: string;
  name: string;
  amount: string;
};

export default function IncomeTaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState('1200000');

  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: 'rent', name: 'House Rent', amount: '20000' },
    { id: 'food', name: 'Food & Groceries', amount: '10000' },
    { id: 'emi', name: 'EMI / Loan Payments', amount: '0' },
    { id: 'other', name: 'Other Monthly Expenses', amount: '10000' }
  ]);

  const [deductions, setDeductions] = useState<DeductionItem[]>([
    { id: 'epf', section: '80C', name: 'EPF / PPF / ELSS / Life Insurance / Tax Saver FD', amount: '50000' },
    { id: 'health-self', section: '80D', name: 'Health Insurance - Self & Family', amount: '25000' },
    { id: 'health-parents', section: '80D', name: 'Health Insurance - Parents', amount: '0' },
    { id: 'nps', section: '80CCD(1B)', name: 'NPS Contribution', amount: '0' },
    { id: 'home-loan-interest', section: '24(b)', name: 'Home Loan Interest', amount: '0' }
  ]);

  const [showNewBreakup, setShowNewBreakup] = useState(false);
  const [showOldBreakup, setShowOldBreakup] = useState(false);

  const income = Number(annualIncome) || 0;

  const formatCurrency = (value: number) =>
    `₹${Math.round(value).toLocaleString('en-IN')}`;

  const updateExpense = (id: string, value: string) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount: value } : item))
    );
  };

  const updateDeduction = (id: string, value: string) => {
    setDeductions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount: value } : item))
    );
  };

  const getDeductionAmount = (id: string) =>
    Number(deductions.find((item) => item.id === id)?.amount) || 0;

  const totalMonthlyExpenses = expenses.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0
  );

  const annualExpenses = totalMonthlyExpenses * 12;

  const deduction80C = Math.min(getDeductionAmount('epf'), 150000);
  const deduction80DSelf = Math.min(getDeductionAmount('health-self'), 25000);
  const deduction80DParents = Math.min(getDeductionAmount('health-parents'), 50000);
  const deductionNps = Math.min(getDeductionAmount('nps'), 50000);
  const deductionHomeLoanInterest = Math.min(getDeductionAmount('home-loan-interest'), 200000);

  const totalOldRegimeDeductions =
    deduction80C +
    deduction80DSelf +
    deduction80DParents +
    deductionNps +
    deductionHomeLoanInterest;

  const newStandardDeduction = 75000;
  const oldStandardDeduction = 50000;

  const taxableNew = Math.max(income - newStandardDeduction, 0);
  const taxableOld = Math.max(
    income - oldStandardDeduction - totalOldRegimeDeductions,
    0
  );

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
  const netAnnualOld = income - oldResult.totalTax;

  const netMonthlyNew = netAnnualNew / 12;
  const netMonthlyOld = netAnnualOld / 12;

  const availableAfterExpenses = Math.max(income - annualExpenses, 0);

  const remaining80C = Math.max(150000 - deduction80C, 0);
  const remaining80DSelf = Math.max(25000 - deduction80DSelf, 0);
  const remaining80DParents = Math.max(50000 - deduction80DParents, 0);
  const remainingNps = Math.max(50000 - deductionNps, 0);
  const remainingHomeLoan = Math.max(200000 - deductionHomeLoanInterest, 0);

  const marginalOldRate =
    taxableOld > 1000000
      ? 0.30
      : taxableOld > 500000
      ? 0.20
      : taxableOld > 250000
      ? 0.05
      : 0;

  const calculateFutureValue = (annualInvestment: number, rate: number, years: number) => {
    if (annualInvestment <= 0) return 0;
    let value = 0;
    for (let i = 0; i < years; i++) {
      value = (value + annualInvestment) * (1 + rate);
    }
    return value;
  };

  const scenario1 = {
    title: 'Maximum Tax Saving',
    suitability: 'Best for long-term wealth creation and retirement planning.',
    requirement: 'Long-term money requirement',
    items: [
      { name: '80C - ELSS / PPF / EPF / Life Insurance / Tax Saver FD', amount: remaining80C, returnRate: 0.10 },
      { name: 'NPS - Section 80CCD(1B)', amount: remainingNps, returnRate: 0.10 },
      { name: 'Health Insurance - Self & Family', amount: remaining80DSelf, returnRate: 0 },
      { name: 'Health Insurance - Parents', amount: remaining80DParents, returnRate: 0 }
    ]
  };

  const scenario2 = {
    title: 'Balanced Tax Saving Plan',
    suitability: 'Best for users who may need money in 3-5 years but still want tax saving.',
    requirement: 'Medium-term money requirement',
    items: [
      { name: '80C - ELSS / PPF / Tax Saver FD', amount: Math.min(remaining80C, 75000), returnRate: 0.09 },
      { name: 'NPS - Section 80CCD(1B)', amount: Math.min(remainingNps, 25000), returnRate: 0.10 },
      { name: 'Health Insurance - Self & Family', amount: Math.min(remaining80DSelf, 15000), returnRate: 0 }
    ]
  };

  const scenario3 = {
    title: 'Liquidity First Plan',
    suitability: 'Best for emergency fund, job change, home purchase or short-term goals.',
    requirement: 'Short-term money requirement',
    items: [
      { name: '80C - Minimal ELSS / Tax Saver FD', amount: Math.min(remaining80C, 25000), returnRate: 0.07 },
      { name: 'Health Insurance - Self & Family', amount: Math.min(remaining80DSelf, 10000), returnRate: 0 }
    ]
  };

  const scenarios = [scenario1, scenario2, scenario3].map((scenario) => {
    const totalInvestment = scenario.items.reduce((sum, item) => sum + item.amount, 0);
    const taxSaved = totalInvestment * marginalOldRate * 1.04;

    const estimated10YearValue = scenario.items.reduce((sum, item) => {
      return sum + calculateFutureValue(item.amount, item.returnRate, 10);
    }, 0);

    return {
      ...scenario,
      totalInvestment,
      taxSaved,
      estimated10YearValue
    };
  });

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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Income Tax Calculator
          </h2>
          <p className="text-slate-600">
            Calculate income tax, estimate take-home salary, and explore old-regime tax saving scenarios.
          </p>
        </div>

        <div className="space-y-8">
          {/* PART 1 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-bold mb-2">1. Income Tax Calculation</h3>
            <p className="text-sm text-slate-500 mb-6">
              Enter only your annual income here. Standard deduction is applied automatically.
            </p>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <label className="block mb-2 font-medium">
                  Annual Gross Income Including Bonus
                </label>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
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
                <h4 className="text-xl font-bold mb-5">Tax Result</h4>

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
          </div>

          {/* PART 2 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-bold mb-2">2. Monthly Expenses & Deduction Profile</h3>
            <p className="text-sm text-slate-500 mb-6">
              Add your monthly expenses and current tax-saving investments. These values are used only for old-regime planning scenarios.
            </p>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-5">Monthly Expenses</h4>

                {expenses.map((item) => (
                  <div key={item.id} className="mb-4">
                    <label className="block mb-2 font-medium">{item.name}</label>
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => updateExpense(item.id, e.target.value)}
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
                    />
                  </div>
                ))}

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">
                  <p className="font-bold">
                    Total Monthly Expenses: {formatCurrency(totalMonthlyExpenses)}
                  </p>
                  <p className="text-sm text-slate-600">
                    Annual Expenses: {formatCurrency(annualExpenses)}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-5">Tax Deduction Items</h4>

                {deductions.map((item) => (
                  <div key={item.id} className="mb-4">
                    <label className="block mb-2 font-medium">
                      {item.section} - {item.name}
                    </label>
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => updateDeduction(item.id, e.target.value)}
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
                    />
                  </div>
                ))}

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">
                  <p className="font-bold">
                    Total Old-Regime Deductions Used: {formatCurrency(totalOldRegimeDeductions)}
                  </p>
                  <p className="text-sm text-slate-600">
                    Estimated annual money left after expenses: {formatCurrency(availableAfterExpenses)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PART 3 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-bold mb-2">3. Smart Old-Regime Tax Saving Scenarios</h3>
            <p className="text-sm text-slate-500 mb-6">
              These scenarios estimate how much more you can invest in eligible items to claim old-regime deductions.
            </p>

            <div className="grid lg:grid-cols-3 gap-4">
              {scenarios.map((scenario, index) => (
                <div key={scenario.title} className="bg-white border border-slate-200 rounded-2xl p-5">
                  <h4 className="font-bold text-emerald-700 mb-2">
                    {index + 1}. {scenario.title}
                  </h4>

                  <p className="text-sm text-slate-700 mb-2">
                    {scenario.suitability}
                  </p>

                  <p className="text-xs font-bold text-slate-500 mb-4">
                    Requirement Type: {scenario.requirement}
                  </p>

                  <div className="space-y-3">
                    {scenario.items.map((item) => (
                      <div key={item.name} className="border-b border-slate-100 pb-2">
                        <p className="text-xs text-slate-600">{item.name}</p>
                        <p className="font-bold">{formatCurrency(item.amount)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                    <p className="text-sm font-bold text-emerald-800">
                      Suggested Additional Investment: {formatCurrency(scenario.totalInvestment)}
                    </p>
                    <p className="text-sm text-emerald-700">
                      Approx Tax Saving: {formatCurrency(scenario.taxSaved)}
                    </p>
                    <p className="text-sm text-emerald-700">
                      Estimated 10-Year Value: {formatCurrency(scenario.estimated10YearValue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 mt-5 leading-relaxed">
              Disclaimer: The scenario amounts are not mandatory. Users can change investment amounts according to their financial goals, liquidity needs and risk appetite. Estimated returns are illustrative only and may vary depending on market performance, interest rates, product choice and investment tenure.
            </p>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Tax Disclaimer: This is a simplified income tax calculator for resident salaried individuals for FY 2025-26 / AY 2026-27. It uses new-regime slabs and standard deductions currently listed by the Income Tax Department, and old-regime slabs with common deductions. It does not include surcharge, marginal relief, HRA calculation, LTA, employer NPS, capital gains, business income, special-rate income, house property loss rules or advanced tax provisions. Please consult a qualified tax advisor before making tax or investment decisions. :contentReference[oaicite:0]{index=0}
          </p>
        </div>
      </div>
    </section>
  );
}
