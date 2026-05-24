import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESTAURANTS, CATEGORIES, Restaurant } from '@/mock/mockData';
import { Search, Star, Clock, Heart, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const Restaurants: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter restaurants based on category tabs and search queries
  const filteredRestaurants = RESTAURANTS.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         res.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') {
      return matchesSearch;
    }
    
    // Normalize string match for categories
    const categoryMapping: { [key: string]: string } = {
      'wraps': 'Wraps & Shawarma',
      'burgers': 'Juicy Burgers',
      'grill': 'Omani Grill',
      'study-fuel': 'Study Fuel & Karak',
      'vegan': 'Vegan & Healthy',
      'sweet': 'Sweets & Desserts'
    };

    const targetCategory = categoryMapping[selectedCategory];
    return matchesSearch && res.category === targetCategory;
  });

  return (
    <div className="relative min-h-screen bg-background pt-8 pb-24 md:pb-16 text-left">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] ambient-glow-orange opacity-25 z-0" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] ambient-glow-amber opacity-15 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Header Section */}
        <div className="space-y-2">
          <span className="text-[10px] sm:text-xs text-amber-500 font-bold uppercase tracking-[0.2em]">Oman Campus Delivery</span>
          <h2 className="text-3xl sm:text-4xl font-black text-main tracking-tight">
            Explore Campus <span className="text-gradient-sunset">Cafes & Grills</span>
          </h2>
          <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-xl">
            Sourced from top student hubs near SQU, GUtech, and UTAS. Fast delivery directly to your classrooms, lecture halls, or dorm lobbies.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md relative">
          <input
            type="text"
            placeholder="Search shawarma, karak, burgers..."
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

        {/* Dynamic Restaurants Grid */}
        {filteredRestaurants.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <span className="text-5xl slow-float">🔍</span>
            <h4 className="font-extrabold text-main text-base">No cafeterias found</h4>
            <p className="text-xs text-muted max-w-sm mx-auto">
              We couldn't find any cafe matching '{searchQuery}' in this category. Try checking your spelling or search terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((res, index) => (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => navigate(`/restaurant/${res.id}`)}
                className="group rounded-3xl glass-card-dark overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                
                {/* Banner Wrapper */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={res.image}
                    alt={res.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/60 backdrop-blur-sm border border-subtle text-amber-400 text-xs font-black px-2.5 py-1 rounded-xl shadow-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {res.rating}
                  </div>

                  {/* Category Pill Tag */}
                  <span className="absolute bottom-4 left-4 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-surface border border-subtle text-main/80">
                    {res.category}
                  </span>
                </div>

                {/* Content info */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-lg font-black text-main group-hover:text-amber-500 transition-colors leading-none">
                        {res.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[9px] font-black text-muted bg-surface border border-subtle px-2 py-0.5 rounded-lg">
                        <Clock className="w-2.5 h-2.5 text-amber-500" />
                        {res.deliveryTime}
                      </div>
                    </div>

                    <p className="text-xs text-muted leading-relaxed font-medium">
                      Minimum order: OMR {res.minOrder.toFixed(3)} • Delivery: OMR {res.deliveryFee.toFixed(3)}
                    </p>
                  </div>

                  {/* Student Promotion details */}
                  <div className="p-3 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs flex items-center gap-2">
                    <span className="text-lg">🎓</span>
                    <p className="text-main font-bold leading-snug">
                      {res.studentDeal}
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
