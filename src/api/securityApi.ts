/**
 * API functions for security-related operations
 */

/**
 * Fetches the public key from the server
 * @returns {Promise<string>} The public key as a Base64 string
 */
export const fetchPublicKey = async (): Promise<string> => {
  const response = await fetch('/api/security/public-key');
  if (!response.ok) {
    throw new Error(`Failed to fetch public key: ${response.statusText}`);
  }
  const data = await response.json();
  return data.publicKey;
};

/**
 * Registers a new user with encrypted password
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} The response from the server
 */
export const registerUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<any> => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  
  return data;
};

/**
 * Logs in a user with encrypted password
 * @param {Object} credentials - User login credentials
 * @returns {Promise<Object>} The response from the server
 */
export const loginUser = async (credentials: {
  username: string;
  password: string;
}): Promise<any> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  
  return data;
};