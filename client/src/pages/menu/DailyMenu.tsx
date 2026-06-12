import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FOOD_ITEMS, CATEGORIES, FoodItem } from '@/mock/mockData';
import { Search, Star, Clock, Heart, ArrowRight } from 'lucide-react';
import { CutoffTimer } from '@/components/ui/CutoffTimer';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';

export const DailyMenu: React.FC = () => {
  const navigate = useNavigate();
  const { isSystemOpen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter items based on category tabs and search queries
  const filteredItems = FOOD_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') {
      return matchesSearch;
    }
    
    return matchesSearch && item.category === selectedCategory;
  });

  return (
    <div className="relative min-h-screen bg-background pt-8 pb-24 md:pb-16 text-left">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] ambient-glow-orange opacity-25 z-0" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] ambient-glow-amber opacity-15 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Header Section */}
        <div className="space-y-2">
          <span className="text-[10px] sm:text-xs text-amber-500 font-bold uppercase tracking-[0.2em]">Oman Campus Pre-Order</span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-main tracking-tight">
                Today's <span className="text-gradient-sunset">Campus Menu</span>
              </h2>
            </div>
            <CutoffTimer cutoffTimeStr="11:00 AM" size="lg" />
          </div>
          <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-xl">
            Pre-order your meals before 11:00 AM to secure your portion. Collect efficiently during lunch hours from your chosen campus station.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md relative">
          <input
            type="text"
            placeholder="Search biryani, combos, wraps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-4 pl-12 rounded-2xl text-sm bg-surface border border-subtle text-main placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-all shadow-md"
          />
          <Search className="w-5 h-5 text-muted absolute left-4 top-4.5" />
        </div>

        {/* Categories Tab selectors */}
        <div className="flex overflow-x-auto gap-3 pb-3 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all whitespace-nowrap border ${
                selectedCategory === cat.id
                  ? 'bg-gradient-sunset border-amber-500 text-white shadow-lg shadow-orange-500/10'
                  : 'bg-surface border-subtle text-muted hover:text-main hover:border-subtle'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Meals Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <span className="text-5xl slow-float">🔍</span>
            <h4 className="font-extrabold text-main text-base">No meals found</h4>
            <p className="text-xs text-muted max-w-sm mx-auto">
              We couldn't find any meal matching '{searchQuery}' in this category. Try checking your spelling or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => navigate(`/meal/${item.id}`)}
                className="group rounded-3xl glass-card-dark overflow-hidden cursor-pointer flex flex-col justify-between border border-transparent hover:border-amber-500/30 transition-colors"
              >
                
                {/* Banner Wrapper */}
                <div className="relative h-48 overflow-hidden bg-surface">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/60 backdrop-blur-sm border border-subtle text-amber-400 text-xs font-black px-2.5 py-1 rounded-xl shadow-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {item.rating}
                  </div>

                  {/* Pre-order cutoff Pill */}
                  <span className="absolute bottom-4 left-4 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-red-500/80 backdrop-blur-sm border border-red-500/20 text-white flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-white" />
                    Order before {item.orderCutoff}
                  </span>
                </div>

                {/* Content info */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-lg font-black text-main group-hover:text-amber-500 transition-colors leading-none">
                        {item.name}
                      </h3>
                      <span className="text-sm font-black text-amber-500 shrink-0">
                        OMR {item.price.toFixed(3)}
                      </span>
                    </div>

                    <p className="text-xs text-muted leading-relaxed font-medium line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-subtle">
                    <div className="flex justify-between items-center text-[10px] text-muted font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        🔥 {item.calories} kcal • {item.protein}g protein
                      </span>
                      <span className="text-emerald-500 font-black">
                        Only {item.remainingQuantity} Left
                      </span>
                    </div>
                  </div>

                  <button 
                    disabled={!isSystemOpen}
                    className={`w-full mt-2 py-3 border font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm ${
                      isSystemOpen 
                        ? 'bg-surface hover:bg-surface-elevated border-subtle hover:border-amber-500 text-main group-hover:bg-gradient-sunset group-hover:text-white group-hover:border-transparent' 
                        : 'bg-surface-elevated text-muted border-subtle cursor-not-allowed opacity-80'
                    }`}
                  >
                    {isSystemOpen ? 'Pre-Order Meal' : 'Orders Closed'}
                    {isSystemOpen && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
