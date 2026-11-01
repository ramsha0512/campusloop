import React from 'react';
import { Heart, Sparkles, ArrowRight, Clock, ShoppingBag, MessageSquare } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { StudentBitmoji } from './StudentBitmoji';

export const ProductCard = ({ item }) => {
  const { 
    toggleFavorite, 
    isFavorite, 
    setDetailsItem, 
    setContactItem, 
    addToCart, 
    cart 
  } = useMarketplace();

  const favorited = isFavorite(item.id);
  const isInCart = cart.some((c) => c.item.id === item.id);

  const savings = item.marketPrice - item.resalePrice;
  const savingsPercent = Math.round((savings / item.marketPrice) * 100);

  const isReserved = item.status === 'Reserved';

  const handleCardClick = (e) => {
    if (e.target.closest('.no-card-click')) return;
    setDetailsItem(item);
  };

  return (
    <div
      onClick={handleCardClick}
      className="card-modern card-hover group flex flex-col cursor-pointer bg-white dark:bg-[#181728] border border-[#E8E7EE] dark:border-[#2C2A42]"
    >
      {/* Image & Overlay Badges */}
      <div className="product-img-wrapper aspect-[4/3] w-full overflow-hidden relative">
        <img
          src={item.image}
          alt={item.title}
          className="product-img w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
          }}
          className="no-card-click absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 dark:bg-[#181728]/90 backdrop-blur-md shadow-md flex items-center justify-center text-[#77758A] dark:text-[#9E9BB2] hover:text-[#E11D48] transition-all hover:scale-110 active:scale-90"
          title={favorited ? "Remove from favorites" : "Save to favorites"}
          aria-label="Toggle favorite"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              favorited ? 'text-[#E11D48] fill-[#E11D48]' : 'text-[#77758A] dark:text-[#9E9BB2]'
            }`}
          />
        </button>

        {/* Top-Left Category & Status Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className="badge badge-category shadow-sm">
            {item.category}
          </span>
          {isReserved ? (
            <span className="badge badge-reserved shadow-sm">
              <Clock className="w-3 h-3" />
              Reserved
            </span>
          ) : (
            <span className="badge badge-available shadow-sm">
              Available
            </span>
          )}
        </div>

        {/* Affordability Discount Ribbon */}
        <div className="absolute bottom-3 left-3 bg-[#171725]/85 dark:bg-[#0E0D17]/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <Sparkles className="w-3 h-3 text-[#22A06B]" />
          <span>Save ₹{savings.toLocaleString('en-IN')} ({savingsPercent}% OFF)</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Condition tag */}
          <div className="flex items-center justify-between text-xs text-[#77758A] dark:text-[#9E9BB2] mb-1.5">
            <span className="font-medium bg-[#F1F0F7] dark:bg-[#222137] px-2 py-0.5 rounded text-[11px]">
              Condition: {item.condition}
            </span>
            <span className="text-[11px] truncate max-w-[120px]" title={item.location}>
              {item.location || 'On Campus'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-[#171725] dark:text-[#F3F2FA] line-clamp-1 group-hover:text-[#635BFF] dark:group-hover:text-[#8075FF] transition-colors leading-snug">
            {item.title}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#77758A] dark:text-[#9E9BB2] line-clamp-2 mt-1.5 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="mt-4 pt-3 border-t border-[#E8E7EE] dark:border-[#2C2A42]">
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-[#77758A] dark:text-[#9E9BB2]">
                Market <span className="line-through text-[#A3A1B2]">₹{item.marketPrice.toLocaleString('en-IN')}</span>
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-[#171725] dark:text-[#F3F2FA] font-['Manrope']">
                  ₹{item.resalePrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] font-bold text-[#22A06B] dark:text-[#2EC486] bg-[#E8F8F1] dark:bg-[#2EC486]/20 px-1.5 py-0.5 rounded">
                  ≤ 50% Cap
                </span>
              </div>
            </div>

            {/* Quick Add to Cart Button */}
            {!isReserved && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
                className={`no-card-click flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-sm ${
                  isInCart
                    ? 'bg-[#EEF0FF] dark:bg-[#635BFF]/25 text-[#635BFF] dark:text-[#A59DFF] border border-[#635BFF]/30'
                    : 'bg-[#635BFF] text-white hover:bg-[#5046E5] hover:scale-105 active:scale-95'
                }`}
                title={isInCart ? "Already in cart" : "Add to Cart"}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{isInCart ? 'In Cart' : 'Add to Cart'}</span>
              </button>
            )}
          </div>

          {/* Seller line with Student Bitmoji */}
          <div className="flex items-center justify-between text-xs text-[#77758A] dark:text-[#9E9BB2] mt-2 pt-2 border-t border-dashed border-[#E8E7EE]/80 dark:border-[#2C2A42]">
            <div className="flex items-center gap-2 truncate">
              <StudentBitmoji name={item.sellerName} size={22} />
              <span className="truncate text-[11px] font-semibold text-[#171725] dark:text-[#F3F2FA]">
                {item.sellerName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {!isReserved && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setContactItem(item);
                  }}
                  className="no-card-click text-[11px] font-semibold text-[#635BFF] dark:text-[#8075FF] hover:underline"
                >
                  Chat
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDetailsItem(item);
                }}
                className="text-xs font-bold text-[#635BFF] dark:text-[#8075FF] flex items-center gap-0.5 hover:gap-1 transition-all"
              >
                Details
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
