import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarDays, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const MealPlans: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useApp();

  const handleSubscribe = () => {
    addNotification("Meal plan activated! Your pocket balance has been adjusted. 📅");
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-background pt-8 pb-24 md:pb-16 text-left">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] ambient-glow-orange opacity-25 z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Header back */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl bg-surface border border-subtle text-muted hover:text-main"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="space-y-0.5">
            <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-wider">Subscriptions</span>
            <h2 className="text-2xl sm:text-3xl font-black text-main leading-none">Student Meal Plans</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Plan 1 */}
          <div className="p-8 rounded-[2rem] bg-surface border border-subtle flex flex-col items-center text-center space-y-6 hover:border-amber-500/30 transition-colors">
            <CalendarDays className="w-12 h-12 text-amber-500" />
            <div>
              <h3 className="text-2xl font-black text-main">Weekly Starter</h3>
              <p className="text-sm text-muted mt-2">Perfect for busy lecture days</p>
            </div>
            
            <div className="text-4xl font-black text-main">OMR 4.000</div>
            
            <ul className="space-y-3 text-sm text-left w-full pt-4 border-t border-subtle">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 5 Pre-ordered Lunches</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Priority QR Collection</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 2 Free Karak Vouchers</li>
            </ul>

            <button
              onClick={handleSubscribe}
              className="w-full py-3.5 bg-gradient-sunset text-white font-black rounded-2xl text-xs uppercase tracking-wider mt-auto hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-orange-500/20"
            >
              Subscribe Now
            </button>
          </div>

          {/* Plan 2 */}
          <div className="p-8 rounded-[2rem] bg-gradient-sunset text-white flex flex-col items-center text-center space-y-6 shadow-[0_10px_40px_rgba(255,92,0,0.3)] relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-sm">
              Most Popular
            </div>
            
            <CalendarDays className="w-12 h-12 text-white" />
            <div>
              <h3 className="text-2xl font-black">Monthly Scholar</h3>
              <p className="text-sm text-white/80 mt-2">The ultimate semester fuel</p>
            </div>
            
            <div className="text-4xl font-black">OMR 15.000</div>
            
            <ul className="space-y-3 text-sm text-left w-full pt-4 border-t border-white/20">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> 20 Pre-ordered Lunches</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> VIP Priority QR Collection</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> Any Menu Item Access</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-white" /> 10 Free Drink Vouchers</li>
            </ul>

            <button
              onClick={handleSubscribe}
              className="w-full py-3.5 bg-white text-[#FF5C00] font-black rounded-2xl text-xs uppercase tracking-wider mt-auto hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg"
            >
              Subscribe Now
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
