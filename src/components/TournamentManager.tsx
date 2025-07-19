'use client';

import React, { useState } from 'react';
import { Match, Team } from '@/types/tournament';
import { tournamentData } from '@/data/tournamentData';

interface TournamentManagerProps {
  leagueId: string;
}

function getNextRoundName(leagueId: string, currentRound: string): string | null {
  const league = tournamentData.leagues.find(l => l.id === leagueId);
  if (!league) return null;
  const idx = league.rounds.findIndex(r => r.name === currentRound);
  if (idx === -1 || idx === league.rounds.length - 1) return null;
  return league.rounds[idx + 1].name;
}

export default function TournamentManager({ leagueId }: TournamentManagerProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [scores, setScores] = useState<{ [teamId: string]: number }>({});
  const [winner, setWinner] = useState<string>('');
  const [editTeams, setEditTeams] = useState(false);
  const [editedTeams, setEditedTeams] = useState<string[]>([]);

  const league = tournamentData.leagues.find(l => l.id === leagueId);
  const teams = tournamentData.teams.filter(t => t.league === leagueId);
  const matches = tournamentData.matches.filter(m => m.league === leagueId);

  if (!league) {
    return <div className="text-center text-red-600">League not found</div>;
  }

  const getTeamById = (teamId: string) => {
    return teams.find(t => t.id === teamId);
  };

  const handleMatchSelect = (match: Match) => {
    setSelectedMatch(match);
    setScores(match.scores || {});
    setWinner(match.winner || '');
    setEditTeams(false);
    setEditedTeams(match.teams);
  };

  const handleScoreChange = (teamId: string, score: number) => {
    setScores(prev => ({
      ...prev,
      [teamId]: score
    }));
  };

  const handleWinnerChange = (teamId: string) => {
    setWinner(teamId);
  };

  // Manual team editing
  const handleEditTeams = () => {
    setEditTeams(true);
  };
  const handleTeamSelect = (index: number, teamId: string) => {
    setEditedTeams(prev => {
      const copy = [...prev];
      copy[index] = teamId;
      return copy;
    });
  };
  const handleSaveTeams = () => {
    if (selectedMatch) {
      selectedMatch.teams = editedTeams;
    }
    setEditTeams(false);
  };

  // Automatic advancement logic for Tech League
  function advanceWinnerTech(match: Match, winnerId: string) {
    const nextRound = getNextRoundName(leagueId, match.round);
    if (!nextRound) return;
    const nextMatches = matches.filter(m => m.round === nextRound);
    for (const nextMatch of nextMatches) {
      for (let i = 0; i < nextMatch.teams.length; i++) {
        if (!nextMatch.teams[i] || nextMatch.teams[i] === 'TBD') {
          nextMatch.teams[i] = winnerId;
          return;
        }
      }
    }
    if (nextMatches.length > 0) {
      nextMatches[0].teams.push(winnerId);
    }
  }

  // Stars League: advance top 4 teams by score from the completed round to the next round
  function advanceTopStars(currentRound: string) {
    const nextRound = getNextRoundName(leagueId, currentRound);
    if (!nextRound) return;
    const currentMatches = matches.filter(m => m.round === currentRound);
    // Only advance if all matches in the round are completed
    if (!currentMatches.every(m => m.status === 'completed')) return;
    // Gather all teams and their scores from this round
    let allTeams: { teamId: string; score: number }[] = [];
    for (const match of currentMatches) {
      if (match.scores) {
        for (const [teamId, score] of Object.entries(match.scores)) {
          allTeams.push({ teamId, score: typeof score === 'number' ? score : 0 });
        }
      }
    }
    // Sort by score descending, take top 4
    allTeams.sort((a, b) => b.score - a.score);
    const top4 = allTeams.slice(0, 4).map(t => t.teamId);
    // Place top 4 into next round's match slots
    const nextMatches = matches.filter(m => m.round === nextRound);
    let placed = 0;
    for (const nextMatch of nextMatches) {
      for (let i = 0; i < nextMatch.teams.length && placed < top4.length; i++) {
        nextMatch.teams[i] = top4[placed++];
      }
    }
    // If not enough slots, add to first match
    while (placed < top4.length && nextMatches.length > 0) {
      nextMatches[0].teams.push(top4[placed++]);
    }
  }

  const handleUpdateMatch = () => {
    if (!selectedMatch) return;

    // Update match with new scores and winner
    selectedMatch.scores = scores;
    selectedMatch.winner = winner || undefined;
    selectedMatch.status = winner ? 'completed' : 'in-progress';
    selectedMatch.completedTime = winner ? new Date().toISOString() : undefined;

    // Automatic advancement
    if (winner) {
      if (leagueId === 'tech') {
        advanceWinnerTech(selectedMatch, winner);
      } else if (leagueId === 'stars') {
        // After every match update, check if the round is complete and advance top 4
        advanceTopStars(selectedMatch.round);
      }
    }

    // Reset form
    setSelectedMatch(null);
    setScores({});
    setWinner('');
    setEditTeams(false);
  };

  const getMatchStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-500';
      case 'in-progress': return 'bg-yellow-100 border-yellow-500';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tournament Manager</h2>
      
      {/* Match Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Match to Update</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedMatch?.id === match.id ? 'border-blue-500 bg-blue-50' : getMatchStatusColor(match.status)
              }`}
              onClick={() => handleMatchSelect(match)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-700">
                  {match.round} - Match {match.matchNumber}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  match.status === 'completed' ? 'bg-green-500 text-white' :
                  match.status === 'in-progress' ? 'bg-yellow-500 text-white' :
                  'bg-gray-500 text-white'
                }`}>
                  {match.status}
                </span>
              </div>
              
              <div className="space-y-1">
                {match.teams.map((teamId, idx) => {
                  const team = getTeamById(teamId);
                  const isWinner = match.winner === teamId;
                  
                  return (
                    <div key={teamId + idx} className="flex items-center justify-between text-sm">
                      <span className={`${isWinner ? 'font-bold text-yellow-700' : 'text-gray-700'}`}>
                        {team?.name || 'TBD'}
                      </span>
                      {match.scores && match.scores[teamId] !== undefined && (
                        <span className="font-bold">{match.scores[teamId]}</span>
                      )}
                      {isWinner && <span className="text-yellow-500">🏆</span>}
                    </div>
                  );
                })}
              </div>
              <button
                className="mt-2 px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                onClick={e => { e.stopPropagation(); handleMatchSelect(match); handleEditTeams(); }}
              >
                Edit Teams
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Match Update Form */}
      {selectedMatch && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Update Match: {selectedMatch.round} - Match {selectedMatch.matchNumber}
          </h3>
          {/* Edit Teams UI */}
          {editTeams ? (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Edit Teams</h4>
              {editedTeams.map((teamId, idx) => (
                <div key={idx} className="flex items-center space-x-2 mb-2">
                  <span>Slot {idx + 1}:</span>
                  <select
                    value={teamId}
                    onChange={e => handleTeamSelect(idx, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="">TBD</option>
                    {teams.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              ))}
              <button
                className="px-4 py-1 bg-blue-500 text-white rounded mr-2"
                onClick={handleSaveTeams}
              >
                Save Teams
              </button>
              <button
                className="px-4 py-1 bg-gray-400 text-white rounded"
                onClick={() => setEditTeams(false)}
              >
                Cancel
              </button>
            </div>
          ) : null}
          <div className="space-y-4">
            {selectedMatch.teams.map((teamId) => {
              const team = getTeamById(teamId);
              
              return (
                <div key={teamId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700">{team?.name || 'TBD'}</span>
                    <input
                      type="number"
                      value={scores[teamId] || ''}
                      onChange={(e) => handleScoreChange(teamId, parseInt(e.target.value) || 0)}
                      className="w-20 px-2 py-1 border rounded text-center"
                      placeholder="Score"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="winner"
                      id={`winner-${teamId}`}
                      checked={winner === teamId}
                      onChange={() => handleWinnerChange(teamId)}
                      className="text-blue-600"
                    />
                    <label htmlFor={`winner-${teamId}`} className="text-sm text-gray-600">
                      Winner
                    </label>
                  </div>
                </div>
              );
            })}
            
            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleUpdateMatch}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Update Match
              </button>
              <button
                onClick={() => {
                  setSelectedMatch(null);
                  setScores({});
                  setWinner('');
                  setEditTeams(false);
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 