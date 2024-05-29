import React, { useState, useEffect } from "react";
import axios from "axios";
import "./category.css";
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/category",
        formData
      );
      console.log("Category added successfully:", response.data);
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
      fetchData(); // Fetch data again to update the table
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

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

  return (
    <div className="container-fluid mx-auto px-4">
      <form
        className="form-wrapper flex flex-col md:flex-row mt-12"
        onSubmit={handleSubmit}
      >
        <div className="form-column w-full md:w-1/3 px-4">
          <div className="mb-4 flex flex-wrap justify-between">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="unit" className="block font-medium">
              Unit
            </label>
            <input
              type="text"
              id="unit"
              className="form-input mt-1 w-full"
              value={formData.unit}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
            <button
              type="submit"
              className="submit-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Submit
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
                      {item.description}
                    </td>{" "}
                    <td className="py-2 px-4 border-b text-start">
                      <div className="flex gap-3">
                        <img
                          className=" cursor-pointer"
                          src={update}
                          alt="update icon"
                          title="Update Your Order"
                        />
                        <img
                          className=" cursor-pointer"
                          src={cross}
                          alt="cross icon"
                          title="Delete Your Order"
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
