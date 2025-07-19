"use client";
import React, { useEffect, useState } from "react";

interface Score {
  id: string;
  team: string;
  round: string;
  league: string;
  score: number | string;
  [key: string]: any;
}

const LEAGUES = [
  { key: 'Tech', label: 'Tech League' },
  { key: 'Stars', label: 'Stars League' },
];

export default function PublicScoreboard() {
  const [scores, setScores] = useState<Score[]>([]);
  const [selectedLeague, setSelectedLeague] = useState('Tech');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScores() {
      setLoading(true);
      try {
        const [techResponse, starsResponse] = await Promise.all([
          fetch('/api/tech-scores'),
          fetch('/api/stars-scores')
        ]);
        
        const tech = await techResponse.json();
        const stars = await starsResponse.json();
        
        const all = [
          ...(tech || []).map((s: any) => ({ ...s, league: 'Tech' })),
          ...(stars || []).map((s: any) => ({ ...s, league: 'Stars' })),
        ];
        setScores(all);
      } catch (error) {
        console.error('Error fetching scores:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchScores();
    
    // Refresh data every 5 seconds
    const interval = setInterval(fetchScores, 5000);
    return () => clearInterval(interval);
  }, []);

  // Group scores by round, sort each group by score descending
  const leagueScores = scores.filter(s => s.league === selectedLeague);
  const rounds = Array.from(new Set(leagueScores.map(s => s.round).filter(Boolean)));
  const scoresByRound = rounds.map(round => {
    const entries = leagueScores
      .filter(s => s.round === round)
      .sort((a, b) => {
        const aScore = a.score === 'Disqualified' ? -9999 : Number(a.score);
        const bScore = b.score === 'Disqualified' ? -9999 : Number(b.score);
        return bScore - aScore;
      });
    return { round, entries };
  });

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-slate-50 relative overflow-x-hidden">
      <img 
        src="/parc-just_logo.png" 
        alt="PARC Logo" 
        className="h-32 w-auto mt-8 mb-4 drop-shadow-2xl animate-rumble"
        style={{ filter: 'drop-shadow(0 0 40px #ff8800)' }}
      />
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-gray-900 tracking-tight">Scoreboard</h1>
      {/* League Tabs */}
      <div className="flex gap-6 mb-8">
        {LEAGUES.map(league => (
          <button
            key={league.key}
            onClick={() => setSelectedLeague(league.key)}
            className={`px-6 py-2 rounded-lg font-semibold text-base border transition-all duration-200 ${selectedLeague === league.key ? 'border-orange-500 text-orange-500 bg-white shadow' : 'border-gray-200 text-gray-700 bg-gray-100 hover:border-orange-300 hover:text-orange-500'}`}
          >
            {league.label}
          </button>
        ))}
      </div>
      {/* Scoreboard Table */}
      <div className="w-full max-w-4xl mx-auto space-y-12">
        {scoresByRound.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No entries found</div>
        ) : (
          scoresByRound.map(({ round, entries }) => (
            <div key={round} className="bg-white rounded-2xl shadow-lg p-6 border-t-8 border-orange-400">
              <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-3">
                <span className="inline-block w-6 h-6 bg-orange-400 rounded-full"></span>
                {round}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-2 px-2 text-gray-500 font-semibold">Rank</th>
                      <th className="py-2 px-2 text-gray-500 font-semibold">Team</th>
                      <th className="py-2 px-2 text-gray-500 font-semibold">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="text-center py-8 text-gray-400">No teams in this round</td>
                      </tr>
                    ) : (
                      entries.map((entry, idx) => (
                        <tr key={entry.id} className={`border-b border-gray-100 ${idx === 0 ? 'bg-yellow-50' : ''}`}>
                          <td className={`py-2 px-2 font-bold ${idx === 0 ? 'text-yellow-600' : 'text-gray-800'}`}>{idx === 0 ? '🏆' : idx + 1}</td>
                          <td className="py-2 px-2 text-gray-900 font-medium">{entry.team}</td>
                          <td className={`py-2 px-2 font-bold ${idx === 0 ? 'text-yellow-600' : 'text-gray-900'}`}>{entry.score}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 