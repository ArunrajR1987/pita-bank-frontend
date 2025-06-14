/**
 * Password encryption utility for React client
 * This file provides functions to encrypt passwords before sending them to the server
 */

/**
 * Fetches the public key from the server
 * @returns {Promise<string>} The public key as a Base64 string
 */
export const fetchPublicKey = async (): Promise<string> => {
  try {
    const response = await fetch('/api/security/public-key');
    if (!response.ok) {
      throw new Error('Failed to fetch public key');
    }
    const data = await response.json();
    return data.publicKey;
  } catch (error) {
    console.error('Error fetching public key:', error);
    throw error;
  }
};

/**
 * Encrypts a password using RSA with the server's public key
 * @param {string} password - The plain text password to encrypt
 * @param {string} publicKeyBase64 - The public key as a Base64 string
 * @returns {Promise<string>} - The encrypted password as a Base64 string
 */
export const encryptPassword = async (password: string, publicKeyBase64: string): Promise<string> => {
  try {
    // Import the public key
    const publicKey = await importPublicKey(publicKeyBase64);
    
    // Encrypt the password
    const encodedPassword = new TextEncoder().encode(password);
    const encryptedBuffer = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP"
      },
      publicKey,
      encodedPassword
    );
    
    // Convert to Base64
    return arrayBufferToBase64(encryptedBuffer);
  } catch (error) {
    console.error("Error encrypting password:", error);
    throw error;
  }
};

/**
 * Imports a public key from a Base64 string
 * @param {string} publicKeyBase64 - The public key as a Base64 string
 * @returns {Promise<CryptoKey>} - The imported public key
 */
const importPublicKey = async (publicKeyBase64: string): Promise<CryptoKey> => {
  // Convert Base64 to ArrayBuffer
  const binaryString = window.atob(publicKeyBase64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  // Import the key
  return window.crypto.subtle.importKey(
    "spki",
    bytes,
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    false,
    ["encrypt"]
  );
};

/**
 * Converts an ArrayBuffer to a Base64 string
 * @param {ArrayBuffer} buffer - The buffer to convert
 * @returns {string} - The Base64 string
 */
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};