'use client';

import React, { useState } from 'react';
import { Match, Team, League } from '@/types/tournament';
import { tournamentData } from '@/data/tournamentData';

interface TournamentBracketProps {
  leagueId: string;
}

export default function TournamentBracket({ leagueId }: TournamentBracketProps) {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  
  const league = tournamentData.leagues.find(l => l.id === leagueId);
  const teams = tournamentData.teams.filter(t => t.league === leagueId);
  const matches = tournamentData.matches.filter(m => m.league === leagueId);

  if (!league) {
    return <div className="text-center text-red-600">League not found</div>;
  }

  const getTeamName = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team?.name || 'TBD';
  };

  const getTeamById = (teamId: string) => {
    return teams.find(t => t.id === teamId);
  };

  const handleMatchClick = (matchId: string) => {
    setSelectedMatch(selectedMatch === matchId ? null : matchId);
  };

  const getMatchStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 border-green-500';
      case 'in-progress': return 'bg-yellow-100 border-yellow-500';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* League Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{league.name}</h1>
          <p className="text-lg text-gray-600">{league.description}</p>
        </div>

        {/* Tournament Bracket */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {league.rounds.map((round, roundIndex) => (
            <div key={round.name} className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
                {round.name}
              </h2>
              
              <div className="space-y-4">
                {round.matches.map((match) => (
                  <div
                    key={match.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${getMatchStatusColor(match.status)}`}
                    onClick={() => handleMatchClick(match.id)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-600">
                        Match {match.matchNumber}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        match.status === 'completed' ? 'bg-green-500 text-white' :
                        match.status === 'in-progress' ? 'bg-yellow-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {match.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {match.teams.length > 0 ? (
                        match.teams.map((teamId, index) => {
                          const team = getTeamById(teamId);
                          const isWinner = match.winner === teamId;
                          
                          return (
                            <div
                              key={teamId}
                              className={`flex items-center justify-between p-2 rounded ${
                                isWinner ? 'bg-yellow-100 border-l-4 border-yellow-500' : 'bg-gray-50'
                              }`}
                            >
                              <span className={`font-medium ${isWinner ? 'text-yellow-700' : 'text-gray-700'}`}>
                                {team?.name || 'TBD'}
                              </span>
                              {match.scores && match.scores[teamId] !== undefined && (
                                <span className="font-bold text-lg">
                                  {match.scores[teamId]}
                                </span>
                              )}
                              {isWinner && <span className="text-yellow-500">🏆</span>}
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-gray-500 text-center py-4">
                          Teams TBD
                        </div>
                      )}
                    </div>

                    {/* Match Details Modal */}
                    {selectedMatch === match.id && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">Match Details</h3>
                        <div className="text-sm text-blue-700">
                          <p>Match ID: {match.id}</p>
                          <p>Round: {match.round}</p>
                          <p>Status: {match.status}</p>
                          {match.scheduledTime && (
                            <p>Scheduled: {new Date(match.scheduledTime).toLocaleString()}</p>
                          )}
                          {match.completedTime && (
                            <p>Completed: {new Date(match.completedTime).toLocaleString()}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Teams Overview */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Teams Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {teams.map((team) => (
              <div
                key={team.id}
                className={`p-3 rounded-lg border-2 ${
                  team.status === 'winner' ? 'bg-yellow-100 border-yellow-500' :
                  team.status === 'eliminated' ? 'bg-red-100 border-red-500' :
                  'bg-green-100 border-green-500'
                }`}
              >
                <div className="font-semibold text-sm">{team.name}</div>
                <div className="text-xs text-gray-600 mt-1">
                  Status: {team.status}
                </div>
                {team.score !== undefined && (
                  <div className="text-xs font-bold mt-1">
                    Score: {team.score}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 