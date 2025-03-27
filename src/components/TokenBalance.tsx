
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import Logo from './Logo';
import { cn } from '@/lib/utils';

interface TokenBalanceProps {
  className?: string;
  size?: 'sm' | 'lg';
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ 
  className,
  size = 'lg'
}) => {
  const { user } = useAuth();
  const balance = user?.balance ?? 0;
  
  const isSmall = size === 'sm';

  return (
    <Card className={cn(
      'glass-card overflow-hidden relative',
      isSmall ? 'p-4' : 'p-6',
      className
    )}>
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-tpt-gold/10 rounded-full blur-2xl" />
      
      <div className={cn(
        'flex items-center',
        isSmall ? 'gap-3' : 'gap-4'
      )}>
        <Logo size={isSmall ? 'sm' : 'md'} />
        
        <div>
          <p className={cn(
            'text-muted-foreground font-medium',
            isSmall ? 'text-sm' : 'text-base'
          )}>
            Your Balance
          </p>
          
          <div className="flex items-baseline gap-1">
            <span className={cn(
              'font-bold tracking-tight',
              isSmall ? 'text-2xl' : 'text-4xl'
            )}>
              {balance.toLocaleString()}
            </span>
            <span className={cn(
              'text-tpt-gold font-semibold',
              isSmall ? 'text-sm' : 'text-base'
            )}>
              TPT
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TokenBalance;
