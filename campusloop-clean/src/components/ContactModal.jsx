import React, { useState } from 'react';
import { X, Send, MessageSquare, ShieldCheck, User } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { StudentBitmoji } from './StudentBitmoji';

export const ContactModal = () => {
  const { contactItem, setContactItem, sendSellerInquiry } = useMarketplace();
  const { user } = useAuth();

  const [message, setMessage] = useState("Hi! I'm interested in this item. Is it still available?");
  const [meetingLocation, setMeetingLocation] = useState("Central Library / Cafeteria");
  const [isSending, setIsSending] = useState(false);

  if (!contactItem) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      sendSellerInquiry(contactItem.id, message);
      setIsSending(false);
      setContactItem(null);
    }, 400);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={() => setContactItem(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="modal-content w-full max-w-lg p-6 sm:p-7 relative dark:bg-[#181728] dark:border-[#2C2A42]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E7EE] dark:border-[#2C2A42]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EEF0FF] dark:bg-[#635BFF]/25 text-[#635BFF] dark:text-[#A59DFF] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 id="contact-modal-title" className="text-lg font-bold text-[#171725] dark:text-[#F3F2FA] font-['Manrope']">
                Contact Seller
              </h3>
              <p className="text-xs text-[#77758A] dark:text-[#9E9BB2]">Direct peer-to-peer campus inquiry</p>
            </div>
          </div>
          <button
            onClick={() => setContactItem(null)}
            className="p-1.5 rounded-lg text-[#77758A] hover:text-[#171725] dark:hover:text-white hover:bg-[#F1F0F7] dark:hover:bg-[#222137] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item & Seller Card Preview with Student Bitmoji */}
        <div className="my-5 p-3.5 rounded-2xl bg-[#F8F7FC] dark:bg-[#222137] border border-[#E8E7EE] dark:border-[#2C2A42] flex items-center gap-3.5">
          <img
            src={contactItem.image}
            alt={contactItem.title}
            className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#E8E7EE] dark:border-[#2C2A42]"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#171725] dark:text-[#F3F2FA] truncate">
              {contactItem.title}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-extrabold text-[#635BFF] dark:text-[#A59DFF]">
                ₹{contactItem.resalePrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-[#77758A] dark:text-[#9E9BB2]">
                (Retail: ₹{contactItem.marketPrice.toLocaleString('en-IN')})
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#77758A] dark:text-[#9E9BB2] mt-1.5">
              <StudentBitmoji name={contactItem.sellerName} size={20} />
              <span>Seller: <strong className="text-[#171725] dark:text-[#F3F2FA]">{contactItem.sellerName}</strong></span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1.5">
              Message to Seller
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-field resize-none text-xs leading-relaxed"
              placeholder="Write your inquiry or question about this item..."
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1.5">
              Proposed Campus Meetup Spot (Optional)
            </label>
            <input
              type="text"
              value={meetingLocation}
              onChange={(e) => setMeetingLocation(e.target.value)}
              className="input-field text-xs"
              placeholder="e.g. Central Library, CS Department, Canteen"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#E8F8F1] dark:bg-[#2EC486]/15 border border-[#22A06B]/20 flex items-center gap-2 text-xs text-[#146C43] dark:text-[#2EC486]">
            <ShieldCheck className="w-4 h-4 text-[#22A06B] shrink-0" />
            <span>Secure Student-to-Student Campus Communication</span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setContactItem(null)}
              className="btn-secondary text-xs py-2.5 px-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending || !message.trim()}
              className="btn-primary text-xs py-2.5 px-5"
            >
              <Send className="w-3.5 h-3.5" />
              {isSending ? "Sending..." : "Send Interest"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
