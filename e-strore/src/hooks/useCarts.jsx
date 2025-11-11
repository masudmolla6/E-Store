import useAuth from './useAuth'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCarts = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:carts=[], refetch}=useQuery({
        queryKey:["carts", user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

  return [carts,refetch];
}

export default useCarts
