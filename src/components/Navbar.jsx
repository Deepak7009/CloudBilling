import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <nav className="bg-white shadow-md p-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center">
          <button
            className="mr-4 text-xl block lg:hidden"
            onClick={toggleSidebar}
          >
            <i className="fas fa-bars"></i>
          </button>
          <img src="/path-to-your-logo.png" alt="Pet Pooja" className="h-8" />
        </div>

        {/* Center Section */}
        <div className="flex items-center space-x-4">
          <button className="bg-red-600 text-white px-4 py-2 rounded">
            New Order
          </button>
          <input
            type="text"
            placeholder="Bill No"
            className="border px-2 py-1 rounded"
          />
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <i className="fas fa-phone-alt text-red-600"></i>
            <span>Call for Support</span>
            <span className="font-bold">9099012488</span>
          </div>
          <div className="flex items-center space-x-4">
            <i className="fas fa-house-user"></i>
            <i className="fa-solid fa-plus">Categorie</i>
            <i className="fas fa-cog"></i>
            <i className="fas fa-bell"></i>
            <i className="fas fa-user-circle"></i>
            <i className="fas fa-power-off"></i>
          </div>
        </div>
      </nav>

      {/* Sidebar for mobile and tablet screens */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-md transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 lg:hidden`}
      >
        <div className="p-4">
          <button className="text-xl mb-4" onClick={toggleSidebar}>
            <i className="fas fa-times"></i>
          </button>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-phone-alt text-red-600"></i>
              <span>Call for Support</span>
              <span className="font-bold">9099012488</span>
            </div>
            <i className="fas fa-house-user"></i>
            <i className="fas fa-store"></i>
            <i className="fas fa-cog"></i>
            <i className="fas fa-bell"></i>
            <i className="fas fa-user-circle"></i>
            <i className="fas fa-power-off"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
