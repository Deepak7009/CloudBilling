import React, { useState } from 'react';
import logo from "../assets/images/webp/giphy.webp";
import QrCodeImg from '../assets/images/Qrcode 1.png';
import edit from "../assets/images/edit.png";

const Profile = () => {
   const [isPopupOpen, setIsPopupOpen] = useState(false);
   const [adminDetails, setAdminDetails] = useState({
      name: 'Abcde',
      mobile: '9876543210',
      email: 'abc12@gmail.com'
   });

   const handleEditClick = () => {
      setIsPopupOpen(true);
   };

   const handleClosePopup = () => {
      setIsPopupOpen(false);
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setAdminDetails({ ...adminDetails, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // Perform any additional actions such as API calls here
      setIsPopupOpen(false);
   };

   return (
      <div className="min-h-screen bg-gray-100 p-6 mb-6">
         <div className="max-w-4xl mx-auto bg-white py-8 px-4 rounded-lg shadow-md mb-6">

            {/* Header */}
            <div className="flex justify-between items-center">
               <div className='flex'>
                  <div className="">
                     <img
                        src={logo}
                        alt="Company Logo"
                        width="250px"
                        className=""
                     />
                  </div>
                  <div className="ml-4 items-center">
                     <h2 className="text-3xl font-semibold text-teal-600">Cloud Rashoi</h2>
                     <p className="text-gray-800">Location: Hisar, Haryana</p>
                     <p className="text-gray-800">Contact: 9876543210</p>
                     <p className="text-gray-800">Email: abc123@gmail.com </p>
                  </div>
               </div>

               {/* Opening Hours Section */}
               <div className='time flex'>
                  <div className="mb-6">
                     <h3 className="text-xl font-semibold text-teal-600">Opening Hours</h3>
                     <p className="mt-2 text-gray-600">Monday - Friday: 10:00 AM - 10:00 PM</p>
                     <p className="text-gray-600">Saturday - Sunday: 11:00 AM - 11:00 PM</p>
                  </div>
               </div>

            </div>

            <div className='flex justify-between items-center mt-6'>
               <div className='admin mt-4'>
                  <div className='flex items-center'>
                     <h1 className='mb-2 text-teal-600 font-bold text-xl'>Admin</h1>
                     <img
                        className="cursor-pointer ml-2"
                        src={edit}
                        alt="update icon"
                        width="20px"
                        title="Update Your Order"
                        onClick={handleEditClick}
                     />
                  </div>
                  <h1 className='font-bold'>Name : {adminDetails.name}</h1>
                  <h1 className='font-bold'>Mobile : {adminDetails.mobile}</h1>
                  <h1 className='font-bold'>Mail : {adminDetails.email}</h1>
               </div>

               <div className="QrCode">
                  <img
                     src={QrCodeImg}
                     alt="QR Code"
                     width="150px"
                     className="mt-2"
                  />
               </div>
            </div>

         </div>

         {/* Popup */}
         {isPopupOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
               <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold mb-4">Edit Admin Details</h2>
                  <form onSubmit={handleSubmit}>
                     <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                           type="text"
                           name="name"
                           value={adminDetails.name}
                           onChange={handleInputChange}
                           className="mt-1 p-2 border rounded w-full"
                        />
                     </div>
                     <div className="mb-4">
                        <label className="block text-gray-700">Mobile</label>
                        <input
                           type="text"
                           name="mobile"
                           value={adminDetails.mobile}
                           onChange={handleInputChange}
                           className="mt-1 p-2 border rounded w-full"
                        />
                     </div>
                     <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                           type="email"
                           name="email"
                           value={adminDetails.email}
                           onChange={handleInputChange}
                           className="mt-1 p-2 border rounded w-full"
                        />
                     </div>
                     <div className="flex justify-end">
                        <button
                           type="button"
                           onClick={handleClosePopup}
                           className="bg-blue-500 text-white px-4 py-2 rounded-full mr-2"
                        >
                           Cancel
                        </button>
                        <button
                           type="submit"
                           className="bg-blue-500 text-white px-4 py-2 rounded-full"
                        >
                           Save
                        </button>
                     </div>
                  </form>
               </div>
            </div>

         )}
      </div>
   );
};

export default Profile;
