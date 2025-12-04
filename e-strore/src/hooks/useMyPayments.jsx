import useAuth from './useAuth'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useMyPayments = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:myPayments=[], refetch}=useQuery({
        queryKey:["myPayments", user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

  return [myPayments,refetch];
}

export default useMyPayments;

