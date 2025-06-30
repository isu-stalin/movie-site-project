import React from "react";
import { useSearchParams } from "react-router-dom";
import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movie-view/MovieView";
import MovieSkeleton from "@/components/movie-view/MovieSkeleton";
import ErrorUi from "@/components/ui/ErrorUi";

const Search = () => {
  const [params] = useSearchParams();
  const query = params.get("query") || "";

  const { searchMovies } = useMovie();
  const { data, isPending, isError, error, refetch } = searchMovies(query);

  if (!query) return <p className="text-center py-10">Введите название фильма</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Результаты для: <span className="text-blue-600">{query}</span></h2>

      {isError ? (
        <ErrorUi message={error?.message} onRetry={refetch} />
      ) : isPending ? (
        <MovieSkeleton />
      ) : (
        <MovieView data={data?.results} />
      )}
    </div>
  );
};

export default React.memo(Search);