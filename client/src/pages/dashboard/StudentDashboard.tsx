import React from 'react';
import { useApp } from '@/context/AppContext';
import { FOOD_ITEMS } from '@/mock/mockData';
import { Flame, Wallet, Gift, Heart, Clock, Award, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, favorites, pastOrders, addNotification } = useApp();

  const favoriteDishes = FOOD_ITEMS.filter(f => favorites.includes(f.id));

  const handleTopup = () => {
    setUser(prev => ({
      ...prev,
      balance: parseFloat((prev.balance + 5.000).toFixed(3))
    }));
    addNotification("Wallet loaded! OMR 5.000 topped up securely via Thawani. 💳");
  };

  const handleRedeemPoints = () => {
    if (user.points < 200) {
      alert("You need at least 200 fuel points to redeem a reward!");
      return;
    }
    setUser(prev => ({
      ...prev,
      points: prev.points - 200
    }));
    addNotification("Redeemed! Free Karak Cup voucher added to your active promo lists! ☕🎁");
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Dynamic profile header */}
      <div className="flex flex-col sm:flex-row items-center gap-5 p-6 rounded-3xl glass-panel border border-subtle">
        <img
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150"
          alt="Mazen"
          className="w-20 h-20 rounded-2xl object-cover ring-4 ring-amber-500/20"
        />
        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-2xl font-black text-main leading-none">{user.name}</h2>
            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-gradient-sunset text-white">
              {user.level} Student
            </span>
          </div>
          <p className="text-xs text-muted font-medium">
            Academic profile: <strong>{user.university}</strong> • {user.email}
          </p>
          <p className="text-xs text-muted">
            Selected building: <strong>{user.building}</strong>
          </p>
        </div>
      </div>

      {/* Grid of Student Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Wallet Balance */}
        <div className="p-6 rounded-3xl bg-surface border border-subtle flex flex-col justify-between items-start min-h-[160px]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-xs font-black uppercase text-muted tracking-wider">Omani Pocket Balance</span>
          </div>

          <div className="my-2.5">
            <span className="text-3xl font-black text-main">OMR {user.balance.toFixed(3)}</span>
            <p className="text-[10px] text-muted mt-1">Simulated local Thawani balance gateway</p>
          </div>

          <button
            onClick={handleTopup}
            className="w-full py-2.5 bg-surface border border-subtle hover:border-amber-500/30 text-amber-500 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-center"
          >
            Quick Top-Up (OMR 5)
          </button>
        </div>

        {/* Card 2: Streak Level */}
        <div className="p-6 rounded-3xl bg-gradient-sunset text-white flex flex-col justify-between items-start min-h-[160px] shadow-[0_6px_20px_rgba(255,92,0,0.2)]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-main/20">
              <Flame className="w-5 h-5 fill-white" />
            </div>
            <span className="text-xs font-black uppercase text-main/80 tracking-wider">Active Streak</span>
          </div>

          <div className="my-2">
            <span className="text-4xl font-black text-main leading-none">{user.streak} Days</span>
            <p className="text-[10px] text-main/80 mt-1">Level: {user.level} Tier Student Benefits</p>
          </div>

          <div className="w-full bg-main/20 h-1.5 rounded-full overflow-hidden">
            <div className="bg-white h-full" style={{ width: '75%' }} />
          </div>
        </div>

        {/* Card 3: Fuel Points */}
        <div className="p-6 rounded-3xl bg-surface border border-subtle flex flex-col justify-between items-start min-h-[160px]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Gift className="w-5 h-5" />
            </div>
            <span className="text-xs font-black uppercase text-muted tracking-wider">Fuel Reward Points</span>
          </div>

          <div className="my-2.5">
            <span className="text-3xl font-black text-main">{user.points} pts</span>
            <p className="text-[10px] text-muted mt-1">Redeem 200 pts for free hot Karak Tea!</p>
          </div>

          <button
            onClick={handleRedeemPoints}
            disabled={user.points < 200}
            className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all text-center border ${
              user.points >= 200
                ? 'bg-surface border-subtle hover:border-emerald-500/30 text-emerald-500'
                : 'bg-surface border-subtle text-neutral-600 cursor-not-allowed'
            }`}
          >
            Redeem Voucher (200 pts)
          </button>
        </div>

      </div>

      {/* Split layout: Favorites and Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Favorites list (col 5) */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-[2rem] bg-surface border border-subtle space-y-4">
          <h3 className="font-extrabold text-sm text-main uppercase tracking-wider flex items-center gap-2">
            <Heart className="w-4.5 h-4.5 text-red-500 fill-red-500" />
            Your Favorites ({favoriteDishes.length})
          </h3>

          {favoriteDishes.length === 0 ? (
            <p className="text-xs text-muted py-6 text-center">Your favorites list is empty.</p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto no-scrollbar">
              {favoriteDishes.map(dish => (
                <div
                  key={dish.id}
                  onClick={() => navigate(`/restaurant/${dish.restaurantId}`)}
                  className="p-3 rounded-2xl bg-surface border border-subtle hover:border-subtle transition-all flex items-center gap-3 cursor-pointer"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0 text-left leading-none">
                    <h4 className="font-extrabold text-xs text-main truncate">{dish.name}</h4>
                    <span className="text-[9px] text-amber-500 font-bold mt-1 inline-block">
                      {dish.restaurantName}
                    </span>
                  </div>
                  <span className="text-xs font-black text-main whitespace-nowrap">
                    OMR {dish.price.toFixed(3)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order History checklist (col 7) */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-[2rem] bg-surface border border-subtle space-y-4">
          <h3 className="font-extrabold text-sm text-main uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4.5 h-4.5 text-amber-500" />
            Past Order Log ({pastOrders.length})
          </h3>

          {pastOrders.length === 0 ? (
            <p className="text-xs text-muted py-8 text-center">No orders completed yet.</p>
          ) : (
            <div className="space-y-4.5 max-h-80 overflow-y-auto no-scrollbar">
              {pastOrders.map(order => (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl bg-surface border border-subtle space-y-3"
                >
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-extrabold text-main">Order #{order.id}</span>
                      <span className="text-[10px] text-muted block mt-0.5">Time: {order.timestamp}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg font-black text-[9px] uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Delivered
                    </span>
                  </div>

                  <div className="text-xs text-muted space-y-1 pl-1 text-left leading-normal border-l border-subtle">
                    {order.items.map(item => (
                      <div key={item.cartId}>
                        • {item.quantity}x {item.name} ({item.restaurantName})
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-subtle text-xs">
                    <span className="text-[10px] text-muted">Payment: {order.paymentMethod}</span>
                    <span className="font-black text-amber-500">OMR {order.total.toFixed(3)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
