'use client';

import React, { useState } from 'react';
import { useParcScoreboard } from '@/hooks/useParcScoreboard';
import { Team, Round, Score } from '@/types';

const LEAGUES = ['Tech', 'Stars'] as const;
type League = typeof LEAGUES[number];

const TIMER_DURATIONS_KEY = 'parc_timer_durations';

function loadDurations() {
  if (typeof window === 'undefined') return { Tech: 90, Stars: 90 };
  try {
    const data = localStorage.getItem(TIMER_DURATIONS_KEY);
    return data ? JSON.parse(data) : { Tech: 90, Stars: 90 };
  } catch {
    return { Tech: 90, Stars: 90 };
  }
}

const AdminDashboard: React.FC = () => {
  const {
    teams, addTeam,
    rounds, addRound,
    scores, addScore,
    updateRound
  } = useParcScoreboard();

  // League filter state
  const [selectedLeague, setSelectedLeague] = useState<League>('Tech');

  // Team form state
  const [teamName, setTeamName] = useState('');
  const [teamNumber, setTeamNumber] = useState('');
  const [teamCountry, setTeamCountry] = useState('');

  // Round form state
  const [roundName, setRoundName] = useState('');
  const [roundOrder, setRoundOrder] = useState(1);

  // Score form state
  const [scoreTeamId, setScoreTeamId] = useState('');
  const [scoreRoundId, setScoreRoundId] = useState('');
  const [scorePoints, setScorePoints] = useState(0);

  // Timer duration state
  const [timerDurations, setTimerDurations] = useState<{ Tech: number; Stars: number }>(() => loadDurations());

  // Save timer durations to localStorage on change
  React.useEffect(() => {
    localStorage.setItem(TIMER_DURATIONS_KEY, JSON.stringify(timerDurations));
  }, [timerDurations]);

  // Handlers
  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || !teamNumber || !teamCountry) return;
    addTeam({ id: Date.now().toString(), name: teamName, number: teamNumber, country: teamCountry, league: selectedLeague });
    setTeamName(''); setTeamNumber(''); setTeamCountry('');
  };

  const handleAddRound = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roundName) return;
    addRound({ id: Date.now().toString(), name: roundName, order: roundOrder, isActive: false, revealed: false });
    setRoundName(''); setRoundOrder(1);
  };

  const handleAddScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scoreTeamId || !scoreRoundId) return;
    addScore({ id: Date.now().toString(), teamId: scoreTeamId, roundId: scoreRoundId, points: scorePoints });
    setScoreTeamId(''); setScoreRoundId(''); setScorePoints(0);
  };

  // Filtered data
  const leagueTeams = teams.filter((team: Team) => team.league === selectedLeague);

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white min-h-screen" style={{background: 'white'}}>
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">PARC Manager Dashboard</h1>
      {/* Timer Duration Controls */}
      <div className="mb-8 border border-orange-200 p-4 rounded bg-orange-50">
        <h2 className="text-xl font-semibold mb-2 text-orange-500">Set Timer Duration (seconds)</h2>
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <label className="mb-1 font-medium text-blue-700">Tech League</label>
            <input
              type="number"
              min={10}
              max={3600}
              value={timerDurations.Tech}
              onChange={e => setTimerDurations(d => ({ ...d, Tech: Number(e.target.value) }))}
              className="border border-blue-300 rounded-md p-2 w-24 text-center"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-1 font-medium text-purple-700">Stars League</label>
            <input
              type="number"
              min={10}
              max={3600}
              value={timerDurations.Stars}
              onChange={e => setTimerDurations(d => ({ ...d, Stars: Number(e.target.value) }))}
              className="border border-purple-300 rounded-md p-2 w-24 text-center"
            />
          </div>
        </div>
      </div>
      {/* League Selector */}
      <div className="flex justify-center mb-8">
        <select value={selectedLeague} onChange={(e) => setSelectedLeague(e.target.value as League)} className="w-40 border border-orange-500 rounded-md p-2">
          {LEAGUES.map(l => <option key={l} value={l}>{l} League</option>)}
        </select>
      </div>
      {/* Add Team */}
      <form onSubmit={handleAddTeam} className="mb-8 border border-orange-200 p-4 rounded bg-orange-50">
        <h2 className="text-xl font-semibold mb-2 text-orange-500">Add Team</h2>
        <div className="flex gap-2 mb-2">
          <input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Team Name" className="border border-orange-300 rounded-md p-2" />
          <input value={teamNumber} onChange={(e) => setTeamNumber(e.target.value)} placeholder="Team Number" className="border border-orange-300 rounded-md p-2" />
          <input value={teamCountry} onChange={(e) => setTeamCountry(e.target.value)} placeholder="Country" className="border border-orange-300 rounded-md p-2" />
        </div>
        <button type="submit" className="bg-orange-500 text-white hover:bg-orange-600 rounded-md p-2">Add Team</button>
      </form>
      {/* Add Round */}
      <form onSubmit={handleAddRound} className="mb-8 border border-orange-200 p-4 rounded bg-orange-50">
        <h2 className="text-xl font-semibold mb-2 text-orange-500">Add Round</h2>
        <div className="flex gap-2 mb-2">
          <input value={roundName} onChange={(e) => setRoundName(e.target.value)} placeholder="Round Name" className="border border-orange-300 rounded-md p-2" />
          <input type="number" value={roundOrder} onChange={(e) => setRoundOrder(Number(e.target.value))} placeholder="Order" className="border border-orange-300 rounded-md p-2" />
        </div>
        <button type="submit" className="bg-orange-500 text-white hover:bg-orange-600 rounded-md p-2">Add Round</button>
      </form>
      {/* Add Score */}
      <form onSubmit={handleAddScore} className="mb-8 border border-orange-200 p-4 rounded bg-orange-50">
        <h2 className="text-xl font-semibold mb-2 text-orange-500">Add Score</h2>
        <div className="flex gap-2 mb-2">
          <select value={scoreTeamId} onChange={(e) => setScoreTeamId(e.target.value)} className="w-40 border border-orange-300 rounded-md p-2">
            <option value="">Select Team</option>
            {leagueTeams.map((team: Team) => <option key={team.id} value={team.id}>{team.name}</option>)}
          </select>
          <select value={scoreRoundId} onChange={(e) => setScoreRoundId(e.target.value)} className="w-40 border border-orange-300 rounded-md p-2">
            <option value="">Select Round</option>
            {rounds.map((round: Round) => <option key={round.id} value={round.id}>{round.name}</option>)}
          </select>
          <input type="number" value={scorePoints} onChange={(e) => setScorePoints(Number(e.target.value))} placeholder="Points" className="border border-orange-300 rounded-md p-2" />
        </div>
        <button type="submit" className="bg-orange-500 text-white hover:bg-orange-600 rounded-md p-2">Add Score</button>
      </form>
      {/* List Teams */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-orange-500">Teams</h2>
        <ul className="space-y-1">
          {leagueTeams.map((team: Team) => <li key={team.id} className="bg-white border-l-4 border-orange-400 px-2 py-1">{team.name} ({team.number}) - {team.country}</li>)}
        </ul>
      </div>
      {/* List Rounds */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-orange-500">Rounds</h2>
        <ul className="space-y-1">
          {rounds.map((round: Round) => <li key={round.id} className="bg-white border-l-4 border-orange-400 px-2 py-1 flex items-center justify-between">
            <span>{round.name} (Order: {round.order})</span>
            <button
              className={`ml-2 px-2 py-1 rounded text-xs ${round.revealed ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}
              onClick={() => updateRound(round.id, { revealed: !round.revealed })}
              type="button"
            >
              {round.revealed ? 'Hide' : 'Reveal'}
            </button>
          </li>)}
        </ul>
      </div>
      {/* List Scores */}
      <div>
        <h2 className="text-xl font-semibold mb-2 text-orange-500">Scores</h2>
        <ul className="space-y-1">
          {scores.filter((score: Score) => {
            const team = teams.find((t: Team) => t.id === score.teamId);
            return team && team.league === selectedLeague;
          }).map((score: Score) => {
            const team = teams.find((t: Team) => t.id === score.teamId);
            const round = rounds.find((r: Round) => r.id === score.roundId);
            return <li key={score.id} className="bg-white border-l-4 border-orange-400 px-2 py-1">{team?.name || 'Unknown Team'} - {round?.name || 'Unknown Round'}: {score.points} pts</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard; 