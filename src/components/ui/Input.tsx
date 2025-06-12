import React, { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
`;

const InputLabel = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
`;

const StyledInput = styled.input.attrs<{ hasError?: boolean }>(props => ({
  // This prevents the hasError prop from being passed to the DOM element
  // Only standard HTML attributes will be passed through
}))<{ hasError?: boolean }>`
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid ${props => props.hasError ? '#dc3545' : '#ced4da'};
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#dc3545' : '#80bdff'};
    box-shadow: 0 0 0 0.2rem ${props => props.hasError ? 'rgba(220, 53, 69, 0.25)' : 'rgba(0, 123, 255, 0.25)'};
  }
  
  &:disabled {
    background-color: #e9ecef;
    opacity: 1;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth,
  ...rest
}) => {
  return (
    <InputContainer fullWidth={fullWidth}>
      {label && <InputLabel>{label}</InputLabel>}
      <StyledInput hasError={!!error} {...rest} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;