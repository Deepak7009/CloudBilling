import React from "react";

const Category = () => {
  return (
    <div className="container flex mx-auto px-4">
        <div className="w-full md:w-1/2 px-4">
          <div className="mb-4 flex justify-between">
            <div className="w-5/12">
              <label htmlFor="productID" className="block font-medium">
                Product ID
              </label>
              <input
                type="text"
                id="productID"
                className="form-input mt-1 w-full border-2 border-blue-400"
              />
            </div>
            <div className="w-5/12">
              <label htmlFor="name" className="block font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-input mt-1 w-full border-2 border-blue-400"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block font-medium">
              Type
            </label>
            <select id="type" className="form-select mt-1 w-full border-2 border-blue-400">
              <option value="veg">Veg</option>
              <option value="non-veg">Non-veg</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block font-medium">
              Category of Food
            </label>
            <select id="category" className="form-select mt-1 w-full border-2 border-blue-400">
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="unit" className="block font-medium">
              Unit
            </label>
            <input type="text" id="unit" className="form-input mt-1 w-full border-2 border-blue-400" />
          </div>
          <div className="mb-4">
            <label htmlFor="stock" className="block font-medium">
              Stock
            </label>
            <input type="text" id="stock" className="form-input mt-1 w-full border-2 border-blue-400" />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block font-medium">
              Price
            </label>
            <input type="text" id="price" className="form-input mt-1 w-full border-2 border-blue-400" />
          </div>
        </div>

      {/* Second Column */}
      <div className="w-full md:w-1/2 px-4">
        <p>dsgds</p>
        <p>dsgds</p>

        <p>dsgds</p>

        <p>dsgds</p>
      </div>
    </div>
  );
};

export default Category;
