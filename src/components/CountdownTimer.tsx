'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  onComplete: () => void;
  isAnimating: boolean;
  round: number;
  initialSeconds?: number; // Add this prop
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ onComplete, isAnimating, round, initialSeconds = 15 * 60 }) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds); // Use initialSeconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeLeft(initialSeconds); // Reset timer if initialSeconds changes
  }, [initialSeconds]);

  useEffect(() => {
    if (isAnimating) {
      setTimeout(() => {
        setIsActive(true);
      }, 1000);
    }
  }, [isAnimating]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft <= 1) {
            setIsActive(false);
            return 0;
          }
          return timeLeft - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // Call onComplete only when timeLeft reaches 0
  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
    }
  }, [timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 5) return 'text-orange-500'; // Orange for last 5 seconds
    if (timeLeft <= 60) return 'text-red-500';
    if (timeLeft <= 300) return 'text-orange-500';
    return 'text-gray-900';
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* Clean background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/10 to-white" />
      
      <div className="text-center relative z-10">
        {/* Clean timer display */}
        <div className={`text-[8rem] font-thin font-mono tracking-tight transition-colors duration-500 ${getTimeColor()}${timeLeft <= 5 ? ' animate-pulse' : ''}`}>
          {formatTime(timeLeft)}
        </div>
        
        {/* Clean progress bar */}
        <div className="mt-12 w-80 h-0.5 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full bg-gray-900 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${((initialSeconds - timeLeft) / initialSeconds) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};