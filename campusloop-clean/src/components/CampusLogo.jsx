import React from 'react';

export const CampusLogo = ({ size = 44, showText = true, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon: Interlocking Infinity Loop + Academic Graduation Cap */}
      <div 
        className="relative shrink-0 rounded-2xl flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-105"
        style={{ 
          width: size, 
          height: size,
          background: 'linear-gradient(135deg, #635BFF 0%, #7B73FF 50%, #22A06B 100%)',
          boxShadow: '0 8px 20px -3px rgba(99, 91, 255, 0.35)'
        }}
      >
        <svg 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          {/* Continuous Loop / Ribbon representing Campus Circularity */}
          <path 
            d="M14 24 C14 17.5 19 13 24 13 C31 13 36 19 36 24 C36 29 31 35 24 35 C17 35 12 29 12 24" 
            stroke="white" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            strokeDasharray="1 1.2"
            opacity="0.25"
          />
          {/* Main Infinity Loop Path */}
          <path 
            d="M16 28 C12.5 28 10 25.5 10 22 C10 18.5 13 16 17 16 C22 16 26 24 31 24 C35 24 38 21.5 38 18 C38 14.5 35 12 31 12 C27 12 24 15 22 18" 
            stroke="white" 
            strokeWidth="3.4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M32 20 C35.5 20 38 22.5 38 26 C38 29.5 35 32 31 32 C26 32 22 24 17 24 C13 24 10 26.5 10 30 C10 33.5 13 36 17 36 C21 36 24 33 26 30" 
            stroke="white" 
            strokeWidth="3.4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          {/* Graduation Cap Diamond / Node */}
          <path 
            d="M24 17 L29 20 L24 23 L19 20 Z" 
            fill="#FFD166" 
          />
          {/* Graduation Cap Tassel */}
          <path 
            d="M27.5 21 V26.5" 
            stroke="#FFD166" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
          />
          <circle cx="27.5" cy="27" r="1.2" fill="#FFD166" />
        </svg>

        {/* Live Active Status Ring */}
        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#22A06B] ring-2 ring-white dark:ring-[#191828]" />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-extrabold tracking-tight text-[#171725] dark:text-[#F3F2FA] font-['Manrope']">
              Campus<span className="text-[#635BFF] dark:text-[#8075FF]">Loop</span>
            </span>
            <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-[#EEF0FF] dark:bg-[#635BFF]/25 text-[#635BFF] dark:text-[#A59DFF]">
              50% Cap
            </span>
          </div>
          <span className="text-xs font-semibold text-[#77758A] dark:text-[#9B98B2] tracking-wide -mt-0.5">
            College Marketplace
          </span>
        </div>
      )}
    </div>
  );
};
