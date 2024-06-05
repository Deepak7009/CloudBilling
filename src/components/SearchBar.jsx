import React, { useState } from "react";

const SearchBar = ({

  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  items,

}) => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
  };

  return (
    <div className="flex flex-row justify-between bg-white p-4 mb-4">
      <p className="text-lg font-bold">Search Items</p>
      <div className="flex items-center space-x-2">
        <div className="lg:hidden">
          <button onClick={toggleSearchBar} className="text-2xl">
            <i className="fas fa-search"></i>
          </button>
        </div>
        {isSearchBarOpen && (
          <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-2">
            <select
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
            </select>
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
       
        </div>

      </div>
    </div>
  );
};

export default SearchBar;
