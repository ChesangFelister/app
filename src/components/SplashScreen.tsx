
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import AnimatedBackground from './AnimatedBackground';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 600);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500',
      isExiting ? 'opacity-0' : 'opacity-100'
    )}>
      <AnimatedBackground />
      
      <div className="relative z-10 flex flex-col items-center space-y-6">
        <Logo size="xl" />
        
        <div className="flex flex-col items-center space-y-2 animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            TraderPulse Token
          </h1>
          <p className="text-muted-foreground text-balance text-center max-w-xs">
            Your digital asset, reimagined
          </p>
        </div>
        
        <div 
          className="animate-slide-up flex items-center justify-center w-8 h-8"
          style={{ animationDelay: '400ms', animationFillMode: 'both' }}
        >
          <div className="w-5 h-5 border-t-2 border-r-2 border-tpt-gold rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
