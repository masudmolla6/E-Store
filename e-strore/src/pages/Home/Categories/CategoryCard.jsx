import React from "react";

const CategoryCard = ({ category, onClick }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 flex flex-col items-center">
      {/* Image */}
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-xl mb-4"
      />

      {/* Text */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
        {category.name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
        {category.description}
      </p>

      {/* Button */}
      <button
        onClick={() => onClick(category.name)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium"
      >
        View Products
      </button>
    </div>
  );
};

export default CategoryCard;
