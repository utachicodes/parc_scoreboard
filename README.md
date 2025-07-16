# 2025 TECH CHALLENGE - Robotics Competition Scoreboard

A comprehensive, real-time scoreboard system for the **2025 TECH CHALLENGE: Phosphate Extraction and Fertilizer Production** VEX IQ robotics competition, featuring separate Tech and Stars leagues.

## Competition Overview

The 2025 TECH CHALLENGE simulates the phosphate-based fertilizer production process through three main objectives:

### 🏗️ Objective 1: Mining & Transport (60 seconds)
- Extract phosphate rocks from the open-pit mining zone
- Transport rocks to mixing zone containers (max 3 per container)
- Find and transport the large phosphate rock for bonus points
- **Scoring**: 2 pts per rock, 5 pts for large rock, -3 pts per excess rock

### ⚗️ Objective 2: Chemical Processing (60 seconds)
- Add sulfuric acid and ammonia to create fertilizers
- Produce MAP (Monoammonium phosphate) and DAP (Diammonium phosphate)
- Avoid defective chemicals marked with X
- **Scoring**: 2 pts per chemical, +3 pts per MAP, +4 pts per DAP, -2 pts per defective

### 🚚 Objective 3: Transport & Ship (30 seconds)
- Move containers to correct shipping zones (MAP/DAP/Unfinished)
- **Scoring**: 5 pts per correct delivery, -3 pts per wrong placement

## Features

- **Dual League Support**: Separate rankings for Tech and Stars leagues
- **Real-time Updates**: Live scoreboard with automatic score calculations
- **Detailed Scoring**: Complete breakdown of all three objectives
- **Team Management**: Track team names, numbers, schools, and match data
- **Advanced Filtering**: Search by team, school, or league
- **Data Export**: Export complete results to CSV format
- **Responsive Design**: Works on all devices and screen sizes
- **Competition Rules**: Built-in validation and penalty calculations

## Zoho Form Integration

### Required Form Fields

Create a Zoho form with these exact field names:

#### Team Information
- `TeamName` (text) - Team name
- `TeamNumber` (text) - Team identifier (e.g., T001, S001)
- `League` (dropdown) - "Tech" or "Stars"
- `School` (text) - School/organization name
- `MatchNumber` (number) - Match/round number

#### Objective 1: Mining & Transport
- `PhosphateRocks` (number, 0-12) - Number of phosphate rocks collected
- `LargePhosphateRock` (checkbox) - Whether large rock was found
- `OverLimitPenalty` (number) - Rocks exceeding 3 per container

#### Objective 2: Chemical Processing
- `SulfuricAcidsAdded` (number, 0-9) - Sulfuric acids added to containers
- `AmmoniaAdded` (number, 0-10) - Ammonia added to containers
- `MAPProduced` (number) - Monoammonium phosphate produced
- `DAPProduced` (number) - Diammonium phosphate produced
- `DefectivePenalty` (number) - Defective chemicals used

#### Objective 3: Transport & Ship
- `CorrectDeliveries` (number) - Containers delivered to correct zones
- `WrongPlacementPenalty` (number) - Containers placed incorrectly

#### Additional Fields
- `RobotStarted` (checkbox) - Robot fit in starting zone (30cm x 50cm x 50cm)
- `AdditionalNotes` (text area) - Optional notes or observations

### Setup Instructions

1. **Create Zoho Form**: Set up form with all required fields listed above
2. **Configure Webhook**: 
   - Go to Form Settings → Integrations → Webhooks
   - Add webhook URL pointing to your backend endpoint
   - Set to trigger on form submission
3. **Backend Integration**: Use the provided `RoboticsZohoIntegration` service
4. **Real-time Updates**: Implement WebSocket or polling for live updates

### Example Webhook Payload

```json
{
  "TeamName": "Robo Eagles",
  "TeamNumber": "T001",
  "League": "Tech",
  "School": "Tech High School",
  "MatchNumber": 1,
  "PhosphateRocks": 8,
  "LargePhosphateRock": true,
  "OverLimitPenalty": 1,
  "SulfuricAcidsAdded": 6,
  "AmmoniaAdded": 4,
  "MAPProduced": 2,
  "DAPProduced": 1,
  "DefectivePenalty": 0,
  "CorrectDeliveries": 8,
  "WrongPlacementPenalty": 1,
  "RobotStarted": true,
  "AdditionalNotes": "Excellent performance in all objectives"
}
```

## Scoring System

The system automatically calculates scores based on official competition rules:

### Automatic Calculations
- **Objective 1**: (Rocks × 2) + (Large Rock × 5) - (Over Limit × 3)
- **Objective 2**: (Sulfuric × 2) + (Ammonia × 2) + (MAP × 3) + (DAP × 4) - (Defective × 2)
- **Objective 3**: (Correct × 5) - (Wrong × 3)
- **Total Score**: Sum of all objectives (0 if robot disqualified)

### Disqualification Rules
- Teams are automatically disqualified if `RobotStarted` is false
- Disqualified teams show 0 points and special indicator
- All scoring is bypassed for disqualified teams

## Technical Implementation

- **Frontend**: React with TypeScript, Tailwind CSS
- **State Management**: Custom hooks with real-time updates
- **Data Validation**: Built-in form validation and error handling
- **Export**: CSV export with complete competition data
- **Responsive**: Mobile-first design with breakpoints
- **Performance**: Optimized rendering and state management

## Usage

1. **View Results**: Main scoreboard shows both leagues with rankings
2. **Filter Teams**: Use search and filters to find specific teams
3. **Export Data**: Download complete results as CSV file
4. **Real-time Updates**: New submissions appear automatically
5. **Detailed Breakdown**: Click teams to see objective-by-objective scoring

## Competition Rules Compliance

This scoreboard implements all official 2025 TECH CHALLENGE rules:

- ✅ Three-objective scoring system
- ✅ Proper penalty calculations
- ✅ Robot size disqualification handling
- ✅ Container limits and overflow penalties
- ✅ Chemical processing bonuses
- ✅ Shipping zone validation
- ✅ Time-based objective structure

## Support

For technical support or competition questions:
- Review the official 2025 TECH CHALLENGE documentation
- Check Zoho Forms API documentation for integration help
- Ensure all form field names match exactly as specified

---

**2025 TECH CHALLENGE: Phosphate Extraction and Fertilizer Production**  
*Developing problem-solving, engineering, and automation skills for industrial sustainability*