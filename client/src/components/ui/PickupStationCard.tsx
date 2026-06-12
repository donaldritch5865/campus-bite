import React from 'react';
import { MapPin, Clock } from 'lucide-react';

interface PickupStationCardProps {
  campusName: string;
  stationName: string;
  pickupWindow: string;
  statusText?: string;
  statusType?: 'pending' | 'ready' | 'active';
  className?: string;
}

export const PickupStationCard: React.FC<PickupStationCardProps> = ({
  campusName,
  stationName,
  pickupWindow,
  statusText,
  statusType = 'pending',
  className = ''
}) => {
  const getStatusColor = () => {
    switch (statusType) {
      case 'ready': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'active': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      default: return 'text-muted bg-surface-elevated border-subtle';
    }
  };

  return (
    <div className={`p-5 rounded-2xl glass-panel-heavy border border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left ${className}`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center border border-subtle shrink-0">
          <MapPin className="w-6 h-6 text-[#FF5C00]" />
        </div>
        <div>
          <h4 className="font-black text-main text-sm uppercase tracking-wider">{campusName} PICKUP POINT</h4>
          <div className="text-xs text-muted font-bold mt-1">Location: <span className="text-main">{stationName}</span></div>
          <div className="flex items-center gap-1.5 text-[10px] text-muted font-bold mt-1.5 uppercase tracking-wider">
            <Clock className="w-3 h-3 text-amber-500" />
            Window: {pickupWindow}
          </div>
        </div>
      </div>
      
      {statusText && (
        <div className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider shrink-0 ${getStatusColor()}`}>
          {statusText}
        </div>
      )}
    </div>
  );
};
