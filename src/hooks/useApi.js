import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../contexts/AppContext';

// Custom hook for API calls
export const useApi = () => {
  const { setLoading, setError, addNotification } = useApp();
  
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setLocalError] = useState(null);

  const execute = useCallback(async (apiFunction, options = {}) => {
    const { 
      showLoading = true, 
      showSuccess = false, 
      showError = true,
      successMessage = 'Operation completed successfully',
      errorMessage = 'An error occurred'
    } = options;

    try {
      if (showLoading) {
        setLoading(true);
        setIsLoading(true);
      }
      
      setLocalError(null);
      setError(null);

      const response = await apiFunction();
      setData(response.data);

      if (showSuccess) {
        addNotification({
          type: 'success',
          message: successMessage,
        });
      }

      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || errorMessage;
      setLocalError(errorMsg);
      setError(errorMsg);

      if (showError) {
        addNotification({
          type: 'error',
          message: errorMsg,
        });
      }

      throw err;
    } finally {
      if (showLoading) {
        setLoading(false);
        setIsLoading(false);
      }
    }
  }, [setLoading, setError, addNotification]);

  const reset = useCallback(() => {
    setData(null);
    setLocalError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    execute,
    reset,
  };
};

// Hook for fetching data with automatic loading states
export const useFetch = (apiFunction, dependencies = []) => {
  const { execute, ...rest } = useApi();
  
  useEffect(() => {
    if (apiFunction) {
      execute(apiFunction, { showLoading: false });
    }
  }, dependencies);

  return { execute, ...rest };
};

// Hook for mutations (POST, PUT, DELETE)
export const useMutation = () => {
  const { execute, ...rest } = useApi();
  
  const mutate = useCallback((apiFunction, options = {}) => {
    return execute(apiFunction, {
      showSuccess: true,
      ...options,
    });
  }, [execute]);

  return { mutate, ...rest };
};