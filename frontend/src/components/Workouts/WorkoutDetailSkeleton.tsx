const WorkoutDetailSkeleton = () => {
  return (
    <div className="container max-w-5xl mx-auto px-4 pt-32">
      <div className="h-10 w-32 bg-indigo-100 rounded-md mb-8 animate-pulse"></div>

      <div className="bg-white rounded-xl shadow-sm p-8 mb-8 animate-pulse">
        <div className="h-10 w-3/4 bg-gray-200 rounded mb-6"></div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex flex-col items-center">
              <div className="h-4 w-16 bg-gray-200 rounded mb-3"></div>
              <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex flex-col items-center">
              <div className="h-4 w-16 bg-gray-200 rounded mb-3"></div>
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex flex-col items-center">
              <div className="h-4 w-16 bg-gray-200 rounded mb-3"></div>
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="h-4 w-20 bg-gray-200 rounded mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailSkeleton;