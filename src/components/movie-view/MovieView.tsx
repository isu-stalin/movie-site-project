import { IMAGE_URL } from "@/const";
import type { IMovie } from "@/types";
import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/api/hooks/useFavorites";

interface Props {
  data: undefined | IMovie[];
}

const MovieView: FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites(); // вызываем хук

  return (
    <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
      {data?.map((movie: IMovie) => {
        const isFavorite = favorites.includes(movie.id); // проверяем избранное

        return (
          <div className="dark:bg-slate-900 bg-white relative" key={movie.id}>
            <div
              className="cursor-pointer hover:scale-105 transition"
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              <img
                loading="lazy"
                src={IMAGE_URL + movie.poster_path}
                alt={movie.title}
              />
            </div>
            <div>
              <h3
                title={movie.title}
                className="text-xl font-semibold line-clamp-1"
              >
                {movie.title}
              </h3>
              <p>{movie.vote_average}</p>
            </div>

            <button
              onClick={() => toggleFavorite(movie.id)}
              className={`absolute top-2 right-2 p-2 rounded-full ${
                isFavorite ? "bg-red-600 text-white" : "bg-gray-300 text-black"
              }`}
              title="В избранное"
            >
              {isFavorite ? "★" : "☆"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(MovieView);
