import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logout } from "../store/authenticationSlice";
import { useNavigate } from "react-router";

const Main = styled.div``;
const NavigationBar = styled.nav`
  background-color: #e6e6e6;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div``;
const ContainerUser = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const UserName = styled.p``;
const Logout = styled.button``;
const Dashboard = () => {
  const user = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Main>
      <NavigationBar>
        <Title>Dashboard</Title>
        <ContainerUser>
          <UserName>{user}</UserName>
          <Logout
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            Logout
          </Logout>
        </ContainerUser>
      </NavigationBar>
    </Main>
  );
};
export default Dashboard;
