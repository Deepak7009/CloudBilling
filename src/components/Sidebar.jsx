import React, { useState } from "react";

const Sidebar = ({
  items,
  selectedCategory,
  setSelectedCategory,
  setSearchQuery,
}) => {
  const [line, setLine] = useState("");
  return (
    <div className="flex flex-col lg:max-w-[210px] max-w-[164px]  w-full bg-white p-4 rounded shadow-md mb-4 md:mb-0 md:mr-4">
      <div className="bg-white z-10">
        <p className="md:text-[25px] sticky top-0 bg-white z-10 text-[20px] md:block hidden font-bold mb-4">
          Categories
        </p>
        <div className="">
          {" "}
          <ul className=" flex md:flex-col">
            {Object.keys(items).map((category) => (
              <li
                onClick={() => {
                  setLine(category);
                }}
                key={category}
                className={`mt-2 sidebar-item md:pb-2 ms-5 md:ms-0  md:text-[20px] text-[17px] font-semibold   ${
                  line === category ? "active text-green-500" : ""
                }`}
              >
                <button
                  className={`text-left w-full`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSearchQuery("");
                  }}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
