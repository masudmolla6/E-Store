import React from 'react'
import Banner from '../Banner/Banner'
import Categories from '../Categories/Categories'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'

const Home = () => {
  return (
    <div className=''>
      <Banner></Banner>
      <Categories></Categories>
      <FeaturedProducts></FeaturedProducts>
    </div>
  )
}

export default Home
