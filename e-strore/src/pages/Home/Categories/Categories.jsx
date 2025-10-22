import useCategories from "../../../hooks/useCategories";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [categories, loading, error, refetch] = useCategories();

  if (loading) {
    return (
      <div className="w-full py-8 px-4 text-center">
        <p>Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8 px-4 text-center">
        <p>
          Failed to load categories.{" "}
          <button
            onClick={refetch}
            className="text-blue-500 underline hover:text-blue-700"
          >
            Try again
          </button>
        </p>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="w-full py-8 px-4 text-center">
        <p>No categories found.</p>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category._id} // clean React key
            category={category}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
