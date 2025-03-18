import styled from "styled-components";
import { Input, Label, Title } from "../reusableStyle/loginSignOut";
import { Button } from "../reusableStyle/buttons";
import { apiClient, standardApiClient } from "../apiCRM";
import { useState } from "react";
import { useParams } from "react-router";

const Main = styled.div`
  margin-top: 100px;
  width: 80%;
  padding-bottom: 200px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 80%;
  margin: auto;
`;
const Description = styled.textarea`
  width: 70%;
  height: 100px;
  border: 1px solid #e8e8e8;
`;
const Select = styled.select`
  width: 70%;
  border: 1px solid #e8e8e8;
  padding: 5px;
`;
const Option = styled.option`
  width: 70%;
`;
const AddAction = () => {
  const [data, setData] = useState({
    type: "email",
    description: "Wysłano e-mail do klienta",
    date: "2023-12-01T12:00:00Z",
    customer: "64b3f1b5e8b0a1234567890c",
  });
  const { id } = useParams();
  const addAction = async () => {
    try {
      await apiClient.post(`/actions`, data);
      alert(`the action was added successfully`);
    } catch (error) {
      console.error("unable to add action  to api", error);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value, customer: id }));
  };
  console.log(data);
  return (
    <Main>
      <Title>New action</Title>
      <Form>
        <Label>Type:</Label>
        <Select name="type" onChange={handleChange}>
          <Option value="email">Email</Option>
          <Option value="phone">Phone</Option>
          <Option value="chat">chat</Option>
        </Select>

        <Label>Date:</Label>
        <Input name="date" type="date" onChange={handleChange} />
        <Label>Description:</Label>
        <Description name="description" onChange={handleChange} />
        <Button
          onClick={(e) => {
            e.preventDefault();
            addAction();
          }}
        >
          Submit
        </Button>
      </Form>
    </Main>
  );
};
export default AddAction;
