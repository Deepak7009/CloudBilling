import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/Const";
import "../Login&Register/LoginRegister.css";

const Register = () => {
   const navigate = useNavigate();

   const [registrationType, setRegistrationType] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [formData, setFormData] = useState({
      name: "",
      owner: "",
      mobile: "",
      address: "",
      email: "",
      password: "",
   });
   const [error, setError] = useState("");

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
         setError("Please enter a valid email address.");
         setIsSubmitting(false);
         return;
      }

      const mobilePattern = /^[0-9]{10}$/;
      if (!mobilePattern.test(formData.mobile)) {
         setError("Please enter a valid 10-digit mobile number.");
         setIsSubmitting(false);
         return;
      }
   };

   const handleDropdownChange = (e) => {
      setRegistrationType(e.target.value);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      if (!registrationType) {
         setError("Please select a registration type.");
         return;
      }

      for (const key in formData) {
         if (!formData[key]) {
            setError(`Please fill in the ${key} field.`);
            return;
         }
      }

      try {
         const response = await axios.post(`${baseUrl}register`, {
            ...formData,
            type: registrationType,
         });
         console.log(response.data);
         navigate("/");
      } catch (error) {
         setError(error.response?.data?.msg || "Registration failed.");
         console.error("Error:", error);
      }
      setIsSubmitting(false);
   };

   return (
      <div className="img">
         <div className="flex justify-center z-[1] items-center h-screen">
            <div className="backdrop-blur-[2px]">
               <form
                  onSubmit={handleSubmit}
                  className="bg-[#a2999984] z-[3] max-w-[650px] rounded px-8 pt-4 pb-4 mb-2"
               >
                  <h2 className=" text text-2xl font-bold mb-2 text-center">
                     Register{" "}
                     {registrationType.charAt(0).toUpperCase() +
                        registrationType.slice(1)}
                  </h2>
                  <p className=" text mb-6 text-center">
                     Create your account to get started
                  </p>

                  <div className="mb-4">
                     <label
                        htmlFor="registrationType"
                        className="text block text-sm font-bold mb-2"
                     >
                        Select Registration Type:
                     </label>
                     <select
                        id="registrationType"
                        value={registrationType}
                        onChange={handleDropdownChange}
                        className="text appearance-none border-2 border-gray-300 rounded-md bg-transparent py-2 px-4 w-full focus:outline-none focus:border-[#000000d0] focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
                     >
                        <option className="select-dropdown" value="">Select Type</option>
                        <option className="select-dropdown" value="restaurant">Restaurant</option>
                        <option className="select-dropdown" value="store">Store</option>
                     </select>
                  </div>

                  <div className="flex gap-3 lg:flex-row flex-col">
                     <input
                        type="text"
                        name="name"
                        placeholder={
                           registrationType === "store"
                              ? "Store Name"
                              : "Restaurant Name"
                        }
                        onChange={handleChange}
                        className="inputtext appearance-none border-2 border-gray-300 rounded-md bg-transparent py-2 px-4 mb-4 w-full transform transition duration-500 hover:scale-105 focus:outline-none focus:border-[#000000d0] focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
                     />
                     <input
                        type="text"
                        name="owner"
                        placeholder="Owner's Name"
                        onChange={handleChange}
                        className="inputtext appearance-none border-2 border-gray-300 rounded-md bg-transparent py-2 px-4 mb-4 w-full transform transition duration-500 hover:scale-105 focus:outline-none focus:border-[#000000d0] focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
                     />
                  </div>
                  <div className="flex gap-3 lg:flex-row flex-col">
                     <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="inputtext appearance-none border-2 border-gray-300 rounded-md bg-transparent py-2 px-4 mb-4 w-full transform transition duration-500 hover:scale-105 focus:outline-none focus:border-[black] focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
                     />
                     <input
                        type="number"
                        name="mobile"
                        placeholder="Mobile No."
                        onChange={handleChange}
                        className="inputtext appearance-none border-2 border-gray-300 rounded-md bg-transparent py-2 px-4 mb-4 w-full transform transition duration-500 hover:scale-105 focus:outline-none focus:border-[black] focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
                     />
                  </div>
                  <input
                     type="text"
                     name="address"
                     placeholder="Address"
                     onChange={handleChange}
                     className="inputtext appearance-none border-2 border-gray-300 rounded-md bg-transparent py-2 px-4 mb-4 w-full transform transition duration-500 hover:scale-105 focus:outline-none focus:border-[black] focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <input
                     type="password"
                     name="password"
                     placeholder="Password"
                     onChange={handleChange}
                     className="inputtext appearance-none border-2 border-gray-300 rounded-md bg-transparent py-2 px-4 mb-2 w-full transform transition duration-500 hover:scale-105 focus:outline-none focus:border-[black] focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  {error && <p className="text-red-500 mb-1">{error}</p>}

                  <button
                     type="submit"
                     className="bg-[#383636c8] hover:bg-[#262525] transform transition duration-500 hover:scale-105 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? 'Processing...' : 'Register'}
                  </button>
                  <p className="text capitalize mt-3">
                     Already have an account ?
                     <Link to="/" className="text-[blue] hover:underline underline-offset-2 font-bold mx-1">
                        Login
                     </Link>
                     here
                  </p>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Register;