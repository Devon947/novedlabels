import { EasyPostProvider } from './easypost';
// Import other providers as they are implemented

export class ShippingProviderFactory {
  static createProvider(providerId, apiKey) {
    switch (providerId) {
      case 'easypost':
        return new EasyPostProvider(apiKey);
      case 'pirateship':
        // TODO: Implement PirateShip provider
        throw new Error('PirateShip integration coming soon');
      case 'stampscom':
        // TODO: Implement Stamps.com provider
        throw new Error('Stamps.com integration coming soon');
      case 'shippo':
        // TODO: Implement Shippo provider
        throw new Error('Shippo integration coming soon');
      default:
        throw new Error(`Unknown provider: ${providerId}`);
    }
  }

  static async validateApiKey(providerId, apiKey) {
    try {
      const provider = this.createProvider(providerId, apiKey);
      // Try to make a simple API call to validate the key
      await provider.validateAddress({
        name: 'Test User',
        street1: '123 Test St',
        city: 'Test City',
        state: 'CA',
        zip: '12345',
        country: 'US'
      });
      return { valid: true };
    } catch (error) {
      return { 
        valid: false, 
        error: error.message 
      };
    }
  }
} 