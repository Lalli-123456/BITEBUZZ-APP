import React from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
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

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-gray-100 animate-in fade-in zoom-in-95">
        {/* Header Profile Banner */}
        <div className="bg-gradient-to-r from-[#b40063] via-[#7d2dce] to-[#00657b] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
          <div className="w-20 h-20 mx-auto rounded-full ring-4 ring-white/50 overflow-hidden shadow-xl mb-3">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFBoSB6Kc12GQhRTsd7DT6bFgh7uZdnoSW0_oLC8TiEOGW9Rdhf61wQHUjTycW22RsWs5w1b1CMAYx7D9BEKAh-hDEcqEUav0VdmKuFKMwWvDzrB3xUDCokcDkI8TN5LBizFLx6XigmVogMdHcnD8qUsc7zJK6oCB8sbd5X-6ofuyfRt6wLvQQE9k540NxXbRGmiu8b0OKbBRJWV6BUn0TnStxHOlAownjY4FobA8phmhj6HbHcySR"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-headline-sm text-lg font-bold">Lalitha B.</h3>
          <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur text-[11px] font-label-sticker font-bold uppercase tracking-wider">
            ⚡ Crave Legend (Tier 4)
          </span>
        </div>

        {/* Stats */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-[#ffd9e3] text-[#3e001e] text-center">
              <span className="text-2xl font-bold font-mono block">4,850</span>
              <span className="text-[10px] font-bold uppercase">BuzzCoins Balance</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#efdbff] text-[#2b0052] text-center">
              <span className="text-2xl font-bold font-mono block">24 drops</span>
              <span className="text-[10px] font-bold uppercase">Completed Midnight Orders</span>
            </div>
          </div>

          {/* Perks list */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
              Active Member Perks
            </span>
            <div className="p-3 rounded-xl bg-[#f6f2f7] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span>🛸</span>
                <div>
                  <p className="font-bold text-gray-800">Priority Courier Line</p>
                  <p className="text-[11px] text-gray-500">Auto speed dispatch under 18 mins</p>
                </div>
              </div>
              <span className="text-green-600 font-bold text-[11px]">ACTIVE</span>
            </div>
            <div className="p-3 rounded-xl bg-[#f6f2f7] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span>🧋</span>
                <div>
                  <p className="font-bold text-gray-800">Free Boba on $25+</p>
                  <p className="text-[11px] text-gray-500">Promo code "NOCAP" permanently linked</p>
                </div>
              </div>
              <span className="text-green-600 font-bold text-[11px]">APPLIED</span>
            </div>
          </div>

          {/* Quick Action */}
          <button
            onClick={() => {
              showToast('BuzzCoins redeemed! Free Loaded Churros added to your account 🍩');
              onClose();
            }}
            className="w-full py-3 rounded-full bg-[#303033] hover:bg-black text-white text-xs font-bold font-label-lg transition-all cursor-pointer shadow-md"
          >
            Redeem 500 Coins for Free Treat 🎁
          </button>
        </div>
      </div>
    </div>
  );
};
