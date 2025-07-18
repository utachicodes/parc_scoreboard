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

function LeagueTimerFlow({ objectives, leagueName, onBack }: { objectives: Objective[]; leagueName: string; onBack: () => void }) {
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
        <button
          className="mt-6 px-8 py-2 bg-white text-orange-600 border-2 border-orange-400 text-lg font-bold rounded-full hover:bg-orange-50 transition-all"
          onClick={onBack}
        >
          Back to League Select
        </button>
      </div>
    );
  }
  if (phase === objectives.length * 2 + 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
        <audio ref={audioRef} src="/buzzer.mp3" preload="auto" />
        <h1 className="text-4xl font-bold text-orange-600 mb-6">Competition Complete!</h1>
        <p className="text-xl mb-6">Well done! All objectives are finished. Judges may now tally scores and assess the field.</p>
        <button
          className="mt-6 px-8 py-2 bg-white text-orange-600 border-2 border-orange-400 text-lg font-bold rounded-full hover:bg-orange-50 transition-all"
          onClick={onBack}
        >
          Back to League Select
        </button>
      </div>
    );
  }
  if (showSplash) {
    const obj = objectives[objIdx];
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center animate-fade-in p-0 m-0">
        <h2 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-2 drop-shadow-lg whitespace-pre-line" style={{margin:0}}>{obj.name}</h2>
        <p className="text-lg md:text-xl font-light text-gray-800 max-w-2xl mx-auto mb-2 whitespace-pre-line" style={{margin:0}}>{obj.description}</p>
      </div>
    );
  }
  // Timer phase
  const obj = objectives[objIdx];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-0 m-0">
      <h2 className="text-3xl font-bold text-orange-600 mb-2 whitespace-pre-line" style={{margin:0}}>{obj.name}</h2>
      <p className="text-lg mb-2 max-w-2xl mx-auto whitespace-pre-line" style={{margin:0}}>{obj.description}</p>
      <CountdownTimer
        onComplete={() => setPhase(phase + 1)}
        isAnimating={true}
        round={objIdx + 1}
        initialSeconds={obj.duration}
      />
    </div>
  );
}

export default function GamesTimerPage() {
  const [selectedLeague, setSelectedLeague] = useState<{ name: string; key: string; gradient: string; text: string } | null>(null);
  const router = useRouter();

  const handleLeagueSelect = (league: typeof LEAGUES[number]) => {
    setSelectedLeague(league);
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
      {selectedLeague && selectedLeague.key === 'Stars' && (
        <div className="w-full p-0 m-0">
          <LeagueTimerFlow
            objectives={[
              {
                name: "Objective 1: Setting Up Battery Structures",
                duration: 90, // 1 min 30s
                description: "Transport and assemble battery trays and cases from storage to the assembly zone. Avoid AGVs. 3 points per tray, 1 per case, -2 per AGV collision."
              },
              {
                name: "Objective 2: Sorting and Transporting Defective Battery Cells",
                duration: 60, // 1 min
                description: "Sort defective batteries into the correct recycling bin. Circles: 1pt, Triangles: 2pt, Squares: 3pt, wrong bin: -1pt, functional in bin: -2pt, red X recycled: -5pt."
              },
              {
                name: "Objective 3: Battery Assembly",
                duration: 120, // 2 min
                description: "Arrange functional battery cells in series (2pt each) or parallel (each new layer increases points per cell). Only cells stacked at the end count."
              },
              {
                name: "Objective 4: Sealing Packs and Returning to Warehouse",
                duration: 30, // 30 sec
                description: "Enclose battery structures with covers to form packs, return to starting area. 3pt per cover, 3pt per robot back in time, -2pt per AGV collision."
              }
            ]}
            leagueName="STARS League"
            onBack={() => setSelectedLeague(null)}
          />
        </div>
      )}
      {selectedLeague && selectedLeague.key === 'Tech' && (
        <div className="w-full p-0 m-0">
          <LeagueTimerFlow
            objectives={[
              {
                name: "Objective 1: Mining & Transport of Phosphate Rocks",
                duration: 60, // 1 min
                description: "Extract and transport phosphate rocks to containers in the mixing zone. Max 3 per container. Large rock bonus. Over limit penalty."
              },
              {
                name: "Objective 2: Chemical Processing & Fertilizer Formation",
                duration: 60, // 1 min
                description: "Add 2 sulfuric acids (S discs) and ammonia (A discs) to each container. Avoid defective discs. Produce MAP/DAP. Defective penalty."
              },
              {
                name: "Objective 3: Transport & Ship Fertilizer",
                duration: 30, // 30 sec
                description: "Move containers to correct shipping zone (MAP, DAP, Unfinished). Correct delivery bonus. Wrong area penalty."
              }
            ]}
            leagueName="TECH League"
            onBack={() => setSelectedLeague(null)}
          />
        </div>
      )}
    </div>
  );
} 