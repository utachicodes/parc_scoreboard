'use client';

import React, { useState, useEffect } from 'react';
import { TeamScoreCard } from './TeamScoreCard';
import { ScoreEntry } from '@/types';

interface ResultsRevealProps {
  scores: ScoreEntry[];
}

export const ResultsReveal: React.FC<ResultsRevealProps> = ({ scores }) => {
  const [showText, setShowText] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 500);
    setTimeout(() => setShowResults(true), 2500);
  }, []);

  const sortedScores = [...scores].sort((a, b) => b.totalScore - a.totalScore);
  const techTeams = sortedScores.filter(s => s.league === 'Tech');
  const starsTeams = sortedScores.filter(s => s.league === 'Stars');

  return (
    <div className="min-h-screen bg-white">
      {!showResults ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/20 to-white" />
          
          {showText && (
            <div className="text-center animate-fade-in relative z-10">
              <h1 className="text-6xl font-thin text-gray-900 mb-8 tracking-wide">
                The results are...
              </h1>
              <div className="w-12 h-12 border border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
            </div>
          )}
        </div>
      ) : (
        <div className="container mx-auto px-6 py-16 animate-slide-up">
          {/* Clean header */}
          <div className="text-center mb-20">
            <h1 className="text-5xl font-thin text-gray-900 mb-6 tracking-wide">
              COMPETITION RESULTS
            </h1>
            <div className="w-24 h-px bg-gray-300 mx-auto" />
          </div>

          <div className="space-y-20">
            {/* Tech League Results */}
            {techTeams.length > 0 && (
              <div>
                <h2 className="text-3xl font-light text-gray-800 mb-10 text-center flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full mr-4"></div>
                  TECH LEAGUE
                </h2>
                <div className="space-y-6 max-w-5xl mx-auto">
                  {techTeams.slice(0, 5).map((entry, index) => (
                    <div
                      key={entry.id}
                      className="animate-slide-in"
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <TeamScoreCard
                        entry={entry}
                        rank={index + 1}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stars League Results */}
            {starsTeams.length > 0 && (
              <div>
                <h2 className="text-3xl font-light text-gray-800 mb-10 text-center flex items-center justify-center">
                  <div className="w-6 h-6 bg-purple-500 rounded-full mr-4"></div>
                  STARS LEAGUE
                </h2>
                <div className="space-y-6 max-w-5xl mx-auto">
                  {starsTeams.slice(0, 5).map((entry, index) => (
                    <div
                      key={entry.id}
                      className="animate-slide-in"
                      style={{ animationDelay: `${(index + techTeams.length) * 0.15}s` }}
                    >
                      <TeamScoreCard
                        entry={entry}
                        rank={index + 1}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};