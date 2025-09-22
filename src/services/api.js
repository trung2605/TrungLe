import axios from 'axios';
import config from '../config/appConfig';

// Create axios instance with base configuration
const API = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', config);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', response);
    }
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('auth-token');
      window.location.href = '/login';
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error);
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const api = {
  // User endpoints
  user: {
    getProfile: () => API.get('/user/profile'),
    updateProfile: (data) => API.put('/user/profile', data),
  },

  // Projects endpoints
  projects: {
    getAll: () => API.get('/projects'),
    getById: (id) => API.get(`/projects/${id}`),
    create: (data) => API.post('/projects', data),
    update: (id, data) => API.put(`/projects/${id}`, data),
    delete: (id) => API.delete(`/projects/${id}`),
  },

  // Education endpoints
  education: {
    getAll: () => API.get('/education'),
    getById: (id) => API.get(`/education/${id}`),
  },

  // Skills endpoints
  skills: {
    getAll: () => API.get('/skills'),
    getByCategory: (category) => API.get(`/skills?category=${category}`),
  },

  // Certificates endpoints
  certificates: {
    getAll: () => API.get('/certificates'),
    getById: (id) => API.get(`/certificates/${id}`),
  },

  // Prizes endpoints
  prizes: {
    getAll: () => API.get('/prizes'),
    getById: (id) => API.get(`/prizes/${id}`),
  },

  // Activities endpoints
  activities: {
    getAll: () => API.get('/activities'),
    getById: (id) => API.get(`/activities/${id}`),
  },

  // Contact endpoints
  contact: {
    sendMessage: (data) => API.post('/contact/send', data),
    subscribe: (email) => API.post('/contact/subscribe', { email }),
  },

  // Analytics endpoints
  analytics: {
    trackPageView: (page) => API.post('/analytics/pageview', { page }),
    trackEvent: (event, data) => API.post('/analytics/event', { event, data }),
  },
};

// Individual API functions for easier imports
export const getProjects = () => api.projects.getAll();
export const getProject = (id) => api.projects.getById(id);
export const createProject = (data) => api.projects.create(data);
export const updateProject = (id, data) => api.projects.update(id, data);
export const deleteProject = (id) => api.projects.delete(id);

export const getEducation = () => api.education.getAll();
export const getSkills = () => api.skills.getAll();
export const getCertificates = () => api.certificates.getAll();
export const getPrizes = () => api.prizes.getAll();
export const getActivities = () => api.activities.getAll();

export const sendContactMessage = (data) => api.contact.sendMessage(data);
export const subscribeNewsletter = (email) => api.contact.subscribe(email);

export default API;