import { TournamentData, Team, Match, League } from '@/types/tournament';

// Tech League Teams
const techTeams: Team[] = [
  { id: 'tech-whitesands', name: 'WhiteSands School', league: 'tech', round: 'First Round', status: 'active' },
  { id: 'tech-liberia', name: 'Tech Team Liberia', league: 'tech', round: 'First Round', status: 'active' },
  { id: 'tech-panthers', name: 'Robo Panthers', league: 'tech', round: 'First Round', status: 'active' },
  { id: 'tech-mali', name: 'RobotsMali', league: 'tech', round: 'First Round', status: 'active' },
  { id: 'tech-kit', name: 'Kid In Technology', league: 'tech', round: 'First Round', status: 'active' },
  { id: 'tech-digital', name: 'Digital Teens', league: 'tech', round: 'First Round', status: 'active' },
  { id: 'tech-liberte', name: 'Liberté6', league: 'tech', round: 'First Round', status: 'active' },
  { id: 'tech-diop', name: 'David DIOP', league: 'tech', round: 'First Round', status: 'active' },
  { id: 'tech-hirondelles', name: 'Les Hirondelles', league: 'tech', round: 'First Round', status: 'active' },
  { id: 'tech-culture', name: 'Culture Code', league: 'tech', round: 'First Round', status: 'active' },
  { id: 'tech-mechatronics', name: 'Mechatronics', league: 'tech', round: 'First Round', status: 'active' },
  { id: 'tech-sae', name: 'SAE DRAGONBOTS', league: 'tech', round: 'First Round', status: 'active' },
];

// Stars League Teams
const starsTeams: Team[] = [
  { id: 'stars-cybernight', name: 'CyberNight', league: 'stars', round: 'First Round', status: 'active' },
  { id: 'stars-donifab', name: 'DoniFab', league: 'stars', round: 'First Round', status: 'active' },
  { id: 'stars-kit', name: 'Kid In Technology', league: 'stars', round: 'First Round', status: 'active' },
  { id: 'stars-sabs', name: 'SABS', league: 'stars', round: 'First Round', status: 'active' },
  { id: 'stars-mechatronics', name: 'Mechatronics', league: 'stars', round: 'First Round', status: 'active' },
  { id: 'stars-ivobotus', name: 'Ivobotus', league: 'stars', round: 'First Round', status: 'active' },
  { id: 'stars-hackers', name: 'Hakers Stallions', league: 'stars', round: 'First Round', status: 'active' },
];

// Tech League Matches
const techMatches: Match[] = [
  // First Round
  { id: 'tech-r1-m1', league: 'tech', round: 'First Round', matchNumber: 1, teams: ['tech-whitesands', 'tech-liberia'], status: 'scheduled' },
  { id: 'tech-r1-m2', league: 'tech', round: 'First Round', matchNumber: 2, teams: ['tech-panthers', 'tech-mali'], status: 'scheduled' },
  { id: 'tech-r1-m3', league: 'tech', round: 'First Round', matchNumber: 3, teams: ['tech-kit', 'tech-digital'], status: 'scheduled' },
  { id: 'tech-r1-m4', league: 'tech', round: 'First Round', matchNumber: 4, teams: ['tech-liberte', 'tech-diop'], status: 'scheduled' },
  { id: 'tech-r1-m5', league: 'tech', round: 'First Round', matchNumber: 5, teams: ['tech-hirondelles', 'tech-culture'], status: 'scheduled' },
  { id: 'tech-r1-m6', league: 'tech', round: 'First Round', matchNumber: 6, teams: ['tech-mechatronics', 'tech-sae'], status: 'scheduled' },
  
  // Second Round
  { id: 'tech-r2-m1', league: 'tech', round: 'Second Round', matchNumber: 1, teams: ['tech-whitesands', 'tech-panthers'], status: 'scheduled' },
  { id: 'tech-r2-m2', league: 'tech', round: 'Second Round', matchNumber: 2, teams: ['tech-liberia', 'tech-mali'], status: 'scheduled' },
  { id: 'tech-r2-m3', league: 'tech', round: 'Second Round', matchNumber: 3, teams: ['tech-kit', 'tech-liberte'], status: 'scheduled' },
  { id: 'tech-r2-m4', league: 'tech', round: 'Second Round', matchNumber: 4, teams: ['tech-digital', 'tech-diop'], status: 'scheduled' },
  { id: 'tech-r2-m5', league: 'tech', round: 'Second Round', matchNumber: 5, teams: ['tech-hirondelles', 'tech-mechatronics'], status: 'scheduled' },
  { id: 'tech-r2-m6', league: 'tech', round: 'Second Round', matchNumber: 6, teams: ['tech-culture', 'tech-sae'], status: 'scheduled' },
  
  // Third Round
  { id: 'tech-r3-m1', league: 'tech', round: 'Third Round', matchNumber: 1, teams: ['tech-sae', 'tech-mali'], status: 'scheduled' },
  { id: 'tech-r3-m2', league: 'tech', round: 'Third Round', matchNumber: 2, teams: ['tech-liberia', 'tech-kit'], status: 'scheduled' },
  { id: 'tech-r3-m3', league: 'tech', round: 'Third Round', matchNumber: 3, teams: ['tech-panthers', 'tech-digital'], status: 'scheduled' },
  { id: 'tech-r3-m4', league: 'tech', round: 'Third Round', matchNumber: 4, teams: ['tech-liberte', 'tech-hirondelles'], status: 'scheduled' },
  { id: 'tech-r3-m5', league: 'tech', round: 'Third Round', matchNumber: 5, teams: ['tech-diop', 'tech-culture'], status: 'scheduled' },
  { id: 'tech-r3-m6', league: 'tech', round: 'Third Round', matchNumber: 6, teams: ['tech-mechatronics', 'tech-whitesands'], status: 'scheduled' },
  
  // Quarter Final (TBD)
  { id: 'tech-qf-m1', league: 'tech', round: 'Quarter Final', matchNumber: 1, teams: [], status: 'scheduled' },
  { id: 'tech-qf-m2', league: 'tech', round: 'Quarter Final', matchNumber: 2, teams: [], status: 'scheduled' },
  { id: 'tech-qf-m3', league: 'tech', round: 'Quarter Final', matchNumber: 3, teams: [], status: 'scheduled' },
  { id: 'tech-qf-m4', league: 'tech', round: 'Quarter Final', matchNumber: 4, teams: [], status: 'scheduled' },
  
  // Semi Final
  { id: 'tech-sf-m1', league: 'tech', round: 'Semi Final', matchNumber: 1, teams: [], status: 'scheduled' },
  { id: 'tech-sf-m2', league: 'tech', round: 'Semi Final', matchNumber: 2, teams: [], status: 'scheduled' },
  
  // Final
  { id: 'tech-final', league: 'tech', round: 'Final', matchNumber: 1, teams: [], status: 'scheduled' },
];

// Stars League Matches
const starsMatches: Match[] = [
  // First Round
  { id: 'stars-r1-m1', league: 'stars', round: 'First Round', matchNumber: 1, teams: ['stars-cybernight', 'stars-donifab', 'stars-kit', 'stars-sabs'], status: 'scheduled' },
  { id: 'stars-r1-m2', league: 'stars', round: 'First Round', matchNumber: 2, teams: ['stars-mechatronics', 'stars-ivobotus', 'stars-hackers', 'stars-cybernight'], status: 'scheduled' },
  
  // Second Round
  { id: 'stars-r2-m1', league: 'stars', round: 'Second Round', matchNumber: 1, teams: ['stars-donifab', 'stars-kit', 'stars-sabs', 'stars-mechatronics'], status: 'scheduled' },
  { id: 'stars-r2-m2', league: 'stars', round: 'Second Round', matchNumber: 2, teams: ['stars-ivobotus', 'stars-hackers', 'stars-cybernight', 'stars-kit'], status: 'scheduled' },
  { id: 'stars-r2-m3', league: 'stars', round: 'Second Round', matchNumber: 3, teams: ['stars-donifab', 'stars-sabs', 'stars-mechatronics', 'stars-hackers'], status: 'scheduled' },
  { id: 'stars-r2-m4', league: 'stars', round: 'Second Round', matchNumber: 4, teams: ['stars-cybernight', 'stars-mechatronics', 'stars-kit', 'stars-ivobotus'], status: 'scheduled' },
  
  // Third Round
  { id: 'stars-r3-m1', league: 'stars', round: 'Third Round', matchNumber: 1, teams: ['stars-sabs', 'stars-ivobotus', 'stars-donifab', 'stars-hackers'], status: 'scheduled' },
  
  // Fourth Round
  { id: 'stars-r4-m1', league: 'stars', round: 'Fourth Round', matchNumber: 1, teams: [], status: 'scheduled' },
  
  // Final Game
  { id: 'stars-final', league: 'stars', round: 'Finale Game', matchNumber: 1, teams: [], status: 'scheduled' },
];

// All Teams
const allTeams = [
  ...techTeams,
  ...starsTeams,
];

// All Matches
const allMatches = [
  ...techMatches,
  ...starsMatches,
];

// League Definitions
const leagues: League[] = [
  {
    id: 'tech',
    name: 'Tech League',
    description: 'Robotics competition with elimination rounds',
    currentRound: 1,
    status: 'active',
    rounds: [
      { name: 'First Round', matches: techMatches.filter(m => m.round === 'First Round'), isElimination: false, maxTeams: 12 },
      { name: 'Second Round', matches: techMatches.filter(m => m.round === 'Second Round'), isElimination: false, maxTeams: 12 },
      { name: 'Third Round', matches: techMatches.filter(m => m.round === 'Third Round'), isElimination: false, maxTeams: 12 },
      { name: 'Quarter Final', matches: techMatches.filter(m => m.round === 'Quarter Final'), isElimination: true, maxTeams: 8 },
      { name: 'Semi Final', matches: techMatches.filter(m => m.round === 'Semi Final'), isElimination: true, maxTeams: 4 },
      { name: 'Final', matches: techMatches.filter(m => m.round === 'Final'), isElimination: true, maxTeams: 2 },
    ]
  },
  {
    id: 'stars',
    name: 'Stars League',
    description: 'Multi-team competition with group stages',
    currentRound: 1,
    status: 'active',
    rounds: [
      { name: 'First Round', matches: starsMatches.filter(m => m.round === 'First Round'), isElimination: false, maxTeams: 7 },
      { name: 'Second Round', matches: starsMatches.filter(m => m.round === 'Second Round'), isElimination: false, maxTeams: 7 },
      { name: 'Third Round', matches: starsMatches.filter(m => m.round === 'Third Round'), isElimination: false, maxTeams: 7 },
      { name: 'Fourth Round', matches: starsMatches.filter(m => m.round === 'Fourth Round'), isElimination: false, maxTeams: 7 },
      { name: 'Finale Game', matches: starsMatches.filter(m => m.round === 'Finale Game'), isElimination: true, maxTeams: 4 },
    ]
  },
];

export const tournamentData: TournamentData = {
  leagues,
  teams: allTeams,
  matches: allMatches,
}; 