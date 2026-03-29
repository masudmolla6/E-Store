import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
// import bannerImg1 from '../../../assets/banner/1.jpg';
// import bannerImg2 from '../../../assets/banner/2.jpg';
// import bannerImg3 from '../../../assets/banner/3.jpg';
// import bannerImg4 from '../../../assets/banner/4.jpg';
import useSelectedBanners from '../../../hooks/useSelectedBanners';

const Banner = () => {
  const [banners, loading, error]=useSelectedBanners();
  console.log(banners);

  if (loading) {
    return (
      <div className="w-full rounded-xl overflow-hidden">
        <div className="w-full h-[250px] md:h-[400px] lg:h-[500px] bg-gray-300 animate-pulse"></div>
      </div>
    );
  }

  if (!banners.length) {
    return <p className="text-center">No banners found</p>;
  }

  return (
    <div className="w-full overflow-hidden rounded-xl">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={500}
        key={banners.length}
      >
        {banners.map((banner, idx) => (
          <div key={idx} className="w-full flex justify-center items-center">
            <img
              src={banner.image}
              alt={`Banner ${idx + 1}`}
              className="w-full h-auto min-h-[200px] sm:min-h-[250px] md:min-h-[350px] lg:min-h-[450px] object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
