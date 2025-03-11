import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authenticationSlice";
import { useNavigate } from "react-router";
import { apiClient } from "../apiCRM";
import { Button } from "../reusableStyle/buttons";
import { Input, Label, Main, Form, Title } from "../reusableStyle/loginSignOut";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    setData((prev) => ({ ...prev, [name]: e.target.value }));
  };
  const sendDataToApi = async () => {
    try {
      const response = await apiClient.post("/auth/login", data);
      navigate("/dashboard");
      dispatch(
        login({ token: response.data.jwt, username: response.data.name })
      );
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  return (
    <Main>
      <Title>Sign in </Title>
      <Form>
        <Label>Username:</Label>
        <Input
          name="email"
          onChange={handleChange}
          type="text"
          placeholder="eg:kabuziNtwali"
        />
        <Label>Password:</Label>
        <Input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="password"
        />

        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            sendDataToApi();
          }}
        >
          Sign in
        </Button>
      </Form>
    </Main>
  );
};

export default Login;
