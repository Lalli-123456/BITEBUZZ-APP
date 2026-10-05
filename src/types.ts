export interface AddonOption {
  id: string;
  name: string;
  price: number;
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  tags: string[]; // e.g. ['cheesy', 'latenight', 'spicy', 'budget']
  price: number;
  rating: number;
  reviewsCount: string;
  badge: {
    text: string;
    bgColor: string;
    textColor: string;
    rotate?: string;
  };
  description: string;
  imageUrl: string;
  imageAlt: string;
  quickAddon?: AddonOption;
  isUnderTen?: boolean;
  spiceLevel?: number; // 0 to 3
  prepTimeMinutes?: number;
  calories?: number;
}

export interface CartItem {
  cartItemId: string;
  foodItem: FoodItem;
  quantity: number;
  selectedAddons: AddonOption[];
  spiceLevel?: string;
  specialInstructions?: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  spots: string;
  description: string;
  bgColor: string;
  accentColor: string;
}

export interface Deal {
  id: string;
  code: string;
  title: string;
  discountDescription: string;
  minOrder: number;
  badge: string;
  expiresInMinutes: number;
}
