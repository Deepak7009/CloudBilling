import React from 'react';

const Sidebar = ({ items, selectedCategory, setSelectedCategory, setSearchQuery }) => (
    <div className="flex flex-col max-w-[150px] md:w-1/4 bg-white p-4 rounded shadow-md mb-4 md:mb-0 md:mr-4">
        <p className="text-lg font-bold mb-4">Categories</p>
        <ul className="space-y-2">
            {Object.keys(items).map((category) => (
                <li key={category}>
                    <button
                        className={`text-left w-full ${selectedCategory === category ? 'underline' : ''}`}
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
);

export default Sidebar;
