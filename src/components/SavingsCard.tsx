
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface SavingsCardProps {
  className?: string;
}

const SavingsCard: React.FC<SavingsCardProps> = ({ className }) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  
  const handleStake = async () => {
    if (!user || isStaking || !amount) return;
    
    const stakingAmount = Number(amount);
    if (isNaN(stakingAmount) || stakingAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (stakingAmount > user.balance) {
      toast.error('Insufficient balance');
      return;
    }
    
    setIsStaking(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Successfully staked ${stakingAmount} TPT`);
      setAmount('');
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <Card className={cn(
      'glass-card p-6 flex flex-col space-y-4',
      className
    )}>
      <div>
        <h3 className="text-lg font-semibold">Savings</h3>
        <p className="text-muted-foreground text-sm">Earn 5% APY by staking your tokens</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-tpt-blue/5 dark:bg-tpt-blue/10 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Annual Yield</span>
            <span className="font-medium text-tpt-gold">5% APY</span>
          </div>
          
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-tpt-gold rounded-full w-1/3"></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="stake-amount" className="text-sm font-medium">Stake Amount</label>
          <div className="flex space-x-2">
            <Input
              id="stake-amount"
              type="number"
              placeholder="Amount to stake"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-background"
              min={1}
              max={user?.balance ?? 0}
              disabled={isStaking || !user}
            />
            <Button
              onClick={handleStake}
              disabled={isStaking || !user || !amount}
              className="button-hover"
            >
              {isStaking ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span>Staking...</span>
                </div>
              ) : (
                'Stake'
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Available: {user?.balance.toLocaleString() ?? 0} TPT
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SavingsCard;
