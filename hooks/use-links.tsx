import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getLinks = (userId?: string) => {
  return useQuery({
    queryKey: ["links", userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await axios.get(`/api/links?userId=${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
};

export const getProfile = (userId?: string) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      const response = await axios.get(`/api/create-profile?userId=${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
};
