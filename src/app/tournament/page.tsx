'use client';

import React from 'react';
import Link from 'next/link';
import { tournamentData } from '@/data/tournamentData';

export default function TournamentPage() {
  const getLeagueStats = (leagueId: string) => {
    const teams = tournamentData.teams.filter(t => t.league === leagueId);
    const matches = tournamentData.matches.filter(m => m.league === leagueId);
    const completedMatches = matches.filter(m => m.status === 'completed');
    const activeTeams = teams.filter(t => t.status === 'active');
    const winners = teams.filter(t => t.status === 'winner');
    
    return {
      totalTeams: teams.length,
      totalMatches: matches.length,
      completedMatches: completedMatches.length,
      activeTeams: activeTeams.length,
      winners: winners.length,
      progress: matches.length > 0 ? Math.round((completedMatches.length / matches.length) * 100) : 0
    };
  };

  const getLeagueColor = (leagueId: string) => {
    const colors = {
      tech: 'bg-blue-500',
      stars: 'bg-purple-500',
    };
    return colors[leagueId as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">PARC Tournament 2024</h1>
            <p className="text-xl text-gray-600">Tech League & Stars League Tournament Management</p>
          </div>
        </div>
      </div>

      {/* Tournament Overview */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tournamentData.leagues.map((league) => {
            const stats = getLeagueStats(league.id);
            
            return (
              <Link
                key={league.id}
                href={`/tournament/${league.id}`}
                className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className={`h-2 ${getLeagueColor(league.id)}`}></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{league.name}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      league.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {league.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{league.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{stats.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stats.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-lg text-blue-600">{stats.totalTeams}</div>
                      <div className="text-gray-500">Teams</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-green-600">{stats.completedMatches}</div>
                      <div className="text-gray-500">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-orange-600">{stats.activeTeams}</div>
                      <div className="text-gray-500">Active</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-yellow-600">{stats.winners}</div>
                      <div className="text-gray-500">Winners</div>
                    </div>
                  </div>
                  
                  {/* Rounds Info */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Rounds:</span> {league.rounds.length}
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Current:</span> {league.rounds[league.currentRound - 1]?.name || 'N/A'}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tournament Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {tournamentData.leagues.length}
              </div>
              <div className="text-gray-600">Leagues</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {tournamentData.teams.length}
              </div>
              <div className="text-gray-600">Total Teams</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {tournamentData.matches.length}
              </div>
              <div className="text-gray-600">Total Matches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {tournamentData.matches.filter(m => m.status === 'completed').length}
              </div>
              <div className="text-gray-600">Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 