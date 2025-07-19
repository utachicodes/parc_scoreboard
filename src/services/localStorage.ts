// WARNING: This file uses Node.js fs and will only work on Vercel if used in API routes (not in client components or edge functions). Make sure all usage is server-side only.
import fs from 'fs';
import path from 'path';

// Local file paths for storing data
const DATA_DIR = path.join(process.cwd(), 'data');
const STARS_FILE = path.join(DATA_DIR, 'stars_scores.json');
const TECH_FILE = path.join(DATA_DIR, 'tech_scores.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize empty files if they don't exist
if (!fs.existsSync(STARS_FILE)) {
  fs.writeFileSync(STARS_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(TECH_FILE)) {
  fs.writeFileSync(TECH_FILE, JSON.stringify([], null, 2));
}

export interface LocalScore {
  id: string;
  team: string;
  round: string;
  submitted_by: string;
  score: number | string;
  time: string;
  createdAt: string;
  [key: string]: any; // Allow additional fields
}

class LocalStorageService {
  private readFile(filePath: string): LocalScore[] {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
      return [];
    }
  }

  private writeFile(filePath: string, data: LocalScore[]): void {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing ${filePath}:`, error);
    }
  }

  // Stars Scores
  async getStarsScores(): Promise<LocalScore[]> {
    return this.readFile(STARS_FILE);
  }

  async addStarsScore(score: Omit<LocalScore, 'id' | 'createdAt'>): Promise<LocalScore> {
    const scores = this.readFile(STARS_FILE);
    const newScore: LocalScore = {
      ...score,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    scores.unshift(newScore); // Add to beginning
    this.writeFile(STARS_FILE, scores);
    return newScore;
  }

  async updateStarsScore(id: string, updates: Partial<LocalScore>): Promise<LocalScore | null> {
    const scores = this.readFile(STARS_FILE);
    const index = scores.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    scores[index] = { ...scores[index], ...updates };
    this.writeFile(STARS_FILE, scores);
    return scores[index];
  }

  async deleteStarsScore(id: string): Promise<boolean> {
    const scores = this.readFile(STARS_FILE);
    const filtered = scores.filter(s => s.id !== id);
    if (filtered.length === scores.length) return false;
    
    this.writeFile(STARS_FILE, filtered);
    return true;
  }

  // Tech Scores
  async getTechScores(): Promise<LocalScore[]> {
    return this.readFile(TECH_FILE);
  }

  async addTechScore(score: Omit<LocalScore, 'id' | 'createdAt'>): Promise<LocalScore> {
    const scores = this.readFile(TECH_FILE);
    const newScore: LocalScore = {
      ...score,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    scores.unshift(newScore); // Add to beginning
    this.writeFile(TECH_FILE, scores);
    return newScore;
  }

  async updateTechScore(id: string, updates: Partial<LocalScore>): Promise<LocalScore | null> {
    const scores = this.readFile(TECH_FILE);
    const index = scores.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    scores[index] = { ...scores[index], ...updates };
    this.writeFile(TECH_FILE, scores);
    return scores[index];
  }

  async deleteTechScore(id: string): Promise<boolean> {
    const scores = this.readFile(TECH_FILE);
    const filtered = scores.filter(s => s.id !== id);
    if (filtered.length === scores.length) return false;
    
    this.writeFile(TECH_FILE, filtered);
    return true;
  }
}

export const localStorage = new LocalStorageService(); 