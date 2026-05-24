import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RESTAURANTS, FOOD_ITEMS, FoodItem } from '@/mock/mockData';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Star, Clock, Heart, ShoppingBag, ShieldAlert } from 'lucide-react';
import { FoodModal } from '@/components/modals/FoodModal';
import { motion } from 'framer-motion';

export const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, favorites } = useApp();

  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  // Find the restaurant details
  const restaurant = RESTAURANTS.find(r => r.id === id);

  if (!restaurant) {
    return (
      <div className="py-24 text-center space-y-4">
        <span className="text-5xl">⚠️</span>
        <h4 className="font-extrabold text-main text-lg">Café not found</h4>
        <button
          onClick={() => navigate('/restaurants')}
          className="px-6 py-2.5 bg-gradient-sunset text-white rounded-xl text-xs font-black uppercase tracking-wider"
        >
          Back to list
        </button>
      </div>
    );
  }

  // Find items belonging to this restaurant
  const restaurantItems = FOOD_ITEMS.filter(item => item.restaurantId === restaurant.id);

  // Filter items by category tabs inside menu
  const menuCategories = [
    { id: 'all', name: 'All Menu' },
    { id: 'popular', name: 'Student Favorites' },
    { id: 'fuel', name: 'Study Fuel' }
  ];

  const filteredItems = restaurantItems.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'popular') return item.badge?.toLowerCase().includes('fav') || item.rating >= 4.8;
    if (activeTab === 'fuel') return item.category === 'study-fuel';
    return true;
  });

  return (
    <div className="relative min-h-screen bg-background pb-24 md:pb-16 text-left">
      {/* Background ambient glow shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] ambient-glow-orange opacity-20 z-0" />

      {/* Large Banner Header */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden z-10">
        <img
          src={restaurant.bannerImage}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/30 to-black/40" />

        {/* Back Button */}
        <button
          onClick={() => navigate('/restaurants')}
          className="absolute top-6 left-6 p-3 rounded-full bg-black/60 backdrop-blur-sm border border-subtle text-white hover:bg-black/80 transition-colors z-20 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Main Restaurant Info Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-16 space-y-8">
        
        {/* Profile Card Header */}
        <div className="p-6 rounded-3xl glass-panel shadow-2xl border border-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-[0.2em]">
              {restaurant.category}
            </span>
            <h1 className="text-3xl font-black text-main leading-none">{restaurant.name}</h1>
            <p className="text-xs text-muted max-w-md">
              Middle Eastern recipes customized for busy college schedules. Deliveries directly to dorm study lounges and lecture blocks.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-main/80">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                {restaurant.rating} Rating
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-amber-500" />
                {restaurant.deliveryTime}
              </span>
              <span>•</span>
              <span>Min order: OMR {restaurant.minOrder.toFixed(3)}</span>
            </div>
          </div>

          {/* Featured Student Deal highlight box */}
          <div className="p-4 rounded-2xl bg-gradient-sunset/15 border border-amber-500/35 max-w-sm text-left shadow-lg">
            <span className="text-[9px] font-black uppercase tracking-wider bg-gradient-sunset text-white px-2 py-0.5 rounded-md shadow-sm mb-1.5 inline-block">
              Active Deal
            </span>
            <p className="text-xs font-black text-main leading-relaxed">
              {restaurant.studentDeal}
            </p>
          </div>
        </div>

        {/* Tab Navigation for Menu Category tabs */}
        <div className="border-b border-subtle flex gap-4 pb-0.5">
          {menuCategories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 font-black text-sm uppercase tracking-wider relative transition-all ${
                activeTab === tab.id
                  ? 'text-amber-500'
                  : 'text-muted hover:text-main'
              }`}
            >
              {tab.name}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-sunset" />
              )}
            </button>
          ))}
        </div>

        {/* Grid layout of food dishes in menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            const isFav = favorites.includes(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                onClick={() => setSelectedItem(item)}
                className="group rounded-3xl glass-card-dark overflow-hidden cursor-pointer flex gap-4 p-3.5 items-center transition-all"
              >
                
                {/* Visual Thumbnail */}
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-subtle">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Hearts bookmark button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-black/60 hover:bg-black/80 border border-subtle text-white/80 hover:text-red-500 transition-all backdrop-blur-sm shadow-sm"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                {/* Information content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between text-left h-full py-1">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-extrabold text-sm text-main group-hover:text-amber-500 transition-colors truncate">
                        {item.name}
                      </h4>
                      {item.badge && (
                        <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 whitespace-nowrap">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-muted line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2.5 mt-1 border-t border-subtle">
                    <span className="text-sm font-black text-amber-500">
                      OMR {item.price.toFixed(3)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                      }}
                      className="p-1.5 bg-surface border border-subtle text-main/80 hover:text-main hover:border-amber-500/30 rounded-xl transition-all"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Render the details/customization pop-up */}
      <FoodModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
