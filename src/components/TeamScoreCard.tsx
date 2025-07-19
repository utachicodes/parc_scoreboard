'use client';

import React from 'react';
import { Trophy, School, Hash, CheckCircle, XCircle } from 'lucide-react';
import { ScoreEntry } from '@/types';

interface TeamScoreCardProps {
  entry: ScoreEntry;
  rank: number;
  isNew?: boolean;
}

export const TeamScoreCard: React.FC<TeamScoreCardProps> = ({ entry, rank, isNew }) => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 2: return 'text-gray-600 bg-gray-50 border-gray-200';
      case 3: return 'text-amber-600 bg-amber-50 border-amber-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getLeagueColor = (league: string) => {
    return league === 'Tech' 
      ? 'bg-blue-100 text-blue-800 border-blue-200' 
      : 'bg-purple-100 text-purple-800 border-purple-200';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-blue-600 bg-blue-50';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (!entry.robotStarted) {
    return (
      <div className="bg-red-50 border-l-4 border-l-red-500 rounded-2xl shadow-lg p-8 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <XCircle className="w-10 h-10 text-red-500" />
            <div>
              <h3 className="font-bold text-red-800 text-xl">{entry.teamName}</h3>
              <p className="text-red-600">Team #{entry.teamNumber} - {entry.league} League</p>
              <p className="text-red-500 text-sm">{entry.school}</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-red-600 font-bold text-xl">DISQUALIFIED</div>
            <div className="text-red-500">Robot size violation</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 border-l-4 transition-all duration-500 hover:shadow-2xl ${
      isNew ? 'border-l-green-500 animate-pulse' : 'border-l-blue-500'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-black border-2 ${getRankColor(rank)}`}>
            {rank <= 3 ? <Trophy className="w-8 h-8" /> : rank}
          </div>
          <div>
            <h3 className="font-black text-gray-900 text-2xl tracking-tight">{entry.teamName}</h3>
            <div className="flex items-center space-x-4 text-gray-600 mt-1">
              <span className="flex items-center">
                <Hash className="w-4 h-4 mr-1" />
                {entry.teamNumber}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getLeagueColor(entry.league)}`}>
                {entry.league} League
              </span>
            </div>
            <p className="text-gray-500 flex items-center mt-2">
              <School className="w-4 h-4 mr-1" />
              {entry.school}
            </p>
          </div>
        </div>
        <div className="text-center">
          <div className={`px-8 py-4 rounded-2xl text-3xl font-black ${getScoreColor(entry.totalScore)}`}>
            {entry.totalScore}
          </div>
          <div className="text-gray-500 text-sm mt-2 font-medium">Total Points</div>
        </div>
      </div>

      {/* Objective Scores */}
      {entry.league === 'Tech' ? (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Objective 1: Mining */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
            <h4 className="font-bold text-amber-800 mb-3">🏗️ Mining & Transport<br/><span className='text-xs font-normal'>(1 min)</span></h4>
          <div className="space-y-2 text-sm text-amber-700">
            <div>Phosphate Rocks: {entry.objective1.phosphateRocks} (+{entry.objective1.phosphateRocks * 2})</div>
            <div>Large Rock: {entry.objective1.largePhosphateRock ? '✓ (+5)' : '✗ (0)'}</div>
            {entry.objective1.overLimitPenalty > 0 && (
              <div className="text-red-600">Over Limit: -{entry.objective1.overLimitPenalty * 3}</div>
            )}
          </div>
          <div className="font-black text-amber-800 mt-4 text-lg">{entry.objective1.objective1Score} pts</div>
        </div>

        {/* Objective 2: Chemical Processing */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h4 className="font-bold text-blue-800 mb-3">⚗️ Chemical Processing<br/><span className='text-xs font-normal'>(1 min)</span></h4>
          <div className="space-y-2 text-sm text-blue-700">
            <div>Sulfuric Acid: {entry.objective2.sulfuricAcidsAdded} (+{entry.objective2.sulfuricAcidsAdded * 2})</div>
            <div>Ammonia: {entry.objective2.ammoniaAdded} (+{entry.objective2.ammoniaAdded * 2})</div>
            <div>MAP: {entry.objective2.mapProduced} (+{entry.objective2.mapProduced * 3})</div>
            <div>DAP: {entry.objective2.dapProduced} (+{entry.objective2.dapProduced * 4})</div>
            {entry.objective2.defectivePenalty > 0 && (
              <div className="text-red-600">Defective: -{entry.objective2.defectivePenalty * 2}</div>
            )}
          </div>
          <div className="font-black text-blue-800 mt-4 text-lg">{entry.objective2.objective2Score} pts</div>
        </div>

        {/* Objective 3: Shipping */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <h4 className="font-bold text-green-800 mb-3">🚚 Transport & Ship<br/><span className='text-xs font-normal'>(30 sec)</span></h4>
          <div className="space-y-2 text-sm text-green-700">
            <div>Correct Deliveries: {entry.objective3.correctDeliveries} (+{entry.objective3.correctDeliveries * 5})</div>
            {entry.objective3.wrongPlacementPenalty > 0 && (
              <div className="text-red-600">Wrong Placement: -{entry.objective3.wrongPlacementPenalty * 3}</div>
            )}
          </div>
          <div className="font-black text-green-800 mt-4 text-lg">{entry.objective3.objective3Score} pts</div>
        </div>
      </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Objective 1: Battery Structures */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
            <h4 className="font-bold text-orange-800 mb-3">🔋 Battery Structures<br/><span className='text-xs font-normal'>(1 min 30s)</span></h4>
            <div className="space-y-2 text-sm text-orange-700">
              <div>Trays: {entry.objective1 && 'trays' in entry.objective1 ? String(entry.objective1.trays) : 'N/A'} (+3 each)</div>
              <div>Cases: {entry.objective1 && 'cases' in entry.objective1 ? String(entry.objective1.cases) : 'N/A'} (+1 each)</div>
              <div>AGV Collisions: {entry.objective1 && 'agvCollisions1' in entry.objective1 ? String(entry.objective1.agvCollisions1) : 'N/A'} (-2 each)</div>
            </div>
            <div className="font-black text-orange-800 mt-4 text-lg">{entry.objective1 && 'objective1Score' in entry.objective1 ? String(entry.objective1.objective1Score) : 'N/A'} pts</div>
          </div>
          {/* Objective 2: Sorting Defective Cells */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <h4 className="font-bold text-blue-800 mb-3">🧪 Sorting Defective Cells<br/><span className='text-xs font-normal'>(1 min)</span></h4>
            <div className="space-y-2 text-sm text-blue-700">
              <div>Circle: {entry.objective2 && 'defectiveCircle' in entry.objective2 ? String(entry.objective2.defectiveCircle) : 'N/A'} (+1 each)</div>
              <div>Triangle: {entry.objective2 && 'defectiveTriangle' in entry.objective2 ? String(entry.objective2.defectiveTriangle) : 'N/A'} (+2 each)</div>
              <div>Square: {entry.objective2 && 'defectiveSquare' in entry.objective2 ? String(entry.objective2.defectiveSquare) : 'N/A'} (+3 each)</div>
              <div>Wrong Bin: {entry.objective2 && 'wrongBin' in entry.objective2 ? String(entry.objective2.wrongBin) : 'N/A'} (-1 each)</div>
              <div>Functional in Bin: {entry.objective2 && 'functionalInBin' in entry.objective2 ? String(entry.objective2.functionalInBin) : 'N/A'} (-2 each)</div>
              <div>Red X Recycled: {entry.objective2 && 'redXRecycled' in entry.objective2 ? (entry.objective2.redXRecycled ? 'Yes (-5)' : 'No') : 'N/A'}</div>
            </div>
            <div className="font-black text-blue-800 mt-4 text-lg">{entry.objective2 && 'objective2Score' in entry.objective2 ? String(entry.objective2.objective2Score) : 'N/A'} pts</div>
          </div>
          {/* Objective 3: Battery Assembly */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h4 className="font-bold text-purple-800 mb-3">🔗 Battery Assembly<br/><span className='text-xs font-normal'>(2 min)</span></h4>
            <div className="space-y-2 text-sm text-purple-700">
              <div>Series Cells: {entry.objective3 && 'seriesCells' in entry.objective3 ? String(entry.objective3.seriesCells) : 'N/A'} (+2 each)</div>
              <div>Stack 2nd Layer: {entry.objective3 && 'stack2' in entry.objective3 ? String(entry.objective3.stack2) : 'N/A'} (+3 each)</div>
              <div>Stack 3rd Layer: {entry.objective3 && 'stack3' in entry.objective3 ? String(entry.objective3.stack3) : 'N/A'} (+4 each)</div>
              <div>Stack More: {entry.objective3 && 'stackMore' in entry.objective3 ? String(entry.objective3.stackMore) : 'N/A'} (+5 each)</div>
            </div>
            <div className="font-black text-purple-800 mt-4 text-lg">{entry.objective3 && 'objective3Score' in entry.objective3 ? String(entry.objective3.objective3Score) : 'N/A'} pts</div>
          </div>
          {/* Objective 4: Sealing & Return */}
          <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-xl p-6 border border-green-200">
            <h4 className="font-bold text-green-800 mb-3">🛡️ Sealing & Return<br/><span className='text-xs font-normal'>(30 sec)</span></h4>
            <div className="space-y-2 text-sm text-green-700">
              <div>Covers: {entry.objective4 && 'covers' in entry.objective4 ? String(entry.objective4.covers) : 'N/A'} (+3 each)</div>
              <div>Robot Returned: {entry.objective4 && 'robotReturned' in entry.objective4 ? (entry.objective4.robotReturned ? 'Yes (+3)' : 'No') : 'N/A'}</div>
              <div>AGV Collisions: {entry.objective4 && 'agvCollisions4' in entry.objective4 ? String(entry.objective4.agvCollisions4) : 'N/A'} (-2 each)</div>
            </div>
            <div className="font-black text-green-800 mt-4 text-lg">{entry.objective4 && 'objective4Score' in entry.objective4 ? String(entry.objective4.objective4Score) : 'N/A'} pts</div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          {entry.matchNumber && (
            <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
              Match #{entry.matchNumber}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-3">
          {isNew && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              NEW
            </span>
          )}
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
      </div>
    </div>
  );
};