import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movie-view/MovieView";
import MovieSkeleton from "@/components/movie-view/MovieSkeleton";
import Error from "@/components/ui/Error";

const Search = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const query = params.get("query") || "";

  const { searchMovies, getMovies } = useMovie();
  const {
    data: searchData,
    isPending: searchPending,
    isError: searchError,
    error: searchErr,
    refetch: searchRefetch,
  } = searchMovies(query);
  const {
    data: popularData,
    isPending: popularPending,
    isError: popularError,
    error: popularErr,
    refetch: popularRefetch,
  } = getMovies({ page: 1 });

  const isSearchActive = Boolean(query.trim());

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">
        {isSearchActive ? (
          <>Результаты для: <span className="text-blue-600">{query}</span></>
        ) : (
          "Популярные фильмы"
        )}
      </h2>

      {isSearchActive ? (
        searchError ? (
          <Error message={searchErr?.message} onRetry={searchRefetch} />
        ) : searchPending ? (
          <MovieSkeleton />
        ) : searchData?.results?.length ? (
          <MovieView data={searchData.results} />
        ) : (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            <p className="mb-4">Фильмы не найдены.</p>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Назад на главную
            </button>
          </div>
        )
      ) : popularError ? (
        <Error message={popularErr?.message} onRetry={popularRefetch} />
      ) : popularPending ? (
        <MovieSkeleton />
      ) : (
        <MovieView data={popularData?.results} />
      )}
    </div>
  );
};

export default React.memo(Search);
