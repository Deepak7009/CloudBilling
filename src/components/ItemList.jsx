import React from 'react';

const ItemList = ({ filteredItems, addToOrder }) => (
    <div className="flex flex-col space-y-4 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredItems?.map((item) => (
                <div key={item.name} className="bg-white p-4 rounded shadow-md">
                    <p className="text-base font-bold">{item.name}</p>
                    <p className="text-sm">{item.description}</p>
                    <div className="flex flex-row justify-between mt-2">
                        <p className="text-sm">₹ {item.price}</p>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white text-sm px-2 rounded"
                            onClick={() => addToOrder(item)}
                        >
                            Add
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default ItemList;
