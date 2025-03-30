import mongoose, { Schema, Document, model } from 'mongoose';

// Define the allowed category values
const allowedCategories = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

// Interface describing the Workout document structure
export interface IWorkout extends Document {
  name: string;
  description: string;
  startDate: Date;
  category: typeof allowedCategories[number]; // Type based on allowed values
  duration: number; // Adding the duration field
  // Include other fields from your example if needed for other purposes,
  // but stick to the required ones for the core functionality.
  dummyDataLargeText?: string;
  dummyDataArray?: any[];
  createdAt?: Date; // Included by timestamps: true
  updatedAt?: Date; // Included by timestamps: true
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    category: {
      type: String,
      required: true,
      enum: {
          values: allowedCategories,
          message: 'Category {VALUE} is not supported' // Custom error message
      }
    },
    duration: { type: Number, required: true }, // Adding the duration field
    // Define other fields if necessary, matching your data structure
    dummyDataLargeText: { type: String },
    dummyDataArray: { type: Array }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    // **Crucial:** Explicitly define the collection name here
    collection: 'workouts'
  }
);

// Optional: Create an index for fields used in filtering/sorting for performance
workoutSchema.index({ startDate: 1 });
workoutSchema.index({ category: 1 });
workoutSchema.index({ startDate: 1, category: 1 });


// Create and export the Mongoose model
// Mongoose will use the 'workouts' collection name defined in the schema options
const Workout = model<IWorkout>('Workout', workoutSchema);

export default Workout; 