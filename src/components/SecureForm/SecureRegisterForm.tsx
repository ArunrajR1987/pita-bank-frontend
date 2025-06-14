import React, { useState, FormEvent } from 'react';
import { SecurePasswordField } from './index';
import usePasswordEncryption from '../../hooks/usePasswordEncryption';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SecureRegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  loading?: boolean;
  error?: string | null;
}

/**
 * A secure registration form component that encrypts passwords before submission
 */
const SecureRegisterForm: React.FC<SecureRegisterFormProps> = ({
  onSubmit,
  loading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [encryptedPassword, setEncryptedPassword] = useState<string | null>(null);
  const { publicKeyAvailable } = usePasswordEncryption();

  // Handle form field changes
  const handleChange = (field: keyof RegisterFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
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
    <form onSubmit={handleSubmit} className="secure-register-form">
      <div className="form-group">
        <label htmlFor="firstName">
          First Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange('firstName')}
          required
          disabled={loading}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="lastName">
          Last Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange('lastName')}
          required
          disabled={loading}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange('email')}
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
        autoComplete="new-password"
        encryptOnBlur={true}
      />
      
      {!publicKeyAvailable && (
        <div className="warning-message">
          Secure password encryption is not available. Your password will be sent in a less secure format.
        </div>
      )}
      
      {error && <div className="error-message">{error}</div>}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default SecureRegisterForm;