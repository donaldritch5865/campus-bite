import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { CartDrawer } from '@/components/modals/CartDrawer';
import { Home } from '@/pages/home/Home';
import { Restaurants } from '@/pages/restaurants/Restaurants';
import { RestaurantDetail } from '@/pages/restaurants/RestaurantDetail';
import { Deals } from '@/pages/home/Deals';
import { Favorites } from '@/pages/favorites/Favorites';
import { Checkout } from '@/pages/checkout/Checkout';
import { Tracking } from '@/pages/tracking/Tracking';
import { DashboardsContainer } from '@/pages/dashboard/index';
import { Auth } from '@/pages/auth/Auth';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background bg-cinematic-vignette text-main transition-colors duration-500 flex flex-col justify-between select-none pb-20 md:pb-0">
      {/* Dynamic Desktop Header */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Pages Container */}
      <main className="flex-1 w-full relative pt-24 lg:pt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/dashboard" element={<DashboardsContainer />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Floating Bottom iOS Mobile Nav */}
      <MobileNav />

      {/* Interactive Cart Slider Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}
