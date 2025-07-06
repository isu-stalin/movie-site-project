import type { Video } from "@/types";

interface TrailerTabProps {
  trailer: Video[] | undefined;
  isLoading: boolean;
}

const TrailerTab = ({ trailer, isLoading }: TrailerTabProps) => {
  if (isLoading) {
    return <div className="w-full max-w-2xl mx-auto aspect-video bg-gray-300 animate-pulse rounded-lg" />;
  }

  const trailerVideo = trailer?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  if (!trailerVideo) {
    return <p className="text-center text-gray-500">Трейлер недоступен</p>;
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-video">
      <iframe
        className="rounded-lg w-full h-full"
        src={`https://www.youtube.com/embed/${trailerVideo.key}`}
        title="Trailer"
        allowFullScreen
      />
    </div>
  );
};

export default TrailerTab;