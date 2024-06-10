import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/Const";

const Process = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}bills`);
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

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                OrderId
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Grand Total
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b border-gray-300">
                  {item.section + ' ' + item.index}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {index + 200}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {formatDate(item.timestamp)}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {item.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {item.GrandTotal}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                    Action
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Process;
