import { useState } from "react";
import styled from "styled-components";
import apiClient from "../apiCRM";
import { useNavigate } from "react-router";
const Main = styled.div`
  background-color: #f4f4f4;
  width: 40%;
  margin: auto;
  padding: 50px 30px 50px 30px;
  margin-top: 15%;
  box-shadow: 1px 1px 20px #c3c3c3;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 80%;
  margin: auto;
`;

const Input = styled.input`
  width: 70%;
  height: 20px;
  border: 1px solid #e8e8e8;
  padding: 5px;
`;
const Title = styled.h1`
  font-size: 30px;
`;
const Label = styled.label`
  width: 20%;
  text-align: left;
`;

const Button = styled.button`
  margin: auto;
  border: 2px solid #e8e8e8;
  background-color: #ffffff;
  font-size: 14px;
  padding: 10px 40px 10px 40px;
  &:hover {
    background-color: #ececec;
    border: 2px solid #ffffff;
  }
`;
const Registration = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const getDataInputs = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const name = e.target.name;
    setData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const registerClient = async () => {
    try {
      const response = await apiClient.post("auth/signup", data);
      alert("You are now registered");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  return (
    <Main>
      <Title>Sign up</Title>
      <Form>
        <Label>Username:</Label>
        <Input
          onChange={getDataInputs}
          name="name"
          type="text"
          placeholder="eg:kabuziNtwali"
        />
        <Label>Email:</Label>
        <Input
          onChange={getDataInputs}
          name="email"
          type="email"
          placeholder="eg:kabuziNtwali@gmail.com"
        />
        <Label>Password:</Label>

        <Input
          onChange={getDataInputs}
          name="password"
          type="password"
          placeholder="password"
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            registerClient();
            navigate("/login");
          }}
        >
          Sign up
        </Button>
      </Form>
    </Main>
  );
};

export default Registration;
