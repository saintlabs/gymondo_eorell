import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchWorkoutById } from '../services/api';
import { IWorkout } from '../types';
import WorkoutDetailSkeleton from '../components/Workouts/WorkoutDetailSkeleton';
import ErrorMessage from '../components/Layout/ErrorMessage';

// Helper to format date string
const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (e) {
        return 'Invalid Date';
    }
};



const WorkoutDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<IWorkout | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!id) {
      setError('Workout ID is missing.');
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const loadWorkoutDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchWorkoutById(id);
        if (isMounted) {
          setWorkout(data);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Failed to fetch workout details:", err);
          setError(err.response?.data?.message || err.message || 'Failed to load workout details.');
          if (err.response?.status === 404) {
            setError(`Workout with ID ${id} not found.`);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadWorkoutDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) return (
    <WorkoutDetailSkeleton />
  );
  
  if (error) return (
    <div className="container max-w-5xl mx-auto px-4 pt-32">
      <ErrorMessage message={error} />
    </div>
  );
  
  if (!workout) return (
   
    <div className="container max-w-5xl mx-auto px-4 pt-32">
      <ErrorMessage message="Workout data could not be loaded." />
    </div>
  );

  return (
    <div className="container max-w-5xl mx-auto px-4 pt-32">
      <div >
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center px-4 py-2 mb-8 rounded-md text-sm font-medium bg-indigo-100 text-indigo-700 border border-indigo-200 cursor-pointer transition-colors duration-150 ease-in-out hover:bg-indigo-200"
        >
          <svg
            className="mr-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Workouts
        </button>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">{workout.name}</h1>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex flex-col items-center">
                <span className="block text-sm font-medium text-gray-500 mb-1">Category</span>
                <div className="flex items-center justify-center">
                  {(() => {
                    const getCategoryColorClass = (category: string): string => {
                      const cat = category.toLowerCase();
                      switch (cat) {
                        case 'c1': return 'bg-red-500 text-white';
                        case 'c2': return 'bg-orange-500 text-white';
                        case 'c3': return 'bg-yellow-500 text-white';
                        case 'c4': return 'bg-emerald-500 text-white';
                        case 'c5': return 'bg-cyan-500 text-white';
                        case 'c6': return 'bg-blue-500 text-white';
                        case 'c7': return 'bg-violet-500 text-white';
                        default: return 'bg-gray-500 text-white';
                      }
                    };
                    const colorClass = getCategoryColorClass(workout.category);
                    return (
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                        {workout.category.toUpperCase()}
                      </span>
                    );
                  })()}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex flex-col items-center">
                <span className="block text-sm font-medium text-gray-500 mb-1">Start Date</span>
                <div className="flex items-center justify-center text-base text-gray-900 font-medium">
                  <svg
                    className="mr-2 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {formatDate(workout.startDate)}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex flex-col items-center">
                <span className="block text-sm font-medium text-gray-500 mb-1">Duration</span>
                <div className="flex items-center justify-center text-base text-gray-900 font-medium">
                  <svg
                    className="mr-2 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {workout.duration} min
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <span className="block text-sm font-medium text-gray-500 mb-3">Description</span>
              <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{workout.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailPage; 