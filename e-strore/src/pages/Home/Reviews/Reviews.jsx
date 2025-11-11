import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useReviews from "../../../hooks/useReviews";
import ReviewsCard from "./ReviewsCard";

const Reviews = () => {
  const [reviews, loading, error, refetch] = useReviews();
  // console.log(reviews);

  // 🔹 Loading
  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-400">
        Loading reviews...
      </div>
    );
  }

  // 🔹 Error
  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load reviews 😢
        <button
          onClick={refetch}
          className="ml-2 text-blue-500 underline hover:text-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }

  // 🔹 No reviews
  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-400">
        No reviews available.
      </div>
    );
  }

  // 🔹 Data available → show Swiper
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
            <SwiperSlide key={review._id}>
              <ReviewsCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
