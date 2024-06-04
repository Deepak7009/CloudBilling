import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import historyIcon from "../assets/images/order.gif";
import gif from "../assets/images/webp/giphy.webp"
const Navbar = () => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   return (
      <div>
         <nav className="bg-white shadow-md p-3 flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center">

               <button
                  className="mr-4 text-xl block lg:hidden"
                  onClick={toggleSidebar}
               >
                  <i className="fas fa-bars"></i>
               </button>
               <Link to='/' >
                  <img width={100} height={100} src={gif} alt="" />
               </Link>


            </div>

            {/* Center Section */}
            <div className="flex items-center space-x-4">
               <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
                  New Order
               </button>
               <input
                  type="text"
                  placeholder="Bill No"
                  className="border px-2 py-1 rounded focus:border-red-600 transition duration-300"
               />
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex items-center space-x-4">
               <div className="flex items-center space-x-2">
                  <span>📞Call for Support</span>
                  <span className="font-bold">9876543210</span>
               </div>
               <div className="flex items-center space-x-4">

                  <Link to="/category" className="flex items-center space-x-1 hover:text-red-600 transition duration-300">
                     <svg width="40" height="40" viewBox="0 0 40 40">
                        <rect x="10" y="10" width="20" height="20" rx="2" fill="#FFF" stroke="#42A5F5" stroke-width="3" />
                        <path fill="#FFD700"
                           d="M15 20 L25 20 M20 15 L20 25" stroke="#42A5F5" stroke-width="2"
                        />
                     </svg>
                  </Link>

                  <Link to="/history"
                     className="">
                     <img title="Order History"
                        src={historyIcon} alt="history icon" width="30" height="30"
                     />
                  </Link>

                  <svg class="bell-icon" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                     <path fill="#FFD700" d="M12 22C13.1046 22 14 21.1046 14 20H10C10 21.1046 10.8954 22 12 22Z" />
                     <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFD700" d="M18 16V11C18 7.68629 16.7357 4.73571 14.4645 2.96447C14.3066 2.84119 14.153 2.72529 14 2.6166V2C14 0.89543 13.1046 0 12 0C10.8954 0 10 0.89543 10 2V2.6166C9.84703 2.72529 9.69336 2.84119 9.53553 2.96447C7.26429 4.73571 6 7.68629 6 11V16L4 18V19H20V18L18 16ZM8 11C8 8.23858 9.34315 5.34315 12 4.34315C14.6569 5.34315 16 8.23858 16 11V17H8V11Z" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">

                     <circle cx="12" cy="8" r="4" fill="#42A5F5"><animate attributeName="r" values="4;5;4" dur="1s" repeatCount="indefinite" /> </circle>
                     <path fill="#1E88E5" d="M12 14c-5 0-9 2.5-9 5v2h18v-2c0-2.5-4-5-9-5z" >
                        <animate
                           attributeName="d"
                           values="M12 14c-5 0-9 2.5-9 5v2h18v-2c0-2.5-4-5-9-5z;  M12 14c-6 0-10 2.5-10 5v2h20v-2c0-2.5-4-5-10-5z; M12 14c-5 0-9 2.5-9 5v2h18v-2c0-2.5-4-5-9-5z"
                           dur="2s"
                           repeatCount="indefinite"
                        />
                     </path>
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24"  >
                     <path fill="#66BB6A" d="M16 13v-2H7V8l-5 4 5 4v-3z">
                        <animate attributeName="d" values="M16 13v-2H7V8l-5 4 5 4v-3z;  M16 11v-2H7V6l-5 4 5 4v-3z;  M16 13v-2H7V8l-5 4 5 4v-3z" dur="1s" repeatCount="indefinite" />
                     </path>
                     <path
                        fill="#43A047"
                        d="M21 3H9c-1.1 0-2 .9-2 2v6h2V5h12v14H9v-6H7v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                     />
                  </svg>

               </div>
            </div>
         </nav>

         {/* Sidebar for mobile and tablet screens */}
         <div
            className={`fixed top-0 z-50 right-0 h-full bg-white shadow-md transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
               } transition-transform duration-300 lg:hidden`}
         >
            <div className="p-4">
               <button className="text-xl mb-4" onClick={toggleSidebar}>
                  <i className="fas fa-times hover:text-red-600 transition duration-300"></i>
               </button>
               <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                     <i className="fas fa-phone-alt text-red-600"></i>
                     <span>Call for Support</span>
                     <span className="font-bold">9099012488</span>
                  </div>
                  <Link to="/category" className="flex items-center space-x-1 hover:text-red-600 transition duration-300">
                     <i className="fas fa-plus"></i>
                     <span>Category</span>
                  </Link>
                  <Link to="/history" className="flex items-center space-x-1 hover:text-red-600 transition duration-300">
                     <img title="Order History" src={historyIcon} alt="history icon" />

                  </Link>

                  <svg class="bell-icon" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                     <path fill="#FFD700" d="M12 22C13.1046 22 14 21.1046 14 20H10C10 21.1046 10.8954 22 12 22Z" />
                     <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFD700" d="M18 16V11C18 7.68629 16.7357 4.73571 14.4645 2.96447C14.3066 2.84119 14.153 2.72529 14 2.6166V2C14 0.89543 13.1046 0 12 0C10.8954 0 10 0.89543 10 2V2.6166C9.84703 2.72529 9.69336 2.84119 9.53553 2.96447C7.26429 4.73571 6 7.68629 6 11V16L4 18V19H20V18L18 16ZM8 11C8 8.23858 9.34315 5.34315 12 4.34315C14.6569 5.34315 16 8.23858 16 11V17H8V11Z" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">

                     <circle cx="12" cy="8" r="4" fill="#42A5F5"><animate attributeName="r" values="4;5;4" dur="1s" repeatCount="indefinite" /> </circle>
                     <path fill="#1E88E5" d="M12 14c-5 0-9 2.5-9 5v2h18v-2c0-2.5-4-5-9-5z" >
                        <animate
                           attributeName="d"
                           values="M12 14c-5 0-9 2.5-9 5v2h18v-2c0-2.5-4-5-9-5z;  M12 14c-6 0-10 2.5-10 5v2h20v-2c0-2.5-4-5-10-5z; M12 14c-5 0-9 2.5-9 5v2h18v-2c0-2.5-4-5-9-5z"
                           dur="2s"
                           repeatCount="indefinite"
                        />
                     </path>
                  </svg>


                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24"  >
                     <path fill="#66BB6A" d="M16 13v-2H7V8l-5 4 5 4v-3z">
                        <animate attributeName="d" values="M16 13v-2H7V8l-5 4 5 4v-3z;  M16 11v-2H7V6l-5 4 5 4v-3z;  M16 13v-2H7V8l-5 4 5 4v-3z" dur="1s" repeatCount="indefinite" />
                     </path>
                     <path
                        fill="#43A047"
                        d="M21 3H9c-1.1 0-2 .9-2 2v6h2V5h12v14H9v-6H7v6c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                     />
                  </svg>

               </div>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
