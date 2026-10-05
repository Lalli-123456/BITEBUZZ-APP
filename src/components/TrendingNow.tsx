import React, { useState } from 'react';
import { FoodItem, AddonOption } from '../types';

interface TrendingNowProps {
  items: FoodItem[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onAddToCart: (item: FoodItem, addon?: AddonOption) => void;
  onSelectItem: (item: FoodItem) => void;
  favorites: string[];
  onToggleFavorite: (itemId: string) => void;
  showToast: (msg: string) => void;
}

export const TrendingNow: React.FC<TrendingNowProps> = ({
  items,
  activeFilter,
  onFilterChange,
  onAddToCart,
  onSelectItem,
  favorites,
  onToggleFavorite,
  showToast,
}) => {
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  const handleAdd = (e: React.MouseEvent, item: FoodItem) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedItemMap((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  const handleQuickAddon = (e: React.MouseEvent, item: FoodItem, addon: AddonOption) => {
    e.stopPropagation();
    onAddToCart(item, addon);
    showToast(`Added ${item.name} with ${addon.name}! 🚀`);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="trending-section">
      {/* Section Header & Filter Pills */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e1037d] text-white font-label-sticker text-[11px] uppercase tracking-wider mb-2 font-bold shadow-sm">
            <span>TIKTOK CERTIFIED DROPS</span>
          </div>
          <h2 className="font-headline-lg text-3xl sm:text-4xl text-[#1b1b1e] font-extrabold tracking-tight">
            Trending Now 🔥
          </h2>
          <p className="font-body-md text-sm sm:text-base text-[#5a3f48] mt-1">
            What everyone on TikTok and campus is eating right now.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-4 py-2 rounded-full font-label-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'all'
                ? 'bg-[#b40063] text-white shadow-md shadow-[#b40063]/20 scale-105'
                : 'bg-[#f0edf1] text-[#5a3f48] hover:text-[#1b1b1e]'
            }`}
            type="button"
          >
            All Hype 🔥
          </button>
          <button
            onClick={() => onFilterChange('spicy')}
            className={`px-4 py-2 rounded-full font-label-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'spicy'
                ? 'bg-[#b40063] text-white shadow-md shadow-[#b40063]/20 scale-105'
                : 'bg-[#f0edf1] text-[#5a3f48] hover:text-[#1b1b1e]'
            }`}
            type="button"
          >
            Spicy AF 🌶️
          </button>
          <button
            onClick={() => onFilterChange('cheesy')}
            className={`px-4 py-2 rounded-full font-label-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'cheesy'
                ? 'bg-[#b40063] text-white shadow-md shadow-[#b40063]/20 scale-105'
                : 'bg-[#f0edf1] text-[#5a3f48] hover:text-[#1b1b1e]'
            }`}
            type="button"
          >
            Cheesy 🧀
          </button>
          <button
            onClick={() => onFilterChange('budget')}
            className={`px-4 py-2 rounded-full font-label-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'budget'
                ? 'bg-[#b40063] text-white shadow-md shadow-[#b40063]/20 scale-105'
                : 'bg-[#f0edf1] text-[#5a3f48] hover:text-[#1b1b1e]'
            }`}
            type="button"
          >
            Under $10 💸
          </button>
          <button
            onClick={() => onFilterChange('latenight')}
            className={`px-4 py-2 rounded-full font-label-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === 'latenight'
                ? 'bg-[#b40063] text-white shadow-md shadow-[#b40063]/20 scale-105'
                : 'bg-[#f0edf1] text-[#5a3f48] hover:text-[#1b1b1e]'
            }`}
            type="button"
          >
            Late Night 🌙
          </button>
        </div>
      </div>

      {/* Food Cards Grid */}
      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl p-8 border border-dashed border-gray-300">
          <span className="text-4xl">🔍</span>
          <h3 className="font-headline-sm text-lg font-bold mt-2">No matching crave dishes found</h3>
          <p className="text-sm text-gray-500 mt-1">Try switching categories or clearing search filters!</p>
          <button
            onClick={() => onFilterChange('all')}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#b40063] text-white font-bold text-xs cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const isFav = favorites.includes(item.id);
            const isAdded = addedItemMap[item.id];

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="group flex flex-col justify-between rounded-3xl bg-white p-4 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-black/5 hover:-translate-y-1"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-[#f0edf1]">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={item.imageAlt}
                      src={item.imageUrl}
                    />

                    {/* Top Sticker Badge */}
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full ${item.badge.bgColor} ${item.badge.textColor} font-label-sticker text-[11px] font-bold shadow-md ${
                        item.badge.rotate || ''
                      }`}
                    >
                      {item.badge.text}
                    </span>

                    {/* Favorite Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(item.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-600 hover:text-[#b40063] transition-colors shadow-sm cursor-pointer"
                      title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      <span
                        className={`material-symbols-outlined text-base ${
                          isFav ? 'text-[#b40063]' : ''
                        }`}
                        style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        favorite
                      </span>
                    </button>

                    {/* Bottom Right Rating Pill */}
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur font-label-sticker text-[11px] text-[#1b1b1e] flex items-center gap-1 shadow-sm font-bold">
                      <span
                        className="material-symbols-outlined text-xs text-[#b40063]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      {item.rating} ({item.reviewsCount})
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="pt-4 space-y-2">
                    <h3 className="font-headline-sm text-lg font-bold text-[#1b1b1e] group-hover:text-[#b40063] transition-colors">
                      {item.name}
                    </h3>
                    <p className="font-body-sm text-xs text-[#5a3f48] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Pricing & Cart Action */}
                <div className="pt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-md text-2xl font-bold text-[#b40063]">
                      ${item.price.toFixed(2)}
                    </span>

                    {/* Quick Addon or Under $10 Tag */}
                    {item.isUnderTen ? (
                      <span className="px-2 py-0.5 rounded-full bg-[#b6ebff] text-[#001f28] font-label-sticker text-[10px] font-bold">
                        UNDER $10
                      </span>
                    ) : item.quickAddon ? (
                      <button
                        onClick={(e) => handleQuickAddon(e, item, item.quickAddon!)}
                        className="px-2.5 py-1 rounded-full bg-[#f0edf1] text-[#5a3f48] hover:text-[#1b1b1e] font-label-sticker text-[10px] transition-colors cursor-pointer hover:bg-[#eae7eb] font-semibold"
                        type="button"
                      >
                        + {item.quickAddon.name} (${item.quickAddon.price.toFixed(2)})
                      </button>
                    ) : null}
                  </div>

                  <button
                    onClick={(e) => handleAdd(e, item)}
                    className={`w-full py-3 rounded-full font-label-lg text-sm font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-[#7d2dce] text-white shadow-[#7d2dce]/30'
                        : 'bg-[#b40063] hover:bg-[#e1037d] text-white shadow-[#b40063]/25'
                    }`}
                    type="button"
                  >
                    <span>{isAdded ? 'Added! ✓' : 'Add to Cart 🛒'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
