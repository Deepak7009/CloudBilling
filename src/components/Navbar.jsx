import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import historyIcon from "../assets/images/order.gif";
import gif from "../assets/images/webp/giphy.webp"
import notificationIcon from '../assets/images/notification.gif'
import callIcon from '../assets/images/customer-service.gif'
import productIcon from '../assets/images/add-product.png'
import admin from '../assets/images/management-consulting.gif'
import logout from '../assets/images/log-out.gif'


const Navbar = () => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   return (
      <div>
         <nav className="bg-white shadow-md py-1 px-4 flex items-center justify-between">
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
            {/*<div className="flex items-center space-x-4">
               <Link to='/'>
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
                     New Order
                  </button>
               </Link>
            </div>*/}

            {/* Right Section */}
            <div className="hidden lg:flex items-center space-x-4">
               <div className="flex items-center space-x-2">
                  <span>
                     <img src={callIcon} alt="" width="36" height="36" />
                  </span>
                  {/*<span>Call for Support</span>*/}
                  <span className="font-bold">9876543210</span>
               </div>
               <div className="flex items-center space-x-4">

                  <Link to="/add-product" className="flex items-center space-x-1 hover:text-red-600 transition duration-300">
                     <img title="Add Product"
                        src={productIcon} alt="history icon" width="30" height="30"
                     />
                  </Link>

                  <Link to="/history"
                     className="">
                     <img title="Order History"
                        src={historyIcon} alt="history icon" width="30" height="30"
                     />
                  </Link>

                  <Link to="/" className="flex items-center space-x-2">

                     <img title="Notifications"
                        src={notificationIcon} alt="history icon" width="28" height="28"
                     />
                  </Link>

                  <Link to="/admin" className="flex items-center space-x-2">
                     <img title="Admin Panel"
                        src={admin} alt="" width="28" height="28" />
                  </Link>

                  <Link to="/profile" className="flex items-center space-x-2">
                     <img title="Logout"
                        src={logout} alt="" width="28" height="28" />
                  </Link>

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
                     <span>
                        <img src={callIcon} alt="" width="36" height="36" />
                     </span>
                     <span>Call for Support</span>
                     <span className="font-bold">9099012488</span>
                  </div>

                  <Link to="/add-product" className="flex items-center space-x-2">
                     <img src={productIcon} alt="history icon" width="40" height="40"
                     />
                     <span>Add Product</span>
                  </Link>

                  <Link to="/history" className="flex items-center space-x-2">
                     <img src={historyIcon} alt="history icon" width="40" height="40"
                     />
                     <span>Order History</span>
                  </Link>

                  <Link to="/" className="flex items-center space-x-2">
                     <img src={notificationIcon} alt="history icon" width="40" height="40"
                     />
                     <span>Notifications</span>
                  </Link>

                  <Link to="/admin" className="flex items-center space-x-2">
                     <img src={admin} alt="" width="40" height="40" />
                     <span>Admin Panel</span>
                  </Link>

                  <Link to="/profile" className="flex items-center space-x-2">
                     <img src={logout} alt="" width="40" height="40" />
                     <span>Logout</span>
                  </Link>

               </div>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
