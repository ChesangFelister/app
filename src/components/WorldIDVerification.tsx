
import React, { useState } from 'react';
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit';
import { Button } from '@/components/ui/button';
import { Shield, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface WorldIDVerificationProps {
  onSuccess?: () => void;
  className?: string;
}

const WorldIDVerification: React.FC<WorldIDVerificationProps> = ({ onSuccess, className }) => {
  const { user, isAuthenticated, setUser } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (result: ISuccessResult) => {
    if (!isAuthenticated || !user) {
      toast.error('You must be signed in to verify with World ID');
      return;
    }

    setIsVerifying(true);

    try {
      // Insert verification data into Supabase
      const { error } = await supabase
        .from('world_id_verifications')
        .insert({
          user_id: user.id,
          nullifier_hash: result.nullifier_hash,
          merkle_root: result.merkle_root,
          verification_level: result.verification_level,
        });

      if (error) {
        console.error('Verification error:', error);
        toast.error('Error storing verification: ' + error.message);
        return;
      }

      // Update the user object
      setUser({
        ...user,
        worldcoinVerified: true
      });

      toast.success('Successfully verified with World ID!');
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('An unexpected error occurred during verification');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className={className}>
      {user?.worldcoinVerified ? (
        <div className="flex items-center gap-2 p-4 border border-green-500/30 bg-green-500/10 rounded-md backdrop-blur-sm shadow-lg">
          <Check className="h-5 w-5 text-green-400" />
          <span className="text-sm font-medium text-green-300">Verified with World ID</span>
        </div>
      ) : (
        <IDKitWidget
          app_id="app_efa0e26d7bd45be73d63896ded679bb1"
          action="verification"
          verification_level={VerificationLevel.Orb}
          onSuccess={handleVerify}
        >
          {({ open }) => (
            <Button 
              onClick={open} 
              className="w-full relative button-hover bg-gradient-to-r from-purple-500 via-tpt-gold to-tpt-blue text-white hover:opacity-90 transition-opacity border border-white/10 shadow-lg" 
              disabled={isVerifying}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>{isVerifying ? 'Verifying...' : 'Verify with World ID'}</span>
              </div>
              
              {isVerifying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-md">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </Button>
          )}
        </IDKitWidget>
      )}
    </div>
  );
};

export default WorldIDVerification;
