import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, clearError } from '../../store/slices/authSlice';
import { AppDispatch, RootState } from '../../store';
import Card from '../../components/ui/Card';
import { toastError, toastSuccess } from '../../utils/toast';
import { SecureRegisterForm } from '../../components/SecureForm';
import { authApi } from '../../api/authApi';

const Register: React.FC = () => {
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
  
  // Handle register with encrypted password
  const handleRegister = async (data: { firstName: string; lastName: string; email: string; password: string }) => {
    try {
      // Make direct API call instead of using Redux
      const response = await authApi.register(data);
      
      if (response.data && response.data.token) {
        // Store token directly
        sessionStorage.setItem('token', response.data.token);
        console.log('Token stored directly:', response.data.token);
        
        // Verify token was stored
        const storedToken = sessionStorage.getItem('token');
        console.log('Verified token in storage:', storedToken);
        
        // Show success message
        toastSuccess('Registration successful!');
        
        // Dispatch action to update Redux state
        dispatch(register(data));
        
        // Navigate to dashboard
        navigate('/dashboard');
      } else {
        console.error('No token in response:', response.data);
        toastError('Registration successful but no token received');
      }
    } catch (err: any) {
      console.error('Registration failed:', err);
      toastError(err.response?.data?.message || 'Registration failed');
    }
  };
  
  return (
    <div className="auth-container">
      <Card>
        <h2>Create an Account</h2>
        
        {/* Error messages are now shown via toast notifications */}
        
        <SecureRegisterForm onSubmit={handleRegister} loading={loading} />
        
        <p className="auth-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </Card>
    </div>
  );
};

export default Register;