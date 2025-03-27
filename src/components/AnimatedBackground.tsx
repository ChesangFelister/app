
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-tpt-blue/20 to-purple-900/10"></div>
      
      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tpt-gold/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-3/4 right-1/3 w-72 h-72 bg-blue-600/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Glowing stars */}
      <div className="absolute top-1/5 left-1/6 w-1 h-1 bg-white rounded-full animate-pulse"></div>
      <div className="absolute top-2/5 left-3/5 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-4/5 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute top-3/5 left-4/5 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
      <div className="absolute top-1/6 left-2/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

export default AnimatedBackground;
