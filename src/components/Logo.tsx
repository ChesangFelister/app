
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animationDelay?: number;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md', 
  animationDelay = 0
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div 
      className={cn(
        'relative rounded-full overflow-hidden animate-scale-in',
        sizeClasses[size],
        className
      )}
      style={{ 
        animationDelay: `${animationDelay}ms`,
        animationFillMode: 'both' 
      }}
    >
      <img 
        src="https://assets.onecompiler.app/42p32vw56/43b38xwbq/1000035087.png" 
        alt="TraderPulse Token" 
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default Logo;
