import React from 'react';
import { Trophy, Users, Target, RefreshCw, Zap, Award } from 'lucide-react';
import { ScoreEntry } from '../types';

interface CompetitionHeaderProps {
  scores: ScoreEntry[];
  loading: boolean;
  onRefresh: () => void;
  onSimulateUpdate: () => void;
}

export const CompetitionHeader: React.FC<CompetitionHeaderProps> = ({
  scores,
  loading,
  onRefresh,
  onSimulateUpdate
}) => {
  const techTeams = scores.filter(s => s.league === 'Tech');
  const starsTeams = scores.filter(s => s.league === 'Stars');
  const totalTeams = scores.length;
  const averageScore = scores.length > 0 
    ? Math.round(scores.reduce((sum, entry) => sum + entry.totalScore, 0) / scores.length)
    : 0;
  const highestScore = scores.length > 0 
    ? Math.max(...scores.map(entry => entry.totalScore))
    : 0;

  return (
    <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white rounded-xl shadow-2xl p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="mb-6 lg:mb-0">
          <div className="flex items-center space-x-3 mb-3">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                2025 TECH CHALLENGE
              </h1>
              <p className="text-xl text-blue-200 font-medium">
                Phosphate Extraction & Fertilizer Production
              </p>
            </div>
          </div>
          <p className="text-blue-100 max-w-2xl">
            Live scoreboard tracking VEX IQ robotics teams through mining, chemical processing, and shipping challenges
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-all duration-200 font-medium"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Scores</span>
          </button>
          <button
            onClick={onSimulateUpdate}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-200 font-medium"
          >
            <Zap className="w-5 h-5" />
            <span>Simulate Match</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-center">
          <Users className="w-8 h-8 mx-auto mb-3 text-blue-200" />
          <p className="text-blue-200 text-sm font-medium">Tech League</p>
          <p className="text-3xl font-bold">{techTeams.length}</p>
          <p className="text-blue-200 text-xs">Teams</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-center">
          <Award className="w-8 h-8 mx-auto mb-3 text-purple-200" />
          <p className="text-purple-200 text-sm font-medium">Stars League</p>
          <p className="text-3xl font-bold">{starsTeams.length}</p>
          <p className="text-purple-200 text-xs">Teams</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-center">
          <Target className="w-8 h-8 mx-auto mb-3 text-green-200" />
          <p className="text-green-200 text-sm font-medium">Total Teams</p>
          <p className="text-3xl font-bold">{totalTeams}</p>
          <p className="text-green-200 text-xs">Competing</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl p-6 text-center">
          <Trophy className="w-8 h-8 mx-auto mb-3 text-yellow-200" />
          <p className="text-yellow-200 text-sm font-medium">Average Score</p>
          <p className="text-3xl font-bold">{averageScore}</p>
          <p className="text-yellow-200 text-xs">Points</p>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-pink-600 rounded-xl p-6 text-center">
          <Trophy className="w-8 h-8 mx-auto mb-3 text-red-200" />
          <p className="text-red-200 text-sm font-medium">Highest Score</p>
          <p className="text-3xl font-bold">{highestScore}</p>
          <p className="text-red-200 text-xs">Points</p>
        </div>
      </div>
    </div>
  );
};