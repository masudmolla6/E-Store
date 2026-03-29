import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useWishlist = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:wishlit=[],isLoading, refetch}=useQuery({
        queryKey:["wishlist", user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/wishlist?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

  return [wishlit, isLoading, refetch];
}

export default useWishlist
