import React from 'react';
import { Trophy, Clock, User, Tag } from 'lucide-react';
import { ScoreEntry } from '../types';

interface ScoreCardProps {
  entry: ScoreEntry;
  rank: number;
  isNew?: boolean;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ entry, rank, isNew }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-600 bg-yellow-50';
      case 2: return 'text-gray-600 bg-gray-50';
      case 3: return 'text-amber-600 bg-amber-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 transition-all duration-300 hover:shadow-xl ${
      isNew ? 'border-l-green-500 animate-pulse' : 'border-l-blue-500'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankColor(rank)}`}>
            {rank <= 3 ? <Trophy className="w-4 h-4" /> : rank}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">{entry.name}</h3>
            <p className="text-gray-500 text-sm flex items-center">
              <User className="w-3 h-3 mr-1" />
              {entry.email}
            </p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-full text-lg font-bold ${getScoreColor(entry.score)}`}>
          {entry.score}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Tag className="w-4 h-4 mr-1" />
            {entry.category}
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {formatTime(entry.submissionTime)}
          </span>
        </div>
        {isNew && (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            NEW
          </span>
        )}
      </div>
    </div>
  );
};