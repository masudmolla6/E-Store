// src/hooks/useAllProducts.js
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllProducts = (searchTerm, sortOption, currentPage, limit = 8) => {
  const axiosPublic = useAxiosPublic();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allProducts", searchTerm, sortOption, currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get("/products", {
        params: {
          search: searchTerm,
          sort: sortOption,
          page: currentPage,
          limit: limit,
        },
      });
      return res.data;
    },
    keepPreviousData: true, // ✅ pagination smooth রাখবে
  });

  return {
    products: data?.products || [],
    totalPages: data?.totalPages || 1,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useAllProducts;
