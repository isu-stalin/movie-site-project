import Carousel from "@/components/carousel/Carousel";
import { useMovie } from '@/api/hooks/useMovie';
import React from 'react';
import MovieView from '@/components/movie-view/MovieView';
import { NavLink } from "react-router-dom";

const Home = () => {
  const { getMovies } = useMovie();
  const { data } = getMovies({ page: 1, without_genres: "18,36,27,10749" });

  return (
    <div>
      <Carousel />
      <div className="container mx-auto text-lg py-4 flex justify-between items-center w-[100%]">
        <h1>На неделю</h1>
        <div className="text-[#C61F1F] text-sm p-1 cursor-pointer"><NavLink to="/movies">Показать все</NavLink></div>
      </div>
      <MovieView data={data?.results?.slice(0, 8)} />
    </div>
  );
};

export default React.memo(Home);