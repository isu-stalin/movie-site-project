const ActorPageSkeleton = () => {
    return (
      <div className="animate-pulse">
        <div className="h-[800px] w-full bg-gray-300 dark:bg-gray-700"></div>
  
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-4 text-center">
          <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 mx-auto rounded"></div>
          <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 mx-auto rounded"></div>
          <div className="h-20 w-full bg-gray-300 dark:bg-gray-700 mx-auto rounded"></div>
        </div>
  
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 mx-auto rounded mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="space-y-2">
                <div className="h-40 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 mx-auto rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ActorPageSkeleton;  