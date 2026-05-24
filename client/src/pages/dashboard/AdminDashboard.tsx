import React, { useState } from 'react';
import { CAMPUSES, RESTAURANTS } from '@/mock/mockData';
import { BarChart3, Users, DollarSign, Bike, ShieldCheck, ArrowUpRight, Award, Plus } from 'lucide-react';
import logoUrl from '@/assets/branding/logo.png';
export const AdminDashboard: React.FC = () => {
  const [approvedMerchants, setApprovedMerchants] = useState<{ [key: string]: boolean }>({
    'r1': true,
    'r2': true,
    'r3': true,
    'r4': true
  });

  const toggleApproval = (id: string) => {
    setApprovedMerchants(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Mock analytical stats
  const metrics = [
    { name: 'Total Campus Users', value: '14,812', change: '+12.4%', icon: Users, color: 'text-amber-500 bg-amber-500/10' },
    { name: 'Weekly GMV Revenue', value: 'OMR 2,490', change: '+18.2%', icon: DollarSign, color: 'text-emerald-500 bg-emerald-500/10' },
    { name: 'Active Delivery Riders', value: '48', change: 'Live GPS', icon: Bike, color: 'text-blue-500 bg-blue-500/10' },
    { name: 'Platform Satisfaction', value: '98.4%', change: 'Excellent', icon: Award, color: 'text-purple-500 bg-purple-500/10' }
  ];

  return (
    <div className="space-y-8 text-left">
      
      {/* Header title block */}
      <div className="space-y-1">
        <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-[0.2em]">Platform Admin Operations</span>
        <div className="flex items-center gap-3">
          <img src={logoUrl} alt="Campus Bite Logo" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(255,92,0,0.5)]" />
          <h2 className="text-2xl font-black text-main leading-none">Campus Bite Central Command</h2>
        </div>
        <p className="text-xs text-muted font-medium">Cross-campus platform parameters monitor</p>
      </div>

      {/* Grid of stats metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-5 rounded-3xl bg-surface border border-subtle flex flex-col justify-between items-start min-h-[140px] text-left">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl ${m.color}`}>
                <m.icon className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-black uppercase text-muted tracking-wider leading-none">
                {m.name}
              </span>
            </div>
            
            <div className="my-2 leading-none">
              <span className="text-2xl font-black text-main">{m.value}</span>
            </div>

            <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded-lg border border-emerald-500/10">
              <ArrowUpRight className="w-3 h-3 text-emerald-500" />
              <span>{m.change} this week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Charts layout using beautiful raw SVG */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sales Chart (col 7) */}
        <div className="lg:col-span-7 p-6 rounded-[2rem] bg-surface border border-subtle space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-extrabold text-sm text-main uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4.5 h-4.5 text-amber-500" />
              Platform Weekly Sales Trend
            </h3>
            <span className="text-[10px] text-muted font-bold uppercase tracking-wider">OMR scale</span>
          </div>

          {/* SVG line graph */}
          <div className="h-60 w-full relative pt-2">
            
            {/* Draw grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-[9px] text-neutral-600 font-bold pointer-events-none pb-5">
              <div className="border-b border-subtle pb-1 flex justify-between"><span>OMR 400</span><hr className="w-full border-t border-dashed border-subtle mx-2 my-2"/></div>
              <div className="border-b border-subtle pb-1 flex justify-between"><span>OMR 300</span><hr className="w-full border-t border-dashed border-subtle mx-2 my-2"/></div>
              <div className="border-b border-subtle pb-1 flex justify-between"><span>OMR 200</span><hr className="w-full border-t border-dashed border-subtle mx-2 my-2"/></div>
              <div className="border-b border-subtle pb-1 flex justify-between"><span>OMR 100</span><hr className="w-full border-t border-dashed border-subtle mx-2 my-2"/></div>
            </div>

            {/* Line SVG */}
            <svg className="w-full h-44 absolute bottom-6 left-0 overflow-visible" viewBox="0 0 500 150">
              {/* Sunset Gradient definition */}
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF7A00" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#FF7A00" stopOpacity="0"/>
                </linearGradient>
              </defs>
              
              {/* Fill Area under chart */}
              <path
                d="M 0 140 Q 80 120 160 80 T 320 60 T 500 20 L 500 150 L 0 150 Z"
                fill="url(#chartGlow)"
              />

              {/* Glowing Line */}
              <path
                d="M 0 140 Q 80 120 160 80 T 320 60 T 500 20"
                fill="none"
                stroke="#FF7A00"
                strokeWidth="4.5"
                strokeLinecap="round"
                className="drop-shadow-[0_4px_8px_rgba(255,122,0,0.5)]"
              />

              {/* Scatter Node point dots */}
              <circle cx="160" cy="80" r="5" fill="#FF7A00" stroke="#000" strokeWidth="2" />
              <circle cx="320" cy="60" r="5" fill="#FF7A00" stroke="#000" strokeWidth="2" />
              <circle cx="500" cy="20" r="5" fill="#FF7A00" stroke="#000" strokeWidth="2" />
            </svg>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] text-muted font-bold uppercase tracking-wider">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

          </div>

        </div>

        {/* Campus Volume Heatmap (col 5) */}
        <div className="lg:col-span-5 p-6 rounded-[2rem] bg-surface border border-subtle space-y-4">
          <h3 className="font-extrabold text-sm text-main uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4.5 h-4.5 text-amber-500" />
            Campus Orders Activity
          </h3>

          <div className="space-y-4 pt-1.5 text-xs text-left">
            {CAMPUSES.map((c, idx) => {
              const percentages = ['44%', '24%', '15%', '10%', '7%'];
              const orderCounts = [412, 192, 110, 84, 42];
              return (
                <div key={c.id} className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] font-bold text-main/80">
                    <span>{c.fullName} ({c.name})</span>
                    <span className="font-black text-amber-500">{orderCounts[idx]} orders</span>
                  </div>
                  <div className="w-full bg-surface border border-subtle h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-sunset h-full rounded-full"
                      style={{ width: percentages[idx] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
