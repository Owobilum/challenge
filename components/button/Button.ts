import styled, { css } from 'styled-components';

interface ButtonProps {
  size?: 'sm' | 'md';
}

const Button = styled.button<ButtonProps>`
  border: none;
  outline: 1px solid;
  outline-color: ${(props) => props.theme.colors.primary};
  background: transparent;
  border-radius: 3px;
  cursor: pointer;
  display: block;
  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: #ffffff;
  }
  &:disabled {
    cursor: not-allowed;
  }

  ${(props) =>
    props.size === 'sm'
      ? css`
          font-size: 1rem;
          padding: 0.25rem;
        `
      : css`
          font-size: 1.25rem;
          padding: 0.5rem;
        `}
`;

export default Button;
