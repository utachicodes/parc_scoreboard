import { ZohoFormData, ScoreEntry } from '../types';

export class ZohoIntegration {
  private webhookUrl: string;
  private apiKey: string;

  constructor(webhookUrl: string, apiKey: string) {
    this.webhookUrl = webhookUrl;
    this.apiKey = apiKey;
  }

  // Handle incoming webhook from Zoho
  async handleWebhook(data: ZohoFormData): Promise<ScoreEntry> {
    try {
      // Validate the incoming data
      if (!data.Name || !data.Score) {
        throw new Error('Invalid form data: Name and Score are required');
      }

      // Transform Zoho form data to ScoreEntry
      const scoreEntry: ScoreEntry = {
        id: Date.now().toString(),
        name: data.Name,
        score: Number(data.Score),
        category: data.Category || 'General',
        submissionTime: new Date().toISOString(),
        email: data.Email,
        additionalData: Object.fromEntries(
          Object.entries(data).filter(([key]) => 
            !['Name', 'Email', 'Score', 'Category'].includes(key)
          )
        )
      };

      return scoreEntry;
    } catch (error) {
      console.error('Error processing Zoho webhook:', error);
      throw error;
    }
  }

  // Fetch data from Zoho API (polling method)
  async fetchFromZoho(): Promise<ScoreEntry[]> {
    try {
      const response = await fetch(`${this.webhookUrl}/forms/scores`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.map((item: ZohoFormData) => this.handleWebhook(item));
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
      const mockData: ZohoFormData = {
        Name: `User ${Date.now()}`,
        Email: `user${Date.now()}@example.com`,
        Score: Math.floor(Math.random() * 100) + 1,
        Category: ['Quiz', 'Contest', 'Survey'][Math.floor(Math.random() * 3)]
      };

      this.handleWebhook(mockData).then(callback);
    };

    // Simulate random webhook calls
    setInterval(simulateWebhook, 15000);
  }
}

// Example usage and setup instructions
export const setupZohoIntegration = () => {
  /*
  To integrate with Zoho Forms:
  
  1. In your Zoho Creator form, add a webhook URL that points to your backend
  2. Set up the webhook to trigger on form submission
  3. Configure the webhook to send JSON data with the following structure:
     {
       "Name": "John Doe",
       "Email": "john@example.com", 
       "Score": 85,
       "Category": "Quiz"
     }
  
  4. In your backend, create an endpoint that receives this data and processes it
  5. Use the ZohoIntegration class to handle the data transformation
  6. Update your React app state with the new score entry
  
  For real-time updates, you can use:
  - WebSockets for real-time communication
  - Server-sent events (SSE) for one-way updates
  - Polling at regular intervals
  */
};

export default ZohoIntegration;