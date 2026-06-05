import { useState } from 'react';

type BreakupRow = {
  slab: string;
  rate: string;
  taxableAmount: number;
  tax: number;
};

type ExpenseItem = {
  id: string;
  name: string;
  amount: string;
};

type DeductionOption = {
  id: string;
  section: string;
  name: string;
  maxLimit: number;
  returnRate: number;
};

type DeductionItem = {
  id: string;
  optionId: string;
  amount: string;
};

const deductionOptions: DeductionOption[] = [
  { id: 'epf', section: '80C', name: 'EPF', maxLimit: 150000, returnRate: 0.08 },
  { id: 'ppf', section: '80C', name: 'PPF', maxLimit: 150000, returnRate: 0.07 },
  { id: 'elss', section: '80C', name: 'ELSS Mutual Fund', maxLimit: 150000, returnRate: 0.12 },
  { id: 'life-insurance', section: '80C', name: 'Life Insurance Premium', maxLimit: 150000, returnRate: 0.04 },
  { id: 'tax-saver-fd', section: '80C', name: 'Tax Saver FD', maxLimit: 150000, returnRate: 0.07 },
  { id: 'home-principal', section: '80C', name: 'Home Loan Principal', maxLimit: 150000, returnRate: 0 },
  { id: 'health-self', section: '80D', name: 'Health Insurance - Self & Family', maxLimit: 25000, returnRate: 0 },
  { id: 'health-parents', section: '80D', name: 'Health Insurance - Parents', maxLimit: 50000, returnRate: 0 },
  { id: 'nps', section: '80CCD(1B)', name: 'NPS Contribution', maxLimit: 50000, returnRate: 0.10 },
  { id: 'home-interest', section: '24(b)', name: 'Home Loan Interest', maxLimit: 200000, returnRate: 0 },
  { id: 'education-loan', section: '80E', name: 'Education Loan Interest', maxLimit: 100000, returnRate: 0 },
  { id: 'donation', section: '80G', name: 'Donation', maxLimit: 100000, returnRate: 0 }
];

export default function IncomeTaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState('1200000');

  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: 'rent', name: 'House Rent', amount: '20000' },
    { id: 'food', name: 'Food & Groceries', amount: '10000' },
    { id: 'emi', name: 'EMI / Loan Payments', amount: '0' },
    { id: 'other', name: 'Other Monthly Expenses', amount: '10000' }
  ]);

  const [deductions, setDeductions] = useState<DeductionItem[]>([
    { id: 'ded-1', optionId: 'epf', amount: '50000' },
    { id: 'ded-2', optionId: 'health-self', amount: '25000' }
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

  const updateDeductionOption = (id: string, optionId: string) => {
    setDeductions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, optionId } : item))
    );
  };

  const updateDeductionAmount = (id: string, amount: string) => {
    setDeductions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount } : item))
    );
  };

  const addDeduction = () => {
    const usedIds = deductions.map((item) => item.optionId);
    const nextOption = deductionOptions.find((option) => !usedIds.includes(option.id));

    if (!nextOption) return;

    setDeductions((prev) => [
      ...prev,
      {
        id: `ded-${Date.now()}`,
        optionId: nextOption.id,
        amount: '0'
      }
    ]);
  };

  const removeDeduction = (id: string) => {
    setDeductions((prev) => prev.filter((item) => item.id !== id));
  };

  const totalMonthlyExpenses = expenses.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0
  );

  const annualExpenses = totalMonthlyExpenses * 12;

  const deductionByOption: Record<string, number> = {};

  deductions.forEach((item) => {
    const option = deductionOptions.find((opt) => opt.id === item.optionId);
    if (!option) return;

    deductionByOption[item.optionId] =
      (deductionByOption[item.optionId] || 0) + (Number(item.amount) || 0);
  });

  const usedDeductionByOption: Record<string, number> = {};

  deductionOptions.forEach((option) => {
    usedDeductionByOption[option.id] = Math.min(
      deductionByOption[option.id] || 0,
      option.maxLimit
    );
  });

  const totalOldRegimeDeductions = Object.values(usedDeductionByOption).reduce(
    (sum, value) => sum + value,
    0
  );

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

  const netMonthlyNew = (income - newResult.totalTax) / 12;
  const netMonthlyOld = (income - oldResult.totalTax) / 12;

  const availableAfterExpenses = Math.max(income - annualExpenses, 0);

  const marginalOldRate =
    taxableOld > 1000000
      ? 0.30
      : taxableOld > 500000
      ? 0.20
      : taxableOld > 250000
      ? 0.05
      : 0;

  const getRemaining = (optionId: string) => {
    const option = deductionOptions.find((item) => item.id === optionId);
    if (!option) return 0;

    return Math.max(option.maxLimit - (usedDeductionByOption[optionId] || 0), 0);
  };

  const calculateFutureValue = (annualInvestment: number, rate: number, years: number) => {
    if (annualInvestment <= 0) return 0;
    let value = 0;
    for (let i = 0; i < years; i++) {
      value = (value + annualInvestment) * (1 + rate);
    }
    return value;
  };

  const scenarios = [
    {
      title: 'Maximum Tax Saving',
      requirement: 'Long-term requirement',
      suitability: 'Best for retirement and long-term wealth creation.',
      allocations: {
        elss: getRemaining('elss'),
        ppf: getRemaining('ppf'),
        nps: getRemaining('nps'),
        healthSelf: getRemaining('health-self'),
        healthParents: getRemaining('health-parents'),
        homeInterest: getRemaining('home-interest')
      }
    },
    {
      title: 'Balanced Plan',
      requirement: 'Medium-term requirement',
      suitability: 'Best if you may need money in 3-5 years.',
      allocations: {
        elss: Math.min(getRemaining('elss'), 50000),
        ppf: Math.min(getRemaining('ppf'), 25000),
        nps: Math.min(getRemaining('nps'), 25000),
        healthSelf: Math.min(getRemaining('health-self'), 15000),
        healthParents: Math.min(getRemaining('health-parents'), 25000),
        homeInterest: 0
      }
    },
    {
      title: 'Liquidity First',
      requirement: 'Short-term requirement',
      suitability: 'Best if emergency fund or short-term cash need is priority.',
      allocations: {
        elss: Math.min(getRemaining('elss'), 25000),
        ppf: 0,
        nps: 0,
        healthSelf: Math.min(getRemaining('health-self'), 10000),
        healthParents: Math.min(getRemaining('health-parents'), 10000),
        homeInterest: 0
      }
    }
  ].map((scenario) => {
    const totalInvestment = Object.values(scenario.allocations).reduce(
      (sum, value) => sum + value,
      0
    );

    const taxSaved = totalInvestment * marginalOldRate * 1.04;

    const estimated10YearValue =
      calculateFutureValue(scenario.allocations.elss, 0.12, 10) +
      calculateFutureValue(scenario.allocations.ppf, 0.07, 10) +
      calculateFutureValue(scenario.allocations.nps, 0.10, 10);

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
            Calculate tax, estimate take-home salary and explore old-regime tax-saving scenarios.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-bold mb-2">1. Income Tax Calculation</h3>

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

                <p>Taxable Income - New Regime: <strong>{formatCurrency(taxableNew)}</strong></p>
                <p>Taxable Income - Old Regime: <strong>{formatCurrency(taxableOld)}</strong></p>

                <div className="border-t border-slate-200 pt-4 mt-4">
                  <button
                    onClick={() => setShowNewBreakup(!showNewBreakup)}
                    className="w-full text-left font-bold text-emerald-700 hover:underline"
                  >
                    New Regime Tax before Cess: {formatCurrency(newResult.taxAfterRebate)} {showNewBreakup ? '▲' : '▼'}
                  </button>

                  {showNewBreakup && <TaxBreakupTable result={newResult} />}

                  <p className="mt-3">New Regime Cess 4%: <strong>{formatCurrency(newResult.cess)}</strong></p>
                  <p className="font-bold text-emerald-700 mt-2">
                    Total Tax - New Regime: {formatCurrency(newResult.totalTax)}
                  </p>
                  <p className="text-sm text-slate-600">
                    Net Monthly Take Home - New Regime: <strong>{formatCurrency(netMonthlyNew)}</strong>
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-4 mt-4">
                  <button
                    onClick={() => setShowOldBreakup(!showOldBreakup)}
                    className="w-full text-left font-bold text-emerald-700 hover:underline"
                  >
                    Old Regime Tax before Cess: {formatCurrency(oldResult.taxAfterRebate)} {showOldBreakup ? '▲' : '▼'}
                  </button>

                  {showOldBreakup && <TaxBreakupTable result={oldResult} />}

                  <p className="mt-3">Old Regime Cess 4%: <strong>{formatCurrency(oldResult.cess)}</strong></p>
                  <p className="font-bold text-emerald-700 mt-2">
                    Total Tax - Old Regime: {formatCurrency(oldResult.totalTax)}
                  </p>
                  <p className="text-sm text-slate-600">
                    Net Monthly Take Home - Old Regime: <strong>{formatCurrency(netMonthlyOld)}</strong>
                  </p>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mt-4">
                  <p className="font-bold text-emerald-800">Better Option: {betterRegime}</p>
                  <p className="text-sm text-emerald-700">
                    Estimated Tax Difference: {formatCurrency(taxSaving)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-bold mb-2">2. Monthly Expenses & Deduction Profile</h3>

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
                  <p className="font-bold">Total Monthly Expenses: {formatCurrency(totalMonthlyExpenses)}</p>
                  <p className="text-sm text-slate-600">Annual Expenses: {formatCurrency(annualExpenses)}</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-5">
                  <h4 className="text-xl font-bold">Tax Deduction Items</h4>
                  <button
                    onClick={addDeduction}
                    className="px-3 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg"
                  >
                    + Add Item
                  </button>
                </div>

                {deductions.map((item) => {
                  const currentOption = deductionOptions.find((opt) => opt.id === item.optionId);
                  const usedIds = deductions
                    .filter((ded) => ded.id !== item.id)
                    .map((ded) => ded.optionId);

                  return (
                    <div key={item.id} className="grid md:grid-cols-[1fr_160px_70px] gap-3 mb-4">
                      <select
                        value={item.optionId}
                        onChange={(e) => updateDeductionOption(item.id, e.target.value)}
                        className="p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
                      >
                        {deductionOptions
                          .filter((option) => !usedIds.includes(option.id) || option.id === item.optionId)
                          .map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.section} - {option.name}
                            </option>
                          ))}
                      </select>

                      <input
                        type="number"
                        value={item.amount}
                        onChange={(e) => updateDeductionAmount(item.id, e.target.value)}
                        className="p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
                      />

                      <button
                        onClick={() => removeDeduction(item.id)}
                        className="p-3 rounded-lg border border-red-200 text-red-600 font-bold"
                      >
                        X
                      </button>

                      {currentOption && (
                        <p className="md:col-span-3 text-xs text-slate-500">
                          Max eligible limit considered: {formatCurrency(currentOption.maxLimit)}
                        </p>
                      )}
                    </div>
                  );
                })}

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

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-bold mb-2">3. Smart Old-Regime Tax Saving Scenarios</h3>

            <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-sm min-w-[1000px]">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="p-4">Scenario</th>
                    <th className="p-4">Requirement</th>
                    <th className="p-4">ELSS</th>
                    <th className="p-4">PPF</th>
                    <th className="p-4">NPS</th>
                    <th className="p-4">Health Self</th>
                    <th className="p-4">Health Parents</th>
                    <th className="p-4">Home Loan Interest</th>
                    <th className="p-4">Total Investment</th>
                    <th className="p-4">Tax Saving</th>
                    <th className="p-4">10-Year Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scenarios.map((scenario) => (
                    <tr key={scenario.title} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-emerald-700">{scenario.title}</td>
                      <td className="p-4">{scenario.requirement}</td>
                      <td className="p-4">{formatCurrency(scenario.allocations.elss)}</td>
                      <td className="p-4">{formatCurrency(scenario.allocations.ppf)}</td>
                      <td className="p-4">{formatCurrency(scenario.allocations.nps)}</td>
                      <td className="p-4">{formatCurrency(scenario.allocations.healthSelf)}</td>
                      <td className="p-4">{formatCurrency(scenario.allocations.healthParents)}</td>
                      <td className="p-4">{formatCurrency(scenario.allocations.homeInterest)}</td>
                      <td className="p-4 font-bold">{formatCurrency(scenario.totalInvestment)}</td>
                      <td className="p-4 font-bold text-emerald-700">{formatCurrency(scenario.taxSaved)}</td>
                      <td className="p-4 font-bold">{formatCurrency(scenario.estimated10YearValue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-500 mt-5 leading-relaxed">
              Disclaimer: Scenario amounts are not mandatory. Users can change investments based on goals, liquidity needs and risk appetite.
            </p>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Tax Disclaimer: This is a simplified income tax calculator for educational purposes. Please consult a qualified tax advisor before making tax or investment decisions.
          </p>
        </div>
      </div>
    </section>
  );
}
