import { Route, Routes } from "react-router-dom";
import "./App.css";
import Category from "./components/Category";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import OrderHistory from "./components/OrderHistory";
import GenerateCSV from "./components/GenerateCSV";
import Expensises from "./components/Expensises";

function App() {
  return (
    <>
      <Navbar />
      {/* <GenerateCSV /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/expensises" element={<Expensises />} />
      </Routes>

      {/* <Category/> */}
    </>
  );
}

export default App;
