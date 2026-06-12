import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { CAMPUSES } from '@/mock/mockData';
import { ArrowLeft, MapPin, Clock, QrCode, Ticket, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import logoUrl from '@/assets/branding/logo.png';
import { CutoffTimer } from '@/components/ui/CutoffTimer';

export const PickupStatus: React.FC = () => {
  const navigate = useNavigate();
  const { activeOrder, pastOrders, cancelOrder, user } = useApp();

  const currentOrder = activeOrder || (pastOrders.length > 0 ? pastOrders[0] : null);

  if (!currentOrder) {
    return (
      <div className="py-24 text-center space-y-4 text-left max-w-md mx-auto px-4">
        <span className="text-5xl">🎒</span>
        <h4 className="font-extrabold text-main text-lg">No active meal pass</h4>
        <p className="text-xs text-muted">You don't have any meals to collect right now. Pre-order your lunch!</p>
        <button
          onClick={() => navigate('/menu')}
          className="w-full py-3.5 bg-gradient-sunset text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-md"
        >
          Browse Daily Menu
        </button>
      </div>
    );
  }

  const campusObj = CAMPUSES.find(c => c.id === currentOrder.campusId) || CAMPUSES[0];
  const isReady = currentOrder.status === 'ready' || currentOrder.status === 'collected';
  const isCollected = currentOrder.status === 'collected';

  return (
    <div className="relative min-h-screen bg-background pt-8 pb-24 md:pb-16 text-left flex flex-col items-center">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#FF5C00]/10 to-transparent z-0 pointer-events-none" />

      <div className="w-full max-w-2xl px-4 relative z-10 space-y-6">
        
        {/* Header back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl bg-surface border border-subtle text-muted hover:text-main"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <img src={logoUrl} alt="Campus Bite" className="w-6 h-6 object-contain grayscale opacity-60" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Campus Boarding Pass</span>
          </div>
        </div>

        {/* Boarding Pass Ticket */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full bg-white rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(255,92,0,0.15)] relative text-black"
        >
          {/* Top colored strip */}
          <div className={`h-3 w-full ${isCollected ? 'bg-neutral-500' : isReady ? 'bg-emerald-500' : 'bg-[#FF5C00]'}`} />
          
          {/* Main Content */}
          <div className="p-8 pb-10 space-y-8">
            
            {/* Passenger / Student Info */}
            <div className="flex justify-between items-start border-b border-neutral-200 pb-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Student</p>
                <h2 className="text-2xl font-black tracking-tight leading-none text-neutral-900">{user.name}</h2>
                <p className="text-xs font-bold text-neutral-500 mt-1">{user.university}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Order No</p>
                <h3 className="text-xl font-black text-neutral-900 leading-none">#{currentOrder.id.substring(0, 6)}</h3>
                <span className={`inline-block mt-2 px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider ${
                  isCollected ? 'bg-neutral-100 text-neutral-500' : 
                  isReady ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-[#FF5C00]'
                }`}>
                  {isCollected ? 'Collected' : isReady ? 'Ready for Pickup' : 'Kitchen Prep'}
                </span>
              </div>
            </div>

            {/* Flight / Meal details */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3 h-3" /> Meal Selection
                </p>
                <div className="space-y-2">
                  {currentOrder.items.map(item => (
                    <div key={item.cartId} className="flex items-start gap-2">
                      <span className="font-black text-neutral-900">{item.quantity}x</span>
                      <div>
                        <p className="font-black text-neutral-900 leading-tight">{item.name}</p>
                        <p className="text-[11px] font-bold text-neutral-500">{item.kitchenName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> Pickup Station
                  </p>
                  <p className="font-black text-sm text-neutral-900 leading-tight">{currentOrder.building}</p>
                  <p className="text-[10px] font-bold text-neutral-500">{campusObj.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> Time Window
                  </p>
                  <p className="font-black text-sm text-neutral-900 leading-tight">12:30 PM</p>
                  <p className="text-[10px] font-bold text-neutral-500">Lunch Break</p>
                </div>
              </div>
            </div>
            
          </div>

          {/* Perforated separator */}
          <div className="relative h-10 w-full flex items-center justify-between px-[-20px]">
            <div className="absolute left-[-15px] w-8 h-8 bg-background rounded-full" />
            <div className="w-full border-t-[3px] border-dashed border-neutral-200 mx-6" />
            <div className="absolute right-[-15px] w-8 h-8 bg-background rounded-full" />
          </div>

          {/* QR Code Section */}
          <div className="p-8 pt-6 flex flex-col items-center bg-neutral-50">
            {isCollected ? (
              <div className="w-48 h-48 flex items-center justify-center flex-col text-neutral-400 gap-3 border-4 border-dashed border-neutral-200 rounded-2xl">
                <CheckCircle2 className="w-12 h-12" />
                <span className="font-black uppercase tracking-widest text-xs">Collected</span>
              </div>
            ) : isReady ? (
              <div className="w-48 h-48 bg-white p-3 rounded-2xl shadow-sm border border-neutral-200 flex items-center justify-center">
                <QrCode className="w-full h-full text-neutral-900" />
              </div>
            ) : (
              <div className="w-48 h-48 flex items-center justify-center flex-col text-[#FF5C00] gap-4 border-4 border-dashed border-orange-200 rounded-2xl bg-white">
                <div className="w-10 h-10 border-4 border-orange-100 border-t-[#FF5C00] rounded-full animate-spin" />
                <span className="font-black uppercase tracking-widest text-[10px] text-center px-4">Preparing QR Code<br/><span className="text-neutral-400 mt-1 block">Available when ready</span></span>
              </div>
            )}
            
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-6 text-center max-w-[200px]">
              Present this code at the kiosk scanner
            </p>
          </div>
          
          <div className="w-full bg-neutral-900 py-3 text-center">
             <p className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-500">Campus Bite Collection Pass</p>
          </div>
        </motion.div>

        {activeOrder && !isReady && (
          <div className="pt-4 text-center">
            <button
              onClick={cancelOrder}
              className="text-[10px] font-black uppercase tracking-wider text-red-500/80 hover:text-red-500 transition-colors"
            >
              Cancel Pre-Order
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
