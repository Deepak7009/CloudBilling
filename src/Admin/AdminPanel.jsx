import React from 'react';
import structure from "../assets/images/structure.gif";
import historyIcon from "../assets/images/order.gif";
import productIcon from '../assets/images/add-product.png';
import offer from '../assets/images/offer.png';
import customer from '../assets/images/customer.png';
import customers from '../assets/images/customers.gif';
import invoice from '../assets/images/invoice.gif';
import expense from '../assets/images/expense.gif';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
   return (
      <div className="container mx-auto px-4 py-8 mt-20">
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 ">
            <Link
               to="/category"
               className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
               <img title="Structure" src={structure} alt="Structure" width="80" />
               <h2 className="pt-2 text-center text-lg font-semibold text-gray-800">Structure</h2>
            </Link>

            <Link
               to="/history"
               className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
               <img title="Offer" src={offer} alt="Offer" width="80" />
               <h2 className="pt-2 text-center text-lg font-semibold text-gray-800">Add Offer</h2>
            </Link>

            <Link
               to="/history"
               className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
               <img title="Add Category" src={historyIcon} alt="Category" width="80" />
               <h2 className="pt-2 text-center text-lg font-semibold text-gray-800">Add Category</h2>
            </Link>

            <Link
               to="/category"
               className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
               <img title="Add Product" src={productIcon} alt="product" width="80" />
               <h2 className="pt-2 text-center text-lg font-semibold text-gray-800">Add Product</h2>
            </Link>

            <Link
               to="/products"
               className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
               <img title="Products" src={productIcon} alt="product" width="80" />
               <h2 className="pt-2 text-center text-lg font-semibold text-gray-800">All Products</h2>
            </Link>

            <Link
               to="/history"
               className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
               <img title="Invoice" src={invoice} alt="Invoice" width="80" />
               <h2 className="pt-2 text-center text-lg font-semibold text-gray-800">Invoice</h2>
            </Link>

            <Link
               to="/history"
               className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
               <img title="Add Customer" src={customer} alt="Customer" width="80" />
               <h2 className="pt-2 text-center text-lg font-semibold text-gray-800">Add Customer</h2>
            </Link>

            <Link
               to="/history"
               className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
               <img title="Customers" src={customers} alt="Customer" width="80" />
               <h2 className="pt-2 text-center text-lg font-semibold text-gray-800">All Customers</h2>
            </Link>

            <Link
               to="/expensises"
               className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
            >
               <img title="Expenses" src={expense} alt="Expenses" width="80" />
               <h2 className="pt-2 text-center text-lg font-semibold text-gray-800">Expenses</h2>
            </Link>
         </div>
      </div>
   );
};

export default AdminPanel;
