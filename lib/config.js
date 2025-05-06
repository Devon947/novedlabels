/**
 * Configuration helper for managing environment variables with fallbacks
 */

const isDev = process.env.NODE_ENV !== 'production';

// Default development values (DO NOT use these in production)
const devDefaults = {
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseAnonKey: 'your-anon-key',
  encryptionKey: 'development_key_min_32_chars_long_here',
  stripePublishableKey: 'pk_test_your_key',
  stripeSecretKey: 'sk_test_your_key',
  easypostApiKey: 'your_test_key'
};

// Export config with fallbacks to devDefaults in development
export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || (isDev ? devDefaults.supabaseUrl : undefined),
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || (isDev ? devDefaults.supabaseAnonKey : undefined),
  },
  encryption: {
    key: process.env.ENCRYPTION_KEY || (isDev ? devDefaults.encryptionKey : undefined),
  },
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || (isDev ? devDefaults.stripePublishableKey : undefined),
    secretKey: process.env.STRIPE_SECRET_KEY || (isDev ? devDefaults.stripeSecretKey : undefined),
  },
  easypost: {
    apiKey: process.env.EASYPOST_API_KEY || (isDev ? devDefaults.easypostApiKey : undefined),
  }
};

// Validation helper for required config values
export const validateConfig = () => {
  const missingVars = [];
  
  // Check supabase config
  if (!config.supabase.url) missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!config.supabase.anonKey) missingVars.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  // Check encryption config
  if (!config.encryption.key) missingVars.push('ENCRYPTION_KEY');
  
  // More checks as needed...
  
  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    if (!isDev) {
      throw new Error('Missing required environment variables');
    }
  }
};

// In development, we'll use mock data
export const useMockData = isDev; 