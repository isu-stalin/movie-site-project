import { IMAGE_URL } from "@/const";
import { Link } from "react-router-dom";
import type { CastMember } from "@/types";

interface ActorsTabProps {
  credits: CastMember[] | undefined;
  isLoading: boolean;
}

const ActorsTab = ({ credits, isLoading }: ActorsTabProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-4 animate-pulse">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="w-32 h-48 bg-gray-300 rounded-lg" />
        ))}
      </div>
    );
  }

  if (!credits || credits.length === 0) {
    return <p className="text-center text-gray-500">Актёры отсутствуют</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {credits.slice(0, 10).map((actor) => (
        <div key={actor.id} className="w-32 text-center">
          <Link to={`/actors/${actor.id}`}>
            <img
              src={
                actor.profile_path
                  ? `${IMAGE_URL}${actor.profile_path}`
                  : "https://via.placeholder.com/150x225?text=No+Image"
              }
              alt={actor.name}
              className="rounded shadow w-full h-auto hover:opacity-80 transition"
            />
            <p className="mt-2 text-sm font-semibold">{actor.name}</p>
          </Link>
          <p className="text-xs text-gray-400">{actor.character}</p>
        </div>
      ))}
    </div>
  );
};

export default ActorsTab;
