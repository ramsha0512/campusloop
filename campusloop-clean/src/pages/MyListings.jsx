import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  Archive, 
  Sparkles, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { StudentBitmoji } from '../components/StudentBitmoji';

export const MyListings = () => {
  const { 
    userListings, 
    userStats, 
    updateItemStatus, 
    setEditingItem, 
    setDeleteCandidate,
    setDetailsItem 
  } = useMarketplace();
  const { user } = useAuth();

  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Available' | 'Reserved' | 'Sold'

  const filteredListings = userListings.filter((item) => {
    if (statusFilter === 'All') return true;
    return item.status === statusFilter;
  });

  return (
    <div className="container py-8 md:py-12 space-y-8">
      
      {/* Header with Student Bitmoji & New Listing Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E7EE] dark:border-[#2C2A42]">
        <div className="flex items-center gap-4">
          <StudentBitmoji name={user?.name || 'Ramsha Azra'} size={56} className="ring-4 ring-[#635BFF]/20" />
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="badge badge-category">
                Seller Dashboard
              </span>
              <span className="text-xs text-[#77758A] dark:text-[#9E9BB2]">
                {user?.college || 'Amity University'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171725] dark:text-[#F3F2FA] tracking-tight">
              My Listings
            </h1>
            <p className="text-xs sm:text-sm text-[#77758A] dark:text-[#9E9BB2] mt-0.5">
              “Manage everything you've put up for sale across the campus.”
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/sell"
            className="btn-primary text-xs py-2.5 px-5 rounded-xl"
            style={{ textDecoration: 'none' }}
          >
            <PlusCircle className="w-4 h-4" />
            Add New Listing
          </Link>
        </div>
      </div>

      {/* DASHBOARD STATISTICS CARDS (Dynamic calculations) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        {/* Total Listings */}
        <div className="bg-white dark:bg-[#181728] p-5 rounded-2xl border border-[#E8E7EE] dark:border-[#2C2A42] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#77758A] dark:text-[#9E9BB2] uppercase tracking-wider">
              Total Listings
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EEF0FF] dark:bg-[#635BFF]/25 text-[#635BFF] dark:text-[#A59DFF] flex items-center justify-center">
              <LayoutDashboard className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-[#171725] dark:text-[#F3F2FA] font-['Manrope'] block">
            {userStats.total}
          </span>
          <span className="text-[11px] text-[#77758A] dark:text-[#9E9BB2] mt-1 block">Active on CampusLoop</span>
        </div>

        {/* Available */}
        <div className="bg-white dark:bg-[#181728] p-5 rounded-2xl border border-[#E8E7EE] dark:border-[#2C2A42] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#22A06B] dark:text-[#2EC486] uppercase tracking-wider">
              Available
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#E8F8F1] dark:bg-[#2EC486]/20 text-[#22A06B] dark:text-[#2EC486] flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-[#22A06B] dark:text-[#2EC486] font-['Manrope'] block">
            {userStats.available}
          </span>
          <span className="text-[11px] text-[#77758A] dark:text-[#9E9BB2] mt-1 block">Visible to all students</span>
        </div>

        {/* Reserved */}
        <div className="bg-white dark:bg-[#181728] p-5 rounded-2xl border border-[#E8E7EE] dark:border-[#2C2A42] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#B28000] dark:text-[#F5B014] uppercase tracking-wider">
              Reserved
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#FFF9E6] dark:bg-[#F5B014]/20 text-[#B28000] dark:text-[#F5B014] flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-[#B28000] dark:text-[#F5B014] font-['Manrope'] block">
            {userStats.reserved}
          </span>
          <span className="text-[11px] text-[#77758A] dark:text-[#9E9BB2] mt-1 block">Pending meetup / handoff</span>
        </div>

        {/* Sold */}
        <div className="bg-white dark:bg-[#181728] p-5 rounded-2xl border border-[#E8E7EE] dark:border-[#2C2A42] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#77758A] dark:text-[#9E9BB2] uppercase tracking-wider">
              Sold
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#ECECF2] dark:bg-[#222137] text-[#636173] dark:text-[#9E9BB2] flex items-center justify-center">
              <Archive className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-[#171725] dark:text-[#F3F2FA] font-['Manrope'] block">
            {userStats.sold}
          </span>
          <span className="text-[11px] text-[#77758A] dark:text-[#9E9BB2] mt-1 block">Completed reuses</span>
        </div>

        {/* Total Student Savings Generated */}
        <div className="bg-gradient-to-br from-[#EEF0FF] to-white dark:from-[#635BFF]/25 dark:to-[#181728] p-5 rounded-2xl border border-[#635BFF]/30 shadow-sm col-span-2 md:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#635BFF] dark:text-[#A59DFF] uppercase tracking-wider">
              Campus Savings
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#635BFF] text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-2xl font-extrabold text-[#635BFF] dark:text-[#A59DFF] font-['Manrope'] block">
            ₹{userStats.savingsGenerated.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-[#77758A] dark:text-[#9E9BB2] mt-1 block">Saved by fellow peers</span>
        </div>

      </div>

      {/* FILTER TABS & EXAMINER DEMO NOTE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-white dark:bg-[#181728] p-1 rounded-2xl border border-[#E8E7EE] dark:border-[#2C2A42] shadow-sm">
          {['All', 'Available', 'Reserved', 'Sold'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                statusFilter === tab
                  ? 'bg-[#171725] dark:bg-[#635BFF] text-white shadow-sm'
                  : 'text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white hover:bg-[#F8F7FC] dark:hover:bg-[#222137]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Demo Tip */}
        <div className="text-xs text-[#77758A] dark:text-[#9E9BB2] flex items-center gap-2 bg-[#F8F7FC] dark:bg-[#1F1E33] px-3.5 py-2 rounded-xl border border-[#E8E7EE] dark:border-[#2C2A42]">
          <ShieldCheck className="w-4 h-4 text-[#22A06B]" />
          <span>Status changes update the public marketplace instantly.</span>
        </div>
      </div>

      {/* LISTINGS TABLE / CARD HYBRID VIEW */}
      {filteredListings.length > 0 ? (
        <div className="space-y-4">
          {filteredListings.map((item) => {
            const savings = item.marketPrice - item.resalePrice;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#181728] rounded-2xl border border-[#E8E7EE] dark:border-[#2C2A42] p-4 sm:p-5 shadow-sm hover:border-[#635BFF]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                {/* Left: Image & Info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 border border-[#E8E7EE] dark:border-[#2C2A42]"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="badge badge-category text-[10px]">
                        {item.category}
                      </span>
                      <span className="badge badge-condition text-[10px]">
                        {item.condition}
                      </span>
                      <span className={`badge text-[10px] ${
                        item.status === 'Available' 
                          ? 'badge-available' 
                          : item.status === 'Reserved' 
                          ? 'badge-reserved' 
                          : 'badge-sold'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-[#171725] dark:text-[#F3F2FA] truncate">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#77758A] dark:text-[#9E9BB2] line-clamp-1 mt-0.5">
                      {item.description}
                    </p>

                    {/* Price Breakdown */}
                    <div className="flex items-baseline gap-2.5 mt-2">
                      <span className="text-base font-extrabold text-[#171725] dark:text-[#F3F2FA] font-['Manrope']">
                        ₹{item.resalePrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#77758A] dark:text-[#9E9BB2] line-through">
                        ₹{item.marketPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] font-bold text-[#22A06B] dark:text-[#2EC486]">
                        (Save ₹{savings.toLocaleString('en-IN')})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Status Change Selector & Actions */}
                <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#E8E7EE] dark:border-[#2C2A42]">
                  
                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#77758A] dark:text-[#9E9BB2] hidden sm:inline">
                      Status:
                    </span>
                    <select
                      value={item.status}
                      onChange={(e) => updateItemStatus(item.id, e.target.value)}
                      className={`text-xs font-bold rounded-xl px-3 py-2 border outline-none cursor-pointer ${
                        item.status === 'Available'
                          ? 'bg-[#E8F8F1] dark:bg-[#2EC486]/20 text-[#22A06B] dark:text-[#2EC486] border-[#22A06B]/30'
                          : item.status === 'Reserved'
                          ? 'bg-[#FFF9E6] dark:bg-[#F5B014]/20 text-[#B28000] dark:text-[#F5B014] border-[#E6A700]/30'
                          : 'bg-[#ECECF2] dark:bg-[#222137] text-[#636173] dark:text-[#9E9BB2] border-[#D5D3DF] dark:border-[#2C2A42]'
                      }`}
                      aria-label="Change listing status"
                    >
                      <option value="Available">● Available</option>
                      <option value="Reserved">⏳ Reserved</option>
                      <option value="Sold">✓ Sold</option>
                    </select>
                  </div>

                  {/* Action Buttons: View, Edit, Delete */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setDetailsItem(item)}
                      className="p-2 rounded-xl text-[#77758A] hover:text-[#635BFF] hover:bg-[#EEF0FF] dark:hover:bg-[#635BFF]/20 transition-colors"
                      title="View details"
                      aria-label="View listing details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-2 rounded-xl text-[#77758A] hover:text-[#635BFF] hover:bg-[#EEF0FF] dark:hover:bg-[#635BFF]/20 transition-colors"
                      title="Edit listing"
                      aria-label="Edit listing"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeleteCandidate(item)}
                      className="p-2 rounded-xl text-[#77758A] hover:text-[#D64545] hover:bg-[#FDE8E8] dark:hover:bg-[#D64545]/20 transition-colors"
                      title="Delete listing"
                      aria-label="Delete listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="card-modern p-12 text-center max-w-md mx-auto my-8 flex flex-col items-center dark:bg-[#181728] dark:border-[#2C2A42]">
          <div className="w-16 h-16 rounded-3xl bg-[#EEF0FF] dark:bg-[#635BFF]/20 flex items-center justify-center text-[#635BFF] dark:text-[#A59DFF] mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
            No listings found
          </h3>
          <p className="text-sm text-[#77758A] dark:text-[#9E9BB2] mb-6 leading-relaxed">
            {statusFilter !== 'All' 
              ? `You don't have any listings marked as "${statusFilter}".` 
              : "Your campus is waiting for your first listing. Turn your old books and supplies into instant cash."}
          </p>
          <Link
            to="/sell"
            className="btn-primary text-xs py-2.5 px-6 rounded-xl"
            style={{ textDecoration: 'none' }}
          >
            <PlusCircle className="w-4 h-4" />
            Sell an Item Now
          </Link>
        </div>
      )}

    </div>
  );
};
