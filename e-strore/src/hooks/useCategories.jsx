import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategories = () => {
    const axiosPublic=useAxiosPublic();

    const {data:categories=[], isPending:loading, isError:error, refetch}=useQuery({
        queryKey:["reviews"],
        queryFn:async()=>{
            const res=await axiosPublic.get("/categories");
            return res.data;
        }
    })
    return [categories, loading, error, refetch];
}

export default useCategories;
