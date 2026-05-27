import React, { useState, useEffect } from 'react';
import { Broker, Review, initialReviews } from '../data/brokers';
import { BrokerLogo } from './BrokerLogo';
import { Star, CheckCircle, AlertTriangle, ArrowLeft, Send, MessageSquare, ShieldAlert, Award, Calendar, ThumbsUp, User, ArrowRight } from 'lucide-react';

interface BrokerDetailProps {
  broker: Broker;
  onBack: () => void;
  onAddToCompare: (id: string) => void;
  isComparing: boolean;
  compareCount: number;
}

export const BrokerDetail: React.FC<BrokerDetailProps> = ({
  broker,
  onBack,
  onAddToCompare,
  isComparing,
  compareCount
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // Review submission form state
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formStyle, setFormStyle] = useState<'Beginner' | 'Active Trader' | 'Long-term Investor' | 'Options Trader' | 'Crypto Trader'>('Beginner');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load reviews from localStorage or initial data
  useEffect(() => {
    const storedReviews = localStorage.getItem(`broker_reviews_${broker.id}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      const filtered = initialReviews.filter((r) => r.brokerId === broker.id);
      setReviews(filtered);
      localStorage.setItem(`broker_reviews_${broker.id}`, JSON.stringify(filtered));
    }
    // Scroll to top when opening detail
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [broker.id]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formTitle.trim() || !formComment.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      brokerId: broker.id,
      userName: formName,
      rating: formRating,
      title: formTitle,
      comment: formComment,
      date: new Date().toISOString().split('T')[0],
      tradingStyle: formStyle
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`broker_reviews_${broker.id}`, JSON.stringify(updatedReviews));

    // Reset form
    setFormName('');
    setFormTitle('');
    setFormComment('');
    setFormRating(5);
    setFormStyle('Beginner');
    setSubmitSuccess(true);

    // Clear success message after 3 seconds
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const renderStars = (rating: number, size = 15) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={size} className="fill-amber-400 text-amber-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative inline-block">
            <Star size={size} className="text-slate-300" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star size={size} className="fill-amber-400 text-amber-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={size} className="text-slate-300 dark:text-slate-600" />);
      }
    }
    return stars;
  };

  return (
    <div className="space-y-8">
      {/* Back button and Add to Compare */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 shadow-sm transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back to Broker List
        </button>

        <button
          onClick={() => onAddToCompare(broker.id)}
          disabled={!isComparing && compareCount >= 3}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer ${
            isComparing
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white border-transparent shadow-sm disabled:opacity-40 disabled:cursor-not-allowed'
          }`}
        >
          {isComparing ? 'Selected for Comparison' : 'Add to Comparison'}
        </button>
      </div>

      {/* Hero Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            <BrokerLogo id={broker.id} className="w-16 h-16" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white leading-none">{broker.name}</h2>
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded border border-amber-100 dark:border-amber-900/30">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{broker.rating}</span>
                </div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 font-medium">"{broker.tagline}"</p>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-400">
                <span>Founded: <strong className="text-slate-600 dark:text-slate-300 font-semibold">{broker.yearFounded}</strong></span>
                <span>•</span>
                <span>HQ: <strong className="text-slate-600 dark:text-slate-300 font-semibold">{broker.headquarters}</strong></span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 w-full md:w-auto shrink-0 md:text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Target Audience</span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">{broker.targetAudience}</span>
          </div>
        </div>
      </div>

      {/* Grid: Ratings Breakdown & Pros/Cons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Ratings Breakdown */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <h3 className="font-bold text-slate-800 dark:text-white text-base border-b border-slate-100 dark:border-slate-800/80 pb-3">
            Ratings Breakdown
          </h3>

          <div className="space-y-4">
            {[
              { label: 'Usability & Platform', value: broker.ratingsBreakdown.usability },
              { label: 'Mobile App Experience', value: broker.ratingsBreakdown.mobileApp },
              { label: 'Research & Charting', value: broker.ratingsBreakdown.research },
              { label: 'Pricing & Commissions', value: broker.ratingsBreakdown.pricing },
              { label: 'Customer Support', value: broker.ratingsBreakdown.customerService }
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                  <span className="text-slate-800 dark:text-white font-mono">{item.value} / 5.0</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${(item.value / 5.0) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 text-xs space-y-1.5">
            <span className="font-bold text-slate-700 dark:text-slate-300 block">SEBI & CDSL Protected</span>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              All compared brokers are registered with SEBI (Securities and Exchange Board of India). Shares are held securely with NSDL or CDSL depositories, protecting you against brokerage insolvency.
            </p>
          </div>
        </div>

        {/* Right: Pros & Cons */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-800 dark:text-white text-base border-b border-slate-100 dark:border-slate-800/80 pb-3">
            Pros & Cons Analysis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pros */}
            <div className="space-y-3">
              <h4 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-1.5">
                <CheckCircle size={16} />
                Advantages
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                {broker.pros.map((pro, idx) => (
                  <li key={idx} className="flex gap-2 items-start leading-relaxed">
                    <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="space-y-3">
              <h4 className="font-bold text-rose-500 text-sm flex items-center gap-1.5">
                <ShieldAlert size={16} />
                Drawbacks
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                {broker.cons.map((con, idx) => (
                  <li key={idx} className="flex gap-2 items-start leading-relaxed">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Expert Verdict */}
          <div className="bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 text-sm">
              <Award size={16} />
              Expert Verdict
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              {broker.verdict}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Specifications Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 dark:text-white text-base border-b border-slate-100 dark:border-slate-800/80 pb-3 mb-5">
          Full Platform Specifications
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
          {[
            { label: 'Online Account Opening Fee', value: broker.minDeposit === 0 ? 'Free (₹0)' : `₹${broker.minDeposit}` },
            { label: 'Equity Delivery Brokerage', value: broker.stockCommission === 0 ? 'Free (₹0)' : `₹${broker.stockCommission}` },
            { label: 'Intraday & F&O Brokerage', value: `₹${broker.optionsCommission.perContract} / executed order` },
            { label: 'Demat DP Charges', value: broker.cryptoFee },
            { label: 'Annual Maintenance Charges (AMC)', value: broker.inactivityFee === 0 ? 'Free (₹0)' : `₹${broker.inactivityFee} / year` },
            { label: 'Netbanking Fund Transfer Fee', value: broker.wireFee === 0 ? 'Free (₹0)' : `₹${broker.wireFee}` },
            { label: 'UPI/IMPS Fund Transfer Fee', value: 'Free (₹0)' },
            { label: 'Margin Trading Facility (MTF) Interest Rate', value: `${broker.marginRateBase}% p.a.` },
            { label: 'Direct Mutual Funds Support', value: broker.features.roboAdvisor ? 'Yes' : 'No' },
            { label: 'Paper/Virtual Trading Simulator', value: broker.features.paperTrading ? 'Yes' : 'No' },
            { label: 'Research & Charting Level', value: broker.features.researchTools },
            { label: 'Mobile App Experience', value: broker.features.mobileApp },
            { label: 'Free Algorithmic API Access', value: broker.features.apiTrading ? 'Yes' : 'No' },
            { label: 'Intraday Short Selling', value: broker.features.shortSelling ? 'Yes' : 'No' }
          ].map((row, idx) => (
            <div key={idx} className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/60">
              <span className="text-slate-400 font-semibold">{row.label}</span>
              <span className="text-slate-800 dark:text-slate-200 font-bold text-right">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Account Opening Call to Action Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 md:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg md:text-xl font-extrabold">Ready to open an account with {broker.name}?</h3>
          <p className="text-emerald-100 text-xs md:text-sm max-w-xl">
            You can open a Demat & Trading account online in less than 15 minutes. Ensure you have your PAN Card, Aadhaar Card (linked to mobile), and a cancelled cheque handy.
          </p>
        </div>
        <a
          href={broker.accountOpeningUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white hover:bg-slate-50 text-emerald-700 font-bold text-sm rounded-xl shadow-sm transition-all duration-200 shrink-0 flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
        >
          Open Account Online
          <ArrowRight size={16} />
        </a>
      </div>

      {/* User Reviews Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Review Submission Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm h-fit space-y-5">
          <h3 className="font-bold text-slate-800 dark:text-white text-base border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-2">
            <MessageSquare size={18} className="text-slate-400" />
            Write a Review
          </h3>

          <form onSubmit={handleSubmitReview} className="space-y-4">
            {submitSuccess && (
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-3 rounded-lg text-xs font-bold text-center">
                Review submitted successfully! Thank you.
              </div>
            )}

            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Rating */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Rating (1 to 5 Stars)</label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormRating(star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star 
                      size={24} 
                      className={star <= formRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Trading Style */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Trading Style</label>
              <select
                value={formStyle}
                onChange={(e) => setFormStyle(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-white outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Beginner">Beginner</option>
                <option value="Active Trader">Active Day Trader</option>
                <option value="Long-term Investor">Long-term Investor</option>
                <option value="Options Trader">Options Trader</option>
                <option value="Crypto Trader">Crypto Trader</option>
              </select>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Review Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Excellent research tools and indexing"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Comment */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Comment</label>
              <textarea
                required
                rows={4}
                placeholder="Describe your personal experience with this broker..."
                value={formComment}
                onChange={(e) => setFormComment(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-white outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs transition-colors duration-200 cursor-pointer shadow-sm"
            >
              <Send size={13} />
              Submit Review
            </button>
          </form>
        </div>

        {/* Right: Reviews List */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <h3 className="font-bold text-slate-800 dark:text-white text-base border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center justify-between">
            <span>User Reviews ({reviews.length})</span>
            <span className="text-xs text-slate-400 font-medium font-mono">Verified clients</span>
          </h3>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1 no-scrollbar">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div 
                  key={rev.id} 
                  className="p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/60 rounded-xl space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full flex items-center justify-center">
                        <User size={14} />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 dark:text-white text-xs block">{rev.userName}</span>
                        <span className="text-[10px] text-slate-400">{rev.tradingStyle}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(rev.rating, 12)}</div>
                      <span className="text-[10px] text-slate-400 font-mono font-semibold flex items-center gap-1">
                        <Calendar size={10} />
                        {rev.date}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h5 className="font-bold text-slate-800 dark:text-white text-xs">{rev.title}</h5>
                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">{rev.comment}</p>
                  </div>

                  <div className="flex justify-end">
                    <button className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-emerald-500 cursor-pointer transition-colors">
                      <ThumbsUp size={11} />
                      Helpful (0)
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400">
                <MessageSquare size={36} className="mx-auto mb-3 text-slate-300" />
                <p className="text-sm">No reviews yet for this broker. Be the first to write one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
