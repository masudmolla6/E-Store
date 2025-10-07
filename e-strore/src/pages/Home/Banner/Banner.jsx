import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../../assets/banner/1.jpg';
import bannerImg2 from '../../../assets/banner/2.jpg';
import bannerImg3 from '../../../assets/banner/3.jpg';
import bannerImg4 from '../../../assets/banner/4.jpg';

const Banner = () => {
  return (
    <div className="w-full overflow-hidden rounded-xl">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={500}
      >
        {[bannerImg1, bannerImg2, bannerImg3, bannerImg4].map((img, idx) => (
          <div key={idx} className="w-full flex justify-center items-center">
            <img
              src={img}
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
