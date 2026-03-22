import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBannerList = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: banners = [],
    isPending: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banners");
      return res.data;
    },
    staleTime: 1000 * 60,
  });

  return [banners, loading, error, refetch];
};

export default useBannerList;