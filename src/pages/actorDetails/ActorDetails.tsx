import { useState } from "react";
import { useParams } from "react-router-dom";
import { useActor } from "@/api/hooks/useActors";
import { IMAGE_URL } from "@/const";
import MovieView from "@/components/movie-view/MovieView";

const ITEMS_PER_PAGE = 8;

const ActorDetails = () => {
  const { id } = useParams();
  const { getActorDetails, getActorMovies } = useActor();

  const { data: actor, isPending: loadingActor } = getActorDetails(id!);
  const { data: movies, isPending: loadingMovies } = getActorMovies(id!);

  const [currentPage, setCurrentPage] = useState(1);

  if (loadingActor || loadingMovies) {
    return <p className="text-center py-10">Загрузка...</p>;
  }

  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMovies = movies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="dark:bg-black text-black dark:text-white">
      <div
        className="relative h-[800px] bg-center bg-cover"
        style={{
          backgroundImage: `url(${IMAGE_URL}${actor.profile_path})`,
          backgroundPosition: "center top 30%",
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">{actor.name}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="mb-2 text-sm text-gray-500 text-center">
          {actor.birthday || "Дата рождения неизвестна"}
        </p>
        {actor.place_of_birth && (
          <p className="mb-6 text-sm text-gray-500 text-center">
            {actor.place_of_birth}
          </p>
        )}
        <div className="text-sm leading-relaxed text-center">
          {actor.biography || "Биография отсутствует."}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Фильмы с участием
        </h2>
        <MovieView data={currentMovies} />

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() =>{ 
              setCurrentPage((p) => Math.max(p - 1, 1));
              window.scrollTo({top:0, behavior: 'smooth'});
            }}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50 cursor-pointer"
          >
            Назад
          </button>
          <span className="text-sm">
            Страница {currentPage} из {totalPages}
          </span>
          <button
            onClick={() =>{ 
              setCurrentPage((p) => Math.min(p + 1, totalPages))
              window.scrollTo({top:0, behavior:"smooth"})
            }}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50 cursor-pointer"
          >
            Вперёд
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;
