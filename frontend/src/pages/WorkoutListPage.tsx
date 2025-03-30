import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchWorkouts } from '../services/api';
import { IWorkout, Category, FetchWorkoutsParams, ApiListResponse } from '../types';
import FilterBar from '../components/Workouts/FilterBar';
import WorkoutListItem from '../components/Workouts/WorkoutListItem';
import WorkoutTable from '../components/Workouts/WorkoutTable';
import Pagination from '../components/Layout/Pagination';
import WorkoutCardSkeletonLoader from '../components/Workouts/WorkoutCardSkeletonLoader';
import WorkoutTableSkeletonLoader from '../components/Workouts/WorkoutTableSkeletonLoader';
import ErrorMessage from '../components/Layout/ErrorMessage';


const WorkoutListPage: React.FC = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalWorkouts, setTotalWorkouts] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20); // 2 columns x 10 rows = 20 items per page
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilters = {
    startDateMonthYear: searchParams.get('month') || null,
    categories: searchParams.getAll('category') as Category[],
  };
  const [filters, setFilters] = useState<{ startDateMonthYear: string | null; categories: Category[] }>(initialFilters);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>(searchParams.get('view') as 'grid' | 'table' || 'grid');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleViewModeChange = (mode: 'grid' | 'table') => {
    if (!isMobile) {
      setViewMode(mode);
      const newParams = new URLSearchParams(searchParams);
      newParams.set('view', mode);
      setSearchParams(newParams);
    }
  };

  // Memoize fetch data function
  const loadWorkouts = useCallback(async (page: number, currentFilters: typeof filters) => {
    setIsLoading(true);
    setError(null);
    try {
      const params: FetchWorkoutsParams = {
        page: page,
        limit: pageSize,
        startDateMonthYear: currentFilters.startDateMonthYear,
        categories: currentFilters.categories,
      };
      const data: ApiListResponse = await fetchWorkouts(params);
      
      setWorkouts(data.workouts);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalWorkouts(data.totalWorkouts);
      setPageSize(data.pageSize);
    } catch (err: any) {
      console.error("Failed to fetch workouts:", err);
      setError(err.response?.data?.message || err.message || 'Failed to load workouts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [pageSize]);

  // Effect to load data when page or filters change
  useEffect(() => {
    loadWorkouts(currentPage, filters);
  }, [currentPage, filters, loadWorkouts]);

  // Handler for filter changes
  const handleFilterChange = useCallback((newFilters: { startDateMonthYear: string | null; categories: Category[] }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to page 1 when filters change
    
    // Update URL parameters while preserving view mode
    const params = new URLSearchParams(searchParams);
    // Clear existing filter params
    params.delete('month');
    params.delete('category');
    
    if (newFilters.startDateMonthYear) {
      params.set('month', newFilters.startDateMonthYear);
    }
    newFilters.categories.forEach(category => {
      params.append('category', category);
    });
    setSearchParams(params);
  }, [setSearchParams]);

  // Handler for page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8 pt-28 flex justify-center">
      <div className="container max-w-5xl px-4">
        <header className="py-4">
          <FilterBar
            onFiltersChange={handleFilterChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            initialMonth={searchParams.get('month') || ''}
            initialCategories={searchParams.getAll('category') as Category[]}
          />
        </header>

        {isLoading && (
          <>
            {(viewMode === 'grid' || isMobile) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(8)].map((_, index) => (
                  <WorkoutCardSkeletonLoader key={index} />
                ))}
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...Array(20)].map((_, index) => (
                    <WorkoutTableSkeletonLoader key={index} />
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
        {error && <ErrorMessage message={error} />}

        {!isLoading && !error && (
          <>
            {workouts.length > 0 ? (
              <>
                {(viewMode === 'grid' || isMobile) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {workouts.map(workout => (
                      <WorkoutListItem key={workout._id} workout={workout} />
                    ))}
                  </div>
                ) : (
                  <WorkoutTable workouts={workouts} />
                )}
               
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalWorkouts={totalWorkouts}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
             
              <div className="text-center text-gray-500 mt-8 p-12 bg-white rounded-lg shadow-sm">
                
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                  <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4.5C3 3.12 4.12 2 5.5 2H18.5C19.88 2 21 3.12 21 4.5V19.5C21 20.88 19.88 22 18.5 22H5.5C4.12 22 3 20.88 3 19.5V4.5ZM5.5 4C5.22 4 5 4.22 5 4.5V19.5C5 19.78 5.22 20 5.5 20H18.5C18.78 20 19 19.78 19 19.5V4.5C19 4.22 18.78 4 18.5 4H5.5Z"/>
                    <path d="M9 14.5V16.5H15V14.5H9Z"/>
                  </svg>
                </div>
               
                <h3 className="text-lg font-medium mb-2 text-gray-900">No workouts found</h3>
               
                <p className="text-sm">Try adjusting your filters or check back later</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WorkoutListPage;