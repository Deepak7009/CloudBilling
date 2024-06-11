import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "./Product.css";
import { baseUrl } from "../utils/Const";
import update from "../assets/images/svg/updateicon.svg";
import cross from "../assets/images/svg/crossicon.svg";
import { jwtDecode } from 'jwt-decode';


const AddProduct = () => {
   const [formData, setFormData] = useState({
      productid: "",
      name: "",
      type: "",
      category: "",
      unit: "",
      stock: "",
      price: "",
      description: "",
   });

   const [data, setData] = useState([]);
   const [isUpdateMode, setIsUpdateMode] = useState(false);
   const [updateId, setUpdateId] = useState(null);
   const [userId, setUserId] = useState("");

   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
         const decodedToken = jwtDecode(token);
         if (decodedToken.user) {
            setUserId(decodedToken.user.id);
         }
      }
   }, []);
   

   const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [id]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (isUpdateMode) {
         try {
            const response =
               await axios.put(`${baseUrl}product/${updateId}`,
                  formData
               );
            toast.success("Data updated successfully!");
            setFormData({
               productid: "",
               name: "",
               type: "",
               category: "",
               unit: "",
               stock: "",
               price: "",
               description: "",
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
            const response = await axios.post(`${baseUrl}product/${userId}`, formData);
            toast.success("Product added successfully!");
            setFormData({
               productid: "",
               name: "",
               type: "",
               category: "",
               unit: "",
               stock: "",
               price: "",
               description: "",
            });
            fetchData();
         } catch (error) {
            if (
               error.response &&
               error.response.data.message === "Product ID already exists"
            ) {
               toast.error("Product ID already exists!");
            } else {
               toast.error("Error adding Product!");
            }
            console.error("Error adding Product:", error);
         }
      }
   };

   const fetchData = async () => {
      try {
         const response = await axios.get(`${baseUrl}get-products/${userId}`);
         setData(response.data);
      } catch (error) {
         console.error("Error fetching data:", error);
      }
   };
   
   useEffect(() => {
      if (userId) {
         fetchData();
      }
   }, [userId]);
   
    

   const handleUpdateClick = (item) => {
      setFormData(item);
      setIsUpdateMode(true);
      setUpdateId(item._id);
   };

   const handleDelete = async (id) => {
      Swal.fire({
         title: "Are you sure?",
         text: "Do you want to delete this product?",
         icon: "warning",
         showCancelButton: true,
         confirmButtonText: "Yes",
         cancelButtonText: "No",
      }).then(async (result) => {
         if (result.isConfirmed) {
            try {
               await axios.delete(`${baseUrl}product/${id}`);
               toast.success("Product deleted successfully!");
               fetchData();
            } catch (error) {
               toast.error("Error deleting product!");
               console.error("Error deleting product:", error);
            }
         }
      });
   };

   return (
      <div className="container-fluid mx-auto px-4">
         <ToastContainer />
         <h1 className="text-3xl font-bold mt-4 text-center font-serif text-teal-600 bg-gray-200 py-2 px-6 rounded-full shadow-md">
            Add Products
         </h1>
         <form
            className="form-wrapper flex flex-col md:flex-row mt-2 bg-white p-6 shadow-md rounded-lg  max-[425px]:p-0"
            onSubmit={handleSubmit}
         >
            <div className="form-column bg-gray-100 w-full rounded-tl-lg pt-2 md:w-1/3 md:px-4 max-[767px]:grid justify-center">
               <div className="mb-2 flex  flex-wrap justify-between">
                  <div className="input-group w-full md:w-5/12 mb-4 md:mb-0">
                     <label htmlFor="productid" className="block text-gray-700 font-medium">
                        Product ID
                     </label>
                     <input
                        type="text"
                        id="productid"
                        className="form-input mt-1 w-full"
                        value={formData.productid}
                        onChange={handleChange}
                     />
                  </div>
                  <div className="input-group w-full md:w-5/12">
                     <label htmlFor="name" className="block font-medium text-gray-700">
                        Product Name
                     </label>
                     <input
                        type="text"
                        id="name"
                        className="form-input mt-1 w-full"
                        value={formData.name}
                        onChange={handleChange}
                     />
                  </div>
               </div>
               <div className="mb-3">
                  <label htmlFor="category" className="block font-medium text-gray-700">
                     Category of Food
                  </label>
                  <select
                     id="category"
                     className="form-select mt-1 w-full"
                     value={formData.category}
                     onChange={handleChange}
                  >
                     <option>Select</option>
                     <option value="Pizza">Pizza</option>
                     <option value="Sandwich">Sandwich</option>
                     <option value="Shakes">Shakes</option>
                     <option value="Snacks">Snacks</option>
                     <option value="Combo">Combo</option>
                  </select>
               </div>
               <div className="mb-2 flex flex-wrap justify-between">
                  <div className="input-group w-full md:w-5/12 mb-4 md:mb-0">
                     <label htmlFor="type" className="block font-medium text-gray-700">
                        Type
                     </label>
                     <select
                        id="type"
                        className="form-input mt-1 w-full"
                        value={formData.type}
                        onChange={handleChange}
                     >
                        <option>Select</option>
                        <option value="veg">Veg</option>
                        <option value="non-veg">Non-veg</option>
                     </select>
                  </div>
                  <div className="input-group w-full md:w-5/12">
                     <label htmlFor="price" className="block font-medium text-gray-700">
                        Price
                     </label>
                     <input
                        type="number"
                        id="price"
                        className="form-input mt-1 w-full"
                        value={formData.price}
                        onChange={handleChange}
                     />
                  </div>
               </div>
               <div className="mb-2 flex flex-wrap justify-between">
                  <div className="input-group w-full md:w-5/12 mb-4 md:mb-0">
                     <label htmlFor="unit" className="block font-medium text-gray-700">
                        Unit
                     </label>
                     <select
                        id="unit"
                        className="form-input mt-1 w-full"
                        value={formData.unit}
                        onChange={handleChange}
                     >
                        <option>Select</option>
                        <option value="kg">kg</option>
                        <option value="ml">ml</option>
                     </select>
                  </div>
                  <div className="input-group w-full md:w-5/12">
                     <label htmlFor="stock" className="block font-medium text-gray-700">
                        Stock
                     </label>
                     <input
                        type="text"
                        id="stock"
                        className="form-input mt-1 w-full"
                        value={formData.stock}
                        onChange={handleChange}
                     />
                  </div>
               </div>
               <div className="mb-3 flex flex-wrap justify-between">
                  <div className="input-group w-full">
                     <label htmlFor="description" className="block font-medium text-gray-700">
                        Description
                     </label>
                     <textarea
                        id="description"
                        className="form-textarea mt-1 w-full resize-none"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                     ></textarea>
                  </div>
               </div>
               <div className="mb-4 flex justify-center">
                  <button
                     type="submit"
                     className="submit-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                     {isUpdateMode ? "Update" : "Submit"}
                  </button>
               </div>
            </div>
            <div className="w-full  md:w-2/3 px-4 md:mt-0">
               <div className="overflow-x-auto">
                  <table className="min-w-full bg-gray-100">
                     <thead>
                        <tr className="bg-gray-200">
                           <th className="py-2 px-4 text-start border-b rounded-tl-lg">Product ID</th>
                           <th className="py-2 px-4 border-b text-start">Name</th>
                           <th className="py-2 px-4 border-b text-start">Type</th>
                           <th className="py-2 px-4 border-b text-start">Category</th>
                           <th className="py-2 px-4 border-b text-start">Unit</th>
                           <th className="py-2 px-4 border-b text-start">Stock</th>
                           <th className="py-2 px-4 border-b text-start">Price</th>
                           <th className="py-2 px-4 border-b text-start">Description</th>
                           <th className="py-2 px-4 border-b text-start">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data?.map((item, index) => (
                           <tr key={index}>
                              <td className="py-2 px-4 border-b text-start">
                                 {item.productid}
                              </td>
                              <td className="py-2 px-4 border-b text-start">
                                 {item.name}
                              </td>
                              <td className="py-2 px-4 border-b text-start">
                                 {item.type}
                              </td>
                              <td className="py-2 px-4 border-b text-start">
                                 {item.category}
                              </td>
                              <td className="py-2 px-4 border-b text-start">
                                 {item.unit}
                              </td>
                              <td className="py-2 px-4 border-b text-start">
                                 {item.stock}
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
                                       className=" cursor-pointer"
                                       src={update}
                                       alt="update icon"
                                       title="Update Your Order"
                                       onClick={() => handleUpdateClick(item)}
                                    />
                                    <img
                                       className=" cursor-pointer"
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
               </div>
            </div>
         </form>
      </div>
   );
};

export default AddProduct;
