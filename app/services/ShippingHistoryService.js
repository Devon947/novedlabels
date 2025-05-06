// Helper function to check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

class ShippingHistoryService {
  constructor() {
    this.STORAGE_KEY = 'shipping_history';
    this.MAX_HISTORY_ITEMS = 100;
    this.isDev = process.env.NODE_ENV !== 'production';
    
    // In-memory fallback for SSR or when localStorage is unavailable
    this.memoryHistory = [];
    
    // Mock data for development
    if (this.isDev) {
      this.mockData = Array(5).fill(0).map((_, i) => ({
        id: `mock-${i}`,
        provider: i % 2 === 0 ? 'easypost' : 'shippo',
        provider_name: i % 2 === 0 ? 'EasyPost' : 'Shippo',
        rate: 5.99 + i,
        tracking_number: `MOCK${100000 + i}`,
        label_url: 'https://dummyimage.com/400x600/000/fff&text=Mock+Shipping+Label',
        tracking_url: 'https://example.com/track',
        fromName: `Sender ${i}`,
        fromAddress: `${i} Main St`,
        fromCity: 'San Francisco',
        fromState: 'CA',
        fromZip: '94105',
        toName: `Recipient ${i}`,
        toAddress: `${i*10} Broadway`,
        toCity: 'New York',
        toState: 'NY',
        toZip: '10001',
        weight: 1 + i,
        createdAt: new Date(Date.now() - i * 86400000).toISOString()
      }));
    }
  }

  async init() {
    try {
      if (isBrowser) {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (!stored) {
          await this.saveHistory([]);
        }
      }
      
      console.log('✅ Shipping history service initialized');
    } catch (error) {
      console.error('❌ Error initializing shipping history:', error);
      
      // In development, populate with mock data
      if (this.isDev) {
        this.memoryHistory = [...this.mockData];
        console.log('🧪 Development mode: Using mock shipping history');
      }
    }
  }

  async getHistory() {
    try {
      if (isBrowser) {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : this.memoryHistory;
      }
      
      // Return memory history if not in browser
      return this.isDev ? this.mockData : this.memoryHistory;
    } catch (error) {
      console.error('Error getting shipping history:', error);
      
      // Return mock data in development or empty array in production
      return this.isDev ? this.mockData : [];
    }
  }

  async addToHistory(labelData) {
    try {
      const history = await this.getHistory();
      const newEntry = {
        ...labelData,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: labelData.createdAt || new Date().toISOString()
      };

      // Add to beginning of array and limit size
      history.unshift(newEntry);
      if (history.length > this.MAX_HISTORY_ITEMS) {
        history.pop();
      }

      // Update memory history and persist if possible
      this.memoryHistory = history;
      await this.saveHistory(history);
      
      return { success: true, entry: newEntry };
    } catch (error) {
      console.error('Error adding to shipping history:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteFromHistory(labelId) {
    try {
      const history = await this.getHistory();
      const filtered = history.filter(item => item.id !== labelId);
      
      // Update memory history and persist if possible
      this.memoryHistory = filtered;
      await this.saveHistory(filtered);
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting from shipping history:', error);
      return { success: false, error: error.message };
    }
  }

  async searchHistory(query) {
    try {
      if (!query) return this.getHistory();
      
      const history = await this.getHistory();
      return history.filter(item => {
        const searchString = JSON.stringify(item).toLowerCase();
        return searchString.includes(query.toLowerCase());
      });
    } catch (error) {
      console.error('Error searching shipping history:', error);
      return [];
    }
  }

  async saveHistory(history) {
    try {
      // Update in-memory history
      this.memoryHistory = history;
      
      // Only try to use localStorage in browser environment
      if (isBrowser) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error saving shipping history:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Clear history
  async clearHistory() {
    try {
      this.memoryHistory = [];
      
      if (isBrowser) {
        localStorage.removeItem(this.STORAGE_KEY);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error clearing shipping history:', error);
      return { success: false, error: error.message };
    }
  }
}

export const shippingHistoryService = new ShippingHistoryService(); 