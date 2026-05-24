import React, { useState, useEffect } from 'react';
import { FoodItem } from '@/mock/mockData';
import { useApp } from '@/context/AppContext';
import { X, Plus, Minus, Star, Clock, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FoodModalProps {
  item: FoodItem | null;
  onClose: () => void;
}

export const FoodModal: React.FC<FoodModalProps> = ({ item, onClose }) => {
  const { addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<{ name: string; price: number }[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [sizeMultiplier, setSizeMultiplier] = useState(1.0); // 1.0 for standard, 1.3 for Large
  const [activeSize, setActiveSize] = useState<'std' | 'lrg'>('std');

  useEffect(() => {
    // Reset state when a new item is loaded
    setQuantity(1);
    setSelectedAddons([]);
    setSpecialInstructions('');
    setSizeMultiplier(1.0);
    setActiveSize('std');
  }, [item]);

  if (!item) return null;

  const handleAddonToggle = (addon: { name: string; price: number }) => {
    const exists = selectedAddons.some(ad => ad.name === addon.name);
    if (exists) {
      setSelectedAddons(selectedAddons.filter(ad => ad.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const unitPrice = parseFloat(((item.price * sizeMultiplier) + selectedAddons.reduce((sum, ad) => sum + ad.price, 0)).toFixed(3));
  const totalPrice = parseFloat((unitPrice * quantity).toFixed(3));

  const handleAddToBag = () => {
    // Convert base item price to scaled price
    const scaledItem = {
      ...item,
      price: parseFloat((item.price * sizeMultiplier).toFixed(3))
    };
    addToCart(scaledItem, quantity, selectedAddons, specialInstructions);
    onClose();
  };

  const sizes = [
    { id: 'std', name: 'Standard Fuel', scale: 1.0, sub: 'Regular serving' },
    { id: 'lrg', name: 'Academic Size', scale: 1.25, sub: '25% extra portions' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-lg glass-panel-heavy rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-subtle max-h-[90vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 backdrop-blur-md border border-subtle text-white/80 hover:text-main hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Large Image Header */}
          <div className="relative h-56 w-full flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/40 to-transparent" />
            
            {/* Tag Badges */}
            <div className="absolute bottom-4 left-5 flex gap-2">
              {item.badge && (
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-gradient-sunset text-white shadow-md shadow-orange-500/20">
                  {item.badge}
                </span>
              )}
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/60 border border-subtle text-white/80 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-500" />
                {item.deliveryTime} min
              </span>
            </div>
          </div>

          {/* Details & Customizations */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 text-left">
            <div>
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-2xl font-black text-main">{item.name}</h3>
                <span className="text-xl font-black text-amber-500 flex-shrink-0">
                  OMR {item.price.toFixed(3)}
                </span>
              </div>
              <p className="text-xs text-amber-500 font-bold uppercase tracking-wider mt-1">
                {item.restaurantName}
              </p>
              <p className="text-xs text-muted mt-2.5 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Sizing Selectors */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-xs text-main uppercase tracking-wider">Select Size</h4>
              <div className="grid grid-cols-2 gap-3">
                {sizes.map((sz) => (
                  <button
                    key={sz.id}
                    onClick={() => {
                      setActiveSize(sz.id as any);
                      setSizeMultiplier(sz.scale);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      activeSize === sz.id
                        ? 'bg-amber-500/10 border-amber-500 shadow-sm shadow-amber-500/10'
                        : 'bg-surface border-subtle hover:border-subtle'
                    }`}
                  >
                    <div className="font-bold text-sm text-main">{sz.name}</div>
                    <div className="text-[10px] text-muted mt-0.5">{sz.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Addons checkbox selectors */}
            {item.addons && item.addons.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-extrabold text-xs text-main uppercase tracking-wider">Customize Fuel Add-ons</h4>
                <div className="space-y-2">
                  {item.addons.map((addon, idx) => {
                    const isChecked = selectedAddons.some(ad => ad.name === addon.name);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAddonToggle(addon)}
                        className={`w-full p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                          isChecked
                            ? 'bg-surface border-amber-500/30'
                            : 'bg-surface border-subtle hover:border-subtle'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${isChecked ? 'bg-amber-500 border-amber-500 text-main' : 'border-white/20'}`}>
                            {isChecked && '✓'}
                          </div>
                          <span className="font-bold text-main">{addon.name}</span>
                        </div>
                        <span className="font-black text-amber-500">
                          + OMR {addon.price.toFixed(3)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions input */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-xs text-main uppercase tracking-wider">Special Chef Instructions</h4>
              <textarea
                placeholder="E.g. Extra spicy, no garlic, wrap tightly in foil..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full h-18 p-3 rounded-xl text-xs bg-surface border border-subtle text-main placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-all resize-none"
              />
            </div>
          </div>

          {/* Footer Controls & Add Button */}
          <div className="p-6 border-t border-subtle bg-surface flex items-center gap-4 flex-shrink-0">
            {/* Quantity adjustment controls */}
            <div className="flex items-center bg-surface border border-subtle rounded-2xl p-1.5 h-12 flex-shrink-0">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-main transition-colors hover:bg-main/5"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-black text-main px-3 min-w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-main transition-colors hover:bg-main/5"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Giant Add Button */}
            <button
              onClick={handleAddAddToBag}
              className="flex-1 h-12 bg-gradient-sunset hover:bg-gradient-sunset-hover text-white font-black rounded-2xl text-xs sm:text-sm shadow-[0_4px_18px_rgba(255,92,0,0.35)] flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4 fill-white/20" />
              <span>Add to Fuel Bag • OMR {totalPrice.toFixed(3)}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  function handleAddAddToBag() {
    handleAddToBag();
  }
};
