import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/Const";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    restaruant: "",
    owner: "",
    mobile: "",
    address: "",
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
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="img">
      <div className="flex justify-center z-[1] items-center h-screen">
        <div className=" backdrop-blur-[2px]">
          <form
            onSubmit={handleSubmit}
            className="bg-[#a2999984] z-[3] max-w-[650px] rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className=""></div>
            <h2 className="text-2xl font-bold mb-2 text-center text-black">
              Register
            </h2>
            <p className="mb-6 text-center text-black">
              Create your account to get started
            </p>

            <div className="flex lg:gap-3 lg:flex-row flex-col">
              <input
                type="text"
                name="restaruant"
                placeholder="Restaruant Name"
                onChange={handleChange}
                className="appearance-none border-2 border-gray-300 rounded-md bg-transparent py-2 px-4 mb-4 w-full transform transition duration-500 hover:scale-105 focus:outline-none focus:border-[#000000d0] focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
              />{" "}
              <input
                type="text"
                name="owner"
                placeholder=" Owner's Name"
                onChange={handleChange}
                className="appearance-none border-2 border-gray-300 rounded-md bg-transparent py-2 px-4 mb-4 w-full transform transition duration-500 hover:scale-105 focus:outline-none focus:border-[#000000d0] focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex lg:gap-3 lg:flex-row flex-col">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="appearance-none border-2 border-gray-300 rounded-md bg-transparent py-2 px-4 mb-4 w-full transform transition duration-500 hover:scale-105 focus:outline-none focus:border-[black] focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
              />{" "}
              <input
                type="number"
                name="mobile"
                placeholder="Mobile No."
                onChange={handleChange}
                className="appearance-none border-2 border-gray-300 rounded-md bg-transparent py-2 px-4 mb-4 w-full transform transition duration-500 hover:scale-105 focus:outline-none focus:border-[black] focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <input
              type="address"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="appearance-none border-2 border-gray-300 rounded-md bg-transparent py-2 px-4 mb-4 w-full transform transition duration-500 hover:scale-105 focus:outline-none focus:border-[black] focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="appearance-none border-2 border-gray-300 rounded-md bg-transparent py-2 px-4 mb-4 w-full transform transition duration-500 hover:scale-105 focus:outline-none focus:border-[black] focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
            />
            <button
              type="submit"
              className="bg-[#383636c8] hover:bg-[#262525] transform transition duration-500 hover:scale-105 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
            <p className=" capitalize mt-4 text-black ">
              if you have allready account
              <Link to="/" className=" text-[blue] ms-1">
                Login
              </Link>{" "}
              here
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;