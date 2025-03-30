const WorkoutCardSkeletonLoader = () => {
  return (
    <div className="flex flex-col h-full min-h-[12rem] bg-white p-4 rounded-lg shadow-sm border border-gray-200/80 relative overflow-hidden animate-pulse">
      <div className="flex justify-between items-center mb-2 w-full">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 w-16 bg-gray-200 rounded-full ml-2"></div>
      </div>
      
      <div className="flex items-center mb-2">
        <div className="h-5 w-32 bg-gray-200 rounded"></div>
      </div>
      
      <div className="relative w-full flex-1 mb-3">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-auto">
        <div className="h-5 w-24 bg-gray-200 rounded"></div>
        <div className="h-8 w-28 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default WorkoutCardSkeletonLoader;