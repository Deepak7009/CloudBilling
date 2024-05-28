import React from 'react';

const SearchBar = ({ selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, items }) => (
    <div className="flex flex-row justify-between bg-white p-4 mb-4">
        <p className="text-lg font-bold">Search Items</p>
        <div className="flex flex-row items-center space-x-2">
            {/* <select
                className="border border-gray-400 rounded px-4 py-2"
                onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSearchQuery('');
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
            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Search
            </button> */}
        </div>
    </div>
);

export default SearchBar;
