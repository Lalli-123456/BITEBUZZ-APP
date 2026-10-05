import React, { useState } from 'react';
import { FoodItem } from '../types';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  activeNavTab: string;
  onSelectNavTab: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenProfile: () => void;
  onSelectItem: (item: FoodItem) => void;
  allFoodItems: FoodItem[];
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  favoritesCount,
  onOpenFavorites,
  activeNavTab,
  onSelectNavTab,
  searchQuery,
  onSearchChange,
  onOpenProfile,
  onSelectItem,
  allFoodItems,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search filtered suggestions
  const searchResults = searchQuery.trim()
    ? allFoodItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fcf8fd]/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      {/* Top Banner Marquee */}
      <div className="bg-[#303033] text-[#f3f0f4] overflow-hidden whitespace-nowrap py-1.5 border-b border-black/10">
        <div className="animate-marquee flex items-center font-label-sticker text-[11px] uppercase tracking-wider">
          <span className="mx-6 flex items-center gap-2">🔥 FREE BOBA ON ORDERS OVER $25</span>
          <span className="mx-2 opacity-50">•</span>
          <span className="mx-6 flex items-center gap-2 text-[#ffb0c9]">USE CODE: NOCAP</span>
          <span className="mx-2 opacity-50">•</span>
          <span className="mx-6 flex items-center gap-2">⚡ CRAZY DEALS EVERY 60 MINS</span>
          <span className="mx-2 opacity-50">•</span>
          <span className="mx-6 flex items-center gap-2">🍕 10,000+ HUNGRY FOODIES ORDERING RIGHT NOW</span>
          <span className="mx-2 opacity-50">•</span>
          <span className="mx-6 flex items-center gap-2">🔥 FREE BOBA ON ORDERS OVER $25</span>
          <span className="mx-2 opacity-50">•</span>
          <span className="mx-6 flex items-center gap-2 text-[#ffb0c9]">USE CODE: NOCAP</span>
          <span className="mx-2 opacity-50">•</span>
          <span className="mx-6 flex items-center gap-2">⚡ CRAZY DEALS EVERY 60 MINS</span>
          <span className="mx-2 opacity-50">•</span>
          <span className="mx-6 flex items-center gap-2">🍕 10,000+ HUNGRY FOODIES ORDERING RIGHT NOW</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Speed Pill */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectNavTab('trending')}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <img
              alt="BiteBuzz Logo"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VSk03zjJWAixCtVTpe_QChw7Vpk7JWaRG84SnZ2i14mEWbarnRRphbhDHg8wB9pOf6x8IRJsR8JcpXO-0wQ43CW4X5Zx5yZ_saRmA9_gDdo_yfuaf37Km-8EL7bF9PDp39Fs-kKzCB5ZjwjIVE7a-ciClY1cw_BDWWISusXEkcPRRpcQHTHWPQfsNTo8Hn39l5YMh8dS_GH_RuISiVeLlnCZxly_p12AwEazxeRgZk_JtWZllk8FxQunc"
            />
            <span className="font-headline-md text-2xl tracking-tight text-[#b40063] font-bold hidden sm:inline-block">
              BiteBuzz
            </span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efdbff] text-[#2b0052] font-label-sticker text-[11px] tracking-wide shadow-sm animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7d2dce]"></span>
            <span>⚡ 20 MIN SPEED DELIVERY</span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 bg-[#f6f2f7] px-2 py-1.5 rounded-full shadow-inner">
          <button
            onClick={() => onSelectNavTab('trending')}
            className={`px-4 py-2 transition-all font-label-lg rounded-full cursor-pointer text-sm ${
              activeNavTab === 'trending'
                ? 'bg-[#e1037d] text-white shadow-[0_4px_16px_rgba(225,3,125,0.3)]'
                : 'text-[#5a3f48] hover:text-[#1b1b1e] hover:bg-[#eae7eb]'
            }`}
          >
            Trending 🔥
          </button>
          <button
            onClick={() => onSelectNavTab('categories')}
            className={`px-4 py-2 transition-all font-label-lg rounded-full cursor-pointer text-sm ${
              activeNavTab === 'categories'
                ? 'bg-[#e1037d] text-white shadow-[0_4px_16px_rgba(225,3,125,0.3)]'
                : 'text-[#5a3f48] hover:text-[#1b1b1e] hover:bg-[#eae7eb]'
            }`}
          >
            Categories 🍕
          </button>
          <button
            onClick={() => onSelectNavTab('secret-menu')}
            className={`px-4 py-2 transition-all font-label-lg rounded-full cursor-pointer text-sm ${
              activeNavTab === 'secret-menu'
                ? 'bg-[#e1037d] text-white shadow-[0_4px_16px_rgba(225,3,125,0.3)]'
                : 'text-[#5a3f48] hover:text-[#1b1b1e] hover:bg-[#eae7eb]'
            }`}
          >
            Secret Menu 🤫
          </button>
          <button
            onClick={() => onSelectNavTab('drop-radar')}
            className={`px-4 py-2 transition-all font-label-lg rounded-full cursor-pointer text-sm ${
              activeNavTab === 'drop-radar'
                ? 'bg-[#e1037d] text-white shadow-[0_4px_16px_rgba(225,3,125,0.3)]'
                : 'text-[#5a3f48] hover:text-[#1b1b1e] hover:bg-[#eae7eb]'
            }`}
          >
            Drop Radar 🛸
          </button>
          <button
            onClick={() => onSelectNavTab('deals')}
            className={`px-4 py-2 transition-all font-label-lg rounded-full cursor-pointer text-sm ${
              activeNavTab === 'deals'
                ? 'bg-[#e1037d] text-white shadow-[0_4px_16px_rgba(225,3,125,0.3)]'
                : 'text-[#5a3f48] hover:text-[#1b1b1e] hover:bg-[#eae7eb]'
            }`}
          >
            Deals 💸
          </button>
        </nav>

        {/* Right Action Icons: Search, Favs, Cart, Profile */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Box */}
          <div className="hidden md:flex items-center relative w-60 lg:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
              className="w-full h-11 pl-4 pr-9 rounded-full bg-[#f0edf1] text-[#1b1b1e] placeholder:text-[#5a3f48]/70 font-body-sm text-[13px] focus:outline-none focus:ring-2 focus:ring-[#00657b] transition-all shadow-inner"
              placeholder="Search pizza, boba, spicy wings..."
            />
            <span className="material-symbols-outlined absolute right-3 text-[#5a3f48] text-lg pointer-events-none">
              search
            </span>

            {/* Quick Live Search Popover */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-12 left-0 right-0 bg-white rounded-2xl shadow-2xl p-2 z-50 border border-gray-100 animate-in fade-in zoom-in-95">
                <div className="text-[11px] font-label-sticker text-gray-400 px-3 py-1 uppercase">
                  Fast Cravings Match
                </div>
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectItem(item);
                      setIsSearchFocused(false);
                    }}
                    className="w-full text-left p-2 hover:bg-[#f6f2f7] rounded-xl flex items-center gap-3 transition-colors cursor-pointer"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-[#1b1b1e] truncate">{item.name}</p>
                      <p className="text-xs text-[#b40063] font-bold">${item.price.toFixed(2)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="w-11 h-11 rounded-full bg-[#f6f2f7] hover:bg-[#f0edf1] flex items-center justify-center text-[#5a3f48] hover:text-[#b40063] transition-all duration-200 relative cursor-pointer"
            title="Favorites"
          >
            <span className="material-symbols-outlined text-xl">favorite</span>
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#b40063] text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Cart CTA Button */}
          <button
            onClick={onOpenCart}
            className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#b40063] hover:bg-[#e1037d] text-white transition-all duration-300 shadow-[0_8px_20px_-4px_rgba(180,0,99,0.4)] active:scale-95 cursor-pointer"
          >
            <span className="font-label-lg text-sm font-bold">
              🛒 Cart ({cartCount}) • ${cartTotal.toFixed(2)}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#47d6ff] animate-ping"></span>
          </button>

          {/* User Profile */}
          <button
            onClick={onOpenProfile}
            className="relative group shrink-0 cursor-pointer"
            title="User Profile & Rewards"
          >
            <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#b40063] via-[#7d2dce] to-[#00657b] shadow-[0_0_12px_rgba(151,76,233,0.5)] group-hover:scale-105 transition-transform duration-300">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover block"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFBoSB6Kc12GQhRTsd7DT6bFgh7uZdnoSW0_oLC8TiEOGW9Rdhf61wQHUjTycW22RsWs5w1b1CMAYx7D9BEKAh-hDEcqEUav0VdmKuFKMwWvDzrB3xUDCokcDkI8TN5LBizFLx6XigmVogMdHcnD8qUsc7zJK6oCB8sbd5X-6ofuyfRt6wLvQQE9k540NxXbRGmiu8b0OKbBRJWV6BUn0TnStxHOlAownjY4FobA8phmhj6HbHcySR"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full shadow-sm"></span>
          </button>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-10 h-10 rounded-full bg-[#f6f2f7] flex items-center justify-center text-[#1b1b1e] cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-3 shadow-lg">
          <div className="relative mb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-3 pr-8 rounded-full bg-[#f0edf1] text-[#1b1b1e] text-sm"
              placeholder="Search dishes, drinks..."
            />
            <span className="material-symbols-outlined absolute right-3 top-2.5 text-gray-500 text-lg">
              search
            </span>
          </div>
          <button
            onClick={() => {
              onSelectNavTab('trending');
              setMobileMenuOpen(false);
            }}
            className="text-left font-bold py-2 text-[#1b1b1e] hover:text-[#b40063]"
          >
            Trending 🔥
          </button>
          <button
            onClick={() => {
              onSelectNavTab('categories');
              setMobileMenuOpen(false);
            }}
            className="text-left font-bold py-2 text-[#1b1b1e] hover:text-[#b40063]"
          >
            Categories 🍕
          </button>
          <button
            onClick={() => {
              onSelectNavTab('secret-menu');
              setMobileMenuOpen(false);
            }}
            className="text-left font-bold py-2 text-[#1b1b1e] hover:text-[#b40063]"
          >
            Secret Menu 🤫
          </button>
          <button
            onClick={() => {
              onSelectNavTab('drop-radar');
              setMobileMenuOpen(false);
            }}
            className="text-left font-bold py-2 text-[#1b1b1e] hover:text-[#b40063]"
          >
            Drop Radar 🛸
          </button>
          <button
            onClick={() => {
              onSelectNavTab('deals');
              setMobileMenuOpen(false);
            }}
            className="text-left font-bold py-2 text-[#1b1b1e] hover:text-[#b40063]"
          >
            Deals 💸
          </button>
        </div>
      )}
    </header>
  );
};
