import useFeaturedProducts from "../../../hooks/useFeaturedProducts";
import ProductsCard from "../../OurProducts/AllProducts/ProductsCard";

const FeaturedProducts = () => {
    const [featuredProducts, loading, error] = useFeaturedProducts()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Something went wrong. Please try again later.
      </div>
    )
  }

  if (!featuredProducts?.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        No featured products available right now.
      </div>
    )
  }
    return (
    <div className="px-6">
      <h1
        className="
          text-2xl 
          sm:text-3xl 
          md:text-4xl 
          font-bold 
          mb-8 
          sm:mb-10 
          text-center
        "
      >
        Featured Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {featuredProducts.map((item) => (
          <section
            key={item._id}
            className="pb-6"
          >
            <h2
              className="
                text-xl 
                sm:text-2xl 
                font-semibold 
                mb-4 
                sm:mb-6 
                border-l-4 
                border-primary 
                pl-3 
                sm:pl-4
              "
            >
              {item._id}
            </h2>
            <div
            >
              <ProductsCard product={item.product} />
            </div>
          </section>
        ))}
      </div>
    </div>
    );
};

export default FeaturedProducts;
