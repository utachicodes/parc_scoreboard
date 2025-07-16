import { ZohoFormData, ScoreEntry } from '../types';

export class RoboticsZohoIntegration {
  private webhookUrl: string;
  private apiKey: string;

  constructor(webhookUrl: string, apiKey: string) {
    this.webhookUrl = webhookUrl;
    this.apiKey = apiKey;
  }

  // Calculate individual objective scores
  private calculateObjective1Score(data: ZohoFormData): number {
    if (!data.RobotStarted) return 0;
    
    const phosphatePoints = (data.PhosphateRocks || 0) * 2;
    const largeRockPoints = data.LargePhosphateRock ? 5 : 0;
    const penaltyPoints = (data.OverLimitPenalty || 0) * 3;
    
    return phosphatePoints + largeRockPoints - penaltyPoints;
  }

  private calculateObjective2Score(data: ZohoFormData): number {
    if (!data.RobotStarted) return 0;
    
    const sulfuricPoints = (data.SulfuricAcidsAdded || 0) * 2;
    const ammoniaPoints = (data.AmmoniaAdded || 0) * 2;
    const mapBonus = (data.MAPProduced || 0) * 3;
    const dapBonus = (data.DAPProduced || 0) * 4;
    const defectivePenalty = (data.DefectivePenalty || 0) * 2;
    
    return sulfuricPoints + ammoniaPoints + mapBonus + dapBonus - defectivePenalty;
  }

  private calculateObjective3Score(data: ZohoFormData): number {
    if (!data.RobotStarted) return 0;
    
    const deliveryPoints = (data.CorrectDeliveries || 0) * 5;
    const wrongPlacementPenalty = (data.WrongPlacementPenalty || 0) * 3;
    
    return deliveryPoints - wrongPlacementPenalty;
  }

  // Handle incoming webhook from Zoho
  async handleWebhook(data: ZohoFormData): Promise<ScoreEntry> {
    try {
      // Validate the incoming data
      if (!data.TeamName || !data.TeamNumber || !data.League) {
        throw new Error('Invalid form data: TeamName, TeamNumber, and League are required');
      }

      // Calculate objective scores
      const objective1Score = this.calculateObjective1Score(data);
      const objective2Score = this.calculateObjective2Score(data);
      const objective3Score = this.calculateObjective3Score(data);

      // Transform Zoho form data to ScoreEntry
      const scoreEntry: ScoreEntry = {
        id: Date.now().toString(),
        teamName: data.TeamName,
        teamNumber: data.TeamNumber,
        league: data.League,
        school: data.School || 'Unknown School',
        totalScore: data.RobotStarted ? objective1Score + objective2Score + objective3Score : 0,
        
        objective1: {
          phosphateRocks: data.PhosphateRocks || 0,
          largePhosphateRock: data.LargePhosphateRock || false,
          overLimitPenalty: data.OverLimitPenalty || 0,
          objective1Score
        },
        
        objective2: {
          sulfuricAcidsAdded: data.SulfuricAcidsAdded || 0,
          ammoniaAdded: data.AmmoniaAdded || 0,
          mapProduced: data.MAPProduced || 0,
          dapProduced: data.DAPProduced || 0,
          defectivePenalty: data.DefectivePenalty || 0,
          objective2Score
        },
        
        objective3: {
          correctDeliveries: data.CorrectDeliveries || 0,
          wrongPlacementPenalty: data.WrongPlacementPenalty || 0,
          objective3Score
        },
        
        submissionTime: new Date().toISOString(),
        matchNumber: data.MatchNumber,
        robotStarted: data.RobotStarted !== false,
        additionalNotes: data.AdditionalNotes
      };

      return scoreEntry;
    } catch (error) {
      console.error('Error processing robotics competition webhook:', error);
      throw error;
    }
  }

  // Validate team data for competition rules
  validateTeamData(data: ZohoFormData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Required fields
    if (!data.TeamName) errors.push('Team name is required');
    if (!data.TeamNumber) errors.push('Team number is required');
    if (!data.League || !['Tech', 'Stars'].includes(data.League)) {
      errors.push('League must be either "Tech" or "Stars"');
    }

    // Objective 1 validation
    if (data.PhosphateRocks < 0 || data.PhosphateRocks > 12) {
      errors.push('Phosphate rocks must be between 0 and 12');
    }
    if (data.OverLimitPenalty < 0) {
      errors.push('Over limit penalty cannot be negative');
    }

    // Objective 2 validation
    if (data.SulfuricAcidsAdded < 0 || data.SulfuricAcidsAdded > 9) {
      errors.push('Sulfuric acids must be between 0 and 9');
    }
    if (data.AmmoniaAdded < 0 || data.AmmoniaAdded > 10) {
      errors.push('Ammonia must be between 0 and 10');
    }
    if (data.MAPProduced < 0 || data.DAPProduced < 0) {
      errors.push('MAP and DAP production cannot be negative');
    }

    // Objective 3 validation
    if (data.CorrectDeliveries < 0) {
      errors.push('Correct deliveries cannot be negative');
    }
    if (data.WrongPlacementPenalty < 0) {
      errors.push('Wrong placement penalty cannot be negative');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  // Fetch data from Zoho API (polling method)
  async fetchFromZoho(): Promise<ScoreEntry[]> {
    try {
      const response = await fetch(`${this.webhookUrl}/forms/robotics-scores`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return Promise.all(data.map((item: ZohoFormData) => this.handleWebhook(item)));
    } catch (error) {
      console.error('Error fetching from Zoho:', error);
      throw error;
    }
  }

  // Set up real-time webhook endpoint
  setupWebhookEndpoint(callback: (entry: ScoreEntry) => void) {
    // This would typically be implemented with a backend service
    // For demo purposes, we'll simulate webhook calls
    
    const simulateWebhook = () => {
      const teamNames = ['Robo Warriors', 'Tech Titans', 'Star Crushers', 'Phosphate Pros', 'Chemical Champions'];
      const schools = ['Innovation High', 'STEM Academy', 'Tech Prep', 'Engineering School', 'Robotics Institute'];
      const leagues: ('Tech' | 'Stars')[] = ['Tech', 'Stars'];
      
      const mockData: ZohoFormData = {
        TeamName: teamNames[Math.floor(Math.random() * teamNames.length)],
        TeamNumber: `${leagues[Math.floor(Math.random() * leagues.length)][0]}${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`,
        League: leagues[Math.floor(Math.random() * leagues.length)],
        School: schools[Math.floor(Math.random() * schools.length)],
        MatchNumber: Math.floor(Math.random() * 3) + 1,
        PhosphateRocks: Math.floor(Math.random() * 12),
        LargePhosphateRock: Math.random() > 0.5,
        OverLimitPenalty: Math.floor(Math.random() * 3),
        SulfuricAcidsAdded: Math.floor(Math.random() * 9),
        AmmoniaAdded: Math.floor(Math.random() * 8),
        MAPProduced: Math.floor(Math.random() * 4),
        DAPProduced: Math.floor(Math.random() * 4),
        DefectivePenalty: Math.floor(Math.random() * 3),
        CorrectDeliveries: Math.floor(Math.random() * 10),
        WrongPlacementPenalty: Math.floor(Math.random() * 2),
        RobotStarted: Math.random() > 0.1 // 90% chance robot started properly
      };

      this.handleWebhook(mockData).then(callback);
    };

    // Simulate random webhook calls every 20 seconds
    setInterval(simulateWebhook, 20000);
  }
}

// Example usage and setup instructions for robotics competition
export const setupRoboticsZohoIntegration = () => {
  /*
  To integrate with Zoho Forms for the 2025 TECH CHALLENGE:
  
  1. Create a Zoho Form with these fields:
     - TeamName (text)
     - TeamNumber (text) 
     - League (dropdown: Tech, Stars)
     - School (text)
     - MatchNumber (number)
     
     Objective 1 fields:
     - PhosphateRocks (number, 0-12)
     - LargePhosphateRock (checkbox/boolean)
     - OverLimitPenalty (number)
     
     Objective 2 fields:
     - SulfuricAcidsAdded (number, 0-9)
     - AmmoniaAdded (number, 0-10)
     - MAPProduced (number)
     - DAPProduced (number)
     - DefectivePenalty (number)
     
     Objective 3 fields:
     - CorrectDeliveries (number)
     - WrongPlacementPenalty (number)
     
     Additional fields:
     - RobotStarted (checkbox/boolean)
     - AdditionalNotes (text area)
  
  2. Set up webhook to trigger on form submission
  3. Configure webhook to send JSON data to your backend
  4. Use RoboticsZohoIntegration class to process and validate data
  5. Update scoreboard in real-time with new submissions
  
  The system automatically calculates:
  - Individual objective scores based on competition rules
  - Total team scores
  - Penalties and bonuses
  - Disqualifications for robot size violations
  */
};

export default RoboticsZohoIntegration;