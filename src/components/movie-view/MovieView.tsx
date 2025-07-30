import { IMAGE_URL } from "@/const";
import type { IMovie } from "@/types";
import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { toggleFavorite } from "@/redux/store/slices";
import { useSelector } from "react-redux"
import { type RootState } from "@/redux/store/store";

interface Props {
  data: undefined | IMovie[];
}

const MovieView: FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state : RootState) => state.favorites.items);

  const handleToggle = (id: number) => {
    dispatch(toggleFavorite(id));
  };
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
      {data?.map((movie: IMovie) => {
        const isFavorite = favorites.includes(movie.id);

        return (
          <div
            key={movie.id}
            className="relative rounded-lg overflow-hidden bg-black border-1 border-red-600 shadow-md"
          >
            <div onClick={() => navigate(`/movies/${movie.id}`)} className="cursor-pointer">
              <img
                src={IMAGE_URL + movie.poster_path}
                alt={movie.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            <div className="p-4 text-center">
              <h3 className="text-white text-lg font-bold line-clamp-1">{movie.title}</h3>
              <p className="text-red-500 mt-1 font-medium">
                Оценка: {movie.vote_average}
              </p>
            </div>

            <button
              onClick={() => {
                handleToggle(movie.id)
                if (!user) {
                  // alert("Фильм сохранён локально. Войдите, чтобы сохранить навсегда.");
                  // return;
                }
              }}
              className={`absolute top-2 right-2 p-2 w-[40px] rounded-full border-1 cursor-pointer ${
                isFavorite ? "bg-red-600 text-white" : "bg-white text-black"
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
