'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 via-orange-100 to-white">
      <img 
        src="/parc-just_logo.png" 
        alt="PARC Logo" 
        className="h-48 w-auto mb-8 animate-rumble drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 0 40px #ff8800)' }}
      />
      <h1 
        className="text-4xl md:text-6xl font-extrabold text-center text-orange-600 mb-2 tracking-tight"
        style={{ letterSpacing: '0.01em' }}
      >
        Welcome to the Pan African Robotics Competition
      </h1>
      <h2 className="text-lg md:text-xl font-medium text-center text-orange-700 mb-10" style={{fontWeight: 500}}>
        The Stars and Tech League Begins!
      </h2>
      <button
        onClick={() => router.push('/games')}
        className="px-12 py-6 bg-orange-500 text-white text-3xl font-bold rounded-full shadow-lg hover:bg-orange-600 transition-all animate-pulse mb-8"
      >
        Start the Games
      </button>
    </div>
  );
}