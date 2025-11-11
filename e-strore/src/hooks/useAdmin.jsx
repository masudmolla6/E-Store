import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const {user, loading}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:isAdmin, isPending:adminLoading}=useQuery({
        queryKey:[user?.email,"isAdmin"],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data;
        }
    })
  return [isAdmin, adminLoading];
}

export default useAdmin;
