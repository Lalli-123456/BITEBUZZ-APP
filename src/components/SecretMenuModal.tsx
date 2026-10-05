import React, { useState } from 'react';
import { SECRET_MENU_ITEMS } from '../data/mockData';
import { FoodItem } from '../types';

interface SecretMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: FoodItem) => void;
  showToast: (msg: string) => void;
}

export const SecretMenuModal: React.FC<SecretMenuModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  showToast,
}) => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(true); // default unlocked or easy access
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (['NOCAP', 'MIDNIGHT', 'BUZZ', '3AM', 'CRAVE'].includes(passcode.trim().toUpperCase())) {
      setIsUnlocked(true);
      setErrorMsg('');
      showToast('🔓 Midnight Vault Unlocked! Welcome to the inner circle.');
    } else {
      setErrorMsg('Incorrect passcode! Try "NOCAP" or "MIDNIGHT" 🤫');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-[#1b1b1e] text-[#f3f0f4] rounded-3xl shadow-2xl overflow-hidden z-10 border border-purple-500/30 animate-in fade-in zoom-in-95">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#7d2dce]/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤫</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-md text-xl font-bold text-white">
                  The Midnight Vault
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#7d2dce] text-white font-label-sticker text-[10px] font-bold">
                  VIP ONLY
                </span>
              </div>
              <p className="text-xs text-[#eae7eb]">
                TikTok unreleased experiments &amp; chef off-menu specials.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {!isUnlocked ? (
            <div className="text-center py-8 space-y-4">
              <span className="text-5xl block animate-pulse">🔒</span>
              <h3 className="font-headline-sm text-lg font-bold text-white">
                Enter Secret Passphrase
              </h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                These drops are restricted to BiteBuzz Crave Squad members. Hint: Use code <strong>NOCAP</strong>.
              </p>
              <form onSubmit={handleUnlock} className="max-w-xs mx-auto flex gap-2">
                <input
                  type="text"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Secret passphrase..."
                  className="flex-1 px-4 py-2 text-xs rounded-xl bg-white/10 text-white font-mono uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#7d2dce]"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#b40063] to-[#7d2dce] text-white font-bold text-xs cursor-pointer hover:opacity-90"
                >
                  Unlock
                </button>
              </form>
              {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-white/5 border border-purple-500/20 text-xs flex items-center justify-between">
                <span className="text-[#47d6ff] font-bold">
                  ⚡ 3/3 Secret Dishes currently live in the ghost kitchen
                </span>
                <span className="text-[10px] text-gray-400">Refreshes at 4:30 AM</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SECRET_MENU_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-purple-500/50 transition-all group"
                  >
                    <div>
                      <div className="relative h-32 rounded-xl overflow-hidden bg-black/40 mb-3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-[#47d6ff] font-label-sticker text-[9px] font-bold backdrop-blur">
                          {item.badge.text}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-white">{item.name}</h4>
                      <p className="text-[11px] text-gray-300 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="font-bold text-[#ffb0c9] text-sm">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => {
                          onAddToCart(item);
                          showToast(`Added ${item.name} to cart! 🤫`);
                        }}
                        className="px-3 py-1.5 rounded-full bg-[#7d2dce] hover:bg-[#974ce9] text-white font-bold text-xs shadow-md cursor-pointer transition-all active:scale-95"
                      >
                        Grab Drop +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
