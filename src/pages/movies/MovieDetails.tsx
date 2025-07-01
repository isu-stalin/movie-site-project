import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movie-view/MovieView";
import { IMAGE_URL } from "@/const";
import Error from "@/components/ui/Error";
import type { CastMember } from "@/types";
import type { IGenre } from "@/types";
import type { Video } from "@/types";
const TABS = ["Трейлер", "Детали", "Актёры", "Описание"] as const;

const MovieDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("Трейлер");

  const { getMovieById, getRecommendations, getCredits, getVideos } = useMovie();

  const { data: movie, isPending, isError, error } = getMovieById(id!);
  const { data: recommendations } = getRecommendations(id!);
  const { data: credits } = getCredits(id!);
  const { data: videos } = getVideos(id!);

  if (isPending) return <p className="text-center py-10">Загрузка...</p>;
  if (isError) return <Error message={error?.message} />;

  const trailer = videos?.results?.find((v: Video) => v.type === "Trailer" && v.site === "YouTube");

  return (
    <div className="dark:bg-black text-black dark:text-white">
      <div
        className="w-full h-[800px] bg-cover bg-center flex items-end justify-center"
        style={{
          backgroundImage: `url(${IMAGE_URL}${movie.backdrop_path})`,
        }}
      >
        <div className="bg-black bg-opacity-60 w-full text-center py-6">
          <h1 className="text-4xl text-white font-bold">{movie.title}</h1>
          <button className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
            ▶ Смотреть
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 text-center">
        <div className="flex justify-center gap-4 mb-6 flex-wrap">
            {TABS.map((tab) => (
                <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 text-sm font-medium transition text-gray-800 dark:text-white
                    ${activeTab === tab ? "font-semibold" : "opacity-70"}
                    cursor-pointer`}
                >
                {tab}
                <span
                    className={`absolute left-0 bottom-0 h-[2px] bg-black dark:bg-white transition-all duration-300
                    ${activeTab === tab ? "w-full" : "w-0"}
                    `}
                />
                </button>
            ))}
        </div>

        {activeTab === "Трейлер" && trailer ? (
          <div className="relative w-full max-w-2xl mx-auto aspect-video">
            <iframe
              className="rounded-lg w-full h-full"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allowFullScreen
            />
          </div>
        ) : null}

        {activeTab === "Детали" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto text-sm">
            <div>
              <p><strong>Дата выхода:</strong> {movie.release_date}</p>
              <p><strong>Длительность:</strong> {movie.runtime} мин</p>
              <p><strong>Язык:</strong> {movie.original_language}</p>
              <p><strong>Жанры:</strong> {movie.genres.map((g: IGenre) => g.name).join(", ")}</p>
            </div>
            <div>
              <p><strong>Оценка:</strong> {movie.vote_average} / 10</p>
              <p><strong>Статус:</strong> {movie.status}</p>
              <p><strong>Бюджет:</strong> ${movie.budget?.toLocaleString()}</p>
              <p><strong>Доход:</strong> ${movie.revenue?.toLocaleString()}</p>
            </div>
          </div>
        )}

        {activeTab === "Актёры" && (
          <div className="flex flex-wrap justify-center gap-4">
            {credits?.cast?.slice(0, 10).map((actor: CastMember) => (
                <div key={actor.id} className="w-32 text-center">
                    <img
                    src={
                        actor.profile_path
                        ? `${IMAGE_URL}${actor.profile_path}`
                        : "https://via.placeholder.com/150x225?text=No+Image"
                    }
                    alt={actor.name}
                    className="rounded shadow w-full h-auto"
                    />
                    <p className="mt-2 text-sm font-semibold">{actor.name}</p>
                    <p className="text-xs text-gray-400">{actor.character}</p>
                </div>
            ))}
          </div>
        )}

        {activeTab === "Описание" && (
          <div className="max-w-3xl mx-auto text-left text-sm">{movie.overview}</div>
        )}
      </div>

      {recommendations?.results?.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Похожие фильмы</h2>
          <MovieView data={recommendations.results.slice(0, 6)} />
        </div>
      )}
    </div>
  );
};

export default React.memo(MovieDetails);