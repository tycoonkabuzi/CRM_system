import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logout } from "../store/authenticationSlice";
import { Link, Outlet, useNavigate } from "react-router";
import Footer from "../components/Footer";
import { change, cleanTheData } from "../store/customerSlice";
import { getClickedPage } from "../store/paginationSlice";
const Main = styled.div``;
const NavigationBar = styled.nav`
  background-color: #e6e6e6;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
`;
const ContainerUser = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const UserName = styled.p``;
const Logout = styled.button``;

const ContainerContent = styled.div`
  display: flex;
  width: 100%;
`;
const SideBar = styled.div`
  width: 20%;
  background-color: #e6e6e6;
  max-height: 100%;
  padding-top: 100px;
`;
const UnOrderedList = styled.ul``;
const ListElement = styled.li`
  margin-bottom: 40px;
  text-align: left;
  list-style: none;
`;
const Dashboard = () => {
  const user = localStorage.getItem("username"); // getting the data (username) from the localStorage

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
      <ContainerContent>
        <SideBar>
          <UnOrderedList>
            <ListElement>
              <Link
                onClick={() => dispatch(getClickedPage("customers"))}
                to={"/"}
              >
                List of customers
              </Link>
            </ListElement>

            <ListElement>
              <Link
                onClick={() => {
                  dispatch(cleanTheData());
                  dispatch(change(false));
                }}
                to={"/new"}
              >
                Add customers
              </Link>
            </ListElement>
          </UnOrderedList>
        </SideBar>
        <Outlet />
      </ContainerContent>
      <Footer />
    </Main>
  );
};
export default Dashboard;
