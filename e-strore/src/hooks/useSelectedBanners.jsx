import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSelectedBanners = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: banners = [],
    isPending: loading,
    error,
  } = useQuery({
    queryKey: ["selectedBanners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banners/selected");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  return [banners, loading, error];
};

export default useSelectedBanners;