import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp, UserRole } from '@/context/AppContext';
import { Search, Sun, Moon, Bell, User, ShoppingBag, Flame, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import logoUrl from '@/assets/branding/logo.png';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const {
    role,
    setRole,
    user,
    cart,
    favorites,
    isDarkMode,
    toggleTheme,
    notifications,
    markNotificationsRead
  } = useApp();

  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setShowRoleDropdown(false);
    navigate('/dashboard');
  };

  const navLinks = [
    { name: 'Menu', path: '/menu' },
    { name: 'Deals', path: '/deals' },
    { name: 'Saved Meals', path: '/favorites' },
    { name: 'Orders', path: '/dashboard' }
  ];

  return (
    <header className="fixed top-12 left-0 right-0 z-40 flex justify-center w-full px-4 transition-all duration-300">
      <div className="w-full max-w-[1050px] glass-navbar rounded-full px-5 py-2.5 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center gap-2.5 group pl-1">
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center p-1 shadow-[0_0_15px_rgba(255,255,255,0.15)] ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105">
              <img 
                src={logoUrl} 
                alt="Campus Bite Logo" 
                className="h-full w-full object-contain" 
              />
            </div>
            <span className="font-extrabold text-[17px] tracking-tight text-main transition-colors hidden sm:block">
              Campus<span className="text-[#FF5C00]">Bite</span>
            </span>
          </Link>
        </div>

        {/* CENTERED NAV LINKS */}
        <div className="hidden md:flex flex-none justify-center">
          <nav className="flex items-center gap-9">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[13px] font-medium transition-colors ${
                    isActive ? 'text-main drop-shadow-sm' : 'text-muted hover:text-main'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* RIGHT INTERACTIONS */}
        <div className="flex-1 flex justify-end items-center gap-3 md:gap-4 pr-1">
          
          {/* SEARCH TRIGGER */}
          <button
            onClick={() => navigate('/menu')}
            className="p-1.5 text-neutral-400 hover:text-[#FF5C00] transition-colors"
          >
            <Search className="w-[18px] h-[18px]" strokeWidth={2} />
          </button>

          {/* THEME SWITCHER */}
          <button
            onClick={toggleTheme}
            className="p-1.5 text-muted hover:text-[#FF5C00] transition-colors relative flex items-center justify-center w-8 h-8 rounded-full"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 0 : 90, scale: isDarkMode ? 1 : 0, opacity: isDarkMode ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'backOut' }}
              className="absolute"
            >
              <Moon className="w-[18px] h-[18px]" strokeWidth={2} />
            </motion.div>
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? -90 : 0, scale: isDarkMode ? 0 : 1, opacity: isDarkMode ? 0 : 1 }}
              transition={{ duration: 0.3, ease: 'backOut' }}
              className="absolute"
            >
              <Sun className="w-[18px] h-[18px]" strokeWidth={2} />
            </motion.div>
          </button>

          {/* NOTIFICATIONS BELL */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) markNotificationsRead();
              }}
              className="p-1.5 text-muted hover:text-[#FF5C00] transition-colors relative"
            >
              <Bell className="w-[18px] h-[18px]" strokeWidth={2} />
              {unreadNotifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF5C00] rounded-full border-2 border-background" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 glass-panel-heavy rounded-2xl p-4 shadow-[0_15px_40px_rgba(0,0,0,0.2)] border border-subtle z-50">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-extrabold text-[11px] uppercase tracking-wider text-main">Alerts</h4>
                  <span className="text-[9px] text-[#FF5C00] font-black uppercase tracking-widest">Live</span>
                </div>
                <div className="space-y-2 max-h-52 overflow-y-auto no-scrollbar">
                  {notifications.slice(0, 3).map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-main/5 border border-subtle text-[11px]">
                      <p className="text-main/80 leading-normal text-left">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* PROFILE USER TRIGGER */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="p-1.5 text-muted hover:text-[#FF5C00] transition-colors flex items-center gap-1"
            >
              <User className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-3 w-40 glass-panel-heavy rounded-2xl p-1.5 shadow-2xl border border-subtle z-50">
                <Link
                  to="/dashboard"
                  onClick={() => setShowRoleDropdown(false)}
                  className="w-full text-left text-[11px] font-bold uppercase tracking-wide px-3 py-2 rounded-lg text-main/80 hover:text-main hover:bg-main/5 block"
                >
                  My Profile
                </Link>
                <div className="h-px bg-main/5 my-1" />
                {(['student', 'vendor', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`w-full text-left text-[11px] font-bold uppercase tracking-wide px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      role === r
                        ? 'text-[#FF5C00] bg-main/5'
                        : 'text-muted hover:text-main hover:bg-main/5'
                    }`}
                  >
                    <span>{r} Dashboard</span>
                  </button>
                ))}
                <div className="h-px bg-main/5 my-1" />
                <button
                  onClick={() => {
                    setShowRoleDropdown(false);
                    localStorage.removeItem('cb_user');
                    window.location.href = '/auth';
                  }}
                  className="w-full text-left text-[11px] font-bold uppercase tracking-wide px-3 py-2 rounded-lg text-red-500 hover:bg-red-500/10 block transition-colors"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>

          {/* CART BUTTON */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#FF5C00] hover:bg-[#E05200] text-white px-5 py-2.5 rounded-full font-bold text-[13px] shadow-[0_4px_15px_rgba(255,92,0,0.3)] transition-transform active:scale-95 ml-2 border border-orange-400/30"
          >
            <ShoppingBag className="w-4 h-4 text-white" strokeWidth={2.5} />
            <span className="tracking-wide">Cart</span>
            {cartItemsCount > 0 && (
              <span className="w-4 h-4 bg-black/20 text-white text-[9px] font-black rounded-full flex items-center justify-center ml-0.5">
                {cartItemsCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
export default Navbar;
