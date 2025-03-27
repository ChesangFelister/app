
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavigationBarProps {
  className?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ className }) => {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <nav className={cn(
      'w-full p-4 flex items-center justify-between bg-background/80 backdrop-blur-sm sticky top-0 z-30',
      className
    )}>
      <Link to="/" className="flex items-center gap-2 button-hover">
        <Logo size="sm" />
        <span className="font-semibold">TraderPulse</span>
      </Link>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
          className="text-sm"
        >
          <a 
            href="https://www.tradepulsetoken.com/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Website
          </a>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
          className="text-sm"
        >
          <a 
            href="https://t.me/tradepulsetpt" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Telegram
          </a>
        </Button>
        
        {isAuthenticated && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={signOut}
            className="text-sm"
          >
            Sign Out
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
