import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Compass, Flame, Heart, User, MapPin } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { user, activeOrder } = useApp();
  const location = useLocation();

  const menuItems = [
    { name: 'Menu', path: '/menu', icon: Compass },
    { name: 'Deals', path: '/deals', icon: Flame, isStreak: true },
    { name: 'Saved', path: '/favorites', icon: Heart },
    { name: 'Dash', path: '/dashboard', icon: User }
  ];

  return (
    <>
      {/* Active Order Pill on Mobile - floats above navigation! */}
      {activeOrder && location.pathname !== '/tracking' && (
        <div className="md:hidden fixed bottom-24 left-4 right-4 z-40 bg-gradient-sunset p-3 rounded-2xl flex items-center justify-between shadow-[0_8px_24px_rgba(255,92,0,0.4)] animate-bounce">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">🛍️</span>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">Kitchen Preparation</span>
              <span className="text-sm font-black text-white">Ready in {activeOrder.eta} min • {activeOrder.building}</span>
            </div>
          </div>
          <NavLink
            to="/tracking"
            className="px-3.5 py-1.5 bg-white text-amber-600 font-extrabold text-xs rounded-xl shadow-sm transition-transform active:scale-95"
          >
            Track Map
          </NavLink>
        </div>
      )}

      {/* Floating Bottom Nav */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 glass-panel-heavy rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.15)] border border-subtle px-4 py-3 flex justify-between items-center">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex flex-col items-center justify-center w-14 py-1 transition-all rounded-xl relative ${
                  isActive ? 'text-[#FF5C00] bg-[#FF5C00]/10' : 'text-muted hover:text-main'
                }`
              }
            >
              {item.isStreak ? (
                <div className="relative">
                  <Flame className={`w-5 h-5 ${isActive ? 'text-[#FF5C00] fill-[#FF5C00]' : 'text-muted'}`} />
                  <span className="absolute -top-1.5 -right-2 bg-gradient-sunset text-[8px] font-black text-white px-1.5 py-0.5 rounded-full shadow-sm scale-90">
                    {user.streak}d
                  </span>
                </div>
              ) : (
                <Icon className="w-5 h-5" />
              )}
              <span className="text-[9px] font-black uppercase tracking-wider mt-1">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </>
  );
};
