import React, { useState, useMemo } from 'react';
import { TeamScoreCard } from './TeamScoreCard';
import { CompetitionHeader } from './CompetitionHeader';
import { CompetitionFilter } from './CompetitionFilter';
import { LoadingSpinner } from './LoadingSpinner';
import { useRoboticsScoreboard } from '../hooks/useRoboticsScoreboard';

export const RoboticsScoreboard: React.FC = () => {
  const {
    scores,
    loading,
    error,
    fetchScores,
    simulateRealTimeUpdate
  } = useRoboticsScoreboard();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');

  const schools = useMemo(() => {
    return Array.from(new Set(scores.map(score => score.school))).sort();
  }, [scores]);

  const filteredScores = useMemo(() => {
    return scores
      .filter(score => {
        const matchesSearch = 
          score.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          score.teamNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          score.school.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLeague = !selectedLeague || score.league === selectedLeague;
        const matchesSchool = !selectedSchool || score.school === selectedSchool;
        return matchesSearch && matchesLeague && matchesSchool;
      })
      .sort((a, b) => {
        // First sort by league (Tech first, then Stars)
        if (a.league !== b.league) {
          return a.league === 'Tech' ? -1 : 1;
        }
        // Then sort by total score (highest first)
        return b.totalScore - a.totalScore;
      });
  }, [scores, searchTerm, selectedLeague, selectedSchool]);

  const techTeams = filteredScores.filter(s => s.league === 'Tech');
  const starsTeams = filteredScores.filter(s => s.league === 'Stars');

  const handleExport = () => {
    const csvContent = [
      [
        'Rank', 'Team Name', 'Team Number', 'League', 'School', 'Total Score',
        'Obj1 Score', 'Phosphate Rocks', 'Large Rock', 'Over Limit Penalty',
        'Obj2 Score', 'Sulfuric Acids', 'Ammonia', 'MAP', 'DAP', 'Defective Penalty',
        'Obj3 Score', 'Correct Deliveries', 'Wrong Placement Penalty',
        'Robot Started', 'Match Number', 'Submission Time', 'Notes'
      ],
      ...filteredScores.map((score, index) => [
        index + 1,
        score.teamName,
        score.teamNumber,
        score.league,
        score.school,
        score.totalScore,
        score.objective1.objective1Score,
        score.objective1.phosphateRocks,
        score.objective1.largePhosphateRock ? 'Yes' : 'No',
        score.objective1.overLimitPenalty,
        score.objective2.objective2Score,
        score.objective2.sulfuricAcidsAdded,
        score.objective2.ammoniaAdded,
        score.objective2.mapProduced,
        score.objective2.dapProduced,
        score.objective2.defectivePenalty,
        score.objective3.objective3Score,
        score.objective3.correctDeliveries,
        score.objective3.wrongPlacementPenalty,
        score.robotStarted ? 'Yes' : 'No',
        score.matchNumber || '',
        new Date(score.submissionTime).toLocaleString(),
        score.additionalNotes || ''
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `robotics-competition-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error loading competition results</div>
          <button
            onClick={fetchScores}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
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
        <CompetitionHeader
          scores={scores}
          loading={loading}
          onRefresh={fetchScores}
          onSimulateUpdate={simulateRealTimeUpdate}
        />

        <CompetitionFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedLeague={selectedLeague}
          setSelectedLeague={setSelectedLeague}
          selectedSchool={selectedSchool}
          setSelectedSchool={setSelectedSchool}
          schools={schools}
          onExport={handleExport}
          techCount={techTeams.length}
          starsCount={starsTeams.length}
        />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-8">
            {/* Tech League Results */}
            {techTeams.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full mr-3"></div>
                  Tech League Results
                </h2>
                <div className="space-y-4">
                  {techTeams.map((entry, index) => (
                    <TeamScoreCard
                      key={entry.id}
                      entry={entry}
                      rank={index + 1}
                      isNew={Date.now() - new Date(entry.submissionTime).getTime() < 30000}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Stars League Results */}
            {starsTeams.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-6 h-6 bg-purple-500 rounded-full mr-3"></div>
                  Stars League Results
                </h2>
                <div className="space-y-4">
                  {starsTeams.map((entry, index) => (
                    <TeamScoreCard
                      key={entry.id}
                      entry={entry}
                      rank={index + 1}
                      isNew={Date.now() - new Date(entry.submissionTime).getTime() < 30000}
                    />
                  ))}
                </div>
              </div>
            )}

            {filteredScores.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No teams found matching your criteria</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};