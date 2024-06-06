import React, { useContext } from 'react';
import { ItemsContext } from '../context/ItemsContext';

const ItemList = ({addToOrder }) => {
  const { items } = useContext(ItemsContext);

  return (
    <>
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="relative bg-white p-4 rounded shadow-md overflow-hidden group"
          >
            <div className="absolute inset-0 bg-green-500 transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"></div>
            <div className="relative z-10">
              <p className="text-base font-bold group-hover:text-white">{item.productName}</p>
              <p className="text-sm group-hover:text-white">{item.description}</p>
              <div className="flex flex-row justify-between mt-2">
                <p className="text-sm group-hover:text-white">₹ {item.price}</p>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded"
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
    </>
  );
};

export default ItemList;
