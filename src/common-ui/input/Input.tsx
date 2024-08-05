import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
    return (
        <Wrapper>
            {label && <Label>{label}</Label>}
            <StyledInput ref={ref} {...props} />
            {error && <Error>{error}</Error>}
        </Wrapper>
    );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const StyledInput = styled.input<InputProps>`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  ${({ error }) =>
          error &&
          css`
            border-color: red;
          `}
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

export default Input;
