import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure';
import axios from 'axios';

const useAllUsers = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:allUsers, refetch}=useQuery({
        queryKey:[user?.email, "allUsers"],
        queryFn:async()=>{
            const res=await axiosSecure.get("/users");
            return res.data;
        }
    })
    return [allUsers, refetch];
}

export default useAllUsers
