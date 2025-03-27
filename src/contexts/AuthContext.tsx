
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  worldcoinVerified: boolean;
  balance: number;
  lastClaim: Date | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => void;
  claimDailyTokens: () => Promise<boolean>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Error getting session:', error);
          setIsLoading(false);
          return;
        }

        if (session) {
          // Fetch World ID verification status
          const { data: verifications, error: verificationError } = await supabase
            .from('world_id_verifications')
            .select('*')
            .eq('user_id', session.user.id)
            .maybeSingle();

          if (verificationError) {
            console.error('Error fetching verification status:', verificationError);
          }

          if (!verifications) {
            // If no World ID verification, sign out the user
            await supabase.auth.signOut();
            setUser(null);
            setIsLoading(false);
            return;
          }

          setUser({
            id: session.user.id,
            worldcoinVerified: true, // Must be true if we get here
            balance: 0, // This would be fetched from your balance table
            lastClaim: null
          });
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('tpt_user');
        toast.info('You have been signed out');
      } else if (event === 'SIGNED_IN' && session) {
        // When signed in, fetch verification status
        const fetchVerificationStatus = async () => {
          try {
            const { data: verifications, error: verificationError } = await supabase
              .from('world_id_verifications')
              .select('*')
              .eq('user_id', session.user.id)
              .maybeSingle();

            if (verificationError) {
              console.error('Error fetching verification status:', verificationError);
            }

            if (!verifications) {
              // If no World ID verification, sign out the user
              await supabase.auth.signOut();
              toast.error('World ID verification required');
              return;
            }

            setUser({
              id: session.user.id,
              worldcoinVerified: true,
              balance: 0, // This would be fetched from your balance table
              lastClaim: null
            });
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };

        fetchVerificationStatus();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('tpt_user', JSON.stringify(user));
    }
  }, [user]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // The auth state change handler will clear the user
    } catch (error: any) {
      console.error('Sign out failed', error);
      toast.error(error.message || 'Sign out failed');
    }
  };

  const claimDailyTokens = async (): Promise<boolean> => {
    if (!user) return false;
    
    // Check if already claimed today
    const now = new Date();
    if (user.lastClaim) {
      const lastClaimDate = new Date(user.lastClaim);
      const isSameDay = 
        lastClaimDate.getDate() === now.getDate() &&
        lastClaimDate.getMonth() === now.getMonth() &&
        lastClaimDate.getFullYear() === now.getFullYear();
      
      if (isSameDay) {
        toast.error('You have already claimed your tokens today');
        return false;
      }
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update user with new balance and claim timestamp
    setUser({
      ...user,
      balance: user.balance + 100,
      lastClaim: now
    });
    
    toast.success('Successfully claimed 100 TPT tokens');
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signOut,
        claimDailyTokens,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
