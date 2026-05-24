import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { FOOD_ITEMS, STUDENT_DEALS, MOCK_REVIEWS, TRENDING_MEALS, FoodItem } from '@/mock/mockData';
import { Star, Clock, Heart, Flame, ArrowRight } from 'lucide-react';
import { FoodModal } from '@/components/modals/FoodModal';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { toggleFavorite, favorites } = useApp();
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  const popularItems = FOOD_ITEMS.slice(0, 5);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden pt-6 pb-20 md:pb-12 text-left">
      
      {/* Target Glow Background Matching Screenshot 1 */}
      <div className="absolute top-0 left-0 w-full h-[800px] ambient-hero-glow z-0" />
      <div className="absolute top-[30%] right-0 w-[550px] h-[550px] ambient-image-glow opacity-40 z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
        
        {/* ================= HERO SECTION ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-8 md:pt-14 pb-4">
          
          {/* Left Text details (Proportions matching Screenshot 1) */}
          <div className="space-y-6 text-left max-w-xl">
            
            {/* Live Campus Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-main/5 border border-subtle shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A00]"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-main/80">
                ✨ Live across 12 campuses in Oman
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black text-main leading-[1.05] tracking-tighter font-sans">
              Campus food, <br />
              <span className="text-[#FF5C00] underline-accent">delivered smarter.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-muted text-sm sm:text-base leading-relaxed font-medium">
              Affordable student meals from your favourite local cafés — delivered right to lecture halls, dorms and study spots across university campuses in Oman.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap gap-5 pt-3">
              <button
                onClick={() => navigate('/restaurants')}
                className="flex items-center gap-2.5 bg-gradient-to-r from-[#FF7A00] to-[#E64A19] hover:from-[#FF8C00] hover:to-[#FF5C00] text-white px-8 py-4 rounded-full font-black text-[13px] uppercase tracking-wider shadow-[0_10px_30px_rgba(255,92,0,0.4)] transition-transform active:scale-95"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
              </button>
              
              <button
                onClick={() => navigate('/restaurants')}
                className="px-7 py-4 rounded-full bg-main/5 border border-subtle text-main hover:bg-main/10 transition-all text-[13px] font-black uppercase tracking-wider shadow-sm"
              >
                Explore Restaurants
              </button>
            </div>

            {/* Platform Social Proof Stats row matching target */}
            <div className="flex items-center gap-6 pt-6 border-t border-subtle max-w-md">
              
              {/* Overlapping circular face tags */}
              <div className="flex -space-x-2.5 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-background object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="" />
                <div className="inline-block h-8 w-8 rounded-full bg-surface-elevated ring-2 ring-background flex items-center justify-center text-[9px] font-black text-[#FF7A00]">
                  12k+
                </div>
              </div>

              {/* Text description metrics details */}
              <div className="flex gap-6 text-[11px] font-bold text-main/80">
                <div className="text-left">
                  <div>12k+ students</div>
                  <div className="text-muted text-[9px] font-black uppercase tracking-wider mt-0.5">Active community</div>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-3.5 h-3.5 text-[#FF7A00] fill-[#FF7A00]" />
                    4.9 avg rating
                  </div>
                  <div className="text-muted text-[9px] font-black uppercase tracking-wider mt-0.5">Top Cafes</div>
                </div>
                <div className="text-left">
                  <div>~18 min avg</div>
                  <div className="text-muted text-[9px] font-black uppercase tracking-wider mt-0.5">Quick drops</div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Product Plates Image matching Screenshot 1 perfectly */}
          <div className="relative flex justify-center items-center lg:pl-6">
            
            {/* Visual background ambient glow behind card */}
            <div className="absolute w-[110%] h-[110%] rounded-full bg-[#FF5C00]/20 blur-[100px] z-0" />

            {/* Main Rounded Image plate frame */}
            <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-[2.5rem] overflow-hidden ring-1 ring-subtle shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] z-10 bg-surface">
              <img
                src="/hero-food.jpg"
                alt="Middle Eastern food spreads"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating Badge 1: Shawarma Trending (top-left) */}
            <div className="absolute top-[8%] -left-[12%] sm:-left-[15%] p-2 rounded-full glass-panel-heavy shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-subtle flex items-center gap-3 z-20 slow-float select-none pr-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-elevated shrink-0 ring-2 ring-background/50">
                <img src="/beef-shawarma.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="text-left min-w-0 leading-tight">
                <span className="text-[9px] font-extrabold uppercase text-muted tracking-wider">Trending now</span>
                <div className="text-[12px] font-black text-main truncate">Beef Shawarma</div>
                <div className="text-[10px] text-[#FF7A00] font-black mt-0.5">OMR 1.2 • 14 min</div>
              </div>
            </div>

            {/* Floating Badge 2: Late Night Karak (bottom-right) */}
            <div className="absolute bottom-[12%] -right-[8%] sm:-right-[10%] p-2 rounded-full glass-panel-heavy shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-subtle flex items-center gap-3 z-20 slow-float-delayed select-none pr-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-elevated shrink-0 ring-2 ring-background/50">
                <img src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=150" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="text-left min-w-0 leading-tight">
                <span className="text-[9px] font-extrabold uppercase text-muted tracking-wider">Late night fuel</span>
                <div className="text-[12px] font-black text-main truncate">Karak Tea</div>
                <div className="text-[10px] text-[#FF7A00] font-black mt-0.5">OMR 0.3 • 8 min</div>
              </div>
            </div>

            {/* Floating Badge 3: Small cheeseburger circle (top-right) */}
            <div className="absolute top-[4%] right-[4%] w-14 h-14 rounded-full glass-panel-heavy text-main flex items-center justify-center text-2xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-subtle z-20 pointer-events-none slow-float ring-1 ring-white/10">
              🍔
            </div>

          </div>

        </section>

        {/* ================= POPULAR ON CAMPUS ================= */}
        <section className="space-y-6 pt-4">
          <div className="flex justify-between items-end">
            <div className="text-left space-y-1">
              <span className="text-[9px] sm:text-[10px] text-amber-500 font-extrabold uppercase tracking-[0.2em] flex items-center gap-1">
                🔥 POPULAR ON CAMPUS
              </span>
              <h2 className="text-2xl sm:text-[1.75rem] font-extrabold text-main tracking-tight leading-none">
                What students are <span className="text-[#FF5C00]">devouring</span> right now
              </h2>
            </div>
            
            <button
              onClick={() => navigate('/restaurants')}
              className="text-[10px] font-black uppercase tracking-wider text-muted hover:text-main px-3 py-1.5 rounded-full bg-main/5 border border-subtle transition-all flex items-center gap-1 pb-1.5"
            >
              See All <ArrowRight className="w-3.5 h-3.5 text-muted" />
            </button>
          </div>

          {/* Grid Cards (spacing & border proportions matching Screenshot 2) */}
          <div className="flex overflow-x-auto gap-6 pb-6 pt-1.5 no-scrollbar scroll-smooth -mx-6 px-6 sm:mx-0 sm:px-0">
            {popularItems.map((item) => {
              const isFav = favorites.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="w-[250px] flex-shrink-0 group rounded-2xl glass-card-dark overflow-hidden cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  
                  {/* Card Image */}
                  <div className="relative h-40 overflow-hidden bg-surface">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Badge Pill tag */}
                    {item.badge && (
                      <span className="absolute top-3.5 left-3.5 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm border border-subtle text-white shadow-md">
                        {item.badge}
                      </span>
                    )}

                    {/* Bookmark Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/60 hover:bg-black/80 border border-subtle text-white/80 hover:text-red-500 transition-all backdrop-blur-sm shadow-md"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                  {/* Card Content details */}
                  <div className="p-4 space-y-2 text-left">
                    <div className="flex justify-between items-center gap-2">
                      <h4 className="font-extrabold text-sm text-main truncate leading-none">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-0.5 text-xs text-amber-500 font-bold flex-shrink-0 leading-none">
                        ★ {item.rating}
                      </div>
                    </div>
                    
                    <p className="text-[10px] text-muted font-semibold leading-none">
                      {item.restaurantName}
                    </p>

                    <div className="flex justify-between items-center pt-2.5 border-t border-subtle">
                      <span className="text-sm font-black text-[#FF5C00]">
                        OMR {item.price.toFixed(3)}
                      </span>
                      <div className="flex items-center gap-1 text-[9px] font-bold text-muted">
                        <Clock className="w-3 h-3 text-[#FF5C00]" />
                        {item.deliveryTime} min
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* ================= STUDENT DEALS ================= */}
        <section className="space-y-6">
          <div className="text-center space-y-1 pt-2">
            <span className="text-[9px] sm:text-[10px] text-amber-500 font-extrabold uppercase tracking-[0.2em]">
              STUDENT DEALS
            </span>
            <h2 className="text-2xl sm:text-[1.75rem] font-extrabold text-main tracking-tight leading-none">
              Deals that actually understand <span className="text-[#FF5C00]">student budgets</span>
            </h2>
          </div>

          {/* Grid Layout of Deals matching Screenshot 3 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Deal Box 1: Student Combos (Large - 1st row span 7) */}
            <div
              onClick={() => navigate('/restaurants')}
              className="md:col-span-7 p-6 sm:p-7.5 rounded-[2rem] bg-gradient-to-r from-[#FF7A00] to-[#FF5C00] text-main flex flex-col justify-between items-start min-h-[170px] shadow-[0_8px_30px_rgba(255,92,0,0.25)] hover:scale-[1.01] transition-transform cursor-pointer relative overflow-hidden group text-left"
            >
              <div className="absolute right-0 top-0 w-28 h-28 bg-main/5 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />
              <div className="w-9 h-9 rounded-xl bg-main/15 flex items-center justify-center text-lg">⚡</div>
              <div>
                <h4 className="text-xl font-black tracking-tight">{STUDENT_DEALS[0].title}</h4>
                <p className="text-xs text-main/95 font-bold mt-0.5">{STUDENT_DEALS[0].sub}</p>
              </div>
            </div>

            {/* Deal Box 2: Exam Week Deals (Medium - 1st row span 5) */}
            <div
              onClick={() => navigate('/restaurants')}
              className="md:col-span-5 p-6 sm:p-7.5 rounded-[2rem] bg-gradient-to-br from-[#E64A19] to-[#FF5C00] text-main flex flex-col justify-between items-start min-h-[170px] hover:scale-[1.01] transition-transform cursor-pointer text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-main/15 flex items-center justify-center text-lg">📖</div>
              <div>
                <h4 className="text-lg font-black tracking-tight">{STUDENT_DEALS[1].title}</h4>
                <p className="text-xs text-main/95 font-bold mt-0.5">{STUDENT_DEALS[1].sub}</p>
              </div>
            </div>

            {/* Deal Box 3: Late Night (2nd row span 4) */}
            <div
              onClick={() => navigate('/restaurants')}
              className="md:col-span-4 p-6 sm:p-7.5 rounded-[2rem] bg-gradient-to-br from-[#1A1A1E] to-[#121214] border border-subtle text-main flex flex-col justify-between items-start min-h-[160px] hover:scale-[1.01] transition-transform cursor-pointer text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-main/5 flex items-center justify-center text-lg">🌙</div>
              <div>
                <h4 className="text-lg font-black tracking-tight">{STUDENT_DEALS[2].title}</h4>
                <p className="text-xs text-muted font-bold mt-0.5">{STUDENT_DEALS[2].sub}</p>
              </div>
            </div>

            {/* Deal Box 4: Group Orders (2nd row span 4) */}
            <div
              onClick={() => navigate('/restaurants')}
              className="md:col-span-4 p-6 sm:p-7.5 rounded-[2rem] bg-gradient-to-br from-[#FF7A00] to-[#E64A19] text-main flex flex-col justify-between items-start min-h-[160px] hover:scale-[1.01] transition-transform cursor-pointer text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-main/15 flex items-center justify-center text-lg">👥</div>
              <div>
                <h4 className="text-lg font-black tracking-tight">{STUDENT_DEALS[3].title}</h4>
                <p className="text-xs text-main/95 font-bold mt-0.5">{STUDENT_DEALS[3].sub}</p>
              </div>
            </div>

            {/* Deal Box 5: Budget Meals (2nd row span 4) */}
            <div
              onClick={() => navigate('/restaurants')}
              className="md:col-span-4 p-6 sm:p-7.5 rounded-[2rem] bg-gradient-to-br from-[#FF7A00] to-[#FF8C00] text-main flex flex-col justify-between items-start min-h-[160px] hover:scale-[1.01] transition-transform cursor-pointer text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-main/15 flex items-center justify-center text-lg">🪙</div>
              <div className="space-y-1">
                <h4 className="text-lg font-black tracking-tight">{STUDENT_DEALS[4].title}</h4>
                <p className="text-xs text-main/90 font-bold">{STUDENT_DEALS[4].sub}</p>
                <div className="text-[10px] text-main font-black group-hover:translate-x-1 transition-transform flex items-center gap-0.5 pt-1.5 leading-none">
                  Claim deal <ArrowRight className="w-3 h-3 text-main" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= MOCK LIVE TRACKING PREVIEW ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface border border-subtle rounded-[2.5rem] p-6 sm:p-8 lg:p-12 text-left relative overflow-hidden">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[9px] sm:text-[10px] text-amber-500 font-extrabold uppercase tracking-[0.2em]">LIVE TRACKING</span>
            <h2 className="text-2xl sm:text-[1.75rem] font-extrabold text-main tracking-tight leading-none">
              Watch your meal <br className="hidden sm:inline" />
              travel across <span className="text-[#FF5C00]">campus.</span>
            </h2>
            <p className="text-muted text-xs sm:text-sm leading-relaxed">
              Real-time GPS, glowing routes and ETAs accurate to the minute. Know exactly when to step outside the library.
            </p>

            <div className="space-y-3 pt-4 text-xs font-semibold text-main/80">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#FF5C00]/15 text-[#FF5C00] font-black flex items-center justify-center text-[9px]">✓</span>
                <span>Order confirmed</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#FF5C00]/15 text-[#FF5C00] font-black flex items-center justify-center text-[9px]">✓</span>
                <span>Being prepared</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#FF5C00]/15 text-[#FF5C00] font-black flex items-center justify-center text-[9px]">✓</span>
                <span>Out for delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-surface-elevated text-muted font-black flex items-center justify-center text-[9px]">•</span>
                <span className="text-muted">Arriving at SQU Gate 3</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/tracking')}
              className="mt-6 px-5 py-3 bg-surface hover:bg-surface-elevated border border-subtle hover:border-amber-500/20 text-[#FF5C00] font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              Open Track Console <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Glowing Map Preview */}
          <div className="lg:col-span-7 bg-background rounded-3xl border border-subtle h-80 relative overflow-hidden shadow-2xl flex items-center justify-center">
            
            <svg className="absolute inset-0 w-full h-full text-main/[0.03]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-home" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-home)" />
            </svg>

            {/* Neon path */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 60 250 Q 180 160 300 180 T 460 90"
                fill="none"
                stroke="#FF5C00"
                strokeWidth="4"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(255,92,0,0.7)]"
              />
            </svg>

            {/* Rider moving */}
            <motion.div
              animate={{
                x: [-120, 20, 140],
                y: [60, -20, -70]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              className="absolute w-8 h-8 rounded-full bg-[#FF5C00] text-white flex items-center justify-center text-sm shadow-[0_0_12px_rgba(255,92,0,0.6)] z-10"
            >
              🛵
            </motion.div>

            {/* Destination marker */}
            <div className="absolute right-[60px] top-[60px] flex flex-col items-center">
              <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full animate-ping absolute" />
              <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full border border-black z-10" />
              <div className="mt-1 px-2.5 py-1 rounded-xl bg-surface border border-subtle text-[9px] font-black text-main whitespace-nowrap">
                You
              </div>
            </div>

            {/* Simulated HUD */}
            <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl glass-panel-heavy border border-subtle flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-main/5 flex items-center justify-center text-base">Ahmed</span>
                <div className="text-left leading-none">
                  <div className="font-extrabold text-main">Ahmed</div>
                  <span className="text-[8px] text-muted font-bold block mt-1">Rider ★ 4.9</span>
                </div>
              </div>
              <div className="text-right leading-none">
                <div className="text-[9px] text-[#FF5C00] font-black uppercase tracking-wider">Arriving in</div>
                <div className="text-sm font-black text-main mt-1">8 min</div>
              </div>
            </div>

          </div>

        </section>

        {/* ================= SOCIAL FOOD HUB (matching Screenshot 5) ================= */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-[1.75rem] font-extrabold text-main tracking-tight leading-none">
              The social food hub of <span className="text-[#FF5C00]">university life.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Box 1: Loyalty Streak */}
            <div className="lg:col-span-4 p-6 sm:p-7.5 rounded-[2rem] bg-gradient-to-r from-[#FF7A00] to-[#FF5C00] text-main flex flex-col justify-between items-start text-left min-h-[200px] shadow-[0_8px_30px_rgba(255,92,0,0.2)] relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 w-36 h-36 bg-main/5 rounded-full blur-2xl" />
              
              <span className="text-[9px] font-black uppercase tracking-wider text-main bg-main/20 px-2 py-0.5 rounded">
                Loyalty Streak
              </span>

              <div className="space-y-1">
                <div className="text-5xl font-black tracking-tight flex items-baseline gap-1">
                  14
                  <Flame className="w-8 h-8 text-amber-300 fill-amber-300 animate-pulse" />
                </div>
                <p className="text-xs font-black text-main/95">days in a row!</p>
              </div>

              <div className="w-full space-y-2">
                <div className="w-full bg-main/20 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-white h-full rounded-full" style={{ width: '70%' }} />
                </div>
                <p className="text-[9px] text-main/90 font-bold uppercase tracking-wider leading-none">
                  6 more orders to Gold tier benefits
                </p>
              </div>
            </div>

            {/* Box 2: Campus Trending Lists */}
            <div className="lg:col-span-4 p-6 sm:p-7.5 rounded-[2rem] bg-surface border border-subtle flex flex-col justify-between text-left min-h-[200px]">
              <div className="flex items-center gap-1.5 mb-4 leading-none">
                <Flame className="w-4 h-4 text-[#FF5C00] fill-[#FF5C00]" />
                <h4 className="font-extrabold text-xs text-main uppercase tracking-wider">Trending in your campus</h4>
              </div>

              <div className="space-y-3.5 flex-1 text-xs">
                {TRENDING_MEALS.map((tr) => (
                  <div key={tr.rank} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-muted w-3">{tr.rank}</span>
                      <span className="font-bold text-main">{tr.name}</span>
                    </div>
                    <span className="text-[9px] text-[#FF5C00] font-black">
                      {tr.ordersToday} orders today
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 3: Student Reviews Feed */}
            <div className="lg:col-span-4 p-6 sm:p-7.5 rounded-[2rem] bg-surface border border-subtle flex flex-col justify-between text-left min-h-[200px]">
              <div className="flex items-center gap-1.5 mb-4 leading-none">
                <span className="text-sm">💬</span>
                <h4 className="font-extrabold text-xs text-main uppercase tracking-wider">Students are Saying</h4>
              </div>

              <div className="space-y-4 max-h-[170px] overflow-y-auto no-scrollbar">
                {MOCK_REVIEWS.map((rev) => (
                  <div key={rev.id} className="space-y-1.5 border-b border-subtle pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center text-[10px]">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.avatar}
                          alt=""
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-extrabold text-main">{rev.studentName}</span>
                      </div>
                      <span className="text-[8px] text-muted font-bold uppercase">{rev.university}</span>
                    </div>
                    <p className="text-[10px] text-muted leading-normal italic">
                      "{rev.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ================= FOOTER CTAs (matching Screenshot 5) ================= */}
        <section className="bg-gradient-to-r from-neutral-950 via-[#121214] to-neutral-950 border border-subtle rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden space-y-6">
          <div className="absolute inset-0 bg-[#FF5C00]/5 blur-3xl pointer-events-none" />
          
          <div className="w-10 h-10 rounded-full bg-[#FF5C00] text-white flex items-center justify-center p-1.5 shadow-[0_2px_10px_rgba(255,92,0,0.2)] mx-auto group">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-main w-full h-full">
              <path d="M12 22V12" />
              <path d="M12 12c0-3 1.5-6 5-7.5" />
              <path d="M12 12c0-3-1.5-6-5-7.5" />
            </svg>
          </div>

          <h2 className="text-3xl font-extrabold text-main tracking-tight leading-tight">
            Hungry? Your campus café <br className="hidden sm:inline" />
            is one tap away.
          </h2>

          <div className="flex justify-center flex-wrap gap-4 pt-2">
            <button
              onClick={() => navigate('/restaurants')}
              className="bg-[#FF5C00] hover:bg-[#FF7A00] text-white px-7 py-3 rounded-full font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/10 transition-transform active:scale-95"
            >
              Download the app
            </button>
            <button
              onClick={() => navigate('/restaurants')}
              className="px-6 py-3 bg-surface-elevated text-main/80 font-bold text-xs rounded-full border border-subtle hover:bg-surface-elevated transition-all uppercase tracking-wider"
            >
              For restaurants
            </button>
          </div>

          <div className="pt-8 border-t border-subtle text-[9px] text-muted font-bold uppercase tracking-[0.2em]">
            © 2026 CampusBite Oman - Made with warmth for students.
          </div>
        </section>

      </div>

      <FoodModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
