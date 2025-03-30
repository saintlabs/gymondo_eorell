// src/server.ts
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import workoutRoutes from './routes/workoutRoutes';

dotenv.config(); // Load .env file

connectDB(); // Connect to MongoDB

const app: Express = express();
const port = process.env.PORT || 5001; // Use 5001 or other if 5000 is taken

// Middleware
app.use(cors()); // Allow requests from frontend (adjust origin in production)
app.use(express.json()); // Parse JSON bodies

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Workout Tracker API Running');
});
app.use('/api/workouts', workoutRoutes); // Workout API routes

// Basic Error Handling (can be expanded)
app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).json({ 
      message: 'An unexpected error occurred',
      error: process.env.NODE_ENV === 'production' ? undefined : err.message 
    });
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
}); 