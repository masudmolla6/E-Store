import useCategories from "../../../hooks/useCategories";
import CategoryCard from "./CategoryCard";
import Typewriter from "typewriter-effect";

const Categories = () => {
  const [categories, loading, error, refetch] = useCategories();

  // 🔥 Skeleton Loader
  if (loading) {
    return (
      <div className="w-full py-8 px-4">
        {/* Title Skeleton */}
        <div className="h-6 w-48 mx-auto mb-6 bg-gray-300 animate-pulse rounded"></div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4 space-y-4"
            >
              {/* Image */}
              <div className="w-full h-24 bg-gray-300 animate-pulse rounded"></div>

              {/* Title */}
              <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ❌ Error State
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

  // 🚫 Empty State
  if (!categories || categories.length === 0) {
    return (
      <div className="w-full py-8 px-4 text-center">
        <p>No categories found.</p>
      </div>
    );
  }

  // ✅ Actual UI
  return (
    <div className="w-full py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        <Typewriter
          options={{
            strings: ["Shop by Category", "Big Sale Today!", "Up To 50% Off!"],
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 30,
          }}
        />
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;