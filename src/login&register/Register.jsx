import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/Const";

const Register = () => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}register`, formData);
      console.log(response.data); // Assuming your backend returns { msg: "User registered successfully" }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="appearance-none border-2 border-gray-300 rounded-md py-2 px-4 mb-4 w-full transform transition duration-500 hover:scale-105 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="appearance-none border-2 border-gray-300 rounded-md py-2 px-4 mb-4 w-full transform transition duration-500 hover:scale-105 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="appearance-none border-2 border-gray-300 rounded-md py-2 px-4 mb-4 w-full transform transition duration-500 hover:scale-105 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
