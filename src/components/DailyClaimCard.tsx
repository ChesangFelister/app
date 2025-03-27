
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface DailyClaimCardProps {
  className?: string;
}

const DailyClaimCard: React.FC<DailyClaimCardProps> = ({ className }) => {
  const { user, claimDailyTokens } = useAuth();
  const [isClaiming, setIsClaiming] = useState(false);
  
  // Check if user has claimed today
  const lastClaim = user?.lastClaim ? new Date(user.lastClaim) : null;
  const today = new Date();
  const hasClaimedToday = lastClaim && 
    lastClaim.getDate() === today.getDate() &&
    lastClaim.getMonth() === today.getMonth() &&
    lastClaim.getFullYear() === today.getFullYear();
  
  const handleClaim = async () => {
    if (isClaiming || hasClaimedToday || !user) return;
    
    setIsClaiming(true);
    try {
      await claimDailyTokens();
    } finally {
      setIsClaiming(false);
    }
  };
  
  // Format last claim time
  const lastClaimText = lastClaim 
    ? `Last claimed: ${lastClaim.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : 'You haven\'t claimed yet';

  return (
    <Card className={cn(
      'glass-card p-6 flex flex-col space-y-4',
      className
    )}>
      <div>
        <h3 className="text-lg font-semibold">Daily Token Claim</h3>
        <p className="text-muted-foreground text-sm">Claim 100 TPT tokens once every day</p>
      </div>
      
      <div className="bg-tpt-blue/5 dark:bg-tpt-blue/10 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-tpt-gold/20 flex items-center justify-center">
            <span className="text-tpt-gold font-bold">100</span>
          </div>
          <div>
            <p className="font-medium">Daily Reward</p>
            <p className="text-xs text-muted-foreground">{lastClaimText}</p>
          </div>
        </div>
        
        <Button
          onClick={handleClaim}
          disabled={isClaiming || hasClaimedToday || !user}
          className={cn(
            'button-hover',
            hasClaimedToday ? 'bg-muted text-muted-foreground' : 'bg-tpt-gold text-white'
          )}
        >
          {isClaiming ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              <span>Claiming...</span>
            </div>
          ) : (
            hasClaimedToday ? 'Claimed Today' : 'Claim 100 TPT'
          )}
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground text-center">
        Next claim available: {hasClaimedToday ? 'Tomorrow' : 'Now'}
      </div>
    </Card>
  );
};

export default DailyClaimCard;
