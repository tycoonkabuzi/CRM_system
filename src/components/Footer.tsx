import styled from "styled-components";

const Main = styled.div`
  background-color: #e6e6e6;
  padding: 20px;
`;
const Copyright = styled.div``;

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Main>
      <Copyright>Exercise CRM {year}</Copyright>
    </Main>
  );
};
export default Footer;
