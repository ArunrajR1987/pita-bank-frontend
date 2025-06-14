import { Middleware } from 'redux';
import { toastError } from '../../utils/toast';

/**
 * Redux middleware to handle rejected actions and display error toasts
 * This is currently not being used due to package installation issues
 * It will be enabled once react-toastify is properly installed
 */
export const errorMiddleware: Middleware = () => next => action => {
  // Check if the action is a rejected action from a createAsyncThunk
  if (action.type.endsWith('/rejected')) {
    // Extract the error message
    const errorMessage = action.payload || action.error?.message || 'An error occurred';
    
    // Show toast notification for the error
    toastError(errorMessage);
  }
  
  return next(action);
};