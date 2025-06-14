import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import Card from '../../components/ui/Card';
import { toastError } from '../../utils/toast';
import { SecureLoginForm } from '../../components/SecureForm';
import useAuth from '../../hooks/useAuth';

/**
 * Login page component
 */
const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading, error, login } = useAuth();
  
  // Check URL parameters for messages
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    if (params.get('expired') === 'true') {
      toastError('Your session has expired. Please log in again.');
    }
    
    if (params.get('session') === 'expired') {
      toastError('You have been logged out due to inactivity.');
    }
  }, []);
  
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
  
  // Handle login with encrypted password
  const handleLogin = async (data: { email: string; password: string }) => {
    await login(data);
  };
  
  return (
    <div className="auth-container">
      <Card>
        <h2>Login to Pita Bank</h2>
        
        <SecureLoginForm onSubmit={handleLogin} loading={loading} />
        
        <p className="auth-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </Card>
    </div>
  );
};

export default Login;