# Secure Password Handling

This document explains how to use the secure password handling components in the Pita Bank frontend application.

## Overview

To prevent password exposure in transit, this application uses client-side RSA encryption for passwords. The server provides a public key that the client uses to encrypt passwords before sending them to the server. The server then decrypts the passwords using its private key.

## Components

### 1. Password Encryption Utility

Located at `src/utils/passwordEncryption.ts`, this utility provides functions for:
- Fetching the public key from the server
- Encrypting passwords using the public key

### 2. Password Encryption Hook

Located at `src/hooks/usePasswordEncryption.ts`, this hook:
- Fetches the public key when first used
- Provides a function to encrypt passwords
- Tracks loading and error states

### 3. Secure Form Components

Located in `src/components/SecureForm/`:
- `SecurePasswordField.tsx`: A password input field that encrypts passwords
- `SecureLoginForm.tsx`: A complete login form with password encryption
- `SecureRegisterForm.tsx`: A complete registration form with password encryption

## Usage

### Using the SecurePasswordField Component

```tsx
import { SecurePasswordField } from '../components/SecureForm';

const MyForm = () => {
  const [password, setPassword] = useState('');
  const [encryptedPassword, setEncryptedPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use encryptedPassword in your API call
    api.login({ password: encryptedPassword });
  };

  return (
    <form onSubmit={handleSubmit}>
      <SecurePasswordField
        value={password}
        onChange={setPassword}
        onEncryptedValueChange={setEncryptedPassword}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### Using the Complete Secure Forms

```tsx
import { SecureLoginForm } from '../components/SecureForm';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      setError(null);
      // The password in data is already encrypted
      await api.login(data);
      // Handle successful login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <SecureLoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
    </div>
  );
};
```

## Security Considerations

1. **Key Management**: The server generates a new key pair on startup. In a production environment, consider using a more robust key management system.

2. **HTTPS**: Always use HTTPS in production to protect all data in transit.

3. **Fallback**: If encryption fails, the system can fall back to sending the plain password over HTTPS, but this is less secure.

4. **Password Storage**: Passwords are still hashed using BCrypt before storage in the database.

## Implementation Details

1. The client fetches the public key from `/api/security/public-key`
2. The client encrypts the password using the Web Crypto API
3. The encrypted password is sent to the server
4. The server decrypts the password using its private key
5. The server processes the authentication as usual