// Analytics service for tracking user interactions and page views
// Integrates with Google Analytics and custom tracking

class AnalyticsService {
  constructor() {
    this.gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID;
    this.isProduction = process.env.NODE_ENV === 'production';
    this.isInitialized = false;
    
    // Initialize analytics if in production and tracking ID is available
    if (this.isProduction && this.gaTrackingId) {
      this.initializeGA();
    }
  }

  /**
   * Initialize Google Analytics
   */
  initializeGA() {
    try {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaTrackingId}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', this.gaTrackingId, {
        page_title: document.title,
        page_location: window.location.href,
      });

      this.isInitialized = true;
      console.log('Google Analytics initialized');
    } catch (error) {
      console.error('Failed to initialize Google Analytics:', error);
    }
  }

  /**
   * Track page view
   * @param {string} path - Page path
   * @param {string} title - Page title
   */
  trackPageView(path, title = document.title) {
    try {
      // Google Analytics tracking
      if (this.isInitialized && window.gtag) {
        window.gtag('config', this.gaTrackingId, {
          page_path: path,
          page_title: title,
        });
      }

      // Custom tracking in development
      if (!this.isProduction) {
        console.log('Analytics: Page view tracked', { path, title });
      }

      // Store page view in local storage for offline analytics
      this.storeOfflineEvent('page_view', { path, title, timestamp: Date.now() });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  /**
   * Track custom event
   * @param {string} eventName - Event name
   * @param {Object} parameters - Event parameters
   */
  trackEvent(eventName, parameters = {}) {
    try {
      // Google Analytics event tracking
      if (this.isInitialized && window.gtag) {
        window.gtag('event', eventName, {
          ...parameters,
          event_category: parameters.category || 'User Interaction',
          event_label: parameters.label || '',
          value: parameters.value || 0,
        });
      }

      // Custom tracking in development
      if (!this.isProduction) {
        console.log('Analytics: Event tracked', { eventName, parameters });
      }

      // Store event in local storage for offline analytics
      this.storeOfflineEvent('custom_event', { 
        name: eventName, 
        parameters, 
        timestamp: Date.now() 
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  /**
   * Track user interaction events
   * @param {string} action - Action performed
   * @param {string} category - Event category
   * @param {string} label - Event label
   * @param {number} value - Event value
   */
  trackInteraction(action, category = 'User Interaction', label = '', value = 0) {
    this.trackEvent('interaction', {
      action,
      category,
      label,
      value,
    });
  }

  /**
   * Track form submissions
   * @param {string} formName - Form identifier
   * @param {Object} additionalData - Additional form data
   */
  trackFormSubmission(formName, additionalData = {}) {
    this.trackEvent('form_submit', {
      form_name: formName,
      category: 'Form',
      ...additionalData,
    });
  }

  /**
   * Track button clicks
   * @param {string} buttonName - Button identifier
   * @param {string} location - Button location
   */
  trackButtonClick(buttonName, location = '') {
    this.trackEvent('button_click', {
      button_name: buttonName,
      button_location: location,
      category: 'Button',
    });
  }

  /**
   * Track download events
   * @param {string} fileName - Downloaded file name
   * @param {string} fileType - File type
   */
  trackDownload(fileName, fileType = '') {
    this.trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
      category: 'Download',
    });
  }

  /**
   * Track scroll depth
   * @param {number} scrollPercentage - Scroll percentage
   */
  trackScrollDepth(scrollPercentage) {
    // Only track at certain milestones
    const milestones = [25, 50, 75, 100];
    if (milestones.includes(Math.floor(scrollPercentage))) {
      this.trackEvent('scroll_depth', {
        scroll_percentage: Math.floor(scrollPercentage),
        category: 'Engagement',
      });
    }
  }

  /**
   * Track time spent on page
   * @param {number} timeInSeconds - Time spent in seconds
   */
  trackTimeOnPage(timeInSeconds) {
    this.trackEvent('time_on_page', {
      time_seconds: timeInSeconds,
      category: 'Engagement',
    });
  }

  /**
   * Store events offline for later processing
   * @param {string} type - Event type
   * @param {Object} data - Event data
   */
  storeOfflineEvent(type, data) {
    try {
      const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      events.push({ type, data });
      
      // Keep only last 100 events to prevent storage overflow
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }
      
      localStorage.setItem('analytics_events', JSON.stringify(events));
    } catch (error) {
      console.error('Error storing offline event:', error);
    }
  }

  /**
   * Get stored offline events
   * @returns {Array} Array of stored events
   */
  getOfflineEvents() {
    try {
      return JSON.parse(localStorage.getItem('analytics_events') || '[]');
    } catch (error) {
      console.error('Error retrieving offline events:', error);
      return [];
    }
  }

  /**
   * Clear stored offline events
   */
  clearOfflineEvents() {
    try {
      localStorage.removeItem('analytics_events');
    } catch (error) {
      console.error('Error clearing offline events:', error);
    }
  }

  /**
   * Get analytics configuration status
   * @returns {Object} Configuration status
   */
  getConfigStatus() {
    return {
      gaTrackingId: !!this.gaTrackingId,
      isInitialized: this.isInitialized,
      isProduction: this.isProduction,
    };
  }
}

// Create singleton instance
const analyticsService = new AnalyticsService();

export default analyticsService;

// Named exports for convenience
export const trackPageView = (path, title) => analyticsService.trackPageView(path, title);
export const trackEvent = (eventName, parameters) => analyticsService.trackEvent(eventName, parameters);
export const trackInteraction = (action, category, label, value) => analyticsService.trackInteraction(action, category, label, value);
export const trackFormSubmission = (formName, additionalData) => analyticsService.trackFormSubmission(formName, additionalData);
export const trackButtonClick = (buttonName, location) => analyticsService.trackButtonClick(buttonName, location);
export const trackDownload = (fileName, fileType) => analyticsService.trackDownload(fileName, fileType);
export const trackScrollDepth = (scrollPercentage) => analyticsService.trackScrollDepth(scrollPercentage);
export const trackTimeOnPage = (timeInSeconds) => analyticsService.trackTimeOnPage(timeInSeconds);