import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart } from 'lucide-react';
import { CampusLogo } from './CampusLogo';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[#E8E7EE] dark:border-[#2C2A42] bg-white dark:bg-[#181728] pt-12 pb-8 transition-colors">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#E8E7EE] dark:border-[#2C2A42]">
          
          {/* Brand Info with New Logo */}
          <div className="md:col-span-2 space-y-3">
            <CampusLogo size={38} />
            <p className="text-sm text-[#77758A] dark:text-[#9E9BB2] max-w-md leading-relaxed mt-2">
              Making campus life more affordable, one reuse at a time. The peer-to-peer university marketplace where resale prices are capped at 50% of market value.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#22A06B] dark:text-[#2EC486] bg-[#E8F8F1] dark:bg-[#2EC486]/15 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>50% Fair Resale Cap Guarantee Enforced</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171725] dark:text-[#F3F2FA] mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#77758A] dark:text-[#9E9BB2]" style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <Link to="/" className="hover:text-[#635BFF] dark:hover:text-[#8075FF] transition-colors" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-[#635BFF] dark:hover:text-[#8075FF] transition-colors" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Sell an Item
                </Link>
              </li>
              <li>
                <Link to="/listings" className="hover:text-[#635BFF] dark:hover:text-[#8075FF] transition-colors" style={{ textDecoration: 'none', color: 'inherit' }}>
                  My Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & Demonstration Context */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171725] dark:text-[#F3F2FA] mb-3">
              B.Tech Project
            </h4>
            <p className="text-xs text-[#77758A] dark:text-[#9E9BB2] leading-relaxed mb-2">
              “Design and Implementation of a College Marketplace Platform”
            </p>
            <p className="text-xs font-semibold text-[#171725] dark:text-[#F3F2FA]">
              Author: Ramsha Azra
            </p>
            <p className="text-xs text-[#77758A] dark:text-[#9E9BB2]">
              Final Year · Amity University
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#77758A] dark:text-[#9E9BB2] gap-3">
          <p>© 2026 CampusLoop · College Marketplace. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#D64545] fill-[#D64545]" /> for university students
          </p>
        </div>
      </div>
    </footer>
  );
};
