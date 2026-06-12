import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CutoffTimerProps {
  cutoffTimeStr: string; // e.g. "11:00 AM" or "None"
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CutoffTimer: React.FC<CutoffTimerProps> = ({ cutoffTimeStr, className = "", size = 'md' }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (cutoffTimeStr === 'None') {
      setTimeLeft('No cutoff');
      return;
    }

    const calculateTimeLeft = () => {
      // Simulate current time around 9:00 AM for demonstration purposes
      const now = new Date();
      now.setHours(9, 0, 0, 0); 
      // In a real app, this would use the actual Date()
      // But since we want to always show the countdown ticking for the MVP, 
      // we'll calculate based on an arbitrary "now" or just use real now if it's before cutoff.
      
      const realNow = new Date();
      
      // Parse cutoffTimeStr (e.g. "11:00 AM")
      const [time, modifier] = cutoffTimeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      
      const cutoffDate = new Date();
      cutoffDate.setHours(hours, minutes || 0, 0, 0);

      const diff = cutoffDate.getTime() - realNow.getTime();

      if (diff <= 0) {
        setIsClosed(true);
        setTimeLeft('Orders Closed');
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setIsUrgent(h < 1); // Urgent if less than 1 hour

      setTimeLeft(
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      );
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [cutoffTimeStr]);

  if (cutoffTimeStr === 'None') return null;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-1 gap-1',
    md: 'text-xs px-3 py-1.5 gap-1.5',
    lg: 'text-sm sm:text-base px-4 py-2 gap-2'
  };

  const bgClasses = isClosed 
    ? 'bg-neutral-800 text-neutral-400 border-neutral-700' 
    : isUrgent 
      ? 'bg-red-500/10 text-red-500 border-red-500/30' 
      : 'bg-[#FF5C00]/10 text-[#FF5C00] border-[#FF5C00]/30';

  return (
    <div className={`inline-flex items-center font-black uppercase tracking-wider rounded-xl border backdrop-blur-sm ${bgClasses} ${sizeClasses[size]} ${className}`}>
      <Clock className={`${size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3 h-3'}`} />
      <span>{isClosed ? 'Closed' : `Closes in ${timeLeft}`}</span>
    </div>
  );
};
