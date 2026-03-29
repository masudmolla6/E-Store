import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useReviews from "../../../hooks/useReviews";
import ReviewsCard from "./ReviewsCard";
import { MessagesSquare } from "lucide-react";

const Reviews = () => {
  const [reviews, loading, error, refetch] = useReviews();
  // console.log(reviews);

  // Loading
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-6">
          {/* Header Skeleton */}
          <div className="text-center mb-12 space-y-3">
            <div className="h-8 w-64 mx-auto bg-gray-300 animate-pulse rounded"></div>
            <div className="h-4 w-80 mx-auto bg-gray-300 animate-pulse rounded"></div>
          </div>

          {/* Cards Skeleton (Swiper feel) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-4"
              >
                {/* Avatar */}
                <div className="w-12 h-12 bg-gray-300 animate-pulse rounded-full"></div>

                {/* Name */}
                <div className="h-4 w-32 bg-gray-300 animate-pulse rounded"></div>

                {/* Review text */}
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 animate-pulse rounded"></div>
                  <div className="h-3 bg-gray-300 animate-pulse rounded w-5/6"></div>
                  <div className="h-3 bg-gray-300 animate-pulse rounded w-2/3"></div>
                </div>

                {/* Rating */}
                <div className="h-4 w-20 bg-gray-300 animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load reviews
        <button
          onClick={refetch}
          className="ml-2 text-blue-500 underline hover:text-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }

  // No reviews
  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-400">
        No reviews available.
      </div>
    );
  }

  // Data available → show Swiper
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white flex justify-center items-center">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Real experiences from our happy shoppers worldwide
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
