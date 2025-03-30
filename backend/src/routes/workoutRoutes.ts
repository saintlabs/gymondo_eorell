// src/routes/workoutRoutes.ts
import express from 'express';
import { listWorkouts, getWorkoutById } from '../controllers/workoutController';

const router = express.Router();

router.get('/', listWorkouts);
router.get('/:id', getWorkoutById);

export default router; 