import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
    return <StyledButton variant={variant} {...props} />;
};

const StyledButton = styled.button<ButtonProps>`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  margin: 12px;
  
  ${({ variant }) =>
    variant === 'primary' &&
    css`
      background-color: #007bff;
    `}
  
  ${({ variant }) =>
    variant === 'secondary' &&
    css`
      background-color: #6c757d;
    `}

  &:hover {
    opacity: 0.9;
  }
`;

export default Button;
