import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  appliedPromo: string | null;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
  showToast: (msg: string) => void;
  onOrderComplete: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
  showToast,
  onOrderComplete,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState('Leave at door, ring buzzer 4B');

  if (!isOpen) return null;

  // Calculate pricing
  const subtotal = cartItems.reduce((sum, item) => {
    const addonsTotal = item.selectedAddons.reduce((aSum, a) => aSum + a.price, 0);
    return sum + (item.foodItem.price + addonsTotal) * item.quantity;
  }, 0);

  const deliveryFee = subtotal >= 25 || appliedPromo === 'SPEEDDROP' ? 0 : 2.49;
  const discount =
    appliedPromo === 'NOCAP'
      ? 5.0
      : appliedPromo === 'CRAVE3AM'
      ? subtotal * 0.2
      : 0;

  const tipAmount = (subtotal * tipPercentage) / 100;
  const tax = subtotal * 0.0825;
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee + tax + tipAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromo(promoInput.trim().toUpperCase());
    if (success) {
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('Invalid code! Try "NOCAP" or "CRAVE3AM"');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      onOrderComplete();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcf8fd] shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              <div>
                <h2 className="font-headline-sm text-lg font-bold text-[#1b1b1e]">Your Crave Bag</h2>
                <p className="text-xs text-[#5a3f48]">{cartItems.length} unique items selected</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#f0edf1] hover:bg-[#eae7eb] flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <span className="text-5xl block animate-bounce">🍕</span>
                <h3 className="font-headline-sm text-lg font-bold text-gray-800">Your bag is empty!</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Don't leave your midnight cravings hanging. Explore our trending street drops!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#b40063] text-white font-bold text-xs shadow-md cursor-pointer hover:bg-[#e1037d]"
                >
                  Explore Trending Eats 🔥
                </button>
              </div>
            ) : (
              <>
                {/* 20-min delivery notification */}
                <div className="p-3 rounded-2xl bg-[#efdbff] text-[#2b0052] flex items-center gap-2 text-xs font-semibold">
                  <span className="text-base">⚡</span>
                  <span>Estimated drop in 18-22 mins via priority runner</span>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => {
                    const itemAddonsPrice = item.selectedAddons.reduce((s, a) => s + a.price, 0);
                    const itemTotal = (item.foodItem.price + itemAddonsPrice) * item.quantity;

                    return (
                      <div
                        key={item.cartItemId}
                        className="p-3 rounded-2xl bg-white shadow-sm border border-gray-100 flex gap-3 items-center"
                      >
                        <img
                          src={item.foodItem.imageUrl}
                          alt={item.foodItem.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-[#1b1b1e] truncate">
                            {item.foodItem.name}
                          </h4>
                          {item.spiceLevel && (
                            <span className="text-[10px] text-red-500 font-bold block">
                              🌶️ {item.spiceLevel}
                            </span>
                          )}
                          {item.selectedAddons.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-0.5">
                              {item.selectedAddons.map((addon) => (
                                <span
                                  key={addon.id}
                                  className="text-[10px] bg-[#f0edf1] text-[#5a3f48] px-1.5 py-0.5 rounded-md"
                                >
                                  +{addon.name}
                                </span>
                              ))}
                            </div>
                          )}
                          <span className="font-bold text-sm text-[#b40063] mt-1 block">
                            ${itemTotal.toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-1 bg-[#f0edf1] rounded-full p-1 shrink-0">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.cartItemId, item.quantity - 1)
                            }
                            className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold text-gray-700 shadow-xs hover:bg-gray-100 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-xs font-bold font-mono">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.cartItemId, item.quantity + 1)
                            }
                            className="w-6 h-6 rounded-full bg-[#b40063] text-white flex items-center justify-center text-xs font-bold shadow-xs hover:bg-[#e1037d] cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove item */}
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Promo Code Box */}
                <div className="p-3 rounded-2xl bg-white border border-gray-100 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                    <span>Promo Code</span>
                    <span className="text-[11px] text-[#7d2dce] cursor-pointer" onClick={() => onApplyPromo('NOCAP')}>
                      Try "NOCAP"
                    </span>
                  </div>

                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-[#ffd9e3] text-[#3e001e] px-3 py-2 rounded-xl text-xs font-bold">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">🎉</span>
                        <span>Code "{appliedPromo}" Applied!</span>
                      </div>
                      <button
                        onClick={onRemovePromo}
                        className="text-xs text-red-600 underline font-normal cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          setPromoError('');
                        }}
                        placeholder="e.g. NOCAP or CRAVE3AM"
                        className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#f0edf1] uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-[#b40063]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#303033] text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
                  )}
                </div>

                {/* Tip Selector */}
                <div className="p-3 rounded-2xl bg-white border border-gray-100 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-700">Courier Speed Tip ⚡</span>
                    <span className="text-gray-500 font-mono">${tipAmount.toFixed(2)}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 15, 20, 25].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setTipPercentage(pct)}
                        className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          tipPercentage === pct
                            ? 'bg-[#b40063] text-white shadow-xs'
                            : 'bg-[#f0edf1] text-gray-700 hover:bg-[#eae7eb]'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery Location */}
                <div className="p-3 rounded-2xl bg-white border border-gray-100 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-gray-700">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#b40063]">location_on</span>
                      Delivery Destination
                    </span>
                    <span className="text-[#00657b] font-normal cursor-pointer hover:underline">Edit</span>
                  </div>
                  <p className="text-gray-600 font-semibold pl-4">1044 Arts Dist Blvd, Apt 4B</p>
                  <input
                    type="text"
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    className="w-full mt-1 px-2.5 py-1.5 text-[11px] bg-[#f0edf1] rounded-lg text-gray-700 focus:outline-none"
                    placeholder="Gate code, drop notes..."
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer Summary & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-gray-100 space-y-3 sticky bottom-0">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-bold">
                    <span>Discount ({appliedPromo})</span>
                    <span className="font-mono">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Speed Courier Delivery</span>
                  <span className="font-mono">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-bold">FREE</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes &amp; Bag Fees</span>
                  <span className="font-mono">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Runner Tip</span>
                  <span className="font-mono">${tipAmount.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between text-base font-extrabold text-[#1b1b1e]">
                  <span>Total</span>
                  <span className="text-[#b40063] font-mono">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#b40063] via-[#e1037d] to-[#7d2dce] text-white font-label-lg text-sm font-bold shadow-xl shadow-[#b40063]/30 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isCheckingOut ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Dispatched in Hyper-Speed...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order • ${finalTotal.toFixed(2)} 🚀</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
