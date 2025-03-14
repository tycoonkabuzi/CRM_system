export type NewCustomerType = {
  id?: string;
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
