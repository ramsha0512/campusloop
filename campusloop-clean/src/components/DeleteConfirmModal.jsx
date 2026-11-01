import React from 'react';
import { Trash2, X } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const DeleteConfirmModal = () => {
  const { deleteCandidate, setDeleteCandidate, deleteItem } = useMarketplace();

  if (!deleteCandidate) return null;

  const handleConfirm = () => {
    deleteItem(deleteCandidate.id);
    setDeleteCandidate(null);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={() => setDeleteCandidate(null)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div
        className="modal-content w-full max-w-md p-6 relative dark:bg-[#181728] dark:border-[#2C2A42]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setDeleteCandidate(null)}
          className="absolute top-4 right-4 p-1 rounded-lg text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FDE8E8] dark:bg-[#E65A5A]/20 text-[#D64545] dark:text-[#E65A5A] flex items-center justify-center shrink-0">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <h3 id="delete-modal-title" className="text-lg font-bold text-[#171725] dark:text-[#F3F2FA]">
              Delete Listing
            </h3>
            <p className="text-xs text-[#77758A] dark:text-[#9E9BB2]">
              Are you sure you want to remove this listing from CampusLoop?
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-[#F8F7FC] dark:bg-[#222137] rounded-xl border border-[#E8E7EE] dark:border-[#2C2A42] my-4 flex items-center gap-3">
          <img
            src={deleteCandidate.image}
            alt={deleteCandidate.title}
            className="w-12 h-12 rounded-lg object-cover border border-[#E8E7EE] dark:border-[#2C2A42]"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#171725] dark:text-[#F3F2FA] truncate">
              {deleteCandidate.title}
            </p>
            <p className="text-xs font-extrabold text-[#635BFF] dark:text-[#A59DFF]">
              ₹{deleteCandidate.resalePrice.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <p className="text-xs text-[#77758A] dark:text-[#9E9BB2] mb-6 leading-relaxed">
          This action cannot be undone. Once deleted, this item will no longer appear on your dashboard or in the marketplace.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setDeleteCandidate(null)}
            className="btn-secondary text-xs py-2 px-4"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="btn-primary text-xs py-2 px-5 !bg-[#D64545] hover:!bg-[#b83535] shadow-none"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Listing
          </button>
        </div>
      </div>
    </div>
  );
};
