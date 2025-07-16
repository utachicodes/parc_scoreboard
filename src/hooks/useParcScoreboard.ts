import { useState, useEffect } from 'react';
import { Team, Round, Score } from '@/types';

const TEAMS_KEY = 'parc_teams';
const ROUNDS_KEY = 'parc_rounds';
const SCORES_KEY = 'parc_scores';

function load<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

export function useParcScoreboard() {
  const [teams, setTeams] = useState<Team[]>(() => load<Team[]>(TEAMS_KEY, []));
  const [rounds, setRounds] = useState<Round[]>(() => load<Round[]>(ROUNDS_KEY, []));
  const [scores, setScores] = useState<Score[]>(() => load<Score[]>(SCORES_KEY, []));

  // Save to localStorage on change
  useEffect(() => { localStorage.setItem(TEAMS_KEY, JSON.stringify(teams)); }, [teams]);
  useEffect(() => { localStorage.setItem(ROUNDS_KEY, JSON.stringify(rounds)); }, [rounds]);
  useEffect(() => { localStorage.setItem(SCORES_KEY, JSON.stringify(scores)); }, [scores]);

  // Listen for storage events (cross-tab sync)
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === TEAMS_KEY) setTeams(load<Team[]>(TEAMS_KEY, []));
      if (e.key === ROUNDS_KEY) setRounds(load<Round[]>(ROUNDS_KEY, []));
      if (e.key === SCORES_KEY) setScores(load<Score[]>(SCORES_KEY, []));
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Team CRUD
  const addTeam = (team: Team) => setTeams(prev => [...prev, team]);
  const updateTeam = (id: string, updated: Partial<Team>) => setTeams(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  const deleteTeam = (id: string) => setTeams(prev => prev.filter(t => t.id !== id));

  // Round CRUD
  const addRound = (round: Round) => setRounds(prev => [...prev, round]);
  const updateRound = (id: string, updated: Partial<Round>) => setRounds(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r));
  const deleteRound = (id: string) => setRounds(prev => prev.filter(r => r.id !== id));

  // Score CRUD
  const addScore = (score: Score) => setScores(prev => [...prev, score]);
  const updateScore = (id: string, updated: Partial<Score>) => setScores(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  const deleteScore = (id: string) => setScores(prev => prev.filter(s => s.id !== id));

  return {
    teams, addTeam, updateTeam, deleteTeam,
    rounds, addRound, updateRound, deleteRound,
    scores, addScore, updateScore, deleteScore
  };
} 