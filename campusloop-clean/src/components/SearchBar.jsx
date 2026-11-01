import React from 'react';
import { Search, X } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useMarketplace();

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute left-4.5 text-[#635BFF] dark:text-[#A59DFF] pointer-events-none">
          <Search className="w-5 h-5 ml-1" />
        </div>
        <input
          id="marketplace-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search books, calculators, notes, equipment, sellers..."
          className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-[#181728] border border-[#E8E7EE] dark:border-[#2C2A42] rounded-2xl text-sm md:text-base text-[#171725] dark:text-[#F3F2FA] placeholder-[#A3A1B2] dark:placeholder-[#6C6885] shadow-sm hover:border-[#635BFF]/40 focus:border-[#635BFF] focus:ring-4 focus:ring-[#635BFF]/10 transition-all outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 p-1.5 rounded-full text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white hover:bg-[#F1F0F7] dark:hover:bg-[#222137] transition-colors"
            title="Clear search"
            aria-label="Clear search input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {searchQuery && (
        <div className="mt-2 text-xs text-[#77758A] dark:text-[#9E9BB2] flex items-center justify-between px-2">
          <span>Filtering results for: <strong className="text-[#171725] dark:text-[#F3F2FA]">"{searchQuery}"</strong></span>
          <button 
            onClick={() => setSearchQuery('')}
            className="text-[#635BFF] dark:text-[#A59DFF] hover:underline font-semibold"
          >
            Reset query
          </button>
        </div>
      )}
    </div>
  );
};
