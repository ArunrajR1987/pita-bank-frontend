// Utility functions for token management

/**
 * Store authentication token in session storage
 * @param token The authentication token to store
 */
export const storeToken = (token: string): void => {
  try {
    // Direct storage without any abstractions
    window.sessionStorage.setItem('token', token);
    console.log('Token stored successfully:', token);
  } catch (error) {
    console.error('Error storing token in session storage:', error);
  }
};

/**
 * Retrieve authentication token from session storage
 * @returns The stored token or null if not found
 */
export const getToken = (): string | null => {
  try {
    // Direct retrieval without any abstractions
    const token = window.sessionStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error retrieving token from session storage:', error);
    return null;
  }
};

/**
 * Remove authentication token from session storage
 */
export const removeToken = (): void => {
  try {
    // Direct removal without any abstractions
    window.sessionStorage.removeItem('token');
    console.log('Token removed from session storage');
  } catch (error) {
    console.error('Error removing token from session storage:', error);
  }
};

/**
 * Check if a token exists in session storage
 * @returns Boolean indicating if token exists
 */
export const hasToken = (): boolean => {
  return !!getToken();
};