import { useParams } from "react-router";
import { apiClient, standardApiClient } from "../apiCRM";
import { OrderedList } from "../reusableStyle/listStyle";
import { Main } from "../reusableStyle/listStyle";
import { Title } from "../reusableStyle/loginSignOut";

const ListActions = () => {
  const { id } = useParams();
  const addAction = async () => {
    try {
      const response = await apiClient.get(`/actions/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error("unable to add action  to api", error);
    }
  };
  addAction();
  return (
    <Main>
      <Title> Actions performed</Title>
      <OrderedList></OrderedList>
    </Main>
  );
};
export default ListActions;
