import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddProduct from "./components/AddProduct";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import OrderHistory from "./components/OrderHistory";
import GenerateCSV from "./components/GenerateCSV";
import Login from "./components/Login";
import Register from "./components/Register";
import Expensises from "./components/Expensises";
import Categories from "./components/Categories";
import AdminPanel from "./components/Admin/AdminPanel";
import Products from "./components/Products";
import Profile from "./Profile/Profile";
import CustomTable from "./components/CustomTable";
import Structure from "./components/Structure";
import Process from "./components/Process";

function App() {
  return (
    <>
      {/* <Register />
      <Login /> */}
      <Navbar />
      {/* <GenerateCSV /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/expensises" element={<Expensises />} />
        <Route path="/categories" element={<Categories />} />

        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/table" element={<CustomTable />} />
        <Route path="/process" element={<Process />} />
        <Route path="/structure" element={<Structure />} />
      </Routes>
    </>
  );
}

export default App;
