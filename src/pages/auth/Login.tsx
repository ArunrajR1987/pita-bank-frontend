import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, clearError } from '../../store/slices/authSlice';
import { AppDispatch, RootState } from '../../store';
import Card from '../../components/ui/Card';
import { toastError, toastSuccess } from '../../utils/toast';
import { SecureLoginForm } from '../../components/SecureForm';
import { authApi } from '../../api/authApi';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    
    // Show error toast if there's an error
    if (error) {
      toastError(error);
    }
    
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch, error]);
  
  // Handle login with encrypted password
  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      // Make direct API call instead of using Redux
      const response = await authApi.login(data);
      
      if (response.data && response.data.token) {
        // Store token directly
        sessionStorage.setItem('token', response.data.token);
        console.log('Token stored directly:', response.data.token);
        
        // Verify token was stored
        const storedToken = sessionStorage.getItem('token');
        console.log('Verified token in storage:', storedToken);
        
        // Show success message
        toastSuccess('Login successful!');
        
        // Dispatch action to update Redux state
        dispatch(login(data));
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        console.error('No token in response:', response.data);
        toastError('Login successful but no token received');
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      toastError(err.response?.data?.message || 'Login failed');
    }
  };
  
  return (
    <div className="auth-container">
      <Card>
        <h2>Login to Pita Bank</h2>
        
        {/* Error messages are now shown via toast notifications */}
        
        <SecureLoginForm onSubmit={handleLogin} loading={loading} />
        
        <p className="auth-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </Card>
    </div>
  );
};

export default Login;