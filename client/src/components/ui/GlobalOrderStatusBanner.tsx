import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Lock } from 'lucide-react';

export const GlobalOrderStatusBanner: React.FC = () => {
  const { isSystemOpen, user } = useApp();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    let interval: number;

    if (isSystemOpen) {
      const updateCountdown = () => {
        const now = new Date();
        const target = new Date();
        target.setHours(11, 0, 0, 0);

        if (now > target) {
          setCountdown('00:00:00');
          return;
        }

        const diff = target.getTime() - now.getTime();
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown(
          `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
        );
      };

      updateCountdown();
      interval = window.setInterval(updateCountdown, 1000);
    }

    return () => window.clearInterval(interval);
  }, [isSystemOpen]);

  return (
    <AnimatePresence mode="wait">
      {isSystemOpen ? (
        <motion.div
          key="open"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full bg-gradient-sunset text-white py-2.5 px-4 z-50 fixed top-0 left-0 right-0 shadow-md flex items-center justify-center sm:justify-between flex-wrap gap-2 text-center sm:text-left"
        >
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-4">
            <div className="flex items-center gap-1.5 font-black uppercase tracking-wider text-xs sm:text-sm">
              <Flame className="w-4 h-4" />
              <span>Today's Orders Close At 11:00 AM</span>
            </div>
            <span className="hidden sm:inline opacity-60 text-xs font-bold">|</span>
            <div className="text-[10px] sm:text-xs font-bold text-white/90">
              Pre-order now and collect during lunch hours.
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="font-black font-mono text-sm sm:text-base bg-white/20 px-2 py-0.5 rounded-md">
              {countdown}
            </div>
            <button 
              onClick={() => navigate('/menu')}
              className="bg-white text-[#FF5C00] px-3 py-1 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider hover:bg-white/90 transition-colors"
            >
              Order Now
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="closed"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full bg-neutral-900 border-b border-red-500/30 text-white py-2.5 px-4 z-50 fixed top-0 left-0 right-0 shadow-md flex items-center justify-center sm:justify-between flex-wrap gap-2 text-center sm:text-left"
        >
          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-4">
            <div className="flex items-center gap-1.5 font-black uppercase tracking-wider text-xs sm:text-sm text-red-400">
              <Lock className="w-4 h-4" />
              <span>Orders Are Closed For Today</span>
            </div>
            <span className="hidden sm:inline opacity-60 text-xs font-bold">|</span>
            <div className="text-[10px] sm:text-xs font-bold text-neutral-400">
              Meal preparation is currently in progress. Pickup begins at {user.userType === 'student' ? '12:30 PM' : '1:00 PM'}.
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <button 
              onClick={() => navigate('/tracking')}
              className="bg-neutral-800 border border-neutral-700 text-white px-3 py-1 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-wider hover:bg-neutral-700 transition-colors"
            >
              Track Meal Status
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
