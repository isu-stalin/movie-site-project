import React, { useEffect, useState } from "react";
import { useMovie } from "@/api/hooks/useMovie";
import { IMAGE_URL } from "@/const";
import type { IMovie } from "@/types";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const navigate = useNavigate();
  const { getMovies } = useMovie();
  const { data } = getMovies({ page: 1 });

  const [index, setIndex] = useState(0);
  const movies: IMovie[] = data?.results?.slice(0, 5) || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [movies.length]);

  const currentMovie = movies[index];

  return (
    <div className="container mx-auto overflow-hidden py-4">
      {currentMovie && (
        <div
          className="relative cursor-pointer rounded-lg overflow-hidden"
          onClick={() => navigate(`/movies/${currentMovie.id}`)}
        >
          <img
            src={IMAGE_URL + currentMovie.backdrop_path}
            alt={currentMovie.title}
            className="w-full max-h-[400px] object-cover"
          />
          <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent w-full p-4 text-white">
            <h2 className="text-2xl font-bold">{currentMovie.title}</h2>
          </div>
        </div>
      )}
      <div className="flex gap-2 justify-center mt-4">
        {movies.map((_, i) => (
          <button
            key={i}
            aria-label={`Switch to slide ${i + 1}`}
            title={`Switch to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Carousel);