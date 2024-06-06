import { Route, Routes } from "react-router-dom";
import "./App.css";
import Category from "./components/Category";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import OrderHistory from "./components/OrderHistory";
import GenerateCSV from "./components/GenerateCSV";
import Expensises from "./components/Expensises";
import Login from "./login&register/Login";
import Register from "./login&register/Register";
import AdminPanel from "./Admin/AdminPanel";
import Products from "./components/Products";


function App() {
  return (
    <>
      {/* <Login/>
    <Register/> */}
      <Navbar />
      {/* <GenerateCSV /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/expensises" element={<Expensises />} />
        <Route path="/products" element={<Products />} />

      </Routes>

      {/* <Category/> */}
    </>
  );
}

export default App;
