import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useBannerList = () => {
    const axiosPublic=useAxiosPublic();

    const {data:banners=[], isPending:loading, error, refetch}=useQuery({
      queryKey:["banners"],
      queryFn:async()=>{
          const res=await axiosPublic.get("/banners");
          return res.data;
      }
    })
    return [banners,loading, error, refetch]
};

export default useBannerList;
