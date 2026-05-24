import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { X, Trash2, Plus, Minus, Ticket, ShieldCheck, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    promoCode,
    promoDiscount,
    applyPromo,
    removePromo
  } = useApp();

  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 3.0 || subtotal === 0 ? 0.000 : 0.400; // Free delivery for orders above 3 OMR
  const discountAmount = parseFloat((subtotal * promoDiscount).toFixed(3));
  const estimatedTax = subtotal > 0 ? 0.050 : 0.000;
  const total = parseFloat((subtotal + deliveryFee + estimatedTax - discountAmount).toFixed(3));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = applyPromo(promoInput);
    if (success) {
      setPromoInput('');
      setPromoError(false);
    } else {
      setPromoError(true);
    }
  };

  const handleProceedCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-obsidian-850 glass-panel-heavy z-50 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col border-l border-subtle"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-subtle flex justify-between items-center bg-surface/30">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-sunset flex items-center justify-center text-white">
                  <ShoppingBag className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-main">Your Fuel Bag</h3>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-wider">
                    {cart.length} unique items
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-surface border border-subtle hover:bg-surface-elevated text-muted hover:text-main transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <span className="text-5xl mb-4 slow-float">🌯</span>
                  <h4 className="font-extrabold text-main text-base">Your bag is starving</h4>
                  <p className="text-xs text-muted max-w-xs mt-2 leading-relaxed">
                    Browse premium campus cafes in Oman and fill your bag with karak tea and shawarmas!
                  </p>
                  <button
                    onClick={() => { onClose(); navigate('/restaurants'); }}
                    className="mt-6 px-5 py-2.5 bg-surface border border-subtle hover:border-amber-500/30 text-amber-500 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                  >
                    Explore Menus
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.cartId}
                    className="p-3.5 rounded-2xl bg-surface border border-subtle flex gap-3.5 transition-all hover:border-subtle"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover ring-1 ring-subtle flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex justify-between items-start">
                        <h4 className="font-extrabold text-sm text-main truncate">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="p-1 text-muted hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wide">
                        {item.restaurantName}
                      </p>
                      
                      {/* Addons selected summary */}
                      {item.addonsSelected.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {item.addonsSelected.map((ad, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-main/5 text-main/80 font-medium"
                            >
                              +{ad.name}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm font-black text-main">
                          OMR {(item.price * item.quantity).toFixed(3)}
                        </span>
                        
                        {/* Quantity adjust */}
                        <div className="flex items-center gap-2.5 bg-surface border border-subtle rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}
                            className="p-0.5 text-muted hover:text-main transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-black text-main min-w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}
                            className="p-0.5 text-muted hover:text-main transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom summary and Checkout (Only if cart is not empty) */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-subtle bg-surface/40 space-y-4">
                
                {/* Promo Input */}
                {promoCode ? (
                  <div className="flex justify-between items-center p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs">
                    <span className="text-amber-500 font-bold flex items-center gap-1.5">
                      <Ticket className="w-4 h-4" />
                      Promo '{promoCode}' active
                    </span>
                    <button
                      onClick={removePromo}
                      className="text-[10px] text-muted hover:text-main font-extrabold uppercase"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code (STUDENT15)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-surface border border-subtle text-main placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-surface-elevated text-main font-bold text-xs rounded-xl hover:bg-neutral-700 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Pricing summary details */}
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
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-main">
                      {deliveryFee === 0 ? 'FREE' : `OMR ${deliveryFee.toFixed(3)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-muted">
                    <span>Est. Surcharge & Tax</span>
                    <span className="font-semibold text-main">OMR {estimatedTax.toFixed(3)}</span>
                  </div>

                  <hr className="border-subtle my-1" />

                  <div className="flex justify-between text-sm">
                    <span className="font-extrabold text-main">Grand Total</span>
                    <span className="font-black text-amber-500">OMR {total.toFixed(3)}</span>
                  </div>
                </div>

                {/* Safe badge */}
                <div className="flex items-center gap-1.5 justify-center text-[10px] text-muted font-semibold leading-none">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Campus safety certified contactless delivery drop</span>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-3.5 bg-gradient-sunset hover:bg-gradient-sunset-hover text-white font-black rounded-2xl text-sm shadow-[0_5px_20px_rgba(255,92,0,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
