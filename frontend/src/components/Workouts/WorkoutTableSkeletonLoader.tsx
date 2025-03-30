const WorkoutTableSkeletonLoader = () => {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-3 bg-gray-200 rounded-full w-24"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-3 bg-gray-200 rounded-full w-32"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-3 bg-gray-200 rounded-full w-20"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-3 bg-gray-200 rounded-full w-16"></div>
      </td>
    </tr>
  );
};

export default WorkoutTableSkeletonLoader;