import React from 'react'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAllOrders = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:allOrders, refetch}=useQuery({
        queryKey:["allOrders"],
        queryFn:async()=>{
            const res=await axiosSecure.get("/admin/orders");
            return res.data;
        }
    })
    return [allOrders, refetch];
}

export default useAllOrders;
