import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const useMovie = () => {
  const getMovies = (params: any) =>
    useQuery({
      queryKey: ["movie", params],
      queryFn: () => api.get("discover/movie", { params }).then(res => res.data),
    });
  const searchMovies = (query: string) =>
    useQuery({
      queryKey: ["search", query],
      queryFn: () =>
        api.get("search/movie", { params: { query } }).then((res) => res.data),
      enabled: !!query, 
    });    
  const getMovieById = (id: string) =>
    useQuery({
      queryKey: ["movie", id],
      queryFn: () => api.get(`movie/${id}`).then(res => res.data),
      enabled: !!id,
    });
  
  const getRecommendations = (id: string) =>
    useQuery({
      queryKey: ["recommend", id],
      queryFn: () => api.get(`movie/${id}/recommendations`).then(res => res.data),
      enabled: !!id,
    });
    const getCredits = (id: string) =>
      useQuery({
        queryKey: ["credits", id],
        queryFn: () => api.get(`movie/${id}/credits`).then(res => res.data),
        enabled: !!id,
      });
    
    const getVideos = (id: string) =>
      useQuery({
        queryKey: ["videos", id],
        queryFn: () => api.get(`movie/${id}/videos`).then(res => res.data),
        enabled: !!id,
      });

  return { getMovies, searchMovies, getMovieById, getRecommendations, getCredits, getVideos };
};

