import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { FOOD_ITEMS, FoodItem } from '@/mock/mockData';
import { Star, Clock, Heart, ShoppingBag } from 'lucide-react';
import { FoodModal } from '@/components/modals/FoodModal';
import { useNavigate } from 'react-router-dom';

export const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useApp();
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  const favoriteDishes = FOOD_ITEMS.filter(f => favorites.includes(f.id));

  return (
    <div className="relative min-h-screen bg-background pt-8 pb-24 md:pb-16 text-left">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] ambient-glow-orange opacity-25 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Header */}
        <div className="space-y-1">
          <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-[0.2em]">Your library</span>
          <h2 className="text-3xl sm:text-4xl font-black text-main tracking-tight">
            Your Favorite <span className="text-gradient-sunset">Study Fuels</span>
          </h2>
          <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-xl">
            Quick access to your regular orders. Keep the Karak hot and the wraps ready!
          </p>
        </div>

        {/* Favorite items list */}
        {favoriteDishes.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <span className="text-5xl slow-float block">❤️</span>
            <h4 className="font-extrabold text-main text-base">Your library is empty</h4>
            <p className="text-xs text-muted max-w-xs mx-auto">
              Add products from campus cafes to your favorites list for instant ordering later!
            </p>
            <button
              onClick={() => navigate('/restaurants')}
              className="px-5 py-2.5 bg-gradient-sunset text-white font-black rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              Explore Cafes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteDishes.map((item) => {
              const isFav = favorites.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group rounded-3xl glass-card overflow-hidden cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black/80 border border-subtle text-red-500 transition-all backdrop-blur-sm shadow-md"
                    >
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    </button>
                  </div>

                  <div className="p-4 space-y-3 text-left flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-extrabold text-sm text-main group-hover:text-amber-500 transition-colors truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-0.5 text-xs text-amber-400 font-bold flex-shrink-0">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {item.rating}
                        </div>
                      </div>
                      
                      <p className="text-[10px] text-muted font-semibold">
                        {item.restaurantName}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2.5 border-t border-subtle">
                      <span className="text-sm font-black text-amber-500">
                        OMR {item.price.toFixed(3)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(item);
                        }}
                        className="px-3 py-1.5 bg-surface border border-subtle text-main/80 hover:text-main rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Customize
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      <FoodModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
export default Favorites;
