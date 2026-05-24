import React from 'react';
import { useNavigate } from 'react-router-dom';
import { STUDENT_DEALS } from '@/mock/mockData';
import { useApp } from '@/context/AppContext';
import { Award, Flame, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';

export const Deals: React.FC = () => {
  const navigate = useNavigate();
  const { applyPromo, promoCode } = useApp();

  const handleClaim = (dealTitle: string) => {
    if (dealTitle.toLowerCase().includes('combo') || dealTitle.toLowerCase().includes('budget')) {
      navigate('/restaurants');
    } else {
      applyPromo('STUDENT15');
      alert("Simulated voucher claimed! Coupon 'STUDENT15' automatically applied to your checkout bag!");
    }
  };

  return (
    <div className="relative min-h-screen bg-background pt-8 pb-24 md:pb-16 text-left">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] ambient-glow-orange opacity-25 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Header */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-[0.2em]">Oman Student discounts</span>
          <h2 className="text-3xl sm:text-4xl font-black text-main tracking-tight">
            Student Budget <span className="text-gradient-sunset">Deals & Combos</span>
          </h2>
          <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-xl">
            Exclusively customized for active university email accounts. Save OMRs on late-night Karak or study group platters.
          </p>
        </div>

        {/* Promo code promo card highlight */}
        <div className="p-6 rounded-3xl bg-gradient-sunset text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left relative overflow-hidden">
          <div className="space-y-1.5 relative z-10">
            <span className="text-[9px] font-black uppercase bg-main/20 px-2 py-0.5 rounded">Active coupon</span>
            <h3 className="text-xl font-black">Get 15% flat discount off all meals</h3>
            <p className="text-xs text-main/80 font-bold">Apply coupon code 'STUDENT15' at checkout drawer</p>
          </div>
          <button
            onClick={() => { applyPromo('STUDENT15'); alert("STUDENT15 applied!"); }}
            className="px-6 py-3 bg-white text-amber-600 rounded-2xl text-xs font-black uppercase tracking-wider relative z-10 shadow-md transition-transform active:scale-95 whitespace-nowrap"
          >
            {promoCode === 'STUDENT15' ? 'Voucher Active ✓' : 'Apply Code'}
          </button>
        </div>

        {/* Deals Grid mapping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDENT_DEALS.map((deal) => (
            <div
              key={deal.id}
              className="p-6 rounded-3xl bg-surface border border-subtle flex flex-col justify-between items-start min-h-[220px] text-left hover:border-subtle transition-all group"
            >
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-2xl bg-surface border border-subtle flex items-center justify-center text-2xl shadow-sm">
                  {deal.icon}
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-extrabold text-lg text-main">{deal.title}</h4>
                  <p className="text-xs text-muted leading-normal">{deal.sub}</p>
                </div>
              </div>

              <button
                onClick={() => handleClaim(deal.title)}
                className="mt-6 text-xs font-black uppercase text-amber-500 group-hover:translate-x-1.5 transition-transform flex items-center gap-1 leading-none"
              >
                Claim Deal Voucher <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
