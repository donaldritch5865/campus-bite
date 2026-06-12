import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem, FOOD_ITEMS } from '@/mock/mockData';

export type UserRole = 'student' | 'vendor' | 'admin';

export type OrderMode = 'scheduled' | 'force_open' | 'force_close';

export interface CartItem {
  cartId: string; // unique cart line id
  foodId: string;
  name: string;
  price: number; // final price including addons
  quantity: number;
  image: string;
  restaurantId: string;
  kitchenName: string;
  addonsSelected: { name: string; price: number }[];
  specialNotes?: string;
}

export interface ActiveOrder {
  id: string;
  items: CartItem[];
  status: 'confirmed' | 'preparing' | 'packed' | 'transported' | 'ready' | 'collected';
  eta: number;
  campusId: string;
  building: string;
  deliveryNotes: string;
  paymentMethod: string;
  timestamp: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

interface UserProfile {
  userType: 'student' | 'bank_employee';
  name: string;
  email: string; // Student or Corporate Email
  mobileNumber?: string; // Common field
  
  // Student Specific
  studentId?: string;
  university?: string;
  
  // Bank Employee Specific
  employeeId?: string;
  bankName?: string;
  
  // Shared Operational
  campusId: string; // ID of the campus or corporate location
  building: string; // Name of the pickup station
  
  // Gamification & Wallet
  streak: number;
  level: 'Bronze' | 'Silver' | 'Gold';
  balance: number;
  points: number;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  cart: CartItem[];
  addToCart: (item: FoodItem, quantity: number, addons: { name: string; price: number }[], notes: string) => void;
  removeFromCart: (cartId: string) => void;
  updateCartQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  promoCode: string;
  promoDiscount: number;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  activeOrder: ActiveOrder | null;
  startOrderTracking: (campusId: string, building: string, notes: string, payment: string) => void;
  cancelOrder: () => void;
  completeActiveOrder: () => void;
  pastOrders: ActiveOrder[];
  isDarkMode: boolean;
  toggleTheme: () => void;
  notifications: { id: string; text: string; time: string; read: boolean }[];
  addNotification: (text: string) => void;
  markNotificationsRead: () => void;
  vendorOrders: ActiveOrder[];
  updateVendorOrderStatus: (orderId: string, status: 'confirmed' | 'preparing' | 'packed' | 'transported' | 'ready' | 'collected') => void;
  orderMode: OrderMode;
  setOrderMode: React.Dispatch<React.SetStateAction<OrderMode>>;
  isSystemOpen: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultUser: UserProfile = {
  userType: 'student',
  name: "Mazen Al-Bulushi",
  email: "mazen.b@squ.edu.om",
  mobileNumber: "+968 9123 4567",
  studentId: "SQU12345",
  university: "Sultan Qaboos University",
  campusId: "squ",
  building: "Main Library Hall",
  streak: 14,
  level: "Gold",
  balance: 8.400,
  points: 420
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('student');
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('cb_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with defaultUser to ensure new fields like userType exist for old local storage
      return { ...defaultUser, ...parsed, userType: parsed.userType || 'student' };
    }
    return defaultUser;
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cb_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('cb_favorites');
    return saved ? JSON.parse(saved) : ['f1', 'f2'];
  });
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(() => {
    const saved = localStorage.getItem('cb_active_order');
    return saved ? JSON.parse(saved) : null;
  });
  const [pastOrders, setPastOrders] = useState<ActiveOrder[]>(() => {
    const saved = localStorage.getItem('cb_past_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('cb_theme');
    // Default to true (dark mode) if not previously saved
    return saved ? JSON.parse(saved) : true;
  });

  const [orderMode, setOrderMode] = useState<OrderMode>(() => {
    const saved = localStorage.getItem('cb_order_mode');
    return saved ? JSON.parse(saved) : 'scheduled';
  });

  const [isSystemOpen, setIsSystemOpen] = useState(true);

  useEffect(() => {
    const checkSystemStatus = () => {
      if (orderMode === 'force_open') {
        setIsSystemOpen(true);
      } else if (orderMode === 'force_close') {
        setIsSystemOpen(false);
      } else {
        // scheduled mode: open from 12 AM (00:00) to 11 AM (11:00)
        const now = new Date();
        const hour = now.getHours();
        setIsSystemOpen(hour >= 0 && hour < 11);
      }
    };

    checkSystemStatus();
    const interval = setInterval(checkSystemStatus, 60000);
    return () => clearInterval(interval);
  }, [orderMode]);

  useEffect(() => {
    localStorage.setItem('cb_order_mode', JSON.stringify(orderMode));
  }, [orderMode]);

  const [notifications, setNotifications] = useState([
    { id: "1", text: "🔥 Mazen! SQU Engineering has 12 orders for Chicken Biryani today!", time: "5 min ago", read: false },
    { id: "2", text: "☕ Iced Saffron Latte is now available for pre-order!", time: "1 hr ago", read: true }
  ]);

  // Vendor order simulation state
  const [vendorOrders, setVendorOrders] = useState<ActiveOrder[]>([]);

  useEffect(() => {
    localStorage.setItem('cb_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cb_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem('cb_active_order', JSON.stringify(activeOrder));
    } else {
      localStorage.removeItem('cb_active_order');
    }
  }, [activeOrder]);

  useEffect(() => {
    localStorage.setItem('cb_past_orders', JSON.stringify(pastOrders));
  }, [pastOrders]);

  // Handle active class toggling on html/body for light/dark theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('cb_theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    addNotification(`Switched role interface to ${newRole.toUpperCase()} Dashboard`);
  };

  const addNotification = (text: string) => {
    const newNotif = {
      id: Date.now().toString(),
      text,
      time: "Just now",
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Cart operations
  const addToCart = (
    item: FoodItem,
    quantity: number,
    addons: { name: string; price: number }[],
    notes: string
  ) => {
    const addonsCost = addons.reduce((sum, ad) => sum + ad.price, 0);
    const unitPrice = item.price + addonsCost;
    
    // Check if item already exists in cart with exact same addons and notes
    const existingIndex = cart.findIndex(c => 
      c.foodId === item.id && 
      JSON.stringify(c.addonsSelected) === JSON.stringify(addons) &&
      c.specialNotes === notes
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      const newCartItem: CartItem = {
        cartId: Math.random().toString(36).substr(2, 9),
        foodId: item.id,
        name: item.name,
        price: unitPrice,
        quantity,
        image: item.image,
        restaurantId: item.kitchenName, // Used for routing compatibility if needed, else kitchenName
        kitchenName: item.kitchenName,
        addonsSelected: addons,
        specialNotes: notes
      };
      setCart([...cart, newCartItem]);
    }
    
    addNotification(`Added ${quantity}x ${item.name} to your fuel bag bag.`);
  };

  const removeFromCart = (cartId: string) => {
    const removedItem = cart.find(c => c.cartId === cartId);
    setCart(cart.filter(c => c.cartId !== cartId));
    if (removedItem) {
      addNotification(`Removed ${removedItem.name} from your fuel bag.`);
    }
  };

  const updateCartQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(cart.map(c => c.cartId === cartId ? { ...c, quantity } : c));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Favorite operations
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      addNotification(`Removed dish from favorites.`);
    } else {
      setFavorites([...favorites, id]);
      addNotification(`Added dish to your library! ❤️`);
    }
  };

  // Promo code logic
  const applyPromo = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'STUDENT15') {
      setPromoCode('STUDENT15');
      setPromoDiscount(0.15); // 15% off
      addNotification("Promo applied! Enjoy 15% student discount!");
      return true;
    } else if (cleanCode === 'EXAMFUEL') {
      setPromoCode('EXAMFUEL');
      setPromoDiscount(0.30); // 30% off
      addNotification("Exam Fuel active! 30% off applied!");
      return true;
    }
    addNotification("Invalid coupon code. Try 'STUDENT15' or 'EXAMFUEL'");
    return false;
  };

  const removePromo = () => {
    setPromoCode('');
    setPromoDiscount(0);
  };

  // Order placement and simulated tracking
  const startOrderTracking = (
    campusId: string,
    building: string,
    notes: string,
    payment: string
  ) => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delFee = subtotal > 3.0 ? 0.000 : 0.400; // Free delivery for orders above 3 OMR
    const discount = parseFloat((subtotal * promoDiscount).toFixed(3));
    const total = parseFloat((subtotal + delFee - discount).toFixed(3));

    const newOrder: ActiveOrder = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      items: [...cart],
      status: 'confirmed',
      eta: 8,
      campusId,
      building,
      deliveryNotes: notes,
      paymentMethod: payment,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subtotal,
      deliveryFee: delFee,
      discount,
      total
    };

    setActiveOrder(newOrder);
    setVendorOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Deduct student wallet balance
    if (payment.toLowerCase().includes('wallet') || payment.toLowerCase().includes('omr')) {
      setUser(prev => ({
        ...prev,
        balance: parseFloat(Math.max(0, prev.balance - total).toFixed(3)),
        streak: prev.streak + 1,
        points: prev.points + Math.round(total * 50)
      }));
    } else {
      setUser(prev => ({
        ...prev,
        streak: prev.streak + 1,
        points: prev.points + Math.round(total * 50)
      }));
    }

    addNotification("🚀 Order placed! Ahmed is gearing up. View Tracking map!");
  };

  const cancelOrder = () => {
    if (activeOrder) {
      addNotification(`Order #${activeOrder.id} has been cancelled.`);
      setActiveOrder(null);
    }
  };

  const completeActiveOrder = () => {
    if (activeOrder) {
      const completed: ActiveOrder = {
        ...activeOrder,
        status: 'collected',
        eta: 0
      };
      setPastOrders(prev => [completed, ...prev]);
      setActiveOrder(null);
      addNotification("🎁 Meal Collected! Enjoy your campus bite! 😋");
    }
  };

  // Vendor action simulation
  const updateVendorOrderStatus = (
    orderId: string,
    status: 'confirmed' | 'preparing' | 'packed' | 'transported' | 'ready' | 'collected'
  ) => {
    setVendorOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    
    // If it's the student's active order, update it
    if (activeOrder && activeOrder.id === orderId) {
      let etaVal = activeOrder.eta;
      if (status === 'preparing') etaVal = 6;
      if (status === 'packed') etaVal = 4;
      if (status === 'transported') etaVal = 2;
      if (status === 'ready') etaVal = 0;
      if (status === 'collected') etaVal = 0;

      setActiveOrder(prev => {
        if (!prev) return null;
        return {
          ...prev,
          status,
          eta: etaVal
        };
      });

      const messages = {
        confirmed: "Order Confirmed. Preparing bulk preparation schedule.",
        preparing: "Kitchen is preparing your meal!",
        packed: "Meal is packed and ready for transport.",
        transported: "Meal is being transported to the pickup station! 🚚",
        ready: "Your meal is available for pickup! Check your QR code. 🤩",
        collected: "Meal collected. Enjoy!"
      };

      addNotification(messages[status]);
    }
  };

  // Simulate order status ticks in the background for active order
  useEffect(() => {
    if (!activeOrder) return;
    
    // Simulate steps progress over time if user isn't in Vendor mode updating manually
    const timer = setTimeout(() => {
      if (activeOrder.status === 'confirmed') {
        updateVendorOrderStatus(activeOrder.id, 'preparing');
      } else if (activeOrder.status === 'preparing') {
        updateVendorOrderStatus(activeOrder.id, 'packed');
      } else if (activeOrder.status === 'packed') {
        updateVendorOrderStatus(activeOrder.id, 'transported');
      } else if (activeOrder.status === 'transported') {
        updateVendorOrderStatus(activeOrder.id, 'ready');
      } else if (activeOrder.status === 'ready') {
        // Wait for manual collection in the real app, but auto-collect here for demo
        setTimeout(() => {
          updateVendorOrderStatus(activeOrder.id, 'collected');
          completeActiveOrder();
        }, 15000);
      }
    }, 15000); // tick every 15 seconds for demonstrative MVP flow!

    return () => clearTimeout(timer);
  }, [activeOrder?.status]);

  return (
    <AppContext.Provider value={{
      role,
      setRole,
      user,
      setUser,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      favorites,
      toggleFavorite,
      promoCode,
      promoDiscount,
      applyPromo,
      removePromo,
      activeOrder,
      startOrderTracking,
      cancelOrder,
      completeActiveOrder,
      pastOrders,
      isDarkMode,
      toggleTheme,
      notifications,
      addNotification,
      markNotificationsRead,
      vendorOrders,
      updateVendorOrderStatus,
      orderMode,
      setOrderMode,
      isSystemOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
