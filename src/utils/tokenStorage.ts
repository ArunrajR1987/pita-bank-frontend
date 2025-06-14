/**
 * Token Storage Utility
 * 
 * A centralized utility for managing authentication tokens in session storage.
 * This provides a consistent interface for storing, retrieving, and removing tokens,
 * with error handling and logging.
 */

const TOKEN_KEY = 'auth_token';

/**
 * Store authentication token in session storage
 * @param token The authentication token to store
 * @returns boolean indicating success
 */
export const storeToken = (token: string): boolean => {
  try {
    if (!token) {
      console.warn('Attempted to store empty token');
      return false;
    }
    
    window.sessionStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.error('Error storing token in session storage:', error);
    return false;
  }
};

/**
 * Retrieve authentication token from session storage
 * @returns The stored token or null if not found
 */
export const getToken = (): string | null => {
  try {
    return window.sessionStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error retrieving token from session storage:', error);
    return null;
  }
};

/**
 * Remove authentication token from session storage
 * @returns boolean indicating success
 */
export const removeToken = (): boolean => {
  try {
    window.sessionStorage.removeItem(TOKEN_KEY);
    return true;
  } catch (error) {
    console.error('Error removing token from session storage:', error);
    return false;
  }
};

/**
 * Check if a token exists in session storage
 * @returns Boolean indicating if token exists
 */
export const hasToken = (): boolean => {
  return !!getToken();
};

/**
 * Get token expiration time
 * @param token JWT token
 * @returns Expiration timestamp or null if invalid
 */
export const getTokenExpiration = (token: string): number | null => {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    
    const decoded = JSON.parse(atob(payload));
    return decoded.exp ? decoded.exp * 1000 : null; // Convert to milliseconds
  } catch (error) {
    console.error('Error parsing token expiration:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @returns Boolean indicating if token is expired
 */
export const isTokenExpired = (): boolean => {
  const token = getToken();
  if (!token) return true;
  
  const expiration = getTokenExpiration(token);
  if (!expiration) return true;
  
  return Date.now() > expiration;
};

export default {
  storeToken,
  getToken,
  removeToken,
  hasToken,
  isTokenExpired
};