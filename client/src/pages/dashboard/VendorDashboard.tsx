import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { FOOD_ITEMS } from '@/mock/mockData';
import { Store, ShoppingBag, Settings, Award, ArrowRight, ToggleLeft, ToggleRight, Check, Timer } from 'lucide-react';

export const VendorDashboard: React.FC = () => {
  const { vendorOrders, updateVendorOrderStatus } = useApp();

  const [inStockStatus, setInStockStatus] = useState<{ [key: string]: boolean }>({
    'f1': true,
    'f2': true,
    'f3': true,
    'f4': true,
    'f5': true,
    'f6': true,
    'f7': true,
    'f8': true
  });

  const toggleStock = (id: string) => {
    setInStockStatus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getStatusButton = (orderId: string, currentStatus: string) => {
    if (currentStatus === 'confirmed') {
      return (
        <button
          onClick={() => updateVendorOrderStatus(orderId, 'preparing')}
          className="px-4 py-2 bg-gradient-sunset text-white font-black text-xs rounded-xl uppercase tracking-wider shadow-sm transition-transform active:scale-95"
        >
          Accept & Prep
        </button>
      );
    }
    if (currentStatus === 'preparing') {
      return (
        <button
          onClick={() => updateVendorOrderStatus(orderId, 'delivering')}
          className="px-4 py-2 bg-gradient-sunset text-white font-black text-xs rounded-xl uppercase tracking-wider shadow-sm transition-transform active:scale-95 flex items-center gap-1"
        >
          <span>Send Rider</span> 🛵
        </button>
      );
    }
    if (currentStatus === 'delivering') {
      return (
        <button
          onClick={() => updateVendorOrderStatus(orderId, 'arrived')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-main font-black text-xs rounded-xl uppercase tracking-wider shadow-sm transition-transform active:scale-95"
        >
          Mark Delivered
        </button>
      );
    }
    return (
      <span className="px-3 py-1.5 bg-surface border border-subtle text-muted rounded-lg text-xs font-bold flex items-center gap-1">
        <Check className="w-3.5 h-3.5 text-muted" /> Completed
      </span>
    );
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Shop profile header */}
      <div className="p-6 rounded-3xl glass-panel border border-subtle flex flex-col sm:flex-row items-center gap-5 justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-sunset text-white flex items-center justify-center text-3xl shadow-lg shadow-orange-500/20">
            🌯
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-main leading-none">Levant Grill Console</h2>
            <p className="text-xs text-muted font-medium">Merchant ID: <strong>LEV-4921-SQU</strong> • SQU Bypass Road branch</p>
            <div className="text-[10px] text-amber-500 font-bold uppercase tracking-wider flex items-center gap-1">
              ★ 4.9 average student rating • Active Shop
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
          <div className="p-3 bg-surface border border-subtle rounded-2xl text-center">
            <span className="text-lg font-black text-main block">12</span>
            <span className="text-[9px] text-muted uppercase font-black">Orders Today</span>
          </div>
          <div className="p-3 bg-surface border border-subtle rounded-2xl text-center">
            <span className="text-lg font-black text-amber-500 block">OMR 18.6</span>
            <span className="text-[9px] text-muted uppercase font-black">Gross Revenue</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Incoming Student Orders list (col 7) */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-[2rem] bg-surface border border-subtle space-y-4">
          <h3 className="font-extrabold text-sm text-main uppercase tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-4.5 h-4.5 text-amber-500" />
            Incoming Orders Queue ({vendorOrders.length})
          </h3>

          {vendorOrders.length === 0 ? (
            <div className="py-12 text-center text-muted text-xs space-y-3">
              <span className="text-4xl slow-float block">💤</span>
              <p className="max-w-xs mx-auto">No student orders are currently pending in your kitchen cue. Switch back to student mode and place an order!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[460px] overflow-y-auto no-scrollbar">
              {vendorOrders.map(order => (
                <div
                  key={order.id}
                  className="p-4 rounded-2xl bg-surface border border-subtle space-y-3"
                >
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-main">Order #{order.id}</span>
                        <span className="text-[9px] font-bold text-amber-500 uppercase bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded">
                          {order.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted mt-1 block">
                        Drop spot: <strong>{order.building}</strong> • Notes: {order.deliveryNotes}
                      </span>
                    </div>
                    
                    {/* Action control button */}
                    {getStatusButton(order.id, order.status)}
                  </div>

                  {/* Items summary */}
                  <div className="text-xs text-muted space-y-1 pl-1 leading-normal border-l border-subtle text-left">
                    {order.items.map(item => (
                      <div key={item.cartId}>
                        • {item.quantity}x {item.name} {item.addonsSelected.length > 0 && `(Customized: ${item.addonsSelected.map(a => a.name).join(', ')})`}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-subtle text-[10px] text-muted font-semibold leading-none">
                    <span>Omani Gateway: {order.paymentMethod}</span>
                    <span className="text-xs font-black text-amber-500">OMR {order.total.toFixed(3)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Menu Stock Manager list (col 5) */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-[2rem] bg-surface border border-subtle space-y-4">
          <h3 className="font-extrabold text-sm text-main uppercase tracking-wider flex items-center gap-2">
            <Settings className="w-4.5 h-4.5 text-amber-500" />
            Kitchen Stock Control
          </h3>

          <div className="space-y-3 max-h-[460px] overflow-y-auto no-scrollbar">
            {FOOD_ITEMS.slice(0, 7).map(item => {
              const isStocked = inStockStatus[item.id] !== false;
              return (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-surface border border-subtle flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="text-left min-w-0">
                      <h4 className="font-extrabold text-main truncate">{item.name}</h4>
                      <span className="text-[9px] text-muted font-bold block mt-0.5">
                        OMR {item.price.toFixed(3)}
                      </span>
                    </div>
                  </div>

                  {/* Stock switch */}
                  <button
                    onClick={() => toggleStock(item.id)}
                    className="p-1 text-muted hover:text-main"
                  >
                    {isStocked ? (
                      <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-black uppercase">
                        <span>In Stock</span>
                        <ToggleRight className="w-6 h-6 text-emerald-500" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-[10px] text-red-500 font-black uppercase">
                        <span>Sold Out</span>
                        <ToggleLeft className="w-6 h-6 text-red-400" />
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
