const SinglePageSkeleton = () => {
    return (
      <div className="animate-pulse">
        <div className="relative h-[800px] w-full bg-gray-300 dark:bg-gray-700">
          <div className="absolute bottom-0 w-full bg-black/60 text-center py-6">
            <div className="h-10 w-2/3 bg-gray-400 dark:bg-gray-600 mx-auto rounded mb-4"></div>
            <div className="h-10 w-32 bg-gray-400 dark:bg-gray-600 mx-auto rounded"></div>
          </div>
        </div>
  
        <div className="flex justify-center gap-4 my-6 px-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded"
            ></div>
          ))}
        </div>
  
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
  
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 mx-auto rounded mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="h-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default SinglePageSkeleton;