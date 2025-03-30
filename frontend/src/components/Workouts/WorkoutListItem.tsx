import React from 'react';
import { Link } from 'react-router-dom';
import { IWorkout } from '../../types';

interface WorkoutListItemProps {
  workout: IWorkout;
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
    // Return 'N/A' if minutes is undefined, null, or not a number
    if (minutes === undefined || minutes === null || isNaN(Number(minutes))) {
        return 'N/A';
    }
    
    // Convert to number to ensure proper calculation
    const mins = Number(minutes);
    
    // Always display in minutes format
    return `${mins} min`;
}

const CalendarIcon = () => (
  <svg className="mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);



const WorkoutListItem: React.FC<WorkoutListItemProps> = ({ workout }) => {



  return (
    <Link
      to={`/workouts/${workout._id}`}
      className="group flex flex-col h-full min-h-[12rem] bg-white p-4 rounded-lg shadow-sm border border-gray-200/80 relative overflow-hidden transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md w-full"
    >
      <div className="flex justify-between items-center mb-2 w-full">
        <h3 className="text-lg font-semibold text-gray-900 mr-2 leading-tight overflow-hidden text-ellipsis line-clamp-1 flex-1 text-left max-w-[calc(100%-80px)]">{workout.name}</h3>
        <div
          className={`text-xs font-medium px-2 py-1 rounded-full tracking-wider flex-shrink-0 self-center ml-2 ${
            workout.category === 'c1' ? 'bg-red-500 text-white' :
            workout.category === 'c2' ? 'bg-orange-500 text-white' :
            workout.category === 'c3' ? 'bg-yellow-500 text-white' :
            workout.category === 'c4' ? 'bg-emerald-500 text-white' :
            workout.category === 'c5' ? 'bg-cyan-500 text-white' :
            workout.category === 'c6' ? 'bg-blue-500 text-white' :
            workout.category === 'c7' ? 'bg-violet-500 text-white' :
            'bg-gray-500 text-white'
          }`}
        >
          {workout.category.toUpperCase()}
        </div>
      </div>
      
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <CalendarIcon />
        {formatDate(workout.startDate)}
      </div>
      
      <div className="relative w-full flex-1 mb-3">
        <p className="text-sm text-gray-600 leading-snug overflow-hidden line-clamp-3 text-left w-full pb-1">
          {workout.description}
        </p>

      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-auto">
        <div className="flex items-center text-sm text-gray-500">
          <ClockIcon />
          {formatDuration(workout.duration)}
        </div>
        
        <div
          className="text-sm font-medium text-blue-500 py-1.5 px-4 rounded-full border border-blue-500 transition-all duration-200 hover:bg-blue-50 cursor-pointer"
        >
          View Details
        </div>
      </div>
    </Link>
  );
};

export default WorkoutListItem; 