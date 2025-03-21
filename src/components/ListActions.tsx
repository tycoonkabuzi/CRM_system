import { useNavigate, useParams, useSearchParams } from "react-router";
import { apiClient } from "../apiCRM";
import { Title } from "../reusableStyle/loginSignOut";
import { useEffect, useState } from "react";
import { SmallButton } from "../reusableStyle/buttons";

import styled from "styled-components";
import Pagination from "./Pagination";
import { useDispatch } from "react-redux";
import { changePage, getSingleAction } from "../store/newEditActionsSlice";
type ActionType = {
  type: string;
  description: string;
  date: string;
  customer: string;
  _id?: string;
};

const Main = styled.div`
  margin-top: 100px;
  width: 90%;
`;
const Table = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;
const Th = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const Tr = styled.tr`
  background-color: #dddddd;
  &:nth-child(even) {
    background-color: #ffffff;
  }
`;
const ListActions = () => {
  const [data, setData] = useState<ActionType[]>([]);

  const [triggerDelete, setTriggerDelete] = useState(true);

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const thePage = searchParam.get("page");

  const getActionsList = async () => {
    try {
      const response = await apiClient.get(
        `/actions/${id}?page=${thePage}&limit=10`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("unable to add action  to api", error);
    }
  };

  const deleteAction = async (customerId: string) => {
    try {
      await apiClient.delete(`/actions/${customerId}`);
      alert("Deleted Customer ");
      setTriggerDelete(!triggerDelete);
    } catch (error) {
      console.error("unable to deleteCustomer", error);
    }
  };

  useEffect(() => {
    getActionsList();
  }, [thePage, triggerDelete]);

  return (
    <Main>
      {data.length !== 0 ? (
        <>
          <Title> Actions performed</Title>

          <Table>
            <Tr>
              <Th>Description</Th>
              <Th>Contact</Th>
              <Th>Date</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
            {data.map((singleAction) => (
              <Tr key={singleAction.date}>
                <Td>{singleAction.description}</Td>
                <Td>{singleAction.type}</Td>
                <Td>{singleAction.date}</Td>
                <Td>
                  <SmallButton
                    onClick={() => {
                      navigate(`/customer/${id}/edit`);
                      dispatch(changePage(true));
                      dispatch(
                        getSingleAction({
                          type: singleAction.type,
                          description: singleAction.description,
                          date: singleAction.date,
                          customer: id,
                        })
                      );
                    }}
                  >
                    Edit
                  </SmallButton>
                </Td>
                <Td>
                  <SmallButton onClick={() => deleteAction(singleAction._id)}>
                    Delete
                  </SmallButton>
                </Td>
              </Tr>
            ))}
          </Table>
        </>
      ) : (
        <p> Your actions will be displayed here</p>
      )}
      <br />
      <Pagination />
    </Main>
  );
};
export default ListActions;
