import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const useSingleMovie = () => {
  const getMovieById = (id: string) =>
    useQuery({
      queryKey: ["movie", id],
      queryFn: () => api.get(`movie/${id}`).then((res) => res.data),
    });

  return { getMovieById };
};