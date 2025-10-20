import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useReviews = () => {
  const axiosPublic=useAxiosPublic();

  const {data:reviews=[], isPending:loading, isError:error, refetch}=useQuery({
    queryKey:["reviews"],
    queryFn:async()=>{
        const res=await axiosPublic.get("/reviews");
        return res.data;
    }
  })
  return [reviews,loading,error, refetch]
}

export default useReviews;
