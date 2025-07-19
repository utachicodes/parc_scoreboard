export interface Team {
  id: string;
  name: string;
  league: string;
  round: string;
  status: 'active' | 'eliminated' | 'winner';
  score?: number;
  matchId?: string;
}

export interface Match {
  id: string;
  league: string;
  round: string;
  matchNumber: number;
  teams: string[]; // Team IDs
  status: 'scheduled' | 'in-progress' | 'completed';
  winner?: string;
  scores?: { [teamId: string]: number };
  scheduledTime?: string;
  completedTime?: string;
}

export interface TournamentRound {
  name: string;
  matches: Match[];
  isElimination: boolean;
  maxTeams: number;
}

export interface League {
  id: string;
  name: string;
  description: string;
  rounds: TournamentRound[];
  currentRound: number;
  status: 'active' | 'completed';
}

export type TournamentData = {
  leagues: League[];
  teams: Team[];
  matches: Match[];
}; 