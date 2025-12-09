import React from 'react'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMyOrders = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:myOrders=[], refetch}=useQuery({
        queryKey:["myOrders", user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/orders?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });
    return [myOrders,refetch];
}

export default useMyOrders;
