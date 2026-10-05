import React, { useState } from 'react';

interface FooterProps {
  showToast: (msg: string) => void;
  onOpenDeals: () => void;
  onOpenSecretMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  showToast,
  onOpenDeals,
  onOpenSecretMenu,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      showToast('Please enter your phone or email 📲');
      return;
    }
    setSubscribed(true);
    showToast('⚡ You are on the VIP Drop Radar! Secret codes incoming.');
    setEmailInput('');
  };

  return (
    <footer className="w-full bg-white text-[#1b1b1e] pt-12 pb-12 shadow-[0_-4px_24px_rgba(0,0,0,0.02)] border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-headline-lg text-3xl text-[#b40063] font-extrabold tracking-tight">
                BiteBuzz
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#ffd9e3] text-[#3e001e] font-label-sticker text-[11px] font-bold rotate-[-3deg]">
                SLAPS ONLY
              </span>
            </div>
            <p className="font-body-md text-sm text-[#5a3f48] max-w-sm leading-relaxed">
              Hyper-fast comfort drops, viral street eats, and midnight craves curated for real foodies. Freshly delivered before your screen times out.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#eae7eb] text-[#1b1b1e] font-label-sticker text-[11px] font-bold">
                🚀 Avg 18m drop
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#eae7eb] text-[#1b1b1e] font-label-sticker text-[11px] font-bold">
                🔥 Certified Spicy
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#eae7eb] text-[#1b1b1e] font-label-sticker text-[11px] font-bold">
                ✨ Zero Mid Dishes
              </span>
            </div>
          </div>

          {/* Newsletter Alerts Col */}
          <div className="lg:col-span-4 space-y-2">
            <span className="font-label-lg text-sm text-[#1b1b1e] tracking-wide uppercase font-bold block">
              Get drop alerts before TikTok ruins them 📲
            </span>
            <p className="font-body-sm text-xs text-[#5a3f48]">
              Zero spam. Only sudden midnight flash sales and secret password drops.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#b6ebff]/30 text-[#00657b] rounded-2xl text-xs font-bold flex items-center gap-2 mt-2">
                <span>✓ You are on the Drop List! Check SMS/inbox for secret drop codes.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="drop your phone or email..."
                  className="flex-1 h-12 px-4 rounded-full bg-[#f0edf1] text-[#1b1b1e] placeholder:text-[#5a3f48]/70 font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-[#b40063] shadow-inner"
                />
                <button
                  type="submit"
                  className="h-12 px-6 rounded-full bg-[#b40063] hover:bg-[#e1037d] text-white font-label-lg text-xs font-bold transition-all shadow-[0_4px_14px_rgba(180,0,99,0.3)] active:scale-95 shrink-0 cursor-pointer"
                >
                  I'm In ⚡
                </button>
              </form>
            )}
          </div>

          {/* Delivery Zones */}
          <div className="lg:col-span-2 space-y-2">
            <span className="font-label-lg text-sm text-[#1b1b1e] tracking-wide uppercase font-bold block">
              Delivery Zones 🗺️
            </span>
            <ul className="space-y-1.5 font-body-sm text-xs text-[#5a3f48]">
              <li className="hover:text-[#b40063] cursor-pointer transition-colors">Downtown Arts Dist.</li>
              <li className="hover:text-[#b40063] cursor-pointer transition-colors">University Campus Zone</li>
              <li className="hover:text-[#b40063] cursor-pointer transition-colors">The Warehouse Strip</li>
              <li className="hover:text-[#b40063] cursor-pointer transition-colors">Westside Night Walk</li>
              <li className="hover:text-[#b40063] cursor-pointer transition-colors">Midtown Central Hub</li>
            </ul>
          </div>

          {/* Late Night Hotline */}
          <div className="lg:col-span-2 space-y-2">
            <span className="font-label-lg text-sm text-[#1b1b1e] tracking-wide uppercase font-bold block">
              Late Night 🌙
            </span>
            <p className="font-body-sm text-xs text-[#5a3f48]">
              Craving squad active until 4:30 AM every single night.
            </p>
            <div className="p-3 rounded-2xl bg-[#f0edf1] text-[#1b1b1e] font-label-sticker text-[11px] border-none shadow-sm">
              <span className="text-[#7d2dce] font-bold block mb-0.5">HOTLINE READY</span>
              <a href="tel:18002899272" className="hover:underline">Dial: 1-800-BUZZ-CRAVE</a>
            </div>
            {/* Social handles */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => showToast('Opening TikTok @BiteBuzzOfficial 🔥')}
                className="w-8 h-8 rounded-full bg-[#f0edf1] hover:bg-[#eae7eb] flex items-center justify-center text-[#1b1b1e] font-label-sticker text-[10px] font-bold transition-all hover:scale-110 cursor-pointer"
                title="TikTok"
              >
                TT
              </button>
              <button
                onClick={() => showToast('Opening Instagram @BiteBuzzApp 📸')}
                className="w-8 h-8 rounded-full bg-[#f0edf1] hover:bg-[#eae7eb] flex items-center justify-center text-[#1b1b1e] font-label-sticker text-[10px] font-bold transition-all hover:scale-110 cursor-pointer"
                title="Instagram"
              >
                IG
              </button>
              <button
                onClick={() => showToast('Joining Discord BiteBuzz Lounge 👾')}
                className="w-8 h-8 rounded-full bg-[#f0edf1] hover:bg-[#eae7eb] flex items-center justify-center text-[#1b1b1e] font-label-sticker text-[10px] font-bold transition-all hover:scale-110 cursor-pointer"
                title="Discord"
              >
                DC
              </button>
              <button
                onClick={() => showToast('Opening BeReal @BiteBuzz 🥑')}
                className="w-8 h-8 rounded-full bg-[#f0edf1] hover:bg-[#eae7eb] flex items-center justify-center text-[#1b1b1e] font-label-sticker text-[10px] font-bold transition-all hover:scale-110 cursor-pointer"
                title="BeReal"
              >
                BR
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-xs text-[#5a3f48]">
          <div className="flex items-center gap-2">
            <span>© 2025 BiteBuzz Inc. All rights reserved.</span>
            <span className="font-label-sticker text-[10px] px-2 py-0.5 rounded-full bg-[#efdbff] text-[#2b0052] font-bold">
              No cap, just slaps.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenDeals}
              className="hover:text-[#b40063] transition-colors cursor-pointer"
            >
              Secret Deals 💸
            </button>
            <button
              onClick={onOpenSecretMenu}
              className="hover:text-[#b40063] transition-colors cursor-pointer"
            >
              Midnight Vault 🤫
            </button>
            <button
              onClick={() => showToast('Opening Ghost Kitchen Partner Application 🍳')}
              className="hover:text-[#b40063] transition-colors cursor-pointer"
            >
              Become a Ghost Kitchen Partner
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
