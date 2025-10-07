import React from 'react'
import Banner from '../Banner/Banner'
import Categories from '../Categories/Categories'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import AboutUs from '../AboutUs/AboutUs'

const Home = () => {
  return (
    <div className=''>
      <Banner></Banner>
      <Categories></Categories>
      <FeaturedProducts></FeaturedProducts>
      <AboutUs></AboutUs>
    </div>
  )
}

export default Home
