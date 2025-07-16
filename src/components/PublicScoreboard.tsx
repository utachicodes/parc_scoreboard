"use client";
import React, { useEffect, useState } from "react";
import { supabase } from '@/services/supabaseClient';

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
  const [selectedRound, setSelectedRound] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    supabase
      .from('tech_scores')
      .select('*')
      .then(({ data: tech }) => {
        supabase
          .from('stars_scores')
          .select('*')
          .then(({ data: stars }) => {
            const all = [
              ...(tech || []).map(s => ({ ...s, league: 'Tech' })),
              ...(stars || []).map(s => ({ ...s, league: 'Stars' })),
            ];
            setScores(all);
            setLoading(false);
          });
      });
    // Real-time subscription
    const techChannel = supabase
      .channel('tech_scores_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tech_scores' }, () => {
        supabase
          .from('tech_scores')
          .select('*')
          .then(({ data: tech }) => {
            setScores(prev => {
              const stars = prev.filter(s => s.league === 'Stars');
              return [
                ...(tech || []).map(s => ({ ...s, league: 'Tech' })),
                ...stars,
              ];
            });
          });
      })
      .subscribe();
    const starsChannel = supabase
      .channel('stars_scores_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'stars_scores' }, () => {
        supabase
          .from('stars_scores')
          .select('*')
          .then(({ data: stars }) => {
            setScores(prev => {
              const tech = prev.filter(s => s.league === 'Tech');
              return [
                ...tech,
                ...(stars || []).map(s => ({ ...s, league: 'Stars' })),
              ];
            });
          });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(techChannel);
      supabase.removeChannel(starsChannel);
    };
  }, []);

  // Filtered and sorted
  const leagueScores = scores.filter(s => s.league === selectedLeague);
  const availableRounds = Array.from(new Set(leagueScores.map(s => s.round).filter(Boolean)));
  const filtered = leagueScores
    .filter(s => !selectedRound || s.round === selectedRound)
    .sort((a, b) => {
      const aScore = a.score === 'Disqualified' ? -9999 : Number(a.score);
      const bScore = b.score === 'Disqualified' ? -9999 : Number(b.score);
      return bScore - aScore;
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
      {/* Round Filter */}
      {availableRounds.length > 1 && (
        <div className="mb-6">
          <select
            value={selectedRound}
            onChange={e => setSelectedRound(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">All Rounds</option>
            {availableRounds.map(round => (
              <option key={round} value={round}>{round}</option>
            ))}
          </select>
        </div>
      )}
      {/* Scoreboard Table */}
      <div className="w-full max-w-2xl bg-white rounded-xl border border-gray-200 p-6 mb-12">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-2 text-gray-500 font-semibold">Rank</th>
              <th className="py-2 px-2 text-gray-500 font-semibold">Team</th>
              <th className="py-2 px-2 text-gray-500 font-semibold">Score</th>
              <th className="py-2 px-2 text-gray-500 font-semibold">Round</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400">No entries found</td>
              </tr>
            ) : (
              filtered.map((entry, idx) => (
                <tr key={entry.id} className={`border-b border-gray-100 ${idx === 0 ? 'bg-orange-50' : ''}`}>
                  <td className={`py-2 px-2 font-bold ${idx === 0 ? 'text-orange-500' : 'text-gray-800'}`}>{idx + 1}</td>
                  <td className="py-2 px-2 text-gray-900 font-medium">{entry.team}</td>
                  <td className={`py-2 px-2 font-bold ${idx === 0 ? 'text-orange-500' : 'text-gray-900'}`}>{entry.score}</td>
                  <td className="py-2 px-2 text-gray-700">{entry.round}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 