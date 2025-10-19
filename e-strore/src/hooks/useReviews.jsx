import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query';

const useReviews = () => {
  const axiosSecure=useAxiosSecure();

  const {data:reviews=[], isPending:loading, isError:error, refetch}=useQuery({
    queryKey:["reviews"],
    queryFn:async()=>{
        const res=await axiosSecure.get("/reviews");
        return res.data;
    }
  })
  return [reviews,loading,error, refetch]
}

export default useReviews;
