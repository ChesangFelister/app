
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface SignInButtonProps {
  className?: string;
}

const SignInButton: React.FC<SignInButtonProps> = ({ className }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async (result: ISuccessResult) => {
    if (isAuthenticated || isLoading || isSigningIn) return;
    
    setIsSigningIn(true);
    try {
      // First try to create a new account
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: `worldid_${result.nullifier_hash.substring(0, 16)}@example.com`,
        password: `WID_${result.nullifier_hash}`,
      });

      if (signUpError && signUpError.message !== 'User already registered') {
        toast.error('Sign up failed: ' + signUpError.message);
        return;
      }

      // If user exists, sign in
      if (signUpError && signUpError.message === 'User already registered') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: `worldid_${result.nullifier_hash.substring(0, 16)}@example.com`,
          password: `WID_${result.nullifier_hash}`,
        });

        if (signInError) {
          toast.error('Sign in failed: ' + signInError.message);
          return;
        }
      }

      // Insert verification data into Supabase
      const { data: session } = await supabase.auth.getSession();
      if (session && session.session) {
        const { error } = await supabase
          .from('world_id_verifications')
          .insert({
            user_id: session.session.user.id,
            nullifier_hash: result.nullifier_hash,
            merkle_root: result.merkle_root,
            verification_level: result.verification_level,
          });

        if (error) {
          console.error('Verification error:', error);
          toast.error('Error storing verification: ' + error.message);
          return;
        }
      }

      // Success at this point, either signed up or signed in
      toast.success('Successfully authenticated with World ID');
    } catch (error: any) {
      console.error('Sign in failed', error);
      toast.error(error.message || 'Authentication failed');
    } finally {
      setIsSigningIn(false);
    }
  };

  if (isAuthenticated) {
    return (
      <Button
        className={cn(
          'relative overflow-hidden button-hover bg-gradient-to-r from-tpt-gold to-tpt-blue text-white',
          className
        )}
        disabled={true}
      >
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Verified with World ID</span>
        </div>
      </Button>
    );
  }

  return (
    <IDKitWidget
      app_id="app_efa0e26d7bd45be73d63896ded679bb1"
      action="auth"
      verification_level={VerificationLevel.Orb}
      onSuccess={handleSignIn}
    >
      {({ open }) => (
        <Button
          onClick={open}
          className={cn(
            'relative overflow-hidden button-hover bg-gradient-to-r from-tpt-gold to-tpt-blue text-white hover:opacity-90 transition-opacity',
            className
          )}
          disabled={isSigningIn || isLoading}
        >
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>
              {isSigningIn ? 'Verifying...' : 'Sign in with World ID'}
            </span>
          </div>
          
          {isSigningIn && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </Button>
      )}
    </IDKitWidget>
  );
};

export default SignInButton;
