import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { StudentBitmoji } from './StudentBitmoji';

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    clearCart, 
    checkoutCart, 
    cartCount, 
    cartResaleTotal, 
    cartMarketTotal, 
    cartSavingsTotal,
    setDetailsItem
  } = useMarketplace();

  const [pickupSpot, setPickupSpot] = useState('Central Library Entrance');
  const [isReserving, setIsReserving] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsReserving(true);
    setTimeout(() => {
      checkoutCart(pickupSpot);
      setIsReserving(false);
    }, 400);
  };

  const savingsPercent = cartMarketTotal > 0 ? Math.round((cartSavingsTotal / cartMarketTotal) * 100) : 0;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end animate-fadeIn"
      onClick={() => setIsCartOpen(false)}
    >
      <div 
        className="w-full max-w-md bg-white dark:bg-[#181728] h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-out animate-slideLeft border-l border-[#E8E7EE] dark:border-[#2C2A42]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E7EE] dark:border-[#2C2A42] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EEF0FF] dark:bg-[#635BFF]/25 text-[#635BFF] dark:text-[#A59DFF] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-[#171725] dark:text-[#F3F2FA]">
                  Campus Cart
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#635BFF] text-white">
                  {cartCount}
                </span>
              </div>
              <p className="text-xs text-[#77758A] dark:text-[#9E9BB2]">
                Reserve items for student peer exchange
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartCount > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-[#77758A] hover:text-[#D64545] transition-colors p-1"
                title="Clear all"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-[#77758A] hover:text-[#171725] dark:hover:text-white hover:bg-[#F1F0F7] dark:hover:bg-[#222137] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length > 0 ? (
            cart.map(({ item }) => {
              const itemSavings = item.marketPrice - item.resalePrice;

              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-[#E8E7EE] dark:border-[#2C2A42] bg-[#F8F7FC] dark:bg-[#1F1E33] flex items-start gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#E8E7EE] dark:border-[#2C2A42] cursor-pointer"
                    onClick={() => {
                      setDetailsItem(item);
                      setIsCartOpen(false);
                    }}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EEF0FF] dark:bg-[#635BFF]/30 text-[#635BFF] dark:text-[#A59DFF]">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-[#77758A] dark:text-[#9E9BB2]">
                        {item.condition}
                      </span>
                    </div>

                    <h4 
                      className="text-xs font-bold text-[#171725] dark:text-[#F3F2FA] truncate cursor-pointer hover:text-[#635BFF]"
                      onClick={() => {
                        setDetailsItem(item);
                        setIsCartOpen(false);
                      }}
                    >
                      {item.title}
                    </h4>

                    {/* Price comparison */}
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-extrabold text-[#171725] dark:text-[#F3F2FA] font-['Manrope']">
                        ₹{item.resalePrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-[#77758A] dark:text-[#9E9BB2] line-through">
                        ₹{item.marketPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] font-bold text-[#22A06B] dark:text-[#2EC486]">
                        Save ₹{itemSavings.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Seller Bitmoji */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <StudentBitmoji name={item.sellerName} size={18} />
                      <span className="text-[11px] text-[#77758A] dark:text-[#9E9BB2] truncate">
                        {item.sellerName}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg text-[#77758A] hover:text-[#D64545] hover:bg-[#FDE8E8] dark:hover:bg-[#E65A5A]/20 transition-colors"
                    title="Remove from cart"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 px-4">
              <div className="w-16 h-16 rounded-3xl bg-[#EEF0FF] dark:bg-[#635BFF]/20 text-[#635BFF] dark:text-[#A59DFF] flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
                Your campus cart is empty
              </h4>
              <p className="text-xs text-[#77758A] dark:text-[#9E9BB2] max-w-xs mx-auto mb-6">
                Browse student listings and tap "Add to Cart" to reserve multiple books, notes, and lab tools together.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary text-xs py-2.5 px-5 rounded-xl"
              >
                Browse Marketplace Items
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout (if cart not empty) */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#E8E7EE] dark:border-[#2C2A42] bg-[#F8F7FC] dark:bg-[#141322] space-y-4">
            
            {/* Savings Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#E8F8F1] to-[#EEF0FF] dark:from-[#2EC486]/15 dark:to-[#635BFF]/15 border border-[#22A06B]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#22A06B] dark:text-[#2EC486]" />
                <span className="text-xs font-bold text-[#171725] dark:text-[#F3F2FA]">
                  Total Student Savings:
                </span>
              </div>
              <span className="text-sm font-extrabold text-[#22A06B] dark:text-[#2EC486] font-['Manrope']">
                ₹{cartSavingsTotal.toLocaleString('en-IN')} ({savingsPercent}% OFF)
              </span>
            </div>

            {/* Meetup Pickup Spot */}
            <div>
              <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#635BFF]" />
                Select Campus Pickup Checkpoint
              </label>
              <select
                value={pickupSpot}
                onChange={(e) => setPickupSpot(e.target.value)}
                className="input-field text-xs font-medium cursor-pointer"
              >
                <option value="Central Library Entrance">Central Library Entrance</option>
                <option value="CS Department Ground Floor">CS Department Ground Floor</option>
                <option value="Campus Cafeteria Plaza">Campus Cafeteria Plaza</option>
                <option value="Hostel 1 Common Area">Hostel 1 Common Area</option>
                <option value="Mechanical Workshop Block">Mechanical Workshop Block</option>
              </select>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-[#77758A] dark:text-[#9E9BB2] pt-1">
              <div className="flex justify-between">
                <span>Original Market Value:</span>
                <span className="line-through">₹{cartMarketTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#171725] dark:text-[#F3F2FA] pt-1 border-t border-[#E8E7EE] dark:border-[#2C2A42]">
                <span>Total Resale Price:</span>
                <span className="text-base text-[#635BFF] dark:text-[#8075FF] font-['Manrope']">
                  ₹{cartResaleTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Reserve Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isReserving}
              className="btn-primary w-full py-3.5 text-sm rounded-xl justify-center shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4" />
              {isReserving ? "Reserving Items..." : `Reserve All (${cartCount}) for Campus Pickup`}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#77758A] dark:text-[#9E9BB2]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#22A06B]" />
              <span>50% Price Cap Guarantee Applied</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
