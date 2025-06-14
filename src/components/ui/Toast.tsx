import React from 'react';
import styled from 'styled-components';

// This is a placeholder component that doesn't actually use react-toastify
// It's just here to maintain the same API structure so we don't have to change other files

interface ToastContainerProps {
  position?: string;
  autoClose?: number;
  hideProgressBar?: boolean;
  newestOnTop?: boolean;
  closeOnClick?: boolean;
  rtl?: boolean;
  pauseOnFocusLoss?: boolean;
  draggable?: boolean;
  pauseOnHover?: boolean;
  theme?: string;
}

const ToastContainerDiv = styled.div`
  /* This div doesn't actually do anything since we're using our custom toast implementation */
`;

const ToastContainer: React.FC<ToastContainerProps> = (props) => {
  // This component doesn't actually render anything visible
  // Our custom toast implementation in utils/toast.ts handles everything
  return <ToastContainerDiv id="toast-container" />;
};

export default ToastContainer;