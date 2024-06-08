import axios from "axios";
import React, { useState, useEffect } from "react";
import { baseUrl } from "../utils/Const";

const OrderHistory = () => {
   const [data, setData] = useState([]);
   const [filter, setFilter] = useState("All Transactions");

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

   function calculateTotalPrice(filteredData) {
      return filteredData.reduce((total, item) => {
         return total + item.orderItems.reduce((subTotal, orderItem) => {
            return subTotal + orderItem.price * orderItem.quantity;
         }, 0);
      }, 0);
   }

   const handleFilterChange = (event) => {
      setFilter(event.target.value);
   };

   const filteredData = filterData(data);
   const totalPrice = calculateTotalPrice(filteredData);

   return (
      <>
         <div className="px-3 py-2 bg-gray-100">
            <h1 className="text-3xl font-bold font-serif mt-2 text-center text-teal-600 bg-gray-200 py-2 px-6 rounded-full shadow-md">
               Order History
            </h1>
            <div className="w-full px-4 md:mt-0">
               <div className=" flex justify-between items-center my-3">
                  <div>
                     <select
                        id="type"
                        className="form-select w-[200px] p-2 border border-gray-300 rounded-md shadow-sm"
                        onChange={handleFilterChange}
                     >
                        <option>7 Days</option>
                        <option>1 Month</option>
                        <option>3 Months</option>
                        <option>All Transactions</option>
                     </select>
                  </div>
                  <div>
                     <p className="text-lg font-semibold">
                        Total Price: <span className="text-blue-600">₹ {totalPrice.toFixed(2)}</span>
                     </p>
                  </div>
               </div>

               <div className="overflow-x-auto">
                  <table className="min-w-full bg-white shadow-md rounded-lg">
                     <thead>
                        <tr className="bg-gray-200">
                           <th className="py-2 px-4 text-start border-b">Date</th>
                           <th className="py-2 px-4 border-b text-start">Name</th>
                           <th className="py-2 px-4 border-b text-start">Mobile</th>
                           <th className="py-2 px-4 border-b text-start">Item Name</th>
                           <th className="py-2 px-4 border-b text-start">Quantity</th>
                           <th className="py-2 px-4 border-b text-start">Price</th>
                        </tr>
                     </thead>
                     <tbody>
                        {filteredData.map((item) =>
                           item.orderItems.map((orderItem, index) => (
                              <tr key={index} className="hover:bg-gray-100">
                                 <td className="py-2 px-4 border-b text-start">
                                    {formatDate(item.timestamp)}
                                 </td>
                                 <td className="py-2 px-4 border-b text-start">
                                    {item.name}
                                 </td>
                                 <td className="py-2 px-4 border-b text-start">
                                    {item.mobile}
                                 </td>
                                 <td className="py-2 px-4 border-b text-start">
                                    {orderItem.name}
                                 </td>
                                 <td className="py-2 px-4 border-b text-start">
                                    {orderItem.quantity}
                                 </td>
                                 <td className="py-2 border-b text-start">
                                    ₹ {orderItem.price.toFixed(2)}
                                 </td>
                              </tr>
                           ))
                        )}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </>
   );
};

export default OrderHistory;
