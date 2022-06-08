import styled from 'styled-components';

const Input = styled.input`
  border-radius: 5px;
  outline: 1px solid;
  outline-color: ${(props) => props.theme.colors.primary};
  border: none;
  height: 1.5rem;
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem;
`;

export default Input;
