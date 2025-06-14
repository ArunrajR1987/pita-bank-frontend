// Simple toast implementation without react-toastify dependency
// This will be replaced with react-toastify once the package is properly installed

interface ToastOptions {
  position?: string;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: any;
}

// Create a simple toast notification system
const createToast = (message: string, type: string) => {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  // Style the toast
  Object.assign(toast.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '12px 20px',
    borderRadius: '4px',
    color: 'white',
    zIndex: '9999',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    animation: 'fadeIn 0.3s, fadeOut 0.3s 2.7s',
    maxWidth: '350px'
  });
  
  // Set background color based on type
  switch (type) {
    case 'success':
      toast.style.backgroundColor = '#28a745';
      break;
    case 'error':
      toast.style.backgroundColor = '#dc3545';
      break;
    case 'warning':
      toast.style.backgroundColor = '#ffc107';
      toast.style.color = '#212529';
      break;
    case 'info':
      toast.style.backgroundColor = '#17a2b8';
      break;
    default:
      toast.style.backgroundColor = '#343a40';
  }
  
  // Add to DOM
  document.body.appendChild(toast);
  
  // Remove after timeout
  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast);
    }
  }, 3000);
};

// Add CSS for animations
const addAnimationStyles = () => {
  if (!document.getElementById('toast-animations')) {
    const style = document.createElement('style');
    style.id = 'toast-animations';
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
      }
    `;
    document.head.appendChild(style);
  }
};

// Initialize animations
if (typeof window !== 'undefined') {
  addAnimationStyles();
}

// Toast utility functions
export const toastSuccess = (message: string, options?: ToastOptions) => {
  createToast(message, 'success');
};

export const toastError = (message: string, options?: ToastOptions) => {
  createToast(message, 'error');
};

export const toastInfo = (message: string, options?: ToastOptions) => {
  createToast(message, 'info');
};

export const toastWarning = (message: string, options?: ToastOptions) => {
  createToast(message, 'warning');
};

// Helper to extract error message from API error responses
export const extractErrorMessage = (error: any): string => {
  // Handle axios error responses
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  // Handle axios network errors
  if (error.message) {
    return error.message;
  }
  
  // Default error message
  return 'An unexpected error occurred. Please try again.';
};