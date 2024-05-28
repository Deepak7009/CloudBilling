import React from 'react';

const Sidebar = ({ items, setSelectedCategory, setSearchQuery }) => (
    <div className="flex flex-col w-[250px] bg-white p-4 rounded shadow-md mb-4 md:mb-0 md:mr-4">
        <div className="sticky top-0 bg-white z-10">
            <p className="text-lg font-bold mb-4">Categories</p>
        </div>
        <div className="flex-1 overflow-x-auto md:overflow-y-auto">
            <ul className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-2">
                {Object.keys(items).map((category) => (
                    <li key={category} className="flex-shrink-0">
                        <button
                            className="text-left w-full"
                            onClick={() => {
                                setSelectedCategory(category);
                                setSearchQuery('');
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

export default Sidebar;
