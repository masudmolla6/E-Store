// src/hooks/useAllProducts.js
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllProducts = (searchTerm, sortOption, currentPage, limit = 8) => {
  const axiosSecure = useAxiosSecure();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allProducts", searchTerm, sortOption, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get("/products", {
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
