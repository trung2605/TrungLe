// Storage service for handling localStorage and sessionStorage operations
// Provides type-safe storage with error handling and data validation

class StorageService {
  constructor() {
    this.isAvailable = this.checkStorageAvailability();
  }

  /**
   * Check if localStorage is available
   * @returns {boolean} Whether localStorage is available
   */
  checkStorageAvailability() {
    try {
      const test = 'localStorage-test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      console.warn('localStorage is not available:', error);
      return false;
    }
  }

  /**
   * Store data in localStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   * @param {Object} options - Storage options
   * @param {number} options.expiry - Expiry time in milliseconds
   * @returns {boolean} Whether storage was successful
   */
  setItem(key, value, options = {}) {
    if (!this.isAvailable) {
      console.warn('Storage not available, cannot set item:', key);
      return false;
    }

    try {
      const item = {
        value,
        timestamp: Date.now(),
        expiry: options.expiry ? Date.now() + options.expiry : null,
      };

      localStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error('Error setting localStorage item:', error);
      return false;
    }
  }

  /**
   * Get data from localStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any} Stored value or default value
   */
  getItem(key, defaultValue = null) {
    if (!this.isAvailable) {
      console.warn('Storage not available, returning default value for:', key);
      return defaultValue;
    }

    try {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) {
        return defaultValue;
      }

      const item = JSON.parse(itemStr);

      // Check if item has expired
      if (item.expiry && Date.now() > item.expiry) {
        this.removeItem(key);
        return defaultValue;
      }

      return item.value;
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return defaultValue;
    }
  }

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   * @returns {boolean} Whether removal was successful
   */
  removeItem(key) {
    if (!this.isAvailable) {
      console.warn('Storage not available, cannot remove item:', key);
      return false;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing localStorage item:', error);
      return false;
    }
  }

  /**
   * Clear all localStorage data
   * @returns {boolean} Whether clearing was successful
   */
  clear() {
    if (!this.isAvailable) {
      console.warn('Storage not available, cannot clear');
      return false;
    }

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  /**
   * Get all keys from localStorage
   * @returns {Array<string>} Array of storage keys
   */
  getAllKeys() {
    if (!this.isAvailable) {
      return [];
    }

    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('Error getting localStorage keys:', error);
      return [];
    }
  }

  /**
   * Store data in sessionStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   * @returns {boolean} Whether storage was successful
   */
  setSessionItem(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting sessionStorage item:', error);
      return false;
    }
  }

  /**
   * Get data from sessionStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any} Stored value or default value
   */
  getSessionItem(key, defaultValue = null) {
    try {
      const itemStr = sessionStorage.getItem(key);
      return itemStr ? JSON.parse(itemStr) : defaultValue;
    } catch (error) {
      console.error('Error getting sessionStorage item:', error);
      return defaultValue;
    }
  }

  /**
   * Remove item from sessionStorage
   * @param {string} key - Storage key
   * @returns {boolean} Whether removal was successful
   */
  removeSessionItem(key) {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing sessionStorage item:', error);
      return false;
    }
  }

  /**
   * Store user preferences
   * @param {Object} preferences - User preferences object
   * @returns {boolean} Whether storage was successful
   */
  setUserPreferences(preferences) {
    return this.setItem('user-preferences', preferences);
  }

  /**
   * Get user preferences
   * @returns {Object} User preferences object
   */
  getUserPreferences() {
    return this.getItem('user-preferences', {
      theme: 'light',
      language: 'en',
      notifications: true,
      autoSave: true,
    });
  }

  /**
   * Store app settings
   * @param {Object} settings - App settings object
   * @returns {boolean} Whether storage was successful
   */
  setAppSettings(settings) {
    return this.setItem('app-settings', settings);
  }

  /**
   * Get app settings
   * @returns {Object} App settings object
   */
  getAppSettings() {
    return this.getItem('app-settings', {
      sidebarCollapsed: false,
      gridView: true,
      itemsPerPage: 10,
    });
  }

  /**
   * Store form data temporarily
   * @param {string} formId - Form identifier
   * @param {Object} formData - Form data object
   * @returns {boolean} Whether storage was successful
   */
  saveFormData(formId, formData) {
    return this.setSessionItem(`form-data-${formId}`, formData);
  }

  /**
   * Get saved form data
   * @param {string} formId - Form identifier
   * @returns {Object|null} Saved form data or null
   */
  getSavedFormData(formId) {
    return this.getSessionItem(`form-data-${formId}`, null);
  }

  /**
   * Clear saved form data
   * @param {string} formId - Form identifier
   * @returns {boolean} Whether clearing was successful
   */
  clearFormData(formId) {
    return this.removeSessionItem(`form-data-${formId}`);
  }

  /**
   * Store authentication token
   * @param {string} token - Authentication token
   * @param {number} expiryTime - Token expiry time in milliseconds
   * @returns {boolean} Whether storage was successful
   */
  setAuthToken(token, expiryTime) {
    return this.setItem('auth-token', token, { expiry: expiryTime });
  }

  /**
   * Get authentication token
   * @returns {string|null} Authentication token or null
   */
  getAuthToken() {
    return this.getItem('auth-token', null);
  }

  /**
   * Clear authentication token
   * @returns {boolean} Whether clearing was successful
   */
  clearAuthToken() {
    return this.removeItem('auth-token');
  }

  /**
   * Get storage usage information
   * @returns {Object} Storage usage statistics
   */
  getStorageInfo() {
    if (!this.isAvailable) {
      return { available: false };
    }

    try {
      let totalSize = 0;
      const keys = this.getAllKeys();

      keys.forEach(key => {
        const value = localStorage.getItem(key);
        totalSize += key.length + (value ? value.length : 0);
      });

      return {
        available: true,
        totalKeys: keys.length,
        totalSize: totalSize,
        totalSizeKB: (totalSize / 1024).toFixed(2),
        keys: keys,
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { available: false, error: error.message };
    }
  }
}

// Create singleton instance
const storageService = new StorageService();

export default storageService;

// Named exports for convenience
export const setItem = (key, value, options) => storageService.setItem(key, value, options);
export const getItem = (key, defaultValue) => storageService.getItem(key, defaultValue);
export const removeItem = (key) => storageService.removeItem(key);
export const setUserPreferences = (preferences) => storageService.setUserPreferences(preferences);
export const getUserPreferences = () => storageService.getUserPreferences();
export const setAuthToken = (token, expiryTime) => storageService.setAuthToken(token, expiryTime);
export const getAuthToken = () => storageService.getAuthToken();
export const clearAuthToken = () => storageService.clearAuthToken();