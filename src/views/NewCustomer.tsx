import styled from "styled-components";
import { Title, Form, Label, Input } from "../reusableStyle/loginSignOut";
import { Button } from "../reusableStyle/buttons";
import { useState } from "react";
import { apiClient } from "../apiCRM";

const Main = styled.div`
  margin-top: 100px;
`;
const NewCustomer = () => {
  type NewCustomer = {
    name: string;
    address: {
      street: string;
      suite: string;
      city: string;
      postcode: string;
    };
    nip: string;
    actions: string[];
  };
  const [data, setData] = useState<NewCustomer>({
    name: "",
    address: { street: "", suite: "", city: "", postcode: "" },
    nip: "1234567890",
    actions: ["64b3f1b5e8b0a1234567890c", "64b3f1b5e8b0a1234567890d"],
  });

  const createCustomer = async () => {
    try {
      const response = await apiClient.post(`/customers`, data);
      alert("sent");
    } catch (error) {
      console.error("unable to send client to api", error);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({
      ...prev,
      ...(name in prev.address
        ? { address: { ...prev.address, [name]: value } }
        : { [name]: value }),
    }));
  };
  console.log(data);

  return (
    <Main>
      <Title>New Customer</Title>
      <Form>
        <Label>Name:</Label>
        <Input
          name="name"
          type="text"
          placeholder="eg:Jan Kowalski"
          onChange={handleChange}
        />
        <Label>Street:</Label>
        <Input
          name="street"
          type="text"
          placeholder="eg:Kwiatowa 12"
          onChange={handleChange}
        />
        <Label>Suite:</Label>

        <Input
          name="suite"
          type="text"
          placeholder="1A"
          onChange={handleChange}
        />

        <Label>City:</Label>
        <Input
          name="city"
          type="text"
          placeholder="eg:Warszawa"
          onChange={handleChange}
        />

        <Label>PostCode:</Label>
        <Input
          name="postcode"
          type="text"
          placeholder="eg:00-001"
          onChange={handleChange}
        />

        <Label>Nip:</Label>
        <Input
          name="nip"
          type="text"
          placeholder="eg:123456778"
          onChange={handleChange}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            createCustomer();
          }}
        >
          Create
        </Button>
      </Form>
    </Main>
  );
};
export default NewCustomer;
