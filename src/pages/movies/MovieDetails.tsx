import React, { useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useMovie } from "@/api/hooks/useMovie";
import SinglePageSkeleton from "@/components/sceletons/SinglePageSkeleton";
import Error from "@/components/ui/Error";
import MovieView from "@/components/movie-view/MovieView";
import { IMAGE_URL } from "@/const";

const TrailerTab = lazy(() => import("@/components/movie-tabs/TrailerTab"));
const DetailsTab = lazy(() => import("@/components/movie-tabs/DetailsTab"));
const ActorsTab = lazy(() => import("@/components/movie-tabs/ActorsTab"));
const OverviewTab = lazy(() => import("@/components/movie-tabs/OverviewTab"));

const TABS = ["Трейлер", "Детали", "Актёры", "Описание"] as const;

const MovieDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("Трейлер");

  const { getMovieById, getRecommendations, getCredits, getVideos } = useMovie();
  const { data: movie, isPending, isError, error } = getMovieById(id!);
  const { data: recommendations } = getRecommendations(id!);
  const { data: credits } = getCredits(id!);
  const { data: videos } = getVideos(id!);

  if (isPending) return <SinglePageSkeleton />;
  if (isError) return <Error message={error?.message} />;

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
            Смотреть
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
                ${activeTab === tab ? "w-full" : "w-0"}`}
              />
            </button>
          ))}
        </div>

        <Suspense fallback={<div className="py-10 text-center">Загрузка вкладки...</div>}>
          {activeTab === "Трейлер" && (
            <TrailerTab trailer={videos?.results} isLoading={videos?.isLoading ?? false} />
          )}
          {activeTab === "Детали" && (
            <DetailsTab movie={movie} isLoading={false} />
          )}
          {activeTab === "Актёры" && (
            <ActorsTab credits={credits?.cast} isLoading={credits?.isLoading ?? false} />
          )}
          {activeTab === "Описание" && (
            <OverviewTab overview={movie.overview} isLoading={false} />
          )}
        </Suspense>
        {recommendations?.results?.length > 0 && (
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Похожие фильмы</h2>
            <MovieView data={recommendations.results.slice(0, 8)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(MovieDetails);