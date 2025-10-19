import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useReviews from "../../../hooks/useReviews";

const Reviews = () => {
  const [ reviews , loading,error, refetch ]= useReviews();
  console.log()

  if (loading)
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-400">
        Loading reviews...
      </div>
    );

  if (error)
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load reviews 😢
      </div>
    );

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white">
            What Our Customers Say 💬
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Real experiences from our happy shoppers worldwide 🌍
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={25}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id || review.productId}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6">
                {/* User Info */}
                <div className="flex items-center mb-4">
                  <img
                    src={review.user?.image}
                    alt={review.user?.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 mr-4"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {review.user?.name}
                      </h3>
                      {review.user?.verifiedPurchase && (
                        <CheckCircle2
                          size={16}
                          className="text-green-500"
                          title="Verified Purchase"
                        />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {review.user?.profession}
                    </p>
                  </div>
                </div>

                {/* Review Title & Comment */}
                <h4 className="text-base italic font-medium text-gray-800 dark:text-gray-200 mb-2">
                  “{review.title}”
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {review.comment}
                </p>

                {/* Rating */}
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.round(review.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {review.rating.toFixed(1)} ★
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Average Rating */}
        {reviews.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
              ⭐ Average Rating:{" "}
              <span className="font-bold text-yellow-500">
                {(
                  reviews.reduce((acc, cur) => acc + cur.rating, 0) /
                  reviews.length
                ).toFixed(1)}{" "}
                / 5
              </span>{" "}
              based on {reviews.length} reviews
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
