import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';

// Simple encryption function (for demonstration purposes)
// In a real application, use a proper encryption library
const encryptPassword = (password: string): string => {
  // This is a very basic encryption for demonstration
  // Do NOT use this in production - use a proper encryption library
  return btoa(password); // Base64 encoding (not secure, just for demo)
};

interface SecureLoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  loading?: boolean;
}

interface SecureRegisterFormProps {
  onSubmit: (data: { firstName: string; lastName: string; email: string; password: string }) => void;
  loading?: boolean;
}

export const SecureLoginForm: React.FC<SecureLoginFormProps> = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Encrypt password before submitting
    onSubmit({
      email: formData.email,
      password: encryptPassword(formData.password)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>
      
      <div className="form-group">
        <label>Password</label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>
      
      <Button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};

export const SecureRegisterForm: React.FC<SecureRegisterFormProps> = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear errors when typing
    if (name === 'password' || name === 'confirmPassword') {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Encrypt password before submitting
      onSubmit({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: encryptPassword(formData.password)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name</label>
        <Input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
          required
        />
      </div>
      
      <div className="form-group">
        <label>Last Name</label>
        <Input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          required
        />
      </div>
      
      <div className="form-group">
        <label>Email</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>
      
      <div className="form-group">
        <label>Password</label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Confirm Password</label>
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          required
        />
      </div>
      
      <Button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};