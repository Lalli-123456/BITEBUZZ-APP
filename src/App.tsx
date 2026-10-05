import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { TrendingNow } from './components/TrendingNow';
import { MunchiesBanner } from './components/MunchiesBanner';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ItemModal } from './components/ItemModal';
import { SecretMenuModal } from './components/SecretMenuModal';
import { DropRadarModal } from './components/DropRadarModal';
import { DealsModal } from './components/DealsModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { ProfileModal } from './components/ProfileModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { FloatingOrderAndToast } from './components/FloatingOrderAndToast';
import { FOOD_ITEMS } from './data/mockData';
import { FoodItem, CartItem, AddonOption } from './types';

export default function App() {
  // Navigation & filtering state
  const [activeNavTab, setActiveNavTab] = useState<string>('trending');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [vibeFilter, setVibeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Initial cart with 3 items totaling exactly $24.50 matching the screenshot!
  // Loaded Cheese Burger ($12.99) + Loaded Fries ($8.75) + Extra Truffle Dip ($2.76) = $24.50
  const initialBurger = FOOD_ITEMS.find((i) => i.id === 'loaded-burger') || FOOD_ITEMS[0];
  const initialFries = FOOD_ITEMS.find((i) => i.id === 'loaded-fries') || FOOD_ITEMS[3];
  const initialMomos = FOOD_ITEMS.find((i) => i.id === 'steamed-momos') || FOOD_ITEMS[5];

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartItemId: 'init-1',
      foodItem: initialBurger,
      quantity: 1,
      selectedAddons: [],
    },
    {
      cartItemId: 'init-2',
      foodItem: initialFries,
      quantity: 1,
      selectedAddons: [],
    },
    {
      cartItemId: 'init-3',
      foodItem: {
        ...initialMomos,
        id: 'boba-dip-combo',
        name: 'Extra Truffle Aioli Dip & Glaze',
        price: 2.76,
      },
      quantity: 1,
      selectedAddons: [],
    },
  ]);

  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(['loaded-burger', 'hot-honey-pizza']);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSecretMenuOpen, setIsSecretMenuOpen] = useState(false);
  const [isDropRadarOpen, setIsDropRadarOpen] = useState(false);
  const [isDealsOpen, setIsDealsOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<FoodItem | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart Computations
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => {
    const addonsTotal = item.selectedAddons.reduce((aSum, a) => aSum + a.price, 0);
    return sum + (item.foodItem.price + addonsTotal) * item.quantity;
  }, 0);

  // Filtered Food Items
  const filteredFoodItems = useMemo(() => {
    return FOOD_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory && item.category !== selectedCategory) {
        return false;
      }
      // Pill tag filter
      if (activeFilter === 'spicy' && !item.tags.includes('spicy')) return false;
      if (activeFilter === 'cheesy' && !item.tags.includes('cheesy')) return false;
      if (activeFilter === 'budget' && !item.isUnderTen && !item.tags.includes('budget'))
        return false;
      if (activeFilter === 'latenight' && !item.tags.includes('latenight')) return false;

      // Vibe filter
      if (vibeFilter === 'hyper-fast' && (item.prepTimeMinutes || 20) > 14) return false;
      if (vibeFilter === 'vegan' && item.category !== 'drinks' && item.category !== 'healthy')
        return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchCat = item.category.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCat) return false;
      }

      return true;
    });
  }, [selectedCategory, activeFilter, vibeFilter, searchQuery]);

  // Favorite Items objects
  const favoriteItemsList = useMemo(() => {
    return FOOD_ITEMS.filter((item) => favorites.includes(item.id));
  }, [favorites]);

  // Handlers
  const handleAddToCart = (foodItem: FoodItem, addon?: AddonOption) => {
    const newItemId = `${foodItem.id}-${Date.now()}`;
    setCartItems((prev) => [
      ...prev,
      {
        cartItemId: newItemId,
        foodItem,
        quantity: 1,
        selectedAddons: addon ? [addon] : [],
      },
    ]);
    showToast(`Added ${foodItem.name} to cart! ($${foodItem.price.toFixed(2)}) 🛒`);
  };

  const handleModalAddToCart = (
    foodItem: FoodItem,
    selectedAddons: AddonOption[],
    quantity: number,
    spiceLevel?: string,
    specialInstructions?: string
  ) => {
    const newItemId = `${foodItem.id}-${Date.now()}`;
    setCartItems((prev) => [
      ...prev,
      {
        cartItemId: newItemId,
        foodItem,
        quantity,
        selectedAddons,
        spiceLevel,
        specialInstructions,
      },
    ]);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart');
  };

  const handleToggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(itemId);
      if (exists) {
        showToast('Removed from favorites 💔');
        return prev.filter((id) => id !== itemId);
      } else {
        showToast('Added to favorites! ❤️');
        return [...prev, itemId];
      }
    });
  };

  const handleApplyPromo = (code: string): boolean => {
    const validCodes = ['NOCAP', 'CRAVE3AM', 'SPEEDDROP'];
    if (validCodes.includes(code.toUpperCase())) {
      setAppliedPromo(code.toUpperCase());
      showToast(`⚡ Promo code "${code.toUpperCase()}" applied!`);
      return true;
    }
    return false;
  };

  const handleSelectNavTab = (tab: string) => {
    setActiveNavTab(tab);
    if (tab === 'trending') {
      setSelectedCategory(null);
      setActiveFilter('all');
      const target = document.getElementById('trending-section');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'categories') {
      const target = document.getElementById('categories-section');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'secret-menu') {
      setIsSecretMenuOpen(true);
    } else if (tab === 'drop-radar') {
      setIsDropRadarOpen(true);
    } else if (tab === 'deals') {
      setIsDealsOpen(true);
    }
  };

  const handleOpenItemDetails = (partialItem: Partial<FoodItem>) => {
    const fullItem = FOOD_ITEMS.find((i) => i.id === partialItem.id) || (partialItem as FoodItem);
    setSelectedItemForModal(fullItem);
  };

  const handleExploreClick = () => {
    const target = document.getElementById('trending-section');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOrderNowClick = () => {
    setIsCartOpen(true);
  };

  const handleOrderComplete = () => {
    setIsCartOpen(false);
    setIsOrderTrackingOpen(true);
    setCartItems([]);
  };

  return (
    <div className="bg-[#fcf8fd] min-h-screen text-[#1b1b1e] font-sans selection:bg-[#b40063] selection:text-white">
      {/* Top Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        activeNavTab={activeNavTab}
        onSelectNavTab={handleSelectNavTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenProfile={() => setIsProfileOpen(true)}
        onSelectItem={handleOpenItemDetails}
        allFoodItems={FOOD_ITEMS}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 bg-[#fcf8fd]">
        <div className="flex flex-col w-full overflow-hidden">
          {/* Hero Section */}
          <Hero
            onExploreClick={handleExploreClick}
            onOrderNowClick={handleOrderNowClick}
            onSelectItem={handleOpenItemDetails}
            showToast={showToast}
          />

          {/* Categories / Taste Selector Section */}
          <Categories
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            vibeFilter={vibeFilter}
            onSetVibeFilter={setVibeFilter}
          />

          {/* Trending Now Section */}
          <TrendingNow
            items={filteredFoodItems}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onAddToCart={handleAddToCart}
            onSelectItem={handleOpenItemDetails}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            showToast={showToast}
          />

          {/* 3AM Munchies Hotline Banner */}
          <MunchiesBanner
            onUnlockVault={() => setIsSecretMenuOpen(true)}
            showToast={showToast}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer
        showToast={showToast}
        onOpenDeals={() => setIsDealsOpen(true)}
        onOpenSecretMenu={() => setIsSecretMenuOpen(true)}
      />

      {/* Floating Order Toast & Quick Alerts */}
      <FloatingOrderAndToast
        toastMessage={toastMessage}
        onClearToast={() => setToastMessage(null)}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={() => setAppliedPromo(null)}
        showToast={showToast}
        onOrderComplete={handleOrderComplete}
      />

      {/* Food Item Customizer Modal */}
      <ItemModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onAddToCart={handleModalAddToCart}
        showToast={showToast}
      />

      {/* Secret Menu / Midnight Vault Modal */}
      <SecretMenuModal
        isOpen={isSecretMenuOpen}
        onClose={() => setIsSecretMenuOpen(false)}
        onAddToCart={handleAddToCart}
        showToast={showToast}
      />

      {/* Drop Radar Modal */}
      <DropRadarModal
        isOpen={isDropRadarOpen}
        onClose={() => setIsDropRadarOpen(false)}
        showToast={showToast}
      />

      {/* Deals Modal */}
      <DealsModal
        isOpen={isDealsOpen}
        onClose={() => setIsDealsOpen(false)}
        onApplyDeal={handleApplyPromo}
        showToast={showToast}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteItems={favoriteItemsList}
        onRemoveFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        showToast={showToast}
      />

      {/* Profile & Rewards Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        showToast={showToast}
      />

      {/* Live Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
        showToast={showToast}
      />
    </div>
  );
}
