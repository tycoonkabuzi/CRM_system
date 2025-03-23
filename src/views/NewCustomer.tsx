import styled from "styled-components";
import { Title, Form, Label, Input } from "../reusableStyle/loginSignOut";
import { Button } from "../reusableStyle/buttons";
import { useEffect, useState } from "react";
import { apiClient } from "../apiCRM";
import { NewCustomerType } from "../types/customerType";
import { useDispatch, useSelector } from "react-redux";
import { cleanTheData } from "../store/customerSlice";

const Main = styled.div`
  margin-top: 100px;
  width: 80%;
  padding-bottom: 200px;
`;
const NewCustomer = () => {
  const dataToBeEdited = useSelector((state) => state.changeForm.data);
  const [data, setData] = useState<NewCustomerType>(dataToBeEdited);

  const changeForm = useSelector((state) => state.changeForm.changeState);

  const dispatch = useDispatch();

  useEffect(() => {
    setData(dataToBeEdited);
  }, [dataToBeEdited]);

  const createCustomer = async () => {
    try {
      await apiClient.post(`/customers`, data);
      alert(`${data.name} was added successfully`);
    } catch (error) {
      console.error("unable to send client to api", error);
    }
  };

  const editCustomer = async () => {
    try {
      await apiClient.put(`/customers/${dataToBeEdited.id}`, data);
      alert(`${data.name} was modified successfully`);
    } catch (error) {
      console.error("unable to send client to api", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      ...(name in prev.address
        ? { address: { ...prev.address, [name]: value } }
        : { [name]: value }),
    }));
  };

  return (
    <Main>
      <Title>{changeForm ? "Edit Customer" : "New Customer"}</Title>
      <Form>
        <Label>Name:</Label>
        <Input
          name="name"
          type="text"
          placeholder="eg:Jan Kowalski"
          onChange={handleChange}
          value={data.name}
        />
        <Label>Street:</Label>
        <Input
          name="street"
          type="text"
          placeholder="eg:Kwiatowa 12"
          onChange={handleChange}
          value={data.address.street}
        />
        <Label>Suite:</Label>

        <Input
          name="suite"
          type="text"
          placeholder="1A"
          onChange={handleChange}
          value={data.address.suite}
        />

        <Label>City:</Label>
        <Input
          name="city"
          type="text"
          placeholder="eg:Warszawa"
          onChange={handleChange}
          value={data.address.city}
        />

        <Label>PostCode:</Label>
        <Input
          name="postcode"
          type="text"
          placeholder="eg:00-001"
          onChange={handleChange}
          value={data.address.postcode}
        />

        <Label>Nip:</Label>
        <Input
          name="nip"
          type="text"
          placeholder="eg:123456778"
          onChange={handleChange}
          value={data.nip}
        />
        {!changeForm ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              createCustomer();
              dispatch(cleanTheData());
            }}
          >
            Create
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.preventDefault();
              editCustomer();
            }}
          >
            Save
          </Button>
        )}
      </Form>
    </Main>
  );
};
export default NewCustomer;
