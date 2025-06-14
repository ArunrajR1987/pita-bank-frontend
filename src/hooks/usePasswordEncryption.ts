import { useState, useEffect, useCallback } from 'react';
import { fetchPublicKey, encryptPassword } from '../utils/passwordEncryption';

/**
 * Custom hook for password encryption
 * This hook manages the public key and provides a function to encrypt passwords
 */
const usePasswordEncryption = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch the public key when the hook is first used
  useEffect(() => {
    const getPublicKey = async () => {
      try {
        setLoading(true);
        const key = await fetchPublicKey();
        setPublicKey(key);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch public key'));
        console.error('Error fetching public key:', err);
      } finally {
        setLoading(false);
      }
    };

    getPublicKey();
  }, []);

  /**
   * Encrypts a password using the fetched public key
   * @param password The plain text password to encrypt
   * @returns The encrypted password or null if encryption fails
   */
  const encryptPasswordWithKey = useCallback(
    async (password: string): Promise<string | null> => {
      if (!publicKey) {
        setError(new Error('Public key not available'));
        return null;
      }

      try {
        return await encryptPassword(password, publicKey);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to encrypt password'));
        console.error('Error encrypting password:', err);
        return null;
      }
    },
    [publicKey]
  );

  return {
    encryptPassword: encryptPasswordWithKey,
    loading,
    error,
    publicKeyAvailable: !!publicKey,
  };
};

export default usePasswordEncryption;