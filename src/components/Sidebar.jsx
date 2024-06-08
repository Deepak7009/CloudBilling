import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/Const';
import { ItemsContext } from '../context/ItemsContext';

const Sidebar = ({ setSelectedCategory, setSearchQuery }) => {
   const [categories, setCategories] = useState([]);
   const { setItems } = useContext(ItemsContext);

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const response = await axios.get(`${baseUrl}categories`);
            const uniqueCategories = [...new Set(response.data.map(item => item.category))];
            setCategories(uniqueCategories);

            if (uniqueCategories.includes('Beverages')) {
               setSelectedCategory('Beverages');
               fetchProducts('Beverages');
            } else if (uniqueCategories.length > 0) {
               setSelectedCategory(uniqueCategories[0]);
               fetchProducts(uniqueCategories[0]);
            }

         } catch (error) {
            console.error('Error fetching categories:', error);
         }
      };

      fetchCategories();
   }, []);

   const fetchProducts = async (category) => {
      try {
         const response = await axios.get(`${baseUrl}products`, {
            params: { category }
         });
         setItems(response.data);
         setSearchQuery("");
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   };

   return (
      <div className="flex flex-col lg:max-w-[210px] min-[767px]:max-w-[150px] w-full bg-white p-4 rounded shadow-md mb-4 md:mb-0 md:mr-4">
         <div className="sticky top-0 bg-white z-10">
            <p className="md:text-[25px] sticky top-0 text-teal-600 bg-white font-serif z-10 text-[20px] md:block hidden font-bold mb-4">
               Categories
            </p>
         </div>
         <div className="flex overflow-x-auto md:overflow-y-auto">
            <ul className="flex md:flex-col">
               {categories?.map((category, index) => (
                  <li
                     key={index}
                     className="mt-2 sidebar-item md:pb-2 md:ms-0 md:text-[20px] text-[17px] font-semibold font-serif"
                  >
                     <button
                        className="text-left w-full"
                        onClick={() => {
                           setSelectedCategory(category);
                           setSearchQuery("");
                           fetchProducts(category);
                        }}
                     >
                        {category}
                     </button>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default Sidebar;
