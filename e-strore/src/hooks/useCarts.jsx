import React from 'react'
import useAuth from './useAuth'
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useCarts = () => {
    const {user}=useAuth();
    const axiosPublic=useAxiosPublic();
    const {data:carts=[], refetch}=useQuery({
        queryKey:["carts", user?.email],
        queryFn:async()=>{
            const res=await axiosPublic.get(`/carts?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

  return [carts,refetch];
}

export default useCarts
