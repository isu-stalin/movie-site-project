import type { IGenre } from "@/types";

interface DetailsTabProps {
  movie: {
    release_date: string;
    runtime: number;
    original_language: string;
    genres: IGenre[];
    vote_average: number;
    status: string;
    budget: number;
    revenue: number;
  };
  isLoading: boolean;
}

const DetailsTab = ({ movie, isLoading }: DetailsTabProps) => {
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4 animate-pulse">
        <div className="h-6 bg-gray-300 rounded" />
        <div className="h-6 bg-gray-300 rounded" />
        <div className="h-6 bg-gray-300 rounded" />
        <div className="h-6 bg-gray-300 rounded" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto text-sm">
      <div>
        <p><strong>Дата выхода:</strong> {movie.release_date}</p>
        <p><strong>Длительность:</strong> {movie.runtime} мин</p>
        <p><strong>Язык:</strong> {movie.original_language}</p>
        <p><strong>Жанры:</strong> {movie.genres.map((g) => g.name).join(", ")}</p>
      </div>
      <div>
        <p><strong>Оценка:</strong> {movie.vote_average} / 10</p>
        <p><strong>Статус:</strong> {movie.status}</p>
        <p><strong>Бюджет:</strong> ${movie.budget?.toLocaleString()}</p>
        <p><strong>Доход:</strong> ${movie.revenue?.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default DetailsTab;
