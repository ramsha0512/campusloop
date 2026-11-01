import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { ThemeProvider } from './context/ThemeContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ItemModal } from './components/ItemModal';
import { ContactModal } from './components/ContactModal';
import { AuthModal } from './components/AuthModal';
import { EditItemModal } from './components/EditItemModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { MobileFilterDrawer } from './components/MobileFilterDrawer';
import { CartDrawer } from './components/CartDrawer';

import { Marketplace } from './pages/Marketplace';
import { SellItem } from './pages/SellItem';
import { MyListings } from './pages/MyListings';

export const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <MarketplaceProvider>
            <BrowserRouter>
              <div className="min-h-screen flex flex-col bg-[#F8F7FC] dark:bg-[#0E0D17] text-[#171725] dark:text-[#F3F2FA] transition-colors duration-200 selection:bg-[#635BFF]/20 selection:text-[#635BFF]">
                {/* Sticky Navigation */}
                <Navbar />

                {/* Main Content View */}
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<Marketplace />} />
                    <Route path="/sell" element={<SellItem />} />
                    <Route path="/listings" element={<MyListings />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>

                {/* Minimal Footer */}
                <Footer />

                {/* Interactive Modals and Drawers */}
                <ItemModal />
                <ContactModal />
                <AuthModal />
                <EditItemModal />
                <DeleteConfirmModal />
                <NotificationDrawer />
                <MobileFilterDrawer />
                <CartDrawer />
              </div>
            </BrowserRouter>
          </MarketplaceProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
