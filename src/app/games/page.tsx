'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CountdownTimer } from '@/components/CountdownTimer';

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

// Helper for splash delay
function useSplash(steps: number) {
  const [phase, setPhase] = React.useState(0); // 0: intro, 1: splash, 2: timer, 3: splash, 4: timer, ...
  const [showSplash, setShowSplash] = React.useState(true);
  const objIdx = Math.floor((phase - 1) / 2);

  React.useEffect(() => {
    if (phase === 0) return;
    if (phase % 2 === 1) {
      setShowSplash(true);
      const t = setTimeout(() => setShowSplash(false), 1500);
      return () => clearTimeout(t);
    } else {
      setShowSplash(false);
    }
  }, [phase]);

  return { phase, setPhase, showSplash, objIdx };
}

interface Objective {
  name: string;
  duration: number;
  description: string;
}

function LeagueTimerFlow({ objectives, leagueName }: { objectives: Objective[]; leagueName: string }) {
  const { phase, setPhase, showSplash, objIdx } = useSplash(objectives.length);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (phase === objectives.length * 2 + 1 && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [phase, objectives.length]);

  if (phase === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
        <h1 className="text-4xl font-bold text-orange-600 mb-6">{leagueName} Timer</h1>
        <p className="text-xl mb-8">This timer will guide you through all objectives of the competition. Click below to begin!</p>
        <button
          className="px-10 py-4 bg-orange-500 text-white text-2xl font-bold rounded-lg shadow hover:bg-orange-600 transition"
          onClick={() => setPhase(1)}
        >
          Start Competition
        </button>
      </div>
    );
  }
  if (phase === objectives.length * 2 + 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
        <audio ref={audioRef} src="/buzzer.mp3" preload="auto" />
        <h1 className="text-4xl font-bold text-green-600 mb-6">Competition Complete!</h1>
        <p className="text-xl">Well done! All objectives are finished. Judges may now tally scores and assess the field.</p>
      </div>
    );
  }
  if (showSplash) {
    const obj = objectives[objIdx];
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 text-center animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-6 drop-shadow-lg">{obj.name}</h2>
        <p className="text-2xl md:text-3xl font-light text-gray-800 max-w-2xl mx-auto mb-8">{obj.description}</p>
      </div>
    );
  }
  // Timer phase
  const obj = objectives[objIdx];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
      <h2 className="text-3xl font-bold text-orange-600 mb-4">{obj.name}</h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto">{obj.description}</p>
      <CountdownTimer
        onComplete={() => setPhase(phase + 1)}
        isAnimating={true}
        round={objIdx + 1}
        // @ts-ignore
        initialSeconds={obj.duration}
      />
    </div>
  );
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
      {selectedLeague && selectedLeague.key === 'Stars' && !isExploded && (
        <div className="w-full">
          <LeagueTimerFlow
            objectives={[
              {
                name: "Objective 1: Setting Up Battery Structures",
                duration: 90,
                description: "Robots must transport and assemble battery trays and cases from storage to the assembly zone, avoiding AGVs. 3 points per tray, 1 per case, -2 per AGV collision."
              },
              {
                name: "Objective 2: Sorting and Transporting Defective Battery Cells",
                duration: 60,
                description: "Sort defective batteries into the correct recycling bin. Circles: 1pt, Triangles: 2pt, Squares: 3pt, wrong bin: -1pt, functional in bin: -2pt, red X recycled: -5pt."
              },
              {
                name: "Objective 3: Series and Parallel Assembly",
                duration: 120,
                description: "Arrange functional battery cells in series (2pt each) or parallel (each new layer increases points per cell). Only cells stacked at the end count."
              },
              {
                name: "Objective 4: Sealing Packs and Returning to Warehouse",
                duration: 30,
                description: "Enclose battery structures with covers to form packs, return to starting area. 3pt per cover, 3pt per robot back in time, -2pt per AGV collision."
              }
            ]}
            leagueName="STARS League"
          />
        </div>
      )}
      {selectedLeague && selectedLeague.key === 'Tech' && !isExploded && (
        <div className="w-full">
          <LeagueTimerFlow
            objectives={[
              {
                name: "Objective 1: Mining & Transport of Phosphate Rocks",
                duration: 60,
                description: "Extract and transport phosphate rocks (balls) to containers in the mixing zone. 2pt per rock, 5pt for large rock, -3pt for overfilling a container (max 3 rocks)."
              },
              {
                name: "Objective 2: Chemical Processing & Fertilizer Formation",
                duration: 60,
                description: "Add 2 sulfuric acids (orange S discs) and ammonia (A discs) to each container. 2pt per acid/ammonia, +3pt for correct MAP, +4pt for correct DAP, -2pt for defective acid/ammonia."
              },
              {
                name: "Objective 3: Transport & Ship Fertilizer",
                duration: 30,
                description: "Move containers to the correct shipping zone: MAP (yellow), DAP (red), Unfinished (orange). 5pt per correct delivery, -3pt for wrong area."
              }
            ]}
            leagueName="TECH League"
          />
        </div>
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