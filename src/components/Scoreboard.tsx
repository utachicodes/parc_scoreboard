import React, { useState, useMemo } from 'react';
import { ScoreCard } from './ScoreCard';
import { ScoreboardHeader } from './ScoreboardHeader';
import { FilterPanel } from './FilterPanel';
import { LoadingSpinner } from './LoadingSpinner';
import { useScoreboard } from '../hooks/useScoreboard';

export const Scoreboard: React.FC = () => {
  const {
    scores,
    loading,
    error,
    fetchScores,
    simulateRealTimeUpdate
  } = useScoreboard();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = useMemo(() => {
    return Array.from(new Set(scores.map(score => score.category)));
  }, [scores]);

  const filteredScores = useMemo(() => {
    return scores
      .filter(score => {
        const matchesSearch = score.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            score.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || score.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => b.score - a.score);
  }, [scores, searchTerm, selectedCategory]);

  const handleExport = () => {
    const csvContent = [
      ['Rank', 'Name', 'Email', 'Score', 'Category', 'Submission Time'],
      ...filteredScores.map((score, index) => [
        index + 1,
        score.name,
        score.email || '',
        score.score,
        score.category,
        new Date(score.submissionTime).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scoreboard-data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error loading scoreboard</div>
          <button
            onClick={fetchScores}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ScoreboardHeader
          scores={scores}
          loading={loading}
          onRefresh={fetchScores}
          onSimulateUpdate={simulateRealTimeUpdate}
        />

        <FilterPanel
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          onExport={handleExport}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-4">
            {filteredScores.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No entries found</p>
              </div>
            ) : (
              filteredScores.map((entry, index) => (
                <ScoreCard
                  key={entry.id}
                  entry={entry}
                  rank={index + 1}
                  isNew={Date.now() - new Date(entry.submissionTime).getTime() < 30000}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};