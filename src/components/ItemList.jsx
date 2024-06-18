import React from 'react';

const ItemList = ({ filteredItems, addToOrder }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.productName}
            className="relative bg-white p-4 rounded shadow-md overflow-hidden group"
          >
            <div className="absolute inset-0 bg-teal-500 transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"></div>
            <div className="relative z-10">
              <p className="text-base font-bold font-serif group-hover:text-white">{item.productName}</p>
              <p className="text-sm group-hover:text-white font-serif">{item.description}</p>
              <div className="flex flex-row justify-between mt-2 font-serif">
                <p className="text-sm group-hover:text-white">₹ {item.price}</p>
                <button
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold font-serif px-2 py-1 rounded"
                  onClick={() => addToOrder(item)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
