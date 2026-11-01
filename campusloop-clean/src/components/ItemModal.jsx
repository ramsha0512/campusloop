import React from 'react';
import { 
  X, 
  Heart, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Share2,
  ShoppingBag,
  Clock
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useToast } from '../context/ToastContext';
import { StudentBitmoji } from './StudentBitmoji';

export const ItemModal = () => {
  const { 
    detailsItem, 
    setDetailsItem, 
    setContactItem, 
    toggleFavorite, 
    isFavorite,
    addToCart,
    cart
  } = useMarketplace();
  const toast = useToast();

  if (!detailsItem) return null;

  const item = detailsItem;
  const favorited = isFavorite(item.id);
  const isInCart = cart.some((c) => c.item.id === item.id);
  const savings = item.marketPrice - item.resalePrice;
  const savingsPercent = Math.round((savings / item.marketPrice) * 100);
  const maxAllowed = Math.floor(item.marketPrice * 0.5);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.info("Listing link copied to clipboard for campus sharing!", "Link Copied");
  };

  return (
    <div 
      className="modal-backdrop"
      onClick={() => setDetailsItem(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="item-modal-title"
    >
      <div 
        className="modal-content w-full max-w-4xl p-0 overflow-hidden relative dark:bg-[#181728] dark:border-[#2C2A42]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setDetailsItem(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-[#181728]/90 backdrop-blur-md shadow-md flex items-center justify-center text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white transition-all hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Big Image & Badges */}
          <div className="relative bg-[#F8F7FC] dark:bg-[#1F1E33] flex flex-col justify-center items-center overflow-hidden min-h-[300px] md:min-h-[480px]">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover max-h-[480px]"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";
              }}
            />

            {/* Float Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="badge badge-category shadow-md">
                {item.category}
              </span>
              <span className="badge badge-condition shadow-md">
                Condition: {item.condition}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-[#171725]/85 dark:bg-[#0E0D17]/90 backdrop-blur-md text-white p-3 rounded-2xl flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#22A06B] dark:text-[#2EC486]" />
                  <span className="text-xs font-semibold">Campus Guaranteed Discount</span>
                </div>
                <span className="text-xs font-extrabold text-[#22A06B] dark:text-[#2EC486]">
                  Save ₹{savings.toLocaleString('en-IN')} ({savingsPercent}% OFF)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Affordability Rule, Seller, Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#635BFF] dark:text-[#8075FF]">
                    {item.category} · Verified Campus Item
                  </span>
                  <span className={`badge ${item.status === 'Available' ? 'badge-available' : 'badge-reserved'}`}>
                    {item.status}
                  </span>
                </div>
                <h2 id="item-modal-title" className="text-2xl font-extrabold text-[#171725] dark:text-[#F3F2FA] leading-tight">
                  {item.title}
                </h2>
              </div>

              {/* Price Details Block */}
              <div className="p-4 rounded-2xl bg-[#F8F7FC] dark:bg-[#222137] border border-[#E8E7EE] dark:border-[#2C2A42] space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-[#77758A] dark:text-[#9E9BB2] block">Campus Resale Price</span>
                    <span className="text-3xl font-extrabold text-[#171725] dark:text-[#F3F2FA] font-['Manrope']">
                      ₹{item.resalePrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#77758A] dark:text-[#9E9BB2] block">Market Retail Price</span>
                    <span className="text-base text-[#77758A] dark:text-[#9E9BB2] line-through font-semibold">
                      ₹{item.marketPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E8E7EE] dark:border-[#2C2A42]">
                  <span className="text-[#77758A] dark:text-[#9E9BB2]">Maximum Permitted Resale Price:</span>
                  <span className="font-bold text-[#635BFF] dark:text-[#A59DFF]">₹{maxAllowed.toLocaleString('en-IN')} (50% Cap)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#77758A] dark:text-[#9E9BB2]">Total Money Saved by Student:</span>
                  <span className="font-bold text-[#22A06B] dark:text-[#2EC486]">₹{savings.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#171725] dark:text-[#F3F2FA] mb-1.5">
                  Item Description
                </h4>
                <p className="text-sm text-[#77758A] dark:text-[#9E9BB2] leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>

              {/* Prominent "Affordable by design" callout */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#EEF0FF] to-[#E8F8F1] dark:from-[#635BFF]/15 dark:to-[#2EC486]/15 border border-[#635BFF]/20 dark:border-[#635BFF]/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#635BFF] dark:text-[#8075FF] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-[#171725] dark:text-[#F3F2FA] mb-0.5">
                    Affordable by Design
                  </p>
                  <p className="text-[#77758A] dark:text-[#9E9BB2] leading-relaxed">
                    “This listing follows CampusLoop's rule that resale prices cannot exceed 50% of the reference market price.”
                  </p>
                </div>
              </div>

              {/* Seller Profile with Student Bitmoji */}
              <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1A192B] border border-[#E8E7EE] dark:border-[#2C2A42] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <StudentBitmoji name={item.sellerName} size={42} />
                  <div>
                    <h5 className="font-bold text-sm text-[#171725] dark:text-[#F3F2FA]">{item.sellerName}</h5>
                    <p className="text-xs text-[#77758A] dark:text-[#9E9BB2]">{item.sellerCollege || 'Amity University Student'}</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#22A06B] dark:text-[#2EC486] bg-[#E8F8F1] dark:bg-[#2EC486]/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
            </div>

            {/* Bottom Actions: Add to Cart, Contact Seller, Save, Share */}
            <div className="pt-6 mt-6 border-t border-[#E8E7EE] dark:border-[#2C2A42] flex flex-wrap items-center gap-3">
              {/* Add to Cart button */}
              {item.status !== 'Sold' && (
                <button
                  onClick={() => addToCart(item)}
                  className={`py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    isInCart
                      ? 'bg-[#EEF0FF] dark:bg-[#635BFF]/30 text-[#635BFF] dark:text-[#A59DFF] border border-[#635BFF]/30'
                      : 'bg-[#635BFF] text-white hover:bg-[#5046E5] shadow-md'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isInCart ? 'In Campus Cart' : 'Add to Cart'}</span>
                </button>
              )}

              {/* Contact Seller button */}
              <button
                onClick={() => {
                  setDetailsItem(null);
                  setContactItem(item);
                }}
                disabled={item.status === 'Sold'}
                className="btn-secondary flex-1 py-3 text-xs rounded-xl"
              >
                <MessageSquare className="w-4 h-4 text-[#635BFF]" />
                Contact Seller
              </button>

              {/* Favorite button */}
              <button
                onClick={() => toggleFavorite(item.id)}
                className={`p-3 rounded-xl border border-[#E8E7EE] dark:border-[#2C2A42] transition-all flex items-center justify-center ${
                  favorited
                    ? 'bg-[#FDE8E8] text-[#E11D48] border-[#E11D48]/30'
                    : 'bg-white dark:bg-[#181728] text-[#77758A] hover:bg-[#F8F7FC] dark:hover:bg-[#222137]'
                }`}
                title={favorited ? "Saved in favorites" : "Save item"}
                aria-label="Save item to favorites"
              >
                <Heart className={`w-5 h-5 ${favorited ? 'fill-[#E11D48]' : ''}`} />
              </button>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="p-3 rounded-xl border border-[#E8E7EE] dark:border-[#2C2A42] bg-white dark:bg-[#181728] text-[#77758A] hover:bg-[#F8F7FC] dark:hover:bg-[#222137] transition-colors"
                title="Share listing"
                aria-label="Share listing"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
