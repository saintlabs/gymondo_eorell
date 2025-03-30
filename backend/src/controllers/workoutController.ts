import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Workout, { IWorkout } from '../models/Workout';

// Helper to check for valid MongoDB ObjectId
const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

// Controller to list workouts with filtering and pagination
export const listWorkouts = async (req: Request, res: Response): Promise<void> => {
    try {
        // --- Pagination ---
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20; // Default page size 20
        const skip = (page - 1) * limit;

        // --- Filtering ---
        const queryFilter: mongoose.FilterQuery<IWorkout> = {};

        // Start Date Filter (by month and year)
        const startDateMonthYear = req.query.startDateMonthYear as string; // Expecting "YYYY-MM" format
        if (startDateMonthYear && /^\d{4}-\d{2}$/.test(startDateMonthYear)) {
            const [year, month] = startDateMonthYear.split('-').map(Number);
            // Month in JS Date is 0-indexed (0=Jan, 11=Dec)
            const startOfMonth = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
            const endOfMonth = new Date(Date.UTC(year, month, 1, 0, 0, 0)); // Start of next month

            queryFilter.startDate = {
                $gte: startOfMonth,
                $lt: endOfMonth,
            };
        }

        // Category Filter (multiple choice)
        const categories = req.query.categories as string; // Expecting "c1,c7" format
        if (categories) {
            const categoryArray = categories.split(',').map(cat => cat.trim()).filter(Boolean);
            if (categoryArray.length > 0) {
                 // Validate categories against allowed values if needed
                // const validCategories = categoryArray.filter(cat => allowedCategories.includes(cat));
                queryFilter.category = { $in: categoryArray };
            }
        }

        // --- Database Query ---
        // Get total count matching filters *before* pagination
        const totalWorkouts = await Workout.countDocuments(queryFilter);

        // Get paginated results matching filters, sorted by startDate
        const workouts = await Workout.find(queryFilter)
            .sort({ startDate: 1 }) // Or any other preferred sorting
            .skip(skip)
            .limit(limit)
            .select('name description startDate category duration _id'); // Added duration field to selection

        const totalPages = Math.ceil(totalWorkouts / limit);

        // --- Response ---
        res.status(200).json({
            workouts,
            currentPage: page,
            totalPages,
            totalWorkouts,
            pageSize: limit
        });

    } catch (error: any) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ message: 'Server error fetching workouts', error: error.message });
    }
};

// Controller to get a single workout by ID
export const getWorkoutById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            res.status(400).json({ message: 'Invalid Workout ID format' });
            return;
        }

        // Fetch all fields for the detail view
        const workout = await Workout.findById(id);

        if (!workout) {
            res.status(404).json({ message: 'Workout not found' });
            return;
        }

        res.status(200).json(workout);

    } catch (error: any) {
        console.error(`Error fetching workout by ID ${req.params.id}:`, error);
        res.status(500).json({ message: 'Server error fetching workout details', error: error.message });
    }
}; 