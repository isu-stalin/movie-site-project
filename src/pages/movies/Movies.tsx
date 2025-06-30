import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movie-view/MovieView";
import React, { useState } from "react";
import { Pagination } from "antd";
import { useGenre } from "@/api/hooks/useGenre";
// import Genre from "@/components/genre/Genre";
import type { IGenre } from "@/types";
import MovieSkeleton from "@/components/movie-view/MovieSkeleton";
import ErrorUI from "@/components/ui/ErrorUi";
import { useSearchParams } from "react-router-dom";



const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  

  const { getMovies } = useMovie();
  const { getGenres } = useGenre();

  const { data: genreData } = getGenres();
  const {
    data,
    isPending,
    isError,
    error,
    refetch,
  } = getMovies({
    page,
    with_genres: selectedGenre || undefined,
    without_genres: "18,36,27,10749",
  });  

  const handlePageChange = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };  

  const handleGenreClick = (id: number) => {
    setSelectedGenre((prev) => (prev === id ? null : id));
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };  
    

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 overflow-auto flex gap-4">
        {genreData?.genres?.map((genre:IGenre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm border transition ${
              selectedGenre === genre.id
                ? "bg-black text-white border-black"
                : "bg-white dark:bg-slate-800 dark:text-white border-gray-400"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {isError ? (
        <ErrorUI
          message={error?.message || "Не удалось загрузить фильмы."}
          onRetry={() => refetch()}
        />
      ) : isPending ? (
        <MovieSkeleton />
      ) : (
        <MovieView data={data?.results} />
      )}


      <div className="flex justify-center mt-6">
        <Pagination
          current={page}
          total={data?.total_results || 1000}
          pageSize={20}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default React.memo(Movies);
