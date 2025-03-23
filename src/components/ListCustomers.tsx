import { useEffect, useState } from "react";
import { apiClient } from "../apiCRM";
import { SmallButton } from "../reusableStyle/buttons";
import { Link, useNavigate, useSearchParams } from "react-router";
import Pagination from "./Pagination";
import { useDispatch } from "react-redux";
import { change, setTheData } from "../store/customerSlice";
import { CustomerData } from "../types/customerType";
import { Main, Title } from "../reusableStyle/listStyle";
import {
  ContainerSingleItem,
  OrderedList,
  SingleItem,
} from "../reusableStyle/listStyle";
import { getClickedPage, getIdCustomer } from "../store/paginationSlice";

const ListCustomers = () => {
  const LIMIT_PAGE = 10;
  const [data, setData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [triggerDelete, setTriggerDelete] = useState(true);
  const [searchParams] = useSearchParams();
  let page = searchParams.get("page");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCustomers = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(
        `/customers?page=${page}&limit=${LIMIT_PAGE}`
      );
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

  return (
    <Main>
      <Title>List of Customers</Title>
      <OrderedList start={!page ? 1 : (Number(page) - 1) * LIMIT_PAGE + 1}>
        {!loading ? (
          data.length != 0 ? (
            data.map((data: CustomerData) => (
              <ContainerSingleItem key={data._id}>
                <SingleItem>
                  <Link
                    onClick={() => {
                      dispatch(getClickedPage("actions")),
                        dispatch(getIdCustomer(`${data._id}`));
                    }}
                    to={`/customer/${data._id}`}
                  >
                    {data.name}
                  </Link>
                </SingleItem>
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
                    navigate(`/edit`);
                  }}
                >
                  Edit
                </SmallButton>
                <SmallButton onClick={() => deleteCustomer(data._id)}>
                  Delete
                </SmallButton>
              </ContainerSingleItem>
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
