import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getToken, removeToken, isTokenExpired } from '../utils/tokenStorage';

/**
 * API base URL from environment variables with fallback
 */
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Axios instance with default configuration
 */
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

/**
 * Request interceptor to include auth token and handle token expiration
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Add token to request if available
    const token = getToken();
    
    if (token) {
      // Check if token is expired
      if (isTokenExpired()) {
        // Remove expired token
        removeToken();
        
        // Redirect to login if not already there
        if (window.location.pathname !== '/login') {
          window.location.href = '/login?expired=true';
        }
        
        // Don't add expired token to request
        return config;
      }
      
      // Add valid token to request headers
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle common errors
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      // Remove token
      removeToken();
      
      // Redirect to login with appropriate message
      const currentPath = window.location.pathname;
      if (currentPath !== '/login') {
        window.location.href = '/login?session=expired';
      }
    }
    
    // Handle server errors
    if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    }
    
    // Handle network errors
    if (error.message === 'Network Error') {
      console.error('Network error - API server may be down');
    }
    
    // Let the error propagate to be handled by components
    return Promise.reject(error);
  }
);

export default axiosInstance;