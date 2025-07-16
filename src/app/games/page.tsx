'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LEAGUES = [
  { name: 'Tech League', key: 'Tech', gradient: '', text: 'text-orange-600' },
  { name: 'Stars League', key: 'Stars', gradient: '', text: 'text-orange-600' },
];
const TIMER_DURATIONS_KEY = 'parc_timer_durations';

function getLeagueDuration(leagueKey: string) {
  if (typeof window === 'undefined') return 90;
  try {
    const data = localStorage.getItem(TIMER_DURATIONS_KEY);
    if (data) {
      const durations = JSON.parse(data);
      return durations[leagueKey] || 90;
    }
  } catch {}
  return 90;
}

export default function GamesTimerPage() {
  const [selectedLeague, setSelectedLeague] = useState<{ name: string; key: string; gradient: string; text: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isExploded, setIsExploded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (selectedLeague) {
      setTimeLeft(getLeagueDuration(selectedLeague.key));
    }
  }, [selectedLeague]);

  useEffect(() => {
    if (selectedLeague && timeLeft > 0) {
      const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (selectedLeague && timeLeft === 0) {
      setTimeout(() => setIsExploded(true), 800); // short delay for effect
    }
  }, [selectedLeague, timeLeft]);

  const handleLeagueSelect = (league: typeof LEAGUES[number]) => {
    setSelectedLeague(league);
    setIsExploded(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <img 
        src="/parc-just_logo.png" 
        alt="PARC Logo" 
        className="h-32 w-auto mb-8"
        style={{ filter: 'none' }}
      />
      {!selectedLeague && (
        <div className="flex flex-col items-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-8">Select a League to Start</h2>
          <div className="flex gap-12">
            {LEAGUES.map(league => (
              <button
                key={league.name}
                onClick={() => handleLeagueSelect(league)}
                className={`px-14 py-8 bg-white text-orange-600 border-2 border-orange-400 text-3xl font-extrabold rounded-3xl hover:bg-orange-50 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-200`}
                style={{ minWidth: 260, letterSpacing: '0.02em' }}
              >
                {league.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedLeague && !isExploded && (
        <>
          <div className={`text-2xl md:text-3xl font-semibold mb-4 ${selectedLeague.text}`}>{selectedLeague.name}</div>
          <div className={`text-[8rem] md:text-[12rem] font-extrabold text-orange-600 mb-8 transition-all duration-300 ${timeLeft <= 30 ? 'animate-shake' : ''}`}
            style={{letterSpacing: '0.05em', textShadow: '0 0 32px #ff8800'}}>
            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </>
      )}
      {selectedLeague && isExploded && (
        <div className="flex flex-col items-center">
          <div className="text-[5rem] md:text-[8rem] font-extrabold text-orange-600 mb-6" style={{textShadow: 'none'}}>
            Time is Up!
          </div>
          <button
            onClick={() => { setSelectedLeague(null); setTimeLeft(90); setIsExploded(false); }}
            className="px-8 py-4 bg-white text-orange-600 border-2 border-orange-400 text-2xl font-bold rounded-full hover:bg-orange-50 transition-all mt-8"
          >
            Back to League Select
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-8 py-4 bg-white text-orange-600 border-2 border-orange-400 text-xl font-bold rounded-full hover:bg-orange-50 transition-all mt-4"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
} 