import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="font-bold text-lg text-red-600">
            <img
              src="/logo.svg"
              alt="Logo"
              className="w-16 h-16 mr-2"
            />
          </a>
          <button className="ml-4 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">
            New Order
          </button>
          <div className="ml-4 text-gray-500 text-sm">
            <a href="/cart">Cart</a> | <a href="/orders">Orders</a>
          </div>
        </div>
        <div className="flex items-center">
          <a href="/support" className="text-gray-500 hover:text-gray-700 mr-4">
            Call for Support
          </a>
          <a href="/account" className="text-gray-500 hover:text-gray-700 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
