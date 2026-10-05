import React, { useEffect, useState } from 'react';
import { HERO_SHOWCASE, LIVE_TICKER_ORDERS } from '../data/mockData';
import { FoodItem } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onOrderNowClick: () => void;
  onSelectItem: (item: Partial<FoodItem>) => void;
  showToast: (msg: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOrderNowClick,
  onSelectItem,
  showToast,
}) => {
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % LIVE_TICKER_ORDERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Top Live Feed Bar */}
      <div className="w-full bg-[#f0edf1] py-2.5 px-4 overflow-hidden shadow-inner border-b border-black/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-[#b40063] animate-ping"></span>
            <span className="font-label-sticker text-[11px] uppercase text-[#b40063] tracking-wide font-bold">
              Live Radar:
            </span>
            <span className="font-body-sm text-[13px] text-[#1b1b1e] truncate font-semibold transition-opacity duration-300">
              {LIVE_TICKER_ORDERS[tickerIndex]}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[#5a3f48] font-label-sticker text-[11px]">
            <span>⚡ 947 DRIVERS ACTIVE</span>
            <span>•</span>
            <span className="text-[#00657b] font-bold">AVG DROP: 18 MINS</span>
          </div>
        </div>
      </div>

      {/* Main Hero Container */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Ambient backdrops */}
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-[#b40063]/10 blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#efdbff]/40 blur-3xl pointer-events-none -z-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Average drop badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#efdbff] text-[#2b0052] font-label-sticker text-[11px] shadow-sm">
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>Average drop time: 18 mins</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#b40063]"></span>
              <span className="text-[#b40063] font-bold">HOT &amp; FRESH</span>
            </div>

            {/* Hero Headline */}
            <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-[56px] text-[#1b1b1e] tracking-tight leading-[1.08] uppercase font-extrabold">
              GOOD FOOD.
              <br />
              <span className="bg-gradient-to-r from-[#b40063] via-[#e1037d] to-[#7d2dce] bg-clip-text text-transparent">
                GOOD MOOD.
              </span>
              <br />
              NO CAP. 🍔🔥
            </h1>

            {/* Subtitle */}
            <p className="font-body-lg text-lg text-[#5a3f48] max-w-lg leading-relaxed">
              Your cravings called… they want everything. Viral midnight drops, unhinged comfort eats, and TikTok-famous secret recipes dispatched directly to your door in hyper-speed.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#b40063] via-[#e1037d] to-[#7d2dce] text-white font-label-lg text-sm font-bold shadow-xl shadow-[#b40063]/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Explore Food 🍕</span>
                <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>

              <button
                onClick={onOrderNowClick}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#303033] text-[#f3f0f4] hover:bg-[#1b1b1e] font-label-lg text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[#b6ebff] text-lg">bolt</span>
                <span>Order Now 🚀</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-4 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                <div className="w-10 h-10 rounded-full bg-[#eae7eb] ring-2 ring-[#fcf8fd] overflow-hidden shadow">
                  <img
                    className="w-full h-full object-cover"
                    alt="Foodie Reviewer 1"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuADKjMJdh53BgiX1Pqb_Ir7co8KyOWb37uUGKnvILZRJAuVbJmDhMRLozCc6oFnSkRUsZVMfhXH--U-NUd_ke4w9PnkRq8FH2O1hB-aDeKqG0Ut_KVe-pfUNT0fSilDo5Lsd7MgRFA3Ty7wFBkotllDtVSc0GrRFJt13mL0dIpdAKTTymMspcCFiqrB0_j-v_vP05Oju8KRef7AqOaSmR5NNCZxjl3jtut1f8RQMhSNXpU3eM4Ok6RO"
                  />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#eae7eb] ring-2 ring-[#fcf8fd] overflow-hidden shadow">
                  <img
                    className="w-full h-full object-cover"
                    alt="Foodie Reviewer 2"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWLW5rns5H7SgKLXBlON7snSjeK1bgjc1wvMh5idKbntIGZGvH47uhAd-lv6qBbVG3eA0oVfGt489AUtDNo4AtFVWCduIVH0-4Q1hNOetVXL9z8qDg3cgEID2SRU3FoyG5FH1XabjnkiBe4wTHcNp3qPK8iw0J4KePb4uvFazLL7FrmVX0IJGfR4E12-zV0Cn9NTwRXB_DxlgHJUwLWM82AkuNsTBkCCfA2BYaTapaNHBb2JGsaTI7"
                  />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#eae7eb] ring-2 ring-[#fcf8fd] overflow-hidden shadow">
                  <img
                    className="w-full h-full object-cover"
                    alt="Foodie Reviewer 3"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo05L9tNwN3Lg4BCukFKeml9UVA5X8ivv90MmvrgB1NYNO5k_yxHYZD-TnQr02YMJs57JpwdnKEhx_9Dw28cCLDa6PVwMQgRO2AWvBDaK4fyzxA3FxG1FHPA-_MOIN371Q1ESWgFwtf0sMDh9KOOOLsfvUcsAgEi09v5iPvkE5ZlG1ZzR_Y-W97Zb1Hxbpqxr_I45_of8NqvJ4E7V8llgXq1u7otFfpFbjGqSA40KYx7hsimBDfxpN"
                  />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#ffd9e3] flex items-center justify-center text-[#3e001e] font-label-sticker text-[11px] ring-2 ring-[#fcf8fd] font-bold">
                  +48k
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#b40063]">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span className="font-label-lg text-sm font-bold text-[#1b1b1e]">4.9 / 5</span>
                </div>
                <span className="font-body-sm text-xs text-[#5a3f48]">
                  from 48.2k+ honest foodie reviews
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero Collage / Bento Visual Grid */}
          <div className="lg:col-span-6 relative">
            {/* Floating Stickers */}
            <div
              onClick={() => showToast('🤤 Chef approved: 100% crave satisfaction guaranteed!')}
              className="absolute -top-4 -left-3 z-20 px-3.5 py-1.5 rounded-full bg-[#e1037d] text-white font-label-sticker text-[11px] shadow-lg -rotate-6 transform hover:rotate-0 hover:scale-105 transition-all cursor-pointer select-none"
            >
              YUM! 🤤
            </div>
            <div
              onClick={() => showToast('🤯 Mind-blowing crunch delivered in under 20 mins!')}
              className="absolute top-1/4 -right-4 z-20 px-3.5 py-1.5 rounded-full bg-[#007f9b] text-white font-label-sticker text-[11px] shadow-lg rotate-8 transform hover:rotate-0 hover:scale-105 transition-all cursor-pointer select-none"
            >
              OMG! 🤯
            </div>
            <div
              onClick={() => showToast('🔥 Trending on TikTok across campus!')}
              className="absolute bottom-24 -left-5 z-20 px-4 py-1.5 rounded-full bg-[#7d2dce] text-white font-label-sticker text-[11px] shadow-xl -rotate-3 transform hover:scale-110 transition-transform cursor-pointer select-none"
            >
              🔥 Trending
            </div>
            <div
              onClick={() => showToast('💯 100% Certified Slap by top food influencers!')}
              className="absolute -bottom-4 right-10 z-20 px-4 py-1.5 rounded-full bg-[#303033] text-[#47d6ff] font-label-sticker text-[11px] shadow-xl rotate-3 transform hover:rotate-0 hover:scale-105 transition-all cursor-pointer select-none"
            >
              100% Certified Slap 💯
            </div>

            {/* Dynamic Bento Showcase */}
            <div className="grid grid-cols-12 gap-3 p-3 rounded-3xl bg-[#f6f2f7] shadow-2xl border border-white/60">
              {/* Main Hero Dish: Lava Smash Burger */}
              <div
                onClick={() =>
                  onSelectItem({
                    id: 'loaded-burger',
                    name: 'Lava Smash Burger',
                    price: 12.99,
                    description:
                      'Double smash Angus patties smothered in four-cheese lava & crispy caramelized onions on toasted brioche.',
                    imageUrl: HERO_SHOWCASE.main.imageUrl,
                    rating: 4.9,
                    reviewsCount: '2.4k',
                    badge: { text: 'Viral Hit', bgColor: 'bg-[#b40063]', textColor: 'text-white' },
                  })
                }
                className="col-span-7 row-span-2 relative group rounded-2xl overflow-hidden bg-white shadow-md cursor-pointer"
              >
                <img
                  className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={HERO_SHOWCASE.main.alt}
                  src={HERO_SHOWCASE.main.imageUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#303033]/85 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="inline-flex self-start px-2 py-0.5 rounded-full bg-[#b40063] text-white font-label-sticker text-[10px] uppercase mb-1 font-bold">
                    {HERO_SHOWCASE.main.tag}
                  </span>
                  <h3 className="font-headline-sm text-lg font-bold">
                    {HERO_SHOWCASE.main.title}
                  </h3>
                  <p className="font-body-sm text-xs opacity-90">{HERO_SHOWCASE.main.price}</p>
                </div>
              </div>

              {/* Top Right: Hot Honey Pie */}
              <div
                onClick={() =>
                  onSelectItem({
                    id: 'hot-honey-pizza',
                    name: 'Hot Honey Pie',
                    price: 14.20,
                    description:
                      'Detroit-style deep dish sourdough crust loaded with crispy cup pepperoni, hot honey drizzle & fresh basil.',
                    imageUrl: HERO_SHOWCASE.topRight.imageUrl,
                    rating: 4.9,
                    reviewsCount: '3.1k',
                    badge: { text: 'Must Try 👅', bgColor: 'bg-[#7d2dce]', textColor: 'text-white' },
                  })
                }
                className="col-span-5 relative group rounded-2xl overflow-hidden bg-white shadow-md cursor-pointer"
              >
                <img
                  className="w-full h-36 sm:h-38 object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={HERO_SHOWCASE.topRight.alt}
                  src={HERO_SHOWCASE.topRight.imageUrl}
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur font-label-sticker text-[10px] text-[#b40063] font-bold shadow-sm">
                  {HERO_SHOWCASE.topRight.tag}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-[#303033]/80 to-transparent text-white">
                  <span className="font-label-lg text-xs font-bold block truncate">
                    {HERO_SHOWCASE.topRight.title}
                  </span>
                </div>
              </div>

              {/* Bottom Right: Spicy Ramen */}
              <div
                onClick={() =>
                  onSelectItem({
                    id: 'korean-ramen',
                    name: 'Spicy Ramen',
                    price: 11.50,
                    description:
                      'Ultra-spicy fiery broth, springy noodles, soft-boiled marinated egg, nori crisp & melted cheddar slice.',
                    imageUrl: HERO_SHOWCASE.bottomRight.imageUrl,
                    rating: 4.8,
                    reviewsCount: '1.9k',
                    badge: { text: '🌶️ 3x Spicy', bgColor: 'bg-[#ba1a1a]', textColor: 'text-white' },
                  })
                }
                className="col-span-5 relative group rounded-2xl overflow-hidden bg-white shadow-md cursor-pointer"
              >
                <img
                  className="w-full h-32 sm:h-38 object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={HERO_SHOWCASE.bottomRight.alt}
                  src={HERO_SHOWCASE.bottomRight.imageUrl}
                />
                <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-[#303033]/80 to-transparent text-white flex items-center justify-between">
                  <span className="font-label-lg text-xs font-bold">
                    {HERO_SHOWCASE.bottomRight.title}
                  </span>
                  <span className="font-label-sticker text-[11px] text-[#47d6ff] font-bold">
                    {HERO_SHOWCASE.bottomRight.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
