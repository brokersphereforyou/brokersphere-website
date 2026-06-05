import { useState } from 'react';

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState('1000000');
  const [emiRate, setEmiRate] = useState('9');
  const [loanYears, setLoanYears] = useState('5');

  const principal = Number(loanAmount) || 0;
  const annualRate = Number(emiRate) || 0;
  const monthlyRate = annualRate / 12 / 100;
  const months = (Number(loanYears) || 0) * 12;

  const emi =
    monthlyRate > 0 && months > 0
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
      : months > 0
      ? principal / months
      : 0;

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  const today = new Date();

  const yearlyBreakup = [];
  let balance = principal;

  for (let i = 0; i < months; i++) {
    const paymentDate = new Date(today.getFullYear(), today.getMonth() + i, 1);
    const year = paymentDate.getFullYear();

    const interestPaid = balance * monthlyRate;
    const principalPaid = Math.min(emi - interestPaid, balance);
    balance = Math.max(balance - principalPaid, 0);

    let existing = yearlyBreakup.find((item) => item.year === year);

    if (!existing) {
      existing = {
        year,
        principalPaid: 0,
        interestPaid: 0,
        totalPaid: 0,
        closingBalance: 0
      };
      yearlyBreakup.push(existing);
    }

    existing.principalPaid += principalPaid;
    existing.interestPaid += interestPaid;
    existing.totalPaid += emi;
    existing.closingBalance = balance;
  }

  const formatCurrency = (value: number) =>
    `₹${Math.round(value).toLocaleString('en-IN')}`;

  const startMonth = today.toLocaleString('en-IN', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <section className="py-16 px-4 bg-white text-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            EMI Calculator
          </h2>
          <p className="text-slate-600">
            Calculate your monthly EMI, total interest, total repayment, and year-wise loan repayment breakup.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Loan Amount</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <label className="block mb-2 font-medium">Annual Interest Rate (%)</label>
              <input
                type="number"
                value={emiRate}
                onChange={(e) => setEmiRate(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <label className="block mb-2 font-medium">Loan Tenure (Years)</label>
              <input
                type="number"
                value={loanYears}
                onChange={(e) => setLoanYears(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg border border-slate-300 bg-white text-slate-900"
              />

              <p className="text-xs text-slate-500">
                Loan start month considered as: <strong>{startMonth}</strong>
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold mb-5">Estimated Results</h3>

              <div className="space-y-4">
                <p>Monthly EMI: <strong>{formatCurrency(emi)}</strong></p>
                <p>Total Interest: <strong>{formatCurrency(totalInterest)}</strong></p>
                <p className="text-2xl font-bold text-emerald-600">
                  Total Payment: {formatCurrency(totalPayment)}
                </p>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed mt-6">
                Note: EMI result is an estimate. Actual bank EMI may vary due to processing fees, insurance, foreclosure charges, and bank-specific terms.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">
                Year-wise Principal & Interest Breakup
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Based on loan start month: {startMonth}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead className="bg-slate-50 text-slate-700 text-xs uppercase">
                  <tr>
                    <th className="p-4">Year</th>
                    <th className="p-4">Principal Paid</th>
                    <th className="p-4">Interest Paid</th>
                    <th className="p-4">Total EMI Paid</th>
                    <th className="p-4">Balance Loan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {yearlyBreakup.map((item) => (
                    <tr key={item.year} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-slate-900">{item.year}</td>
                      <td className="p-4 text-emerald-700 font-semibold">
                        {formatCurrency(item.principalPaid)}
                      </td>
                      <td className="p-4 text-orange-600 font-semibold">
                        {formatCurrency(item.interestPaid)}
                      </td>
                      <td className="p-4 font-semibold">
                        {formatCurrency(item.totalPaid)}
                      </td>
                      <td className="p-4 font-bold text-slate-800">
                        {formatCurrency(item.closingBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
