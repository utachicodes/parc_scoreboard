'use client';

import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface RoundTransitionProps {
  round: number;
  onStart: () => void;
}

export const RoundTransition: React.FC<RoundTransitionProps> = ({ round, onStart }) => {
  const [showRound, setShowRound] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowRound(true), 200);
    setTimeout(() => setShowButton(true), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative">
      {/* Clean background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/20 to-white" />
      
      {/* Minimal Round Display */}
      <div className={`text-center mb-20 transition-all duration-800 ease-out ${
        showRound ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <h1 className="text-7xl font-thin text-gray-900 mb-8 tracking-wider">
          ROUND
        </h1>
        <div className="text-[10rem] font-ultralight text-gray-800 leading-none">
          {round}
        </div>
      </div>

      {/* Clean Start Button */}
      <div className={`transition-all duration-600 ease-out ${
        showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <button
          onClick={onStart}
          className="group px-10 py-4 bg-gray-900 text-white text-xl font-light rounded-full transition-all duration-300 hover:bg-gray-800 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center space-x-4">
            <Play className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
            <span>Start Round {round}</span>
          </div>
        </button>
      </div>
    </div>
  );
};