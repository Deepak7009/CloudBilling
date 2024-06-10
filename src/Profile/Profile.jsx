import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import logo from "../assets/images/webp/giphy.webp";
import QrCodeImg from '../assets/images/Qrcode 1.png';
import edit from "../assets/images/edit.png";
import emailIcon from "../assets/images/email.png";
import { baseUrl } from '../utils/Const';

const Profile = () => {
   const [isPopupOpen, setIsPopupOpen] = useState(false);
   const [adminDetails, setAdminDetails] = useState({
      name: '',
      mobile: '',
      email: ''
   });

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [userId, setUserId] = useState("");



   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
         const decodedToken = jwtDecode(token);
         console.log("Decoded Token:", decodedToken);

         if (decodedToken.user) {
            const userId = decodedToken.user.id;
            console.log("Extracted UserId:", userId);

            setUserId(userId);

            if (userId) {
               axios.get(`${baseUrl}user/${userId}`)
                  .then(response => {
                     setAdminDetails(response.data);
                     //setName(response.data.name);
                     //setEmail(response.data.email);
                     console.log("Admin Details:", response.data);
                  })
                  .catch(error => {
                     console.error('Error fetching user data:', error);
                  });
            } else {
               console.error('Error: userId is missing in the decoded token');
            }
         } else {
            console.error('Error: user object is missing in the decoded token');
         }
      }
   }, []);

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

   const handleSubmit = async (e) => {
      e.preventDefault();
      // Add logic to update user details
   };

   return (
      <div className="relative min-h-screen bg-gray-100 px-6 py-4 mb-6">
         <div className={`max-w-4xl mx-auto bg-white py-8 px-4 rounded-lg shadow-md mb-6 transition ${isPopupOpen ? 'blur' : ''}`} style={{ zIndex: 1 }}>
            <div className="flex justify-between">
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
                     <h2 className="text-3xl font-semibold text-teal-600 font-serif">Cloud Rashoi</h2>
                     <p className="text-gray-800 font-serif font-bold flex items-center pt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="32" height="32" className="mr-2">
                           <path fill="#e3e2e1" d="M54.01 58.74C54.01 61.65 44.15 64 32 64c-12.15 0-22.01-2.35-22.01-5.26 0-2.6 7.9-4.74 18.26-5.18h7.5c10.37.44 18.26 2.58 18.26 5.18z"></path>
                           <path fill="#e82327" d="M32 0C20.7 0 11.54 9.15 11.54 20.45 11.54 31.75 32 58.74 32 58.74s20.45-26.99 20.45-38.29S43.3 0 32 0zm0 33.99c-7.48 0-13.54-6.06-13.54-13.54S24.52 6.91 32 6.91c7.48 0 13.54 6.06 13.54 13.54S39.48 33.99 32 33.99z"></path>
                        </svg>
                        Hisar, Haryana
                     </p>
                     <p className="text-gray-800 font-serif font-bold flex items-center pt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 64 64" className="mr-2">
                           <path fill="#76ABC4" d="M64 32c0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0c17.673 0 32 14.327 32 32"></path>
                           <path fill="#638DA0" d="M43.17 50a1.04 1.04 0 0 1-.336-.052c-.228-.075-.526-.155-.889-.256-4.704-1.302-19.016-5.263-25.903-26.629a1.081 1.081 0 0 1-.021-.589c.035-.14.903-3.5 6.677-4.458a1.064 1.064 0 0 1 .635.085c.211.096 5.212 2.448 5.629 7.242.029.306-.076.611-.283.836-1.639 1.776-3.064 3.96-2.988 4.582.131 1.106 3.603 6.939 9.82 9.979.927-.147 3.076-1.563 4.632-2.892a1.08 1.08 0 0 1 .7-.263c.088 0 .177.011.264.034 4.932 1.196 6.71 4.58 6.784 4.724.105.205.142.441.105.668-.831 5.224-4.231 6.825-4.375 6.891a1.087 1.087 0 0 1-.451.098"></path>
                           <path fill="#FFFFFE" d="M28.962 23.343c-.417-4.794-5.418-7.146-5.629-7.242a1.063 1.063 0 0 0-.635-.085c-5.774.958-6.642 4.318-6.677 4.458-.048.196-.04.399.021.589 6.887 21.366 21.199 25.327 25.903 26.629.363.101.661.181.889.256a1.087 1.087 0 0 0 .787-.046c.144-.066 3.544-1.667 4.375-6.891.037-.227 0-.463-.105-.668-.074-.144-1.852-3.528-6.784-4.724a1.066 1.066 0 0 0-.964.229c-1.556 1.329-3.705 2.745-4.632 2.891-6.217-3.039-9.689-8.872-9.82-9.978-.076-.622 1.349-2.806 2.988-4.582.207-.225.312-.53.283-.836"></path>
                        </svg>
                        9876543210
                     </p>
                     <p className="text-gray-800 font-serif font-bold pt-2 flex">
                        <img src={emailIcon} alt="email" width="30px" className='mr-2' />
                        cloudrashoi7@gmail.com
                     </p>
                  </div>
               </div>

               <div className='flex'>
                  <div className="mb-6">
                     <h3 className="text-xl font-semibold text-teal-600 font-serif">Opening Hours</h3>
                     <p className="mt-2 text-gray-600 font-serif">Monday - Friday: 10:00 AM - 10:00 PM</p>
                     <p className="text-gray-600 font-serif">Saturday - Sunday: 11:00 AM - 11:00 PM</p>
                  </div>
               </div>
            </div>

            <div className='flex justify-between items-center mt-6'>
               <div className='admin mt-4'>
                  <div className='flex items-center'>
                     <h1 className='mb-2 text-teal-600 font-bold text-xl font-serif'>Admin</h1>
                     <img
                        className="cursor-pointer ml-2"
                        src={edit}
                        alt="update icon"
                        width="20px"
                        title="Update Your Order"
                        onClick={handleEditClick}
                     />
                  </div>

                  <div>
                     <h1 className='font-serif'>Name : <span className='font-bold'>{adminDetails.name}</span></h1>
                     <h1 className='font-serif'>Mobile : <span className='font-bold'>{adminDetails.mobile}</span></h1>
                     <h1 className='font-serif'>Mail :<span className='font-bold'> {adminDetails.email}</span></h1>
                  </div>


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

         {isPopupOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
               <div className="absolute inset-0 bg-gray-600 bg-opacity-50"></div>
               <div className="relative bg-white p-6 rounded-lg shadow-lg z-50">
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
