'use client';

import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Staggered animations for clean reveal
    setTimeout(() => setShowWelcome(true), 300);
    setTimeout(() => setShowTitle(true), 1200);
    setTimeout(() => setShowLogo(true), 2400);
    setTimeout(() => setShowButton(true), 3200);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/30 to-white" />
      
      {/* Welcome Text */}
      <div className="text-center mb-20 relative z-10">
        <div className={`transition-all duration-1000 ease-out ${
          showWelcome ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-3xl font-light text-gray-600 mb-4 tracking-wide">
            Ladies and Gentlemen,
          </h1>
        </div>
        
        <div className={`transition-all duration-1000 ease-out ${
          showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl font-light text-gray-500 mb-2">
            Welcome to the
          </h2>
          <h3 className="text-6xl font-thin text-gray-900 tracking-tight">
            2025 PARC
          </h3>
          <h4 className="text-4xl font-light text-gray-700 mt-2">
            Tech League
          </h4>
        </div>
      </div>

      {/* Clean Logo */}
      <div className={`mb-24 transition-all duration-800 ease-out ${
        showLogo ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
      }`}>
        <img 
          src="/parc-just_logo.png" 
          alt="PARC Logo" 
          className="h-24 w-auto mx-auto filter drop-shadow-sm"
        />
      </div>

      {/* Minimal Button */}
      <div className={`transition-all duration-600 ease-out ${
        showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <button
          onClick={onStart}
          className="group px-8 py-3 bg-gray-900 text-white text-lg font-light rounded-full transition-all duration-300 hover:bg-gray-800 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center space-x-3">
            <Play className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            <span>Let's Start</span>
          </div>
        </button>
      </div>
    </div>
  );
};