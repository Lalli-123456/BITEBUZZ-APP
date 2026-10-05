import React, { useState } from 'react';
import { FoodItem, AddonOption } from '../types';

interface ItemModalProps {
  item: FoodItem | null;
  onClose: () => void;
  onAddToCart: (
    item: FoodItem,
    selectedAddons: AddonOption[],
    quantity: number,
    spiceLevel?: string,
    specialInstructions?: string
  ) => void;
  showToast: (msg: string) => void;
}

const AVAILABLE_ADDONS: AddonOption[] = [
  { id: 'addon-lava-cheese', name: 'Extra Four-Cheese Lava', price: 1.75 },
  { id: 'addon-truffle-aioli', name: 'Black Truffle Aioli Dip', price: 1.50 },
  { id: 'addon-crispy-onions', name: 'Crunchy Fried Shallots', price: 1.00 },
  { id: 'addon-jalapeno', name: 'Charred Pickled Jalapeños', price: 0.85 },
];

export const ItemModal: React.FC<ItemModalProps> = ({
  item,
  onClose,
  onAddToCart,
  showToast,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSpice, setSelectedSpice] = useState<'Mild' | 'Spicy' | 'Reaper 🔥'>(
    item.spiceLevel === 3 ? 'Reaper 🔥' : item.spiceLevel === 2 ? 'Spicy' : 'Mild'
  );
  const [selectedAddons, setSelectedAddons] = useState<AddonOption[]>(
    item.quickAddon ? [item.quickAddon] : []
  );
  const [specialInstructions, setSpecialInstructions] = useState('');

  const toggleAddon = (addon: AddonOption) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalItemPrice = (item.price + addonsTotal) * quantity;

  const handleConfirm = () => {
    onAddToCart(item, selectedAddons, quantity, selectedSpice, specialInstructions);
    showToast(`Added ${quantity}x ${item.name} to cart! 🍔`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-gray-100 animate-in fade-in zoom-in-95">
        {/* Item Image Header */}
        <div className="relative h-64 w-full bg-gray-100">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-800 shadow-md hover:bg-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
          <span
            className={`absolute bottom-4 left-4 px-3 py-1 rounded-full ${item.badge.bgColor} ${item.badge.textColor} font-label-sticker text-[11px] font-bold shadow-md`}
          >
            {item.badge.text}
          </span>
        </div>

        {/* Item Details */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-headline-md text-2xl font-bold text-[#1b1b1e]">
                {item.name}
              </h2>
              <span className="font-headline-md text-2xl font-bold text-[#b40063]">
                ${item.price.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-[#5a3f48]">
              <span className="flex items-center gap-1 font-bold text-[#1b1b1e]">
                <span className="material-symbols-outlined text-xs text-[#b40063]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                {item.rating} ({item.reviewsCount} reviews)
              </span>
              <span>•</span>
              <span>⏱️ {item.prepTimeMinutes || 15} mins prep</span>
              {item.calories && (
                <>
                  <span>•</span>
                  <span>🔥 {item.calories} cal</span>
                </>
              )}
            </div>
            <p className="font-body-md text-sm text-[#5a3f48] mt-3 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Spice Level Selector */}
          <div className="space-y-2">
            <label className="font-label-lg text-xs font-bold text-[#1b1b1e] uppercase tracking-wide">
              Spice Heat Meter
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Mild', 'Spicy', 'Reaper 🔥'] as const).map((spice) => (
                <button
                  key={spice}
                  type="button"
                  onClick={() => setSelectedSpice(spice)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedSpice === spice
                      ? 'border-[#b40063] bg-[#ffd9e3] text-[#3e001e]'
                      : 'border-gray-200 bg-[#f6f2f7] text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {spice}
                </button>
              ))}
            </div>
          </div>

          {/* Addons Selection */}
          <div className="space-y-2">
            <label className="font-label-lg text-xs font-bold text-[#1b1b1e] uppercase tracking-wide">
              Level Up Your Drop (Add-ons)
            </label>
            <div className="space-y-2">
              {AVAILABLE_ADDONS.map((addon) => {
                const isSelected = selectedAddons.some((a) => a.id === addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#b40063] bg-[#ffd9e3]/50 text-[#1b1b1e]'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-[#f6f2f7]'
                    }`}
                  >
                    <span className="font-semibold">{addon.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#b40063]">
                        +${addon.price.toFixed(2)}
                      </span>
                      <span className="material-symbols-outlined text-base">
                        {isSelected ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-1.5">
            <label className="font-label-lg text-xs font-bold text-[#1b1b1e] uppercase tracking-wide">
              Special Crave Requests
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. extra crispy edges, sauce on side..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#f0edf1] text-[#1b1b1e] focus:outline-none focus:ring-2 focus:ring-[#b40063]"
            />
          </div>
        </div>

        {/* Footer Add To Cart */}
        <div className="p-4 sm:p-6 bg-white border-t border-gray-100 flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-[#f0edf1] rounded-full p-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-gray-700 shadow-xs hover:bg-gray-100 cursor-pointer"
            >
              -
            </button>
            <span className="w-6 text-center font-bold text-sm font-mono">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full bg-[#b40063] text-white flex items-center justify-center font-bold shadow-xs hover:bg-[#e1037d] cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#b40063] via-[#e1037d] to-[#7d2dce] text-white font-label-lg text-sm font-bold shadow-xl shadow-[#b40063]/30 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Add to Cart • ${totalItemPrice.toFixed(2)}</span>
            <span className="material-symbols-outlined text-lg">shopping_bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
