import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../utils/Const";
import upd from "../assets/images/edit.png";
import cross from "../assets/images/svg/crossicon.svg";

const Expensises = () => {
   const [form, setForm] = useState({
      srno: "",
      date: new Date().toISOString().split('T')[0],
      title: "",
      price: "",
      description: ""
   });

   const [data, setData] = useState([]);
   const [isUpdateMode, setIsUpdateMode] = useState(false);
   const [updateId, setUpdateId] = useState(null);

   const [currentPage, setCurrentPage] = useState(1);
   const expensesPerPage = 15;
   const totalPages = Math.ceil(data.length / expensesPerPage);

   const indexOfLastExpense = currentPage * expensesPerPage;
   const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
   const currentExpenses = data.slice(indexOfFirstExpense, indexOfLastExpense);

   const Pagination = ({ totalPages, currentPage, onPageChange }) => (
      <div className="flex justify-center my-4">
         <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
         >
            Previous
         </button>
         {Array.from({ length: totalPages }, (_, index) => (
            <button
               key={index}
               onClick={() => onPageChange(index + 1)}
               className={`mx-1 px-3 py-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
            >
               {index + 1}
            </button>
         ))}
         <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
         >
            Next
         </button>
      </div>
   );

   const handleChange = (e) => {
      const { id, value } = e.target;
      setForm((prevData) => ({
         ...prevData,
         [id]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (isUpdateMode) {
         try {
            await axios.put(`${baseUrl}expens/${updateId}`, form);
            toast.success("Data updated successfully!");
            setForm({
               srno: "",
               date: new Date().toISOString().split('T')[0],
               title: "",
               price: "",
               description: ""
            });
            setIsUpdateMode(false);
            setUpdateId(null);
            fetchData();
         } catch (error) {
            toast.error("Error updating data!");
            console.error("Error updating category:", error);
         }
      } else {
         try {
            const newForm = { ...form, srno: data.length + 1 };
            await axios.post(`${baseUrl}expenses`, newForm);
            toast.success("Expens added successfully!");
            setForm({
               srno: "",
               date: new Date().toISOString().split('T')[0],
               title: "",
               price: "",
               description: ""
            });
            fetchData();
         } catch (error) {
            if (error.response && error.response.data.message === "Expens already exists") {
               toast.error("Expens already exists!");
            } else {
               toast.error("Error adding expens!");
            }
            console.error("Error adding expens:", error);
         }
      }
   };

   const fetchData = async () => {
      try {
         const response = await axios.get(`${baseUrl}expenses`);
         setData(response.data);
      } catch (error) {
         console.error("Error fetching data:", error);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleUpdateClick = (item) => {
      setForm(item);
      setIsUpdateMode(true);
      setUpdateId(item._id);
   };

   const handleDelete = async (id) => {
      toast.info(
         <div>
            <div>
               <p>Are you sure you want to delete this expens?</p>
            </div>
            <div className="flex justify-center mt-2">
               <button
                  className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                  onClick={async () => {
                     try {
                        await axios.delete(`${baseUrl}expens/${id}`);
                        toast.dismiss(); // Dismiss the toast after deletion
                        toast.success("Category deleted successfully!");
                        fetchData();
                     } catch (error) {
                        toast.dismiss(); // Dismiss the toast if error occurs
                        toast.error("Error deleting expens!");
                        console.error("Error deleting expens:", error);
                     }
                  }}
               >
                  Yes
               </button>
               <button
                  className="bg-gray-300 text-black px-3 py-1 rounded"
                  onClick={() => toast.dismiss()}
               >
                  No
               </button>
            </div>
         </div>,
         {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            draggable: false
         }
      );
   };

   return (
      <div className="container-fluid mx-auto px-4 py-8 max-[425px]:px-0 max-[1023px]:mx-0">
         <ToastContainer />
         <form
            className="form-wrapper flex flex-col md:flex-row mt-12 bg-white p-6 shadow-md rounded-lg max-[425px]:p-0"
            onSubmit={handleSubmit}>

            <div className="form-column w-full md:w-1/3 md:px-4 max-[767px]:grid justify-center">
               <div className="mb-4 flex items-center max-[1023px]:block">
                  <label htmlFor="date" className="block text-gray-700 font-medium mb-1 md:w-24">
                     Date
                  </label>
                  <input
                     id="date"
                     type="date"
                     className="flex-1 border border-gray-300 rounded-md p-2 max-[1023px]:w-52"
                     value={form.date}
                     onChange={handleChange}
                     disabled
                  />
               </div>
               <div className="mb-4 flex items-center max-[1023px]:block">
                  <label htmlFor="title" className="block text-gray-700 font-medium mb-1 md:w-24">
                     Title
                  </label>
                  <input
                     id="title"
                     type="text"
                     className="flex-1 border border-gray-300 rounded-md p-2 block w-0 max-[1023px]:w-52"
                     value={form.title}
                     onChange={handleChange}
                  />
               </div>
               <div className="mb-4 flex items-center max-[1023px]:block">
                  <label htmlFor="price" className="block text-gray-700 font-medium mb-1 md:w-24">
                     Price
                  </label>
                  <input
                     id="price"
                     type="number"
                     className="flex-1 border border-gray-300 rounded-md p-2 no-spinner block w-0 max-[1023px]:w-52"
                     value={form.price}
                     onChange={handleChange}
                  />
               </div>
               <div className="mb-4 flex items-center max-[1023px]:block">
                  <label htmlFor="description" className="block text-gray-700 font-medium mb-1 md:w-24">
                     Description
                  </label>
                  <textarea
                     id="description"
                     className="flex-1 border border-gray-300 rounded-md p-2 resize-none"
                     rows="4"
                     value={form.description}
                     onChange={handleChange}
                  ></textarea>
               </div>
               <div className="mb-4 flex justify-center md:justify-center">
                  <button
                     type="Add"
                     className="submit-button bg-blue-500 text-white py-2 px-20 rounded-full hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                     {isUpdateMode ? "Update" : "Add"}
                  </button>

               </div>
            </div>

            <div className="w-full md:w-2/3 px-4 mt-4 md:mt-0 max-[425px]:px-0">
               <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                     <thead>
                        <tr className="bg-gray-200">
                           <th className="py-2 px-4 text-start border-b rounded-tl-md">Sr. No.</th>
                           <th className="py-2 px-4 border-b text-start">Date</th>
                           <th className="py-2 px-4 border-b text-start">Title</th>
                           <th className="py-2 px-4 border-b text-start">Price</th>
                           <th className="py-2 px-4 border-b text-start">Description</th>
                           <th className="py-2 px-4 border-b text-start rounded-tr-md">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {currentExpenses?.map((item, index) => (
                           <tr key={index}>
                              <td className="py-2 px-4 border-b text-start">
                                 {item.srno}
                              </td>
                              <td className="py-2 px-4 border-b text-start">
                                 {item.date}
                              </td>
                              <td className="py-2 px-4 border-b text-start">
                                 {item.title}
                              </td>
                              <td className="py-2 px-4 border-b text-start">
                                 {item.price}
                              </td>
                              <td className="py-2 px-4 border-b text-start">
                                 {item.description}
                              </td>
                              <td className="py-2 px-4 border-b text-start">
                                 <div className="flex gap-3">
                                    <img
                                       className="cursor-pointer"
                                       src={upd}
                                       alt="update icon"
                                       width="20px"
                                       title="Update Your Order"
                                       onClick={() => handleUpdateClick(item)}
                                    />
                                    <img
                                       className="cursor-pointer"
                                       src={cross}
                                       alt="cross icon"
                                       title="Delete Your Order"
                                       onClick={() => handleDelete(item._id)}
                                    />
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                  <Pagination
                     totalPages={totalPages}
                     currentPage={currentPage}
                     onPageChange={setCurrentPage}
                  />
               </div>
            </div>
         </form>
      </div>
   );
};

export default Expensises;
