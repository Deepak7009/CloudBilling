import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "./category.css";
import { baseUrl } from "../utils/Const";
import update from "../assets/images/svg/updateicon.svg";
import cross from "../assets/images/svg/crossicon.svg";

const Category = () => {
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
          await axios.put(`${baseUrl}category/${updateId}`,
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
        const response = await axios.post(`${baseUrl}category`, formData);
        toast.success("Category added successfully!");
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
          toast.error("Error adding category!");
        }
        console.error("Error adding category:", error);
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}getdata`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateClick = (item) => {
    setFormData(item);
    setIsUpdateMode(true);
    setUpdateId(item._id);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${baseUrl}category/${id}`);
          toast.success("Category deleted successfully!");
          fetchData();
        } catch (error) {
          toast.error("Error deleting category!");
          console.error("Error deleting category:", error);
        }
      }
    });
  };

  return (
    <div className="container-fluid mx-auto px-4">
      <ToastContainer />
      <form
        className="form-wrapper flex flex-col md:flex-row mt-12"
        onSubmit={handleSubmit}
      >
        <div className="form-column w-full md:w-1/3 px-4">
          <div className="mb-2 flex flex-wrap justify-between">
            <div className="input-group w-full md:w-5/12 mb-4 md:mb-0">
              <label htmlFor="productid" className="block font-medium">
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
              <label htmlFor="name" className="block font-medium">
                Name
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
            <label htmlFor="category" className="block font-medium">
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
              <label htmlFor="type" className="block font-medium">
                Type
              </label>
              <select
                id="type"
                className="form-select mt-1 w-full"
                value={formData.type}
                onChange={handleChange}
              >
                <option>Select</option>
                <option value="veg">Veg</option>
                <option value="non-veg">Non-veg</option>
              </select>
            </div>
            <div className="input-group w-full md:w-5/12">
              <label htmlFor="price" className="block font-medium">
                Price
              </label>
              <input
                type="text"
                id="price"
                className="form-input mt-1 w-full"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-2 flex flex-wrap justify-between">
            <div className="input-group w-full md:w-5/12 mb-4 md:mb-0">
              <label htmlFor="unit" className="block font-medium">
                Unit
              </label>
              <select
                id="unit"
                className="form-select mt-1 w-full"
                value={formData.unit}
                onChange={handleChange}
              >
                <option>Select</option>
                <option value="unit1">kg</option>
                <option value="unit2">ml</option>
              </select>
            </div>
            <div className="input-group w-full md:w-5/12">
              <label htmlFor="stock" className="block font-medium">
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
              <label htmlFor="description" className="block font-medium">
                Description
              </label>
              <textarea
                id="description"
                className="form-textarea mt-1 w-full"
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
        <div className="w-full md:w-2/3 px-4 mt-4 md:mt-0">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="">
                  <th className="py-2 px-4 text-start border-b">Product ID</th>
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
                {data.map((item, index) => (
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

export default Category;
