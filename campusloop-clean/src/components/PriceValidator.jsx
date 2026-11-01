import React from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { validatePriceCap } from '../utils/validation';

export const PriceValidator = ({ marketPrice, resalePrice }) => {
  const numMarket = parseFloat(marketPrice) || 0;
  const numResale = parseFloat(resalePrice) || 0;
  const validation = validatePriceCap(numMarket, numResale);

  const maxAllowed = Math.floor(numMarket * 0.5);
  const isOverCap = numResale > maxAllowed && numMarket > 0 && numResale > 0;
  const isValid = validation.isValid;

  // Percentage of market price
  const resalePercentageOfMarket = numMarket > 0 ? Math.min(100, Math.round((numResale / numMarket) * 100)) : 0;
  const savings = Math.max(0, numMarket - numResale);

  return (
    <div className="bg-white dark:bg-[#181728] rounded-2xl border border-[#E8E7EE] dark:border-[#2C2A42] p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E8E7EE] dark:border-[#2C2A42]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#635BFF] dark:text-[#8075FF]" />
          <h4 className="text-sm font-bold text-[#171725] dark:text-[#F3F2FA] font-['Manrope']">
            CampusLoop 50% Affordability Engine
          </h4>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#635BFF] dark:text-[#A59DFF] bg-[#EEF0FF] dark:bg-[#635BFF]/25 px-2 py-0.5 rounded-md">
          Rule Enforced
        </span>
      </div>

      {/* 4-Box Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="bg-[#F8F7FC] dark:bg-[#1F1E33] p-3 rounded-xl border border-[#E8E7EE]/70 dark:border-[#2C2A42]">
          <span className="text-[11px] font-medium text-[#77758A] dark:text-[#9E9BB2] block">Market Price</span>
          <span className="text-sm sm:text-base font-extrabold text-[#171725] dark:text-[#F3F2FA]">
            {numMarket > 0 ? `₹${numMarket.toLocaleString('en-IN')}` : '—'}
          </span>
        </div>

        <div className="bg-[#EEF0FF] dark:bg-[#635BFF]/20 p-3 rounded-xl border border-[#635BFF]/20 dark:border-[#635BFF]/40">
          <span className="text-[11px] font-bold text-[#635BFF] dark:text-[#A59DFF] block">Max Cap (50%)</span>
          <span className="text-sm sm:text-base font-extrabold text-[#635BFF] dark:text-[#A59DFF]">
            {maxAllowed > 0 ? `₹${maxAllowed.toLocaleString('en-IN')}` : '—'}
          </span>
        </div>

        <div className={`p-3 rounded-xl border ${
          isOverCap 
            ? 'bg-[#FDE8E8] dark:bg-[#D64545]/20 border-[#D64545]/30' 
            : isValid 
            ? 'bg-[#E8F8F1] dark:bg-[#2EC486]/20 border-[#22A06B]/30' 
            : 'bg-[#F8F7FC] dark:bg-[#1F1E33] border-[#E8E7EE]/70 dark:border-[#2C2A42]'
        }`}>
          <span className={`text-[11px] font-bold block ${
            isOverCap ? 'text-[#D64545] dark:text-[#E65A5A]' : isValid ? 'text-[#22A06B] dark:text-[#2EC486]' : 'text-[#77758A] dark:text-[#9E9BB2]'
          }`}>
            Your Price
          </span>
          <span className={`text-sm sm:text-base font-extrabold ${
            isOverCap ? 'text-[#D64545] dark:text-[#E65A5A]' : isValid ? 'text-[#22A06B] dark:text-[#2EC486]' : 'text-[#171725] dark:text-[#F3F2FA]'
          }`}>
            {numResale > 0 ? `₹${numResale.toLocaleString('en-IN')}` : '—'}
          </span>
        </div>

        <div className="bg-[#F8F7FC] dark:bg-[#1F1E33] p-3 rounded-xl border border-[#E8E7EE]/70 dark:border-[#2C2A42]">
          <span className="text-[11px] font-medium text-[#77758A] dark:text-[#9E9BB2] block">Student Saves</span>
          <span className="text-sm sm:text-base font-extrabold text-[#22A06B] dark:text-[#2EC486]">
            {isValid ? `₹${savings.toLocaleString('en-IN')}` : '—'}
          </span>
        </div>
      </div>

      {/* Progress & Visualizer Comparison Bar */}
      {numMarket > 0 && (
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-[#77758A] dark:text-[#9E9BB2]">Price Ratio Relative to Market:</span>
            <span className={isOverCap ? 'text-[#D64545] dark:text-[#E65A5A] font-bold' : 'text-[#22A06B] dark:text-[#2EC486] font-bold'}>
              {resalePercentageOfMarket}% of Market Price
            </span>
          </div>

          <div className="relative h-4 bg-[#F1F0F7] dark:bg-[#222137] rounded-full overflow-hidden p-0.5 border border-[#E8E7EE] dark:border-[#2C2A42]">
            {/* 50% Cap Marker Line */}
            <div 
              className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#171725] dark:bg-white z-10" 
              title="50% Fair Price Limit"
            />
            {/* Active Fill */}
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isOverCap 
                  ? 'bg-gradient-to-r from-[#D64545] to-[#E63946]' 
                  : 'bg-gradient-to-r from-[#635BFF] to-[#22A06B]'
              }`}
              style={{ width: `${Math.min(100, resalePercentageOfMarket)}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] font-bold text-[#77758A] dark:text-[#9E9BB2] px-1">
            <span>₹0</span>
            <span className="text-[#635BFF] dark:text-[#A59DFF]">▲ 50% Cap Limit (₹{maxAllowed.toLocaleString('en-IN')})</span>
            <span>Market: ₹{numMarket.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      {/* Dynamic Validation Status Callout */}
      {numMarket > 0 && numResale > 0 && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 transition-all ${
            isValid
              ? 'bg-[#E8F8F1] dark:bg-[#2EC486]/15 text-[#146C43] dark:text-[#2EC486] border border-[#22A06B]/30'
              : 'bg-[#FDE8E8] dark:bg-[#D64545]/20 text-[#901313] dark:text-[#E65A5A] border border-[#D64545]/30'
          }`}
        >
          {isValid ? (
            <CheckCircle2 className="w-5 h-5 text-[#22A06B] dark:text-[#2EC486] shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[#D64545] dark:text-[#E65A5A] shrink-0 mt-0.5" />
          )}
          <div className="space-y-0.5">
            <p className="font-bold">
              {isValid
                ? "✓ Valid Resale Price Verified"
                : "✕ Price Exceeds CampusLoop Resale Cap"}
            </p>
            <p className="leading-relaxed opacity-95">
              {validation.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
