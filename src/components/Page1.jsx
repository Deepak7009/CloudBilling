import React, { useState } from 'react';

function RestaurantManagementApp() {
  const [selectedCategory, setSelectedCategory] = useState('Beverages');
  const [searchQuery, setSearchQuery] = useState('');

  const items = {
    Beverages: [
      { name: 'Coffee', description: 'Hot / Cold', price: 40 },
      { name: 'Tea', description: 'Hot / Cold', price: 30 },
      { name: 'Juice', description: 'Fresh / Packaged', price: 50 },
      { name: 'Smoothie', description: 'Fruit / Veggie', price: 60 },
      { name: 'Milkshake', description: 'Chocolate / Vanilla', price: 70 },
      { name: 'Soda', description: 'Coke / Pepsi', price: 25 },
    ],
    Desserts: [
      { name: 'Ice Cream', description: 'Vanilla / Chocolate', price: 50 },
      { name: 'Cake', description: 'Slice', price: 60 },
      { name: 'Brownie', description: 'With / Without Nuts', price: 40 },
      { name: 'Pudding', description: 'Chocolate / Vanilla', price: 35 },
      { name: 'Pastry', description: 'Chocolate / Strawberry', price: 45 },
      { name: 'Cookies', description: 'Chocolate Chip / Oatmeal', price: 30 },
    ],
    Snacks: [
      { name: 'French Fries', description: 'Regular / Large', price: 50 },
      { name: 'Nachos', description: 'Cheese / Jalapeno', price: 70 },
      { name: 'Spring Rolls', description: 'Veg / Non-Veg', price: 80 },
      { name: 'Samosa', description: '2 pieces', price: 40 },
    ],
    Sandwiches: [
      { name: 'Veg Sandwich', description: 'Grilled / Plain', price: 60 },
      { name: 'Chicken Sandwich', description: 'Grilled / Plain', price: 80 },
      { name: 'Club Sandwich', description: 'Triple Layer', price: 100 },
      { name: 'Paneer Sandwich', description: 'Grilled / Plain', price: 90 },
    ],
    Pizza: [
      { name: 'Margherita', description: 'Regular / Large', price: 150 },
      { name: 'Pepperoni', description: 'Regular / Large', price: 200 },
      { name: 'Veggie Delight', description: 'Regular / Large', price: 170 },
      { name: 'BBQ Chicken', description: 'Regular / Large', price: 220 },
    ],
    Burgers: [
      { name: 'Veg Burger', description: 'With Cheese / Without Cheese', price: 60 },
      { name: 'Chicken Burger', description: 'With Cheese / Without Cheese', price: 80 },
      { name: 'Cheese Burger', description: 'Double Cheese', price: 100 },
      { name: 'Paneer Burger', description: 'With Cheese / Without Cheese', price: 90 },
    ],
    Rice: [
      { name: 'Fried Rice', description: 'Veg / Non-Veg', price: 90 },
      { name: 'Biryani', description: 'Chicken / Mutton', price: 120 },
      { name: 'Jeera Rice', description: 'With Dal', price: 70 },
      { name: 'Plain Rice', description: 'Steamed', price: 50 },
    ],
    Combos: [
      { name: 'Burger Combo', description: 'Burger + Fries + Drink', price: 150 },
      { name: 'Pizza Combo', description: 'Pizza + Garlic Bread + Drink', price: 200 },
      { name: 'Sandwich Combo', description: 'Sandwich + Chips + Drink', price: 130 },
      { name: 'Rice Combo', description: 'Rice + Curry + Drink', price: 140 },
    ],
  };

  const filteredItems = items[selectedCategory]?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      <header className="flex flex-row justify-between bg-gray-800 text-white p-4">
        <div className="flex flex-row items-center">
          <h1 className="text-xl font-bold mr-4">Petpooja</h1>
          <p className="text-sm">India's No.1 Restaurant Management Software</p>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <p className="text-sm">Call For Support: 9099912483</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Short Coda</button>
        </div>
      </header>
      <main className="flex flex-grow overflow-y-scroll bg-gray-200 p-4">
        <div className="flex flex-col md:flex-row w-full">
          {/* Sidebar for categories */}
          <div className="flex flex-col max-w-[150px] md:w-1/4 bg-white p-4 rounded shadow-md mb-4 md:mb-0 md:mr-4">
            <p className="text-lg font-bold mb-4">Categories</p>
            <ul className="space-y-2">
              {Object.keys(items).map((category) => (
                <li key={category}>
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
          <div className="flex flex-col w-full md:w-2/3">
            {/* Search bar with category selection */}
            <div className="flex flex-row justify-between bg-white p-4 mb-4">
              <p className="text-lg font-bold">Search Items</p>
              <div className="flex flex-row items-center space-x-2">
                <select
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
                </select>
                <input
                  type="text"
                  className="border border-gray-400 rounded px-4 py-2"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Search
                </button>
              </div>
            </div>
            {/* Category list with "See All" button */}
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row justify-between bg-white p-4">
                <p className="text-lg font-bold">{selectedCategory}</p>
                <button className="text-blue-500 font-bold">See All</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems?.map((item) => (
                  <div key={item.name} className="bg-white p-4 rounded shadow-md">
                    <p className="text-base font-bold">{item.name}</p>
                    <p className="text-sm">{item.description}</p>
                    <div className="flex flex-row justify-between mt-2">
                      <p className="text-sm">₹ {item.price}</p>
                      <button className="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded">
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/3 bg-white p-4 rounded shadow-md mt-4 md:mt-0 md:ml-4">
            <p className="text-lg font-bold mb-4">Order Summary</p>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row justify-between">
                <p className="text-sm">Coffee</p>
                <p className="text-sm">₹ 40</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-sm">Sandwich</p>
                <p className="text-sm">₹ 80</p>
              </div>
              {/* ... more order items */}
            </div>
            <div className="flex flex-row justify-between mt-4">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">₹ 120</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Place Order
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RestaurantManagementApp;
