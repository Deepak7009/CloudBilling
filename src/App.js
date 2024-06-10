import { Route, Routes } from "react-router-dom";
import "./App.css";
import Category from "./components/Category";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import OrderHistory from "./components/OrderHistory";
import GenerateCSV from "./components/GenerateCSV";
import Login from "./components/Login";
import Register from "./components/Register";

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
        <Route path="/history" element={<OrderHistory />} />
      </Routes>

      {/* <Category/> */}
    </>
  );
}

export default App;
