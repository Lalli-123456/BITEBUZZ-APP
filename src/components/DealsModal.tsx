import React from 'react';
import { DEALS } from '../data/mockData';

interface DealsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDeal: (code: string) => void;
  showToast: (msg: string) => void;
}

export const DealsModal: React.FC<DealsModalProps> = ({
  isOpen,
  onClose,
  onApplyDeal,
  showToast,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-gray-100 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💸</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-md text-xl font-bold text-[#1b1b1e]">
                  Active Flash Drops &amp; Deals
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#b40063] text-white font-label-sticker text-[10px] font-bold">
                  60 MIN ROTATION
                </span>
              </div>
              <p className="text-xs text-[#5a3f48]">
                One-tap codes automatically applied to your cart bag.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f0edf1] hover:bg-[#eae7eb] flex items-center justify-center text-gray-700 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* List of Deals */}
        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          {DEALS.map((deal) => (
            <div
              key={deal.id}
              className="p-4 rounded-2xl bg-[#f6f2f7] border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-[#b40063]/50 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#1b1b1e]">
                    {deal.title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#efdbff] text-[#2b0052] font-label-sticker text-[9px] font-bold">
                    {deal.badge}
                  </span>
                </div>
                <p className="text-xs text-[#5a3f48]">{deal.discountDescription}</p>
                <div className="flex items-center gap-2 text-[11px] text-gray-500 pt-1">
                  <span>Min order: ${deal.minOrder}</span>
                  <span>•</span>
                  <span className="text-red-500 font-bold">
                    ⏱️ Expires in {deal.expiresInMinutes}m
                  </span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => {
                  onApplyDeal(deal.code);
                  showToast(`Applied code "${deal.code}"! Check your cart 🛒`);
                  onClose();
                }}
                className="px-4 py-2.5 rounded-full bg-[#b40063] hover:bg-[#e1037d] text-white font-label-lg text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95 shrink-0 text-center"
              >
                Apply "{deal.code}"
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
