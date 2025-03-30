// src/services/api.ts
import axios from 'axios';
import { IWorkout, FetchWorkoutsParams, ApiListResponse } from '../types';

// Use environment variable in Vite (prefix with VITE_)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchWorkouts = async (params: FetchWorkoutsParams = {}): Promise<ApiListResponse> => {
  // Convert categories array to comma-separated string for query param
  const queryParams = { ...params };
  if (params.categories && params.categories.length > 0) {
    // @ts-ignore // Need to handle type difference if params.categories is defined
     queryParams.categories = params.categories.join(',');
  } else {
     delete queryParams.categories; // Remove if empty
  }
  // Remove nullish startDateMonthYear
  if (!params.startDateMonthYear) {
      delete queryParams.startDateMonthYear;
  }

  const response = await apiClient.get<ApiListResponse>('/workouts', { params: queryParams });
  return response.data;
};

export const fetchWorkoutById = async (id: string): Promise<IWorkout> => {
  const response = await apiClient.get<IWorkout>(`/workouts/${id}`);
  return response.data;
};

export default apiClient; // Export if needed elsewhere 