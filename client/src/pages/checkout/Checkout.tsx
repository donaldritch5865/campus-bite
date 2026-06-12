import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { CAMPUSES, CORPORATE_LOCATIONS } from '@/mock/mockData';
import { MapPin, Clock, CreditCard, ShieldCheck, Ticket, ArrowLeft, ShoppingBag } from 'lucide-react';
import { CutoffTimer } from '@/components/ui/CutoffTimer';
import { PickupStationCard } from '@/components/ui/PickupStationCard';
import { motion } from 'framer-motion';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    user,
    promoCode,
    promoDiscount,
    startOrderTracking,
    addNotification
  } = useApp();

  const [step, setStep] = useState(1);
  const [selectedCampus, setSelectedCampus] = useState(user.campusId);
  const [selectedBuilding, setSelectedBuilding] = useState(user.building); // This is now the Pickup Station
  const [pickupWindow, setPickupWindow] = useState(user.userType === 'student' ? 'lunch12' : 'lunch1');
  const [paymentMethod, setPaymentMethod] = useState('thawani');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 3.0 || subtotal === 0 ? 0.000 : 0.400; // Free delivery for orders above 3 OMR
  const discountAmount = parseFloat((subtotal * promoDiscount).toFixed(3));
  const estimatedTax = subtotal > 0 ? 0.050 : 0.000;
  const total = parseFloat((subtotal + deliveryFee + estimatedTax - discountAmount).toFixed(3));

  if (cart.length === 0) {
    return (
      <div className="py-24 text-center space-y-4 text-left max-w-md mx-auto px-4">
        <span className="text-5xl">🌯</span>
        <h4 className="font-extrabold text-main text-lg">Your bag is empty</h4>
        <p className="text-xs text-muted">Add delicious Omani street food from local student cafes before checking out.</p>
        <button
          onClick={() => navigate('/restaurants')}
          className="w-full py-3.5 bg-gradient-sunset text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-md"
        >
          Explore Restaurants
        </button>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    const fullNotes = `Pickup Station: ${selectedBuilding} at ${pickupWindow}`;
    
    // Convert payment key to readable string
    const paymentLabelMap: { [key: string]: string } = {
      'thawani': 'Thawani Omani Wallet',
      'pocket': 'Pocket OMR Balance',
      'card': 'Credit Card (Visa)',
      'cod': 'Cash on Delivery'
    };

    startOrderTracking(selectedCampus, selectedBuilding, fullNotes, paymentLabelMap[paymentMethod]);
    navigate('/tracking');
  };

  const availableLocations = user.userType === 'student' ? CAMPUSES : CORPORATE_LOCATIONS;
  const currentCampusObj = availableLocations.find(c => c.id === selectedCampus) || availableLocations[0];

  const timeSlots = user.userType === 'student' 
    ? [
        { id: 'break10', name: '10:00 AM Break', desc: 'Lecture Break 1 collection' },
        { id: 'lunch12', name: '12:30 PM Lunch', desc: 'Main lunch collection window' },
        { id: 'lunch1', name: '1:30 PM Late Lunch', desc: 'Afternoon breaks block' },
        { id: 'study8', name: '8:00 PM Dinner', desc: 'Late night library sessions' }
      ]
    : [
        { id: 'lunch1', name: '1:00 PM Lunch', desc: 'Corporate lunch collection window' }
      ];

  const paymentGateways = [
    { id: 'thawani', name: 'Thawani Wallet', desc: 'Fast Omani payments', icon: '📱' },
    { id: 'pocket', name: 'Pocket OMR', desc: `Use wallet balance (OMR ${user.balance.toFixed(3)})`, icon: '🪙' },
    { id: 'card', name: 'Credit Card', desc: 'Visa / Mastercard', icon: '💳' },
    { id: 'cod', name: 'Cash on Delivery', desc: 'Pay rider at drop-point', icon: '💵' }
  ];

  return (
    <div className="relative min-h-screen bg-background pt-8 pb-24 md:pb-16 text-left">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] ambient-glow-orange opacity-25 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Header Back button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl bg-surface border border-subtle text-muted hover:text-main"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 flex-1">
            <div className="space-y-0.5">
              <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-wider">Checkout Flow</span>
              <h2 className="text-2xl sm:text-3xl font-black text-main leading-none">Student Fuel Checkout</h2>
            </div>
            <CutoffTimer cutoffTimeStr="11:00 AM" size="md" className="mb-0.5" />
          </div>
        </div>

        {/* Grid: Forms vs Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Multi-Step process */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1 Card: Campus drop-point selection */}
            <div className={`p-5 sm:p-6 rounded-3xl glass-panel-heavy border transition-all ${step === 1 ? 'border-amber-500/30' : 'border-subtle'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-base text-main flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-gradient-sunset text-white text-xs font-black flex items-center justify-center">1</span>
                  Select Drop-Off Location
                </h3>
                {step > 1 && (
                  <button onClick={() => setStep(1)} className="text-xs text-amber-500 font-black uppercase">Edit</button>
                )}
              </div>

              {step === 1 ? (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Campus selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-muted tracking-wider">Campus</label>
                      <select
                        value={selectedCampus}
                        onChange={(e) => {
                          setSelectedCampus(e.target.value);
                          // Reset building to first item of new campus
                          const newCampus = availableLocations.find(c => c.id === e.target.value) || availableLocations[0];
                          setSelectedBuilding(newCampus.buildings[0]);
                        }}
                        className="w-full px-4 py-3.5 rounded-xl text-xs bg-surface border border-subtle text-main focus:outline-none focus:border-amber-500 appearance-none"
                      >
                        {availableLocations.map(c => (
                          <option key={c.id} value={c.id}>{c.name} - {c.fullName}</option>
                        ))}
                      </select>
                    </div>

                    {/* Station selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-muted tracking-wider">Pickup Station</label>
                      <select
                        value={selectedBuilding}
                        onChange={(e) => setSelectedBuilding(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl text-xs bg-surface border border-subtle text-main focus:outline-none focus:border-amber-500 appearance-none"
                      >
                        {currentCampusObj.buildings.map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mt-4 px-5 py-3 bg-gradient-sunset text-white rounded-xl text-xs font-black uppercase tracking-wider w-full sm:w-auto"
                  >
                    Confirm Pickup Location
                  </button>
                </div>
              ) : (
                <PickupStationCard
                  campusName={currentCampusObj.name}
                  stationName={selectedBuilding}
                  pickupWindow="To be selected"
                  className="mt-4"
                />
              )}
            </div>

            {/* Step 2 Card: Time Scheduling */}
            <div className={`p-5 sm:p-6 rounded-3xl glass-panel-heavy border transition-all ${step === 2 ? 'border-amber-500/30' : 'border-subtle'} ${step < 2 ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-base text-main flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-gradient-sunset text-white text-xs font-black flex items-center justify-center">2</span>
                  Collection Window
                </h3>
                {step > 2 && (
                  <button onClick={() => setStep(2)} className="text-xs text-amber-500 font-black uppercase">Edit</button>
                )}
              </div>

              {step === 2 && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {timeSlots.map((ts) => (
                      <button
                        key={ts.id}
                        type="button"
                        onClick={() => setPickupWindow(ts.id)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          pickupWindow === ts.id
                            ? 'bg-amber-500/10 border-amber-500'
                            : 'bg-surface border-subtle hover:border-subtle'
                        }`}
                      >
                        <div className="font-bold text-xs sm:text-sm text-main flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-amber-500" />
                          {ts.name}
                        </div>
                        <div className="text-[10px] text-muted mt-1">{ts.desc}</div>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="mt-4 px-5 py-3 bg-gradient-sunset text-white rounded-xl text-xs font-black uppercase tracking-wider w-full sm:w-auto"
                  >
                    Confirm Collection Time
                  </button>
                </div>
              )}

              {step > 2 && (
                <PickupStationCard
                  campusName={currentCampusObj.name}
                  stationName={selectedBuilding}
                  pickupWindow={timeSlots.find(t => t.id === pickupWindow)?.name || ''}
                  className="mt-4"
                />
              )}
            </div>

            {/* Step 3 Card: Payment Selection */}
            <div className={`p-5 sm:p-6 rounded-3xl glass-panel-heavy border transition-all ${step === 3 ? 'border-amber-500/30' : 'border-subtle'} ${step < 3 ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-base text-main flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-gradient-sunset text-white text-xs font-black flex items-center justify-center">3</span>
                  Secure Payment Method
                </h3>
              </div>

              {step === 3 && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {paymentGateways.map((pg) => {
                      const isDisabled = pg.id === 'pocket' && user.balance < total;
                      return (
                        <button
                          key={pg.id}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => setPaymentMethod(pg.id)}
                          className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 relative ${
                            isDisabled ? 'opacity-40 cursor-not-allowed border-dashed' : ''
                          } ${
                            paymentMethod === pg.id
                              ? 'bg-amber-500/10 border-amber-500'
                              : 'bg-surface border-subtle hover:border-subtle'
                          }`}
                        >
                          <span className="text-2xl">{pg.icon}</span>
                          <div className="text-left leading-none">
                            <h4 className="font-bold text-xs sm:text-sm text-main">{pg.name}</h4>
                            <p className="text-[10px] text-muted mt-1 leading-normal">{pg.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-subtle flex items-center justify-between">
                    <span className="text-xs text-muted font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Encrypted checkout via Central Bank of Oman guidelines
                    </span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Items Summary list */}
            <div className="p-5 sm:p-6 rounded-3xl glass-panel-heavy border border-subtle space-y-4">
              <h3 className="font-extrabold text-sm text-main uppercase tracking-wider flex items-center gap-2">
                <ShoppingBag className="w-4.5 h-4.5 text-amber-500" />
                Fuel Summary
              </h3>

              <div className="space-y-3.5 max-h-48 overflow-y-auto no-scrollbar">
                {cart.map((item) => (
                  <div key={item.cartId} className="flex justify-between items-center text-xs gap-3">
                    <div className="text-left min-w-0">
                      <div className="font-extrabold text-main truncate">{item.name}</div>
                      <div className="text-[10px] text-muted mt-0.5">
                        Qty: {item.quantity} • {item.kitchenName}
                      </div>
                    </div>
                    <span className="font-black text-main shrink-0">
                      OMR {(item.price * item.quantity).toFixed(3)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-subtle" />

              {/* Promo active notice */}
              {promoCode && (
                <div className="p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-500 font-bold flex items-center gap-1.5 justify-center">
                  <Ticket className="w-3.5 h-3.5" />
                  Promo Code '{promoCode}' active
                </div>
              )}

              {/* Price list */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-muted">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-main">OMR {subtotal.toFixed(3)}</span>
                </div>
                
                {promoCode && (
                  <div className="flex justify-between text-emerald-500 font-medium">
                    <span>Discount ({promoDiscount * 100}%)</span>
                    <span>- OMR {discountAmount.toFixed(3)}</span>
                  </div>
                )}

                <div className="flex justify-between text-muted">
                  <span>Pickup Fee</span>
                  <span className="font-semibold text-main">
                    FREE
                  </span>
                </div>

                <div className="flex justify-between text-muted">
                  <span>Est. Tax & Surcharge</span>
                  <span className="font-semibold text-main">OMR {estimatedTax.toFixed(3)}</span>
                </div>

                <hr className="border-subtle my-1" />

                <div className="flex justify-between text-sm items-center">
                  <span className="font-extrabold text-main">Grand Total</span>
                  <span className="font-black text-amber-500 text-base">OMR {total.toFixed(3)}</span>
                </div>
              </div>

              {/* Grand Action checkout trigger button */}
              <button
                type="button"
                disabled={step < 3}
                onClick={handlePlaceOrder}
                className={`w-full py-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider text-main shadow-lg transition-all flex items-center justify-center gap-2 ${
                  step < 3
                    ? 'bg-surface-elevated text-muted border border-subtle cursor-not-allowed'
                    : 'bg-gradient-sunset hover:bg-gradient-sunset-hover shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                <span>Place Order • OMR {total.toFixed(3)}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
