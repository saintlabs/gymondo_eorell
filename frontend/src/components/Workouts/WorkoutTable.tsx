import React from 'react';
import { Link } from 'react-router-dom';
import { IWorkout } from '../../types';

interface WorkoutTableProps {
  workouts: IWorkout[];
}

const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

const formatDuration = (minutes: number | undefined | null): string => {
  if (minutes === undefined || minutes === null || isNaN(Number(minutes))) {
    return 'N/A';
  }
  return `${minutes} min`;
}

const WorkoutTable: React.FC<WorkoutTableProps> = ({ workouts }) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="bg-white border-b border-gray-200 px-6 py-4 text-left">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-900">Workout</span>
              </div>
            </th>
            <th className="bg-white border-b border-gray-200 px-6 py-4 text-left">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-900">Category</span>
              </div>
            </th>
            <th className="bg-white border-b border-gray-200 px-6 py-4 text-left">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-900">Date</span>
              </div>
            </th>
            <th className="bg-white border-b border-gray-200 px-6 py-4 text-left">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-900">Duration</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {workouts.map((workout) => (
            <tr key={workout._id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col">
                  <Link to={`/workouts/${workout._id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600">
                    {workout.name}
                  </Link>
                  <p className="text-sm text-gray-500 truncate max-w-md">
                    {workout.description}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                <span className={`inline-flex text-xs font-medium px-2.5 py-1.5 rounded-full shadow-sm ${
                  workout.category === 'c1' ? 'bg-red-500 text-white' :
                  workout.category === 'c2' ? 'bg-orange-500 text-white' :
                  workout.category === 'c3' ? 'bg-yellow-500 text-white' :
                  workout.category === 'c4' ? 'bg-emerald-500 text-white' :
                  workout.category === 'c5' ? 'bg-cyan-500 text-white' :
                  workout.category === 'c6' ? 'bg-blue-500 text-white' :
                  workout.category === 'c7' ? 'bg-violet-500 text-white' :
                  'bg-gray-500 text-white'
                }`}>
                  {workout.category.toUpperCase()}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                <span className="text-sm text-gray-900">{formatDate(workout.startDate)}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                <span className="text-sm text-gray-900">{formatDuration(workout.duration)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div> 
    </div> 
  ); 
}; 

export default WorkoutTable;