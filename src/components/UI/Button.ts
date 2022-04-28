import styled from "styled-components";

const Button = styled.button`
  border-radius: 8px;
  border: none;
  background-color: #6a0000;
  cursor: pointer;
  color: white;
  font-weight: 600;
  padding: 8px 20px;

  &:hover {
    background-color: #9a0000;
    color: #eee;
  }
`

export default Button;