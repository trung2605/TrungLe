import React, { createContext, useContext, useReducer, useState } from 'react';

const AppContext = createContext();

// Initial state
const initialState = {
  user: {
    name: 'Lê Trí Trung',
    title: 'Java Developer | Computer Science Student',
    email: 'letritrung2605@gmail.com',
    phone: '(+84) 912 158 715',
    location: 'Hai Chau, Da Nang, Viet Nam',
    birthday: '26/05/2005',
    facebook: 'Trung Lê',
  },
  isLoading: false,
  error: null,
  activeSection: 'home',
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_ACTIVE_SECTION: 'SET_ACTIVE_SECTION',
  UPDATE_USER: 'UPDATE_USER',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case ActionTypes.SET_ACTIVE_SECTION:
      return { ...state, activeSection: action.payload };
    case ActionTypes.UPDATE_USER:
      return { ...state, user: { ...state.user, ...action.payload } };
    case ActionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

// Custom hook to use App context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// App Provider component
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [notifications, setNotifications] = useState([]);

  // Actions
  const setLoading = (loading) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error });
  };

  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
  };

  const setActiveSection = (section) => {
    dispatch({ type: ActionTypes.SET_ACTIVE_SECTION, payload: section });
  };

  const updateUser = (userData) => {
    dispatch({ type: ActionTypes.UPDATE_USER, payload: userData });
  };

  const addNotification = (notification) => {
    const id = Date.now();
    const newNotification = { id, ...notification };
    setNotifications(prev => [...prev, newNotification]);

    // Auto remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const value = {
    ...state,
    notifications,
    setLoading,
    setError,
    clearError,
    setActiveSection,
    updateUser,
    addNotification,
    removeNotification,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};