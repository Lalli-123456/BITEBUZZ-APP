import React, { useState, useEffect } from 'react';

interface MunchiesBannerProps {
  onUnlockVault: () => void;
  showToast: (msg: string) => void;
}

export const MunchiesBanner: React.FC<MunchiesBannerProps> = ({
  onUnlockVault,
  showToast,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(14 * 60 + 28);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 15 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="relative overflow-hidden rounded-3xl bg-[#303033] text-[#f3f0f4] p-8 sm:p-12 shadow-2xl border border-white/10">
        {/* Ambient Glows */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#b40063]/30 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#7d2dce]/30 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            {/* Top pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b40063] text-white font-label-sticker text-[11px] uppercase tracking-wider font-bold">
              <span>🌙 NIGHT OWL CRAVINGS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              <span>OPEN UNTIL 4:30 AM</span>
            </div>

            {/* Title */}
            <h2 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              The 3AM Munchies Hotline 📞
            </h2>

            {/* Description */}
            <p className="font-body-md text-sm sm:text-base text-[#eae7eb] max-w-xl leading-relaxed">
              Study marathon? Post-party emergency? We’ve got dedicated late-night ghost kitchens firing up smash patties, loaded churros, and piping ramen while the rest of the city sleeps.
            </p>

            {/* Wave Countdown & Surcharge info */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur flex items-center gap-3 border border-white/15">
                <span className="text-[#b6ebff] font-label-sticker text-[11px] uppercase font-bold">
                  Next drop wave in:
                </span>
                <span className="font-label-lg text-lg font-bold text-white tracking-widest font-mono">
                  {formattedTime}
                </span>
              </div>
              <span className="font-label-sticker text-xs text-[#efdbff] font-bold">
                🚀 ZERO LATE-NIGHT SURCHARGE
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <button
              onClick={onUnlockVault}
              className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#b40063] to-[#7d2dce] text-white font-label-lg text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-all text-center cursor-pointer hover:shadow-[#b40063]/40"
              type="button"
            >
              Unlock Midnight Vault 🔓
            </button>
            <a
              href="tel:18002899272"
              onClick={() => showToast('Calling BiteBuzz 3AM Hotline: 1-800-BUZZ-CRAVE 📞')}
              className="w-full py-4 px-6 rounded-full bg-white/10 hover:bg-white/20 text-[#f3f0f4] font-label-lg text-sm font-bold transition-all text-center flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">call</span>
              <span>Dial 1-800-BUZZ-CRAVE</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
