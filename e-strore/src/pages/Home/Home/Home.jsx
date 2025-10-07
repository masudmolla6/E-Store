import React from 'react'
import Banner from '../Banner/Banner'
import Categories from '../Categories/Categories'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import AboutUs from '../AboutUs/AboutUs'
import ContactUs from '../ContactUs/ContactUs'

const Home = () => {
  return (
    <div className=''>
      <div id="home">
        <Banner />
      </div>

      <div id="categories">
        <Categories />
      </div>

      <div id="featured">
        <FeaturedProducts />
      </div>

      <div id="about">
        <AboutUs />
      </div>

      <div id="contact">
        <ContactUs />
      </div>
    </div>
  )
}

export default Home
