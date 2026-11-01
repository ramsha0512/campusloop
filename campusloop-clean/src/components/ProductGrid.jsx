import React from 'react';
import { SlidersHorizontal, ArrowUpDown, SearchX, RotateCcw } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from './ProductCard';

export const ProductGrid = () => {
  const {
    filteredItems,
    sortBy,
    setSortBy,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedCondition,
    setSelectedCondition,
    setIsMobileFilterOpen
  } = useMarketplace();

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedCondition('All');
    setSortBy('recommended');
  };

  return (
    <div className="w-full">
      {/* Top Filter & Sorting Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8E7EE] dark:border-[#2C2A42]">
        
        {/* Count & Active Filter indicator */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-[#171725] dark:text-[#F3F2FA]">
            Showing <span className="text-[#635BFF] dark:text-[#A59DFF] font-bold">{filteredItems.length}</span> campus listings
          </p>
          {(selectedCategory !== 'All' || searchQuery || selectedCondition !== 'All') && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-[#635BFF] dark:text-[#A59DFF] flex items-center gap-1 hover:underline ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              Reset filters
            </button>
          )}
        </div>

        {/* Controls: Sorting Dropdown & Mobile Filter Drawer Button */}
        <div className="flex items-center gap-3">
          
          {/* Condition Quick Filter on Desktop */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#77758A] dark:text-[#9E9BB2]">
            <span className="font-medium mr-1">Condition:</span>
            {['All', 'Like New', 'Good'].map((cond) => (
              <button
                key={cond}
                onClick={() => setSelectedCondition(cond)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedCondition === cond
                    ? 'bg-[#171725] dark:bg-[#635BFF] text-white'
                    : 'bg-white dark:bg-[#181728] text-[#77758A] dark:text-[#9E9BB2] border border-[#E8E7EE] dark:border-[#2C2A42] hover:text-[#171725] dark:hover:text-white'
                }`}
              >
                {cond}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white dark:bg-[#181728] border border-[#E8E7EE] dark:border-[#2C2A42] rounded-xl px-3 py-1.5 shadow-sm">
            <ArrowUpDown className="w-4 h-4 text-[#77758A] dark:text-[#9E9BB2]" />
            <span className="text-xs font-semibold text-[#77758A] dark:text-[#9E9BB2] hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-[#171725] dark:text-[#F3F2FA] outline-none cursor-pointer border-none pr-2"
              aria-label="Sort listings"
            >
              <option value="recommended" className="dark:bg-[#181728]">Recommended (Best Savings)</option>
              <option value="newest" className="dark:bg-[#181728]">Newest First</option>
              <option value="price_asc" className="dark:bg-[#181728]">Price: Low to High</option>
              <option value="price_desc" className="dark:bg-[#181728]">Price: High to Low</option>
            </select>
          </div>

          {/* Mobile Filter Sheet Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#181728] border border-[#E8E7EE] dark:border-[#2C2A42] rounded-xl text-xs font-bold text-[#171725] dark:text-[#F3F2FA] shadow-sm hover:border-[#635BFF]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#635BFF]" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="card-modern p-12 text-center max-w-md mx-auto my-12 flex flex-col items-center dark:bg-[#181728] dark:border-[#2C2A42]">
          <div className="w-16 h-16 rounded-3xl bg-[#EEF0FF] dark:bg-[#635BFF]/20 flex items-center justify-center text-[#635BFF] dark:text-[#A59DFF] mb-4">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
            No items found
          </h3>
          <p className="text-sm text-[#77758A] dark:text-[#9E9BB2] mb-6 leading-relaxed">
            We couldn't find any campus items matching your search or filter combination.
          </p>
          <button
            onClick={handleResetFilters}
            className="btn-primary text-xs py-2.5 px-5"
          >
            <RotateCcw className="w-4 h-4" />
            Clear All Filters & Show Everything
          </button>
        </div>
      )}
    </div>
  );
};
