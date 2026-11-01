import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  getStoredItems,
  saveStoredItems,
  getStoredFavorites,
  saveStoredFavorites,
  getStoredNotifications,
  saveStoredNotifications,
  getStoredMessages,
  saveStoredMessages,
  getStoredCart,
  saveStoredCart,
  resetToDemoDefaults
} from '../utils/storage';
import confetti from 'canvas-confetti';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const MarketplaceContext = createContext(null);

export const MarketplaceProvider = ({ children }) => {
  const { user } = useAuth();
  const toast = useToast();

  const [items, setItems] = useState(() => getStoredItems());
  const [favorites, setFavorites] = useState(() => getStoredFavorites());
  const [notifications, setNotifications] = useState(() => getStoredNotifications());
  const [messages, setMessages] = useState(() => getStoredMessages());
  const [cart, setCart] = useState(() => getStoredCart());

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended', 'newest', 'price_asc', 'price_desc'
  const [priceMax, setPriceMax] = useState(2500);

  // Modals & Drawers state
  const [detailsItem, setDetailsItem] = useState(null);
  const [contactItem, setContactItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    saveStoredItems(items);
  }, [items]);

  useEffect(() => {
    saveStoredFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    saveStoredNotifications(notifications);
  }, [notifications]);

  useEffect(() => {
    saveStoredMessages(messages);
  }, [messages]);

  useEffect(() => {
    saveStoredCart(cart);
  }, [cart]);

  // Cart operations
  const addToCart = (item) => {
    const existing = cart.find((c) => c.item.id === item.id);
    if (existing) {
      toast.info(`"${item.title}" is already in your campus cart.`, "Cart Notice");
      setIsCartOpen(true);
      return;
    }
    const newEntry = {
      id: `cart-${item.id}`,
      item,
      quantity: 1,
      addedAt: new Date().toISOString()
    };
    setCart((prev) => [newEntry, ...prev]);
    const savings = item.marketPrice - item.resalePrice;
    toast.success(`Added "${item.title}" to cart. You save ₹${savings.toLocaleString('en-IN')}!`, "Added to Cart");
  };

  const removeFromCart = (itemId) => {
    const entry = cart.find((c) => c.item.id === itemId);
    setCart((prev) => prev.filter((c) => c.item.id !== itemId));
    toast.info(`Removed "${entry?.item?.title || 'Item'}" from cart.`, "Cart Updated");
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkoutCart = (pickupLocation = "Central Library / Common Desk") => {
    if (cart.length === 0) return;

    // Reserve all items in cart
    const itemIds = cart.map((c) => c.item.id);
    setItems((prev) =>
      prev.map((item) => (itemIds.includes(item.id) ? { ...item, status: 'Reserved' } : item))
    );

    // Create reservation inquiry messages and notifications
    cart.forEach((c) => {
      const msg = {
        id: `msg-cart-${Date.now()}-${c.item.id}`,
        itemId: c.item.id,
        itemTitle: c.item.title,
        senderName: user?.name || "Student Buyer",
        senderEmail: user?.email || "student@amity.edu",
        recipientName: c.item.sellerName,
        message: `Hi ${c.item.sellerName}! I have reserved "${c.item.title}" from my CampusLoop cart. Let's meet at: ${pickupLocation}`,
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [msg, ...prev]);
    });

    const notif = {
      id: `notif-cart-${Date.now()}`,
      title: "Campus Order Reserved",
      message: `${cart.length} item(s) reserved for meetup at ${pickupLocation}. Contact sellers to finalize pickup.`,
      time: "Just now",
      unread: true,
      type: "order"
    };
    setNotifications((prev) => [notif, ...prev]);

    // Confetti celebration
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    clearCart();
    setIsCartOpen(false);
    toast.success(
      `Reserved ${itemIds.length} item(s) for pickup at ${pickupLocation}. Sellers have been notified!`,
      "Campus Order Placed! 🎉"
    );
  };

  const cartCount = cart.length;
  const cartResaleTotal = cart.reduce((sum, c) => sum + (c.item.resalePrice || 0) * (c.quantity || 1), 0);
  const cartMarketTotal = cart.reduce((sum, c) => sum + (c.item.marketPrice || 0) * (c.quantity || 1), 0);
  const cartSavingsTotal = Math.max(0, cartMarketTotal - cartResaleTotal);

  // Favorite toggle with animation and toast
  const toggleFavorite = (itemId) => {
    const item = items.find((i) => i.id === itemId);
    const itemTitle = item ? item.title : "Item";

    setFavorites((prev) => {
      const exists = prev.includes(itemId);
      if (exists) {
        toast.info(`Removed "${itemTitle}" from your favorites.`, "Wishlist Updated");
        return prev.filter((id) => id !== itemId);
      } else {
        toast.success(`Saved "${itemTitle}" to your favorites.`, "Added to Wishlist");
        return [...prev, itemId];
      }
    });
  };

  const isFavorite = (itemId) => favorites.includes(itemId);

  // Add new listing
  const addItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: `item-${Date.now()}`,
      sellerId: user?.id || 'guest-user',
      sellerName: user?.name || 'Ramsha Azra',
      sellerEmail: user?.email || 'ramsha@amity.edu',
      sellerCollege: `${user?.college || 'Amity University'} · ${user?.academicYear || 'Final Year'}`,
      status: 'Available',
      createdAt: new Date().toISOString()
    };

    setItems((prev) => [newItem, ...prev]);

    // Add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "Listing Published",
      message: `Your item "${newItem.title}" is now live on CampusLoop at ₹${newItem.resalePrice}.`,
      time: "Just now",
      unread: true,
      type: "listing"
    };
    setNotifications((prev) => [newNotif, ...prev]);

    toast.success(
      `"${newItem.title}" is now visible in the Campus Marketplace.`,
      "Listing Published Successfully!"
    );

    return newItem;
  };

  // Update listing
  const updateItem = (itemId, updatedData) => {
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, ...updatedData } : item))
    );
    toast.success("Listing details updated successfully.", "Listing Updated");
  };

  // Delete listing
  const deleteItem = (itemId) => {
    const itemToDelete = items.find((i) => i.id === itemId);
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    // Also remove from favorites if present
    setFavorites((prev) => prev.filter((id) => id !== itemId));
    toast.info(
      `Listing "${itemToDelete?.title || 'item'}" removed successfully.`,
      "Listing Removed"
    );
  };

  // Update status (Available -> Reserved -> Sold)
  const updateItemStatus = (itemId, newStatus) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, status: newStatus };
        }
        return item;
      })
    );

    if (newStatus === 'Sold') {
      toast.success(
        "Status marked as Sold! This item is archived from public marketplace view.",
        "Item Sold 🎉"
      );
    } else if (newStatus === 'Reserved') {
      toast.warning(
        "Item marked as Reserved. Other buyers cannot purchase it right now.",
        "Listing Reserved ⏳"
      );
    } else {
      toast.info(
        "Listing is now Active and available to all campus buyers.",
        "Status: Available"
      );
    }
  };

  // Contact Seller interaction
  const sendSellerInquiry = (itemId, messageText) => {
    const item = items.find((i) => i.id === itemId);
    const newMsg = {
      id: `msg-${Date.now()}`,
      itemId,
      itemTitle: item?.title,
      senderName: user?.name || "Campus Student",
      senderEmail: user?.email || "student@amity.edu",
      recipientName: item?.sellerName,
      message: messageText,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [newMsg, ...prev]);

    // Add notification for the user
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "Inquiry Sent",
      message: `Your message to ${item?.sellerName} regarding "${item?.title}" was delivered.`,
      time: "Just now",
      unread: true,
      type: "message"
    };
    setNotifications((prev) => [newNotif, ...prev]);

    toast.success(
      "Interest sent successfully. The seller can now respond to your request.",
      "Message Delivered"
    );
  };

  // Notification helpers
  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => n.unread).length;
  }, [notifications]);

  // Reset to initial demo state
  const resetData = () => {
    const defaults = resetToDemoDefaults();
    setItems(defaults.items);
    setFavorites(defaults.favorites);
    setNotifications(defaults.notifications);
    setMessages([]);
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCondition('All');
    setSelectedAvailability('All');
    toast.info("Database reset to initial campus demo listings.", "Reset Complete");
  };

  // Public Marketplace Items (RULE 4: Sold listings do NOT appear on the public marketplace!)
  const publicItems = useMemo(() => {
    return items.filter((item) => item.status !== 'Sold');
  }, [items]);

  // Filtered and Sorted Marketplace Items
  const filteredItems = useMemo(() => {
    let result = publicItems.filter((item) => {
      // Search matching across title, description, category, and sellerName
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.sellerName.toLowerCase().includes(q);

      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();

      // Condition filter
      const matchesCondition =
        selectedCondition === 'All' || item.condition === selectedCondition;

      // Availability filter
      const matchesAvailability =
        selectedAvailability === 'All' || item.status === selectedAvailability;

      // Price range filter
      const matchesPrice = item.resalePrice <= priceMax;

      return matchesSearch && matchesCategory && matchesCondition && matchesAvailability && matchesPrice;
    });

    // Sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'price_asc') {
      result.sort((a, b) => a.resalePrice - b.resalePrice);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.resalePrice - a.resalePrice);
    } else {
      // 'recommended': available first, then highest savings
      result.sort((a, b) => {
        if (a.status === 'Available' && b.status !== 'Available') return -1;
        if (b.status === 'Available' && a.status !== 'Available') return 1;
        const savingsA = a.marketPrice - a.resalePrice;
        const savingsB = b.marketPrice - b.resalePrice;
        return savingsB - savingsA;
      });
    }

    return result;
  }, [publicItems, searchQuery, selectedCategory, selectedCondition, selectedAvailability, sortBy, priceMax]);

  // Global Marketplace Statistics
  const globalStats = useMemo(() => {
    const total = items.length;
    const available = items.filter((i) => i.status === 'Available').length;
    const reserved = items.filter((i) => i.status === 'Reserved').length;
    const sold = items.filter((i) => i.status === 'Sold').length;

    // Total potential savings across all currently available items: marketPrice - resalePrice
    const totalSavings = items
      .filter((i) => i.status === 'Available')
      .reduce((sum, item) => sum + (item.marketPrice - item.resalePrice), 0);

    return { total, available, reserved, sold, totalSavings };
  }, [items]);

  // Current User's Listings (for My Listings page)
  const userListings = useMemo(() => {
    if (!user) return [];
    // Show listings belonging to this user or tagged with demo user
    return items.filter(
      (item) => item.sellerId === user.id || item.sellerEmail?.toLowerCase() === user.email?.toLowerCase()
    );
  }, [items, user]);

  // User Dashboard Statistics
  const userStats = useMemo(() => {
    const total = userListings.length;
    const available = userListings.filter((i) => i.status === 'Available').length;
    const reserved = userListings.filter((i) => i.status === 'Reserved').length;
    const sold = userListings.filter((i) => i.status === 'Sold').length;
    const savingsGenerated = userListings
      .filter((i) => i.status === 'Available')
      .reduce((sum, item) => sum + (item.marketPrice - item.resalePrice), 0);

    return { total, available, reserved, sold, savingsGenerated };
  }, [userListings]);

  return (
    <MarketplaceContext.Provider
      value={{
        items,
        publicItems,
        filteredItems,
        favorites,
        toggleFavorite,
        isFavorite,
        addItem,
        updateItem,
        deleteItem,
        updateItemStatus,
        sendSellerInquiry,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedCondition,
        setSelectedCondition,
        selectedAvailability,
        setSelectedAvailability,
        sortBy,
        setSortBy,
        priceMax,
        setPriceMax,
        globalStats,
        userListings,
        userStats,
        // Modals
        detailsItem,
        setDetailsItem,
        contactItem,
        setContactItem,
        editingItem,
        setEditingItem,
        deleteCandidate,
        setDeleteCandidate,
        isNotifDrawerOpen,
        setIsNotifDrawerOpen,
        isMobileFilterOpen,
        setIsMobileFilterOpen,
        // Cart
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        clearCart,
        checkoutCart,
        cartCount,
        cartResaleTotal,
        cartMarketTotal,
        cartSavingsTotal,
        notifications,
        unreadCount,
        markAllNotificationsAsRead,
        resetData
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
