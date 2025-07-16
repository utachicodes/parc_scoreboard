import React from 'react';
import { Search, Filter, Download, Users } from 'lucide-react';

interface CompetitionFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedLeague: string;
  setSelectedLeague: (league: string) => void;
  selectedSchool: string;
  setSelectedSchool: (school: string) => void;
  schools: string[];
  onExport: () => void;
  techCount: number;
  starsCount: number;
}

export const CompetitionFilter: React.FC<CompetitionFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedLeague,
  setSelectedLeague,
  selectedSchool,
  setSelectedSchool,
  schools,
  onExport,
  techCount,
  starsCount
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search teams, schools, or team numbers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          <div className="flex space-x-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm min-w-[140px]"
              >
                <option value="">All Leagues</option>
                <option value="Tech">Tech League ({techCount})</option>
                <option value="Stars">Stars League ({starsCount})</option>
              </select>
            </div>

            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm min-w-[180px]"
              >
                <option value="">All Schools</option>
                {schools.map(school => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          <Download className="w-4 h-4" />
          <span>Export Results</span>
        </button>
      </div>

      {/* League Summary */}
      <div className="flex items-center justify-center space-x-8 mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">Tech League: {techCount} teams</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">Stars League: {starsCount} teams</span>
        </div>
      </div>
    </div>
  );
};