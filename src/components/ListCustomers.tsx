import { useEffect, useState } from "react";
import styled from "styled-components";
import { apiClient } from "../apiCRM";
import { SmallButton } from "../reusableStyle/buttons";
import { Link, useParams, useSearchParams } from "react-router";
import Pagination from "./Pagination";

const Main = styled.div`
  margin-top: 100px;
  width: 80%;
`;
const Title = styled.h1``;
const OrderedList = styled.ol`
  padding: 20px;
  width: 40%;
  margin: auto;
  margin-top: 20px;
`;
const ContainerSingleCustomer = styled.div`
  display: flex;
  margin-bottom: 12px;
`;
const SingleCustomer = styled.li`
  width: 30%;
  text-align: left;
`;
const ListCustomers = () => {
  type CustomerData = {
    actions: string[];

    address: {
      street: string;
      suite: string;
      city: string;
      postcode: string;
    };
    name: string;
    nip: string;
    __v: number;
    _id: string;
  };
  const [data, setData] = useState<CustomerData[]>();
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  let page = searchParams.get("page");

  const getCustomers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/customers?page=${page}&limit=10`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCustomers();
  }, [page]);

  return (
    <Main>
      <Title>List of Customers</Title>
      <OrderedList>
        {loading == false ? (
          data.map((data: CustomerData) => (
            <ContainerSingleCustomer key={data._id}>
              <SingleCustomer>
                <Link to={`/dashboard/customer/${data._id}`}>{data.name}</Link>
              </SingleCustomer>
              <SmallButton>Edit</SmallButton>
              <SmallButton>Delete</SmallButton>
            </ContainerSingleCustomer>
          ))
        ) : (
          <p> Loading...</p>
        )}
      </OrderedList>
      <Pagination />
    </Main>
  );
};
export default ListCustomers;
