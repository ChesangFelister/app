
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import SplashScreen from '@/components/SplashScreen';
import Logo from '@/components/Logo';
import SignInButton from '@/components/SignInButton';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useAuth } from '@/contexts/AuthContext';
import { GithubIcon, GlobeIcon, SendIcon } from 'lucide-react';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Check if we've already shown the splash screen before
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem('hasSeenSplash', 'true');
    }
  }, []);

  // Redirect to dashboard if authenticated
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      <main className="min-h-screen relative">
        <AnimatedBackground />
        
        <div className="relative z-10 container mx-auto px-4 py-10 min-h-screen flex flex-col">
          <header className="mb-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="font-bold text-lg gradient-text neon-glow">TraderPulse Token</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                asChild
                className="text-sm hover:bg-white/10 hover:text-purple-400 transition-colors"
              >
                <a 
                  href="https://www.tradepulsetoken.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <GlobeIcon className="h-4 w-4 mr-1" />
                  Website
                </a>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                asChild
                className="text-sm hover:bg-white/10 hover:text-tpt-gold transition-colors"
              >
                <a 
                  href="https://t.me/tradepulsetpt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <SendIcon className="h-4 w-4 mr-1" />
                  Telegram
                </a>
              </Button>
            </div>
          </header>
          
          <div className="flex flex-col md:flex-row items-center justify-center flex-grow gap-12 py-10">
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-6 animate-fade-in">
              <div className="text-center md:text-left space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text neon-glow">
                  The future of digital finance
                </h1>
                <p className="text-muted-foreground text-lg max-w-md">
                  Claim, trade, and save your TraderPulse Tokens with unprecedented security and simplicity.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <SignInButton className="flex-1" />
                
                <Button 
                  variant="outline" 
                  className="flex-1 button-hover border-purple-500/30 text-purple-400 hover:text-tpt-gold hover:border-tpt-gold/30 bg-black/40"
                  asChild
                >
                  <a 
                    href="https://www.tradepulsetoken.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground pt-4 flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-tpt-blue animate-pulse"></div>
                Secured exclusively through World ID verification
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center md:justify-end animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-purple-500/20 via-tpt-gold/20 to-tpt-blue/30 blur-lg animate-pulse-slow"></div>
                <div className="relative rounded-xl overflow-hidden glass-card p-6 md:p-8">
                  <div className="w-64 h-64 relative">
                    <img 
                      src="https://assets.onecompiler.app/42p32vw56/43b38xwbq/1000035087.png" 
                      alt="TraderPulse Token" 
                      className="w-full h-full object-contain animate-float"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <footer className="py-6 text-center text-sm text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-4 mb-2">
              <a href="#" className="text-purple-400 hover:underline">Terms</a>
              <a href="#" className="text-tpt-gold hover:underline">Privacy</a>
              <a href="#" className="text-tpt-blue hover:underline">Support</a>
            </div>
            © {new Date().getFullYear()} TraderPulse Token. All rights reserved.
          </footer>
        </div>
      </main>
    </>
  );
};

export default Index;
