import React, { useState, FormEvent } from 'react';
import { SecurePasswordField } from './index';
import usePasswordEncryption from '../../hooks/usePasswordEncryption';

interface LoginFormData {
  username: string;
  password: string;
}

interface SecureLoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  loading?: boolean;
  error?: string | null;
}

/**
 * A secure login form component that encrypts passwords before submission
 */
const SecureLoginForm: React.FC<SecureLoginFormProps> = ({
  onSubmit,
  loading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const [encryptedPassword, setEncryptedPassword] = useState<string | null>(null);
  const { publicKeyAvailable } = usePasswordEncryption();

  // Handle username change
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      username: e.target.value,
    });
  };

  // Handle password change directly
  const handlePasswordChange = (value: string) => {
    setFormData({
      ...formData,
      password: value,
    });
  };

  // Store the encrypted password when it's available
  const handleEncryptedPasswordChange = (value: string) => {
    setEncryptedPassword(value);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Use the encrypted password if available, otherwise use the plain password
    // In a production environment, you should always use the encrypted password
    const submissionData = {
      ...formData,
      password: encryptedPassword || formData.password,
    };
    
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="secure-login-form">
      <div className="form-group">
        <label htmlFor="username">
          Username <span className="required">*</span>
        </label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleUsernameChange}
          required
          disabled={loading}
        />
      </div>
      
      <SecurePasswordField
        value={formData.password}
        onChange={handlePasswordChange}
        onEncryptedValueChange={handleEncryptedPasswordChange}
        required
        disabled={loading}
        encryptOnBlur={true}
      />
      
      {!publicKeyAvailable && (
        <div className="warning-message">
          Secure password encryption is not available. Your password will be sent in a less secure format.
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default SecureLoginForm;