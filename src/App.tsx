import { Route, Routes } from "react-router";
import "./App.css";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
