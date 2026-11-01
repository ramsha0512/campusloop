import React from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { CATEGORIES, CONDITIONS } from '../data/demoData';
import { useMarketplace } from '../context/MarketplaceContext';

export const MobileFilterDrawer = () => {
  const {
    isMobileFilterOpen,
    setIsMobileFilterOpen,
    selectedCategory,
    setSelectedCategory,
    selectedCondition,
    setSelectedCondition,
    selectedAvailability,
    setSelectedAvailability,
    priceMax,
    setPriceMax
  } = useMarketplace();

  if (!isMobileFilterOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end"
      onClick={() => setIsMobileFilterOpen(false)}
    >
      <div
        className="w-full max-w-sm bg-white dark:bg-[#181728] h-full shadow-2xl flex flex-col p-6 animate-slideLeft overflow-y-auto border-l border-[#E8E7EE] dark:border-[#2C2A42]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E7EE] dark:border-[#2C2A42]">
          <h3 className="text-lg font-bold text-[#171725] dark:text-[#F3F2FA]">Filter Listings</h3>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="p-1 rounded-lg text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-6 space-y-6 flex-1">
          {/* Categories */}
          <div>
            <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-2 uppercase tracking-wider">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                    selectedCategory === cat
                      ? 'bg-[#635BFF] text-white border-[#635BFF]'
                      : 'bg-[#F8F7FC] dark:bg-[#1F1E33] text-[#77758A] dark:text-[#9E9BB2] border-[#E8E7EE] dark:border-[#2C2A42]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-2 uppercase tracking-wider">
              Item Condition
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['All', ...CONDITIONS].map((cond) => (
                <button
                  key={cond}
                  onClick={() => setSelectedCondition(cond)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border ${
                    selectedCondition === cond
                      ? 'bg-[#171725] dark:bg-[#635BFF] text-white border-[#171725] dark:border-[#635BFF]'
                      : 'bg-[#F8F7FC] dark:bg-[#1F1E33] text-[#77758A] dark:text-[#9E9BB2] border-[#E8E7EE] dark:border-[#2C2A42]'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#171725] dark:text-[#F3F2FA] uppercase tracking-wider">
                Max Price
              </label>
              <span className="text-sm font-extrabold text-[#635BFF] dark:text-[#A59DFF]">
                ₹{priceMax.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="2500"
              step="50"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-[#635BFF] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#77758A] dark:text-[#9E9BB2] mt-1">
              <span>₹100</span>
              <span>₹2,500</span>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="pt-4 border-t border-[#E8E7EE] dark:border-[#2C2A42] flex gap-3">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedCondition('All');
              setSelectedAvailability('All');
              setPriceMax(2500);
            }}
            className="btn-secondary flex-1 text-xs py-2.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="btn-primary flex-1 text-xs py-2.5"
          >
            <Check className="w-3.5 h-3.5" />
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
