import { useParams } from "react-router";
import { apiClient } from "../apiCRM";
import { Title } from "../reusableStyle/loginSignOut";
import { useEffect, useState } from "react";
import { SmallButton } from "../reusableStyle/buttons";
import Pagination from "./Pagination";
import styled from "styled-components";

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
  const [data, setData] = useState({ data: [] });
  const { id } = useParams();
  const addAction = async () => {
    try {
      const response = await apiClient.get(`/actions/${id}`);
      setData(response.data);
    } catch (error) {
      console.error("unable to add action  to api", error);
    }
  };
  useEffect(() => {
    addAction();
  }, []);
  console.log(data);
  return (
    <Main>
      {data.data.length !== 0 ? (
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
            {data.data.map((singleAction) => (
              <Tr>
                <Td>{singleAction.description}</Td>
                <Td>{singleAction.type}</Td>
                <Td>{singleAction.date}</Td>
                <Td>
                  <SmallButton>Edit</SmallButton>
                </Td>
                <Td>
                  <SmallButton>Delete</SmallButton>
                </Td>
              </Tr>
            ))}
          </Table>
        </>
      ) : (
        <p> Your actions will be displayed here</p>
      )}
    </Main>
  );
};
export default ListActions;
