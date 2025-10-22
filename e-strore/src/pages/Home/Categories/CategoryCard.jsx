import { Link } from "react-router";

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 flex flex-col items-center">
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-xl mb-4"
      />

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
        {category.name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
        {category.description}
      </p>

      {/* 👇 send category name as query parameter */}
      <Link to={`/products/categoryProducts?category=${category.name}`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">
          View Products
        </button>
      </Link>
    </div>
  );
};

export default CategoryCard;
