import styled from "styled-components";
import { Title } from "../reusableStyle/loginSignOut";
import { apiClient } from "../apiCRM";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CustomerData, NewCustomerType } from "../types/customerType";
import { Button } from "../reusableStyle/buttons";
import ListActions from "./ListActions";
import { useDispatch } from "react-redux";
import { changePage, clearSingleAction } from "../store/actionsSlice";
const Main = styled.div`
  margin: auto;
  width: 70%;
  text-align: left;
  margin-top: 100px;
  padding-bottom: 100px;
  margin-left: 7%;
`;
const SubTitle = styled.h2`
  margin: 12px 0px 12px 0px;
`;
const Address = styled.h3`
  margin: 12px 0px 12px 0px;
`;
const UnOrderedList = styled.ul``;
const Element = styled.li`
  margin: 10px 0px 10px 0px;
`;

const Customer = () => {
  const [data, setData] = useState<CustomerData>();
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCustomer = async () => {
    try {
      const response = await apiClient.get(`/customers/${id}`);
      setData(response.data);
    } catch (error) {
      console.error("Unable to Fetch the user", error);
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <Main>
      <Title>Customer</Title>

      {data ? (
        <>
          <SubTitle>Name: {data.name}</SubTitle>
          <Address> address:</Address>
          <UnOrderedList>
            <Element>street:{data.address.street} </Element>
            <Element> suite: {data.address.suite}</Element>
            <Element> city: {data.address.city}</Element>
            <Element> postcode: {data.address.postcode}</Element>
          </UnOrderedList>
          <p>Nip: {data.nip}</p>
          <br />
          <Button
            onClick={() => {
              navigate(`/customer/${data._id}/add`);
              dispatch(changePage(false));
              dispatch(clearSingleAction());
            }}
          >
            Add Action
          </Button>

          <ListActions />
        </>
      ) : (
        <p>Loading </p>
      )}
    </Main>
  );
};
export default Customer;
