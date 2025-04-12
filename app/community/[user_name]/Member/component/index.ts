"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGroupData = (endPoint: string) => {
  const { data = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["groupData", endPoint],
    queryFn: async () => {
      const res = await axios.get(endPoint);
      return res.data;
    },
  });
  return { data, isLoading, isError, refetch };
};
