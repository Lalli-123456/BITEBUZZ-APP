import React from 'react';
import { FoodItem } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteItems: FoodItem[];
  onRemoveFavorite: (itemId: string) => void;
  onAddToCart: (item: FoodItem) => void;
  showToast: (msg: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favoriteItems,
  onRemoveFavorite,
  onAddToCart,
  showToast,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl text-[#b40063]">❤️</span>
              <div>
                <h2 className="font-headline-sm text-lg font-bold text-[#1b1b1e]">
                  Favorite Cravings
                </h2>
                <p className="text-xs text-[#5a3f48]">{favoriteItems.length} saved dishes</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#f0edf1] hover:bg-[#eae7eb] flex items-center justify-center text-gray-700 cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* List */}
          <div className="flex-1 p-6 space-y-3 overflow-y-auto">
            {favoriteItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <span className="text-5xl block animate-pulse">💔</span>
                <h3 className="font-bold text-gray-800">No favorites saved yet</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Tap the heart icon on any mouthwatering burger, ramen, or dessert to save it here!
                </p>
              </div>
            ) : (
              favoriteItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-[#f6f2f7] border border-gray-100 flex items-center gap-3"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-[#1b1b1e] truncate">{item.name}</h4>
                    <span className="font-bold text-sm text-[#b40063]">
                      ${item.price.toFixed(2)}
                    </span>
                    <p className="text-[11px] text-gray-500 truncate">{item.description}</p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onAddToCart(item);
                        showToast(`Added ${item.name} to cart! 🛒`);
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#b40063] text-white text-xs font-bold hover:bg-[#e1037d] cursor-pointer shadow-sm transition-all"
                    >
                      + Add
                    </button>
                    <button
                      onClick={() => onRemoveFavorite(item.id)}
                      className="text-[10px] text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
