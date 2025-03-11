import { useState } from "react";

import { standardApiClient } from "../apiCRM";
import { useNavigate } from "react-router";
import { Input, Label, Main, Title, Form } from "../reusableStyle/loginSignOut";
import { Button } from "../reusableStyle/buttons";

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
      const response = await standardApiClient.post("auth/signup", data);
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
