import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FOOD_ITEMS, FoodItem } from '@/mock/mockData';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Star, Clock, Heart, ShoppingBag, Info, ShieldCheck } from 'lucide-react';
import { CutoffTimer } from '@/components/ui/CutoffTimer';
import { PickupStationCard } from '@/components/ui/PickupStationCard';
import { motion } from 'framer-motion';

export const MealDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, favorites, addToCart, isSystemOpen } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());

  // Find the meal details
  const meal = FOOD_ITEMS.find(m => m.id === id);

  if (!meal) {
    return (
      <div className="py-24 text-center space-y-4">
        <span className="text-5xl">⚠️</span>
        <h4 className="font-extrabold text-main text-lg">Meal not found</h4>
        <button
          onClick={() => navigate('/restaurants')}
          className="px-6 py-2.5 bg-gradient-sunset text-white rounded-xl text-xs font-black uppercase tracking-wider"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const isFav = favorites.includes(meal.id);
  
  // Calculate pricing
  const addonsTotal = meal.addons?.reduce((sum, addon) => {
    return selectedAddons.has(addon.name) ? sum + addon.price : sum;
  }, 0) || 0;
  
  const totalPrice = (meal.price + addonsTotal) * quantity;

  const handleToggleAddon = (addonName: string) => {
    const newSet = new Set(selectedAddons);
    if (newSet.has(addonName)) {
      newSet.delete(addonName);
    } else {
      newSet.add(addonName);
    }
    setSelectedAddons(newSet);
  };

  const handleAddToCart = () => {
    const addonDetails = meal.addons?.filter(a => selectedAddons.has(a.name)) || [];
    addToCart(meal, quantity, addonDetails, '');
    navigate(-1);
  };

  return (
    <div className="relative min-h-screen bg-background pb-24 md:pb-16 text-left">
      {/* Background ambient glow shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] ambient-glow-orange opacity-20 z-0" />

      {/* Large Banner Header */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden z-10">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/30 to-black/40" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 p-3 rounded-full bg-black/60 backdrop-blur-sm border border-subtle text-white hover:bg-black/80 transition-colors z-20 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Main Meal Info Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-16 space-y-8">
        
        {/* Profile Card Header */}
        <div className="p-6 rounded-3xl glass-panel shadow-2xl border border-subtle flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-[0.2em] mb-1 block">
                  {meal.kitchenName}
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-2">
                  <h1 className="text-3xl font-black text-main leading-none">{meal.name}</h1>
                  <CutoffTimer cutoffTimeStr={meal.orderCutoff} size="sm" />
                </div>
              </div>
              <button
                onClick={() => toggleFavorite(meal.id)}
                className="p-2.5 rounded-full bg-surface border border-subtle hover:bg-surface-elevated transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-muted'}`} />
              </button>
            </div>
            
            <p className="text-sm text-muted max-w-md leading-relaxed">
              {meal.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-main/80 pt-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                🔥 {meal.calories} kcal
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                💪 {meal.protein}g Protein
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                {meal.rating}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-8 space-y-6">
            {/* Customization Options */}
            {meal.addons && meal.addons.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-extrabold text-lg text-main">Add-ons</h3>
                <div className="space-y-3">
                  {meal.addons.map((addon, idx) => (
                    <label key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-surface border border-subtle cursor-pointer hover:border-amber-500/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedAddons.has(addon.name)}
                          onChange={() => handleToggleAddon(addon.name)}
                          className="w-5 h-5 rounded border-subtle bg-surface-elevated text-amber-500 focus:ring-amber-500 focus:ring-offset-background"
                        />
                        <span className="text-sm font-bold text-main">{addon.name}</span>
                      </div>
                      <span className="text-sm font-black text-amber-500">
                        +OMR {addon.price.toFixed(3)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-4 space-y-6">
            {/* Status Card */}
            <div className="p-5 rounded-3xl bg-surface border border-subtle space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted font-bold">Pickup Window</span>
                  <span className="font-black text-main">{meal.pickupWindow}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted font-bold">Order Cutoff</span>
                  <span className="font-black text-red-400">{meal.orderCutoff}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted font-bold">Availability</span>
                  <span className="font-black text-emerald-500">Only {meal.remainingQuantity} Left</span>
                </div>
              </div>

              <hr className="border-subtle" />

              <div className="flex items-center justify-between bg-surface-elevated rounded-2xl p-2 border border-subtle">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-main font-black rounded-xl hover:bg-surface transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-black text-main w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(meal.remainingQuantity, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center text-main font-black rounded-xl hover:bg-surface transition-colors"
                >
                  +
                </button>
              </div>

              <button
                disabled={!isSystemOpen}
                onClick={handleAddToCart}
                className={`w-full py-4 font-black rounded-2xl text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  isSystemOpen 
                    ? 'bg-gradient-sunset text-white shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]' 
                    : 'bg-surface-elevated text-muted border border-subtle cursor-not-allowed opacity-80'
                }`}
              >
                {isSystemOpen ? (
                  <>
                    <span>Add to Bag</span>
                    <span>•</span>
                    <span>OMR {totalPrice.toFixed(3)}</span>
                  </>
                ) : (
                  <span>Orders Closed</span>
                )}
              </button>
              
              <div className="flex justify-center items-center gap-1.5 text-[10px] text-muted font-semibold pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Guaranteed freshness & hygiene
              </div>
            </div>
            <PickupStationCard 
              campusName="MAIN"
              stationName="Campus Pre-Order Kiosk"
              pickupWindow={meal.pickupWindow}
              className="mt-4"
            />
          </div>

        </div>

      </div>
    </div>
  );
};
