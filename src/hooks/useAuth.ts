import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { login as loginAction, register as registerAction, logout as logoutAction } from '../store/slices/authSlice';
import { authApi } from '../api/authApi';
import { storeToken, removeToken } from '../utils/tokenStorage';
import { toastError, toastSuccess } from '../utils/toast';

/**
 * Custom hook for authentication operations
 */
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  /**
   * Login with credentials
   */
  const login = useCallback(async (credentials: { email: string; password: string }) => {
    try {
      // Make direct API call
      const response = await authApi.login(credentials);
      
      if (response.data && response.data.token) {
        // Store token
        const success = storeToken(response.data.token);
        
        if (success) {
          // Show success message
          toastSuccess('Login successful!');
          
          // Update Redux state
          dispatch(loginAction(credentials));
          
          // Navigate to dashboard
          navigate('/dashboard');
          
          return true;
        } else {
          toastError('Failed to store authentication token');
          return false;
        }
      } else {
        toastError('Login successful but no token received');
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      toastError(errorMessage);
      return false;
    }
  }, [dispatch, navigate]);

  /**
   * Register new user
   */
  const register = useCallback(async (userData: { 
    firstName: string; 
    lastName: string; 
    email: string; 
    password: string 
  }) => {
    try {
      // Make direct API call
      const response = await authApi.register(userData);
      
      if (response.data && response.data.token) {
        // Store token
        const success = storeToken(response.data.token);
        
        if (success) {
          // Show success message
          toastSuccess('Registration successful!');
          
          // Update Redux state
          dispatch(registerAction(userData));
          
          // Navigate to dashboard
          navigate('/dashboard');
          
          return true;
        } else {
          toastError('Failed to store authentication token');
          return false;
        }
      } else {
        toastError('Registration successful but no token received');
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      toastError(errorMessage);
      return false;
    }
  }, [dispatch, navigate]);

  /**
   * Logout current user
   */
  const logout = useCallback(() => {
    // Remove token
    removeToken();
    
    // Update Redux state
    dispatch(logoutAction());
    
    // Navigate to login
    navigate('/login');
    
    // Show success message
    toastSuccess('Logged out successfully');
  }, [dispatch, navigate]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout
  };
};

export default useAuth;