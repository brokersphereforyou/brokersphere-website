import { useState } from 'react';

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState('1000000');
  const [emiRate, setEmiRate] = useState('9');
  const [loanYears, setLoanYears] = useState('5');

  const principal = Number(loanAmount) || 0;
  const monthlyRate = (Number(emiRate) || 0) / 12 / 100;
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

  const formatCurrency = (value: number) =>
    `₹${Math.round(value).toLocaleString('en-IN')}`;

  return (
    <section className="py-16 px-4 bg-white text-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            EMI Calculator
          </h2>
          <p className="text-slate-600">
            Calculate your monthly EMI, total interest, and total repayment amount.
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
        </div>
      </div>
    </section>
  );
}
