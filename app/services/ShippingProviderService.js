import { configService } from './ConfigService';

// Default timeout for API requests (10 seconds)
const API_TIMEOUT = 10000;

// Helper to implement timeouts on fetch requests
const fetchWithTimeout = async (url, options, timeout = API_TIMEOUT) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  const response = await fetch(url, {
    ...options,
    signal: controller.signal
  });
  
  clearTimeout(id);
  return response;
};

class ShippingProviderService {
  constructor() {
    this.providers = {
      easypost: {
        name: 'EasyPost',
        features: ['Address Validation', 'Rate Comparison', 'Label Generation', 'Tracking'],
        apiKeyRequired: true,
        configured: false
      },
      pirateship: {
        name: 'PirateShip',
        features: ['USPS Integration', 'Rate Comparison', 'Label Generation', 'Tracking'],
        apiKeyRequired: true,
        configured: false
      },
      stamps: {
        name: 'Stamps.com',
        features: ['USPS Integration', 'Label Generation', 'Tracking'],
        apiKeyRequired: true,
        configured: false
      },
      shippo: {
        name: 'Shippo',
        features: ['Multi-carrier Support', 'Rate Comparison', 'Label Generation', 'Tracking'],
        apiKeyRequired: true,
        configured: false
      }
    };
    
    this.isDev = process.env.NODE_ENV !== 'production';
    
    // In development mode, configure all providers for demo
    if (this.isDev) {
      this.configureAllProvidersForDev();
    }
  }
  
  configureAllProvidersForDev() {
    for (const providerId of Object.keys(this.providers)) {
      this.providers[providerId].configured = true;
    }
    console.log('🧪 Development mode: All shipping providers configured for demo');
  }

  async init() {
    try {
      // Initialize provider configurations
      for (const providerId of Object.keys(this.providers)) {
        const apiKey = await configService.getApiKey(providerId);
        if (apiKey) {
          this.providers[providerId].configured = true;
        }
      }
      console.log('✅ Shipping provider service initialized');
    } catch (error) {
      console.error('❌ Error initializing shipping providers:', error);
      // In development, don't fail - set up mock providers
      if (this.isDev) {
        this.configureAllProvidersForDev();
      }
    }
  }

  getProviders() {
    return this.providers;
  }

  async configureProvider(providerId, apiKey) {
    if (!this.providers[providerId]) {
      throw new Error(`Unknown provider: ${providerId}`);
    }

    try {
      // Validate API key
      await this.validateApiKey(providerId, apiKey);
      
      // Save API key if validation successful
      await configService.saveApiKey(providerId, apiKey);
      this.providers[providerId].configured = true;
      
      return { success: true };
    } catch (error) {
      console.error(`Error configuring provider ${providerId}:`, error);
      return { 
        success: false, 
        error: error.message || 'Error configuring provider'
      };
    }
  }

  async validateApiKey(providerId, apiKey) {
    // In development mode, accept any key
    if (this.isDev) {
      return true;
    }
    
    // Implementation would vary by provider
    switch (providerId) {
      case 'easypost':
        return this.validateEasyPostApiKey(apiKey);
      case 'pirateship':
        return this.validatePirateShipApiKey(apiKey);
      case 'stamps':
        return this.validateStampsApiKey(apiKey);
      case 'shippo':
        return this.validateShippoApiKey(apiKey);
      default:
        throw new Error(`Unknown provider: ${providerId}`);
    }
  }

  async validateEasyPostApiKey(apiKey) {
    try {
      const response = await fetchWithTimeout('https://api.easypost.com/v2/addresses', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Error validating EasyPost API key:', error);
      throw new Error('Failed to validate EasyPost API key');
    }
  }

  async validatePirateShipApiKey(apiKey) {
    try {
      const response = await fetchWithTimeout('https://api.pirateship.com/v1/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Error validating PirateShip API key:', error);
      throw new Error('Failed to validate PirateShip API key');
    }
  }

  async validateStampsApiKey(apiKey) {
    try {
      const response = await fetchWithTimeout('https://api.stamps.com/v1/account', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Error validating Stamps.com API key:', error);
      throw new Error('Failed to validate Stamps.com API key');
    }
  }

  async validateShippoApiKey(apiKey) {
    try {
      const response = await fetchWithTimeout('https://api.goshippo.com/addresses/', {
        method: 'GET',
        headers: {
          'Authorization': `ShippoToken ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Error validating Shippo API key:', error);
      throw new Error('Failed to validate Shippo API key');
    }
  }

  async generateLabel(providerId, shipmentData) {
    // For development, generate mock label data
    if (this.isDev) {
      return this.generateMockLabel(providerId, shipmentData);
    }
    
    const apiKey = await configService.getApiKey(providerId);
    if (!apiKey) {
      throw new Error(`Provider ${providerId} not configured`);
    }

    // Implementation would vary by provider
    switch (providerId) {
      case 'easypost':
        return this.generateEasyPostLabel(apiKey, shipmentData);
      case 'pirateship':
        return this.generatePirateShipLabel(apiKey, shipmentData);
      case 'stamps':
        return this.generateStampsLabel(apiKey, shipmentData);
      case 'shippo':
        return this.generateShippoLabel(apiKey, shipmentData);
      default:
        throw new Error(`Unknown provider: ${providerId}`);
    }
  }
  
  // Generate mock label data for development
  generateMockLabel(providerId, shipmentData) {
    const weight = shipmentData.weight || 1;
    const randomRate = (Math.random() * 10 + 5 + weight).toFixed(2);
    
    return {
      provider: providerId,
      rate: parseFloat(randomRate),
      tracking_number: `MOCK${Date.now().toString().substring(5)}`,
      label_url: 'https://dummyimage.com/400x600/000/fff&text=Mock+Shipping+Label',
      tracking_url: 'https://example.com/track',
      provider_name: this.providers[providerId].name,
      from_address: shipmentData.fromAddress,
      to_address: shipmentData.toAddress,
      weight: shipmentData.weight,
      created_at: new Date().toISOString()
    };
  }

  // Provider-specific label generation methods
  async generateEasyPostLabel(apiKey, shipmentData) {
    try {
      const response = await fetchWithTimeout('https://api.easypost.com/v2/shipments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formatShipmentForEasyPost(shipmentData))
      });
      
      if (!response.ok) {
        throw new Error(`EasyPost API error: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        provider: 'easypost',
        provider_name: 'EasyPost',
        rate: data.selected_rate?.rate || 0,
        tracking_number: data.tracking_code,
        label_url: data.postage_label?.label_url,
        tracking_url: `https://track.easypost.com/${data.tracking_code}`,
        created_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error generating EasyPost label:', error);
      throw error;
    }
  }
  
  // Format helper methods for each provider
  formatShipmentForEasyPost(shipmentData) {
    return {
      from_address: {
        name: shipmentData.fromName,
        street1: shipmentData.fromAddress,
        city: shipmentData.fromCity,
        state: shipmentData.fromState,
        zip: shipmentData.fromZip,
        country: 'US'
      },
      to_address: {
        name: shipmentData.toName,
        street1: shipmentData.toAddress,
        city: shipmentData.toCity,
        state: shipmentData.toState,
        zip: shipmentData.toZip,
        country: 'US'
      },
      parcel: {
        weight: shipmentData.weight
      }
    };
  }

  async generatePirateShipLabel(apiKey, shipmentData) {
    try {
      const response = await fetchWithTimeout('https://api.pirateship.com/v1/shipments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shipmentData)
      });
      
      if (!response.ok) {
        throw new Error(`PirateShip API error: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        provider: 'pirateship',
        provider_name: 'PirateShip',
        rate: data.rate || 0,
        tracking_number: data.tracking_number,
        label_url: data.label_url,
        tracking_url: data.tracking_url,
        created_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error generating PirateShip label:', error);
      throw error;
    }
  }

  async generateStampsLabel(apiKey, shipmentData) {
    try {
      const response = await fetchWithTimeout('https://api.stamps.com/v1/shipments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shipmentData)
      });
      
      if (!response.ok) {
        throw new Error(`Stamps.com API error: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        provider: 'stamps',
        provider_name: 'Stamps.com',
        rate: data.rate || 0,
        tracking_number: data.tracking_number,
        label_url: data.label_url,
        tracking_url: data.tracking_url,
        created_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error generating Stamps.com label:', error);
      throw error;
    }
  }

  async generateShippoLabel(apiKey, shipmentData) {
    try {
      const response = await fetchWithTimeout('https://api.goshippo.com/shipments/', {
        method: 'POST',
        headers: {
          'Authorization': `ShippoToken ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shipmentData)
      });
      
      if (!response.ok) {
        throw new Error(`Shippo API error: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        provider: 'shippo',
        provider_name: 'Shippo',
        rate: data.rates[0]?.amount || 0,
        tracking_number: data.tracking_number,
        label_url: data.label_url,
        tracking_url: data.tracking_url,
        created_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error generating Shippo label:', error);
      throw error;
    }
  }
}

export const shippingProviderService = new ShippingProviderService(); 