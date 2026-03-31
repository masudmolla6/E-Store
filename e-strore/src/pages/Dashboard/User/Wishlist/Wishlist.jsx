import React, { useEffect } from 'react'
import useWishlist from '../../../../hooks/useWishlist'
import WishlistCard from './WishlistCard'
import AOS from 'aos'
import { Heart, HeartOff, Sandwich } from 'lucide-react'
import WishlistSkeleton from './WishlistSkeleton'

const Wishlist = () => {
  const [wishlist, isLoading, refetch] = useWishlist()

      useEffect(() => {
        AOS.refresh();
      }, []);

    
  if(isLoading){
    return <WishlistSkeleton></WishlistSkeleton>;
  }

    if (wishlist?.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          
          <HeartOff className="w-12 h-12 text-cyan-400 mb-4" />
  
          <p className="text-gray-500 text-lg font-medium">
            Your wishlist is empty
          </p>
  
        </div>
      );
    }

  return (
    <div className="">
<h2 className="text-2xl font-semibold mb-6 flex justify-center items-center gap-2">
  
  <Heart className="text-red-400" />

  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
    My Wishlist
  </span>

</h2>
      {/* Wishlist Items */}
      <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist?.map(product => (
          <WishlistCard key={product._id} product={product}></WishlistCard>
        ))}
      </div>
    </div>
  )
}

export default Wishlist