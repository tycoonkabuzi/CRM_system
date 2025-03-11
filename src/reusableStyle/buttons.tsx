import styled from "styled-components";

export const Button = styled.button`
  margin: auto;
  border: 2px solid #e8e8e8;
  background-color: #ffffff;
  font-size: 14px;
  padding: 10px 40px 10px 40px;
  &:hover {
    background-color: #ececec;
    border: 2px solid #ffffff;
  }
`;
export const SmallButton = styled(Button)`
  padding: 5px 10px 5px 10px;
`;
