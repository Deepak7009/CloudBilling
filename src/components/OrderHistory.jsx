import axios from "axios";
import React, { useState, useEffect } from "react";

const OrderHistory = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All Transactions");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getdata");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }

  function filterData(data) {
    const now = new Date();
    let filteredData = data;

    switch (filter) {
      case "7 Days":
        filteredData = data.filter((item) => {
          const itemDate = new Date(item.timestamp);
          return (now - itemDate) / (1000 * 60 * 60 * 24) <= 7;
        });
        break;
      case "1 Month":
        filteredData = data.filter((item) => {
          const itemDate = new Date(item.timestamp);
          return (now - itemDate) / (1000 * 60 * 60 * 24) <= 30;
        });
        break;
      case "3 Months":
        filteredData = data.filter((item) => {
          const itemDate = new Date(item.timestamp);
          return (now - itemDate) / (1000 * 60 * 60 * 24) <= 90;
        });
        break;
      case "All Transactions":
      default:
        break;
    }

    return filteredData;
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="">
      <div className="w-full px-4 mt-4 md:mt-0">
        <select
          id="type"
          className="form-select my-5 w-[200px]"
          onChange={handleFilterChange}
        >
          <option>7 Days</option>
          <option>1 Month</option>
          <option>3 Months</option>
          <option>All Transactions</option>
        </select>
        <div className="overflow-x-auto example">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="">
                <th className="py-2 px-4 text-start border-b">Date</th>
                <th className="py-2 px-4 text-start border-b">Product ID</th>
                <th className="py-2 px-4 border-b text-start">Name</th>
                <th className="py-2 px-4 border-b text-start">Type</th>
                <th className="py-2 px-4 border-b text-start">Category</th>
                <th className="py-2 px-4 border-b text-start">Unit</th>
                <th className="py-2 px-4 border-b text-start">Stock</th>
                <th className="py-2 px-4 border-b text-start">Description</th>
              </tr>
            </thead>
            <tbody>
              {filterData(data).map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b text-start">
                    {formatDate(item.timestamp)}
                  </td>
                  <td className="py-2 px-4 border-b text-start">
                    {item.productid}
                  </td>
                  <td className="py-2 px-4 border-b text-start">{item.name}</td>
                  <td className="py-2 px-4 border-b text-start">{item.type}</td>
                  <td className="py-2 px-4 border-b text-start">
                    {item.category}
                  </td>
                  <td className="py-2 px-4 border-b text-start">{item.unit}</td>
                  <td className="py-2 px-4 border-b text-start">
                    {item.stock}
                  </td>
                  <td className="py-2 px-4 border-b text-start">
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
