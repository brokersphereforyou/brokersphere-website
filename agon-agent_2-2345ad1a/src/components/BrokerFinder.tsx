import React, { useState } from 'react';
import { Broker, brokersData } from '../data/brokers';
import { BrokerLogo } from './BrokerLogo';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2, Award, Zap, Shield, Target, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizAnswers {
  goal: string;
  capital: string;
  features: string[];
  robo: string;
}

interface MatchResult {
  broker: Broker;
  score: number;
  reasons: string[];
}

interface BrokerFinderProps {
  onSelectBroker: (id: string) => void;
  onAddToCompare: (id: string) => void;
  selectedCompareIds: string[];
}

export const BrokerFinder: React.FC<BrokerFinderProps> = ({
  onSelectBroker,
  onAddToCompare,
  selectedCompareIds
}) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    goal: '',
    capital: '',
    features: [],
    robo: ''
  });
  const [results, setResults] = useState<MatchResult[]>([]);

  const totalSteps = 4;

  const handleGoalSelect = (goal: string) => {
    setAnswers({ ...answers, goal });
    setStep(2);
  };

  const handleCapitalSelect = (capital: string) => {
    setAnswers({ ...answers, capital });
    setStep(3);
  };

  const handleFeatureToggle = (feature: string) => {
    const current = [...answers.features];
    if (current.includes(feature)) {
      setAnswers({ ...answers, features: current.filter(f => f !== feature) });
    } else {
      setAnswers({ ...answers, features: [...current, feature] });
    }
  };

  const handleRoboSelect = (robo: string) => {
    const updatedAnswers = { ...answers, robo };
    setAnswers(updatedAnswers);
    calculateMatches(updatedAnswers);
    setStep(5); // Results step
  };

  const calculateMatches = (finalAnswers: QuizAnswers) => {
    const calculated: MatchResult[] = brokersData.map((broker) => {
      let score = 50; // Base score
      const reasons: string[] = [];

      // 1. Goal matching
      if (finalAnswers.goal === 'day-trading') {
        if (broker.id === 'dhan' || broker.id === 'zerodha' || broker.id === 'upstox') {
          score += 25;
          reasons.push('Excellent advanced charting and free high-speed trading APIs.');
        } else if (broker.id === 'angelone') {
          score += 20;
          reasons.push('Includes free SmartAPI and professional daily research tips.');
        } else if (broker.id === 'groww') {
          score -= 15;
        }
      } else if (finalAnswers.goal === 'long-term') {
        if (broker.id === 'zerodha' || broker.id === 'dhan') {
          score += 25;
          reasons.push('Zero-commission equity delivery trades forever.');
        } else if (broker.id === 'groww') {
          score += 30;
          reasons.push('Super simple, zero lifetime maintenance fee platform.');
        }
      } else if (finalAnswers.goal === 'retirement') {
        if (broker.id === 'zerodha' || broker.id === 'groww' || broker.id === 'angelone') {
          score += 25;
          reasons.push('Direct Mutual Fund investing with ₹0 commission, saving lakhs over time.');
        }
      } else if (finalAnswers.goal === 'options') {
        if (broker.id === 'dhan' || broker.id === 'zerodha' || broker.id === 'upstox') {
          score += 25;
          reasons.push('Flat ₹20/trade with advanced option chains and analytics.');
        }
      }

      // 2. Capital matching
      if (finalAnswers.capital === 'under-500') {
        if (broker.minDeposit === 0) {
          score += 15;
          reasons.push('Free account opening and zero maintenance charges.');
        }
      } else if (finalAnswers.capital === 'over-25k') {
        if (broker.id === 'dhan') {
          score += 25;
          reasons.push('Unlocks the cheapest Margin Trading Facility (MTF) in India starting at 10.5% p.a.');
        } else if (broker.id === 'icicidirect' || broker.id === 'hdfcsky') {
          score += 20;
          reasons.push('Seamless 3-in-1 banking integration for high volume transactions.');
        }
      }

      // 3. Feature matching
      finalAnswers.features.forEach((feat) => {
        if (feat === 'zero-options' && broker.optionsCommission.perContract === 20) {
          score += 15;
        }
        if (feat === 'charts' && broker.features.researchTools === 'Advanced') {
          score += 15;
          reasons.push('Advanced TradingView charts with 100+ indicators.');
        }
        if (feat === 'margin' && broker.id === 'dhan') {
          score += 25;
          reasons.push('Cheapest MTF rate in the industry (10.5% p.a.).');
        }
        if (feat === 'paper' && broker.features.paperTrading) {
          score += 15;
          reasons.push('Includes a fully functional Paper/Virtual Trading simulator.');
        }
        if (feat === 'funds' && broker.features.roboAdvisor) {
          score += 15;
          reasons.push('Direct Mutual Funds support with ₹0 distributor commissions.');
        }
      });

      // 4. Robo-advisor matching
      if (finalAnswers.robo === 'yes') {
        if (broker.features.roboAdvisor) {
          score += 20;
          reasons.push('Offers integrated Direct Mutual Fund SIPs.');
        }
      }

      // Clamp score between 0 and 100
      const finalScore = Math.min(Math.max(score, 10), 99);

      return {
        broker,
        score: finalScore,
        reasons: Array.from(new Set(reasons)).slice(0, 3) // Unique top 3 reasons
      };
    });

    // Sort by score descending
    calculated.sort((a, b) => b.score - a.score);
    setResults(calculated);
  };

  const handleReset = () => {
    setAnswers({
      goal: '',
      capital: '',
      features: [],
      robo: ''
    });
    setStep(1);
    setResults([]);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Quiz Progress Header */}
      {step <= totalSteps && (
        <div className="bg-slate-50 dark:bg-slate-950/40 p-5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <span>Broker Finder Quiz</span>
            <span>Step {step} of {totalSteps}</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: INVESTMENT GOAL */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="text-center md:text-left">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">What is your primary investing goal?</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">We will tailor recommendations based on your primary style of trading or investing.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {[
                  { id: 'long-term', title: 'Long-term Investing', desc: 'Buy and hold index funds, ETFs, or delivery stocks.', icon: Shield, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20' },
                  { id: 'day-trading', title: 'Active Day Trading', desc: 'Technical analysis, high speed execution, and margin (MTF).', icon: Zap, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' },
                  { id: 'retirement', title: 'Direct Mutual Funds', desc: 'Invest in direct mutual fund SIPs with zero commissions.', icon: Award, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' },
                  { id: 'options', title: 'F&O Derivatives', desc: 'Trade futures & options with advanced option chains.', icon: Sparkles, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/20' }
                ].map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleGoalSelect(option.id)}
                      className="p-4 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-xl text-left hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-all duration-200 cursor-pointer flex gap-4 items-start group"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${option.color} shrink-0`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm group-hover:text-emerald-500 transition-colors">{option.title}</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">{option.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: STARTING CAPITAL */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setStep(1)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <ArrowLeft size={16} />
                </button>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">How much capital are you starting with?</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Account opening and maintenance fees can heavily impact low-balance or high-balance accounts differently.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {[
                  { id: 'under-500', title: 'Under ₹50,000', desc: 'Free account opening and zero AMC brokers are essential.' },
                  { id: '500-5000', title: '₹50,000 to ₹2 Lakhs', desc: 'Most standard brokerage accounts fit this perfectly.' },
                  { id: '5000-25000', title: '₹2 Lakhs to ₹5 Lakhs', desc: 'Unlocks intraday leverage and initial margin (MTF).' },
                  { id: 'over-25k', title: '₹5 Lakhs+', desc: 'Unlocks premium margin interest rates and 3-in-1 bank integration.' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleCapitalSelect(option.id)}
                    className="p-5 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-xl text-left hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-all duration-200 cursor-pointer group"
                  >
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm group-hover:text-emerald-500 transition-colors">{option.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">{option.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: FEATURES SELECTION */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setStep(2)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <ArrowLeft size={16} />
                </button>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Select features most important to you:</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Select as many as you like. We will match brokers that possess these features.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { id: 'zero-options', title: 'Flat ₹20/trade Pricing', desc: 'Discounted pricing on intraday and derivative segments.' },
                  { id: 'charts', title: 'Advanced Charting', desc: 'TradingView integration with indicator studies.' },
                  { id: 'margin', title: 'Low Margin Funding (MTF)', desc: 'Borrow money to buy stocks at cheap interest rates.' },
                  { id: 'paper', title: 'Virtual Paper Trading', desc: 'Practice trading risk-free with virtual capital.' },
                  { id: 'funds', title: 'Direct Mutual Funds', desc: 'Access to zero-commission mutual fund SIPs.' }
                ].map((feat) => {
                  const isSelected = answers.features.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => handleFeatureToggle(feat.id)}
                      className={`p-4 border rounded-xl text-left transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                        isSelected 
                          ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 shrink-0 ${
                        isSelected 
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {isSelected && <CheckCircle2 size={14} className="fill-emerald-500 text-white" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-white text-xs">{feat.title}</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5 leading-relaxed">{feat.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setStep(4)}
                  className="flex items-center gap-1 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-lg cursor-pointer shadow-sm"
                >
                  Next Step
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: ROBO ADVISOR */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setStep(3)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <ArrowLeft size={16} />
                </button>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Do you want direct mutual fund SIPs?</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Direct mutual funds have zero distributor fees, which saves you massive amounts of money over long periods.</p>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'yes', title: 'Yes, I want to invest in Direct Mutual Funds', desc: 'I want commission-free direct mutual fund SIPs integrated into my dashboard.' },
                  { id: 'no', title: 'No, I prefer stocks only', desc: 'I prefer 100% self-directed equity stock trading.' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleRoboSelect(option.id)}
                    className="p-4 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-xl text-left hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-all duration-200 cursor-pointer group"
                  >
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm group-hover:text-emerald-500 transition-colors">{option.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">{option.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 5: RESULTS */}
          {step === 5 && results.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-900/30">
                  <Sparkles size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Your Best Broker Fits</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Based on your trading goals, starting capital, and preferred features, here are your matched platforms.</p>
              </div>

              {/* Match Cards */}
              <div className="space-y-4">
                {results.slice(0, 3).map((res, index) => {
                  const b = res.broker;
                  const isFirst = index === 0;
                  const isSelectedForCompare = selectedCompareIds.includes(b.id);
                  
                  return (
                    <div 
                      key={b.id} 
                      className={`border rounded-xl p-5 transition-all duration-300 relative overflow-hidden ${
                        isFirst 
                          ? 'border-emerald-500 dark:border-emerald-500/80 bg-emerald-50/10 dark:bg-emerald-950/5 shadow-md' 
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                      }`}
                    >
                      {isFirst && (
                        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-lg flex items-center gap-1">
                          <Award size={12} />
                          Best Match
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <BrokerLogo id={b.id} className="w-12 h-12" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-800 dark:text-white text-base">{b.name}</h4>
                              <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                                <Star size={12} className="fill-current" /> {b.rating}
                              </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 italic">"{b.tagline}"</p>
                          </div>
                        </div>

                        {/* Match Percentage */}
                        <div className="flex items-center gap-2 shrink-0 sm:text-right">
                          <div className="flex flex-col items-start sm:items-end">
                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Match Score</span>
                            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{res.score}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Matching Reasons */}
                      <div className="mt-4 bg-slate-50 dark:bg-slate-950/40 rounded-lg p-3 border border-slate-100 dark:border-slate-800/60">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1.5">Why it matches your profile</span>
                        <div className="space-y-1.5">
                          {res.reasons.map((reason, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                              <span>{reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-4 flex flex-wrap gap-2 justify-end border-t border-slate-100 dark:border-slate-800/60 pt-3.5">
                        <button
                          onClick={() => onSelectBroker(b.id)}
                          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-lg cursor-pointer transition-colors"
                        >
                          View Full Review
                        </button>
                        
                        <button
                          onClick={() => onAddToCompare(b.id)}
                          disabled={isSelectedForCompare || selectedCompareIds.length >= 3}
                          className={`px-3.5 py-1.5 font-semibold text-xs rounded-lg cursor-pointer border transition-all ${
                            isSelectedForCompare
                              ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white border-transparent shadow-sm disabled:opacity-40'
                          }`}
                        >
                          {isSelectedForCompare ? 'Added to Compare' : 'Add to Compare'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reset section */}
              <div className="flex justify-center pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-bold text-xs rounded-lg cursor-pointer transition-all"
                >
                  <RefreshCw size={13} />
                  Take Quiz Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
