import { DEMO_LISTINGS, INITIAL_USER, INITIAL_NOTIFICATIONS } from '../data/demoData';

const KEYS = {
  ITEMS: 'campusloop_items_v1',
  USER: 'campusloop_user_v1',
  FAVORITES: 'campusloop_favorites_v1',
  NOTIFICATIONS: 'campusloop_notifications_v1',
  MESSAGES: 'campusloop_messages_v1',
  CART: 'campusloop_cart_v1'
};

// Safe JSON parse with fallback
const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
};

export const getStoredItems = () => {
  const items = getStorageItem(KEYS.ITEMS, null);
  if (!items || items.length === 0) {
    setStorageItem(KEYS.ITEMS, DEMO_LISTINGS);
    return DEMO_LISTINGS;
  }
  return items;
};

export const saveStoredItems = (items) => {
  setStorageItem(KEYS.ITEMS, items);
};

export const getStoredUser = () => {
  const user = getStorageItem(KEYS.USER, null);
  if (!user) {
    setStorageItem(KEYS.USER, INITIAL_USER);
    return INITIAL_USER;
  }
  return user;
};

export const saveStoredUser = (user) => {
  setStorageItem(KEYS.USER, user);
};

export const getStoredFavorites = () => {
  // Pre-seed item-1 and item-4 as favorited for nice demo presentation
  const favs = getStorageItem(KEYS.FAVORITES, null);
  if (!favs) {
    const defaultFavs = ["item-1", "item-4"];
    setStorageItem(KEYS.FAVORITES, defaultFavs);
    return defaultFavs;
  }
  return favs;
};

export const saveStoredFavorites = (favs) => {
  setStorageItem(KEYS.FAVORITES, favs);
};

export const getStoredNotifications = () => {
  const notifs = getStorageItem(KEYS.NOTIFICATIONS, null);
  if (!notifs) {
    setStorageItem(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    return INITIAL_NOTIFICATIONS;
  }
  return notifs;
};

export const saveStoredNotifications = (notifs) => {
  setStorageItem(KEYS.NOTIFICATIONS, notifs);
};

export const getStoredMessages = () => {
  return getStorageItem(KEYS.MESSAGES, []);
};

export const saveStoredMessages = (messages) => {
  setStorageItem(KEYS.MESSAGES, messages);
};

export const getStoredCart = () => {
  return getStorageItem(KEYS.CART, []);
};

export const saveStoredCart = (cart) => {
  setStorageItem(KEYS.CART, cart);
};

export const resetToDemoDefaults = () => {
  setStorageItem(KEYS.ITEMS, DEMO_LISTINGS);
  setStorageItem(KEYS.USER, INITIAL_USER);
  setStorageItem(KEYS.FAVORITES, ["item-1", "item-4"]);
  setStorageItem(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  setStorageItem(KEYS.MESSAGES, []);
  return {
    items: DEMO_LISTINGS,
    user: INITIAL_USER,
    favorites: ["item-1", "item-4"],
    notifications: INITIAL_NOTIFICATIONS
  };
};
