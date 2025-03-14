import { useEffect, useState } from "react";
import styled from "styled-components";
import { apiClient } from "../apiCRM";
import { SmallButton } from "../reusableStyle/buttons";
import { Link, useNavigate, useSearchParams } from "react-router";
import Pagination from "./Pagination";
import { useDispatch } from "react-redux";
import { change, setTheData } from "../store/newEditSlice";

const Main = styled.div`
  margin-top: 100px;
  width: 80%;
  padding-bottom: 50px;
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
    id?: string;
    nip: string;
    __v: number;
    _id: string;
  };
  const [data, setData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [triggerDelete, setTriggerDelete] = useState(true);
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
  }, [page, triggerDelete]);
  const deleteCustomer = async (customerId: string) => {
    try {
      await apiClient.delete(`/customers/${customerId}`);
      alert("Deleted Customer ");
      setTriggerDelete(!triggerDelete);
    } catch (error) {
      console.error("unable to deleteCustomer", error);
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Main>
      <Title>List of Customers</Title>
      <OrderedList>
        {loading == false ? (
          data.length != 0 ? (
            data.map((data: CustomerData) => (
              <ContainerSingleCustomer key={data._id}>
                <SingleCustomer>
                  <Link to={`/dashboard/customer/${data._id}`}>
                    {data.name}
                  </Link>
                </SingleCustomer>
                <SmallButton
                  onClick={() => {
                    dispatch(change(true));
                    dispatch(
                      setTheData({
                        id: data._id,
                        name: data.name,
                        address: {
                          street: `${data.address.street}`,
                          suite: `${data.address.suite}`,
                          city: `${data.address.city}`,
                          postcode: `${data.address.postcode}`,
                        },
                        nip: data.nip,
                        actions: [
                          "64b3f1b5e8b0a1234567890c",
                          "64b3f1b5e8b0a1234567890d",
                        ],
                      })
                    );
                    navigate(`/dashboard/edit`);
                  }}
                >
                  Edit
                </SmallButton>
                <SmallButton onClick={() => deleteCustomer(data._id)}>
                  Delete
                </SmallButton>
              </ContainerSingleCustomer>
            ))
          ) : (
            <p>Empty</p>
          )
        ) : (
          <p> Loading...</p>
        )}
      </OrderedList>
      <Pagination />
    </Main>
  );
};
export default ListCustomers;
