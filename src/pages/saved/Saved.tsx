import { useQueries } from "@tanstack/react-query";
import MovieView from "@/components/movie-view/MovieView";
import { api } from "@/api/index";
import { useAppSelector } from "@/redux/store/hooks";

async function fetchMovie(id: string) {
  const { data } = await api.get(`movie/${id}?language=ru-RU`);
  return data;
}

const Saved = () => {
  const favorites = useAppSelector((state) => state.favorites.items);
  const user = useAppSelector((state) => state.auth.user);

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
    <div className="dark:bg-black text-black dark:text-white min-h-screen px-4">
      <h1 className="text-2xl font-bold text-center my-8">Избранные фильмы</h1>

      {!user && (
        <p className="text-center text-sm text-gray-400 mb-4">
          Вы не вошли в аккаунт. Эти избранные сохраняются только на этом устройстве.
        </p>
      )}

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