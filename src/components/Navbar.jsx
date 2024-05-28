import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center">
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
      <div className="flex items-center space-x-4">
        <div className="hidden lg:flex items-center space-x-2">
          <i className="fas fa-phone-alt text-red-600"></i>
          <span>Call for Support</span>
          <span className="font-bold">9099012488</span>
        </div>
        <div className="flex items-center space-x-4">
          <i className="fas fa-house-user"></i>
          <i className="fas fa-store"></i>
          <i className="fas fa-cog"></i>
          <i className="fas fa-bell"></i>
          <i className="fas fa-user-circle"></i>
          <i className="fas fa-power-off"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
