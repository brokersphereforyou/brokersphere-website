import { useState } from 'react';

export default function EmiFdCalculator() {
  const [mode, setMode] = useState<'emi' | 'fd'>('emi');

  const [loanAmount, setLoanAmount] = useState('1000000');
  const [emiRate, setEmiRate] = useState('9');
  const [loanYears, setLoanYears] = useState('5');

  const [fdAmount, setFdAmount] = useState('100000');
  const [fdRate, setFdRate] = useState('7');
  const [fdYears, setFdYears] = useState('5');

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
            EMI & FD Calculator
          </h2>
          <p className="text-slate-600">
            Calculate loan EMI and fixed deposit maturity value.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setMode('emi')}
              className={`flex-1 py-3 rounded-xl font-semibold ${
                mode === 'emi'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              EMI
            </button>

            <button
              onClick={() => setMode('fd')}
              className={`flex-1 py-3 rounded-xl font-semibold ${
                mode === 'fd'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              FD
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              {mode === 'emi' ? (
                <>
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
                </>
              ) : (
                <>
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
                </>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold mb-5">Estimated Results</h3>

              {mode === 'emi' ? (
                <div className="space-y-4">
                  <p>Monthly EMI: <strong>{formatCurrency(emi)}</strong></p>
                  <p>Total Interest: <strong>{formatCurrency(totalInterest)}</strong></p>
                  <p>Total Payment: <strong>{formatCurrency(totalPayment)}</strong></p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>Invested Amount: <strong>{formatCurrency(fdPrincipal)}</strong></p>
                  <p>Estimated Interest: <strong>{formatCurrency(fdInterest)}</strong></p>
                  <p className="text-2xl font-bold text-emerald-600">
                    Maturity Amount: {formatCurrency(fdMaturityAmount)}
                  </p>
                </div>
              )}

              <p className="text-[11px] text-slate-500 leading-relaxed mt-6">
                Note: EMI and FD results are estimates. Actual bank calculations may vary due to processing fees, compounding frequency, taxation, and bank-specific terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
