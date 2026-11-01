import React from 'react';
import { 
  Layers, 
  BookOpen, 
  FileText, 
  Wrench, 
  Tv, 
  PenTool, 
  Laptop, 
  MoreHorizontal 
} from 'lucide-react';
import { CATEGORIES } from '../data/demoData';
import { useMarketplace } from '../context/MarketplaceContext';

export const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory, publicItems } = useMarketplace();

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'All': return <Layers className="w-4 h-4" />;
      case 'Books': return <BookOpen className="w-4 h-4" />;
      case 'Notes': return <FileText className="w-4 h-4" />;
      case 'Equipment': return <Wrench className="w-4 h-4" />;
      case 'Appliances': return <Tv className="w-4 h-4" />;
      case 'Stationery': return <PenTool className="w-4 h-4" />;
      case 'Electronics': return <Laptop className="w-4 h-4" />;
      default: return <MoreHorizontal className="w-4 h-4" />;
    }
  };

  const getCategoryCount = (cat) => {
    if (cat === 'All') return publicItems.length;
    return publicItems.filter((i) => i.category.toLowerCase() === cat.toLowerCase()).length;
  };

  return (
    <div className="w-full overflow-x-auto py-2 no-scrollbar">
      <div className="flex items-center gap-2.5 min-w-max pb-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
          const count = getCategoryCount(cat);

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs md:text-sm font-semibold transition-all duration-200 border ${
                isActive
                  ? 'bg-[#635BFF] dark:bg-[#635BFF] text-white border-[#635BFF] shadow-md shadow-[#635BFF]/25 scale-105'
                  : 'bg-white dark:bg-[#181728] text-[#77758A] dark:text-[#9E9BB2] border-[#E8E7EE] dark:border-[#2C2A42] hover:border-[#635BFF]/40 hover:text-[#171725] dark:hover:text-white hover:bg-[#F8F7FC] dark:hover:bg-[#222137]'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-[#635BFF] dark:text-[#A59DFF]'}>
                {getCategoryIcon(cat)}
              </span>
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-[#F1F0F7] dark:bg-[#222137] text-[#77758A] dark:text-[#9E9BB2]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
