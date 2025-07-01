import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useActor } from "@/api/hooks/useActors";
import { IMAGE_URL } from "@/const";

const ActorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getActorDetails, getActorMovies } = useActor();

  const { data: actor, isPending: loadingActor } = getActorDetails(id!);
  const { data: movies, isPending: loadingMovies } = getActorMovies(id!);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loadingActor || loadingMovies) {
    return <p className="text-center py-10">Загрузка...</p>;
  }

  const handleMovieClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

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
        <h2 className="text-2xl font-semibold mb-6 text-center">Фильмы с участием</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie: any) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={
                  movie.poster_path
                    ? `${IMAGE_URL}${movie.poster_path}`
                    : "https://via.placeholder.com/150x225?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
              <div className="p-2 text-center">
                <p className="text-xs font-medium text-gray-800 dark:text-white">
                  {movie.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActorDetails;