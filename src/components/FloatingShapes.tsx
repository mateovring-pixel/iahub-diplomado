import React from 'react';

export const FloatingShapes: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-80">
      
      {/* Background Subtle Grid Lines */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
      />

      {/* Top Left Peach Sphere - Flat clean design */}
      <div 
        className="absolute top-[12%] left-[4%] sm:left-[6%] w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#f8a87c] to-[#e86b52] opacity-70 transition-transform duration-700 hover:scale-105" 
      />

      {/* Mid Left Teal Squircle */}
      <div 
        className="absolute top-[36%] left-[2%] sm:left-[3%] w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-[#38bdf8] to-[#0f766e] opacity-65 -rotate-12" 
      />

      {/* Bottom Left Mint Green Circle */}
      <div 
        className="absolute top-[64%] left-[4%] sm:left-[5%] w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#41d88a] to-[#228b57] opacity-65" 
      />

      {/* Top Right Purple Torus / Ring */}
      <div 
        className="absolute top-[10%] right-[5%] sm:right-[7%] w-24 h-24 sm:w-32 sm:h-32 rounded-full border-[12px] border-[#9333ea]/60 opacity-70" 
      />

      {/* Mid Right Purple Triangle */}
      <div 
        className="absolute top-[40%] right-[3%] sm:right-[4%] w-14 h-14 sm:w-18 sm:h-18 bg-gradient-to-br from-[#a855f7] to-[#7e22ce] opacity-70"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
      />

      {/* Bottom Right Pink/Purple Capsule Pill */}
      <div 
        className="absolute top-[70%] right-[4%] sm:right-[6%] w-24 h-10 sm:w-32 sm:h-12 rounded-full bg-gradient-to-r from-[#d946ef] to-[#8b5cf6] -rotate-[20deg] opacity-65" 
      />

      {/* Center Soft Subtle Ambient Backdrop */}
      <div 
        className="absolute top-[30%] left-[50%] -translate-x-[50%] w-[500px] h-[300px] rounded-full bg-purple-900/5 blur-[90px] pointer-events-none" 
      />
    </div>
  );
};
