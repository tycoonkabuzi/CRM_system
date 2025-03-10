import { useState } from "react";
import styled from "styled-components";
import apiClient from "../apiCRM";
import { useNavigate } from "react-router";
const Main = styled.div`
  background-color: #ececec;
  width: 40%;
  margin: auto;
  padding: 20px;
  margin-top: 200px;
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
  width: 300px;
  height: 20px;
`;
const Title = styled.h1`
  font-size: 30px;
`;
const Label = styled.label`
  width: 100%;
  text-align: left;
`;
const ContainerLabels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Button = styled.button`
  margin: auto;
`;
const Registration = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const getDataInputs = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const name = e.target.name;
    setData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  async function registerClient() {
    try {
      const response = await apiClient.post("auth/signup", data);
      alert("You are now registered");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }

  return (
    <Main>
      <Title>Sign up</Title>
      <Form>
        <ContainerLabels>
          <Label>Username:</Label>
          <Label>Email:</Label>
          <Label>Password:</Label>
        </ContainerLabels>
        <ContainerInputs>
          <Input
            onChange={getDataInputs}
            name="name"
            type="text"
            placeholder="eg:kabuziNtwali"
          />
          <Input
            onChange={getDataInputs}
            name="email"
            type="email"
            placeholder="eg:kabuziNtwali@gmail.com"
          />
          <Input
            onChange={getDataInputs}
            name="password"
            type="password"
            placeholder="password"
          />
        </ContainerInputs>
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
