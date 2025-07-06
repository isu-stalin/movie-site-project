import { useFavorites } from "@/api/hooks/useFavorites";
import { useQueries } from "@tanstack/react-query";
import MovieView from "@/components/movie-view/MovieView";
import { api } from "@/api/index";

async function fetchMovie(id: string) {
  const { data } = await api.get(`movie/${id}?language=ru-RU`);
  return data;
}

const Saved = () => {
  const { favorites } = useFavorites();

  const queries = useQueries({
    queries: favorites.map((id) => ({
      queryKey: ["movie", id.toString()],
      queryFn: () => fetchMovie(id.toString()),
      enabled: !!favorites.length,  
    })),
  });

  const isLoading = queries.some((q) => q.isPending);
  const movies = queries.map((q) => q.data).filter(Boolean);

  return (
    <div className="dark:bg-black text-black dark:text-white">
      <h1 className="text-2xl font-bold text-center my-8">Избранные фильмы</h1>

      {favorites.length === 0 ? (
        <p className="text-center py-10">Нет избранных фильмов.</p>
      ) : isLoading ? (
        <p className="text-center py-10">Загрузка...</p>
      ) : (
        <MovieView data={movies} />
      )}
    </div>
  );
};

export default Saved;
