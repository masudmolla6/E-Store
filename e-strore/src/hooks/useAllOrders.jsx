import React from 'react'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAllOrders = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:allOrders,isLoading, refetch}=useQuery({
        queryKey:["allOrders"],
        queryFn:async()=>{
            const res=await axiosSecure.get("/admin/orders");
            return res.data;
        }
    })
    return [allOrders, isLoading, refetch];
}

export default useAllOrders;
