
export interface IWorkout {
    _id: string; 
    name: string;
    description: string;
    startDate: string; 
    category: string; 
    duration: number; 
    createdAt?: string;
    updatedAt?: string;
}

export const allowedCategories = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'] as const;
export type Category = typeof allowedCategories[number];

export interface FetchWorkoutsParams {
  page?: number;
  limit?: number;
  startDateMonthYear?: string | null; // YYYY-MM format
  categories?: Category[]; 
}

export interface ApiListResponse {
  workouts: IWorkout[];
  currentPage: number;
  totalPages: number;
  totalWorkouts: number;
  pageSize: number;
} 