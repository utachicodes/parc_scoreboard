import { useState, useEffect, useCallback } from 'react';
import { ScoreEntry } from '@/types';

export const useRoboticsScoreboard = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScores = useCallback(async () => {
    try {
      setLoading(true);
      // TODO: Replace with real API call
      setScores([]);
      setError(null);
    } catch {
      setError('Failed to fetch competition scores');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  return {
    scores,
    loading,
    error,
    fetchScores
  };
};