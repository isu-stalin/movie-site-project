import React from "react";

const MovieSkeleton = () => {
  return (
    <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white dark:bg-slate-800 p-3 rounded shadow"
        >
          <div className="bg-gray-300 dark:bg-slate-700 h-56 rounded mb-3" />
          <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-slate-500 rounded w-1/3" />
        </div>
      ))}
    </div>
  );
};

export default React.memo(MovieSkeleton);