import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { GlobalOrderStatusBanner } from '@/components/ui/GlobalOrderStatusBanner';
import { CartDrawer } from '@/components/modals/CartDrawer';
import { Home } from '@/pages/home/Home';
import { DailyMenu } from '@/pages/menu/DailyMenu';
import { MealDetail } from '@/pages/menu/MealDetail';
import { Deals } from '@/pages/home/Deals';
import { SavedMeals } from '@/pages/favorites/SavedMeals';
import { Checkout } from '@/pages/checkout/Checkout';
import { PickupStatus } from '@/pages/tracking/PickupStatus';
import { MealPlans } from '@/pages/plans/MealPlans';
import { DashboardsContainer } from '@/pages/dashboard/index';
import { Auth } from '@/pages/auth/Auth';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background bg-cinematic-vignette text-main transition-colors duration-500 flex flex-col justify-between select-none pb-20 md:pb-0">
      <GlobalOrderStatusBanner />
      {/* Dynamic Desktop Header */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Pages Container */}
      <main className="flex-1 w-full relative pt-24 lg:pt-28">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<DailyMenu />} />
          <Route path="/meal/:id" element={<MealDetail />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/favorites" element={<SavedMeals />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tracking" element={<PickupStatus />} />
          <Route path="/meal-plans" element={<MealPlans />} />
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
