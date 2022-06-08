import styled from 'styled-components';

const TextArea = styled.textarea`
  border-radius: 5px;
  outline: 1px solid;
  outline-color: ${(props) => props.theme.colors.primary};
  border: none;
  max-width: 100%;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.colors.light_gray};
`;

export default TextArea;
