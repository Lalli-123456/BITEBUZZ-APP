import React from 'react';
import { CATEGORIES } from '../data/mockData';

interface CategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  vibeFilter: string;
  onSetVibeFilter: (vibe: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
  vibeFilter,
  onSetVibeFilter,
}) => {
  return (
    <section className="w-full bg-[#f6f2f7] py-14" id="categories-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd9e3] text-[#3e001e] font-label-sticker text-[11px] uppercase tracking-wider mb-2 font-bold">
              <span>TASTE SELECTOR</span>
            </div>
            <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1b1b1e] font-extrabold tracking-tight">
              Craving Something Specific? 👀
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#5a3f48] mt-1">
              Filter your vibe in one tap. Curated kitchens cooking right now.
            </p>
          </div>

          {/* Quick Vibe Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => {
                onSetVibeFilter('all');
                onSelectCategory(null);
              }}
              className={`px-5 py-2 rounded-full font-label-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                vibeFilter === 'all' && selectedCategory === null
                  ? 'bg-[#303033] text-[#f3f0f4] shadow-md scale-105'
                  : 'bg-white text-[#1b1b1e] hover:bg-[#eae7eb]'
              }`}
              type="button"
            >
              ✨ All Cravings
            </button>
            <button
              onClick={() => onSetVibeFilter('hyper-fast')}
              className={`px-4 py-2 rounded-full font-label-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                vibeFilter === 'hyper-fast'
                  ? 'bg-[#303033] text-[#f3f0f4] shadow-md scale-105'
                  : 'bg-white text-[#1b1b1e] hover:bg-[#eae7eb]'
              }`}
              type="button"
            >
              🔥 Hyper Fast
            </button>
            <button
              onClick={() => onSetVibeFilter('vegan')}
              className={`px-4 py-2 rounded-full font-label-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                vibeFilter === 'vegan'
                  ? 'bg-[#303033] text-[#f3f0f4] shadow-md scale-105'
                  : 'bg-white text-[#1b1b1e] hover:bg-[#eae7eb]'
              }`}
              type="button"
            >
              🌱 Vegan Only
            </button>
          </div>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (isSelected) {
                    onSelectCategory(null);
                  } else {
                    onSelectCategory(cat.id);
                  }
                  // Scroll slightly down to menu
                  const target = document.getElementById('trending-section');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`group flex flex-col items-center text-center p-4 rounded-3xl transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-white ring-3 ring-[#b40063] shadow-xl -translate-y-2'
                    : 'bg-white hover:bg-[#fcf8fd] shadow-sm hover:shadow-xl hover:-translate-y-1.5'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${cat.bgColor} flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-inner`}
                >
                  {cat.emoji}
                </div>
                <span className="font-headline-sm text-base font-bold text-[#1b1b1e] mt-3 truncate w-full">
                  {cat.name}
                </span>
                <span
                  className={`font-label-sticker text-[11px] font-bold mt-0.5 ${cat.accentColor}`}
                >
                  {cat.spots}
                </span>
                <span className="font-body-sm text-[11px] text-[#5a3f48] mt-1 truncate w-full">
                  {cat.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
