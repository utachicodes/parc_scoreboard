import React from 'react';
import { TrendingUp, Users, BarChart3, RefreshCw } from 'lucide-react';
import { ScoreEntry } from '../types';

interface ScoreboardHeaderProps {
  scores: ScoreEntry[];
  loading: boolean;
  onRefresh: () => void;
  onSimulateUpdate: () => void;
}

export const ScoreboardHeader: React.FC<ScoreboardHeaderProps> = ({
  scores,
  loading,
  onRefresh,
  onSimulateUpdate
}) => {
  const totalEntries = scores.length;
  const averageScore = scores.length > 0 
    ? Math.round(scores.reduce((sum, entry) => sum + entry.score, 0) / scores.length)
    : 0;
  const highestScore = scores.length > 0 
    ? Math.max(...scores.map(entry => entry.score))
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Live Scoreboard
          </h1>
          <p className="text-gray-600">
            Real-time updates from Zoho form submissions
          </p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={onSimulateUpdate}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Simulate Update</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8" />
            <div>
              <p className="text-blue-100 text-sm">Total Entries</p>
              <p className="text-2xl font-bold">{totalEntries}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8" />
            <div>
              <p className="text-green-100 text-sm">Average Score</p>
              <p className="text-2xl font-bold">{averageScore}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8" />
            <div>
              <p className="text-purple-100 text-sm">Highest Score</p>
              <p className="text-2xl font-bold">{highestScore}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};