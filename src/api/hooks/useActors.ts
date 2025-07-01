import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/index"; 

export const useActor = () => {
  const getActorDetails = (id: string) =>
    useQuery({
      queryKey: ["actor", id],
      queryFn: async () => {
        const { data } = await api.get(`/person/${id}`, {
          params: { language: "ru-RU" },
        });
        return data;
      },
    });

  const getActorMovies = (id: string) =>
    useQuery({
      queryKey: ["actor-movies", id],
      queryFn: async () => {
        const { data } = await api.get(`/person/${id}/movie_credits`, {
          params: { language: "ru-RU" },
        });
        return data.cast;
      },
    });

  return { getActorDetails, getActorMovies };
};