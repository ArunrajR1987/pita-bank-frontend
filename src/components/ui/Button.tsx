import React, { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  ${props => {
    switch (props.size) {
      case 'small':
        return css`
          padding: 6px 12px;
          font-size: 0.875rem;
        `;
      case 'large':
        return css`
          padding: 12px 24px;
          font-size: 1.125rem;
        `;
      default:
        return css`
          padding: 8px 16px;
          font-size: 1rem;
        `;
    }
  }}
  
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return css`
          background-color: #6c757d;
          color: white;
          border: none;
          &:hover {
            background-color: #5a6268;
          }
        `;
      case 'danger':
        return css`
          background-color: #dc3545;
          color: white;
          border: none;
          &:hover {
            background-color: #c82333;
          }
        `;
      case 'success':
        return css`
          background-color: #28a745;
          color: white;
          border: none;
          &:hover {
            background-color: #218838;
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: #007bff;
          border: 1px solid #007bff;
          &:hover {
            background-color: #007bff;
            color: white;
          }
        `;
      default:
        return css`
          background-color: #007bff;
          color: white;
          border: none;
          &:hover {
            background-color: #0069d9;
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <LoadingSpinner />}
      {children}
    </StyledButton>
  );
};

export default Button;