import React, { useState, useEffect } from 'react';
import { X, Save, Edit3, Image, ShieldCheck, AlertCircle } from 'lucide-react';
import { CATEGORIES, CONDITIONS } from '../data/demoData';
import { validatePriceCap, validateImageFile } from '../utils/validation';
import { useMarketplace } from '../context/MarketplaceContext';
import { PriceValidator } from './PriceValidator';
import { useToast } from '../context/ToastContext';

export const EditItemModal = () => {
  const { editingItem, setEditingItem, updateItem } = useMarketplace();
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Books');
  const [condition, setCondition] = useState('Good');
  const [description, setDescription] = useState('');
  const [marketPrice, setMarketPrice] = useState('');
  const [resalePrice, setResalePrice] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title || '');
      setCategory(editingItem.category || 'Books');
      setCondition(editingItem.condition || 'Good');
      setDescription(editingItem.description || '');
      setMarketPrice(editingItem.marketPrice?.toString() || '');
      setResalePrice(editingItem.resalePrice?.toString() || '');
      setImage(editingItem.image || '');
      setLocation(editingItem.location || '');
    }
  }, [editingItem]);

  if (!editingItem) return null;

  const priceValidation = validatePriceCap(marketPrice, resalePrice);

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileCheck = validateImageFile(file);
    if (!fileCheck.isValid) {
      toast.error(fileCheck.message, "Image Upload Failed");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      toast.success("New item photo loaded.", "Photo Updated");
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !marketPrice || !resalePrice) {
      toast.error("Please fill in all mandatory fields.", "Validation Failed");
      return;
    }

    if (!priceValidation.isValid) {
      toast.error(priceValidation.message, "Price Cap Exceeded");
      return;
    }

    const numMarket = parseFloat(marketPrice);
    const numResale = parseFloat(resalePrice);

    updateItem(editingItem.id, {
      title: title.trim(),
      category,
      condition,
      description: description.trim(),
      marketPrice: numMarket,
      resalePrice: numResale,
      image,
      location: location.trim() || 'Campus Common Area'
    });

    setEditingItem(null);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={() => setEditingItem(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-modal-title"
    >
      <div
        className="modal-content w-full max-w-2xl p-6 sm:p-8 relative dark:bg-[#181728] dark:border-[#2C2A42]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setEditingItem(null)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white hover:bg-[#F1F0F7] dark:hover:bg-[#222137]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#E8E7EE] dark:border-[#2C2A42]">
          <div className="w-10 h-10 rounded-2xl bg-[#EEF0FF] dark:bg-[#635BFF]/25 text-[#635BFF] dark:text-[#A59DFF] flex items-center justify-center">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <h3 id="edit-modal-title" className="text-xl font-bold text-[#171725] dark:text-[#F3F2FA]">
              Edit Listing Details
            </h3>
            <p className="text-xs text-[#77758A] dark:text-[#9E9BB2]">
              Modify item description, category, and update your fair price
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
              Item Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field text-xs"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field text-xs cursor-pointer"
              >
                {CATEGORIES.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c} className="dark:bg-[#181728]">{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
                Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="input-field text-xs cursor-pointer"
              >
                {CONDITIONS.map(cond => (
                  <option key={cond} value={cond} className="dark:bg-[#181728]">{cond}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
              Description *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field text-xs resize-none"
              required
            />
          </div>

          {/* Price inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
                Reference Market Price (₹) *
              </label>
              <input
                type="number"
                min="1"
                value={marketPrice}
                onChange={(e) => setMarketPrice(e.target.value)}
                className="input-field text-xs font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
                Your Resale Price (₹) (Max 50%) *
              </label>
              <input
                type="number"
                min="1"
                value={resalePrice}
                onChange={(e) => setResalePrice(e.target.value)}
                className={`input-field text-xs font-semibold ${
                  marketPrice && resalePrice && !priceValidation.isValid
                    ? 'border-[#D64545] focus:border-[#D64545]'
                    : ''
                }`}
                required
              />
            </div>
          </div>

          {/* Dynamic 50% Price Visualizer */}
          <PriceValidator marketPrice={marketPrice} resalePrice={resalePrice} />

          {/* Image file change */}
          <div>
            <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
              Update Image (Optional)
            </label>
            <div className="flex items-center gap-3">
              <img
                src={image}
                alt="Current preview"
                className="w-14 h-14 rounded-xl object-cover border border-[#E8E7EE] dark:border-[#2C2A42]"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageFileChange}
                className="text-xs text-[#77758A] dark:text-[#9E9BB2] file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#EEF0FF] dark:file:bg-[#635BFF]/30 file:text-[#635BFF] dark:file:text-[#A59DFF] hover:file:bg-[#635BFF] hover:file:text-white transition-all cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E8E7EE] dark:border-[#2C2A42]">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="btn-secondary text-xs py-2 px-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!priceValidation.isValid}
              className="btn-primary text-xs py-2.5 px-6"
            >
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
