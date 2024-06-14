// import React, { useState, useRef, useEffect } from "react";

// const SearchBar = ({
//   selectedCategory,
//   setSelectedCategory,
//   searchQuery,
//   setSearchQuery,
//   items,
//   // selectedCategory,
//   // setSelectedCategory,
//   // searchQuery,
//   // setSearchQuery,
//   // items,
// }) => {
//   const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
//   // const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
//   const searchBarRef = useRef(null);

//   const toggleSearchBar = () => {
//     setIsSearchBarOpen(!isSearchBarOpen);
//   };

//   const handleClickOutside = (event) => {
//     if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
//       setIsSearchBarOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (isSearchBarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isSearchBarOpen]);

//   return (
//     <div className="flex flex-row justify-between bg-white p-3 mb-4 rounded">
//       <p className="text-lg text-teal-600 font-bold font-serif">Search Items</p>
//       <div className="flex items-center space-x-2">
//         <div className="lg:hidden">
//           <button onClick={toggleSearchBar} className="text-2xl">
//             <i className="fas fa-search"></i>
//           </button>
//         </div>
//         {isSearchBarOpen && (
//           <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-2">
//             <select
//               className="border border-gray-400 rounded px-4 py-2"
//               onChange={(e) => {
//                 setSelectedCategory(e.target.value);
//                 setSearchQuery("");
//               }}
//               value={selectedCategory}
//             >
//               <option value="">All Categories</option>
//               {Object.keys(items).map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               className="border border-gray-400 rounded px-4 py-2"
//               placeholder="Search 🔍..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         )}
//         <div className="hidden lg:flex flex-row items-center space-x-2">
//           <input
//             type="text"
//             className="border border-gray-400 rounded px-4 py-2"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>
//     </div>
//   );
//   return (
//     <div
//       ref={searchBarRef}
//       className="flex relative flex-row justify-between bg-white p-4 mb-4"
//     >
//       <p
//         className={`text-lg font-bold ${isSearchBarOpen ? "hidden" : "block"}`}
//       >
//         Search Items
//       </p>
//       <div className="flex items-center space-x-2">
//         <div className="lg:hidden">
//           <button
//             onClick={toggleSearchBar}
//             className={`text-2xl ${isSearchBarOpen ? "hidden" : "block"}`}
//           >
//             <i className="fas fa-search"></i>
//           </button>
//         </div>
//         {isSearchBarOpen && (
//           <div className="flex flex-col lg:hidden lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-2">
//             {/* <select
//               className="border border-gray-400 rounded px-4 py-2"
//               onChange={(e) => {
//                 setSelectedCategory(e.target.value);
//                 setSearchQuery("");
//               }}
//               value={selectedCategory}
//             >
//               <option value="">All Categories</option>
//               {Object.keys(items).map((category) => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select> */}
//             <input
//               type="text"
//               className="border border-gray-400 rounded px-4 py-2"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             {/*<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                      Search
//                   </button>*/}
//           </div>
//         )}
//         <div className="hidden lg:flex flex-row items-center space-x-2">
//           <input
//             type="text"
//             className="border border-gray-400 rounded px-4 py-2"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>{" "}
//         <div></div>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

import React, { useState, useRef, useEffect } from "react";

const SearchBar = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  items,
}) => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const searchBarRef = useRef(null);

  const toggleSearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setIsSearchBarOpen(false);
    }
  };

  useEffect(() => {
    if (isSearchBarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchBarOpen]);

  return (
    <div
      ref={searchBarRef}
      className="flex relative flex-row justify-between bg-white p-4 mb-4"
    >
      <p
        className={`text-lg font-bold ${isSearchBarOpen ? "hidden" : "block"}`}
      >
        Search Items
      </p>
      <div className="flex items-center space-x-2">
        <div className="lg:hidden">
          <button
            onClick={toggleSearchBar}
            className={`text-2xl ${isSearchBarOpen ? "hidden" : "block"}`}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
        {isSearchBarOpen && (
          <div className="flex flex-col lg:hidden lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-2">
            {/* <select
              className="border border-gray-400 rounded px-4 py-2"
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSearchQuery("");
              }}
              value={selectedCategory}
            >
              <option value="">All Categories</option>
              {Object.keys(items).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select> */}
            <input
              type="text"
              className="border border-gray-400 rounded px-4 py-2"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/*<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                     Search
                  </button>*/}
          </div>
        )}
        <div className="hidden lg:flex flex-row items-center space-x-2">
          <input
            type="text"
            className="border border-gray-400 rounded px-4 py-2"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>{" "}
        <div></div>
      </div>
    </div>
  );
};

export default SearchBar;
