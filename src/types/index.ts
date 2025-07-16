export interface ScoreEntry {
  id: string;
  teamName: string;
  teamNumber: string;
  league: 'Tech' | 'Stars';
  school: string;
  totalScore: number;
  
  // Objective 1: Mining & Transport (60 seconds)
  objective1: {
    phosphateRocks: number; // 2 points each
    largePhosphateRock: boolean; // 5 points
    overLimitPenalty: number; // -3 points per excess rock
    objective1Score: number;
  };
  
  // Objective 2: Chemical Processing (60 seconds)
  objective2: {
    sulfuricAcidsAdded: number; // 2 points each
    ammoniaAdded: number; // 2 points each
    mapProduced: number; // 3 additional points each
    dapProduced: number; // 4 additional points each
    defectivePenalty: number; // -2 points per defective chemical
    objective2Score: number;
  };
  
  // Objective 3: Transport & Ship (30 seconds)
  objective3: {
    correctDeliveries: number; // 5 points each
    wrongPlacementPenalty: number; // -3 points each
    objective3Score: number;
  };
  
  submissionTime: string;
  matchNumber?: number;
  robotStarted: boolean; // false = disqualified for size
  additionalNotes?: string;
}

export interface CompetitionConfig {
  title: string;
  leagues: string[];
  maxTeamsPerLeague: number;
  refreshInterval: number;
  currentRound: string;
}

export interface ZohoFormData {
  TeamName: string;
  TeamNumber: string;
  League: 'Tech' | 'Stars';
  School: string;
  MatchNumber: number;
  
  // Objective 1 scores
  PhosphateRocks: number;
  LargePhosphateRock: boolean;
  OverLimitPenalty: number;
  
  // Objective 2 scores
  SulfuricAcidsAdded: number;
  AmmoniaAdded: number;
  MAPProduced: number;
  DAPProduced: number;
  DefectivePenalty: number;
  
  // Objective 3 scores
  CorrectDeliveries: number;
  WrongPlacementPenalty: number;
  
  RobotStarted: boolean;
  AdditionalNotes?: string;
}

export interface Team {
  id: string;
  name: string;
  number: string;
  country: string;
  school?: string;
  league: 'Tech' | 'Stars';
}

export interface Round {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
  revealed: boolean; // true if round is visible to public
}

export interface Score {
  id: string;
  teamId: string;
  roundId: string;
  points: number;
  details?: string;
}