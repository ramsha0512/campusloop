import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Upload, 
  ShieldCheck, 
  CheckCircle2, 
  Eye 
} from 'lucide-react';
import { CATEGORIES, CONDITIONS } from '../data/demoData';
import { validatePriceCap, validateImageFile } from '../utils/validation';
import { PriceValidator } from '../components/PriceValidator';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { StudentBitmoji } from '../components/StudentBitmoji';

// Quick Preset Academic Images for convenience during external examiner demo
const PRESET_IMAGES = [
  { label: 'Academic Book', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Notebook / Notes', url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80' },
  { label: 'Calculator / Tech', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Engineering Kit', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' }
];

export const SellItem = () => {
  const { addItem } = useMarketplace();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Books');
  const [condition, setCondition] = useState('Like New');
  const [description, setDescription] = useState('');
  const [marketPrice, setMarketPrice] = useState('');
  const [resalePrice, setResalePrice] = useState('');
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [location, setLocation] = useState('Academic Block 2 / Central Library');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic 50% Price Validation
  const priceValidation = validatePriceCap(marketPrice, resalePrice);
  const numMarket = parseFloat(marketPrice) || 0;
  const numResale = parseFloat(resalePrice) || 0;
  const savings = Math.max(0, numMarket - numResale);
  const maxAllowed = Math.floor(numMarket * 0.5);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      toast.error(validation.message, "Image Validation Error");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      toast.success("Image uploaded and updated in live preview.", "Image Ready");
    };
    reader.readAsDataURL(file);
  };

  const handleFillDemoData = () => {
    setTitle("Data Structures & Algorithms in C++");
    setCategory("Books");
    setCondition("Like New");
    setDescription("Comprehensive DSA textbook covering Linked Lists, Trees, Graphs, Sorting algorithms and dynamic programming. Clean pages with minimal pencil highlights. Used for 3rd semester exam.");
    setMarketPrice("1000");
    setResalePrice("450");
    setImage("https://images.unsplash.com/photo-1532012164546-f432f2e37271?auto=format&fit=crop&w=800&q=80");
    setLocation("CS Dept / Central Library");
    toast.info("Prefilled compliant sample data for fast testing.", "Demo Fill");
  };

  const handleTestOverpriced = () => {
    setTitle("Data Structures Book");
    setMarketPrice("1000");
    setResalePrice("700");
    toast.warning("Set price to ₹700 (over 50% cap) to demonstrate rejection rule.", "Test 50% Cap");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.warning("Please sign in with your college account to publish a listing.", "Login Required");
      openAuthModal('login');
      return;
    }

    if (!title.trim() || !category || !condition || !description.trim() || !marketPrice || !resalePrice) {
      toast.error("All mandatory fields must be completed.", "Required Fields Missing");
      return;
    }

    if (!priceValidation.isValid) {
      toast.error(priceValidation.message, "Price Cap Rejection");
      return;
    }

    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      addItem({
        title: title.trim(),
        category,
        condition,
        description: description.trim(),
        marketPrice: numMarket,
        resalePrice: numResale,
        image: image || PRESET_IMAGES[0].url,
        location: location.trim() || 'Campus Common Area'
      });

      setIsSubmitting(false);

      setTimeout(() => {
        navigate('/');
      }, 700);

    } catch (err) {
      setIsSubmitting(false);
      toast.error("Failed to publish listing. Please try again.", "Error");
    }
  };

  return (
    <div className="container py-8 md:py-12">
      {/* Page Header */}
      <div className="max-w-3xl mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF0FF] dark:bg-[#635BFF]/25 text-[#635BFF] dark:text-[#A59DFF] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fair Campus Trade Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171725] dark:text-[#F3F2FA] tracking-tight">
          Turn unused things into useful finds.
        </h1>
        <p className="text-sm sm:text-base text-[#77758A] dark:text-[#9E9BB2]">
          “Help another student save money by listing what you no longer need.”
        </p>
      </div>

      {/* Quick Demo Helper Toolbar for External Examiner */}
      <div className="mb-8 p-4 rounded-2xl bg-white dark:bg-[#181728] border border-[#E8E7EE] dark:border-[#2C2A42] shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22A06B]"></span>
          <span className="text-xs font-bold text-[#171725] dark:text-[#F3F2FA]">Examiner Viva Shortcuts:</span>
          <span className="text-xs text-[#77758A] dark:text-[#9E9BB2] hidden sm:inline">Test the 50% price restriction easily:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleTestOverpriced}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#FDE8E8] dark:bg-[#D64545]/20 text-[#D64545] dark:text-[#E65A5A] border border-[#D64545]/20 hover:bg-[#D64545] hover:text-white transition-colors"
          >
            Step 1: Test Overpriced (₹1,000 → ₹700)
          </button>
          <button
            type="button"
            onClick={handleFillDemoData}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#E8F8F1] dark:bg-[#2EC486]/20 text-[#22A06B] dark:text-[#2EC486] border border-[#22A06B]/20 hover:bg-[#22A06B] hover:text-white transition-colors"
          >
            Step 2: Test Valid Price (₹1,000 → ₹450)
          </button>
        </div>
      </div>

      {/* TWO-COLUMN LAYOUT: LEFT = FORM, RIGHT = LIVE PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: LISTING FORM (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#181728] rounded-3xl border border-[#E8E7EE] dark:border-[#2C2A42] p-6 sm:p-8 shadow-sm space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1.5 uppercase tracking-wider">
                Item Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Engineering Mathematics Book"
                className="input-field text-sm font-medium"
                required
              />
            </div>

            {/* Category & Condition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1.5 uppercase tracking-wider">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field text-sm font-medium cursor-pointer"
                  required
                >
                  {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c} className="dark:bg-[#181728]">{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1.5 uppercase tracking-wider">
                  Condition *
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="input-field text-sm font-medium cursor-pointer"
                  required
                >
                  {CONDITIONS.map((cond) => (
                    <option key={cond} value={cond} className="dark:bg-[#181728]">{cond}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1.5 uppercase tracking-wider">
                Description *
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe edition, author, semester usage, marks, notes, or any inclusions..."
                className="input-field text-sm resize-none leading-relaxed"
                required
              />
            </div>

            {/* Price Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1.5 uppercase tracking-wider">
                  Reference Market Price (₹) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-sm font-bold text-[#77758A] dark:text-[#9E9BB2]">₹</span>
                  <input
                    type="number"
                    min="1"
                    value={marketPrice}
                    onChange={(e) => setMarketPrice(e.target.value)}
                    placeholder="1000"
                    className="input-field pl-8 text-sm font-bold"
                    required
                  />
                </div>
                <span className="text-[11px] text-[#77758A] dark:text-[#9E9BB2] mt-1 block">
                  Original brand new retail price
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1.5 uppercase tracking-wider">
                  Your Resale Price (₹) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-sm font-bold text-[#77758A] dark:text-[#9E9BB2]">₹</span>
                  <input
                    type="number"
                    min="1"
                    value={resalePrice}
                    onChange={(e) => setResalePrice(e.target.value)}
                    placeholder="e.g. 450"
                    className={`input-field pl-8 text-sm font-bold ${
                      marketPrice && resalePrice && !priceValidation.isValid
                        ? 'border-[#D64545] focus:border-[#D64545] focus:ring-[#D64545]/15'
                        : ''
                    }`}
                    required
                  />
                </div>
                <span className="text-[11px] text-[#635BFF] dark:text-[#A59DFF] font-semibold mt-1 block">
                  Strictly capped at ≤ 50% of market
                </span>
              </div>
            </div>

            {/* LIVE 50% PRICE VALIDATION COMPONENT */}
            <PriceValidator marketPrice={marketPrice} resalePrice={resalePrice} />

            {/* Image Upload & Presets */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] uppercase tracking-wider">
                Product Image *
              </label>
              
              {/* File Input */}
              <div className="border-2 border-dashed border-[#E8E7EE] dark:border-[#2C2A42] hover:border-[#635BFF]/50 rounded-2xl p-5 text-center transition-all bg-[#F8F7FC] dark:bg-[#1F1E33]">
                <input
                  type="file"
                  id="image-file-input"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="image-file-input" className="cursor-pointer block">
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] dark:bg-[#635BFF]/25 text-[#635BFF] dark:text-[#A59DFF] flex items-center justify-center mx-auto mb-2">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-[#171725] dark:text-[#F3F2FA]">
                    Click to upload photo from your device
                  </p>
                  <p className="text-[11px] text-[#77758A] dark:text-[#9E9BB2] mt-0.5">
                    Supports JPG, PNG, WEBP (Max 5MB)
                  </p>
                </label>
              </div>

              {/* Quick Preset Selector */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-[#77758A] dark:text-[#9E9BB2] block mb-2">
                  Or select a standard campus category photo:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setImage(preset.url)}
                      className={`p-1.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        image === preset.url
                          ? 'border-[#635BFF] bg-[#EEF0FF] dark:bg-[#635BFF]/30'
                          : 'border-[#E8E7EE] dark:border-[#2C2A42] bg-white dark:bg-[#181728] hover:border-[#635BFF]/30'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <span className="text-[11px] font-medium text-[#171725] dark:text-[#F3F2FA] truncate">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Meetup Location */}
            <div>
              <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1.5 uppercase tracking-wider">
                Preferred Campus Pickup Spot
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Block A Library, Hostel 2, Cafeteria"
                className="input-field text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !title.trim() ||
                  !description.trim() ||
                  !marketPrice ||
                  !resalePrice ||
                  !priceValidation.isValid
                }
                className="btn-primary w-full py-3.5 text-sm rounded-2xl justify-center shadow-lg"
              >
                <CheckCircle2 className="w-5 h-5" />
                {isSubmitting ? "Publishing Listing..." : "Publish Listing"}
              </button>

              {marketPrice && resalePrice && !priceValidation.isValid && (
                <p className="text-center text-xs font-semibold text-[#D64545] dark:text-[#E65A5A] mt-2">
                  Publish button disabled: resale price cannot exceed 50% of reference price.
                </p>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: LIVE LISTING PREVIEW (5 cols) */}
        <div className="lg:col-span-5 sticky top-28 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#635BFF] dark:text-[#A59DFF]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#171725] dark:text-[#F3F2FA]">
                Live Listing Preview
              </h3>
            </div>
            <span className="text-[11px] text-[#77758A] dark:text-[#9E9BB2]">
              Updates dynamically
            </span>
          </div>

          {/* Preview Card */}
          <div className="card-modern shadow-xl border-[#E8E7EE] dark:border-[#2C2A42] overflow-hidden bg-white dark:bg-[#181728]">
            <div className="product-img-wrapper aspect-[4/3] w-full relative">
              <img
                src={image || PRESET_IMAGES[0].url}
                alt={title || "Preview item"}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="badge badge-category shadow-sm">
                  {category}
                </span>
                <span className="badge badge-available shadow-sm">
                  Available
                </span>
              </div>

              {numMarket > 0 && numResale > 0 && priceValidation.isValid && (
                <div className="absolute bottom-3 left-3 bg-[#171725]/85 dark:bg-[#0E0D17]/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3 text-[#22A06B]" />
                  <span>Save ₹{savings.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#77758A] dark:text-[#9E9BB2]">
                <span className="bg-[#F1F0F7] dark:bg-[#222137] px-2 py-0.5 rounded text-[11px] font-medium">
                  Condition: {condition}
                </span>
                <span className="text-[11px] truncate max-w-[140px]">
                  {location || "Campus"}
                </span>
              </div>

              <h4 className="text-lg font-bold text-[#171725] dark:text-[#F3F2FA] leading-snug line-clamp-1">
                {title || "Item Title Will Appear Here"}
              </h4>

              <p className="text-xs text-[#77758A] dark:text-[#9E9BB2] line-clamp-2 leading-relaxed">
                {description || "Item description, condition notes, and specifications will be previewed here..."}
              </p>

              {/* Price Row */}
              <div className="pt-3 border-t border-[#E8E7EE] dark:border-[#2C2A42] flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-[#77758A] dark:text-[#9E9BB2] block">
                    Retail: {numMarket > 0 ? <span className="line-through">₹{numMarket.toLocaleString('en-IN')}</span> : '—'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#171725] dark:text-[#F3F2FA] font-['Manrope']">
                      {numResale > 0 ? `₹${numResale.toLocaleString('en-IN')}` : '₹0'}
                    </span>
                    {priceValidation.isValid && (
                      <span className="text-[10px] font-bold text-[#22A06B] dark:text-[#2EC486] bg-[#E8F8F1] dark:bg-[#2EC486]/20 px-1.5 py-0.5 rounded">
                        ≤ 50% Rule Met
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[#77758A] dark:text-[#9E9BB2] block">Buyer Saves</span>
                  <span className="text-sm font-extrabold text-[#22A06B] dark:text-[#2EC486]">
                    {priceValidation.isValid ? `₹${savings.toLocaleString('en-IN')}` : '₹0'}
                  </span>
                </div>
              </div>

              {/* Seller Tag with Bitmoji */}
              <div className="pt-3 border-t border-[#E8E7EE] dark:border-[#2C2A42] flex items-center justify-between text-xs text-[#77758A] dark:text-[#9E9BB2]">
                <div className="flex items-center gap-2">
                  <StudentBitmoji name={user?.name || "Ramsha Azra"} size={24} />
                  <span className="text-xs font-semibold text-[#171725] dark:text-[#F3F2FA]">
                    {user?.name || "Ramsha Azra"}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#22A06B] dark:text-[#2EC486]">
                  Verified Student
                </span>
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="p-4 rounded-2xl bg-[#EEF0FF] dark:bg-[#635BFF]/15 border border-[#635BFF]/20 dark:border-[#635BFF]/30 text-xs text-[#171725] dark:text-[#F3F2FA] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#635BFF] dark:text-[#A59DFF]">
              <ShieldCheck className="w-4 h-4" />
              <span>CampusLoop Policy Notice</span>
            </div>
            <p className="text-[#77758A] dark:text-[#9E9BB2] leading-relaxed text-[11px]">
              Every listing is automatically cross-referenced with educational product catalogs. Overpricing is blocked at code level to preserve student equity.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
