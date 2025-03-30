// src/types/index.ts

// Based on the backend model, including fields needed in frontend
export interface IWorkout {
    _id: string; // MongoDB ObjectId as string
    name: string;
    description: string;
    startDate: string; // Date as ISO string from backend
    category: string; // Keep as string
    duration: number; // Duration in minutes
    createdAt?: string;
    updatedAt?: string;
    // Add other fields if used in the frontend
}

export const allowedCategories = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'] as const;
export type Category = typeof allowedCategories[number];

// Define API related types here to avoid circular dependencies
export interface FetchWorkoutsParams {
  page?: number;
  limit?: number;
  startDateMonthYear?: string | null; // YYYY-MM format
  categories?: Category[]; // Array of category strings
}

export interface ApiListResponse {
  workouts: IWorkout[];
  currentPage: number;
  totalPages: number;
  totalWorkouts: number;
  pageSize: number;
} 