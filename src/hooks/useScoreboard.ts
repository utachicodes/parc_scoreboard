import { useState, useEffect, useCallback } from 'react';

interface Score {
  id: string;
  name: string;
  score: number;
  category: string;
  submissionTime: string;
  email?: string;
}

export const useScoreboard = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScores = useCallback(async () => {
    try {
      setLoading(true);
      // TODO: Replace with real API call
      setScores([]);
      setError(null);
    } catch {
      setError('Failed to fetch scores');
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