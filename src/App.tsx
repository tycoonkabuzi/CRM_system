import { Route, Routes } from "react-router";
import "./App.css";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Dashboard from "./views/Dashboard";
import Customer from "./components/Customer";
import ListCustomers from "./components/ListCustomers";
import NewCustomer from "./views/NewCustomer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<ListCustomers />} />
          <Route path="customer/:id" element={<Customer />} />
          <Route path="new" element={<NewCustomer />} />
          <Route path="edit/" element={<NewCustomer />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
