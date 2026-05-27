import React from 'react';

interface BrokerLogoProps {
  id: string;
  className?: string;
}

export const BrokerLogo: React.FC<BrokerLogoProps> = ({ id, className = 'w-10 h-10' }) => {
  // Render high-fidelity custom SVG logos for each top Indian broker
  switch (id) {
    case 'zerodha':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#387ed1] text-white shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[65%] h-[65%] fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5 L90 45 L50 85 L10 45 Z" fill="none" stroke="white" strokeWidth="8" strokeLinejoin="round" />
            <path d="M50 5 L50 85" stroke="white" strokeWidth="6" />
            <path d="M10 45 L90 45" stroke="white" strokeWidth="6" />
            <circle cx="50" cy="45" r="10" fill="white" />
            <path d="M50 85 L42 95 L58 95 Z" fill="white" />
          </svg>
        </div>
      );

    case 'groww':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#00d09c] text-white shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 80 C 20 50, 50 20, 80 20 C 80 50, 50 80, 20 80 Z" fill="white" />
            <path d="M40 80 C 40 65, 65 40, 80 40" fill="none" stroke="#00d09c" strokeWidth="6" strokeLinecap="round" />
            <circle cx="80" cy="20" r="8" fill="#00d09c" />
          </svg>
        </div>
      );

    case 'angelone':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#0f348c] text-white shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[65%] h-[65%] fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 85 L50 15 L85 85" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M35 60 L65 60" stroke="white" strokeWidth="10" strokeLinecap="round" />
            <path d="M50 15 L80 35 L80 15 Z" fill="#ff7a00" />
            <path d="M50 15 L80 15" stroke="#ff7a00" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'upstox':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#3f165a] text-white shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] fill-current" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="60" r="22" fill="none" stroke="white" strokeWidth="8" />
            <circle cx="70" cy="30" r="12" fill="#ff7a00" />
            <path d="M20 80 L80 20" stroke="white" strokeWidth="8" strokeLinecap="round" />
            <path d="M55 20 L80 20 L80 45" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );

    case 'dhan':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#ffe600] text-black shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M55 10 L15 55 L45 55 L35 90 L85 45 L50 45 Z" fill="black" />
          </svg>
        </div>
      );

    case 'fyers':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#10b981] text-white shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 80 L50 20 L90 80 Z" fill="none" stroke="white" strokeWidth="8" strokeLinejoin="round" />
            <circle cx="50" cy="55" r="12" fill="white" />
          </svg>
        </div>
      );

    case 'paytmmoney':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#002e6e] text-white shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[65%] h-[65%] fill-current" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="15" width="70" height="70" rx="15" fill="none" stroke="white" strokeWidth="8" />
            <path d="M30 35 L50 65 L70 35" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="35" r="8" fill="#00baf2" />
          </svg>
        </div>
      );

    case 'hdfcsky':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#0c2340] text-white shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[65%] h-[65%] fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 20 L25 80" stroke="white" strokeWidth="12" strokeLinecap="round" />
            <path d="M75 40 L75 80" stroke="white" strokeWidth="12" strokeLinecap="round" />
            <path d="M25 50 L75 50" stroke="white" strokeWidth="12" strokeLinecap="round" />
            <path d="M75 15 L90 35 L60 35 Z" fill="#e01a22" />
            <path d="M75 15 L75 45" stroke="#0072bc" strokeWidth="12" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'icicidirect':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#f37021] text-white shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[65%] h-[65%] fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 50 C 20 25, 80 25, 80 50 C 80 75, 20 75, 20 50" fill="none" stroke="#005691" strokeWidth="10" strokeLinecap="round" />
            <rect x="44" y="40" width="12" height="35" rx="4" fill="white" />
            <circle cx="50" cy="25" r="8" fill="white" />
          </svg>
        </div>
      );

    case 'kotaksecurities':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#005691] text-white shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[65%] h-[65%] fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20 L45 50 L20 80" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M45 50 L80 50" stroke="white" strokeWidth="10" strokeLinecap="round" />
            <circle cx="80" cy="50" r="10" fill="#e61a22" />
          </svg>
        </div>
      );

    case 'motilaloswal':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#ffe600] text-black shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20 L50 80 L80 20" fill="none" stroke="black" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="25" r="12" fill="#7a3f00" />
          </svg>
        </div>
      );

    case 'sharekhan':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#e02020] text-white shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20 H80 V40 H20 Z" fill="white" />
            <path d="M30 40 V80 L50 60 L70 80 V40" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );

    case '5paisa':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#e01e5a] text-white shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[60%] h-[60%] fill-current" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="8" />
            <path d="M35 30 L65 30 L65 48 L35 48 L35 70 L65 70" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M65 48 C 65 60, 35 60, 35 48" fill="none" stroke="white" strokeWidth="10" />
          </svg>
        </div>
      );

    case 'iifl':
    case 'iiflsecurities':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#0d47a1] text-white shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[65%] h-[65%] fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20 H80 V35 H20 Z" fill="white" />
            <path d="M20 45 H50 V80 H20 Z" fill="white" />
            <path d="M60 45 H80 V80 H60 Z" fill="#ff9100" />
          </svg>
        </div>
      );

    case 'choicebroking':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#0d9488] text-white shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[65%] h-[65%] fill-current" xmlns="http://www.w3.org/2000/svg">
            {/* Choice Broking abstract checkmark and growth bar */}
            <path d="M20 55 L45 80 L85 25" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M45 80 V45" stroke="#ffe600" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'geojit':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#1b5e20] text-white shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[65%] h-[65%] fill-current" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="8" />
            <path d="M30 40 L50 65 L70 40" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="35" r="8" fill="#ffe600" />
          </svg>
        </div>
      );

    case 'aliceblue':
      return (
        <div className={`rounded-xl flex items-center justify-center bg-[#0154a0] text-white shadow-sm shrink-0 overflow-hidden ${className}`}>
          <svg viewBox="0 0 100 100" className="w-[65%] h-[65%] fill-current" xmlns="http://www.w3.org/2000/svg">
            {/* Alice Blue beautiful minimalist shield and growth letter 'A' */}
            <path d="M50 10 L85 25 L85 55 C85 75, 50 90, 50 90 C50 90, 15 75, 15 55 L15 25 Z" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M50 25 L32 70 L42 70 L50 48 L58 70 L68 70 Z" fill="white" />
            <path d="M42 58 L58 58" stroke="#0154a0" strokeWidth="6" />
          </svg>
        </div>
      );

    default:
      return (
        <div className={`rounded-xl flex items-center justify-center bg-slate-100 text-slate-800 font-bold ${className}`}>
          {id.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};
