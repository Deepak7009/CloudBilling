import { Route, Routes } from "react-router-dom";
import "./App.css";
import Category from "./components/Category";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import OrderHistory from "./components/OrderHistory";
import GenerateCSV from "./components/GenerateCSV";
import Login from "./login&register/Login";
import Register from "./login&register/Register";
import CustomTable from "./components/CustomTable";
import Structure from "./components/Structure";
import Process from "./components/Process";

function App() {
  return (
    <>
      <Navbar />
      {/* <GenerateCSV /> */}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/category" element={<Category />} />
        <Route path="/table" element={<CustomTable />} />
        <Route path="/process" element={<Process />} />
        <Route path="/structure" element={<Structure />} />
        <Route path="/history" element={<OrderHistory />} />
      </Routes>

      {/* <Category/> */}
    </>
  );
}

export default App;
