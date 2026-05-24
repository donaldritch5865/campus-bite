import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { CAMPUSES } from '@/mock/mockData';
import { ArrowLeft, Star, Clock, MapPin, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import logoUrl from '@/assets/branding/logo.png';
export const Tracking: React.FC = () => {
  const navigate = useNavigate();
  const { activeOrder, pastOrders, cancelOrder } = useApp();

  const currentOrder = activeOrder || (pastOrders.length > 0 ? pastOrders[0] : null);

  if (!currentOrder) {
    return (
      <div className="py-24 text-center space-y-4 text-left max-w-md mx-auto px-4">
        <span className="text-5xl">🛵</span>
        <h4 className="font-extrabold text-main text-lg">No active deliveries</h4>
        <p className="text-xs text-muted">You don't have any meals on the road right now. Fill your bag and place an order to track it live!</p>
        <button
          onClick={() => navigate('/restaurants')}
          className="w-full py-3.5 bg-gradient-sunset text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-md"
        >
          Browse Menus
        </button>
      </div>
    );
  }

  // Checkpoints status mapping based on currentOrder.status
  const checkpoints = [
    {
      id: 'confirmed',
      title: 'Order Confirmed',
      time: currentOrder.timestamp,
      isActive: ['confirmed', 'preparing', 'delivering', 'arrived'].includes(currentOrder.status),
      desc: 'Café accepted and approved your meal'
    },
    {
      id: 'preparing',
      title: 'Being Prepared',
      time: currentOrder.status === 'confirmed' ? '--:--' : '2:18 PM',
      isActive: ['preparing', 'delivering', 'arrived'].includes(currentOrder.status),
      desc: 'Chef is baking fresh wraps and brewing Karak'
    },
    {
      id: 'delivering',
      title: 'Out for Delivery',
      time: ['confirmed', 'preparing'].includes(currentOrder.status) ? '--:--' : '2:24 PM',
      isActive: ['delivering', 'arrived'].includes(currentOrder.status),
      desc: 'Rider Ahmed is driving to SQU gates'
    },
    {
      id: 'arrived',
      title: `Arrived at ${currentOrder.building}`,
      time: currentOrder.status === 'arrived' ? 'Arrived' : '~2:32 PM',
      isActive: currentOrder.status === 'arrived',
      desc: 'Meet rider at drop spot library lounge'
    }
  ];

  // Map progress values
  const getScooterMotion = () => {
    switch (currentOrder.status) {
      case 'confirmed':
        return { x: -160, y: 90 };
      case 'preparing':
        return { x: -90, y: 50 };
      case 'delivering':
        return { x: 30, y: -20 };
      case 'arrived':
        return { x: 170, y: -90 };
      default:
        return { x: -160, y: 90 };
    }
  };

  const scooterCoords = getScooterMotion();
  const campusObj = CAMPUSES.find(c => c.id === currentOrder.campusId) || CAMPUSES[0];

  return (
    <div className="relative min-h-screen bg-background pt-8 pb-24 md:pb-16 text-left">
      <div className="absolute top-0 right-0 w-[450px] h-[450px] ambient-glow-orange opacity-20 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Header back */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 rounded-xl bg-surface border border-subtle text-muted hover:text-main"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="space-y-0.5">
            <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-wider">Live tracking console</span>
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="Campus Bite Logo" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(255,92,0,0.5)]" />
              <h2 className="text-2xl sm:text-3xl font-black text-main leading-none">Track Your Campus Bite</h2>
            </div>
          </div>
        </div>

        {/* Dashboard Grid mapping Screenshot 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel Checkpoints list */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-[2.5rem] bg-surface border border-subtle flex flex-col justify-between space-y-8">
            
            <div className="space-y-2">
              <span className="text-[10px] text-amber-500 font-bold uppercase tracking-[0.2em]">Delivery Progress</span>
              <h3 className="text-2xl font-black text-main tracking-tight">Active Checkpoints</h3>
              <p className="text-xs text-muted leading-relaxed">
                Ahmed is driving safely across standard speed limits to ensure hot and fresh delivery drops.
              </p>
            </div>

            {/* Checkpoint vertical tree */}
            <div className="space-y-6 flex-1 pt-4">
              {checkpoints.map((cp, idx) => (
                <div key={cp.id} className="flex gap-4 relative">
                  
                  {/* LineConnector (don't draw on last) */}
                  {idx < checkpoints.length - 1 && (
                    <div className={`absolute left-3.5 top-7 bottom-[-24px] w-0.5 z-0 ${
                      cp.isActive && checkpoints[idx + 1].isActive ? 'bg-amber-500' : 'bg-surface-elevated'
                    }`} />
                  )}

                  {/* Circle Marker */}
                  <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center font-black text-xs z-10 ${
                    cp.isActive ? 'bg-gradient-sunset text-white shadow-lg shadow-orange-500/20' : 'bg-surface border border-subtle text-muted'
                  }`}>
                    {cp.isActive ? '✓' : idx + 1}
                  </div>

                  {/* Checkpoint text details */}
                  <div className="flex-1 text-left">
                    <div className="flex justify-between items-center text-xs">
                      <h4 className={`font-extrabold text-sm ${cp.isActive ? 'text-main' : 'text-muted'}`}>
                        {cp.title}
                      </h4>
                      <span className={`text-[10px] font-bold ${cp.isActive ? 'text-amber-500' : 'text-neutral-600'}`}>
                        {cp.time}
                      </span>
                    </div>
                    <p className={`text-[11px] mt-0.5 leading-relaxed ${cp.isActive ? 'text-muted' : 'text-neutral-600'}`}>
                      {cp.desc}
                    </p>
                  </div>

                </div>
              ))}
            </div>

            {/* Simulated actions if order not finished */}
            {activeOrder && (
              <div className="pt-4 border-t border-subtle flex gap-3">
                <button
                  onClick={cancelOrder}
                  className="flex-1 py-3 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 font-extrabold text-xs rounded-xl uppercase tracking-wider transition-all"
                >
                  Cancel Order
                </button>
                <button
                  onClick={() => alert(" Ahmed Al-Riyami is currently driving on university bypass roads. Direct phone calling: +968 9123 4567")}
                  className="flex-1 py-3 bg-surface hover:bg-surface-elevated text-main/80 font-extrabold text-xs rounded-xl border border-subtle uppercase tracking-wider transition-all"
                >
                  Call Rider
                </button>
              </div>
            )}

          </div>

          {/* Right panel interactive digital campus map */}
          <div className="lg:col-span-7 bg-surface rounded-[2.5rem] border border-subtle h-[460px] relative overflow-hidden shadow-2xl flex items-center justify-center p-6 sm:p-8">
            
            {/* SVG Digital Grid map background */}
            <svg className="absolute inset-0 w-full h-full text-main/5" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-tracking" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-tracking)" />
            </svg>

            {/* Campus layout structures vectors */}
            <svg className="absolute inset-0 w-full h-full text-main/5" viewBox="0 0 600 400" fill="none" stroke="currentColor">
              {/* College buildings vectors mock outline */}
              <rect x="50" y="80" width="80" height="50" rx="6" />
              <rect x="50" y="270" width="100" height="60" rx="6" />
              <rect x="420" y="50" width="120" height="70" rx="6" />
              <rect x="380" y="240" width="90" height="70" rx="6" />
              <circle cx="300" cy="200" r="40" />
            </svg>

            {/* Glowing route line connecting restaurant to user drop off */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M 100 300 C 180 280 250 220 300 200 S 420 180 500 100"
                fill="none"
                stroke="#FF7A00"
                strokeWidth="5"
                strokeLinecap="round"
                className="drop-shadow-[0_0_10px_rgba(255,122,0,0.8)]"
              />
            </svg>

            {/* Restaurant Badge Marker */}
            <div className="absolute left-[80px] bottom-[80px] flex flex-col items-center">
              <div className="w-3.5 h-3.5 bg-amber-500 rounded-full border border-black z-10" />
              <div className="mt-1.5 px-2.5 py-1 rounded-xl bg-surface border border-subtle text-[9px] font-black text-amber-500 whitespace-nowrap shadow-lg">
                Levant Grill
              </div>
            </div>

            {/* Scooter indicator moving */}
            <motion.div
              animate={{
                x: scooterCoords.x,
                y: scooterCoords.y
              }}
              transition={{ type: 'spring', stiffness: 50, damping: 15 }}
              className="absolute w-10 h-10 rounded-full bg-gradient-sunset text-white flex items-center justify-center text-lg shadow-[0_0_20px_rgba(255,92,0,0.7)] z-10 border border-subtle"
            >
              🛵
            </motion.div>

            {/* User Drop Indicator */}
            <div className="absolute right-[80px] top-[80px] flex flex-col items-center">
              <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full animate-ping absolute" />
              <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full border border-black z-10" />
              <div className="mt-1.5 px-2.5 py-1 rounded-xl bg-surface border border-subtle text-[9px] font-black text-main whitespace-nowrap shadow-lg">
                You ({currentOrder.building})
              </div>
            </div>

            {/* Floating Map HUD details matching screenshot 4 */}
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-3xl glass-panel-heavy border border-subtle flex justify-between items-center text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-main/5 flex items-center justify-center text-lg ring-1 ring-subtle overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
                    alt="Ahmed"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="font-extrabold text-sm text-main">Ahmed Al-Riyami</div>
                  <div className="text-[10px] text-muted flex items-center gap-0.5 mt-0.5">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500 animate-pulse" />
                    4.9 Rider Rating
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] text-amber-500 font-extrabold uppercase tracking-widest leading-none">Arriving In</div>
                <div className="text-lg font-black text-main mt-1">
                  {currentOrder.status === 'arrived' ? '0 min' : `${currentOrder.eta} min`}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
