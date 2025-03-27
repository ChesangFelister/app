
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import TokenBalance from '@/components/TokenBalance';
import DailyClaimCard from '@/components/DailyClaimCard';
import SavingsCard from '@/components/SavingsCard';
import NavigationBar from '@/components/NavigationBar';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // If not authenticated and not loading, redirect to home
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/" replace />;
  }

  // If still loading, show a loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-tpt-gold/30 border-t-tpt-gold rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <NavigationBar />
        
        <main className="container mx-auto px-4 py-6 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <TokenBalance className="lg:col-span-2" />
            
            <div className="glass-card p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">Quick Actions</h3>
                <p className="text-muted-foreground text-sm">Manage your TPT tokens</p>
              </div>
              
              <div className="space-y-3 mt-4">
                <Button className="w-full button-hover bg-tpt-gold text-white hover:bg-tpt-gold/90">
                  Transfer Tokens
                </Button>
                
                <Button variant="outline" className="w-full button-hover">
                  Transaction History
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DailyClaimCard />
            <SavingsCard />
          </div>
          
          <div className="mt-6 glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">External Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Button variant="outline" className="w-full justify-start gap-2 button-hover" asChild>
                <a href="https://www.tradepulsetoken.com/" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                  Official Website
                </a>
              </Button>
              
              <Button variant="outline" className="w-full justify-start gap-2 button-hover" asChild>
                <a href="https://t.me/tradepulsetpt" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  Telegram Community
                </a>
              </Button>
              
              <Button variant="outline" className="w-full justify-start gap-2 button-hover">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                Help Center
              </Button>
            </div>
          </div>
        </main>
        
        <footer className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} TraderPulse Token. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
