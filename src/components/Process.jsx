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
                  {item.section + " " + item.index}
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
                  {item.totalAmount + "₹"}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <div className="flex">
                    <button class="flex items-center px-2 py-1 bg-yellow-500 text-white  rounded">
                      <svg
                        class="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 9V3h12v6M6 9v6a2 2 0 002 2h8a2 2 0 002-2V9M6 9h12M6 15h12m-6 0v4m0 0H9m3 0h3"
                        ></path>
                      </svg>
                      Print
                    </button>
                    <button class="flex items-center mx-3 px-2 py-1 bg-green-500 text-white  rounded">
                      <svg
                        class="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        ></path>
                      </svg>
                      Add Item
                    </button>
                    <button class="flex items-center px-2 py-1 bg-blue-500 text-white  rounded">
                      <svg
                        class="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 10l4.5 4.5m0 0L15 19m4.5-4.5H3m16.5 0a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v2a2 2 0 002 2h9"
                        ></path>
                      </svg>
                      Preview
                    </button>
                  </div>
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
