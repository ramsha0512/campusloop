import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  PlusCircle, 
  LayoutDashboard, 
  Bell, 
  Search, 
  Menu, 
  X, 
  LogOut, 
  UserCheck, 
  ShieldCheck, 
  RotateCcw,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { useTheme } from '../context/ThemeContext';
import { CampusLogo } from './CampusLogo';
import { StudentBitmoji } from './StudentBitmoji';

export const Navbar = () => {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { 
    unreadCount, 
    setIsNotifDrawerOpen, 
    cartCount, 
    setIsCartOpen,
    resetData 
  } = useMarketplace();
  const { theme, toggleTheme, isDark } = useTheme();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchFocus = () => {
    navigate('/');
    const searchEl = document.getElementById('marketplace-search-input');
    if (searchEl) {
      searchEl.focus();
    }
  };

  return (
    <header className="sticky top-0 z-40 glass-header">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand New Modern CampusLoop Logo */}
          <Link 
            to="/" 
            className="group text-decoration-none"
            style={{ textDecoration: 'none' }}
          >
            <CampusLogo size={42} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#F1F0F7]/80 dark:bg-[#222137]/80 p-1.5 rounded-full border border-[#E8E7EE] dark:border-[#2C2A42] backdrop-blur-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white dark:bg-[#181728] text-[#635BFF] dark:text-[#A59DFF] shadow-sm font-bold'
                    : 'text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#181728]/60'
                }`
              }
              style={{ textDecoration: 'none' }}
            >
              Marketplace
            </NavLink>

            <NavLink
              to="/sell"
              className={({ isActive }) =>
                `flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white dark:bg-[#181728] text-[#635BFF] dark:text-[#A59DFF] shadow-sm font-bold'
                    : 'text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#181728]/60'
                }`
              }
              style={{ textDecoration: 'none' }}
            >
              <PlusCircle className="w-4 h-4" />
              Sell an Item
            </NavLink>

            <NavLink
              to="/listings"
              className={({ isActive }) =>
                `flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white dark:bg-[#181728] text-[#635BFF] dark:text-[#A59DFF] shadow-sm font-bold'
                    : 'text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#181728]/60'
                }`
              }
              style={{ textDecoration: 'none' }}
            >
              <LayoutDashboard className="w-4 h-4" />
              My Listings
            </NavLink>
          </nav>

          {/* Right Action Icons, Theme Toggle, Cart & Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white hover:bg-[#F1F0F7] dark:hover:bg-[#222137] transition-all"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-[#F5B014] animate-spin-slow transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-[#635BFF] transition-transform" />
              )}
            </button>

            {/* Quick Search Shortcut */}
            <button
              onClick={handleSearchFocus}
              className="p-2.5 rounded-full text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white hover:bg-[#F1F0F7] dark:hover:bg-[#222137] transition-colors"
              title="Search marketplace"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Campus Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white hover:bg-[#F1F0F7] dark:hover:bg-[#222137] transition-colors relative"
              title="Campus Cart"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#635BFF] text-white text-[10px] font-extrabold flex items-center justify-center animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotifDrawerOpen(true)}
              className="p-2.5 rounded-full text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white hover:bg-[#F1F0F7] dark:hover:bg-[#222137] transition-colors relative"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#22A06B] ring-2 ring-white dark:ring-[#181728] animate-pulse"></span>
              )}
            </button>

            {/* Profile Bitmoji / Login Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full border border-[#E8E7EE] dark:border-[#2C2A42] bg-white dark:bg-[#181728] hover:border-[#635BFF]/50 transition-all shadow-sm"
                  aria-expanded={isProfileDropdownOpen}
                >
                  {/* Bitmoji Avatar instead of initials */}
                  <StudentBitmoji name={user?.name || 'Ramsha Azra'} size={32} />
                  
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-xs font-bold text-[#171725] dark:text-[#F3F2FA] leading-tight">
                      {user?.name?.split(' ')[0] || 'Ramsha'}
                    </span>
                    <span className="text-[10px] font-medium text-[#22A06B] dark:text-[#2EC486]">
                      ● Verified
                    </span>
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#181728] rounded-2xl shadow-2xl border border-[#E8E7EE] dark:border-[#2C2A42] p-3.5 z-50 animate-slideUp"
                    style={{ boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.25)' }}
                  >
                    {/* User Bitmoji Card Header */}
                    <div className="px-3 py-3 rounded-xl bg-[#F8F7FC] dark:bg-[#222137] mb-2 border border-[#E8E7EE]/60 dark:border-[#2C2A42] flex items-center gap-3">
                      <StudentBitmoji name={user?.name || 'Ramsha Azra'} size={44} />
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-sm text-[#171725] dark:text-[#F3F2FA] truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-[#77758A] dark:text-[#9E9BB2] truncate">
                          {user?.email}
                        </p>
                        <span className="text-[10px] font-semibold text-[#635BFF] dark:text-[#A59DFF] block mt-0.5">
                          {user?.academicYear} · {user?.college}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Link
                        to="/listings"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#171725] dark:text-[#F3F2FA] rounded-lg hover:bg-[#EEF0FF] dark:hover:bg-[#635BFF]/20 hover:text-[#635BFF] transition-colors"
                        style={{ textDecoration: 'none' }}
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#635BFF]" />
                        Seller Dashboard
                      </Link>

                      <button
                        onClick={() => {
                          setIsCartOpen(true);
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#171725] dark:text-[#F3F2FA] rounded-lg hover:bg-[#EEF0FF] dark:hover:bg-[#635BFF]/20 hover:text-[#635BFF] transition-colors text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <ShoppingBag className="w-4 h-4 text-[#635BFF]" />
                          <span>Campus Cart</span>
                        </div>
                        {cartCount > 0 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#635BFF] text-white font-bold">
                            {cartCount}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          resetData();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#77758A] dark:text-[#9E9BB2] rounded-lg hover:bg-[#F8F7FC] dark:hover:bg-[#222137] hover:text-[#171725] dark:hover:text-white transition-colors text-left"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reset Demo Data
                      </button>

                      <div className="border-t border-[#E8E7EE] dark:border-[#2C2A42] my-1.5 pt-1.5"></div>

                      <button
                        onClick={() => {
                          logout();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#D64545] dark:text-[#E65A5A] rounded-lg hover:bg-[#FDE8E8] dark:hover:bg-[#E65A5A]/20 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="btn-primary text-xs py-2 px-4 rounded-full"
              >
                <UserCheck className="w-4 h-4" />
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#171725] dark:text-white hover:bg-[#F1F0F7] dark:hover:bg-[#222137] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E8E7EE] dark:border-[#2C2A42] bg-white dark:bg-[#181728] animate-slideUp">
            <nav className="flex flex-col gap-2">
              <NavLink
                to="/"
                end
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                    isActive
                      ? 'bg-[#EEF0FF] dark:bg-[#635BFF]/25 text-[#635BFF] dark:text-[#A59DFF]'
                      : 'text-[#77758A] dark:text-[#9E9BB2] hover:bg-[#F8F7FC] dark:hover:bg-[#222137]'
                  }`
                }
                style={{ textDecoration: 'none' }}
              >
                Marketplace
              </NavLink>

              <NavLink
                to="/sell"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                    isActive
                      ? 'bg-[#EEF0FF] dark:bg-[#635BFF]/25 text-[#635BFF] dark:text-[#A59DFF]'
                      : 'text-[#77758A] dark:text-[#9E9BB2] hover:bg-[#F8F7FC] dark:hover:bg-[#222137]'
                  }`
                }
                style={{ textDecoration: 'none' }}
              >
                <PlusCircle className="w-5 h-5" />
                Sell an Item
              </NavLink>

              <NavLink
                to="/listings"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                    isActive
                      ? 'bg-[#EEF0FF] dark:bg-[#635BFF]/25 text-[#635BFF] dark:text-[#A59DFF]'
                      : 'text-[#77758A] dark:text-[#9E9BB2] hover:bg-[#F8F7FC] dark:hover:bg-[#222137]'
                  }`
                }
                style={{ textDecoration: 'none' }}
              >
                <LayoutDashboard className="w-5 h-5" />
                My Listings
              </NavLink>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-[#171725] dark:text-white hover:bg-[#F8F7FC] dark:hover:bg-[#222137]"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-[#635BFF]" />
                  <span>Campus Cart</span>
                </div>
                {cartCount > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#635BFF] text-white font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
