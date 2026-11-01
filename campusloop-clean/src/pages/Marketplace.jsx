import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  TrendingDown, 
  Users, 
  GraduationCap, 
  Recycle, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductGrid } from '../components/ProductGrid';
import { useMarketplace } from '../context/MarketplaceContext';
import { Link } from 'react-router-dom';

export const Marketplace = () => {
  const { globalStats } = useMarketplace();

  return (
    <div className="space-y-12 pb-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-16 bg-gradient-to-b from-[#EEF0FF]/60 via-[#F8F7FC] to-[#F8F7FC] dark:from-[#635BFF]/15 dark:via-[#0E0D17] dark:to-[#0E0D17] border-b border-[#E8E7EE]/80 dark:border-[#2C2A42]">
        {/* Subtle Decorative Ambient Circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#635BFF]/10 dark:bg-[#635BFF]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container relative z-10 text-center space-y-6 max-w-4xl">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#181728] border border-[#E8E7EE] dark:border-[#2C2A42] shadow-sm text-xs font-bold text-[#635BFF] dark:text-[#A59DFF]">
            <span className="w-2 h-2 rounded-full bg-[#22A06B] animate-pulse"></span>
            <span>Student-First Pricing · College-Focused · Up to 50% Below Market Price</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#171725] dark:text-[#F3F2FA] tracking-tight leading-[1.15]">
            Buy smarter. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#635BFF] via-[#7B73FF] to-[#22A06B] dark:from-[#A59DFF] dark:via-[#7B73FF] dark:to-[#2EC486] bg-clip-text text-transparent">
              Sell what you no longer need.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#77758A] dark:text-[#9E9BB2] max-w-2xl mx-auto leading-relaxed">
            “Your campus marketplace for affordable books, notes, equipment and everyday student essentials.”
          </p>

          {/* Search Bar */}
          <div className="pt-2">
            <SearchBar />
          </div>

          {/* Hero Statistics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto">
            <div className="bg-white/80 dark:bg-[#181728]/80 backdrop-blur-md p-4 rounded-2xl border border-[#E8E7EE] dark:border-[#2C2A42] shadow-sm">
              <span className="text-2xl font-extrabold text-[#171725] dark:text-[#F3F2FA] font-['Manrope'] block">
                250+
              </span>
              <span className="text-xs font-semibold text-[#77758A] dark:text-[#9E9BB2]">
                Student Listings
              </span>
            </div>

            <div className="bg-white/80 dark:bg-[#181728]/80 backdrop-blur-md p-4 rounded-2xl border border-[#E8E7EE] dark:border-[#2C2A42] shadow-sm">
              <span className="text-2xl font-extrabold text-[#22A06B] dark:text-[#2EC486] font-['Manrope'] block">
                ₹{globalStats.totalSavings > 0 ? `${(globalStats.totalSavings / 1000).toFixed(1)}k+` : '₹50K+'}
              </span>
              <span className="text-xs font-semibold text-[#77758A] dark:text-[#9E9BB2]">
                Potential Savings
              </span>
            </div>

            <div className="bg-white/80 dark:bg-[#181728]/80 backdrop-blur-md p-4 rounded-2xl border border-[#E8E7EE] dark:border-[#2C2A42] shadow-sm">
              <span className="text-2xl font-extrabold text-[#635BFF] dark:text-[#A59DFF] font-['Manrope'] block">
                8
              </span>
              <span className="text-xs font-semibold text-[#77758A] dark:text-[#9E9BB2]">
                Campus Categories
              </span>
            </div>

            <div className="bg-white/80 dark:bg-[#181728]/80 backdrop-blur-md p-4 rounded-2xl border border-[#E8E7EE] dark:border-[#2C2A42] shadow-sm">
              <span className="text-2xl font-extrabold text-[#171725] dark:text-[#F3F2FA] font-['Manrope'] block">
                100%
              </span>
              <span className="text-xs font-semibold text-[#77758A] dark:text-[#9E9BB2]">
                Student-Verified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="container">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#171725] dark:text-[#F3F2FA]">
            Browse by Campus Category
          </h2>
          <span className="text-xs text-[#77758A] dark:text-[#9E9BB2]">
            Tap a category to filter listings
          </span>
        </div>
        <CategoryFilter />
      </section>

      {/* MARKETPLACE LISTINGS GRID */}
      <main className="container">
        <ProductGrid />
      </main>

      {/* TRUST / "WHY CAMPUSLOOP?" SECTION */}
      <section className="container mt-16 pt-8">
        <div className="rounded-3xl bg-gradient-to-br from-white via-white to-[#F8F7FC] dark:from-[#181728] dark:via-[#181728] dark:to-[#121120] border border-[#E8E7EE] dark:border-[#2C2A42] p-8 md:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="badge badge-category mb-2">
              Why CampusLoop?
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#171725] dark:text-[#F3F2FA]">
              Designed Exclusively for Campus Affordability
            </h2>
            <p className="text-sm text-[#77758A] dark:text-[#9E9BB2] mt-2">
              Standard commercial marketplaces encourage predatory pricing. CampusLoop locks in student-first affordability by policy and automated code validation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-2xl bg-[#F8F7FC] dark:bg-[#1F1E33] border border-[#E8E7EE] dark:border-[#2C2A42] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EEF0FF] dark:bg-[#635BFF]/25 text-[#635BFF] dark:text-[#A59DFF] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#171725] dark:text-[#F3F2FA]">
                Student-Focused
              </h4>
              <p className="text-xs text-[#77758A] dark:text-[#9E9BB2] leading-relaxed">
                Built specifically around university schedules, college buildings, and real semester needs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#EEF0FF] dark:bg-[#635BFF]/20 border border-[#635BFF]/30 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#635BFF] text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#171725] dark:text-[#F3F2FA]">
                Affordable by Design
              </h4>
              <p className="text-xs text-[#77758A] dark:text-[#9E9BB2] leading-relaxed">
                Listings strictly cannot exceed 50% of the reference market price. Our system automatically rejects overpriced submissions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F7FC] dark:bg-[#1F1E33] border border-[#E8E7EE] dark:border-[#2C2A42] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E8F8F1] dark:bg-[#2EC486]/20 text-[#22A06B] dark:text-[#2EC486] flex items-center justify-center font-bold">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#171725] dark:text-[#F3F2FA]">
                Easy Discovery
              </h4>
              <p className="text-xs text-[#77758A] dark:text-[#9E9BB2] leading-relaxed">
                Instant search across academic subjects, notes, calculators, and seller departments with zero clutter.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F8F7FC] dark:bg-[#1F1E33] border border-[#E8E7EE] dark:border-[#2C2A42] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFF9E6] dark:bg-[#F5B014]/20 text-[#E6A700] dark:text-[#F5B014] flex items-center justify-center font-bold">
                <Recycle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-[#171725] dark:text-[#F3F2FA]">
                Reuse Over Waste
              </h4>
              <p className="text-xs text-[#77758A] dark:text-[#9E9BB2] leading-relaxed">
                Keep engineering materials, mini-drafters, and books circulating across batches rather than lying discarded in dorms.
              </p>
            </div>

          </div>

          {/* Quick CTA Banner */}
          <div className="mt-10 p-6 rounded-2xl bg-[#171725] dark:bg-[#222137] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-transparent dark:border-[#2C2A42]">
            <div>
              <h4 className="text-lg font-bold">Have items lying around from last semester?</h4>
              <p className="text-xs text-[#A3A1B2]">List your notes, books or lab tools in under 60 seconds.</p>
            </div>
            <Link to="/sell" className="btn-primary text-xs py-3 px-6 rounded-xl shrink-0" style={{ textDecoration: 'none' }}>
              Sell an Item Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
