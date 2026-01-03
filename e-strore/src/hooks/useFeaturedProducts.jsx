import React from 'react'
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useFeaturedProducts = () => {
  const axiosPublic=useAxiosPublic();

  const {data:featuredProducts=[], isPending:loading, isError:error, refetch}=useQuery({
    queryKey:["featuredProducts"],
    queryFn:async()=>{
        const res=await axiosPublic.get("/featured-products");
        return res.data;
    }
  })
  return [featuredProducts,loading,error, refetch];
}

export default useFeaturedProducts
