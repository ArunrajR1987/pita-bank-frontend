import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { toastError } from '../../utils/toast';
import { SecureRegisterForm } from '../../components/SecureForm';
import useAuth from '../../hooks/useAuth';

/**
 * Registration page component
 */
const Register: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading, error, register } = useAuth();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    
    // Show error toast if there's an error
    if (error) {
      toastError(error);
    }
  }, [isAuthenticated, navigate, error]);
  
  // Handle register with encrypted password
  const handleRegister = async (data: { 
    firstName: string; 
    lastName: string; 
    email: string; 
    password: string 
  }) => {
    await register(data);
  };
  
  return (
    <div className="auth-container">
      <Card>
        <h2>Create an Account</h2>
        
        <SecureRegisterForm onSubmit={handleRegister} loading={loading} />
        
        <p className="auth-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </Card>
    </div>
  );
};

export default Register;