import React from 'react';
import { useApp, UserRole } from '@/context/AppContext';
import { StudentDashboard } from './StudentDashboard';
import { VendorDashboard } from './VendorDashboard';
import { AdminDashboard } from './AdminDashboard';
import { ShieldCheck, User, Store, Award } from 'lucide-react';

export const DashboardsContainer: React.FC = () => {
  const { role, setRole } = useApp();

  const getActiveDashboard = () => {
    switch (role) {
      case 'student':
        return <StudentDashboard />;
      case 'vendor':
        return <VendorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };

  const roles = [
    { id: 'student', name: 'Student Panel', icon: User },
    { id: 'vendor', name: 'Vendor Portal', icon: Store },
    { id: 'admin', name: 'Admin Console', icon: ShieldCheck }
  ];

  return (
    <div className="relative min-h-screen bg-background pt-8 pb-24 md:pb-16 text-left">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] ambient-glow-orange opacity-25 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Dynamic header toggler */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-subtle pb-6">
          <div className="space-y-1">
            <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-[0.2em]">Operational Centers</span>
            <h1 className="text-3xl font-black text-main leading-none">Management Center</h1>
          </div>

          {/* Quick role-switch pills */}
          <div className="flex gap-2 bg-surface p-1.5 rounded-2xl border border-subtle w-fit">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id as UserRole)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
                    role === r.id
                      ? 'bg-gradient-sunset text-white shadow-md'
                      : 'text-muted hover:text-main'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{r.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Render child dashboard */}
        <div className="pt-2">
          {getActiveDashboard()}
        </div>

      </div>
    </div>
  );
};
export default DashboardsContainer;
