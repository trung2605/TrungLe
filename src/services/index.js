// Central service exports
// Provides a single entry point for all services

// API Services
export { default as api } from './api';
export * from './api';

export { default as mockApiService } from './mockApi';
export * from './mockApi';

// Communication Services
export { default as emailService } from './emailService';
export * from './emailService';

// Analytics Services
export { default as analyticsService } from './analyticsService';
export * from './analyticsService';

// Storage Services
export { default as storageService } from './storageService';
export * from './storageService';

// Service configuration
export const SERVICE_CONFIG = {
  // Environment flags
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // API configuration
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
  useMockApi: process.env.REACT_APP_USE_MOCK_API === 'true',
  
  // EmailJS configuration
  emailjsConfigured: !!(
    process.env.REACT_APP_EMAILJS_SERVICE_ID &&
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID &&
    process.env.REACT_APP_EMAILJS_PUBLIC_KEY
  ),
  
  // Analytics configuration
  analyticsConfigured: !!process.env.REACT_APP_GA_TRACKING_ID,
  
  // Features flags
  features: {
    analytics: process.env.REACT_APP_ENABLE_ANALYTICS !== 'false',
    email: process.env.REACT_APP_ENABLE_EMAIL !== 'false',
    offline: process.env.REACT_APP_ENABLE_OFFLINE !== 'false',
  },
};

// Service health checker
export const checkServiceHealth = () => {
  const health = {
    timestamp: new Date().toISOString(),
    services: {
      api: {
        status: SERVICE_CONFIG.apiBaseUrl ? 'configured' : 'not_configured',
        mockMode: SERVICE_CONFIG.useMockApi,
      },
      email: {
        status: SERVICE_CONFIG.emailjsConfigured ? 'configured' : 'not_configured',
        provider: 'EmailJS',
      },
      analytics: {
        status: SERVICE_CONFIG.analyticsConfigured ? 'configured' : 'not_configured',
        provider: 'Google Analytics',
      },
      storage: {
        status: 'available',
        localStorage: typeof Storage !== 'undefined',
        sessionStorage: typeof sessionStorage !== 'undefined',
      },
    },
    features: SERVICE_CONFIG.features,
    environment: {
      nodeEnv: process.env.NODE_ENV,
      isDevelopment: SERVICE_CONFIG.isDevelopment,
      isProduction: SERVICE_CONFIG.isProduction,
    },
  };

  return health;
};

// Initialize services
export const initializeServices = () => {
  console.log('🚀 Initializing services...');
  
  const health = checkServiceHealth();
  
  if (SERVICE_CONFIG.isDevelopment) {
    console.log('📊 Service Health Check:', health);
  }
  
  // Log warnings for missing configurations
  if (!health.services.email.status === 'configured') {
    console.warn('⚠️ Email service not configured. Contact form will use mock mode.');
  }
  
  if (!health.services.analytics.status === 'configured') {
    console.warn('⚠️ Analytics service not configured. Tracking will be disabled.');
  }
  
  console.log('✅ Services initialized successfully');
  
  return health;
};