import styled from "styled-components";
import { Input, Label, Title } from "../reusableStyle/loginSignOut";
import { Button } from "../reusableStyle/buttons";
import { apiClient, standardApiClient } from "../apiCRM";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";

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
  const dataState = useSelector((state) => state.newEditAction.data);
  const [data, setData] = useState(dataState);
  console.log(data);
  const formState = useSelector((state) => state.newEditAction.formChange);
  const { id } = useParams();
  const navigate = useNavigate();
  const addAction = async () => {
    try {
      await apiClient.post(`/actions`, data);
      alert(`the action was added successfully`);
    } catch (error) {
      console.error("unable to add action  to api", error);
    }
  };

  const editAction = async () => {
    try {
      await apiClient.put(`/actions/${dataState._id}`, data);
      alert(`the action was edited successfully`);
    } catch (error) {
      console.error("unable to add action  to api", error);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({ ...prev, [name]: value, customer: id }));
  };
  console.log(data.date);

  const formatDate = (rawDate) => {
    const match = rawDate.match(/\d{4}-\d{2}-\d{2}/);
    if (match) {
      return match[0];
    }
  };
  return (
    <Main>
      <Title>{formState === false ? "New action" : "Edit action"}</Title>
      <Form>
        <Label>Type:</Label>
        <Select name="type" value={data.type} onChange={handleChange}>
          <Option value="email">Email</Option>
          <Option value="phone">Phone</Option>
          <Option value="chat">chat</Option>
        </Select>

        <Label>Date:</Label>
        <Input
          name="date"
          type="date"
          value={formatDate(data.date)}
          onChange={handleChange}
        />
        <Label>Description:</Label>
        <Description
          name="description"
          value={data.description}
          onChange={handleChange}
        />

        {formState === false ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              addAction();
              navigate(`/customer/${id}`);
            }}
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.preventDefault();
              editAction();
              navigate(`/customer/${id}`);
            }}
          >
            Save
          </Button>
        )}
      </Form>
    </Main>
  );
};
export default AddAction;
