import React, { useState } from 'react';
import usePasswordEncryption from '../../hooks/usePasswordEncryption';

interface SecurePasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  onEncryptedValueChange?: (encryptedValue: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
  autoComplete?: string;
  disabled?: boolean;
  encryptOnBlur?: boolean;
}

/**
 * A secure password field component that encrypts passwords before form submission
 * This component handles both the plain text password for UI and the encrypted password for submission
 */
const SecurePasswordField: React.FC<SecurePasswordFieldProps> = ({
  value,
  onChange,
  onEncryptedValueChange,
  placeholder = 'Password',
  label = 'Password',
  required = false,
  className = '',
  autoComplete = 'current-password',
  disabled = false,
  encryptOnBlur = false,
}) => {
  const [plainPassword, setPlainPassword] = useState(value);
  const { encryptPassword, loading, error, publicKeyAvailable } = usePasswordEncryption();

  // Handle password change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPlainPassword(newValue);
    onChange(newValue);
  };

  // Handle blur event - encrypt password if encryptOnBlur is true
  const handleBlur = async () => {
    if (encryptOnBlur && plainPassword && publicKeyAvailable) {
      const encrypted = await encryptPassword(plainPassword);
      if (encrypted && onEncryptedValueChange) {
        onEncryptedValueChange(encrypted);
      }
    }
  };

  // Encrypt the password and call the onEncryptedValueChange callback
  const encryptAndUpdate = async () => {
    if (plainPassword && publicKeyAvailable) {
      const encrypted = await encryptPassword(plainPassword);
      if (encrypted && onEncryptedValueChange) {
        onEncryptedValueChange(encrypted);
        return encrypted;
      }
    }
    return null;
  };

  return (
    <div className={`secure-password-field ${className}`}>
      {label && (
        <label htmlFor="password">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type="password"
        id="password"
        value={plainPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        disabled={disabled || loading}
      />
      {error && <div className="error-message">{error.message}</div>}
      {!publicKeyAvailable && !loading && (
        <div className="warning-message">
          Secure encryption not available. Your password may be sent in a less secure format.
        </div>
      )}
    </div>
  );
};

export default SecurePasswordField;
export { encryptPassword } from '../../utils/passwordEncryption';