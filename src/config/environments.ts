// Environment configuration for different deployment stages
export interface Environment {
  apiBaseUrl: string;
  authEndpoint: string;
  mapApiKey: string;
  paymentApiKey: string;
  environment: 'development' | 'staging' | 'production';
  features: {
    realTimeTracking: boolean;
    paymentIntegration: boolean;
    driverRating: boolean;
    tripHistory: boolean;
  };
}

const environments: Record<string, Environment> = {
  development: {
    apiBaseUrl: 'https://api-dev.ridexpress.com/v1',
    authEndpoint: 'https://auth-dev.ridexpress.com',
    mapApiKey: 'dev_map_api_key',
    paymentApiKey: 'dev_payment_key',
    environment: 'development',
    features: {
      realTimeTracking: true,
      paymentIntegration: false,
      driverRating: true,
      tripHistory: true,
    },
  },
  staging: {
    apiBaseUrl: 'https://api-staging.ridexpress.com/v1',
    authEndpoint: 'https://auth-staging.ridexpress.com',
    mapApiKey: 'staging_map_api_key',
    paymentApiKey: 'staging_payment_key',
    environment: 'staging',
    features: {
      realTimeTracking: true,
      paymentIntegration: true,
      driverRating: true,
      tripHistory: true,
    },
  },
  production: {
    apiBaseUrl: 'https://api.ridexpress.com/v1',
    authEndpoint: 'https://auth.ridexpress.com',
    mapApiKey: 'prod_map_api_key',
    paymentApiKey: 'prod_payment_key',
    environment: 'production',
    features: {
      realTimeTracking: true,
      paymentIntegration: true,
      driverRating: true,
      tripHistory: true,
    },
  },
};

export const getEnvironment = (): Environment => {
  const env = import.meta.env.VITE_APP_ENV || 'development';
  return environments[env] || environments.development;
};

export default getEnvironment();