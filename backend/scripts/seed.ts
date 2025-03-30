import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import connectDB from '../src/config/db'; // Connects using .env settings
import Workout, { IWorkout } from '../src/models/Workout'; // Import the main Workout model and interface

dotenv.config({ path: '.env' }); // Load .env (including DB_NAME=gymondo)

// --- Configuration ---
const NUM_WORKOUTS_TO_SEED = 1000;
const ALLOWED_CATEGORIES = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
const NUM_DUMMY_TEXT_PARAGRAPHS = 35; // Adjust as needed for ~10KB
const NUM_DUMMY_ARRAY_ITEMS = 160;   // Adjust as needed for ~10KB
const validDurations: number[] = [];
for (let i = 5; i <= 90; i += 5) {
    validDurations.push(i);
}

// --- Lists for Plausible Title Generation ---
const workoutActions = [
  'training', 'workout', 'circuit', 'routine', 'session', 'exercise', 'program',
  'drill', 'challenge', 'regimen', 'plan', 'series', 'method', 'course'
];

const workoutTargets = [
  'full body', 'core', 'abs', 'upper body', 'lower body', 'legs', 'glutes',
  'arms', 'back', 'chest', 'shoulders', 'cardio', 'hiit', 'strength', 'endurance',
  'flexibility', 'balance', 'mobility', 'power', 'agility', 'speed'
];

const workoutStructures = [
  'circuit', 'interval', 'amrap', 'tabata', 'emom', 'for time', 'ladder',
  'pyramid', 'superset', 'giant set', 'complex', 'countdown', 'chipper',
  'flow', 'sequence', 'combo'
];

const workoutDescriptors = [
  'intense', 'quick', 'ultimate', 'essential', 'beginner', 'advanced', 'intermediate',
  'explosive', 'dynamic', 'powerful', 'efficient', 'effective', 'challenging',
  'easy', 'hardcore', 'energizing', 'refreshing', 'relaxing', 'revitalizing'
];

// Helper to Title Case string
function toTitleCase(str: string): string {
   return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

/**
 * Generates a single workout document object.
 * Using Omit to create a plain object matching the structure needed for insertion,
 * excluding Mongoose document properties and timestamps.
 */
const generateWorkout = (): Omit<IWorkout, keyof mongoose.Document | 'createdAt' | 'updatedAt'> => {
    // --- Generate Plausible Title ---
    let name = '';
    const pattern = faker.number.int({ min: 1, max: 7 });
    switch (pattern) {
        case 1: name = `${faker.helpers.arrayElement(workoutDescriptors)} ${faker.helpers.arrayElement(workoutTargets)} ${faker.helpers.arrayElement(workoutActions)}`; break;
        case 2: name = `${faker.helpers.arrayElement(workoutTargets)} ${faker.helpers.arrayElement(workoutStructures)}`; break;
        case 3: name = `${faker.helpers.arrayElement(workoutActions)} ${faker.helpers.arrayElement(workoutTargets)} ${faker.helpers.arrayElement(workoutStructures)}`; break;
        case 4: name = `${faker.helpers.arrayElement(workoutDescriptors)} ${faker.helpers.arrayElement(workoutActions)}`; break;
        case 5: name = `${faker.helpers.arrayElement(workoutTargets)} ${faker.helpers.arrayElement(workoutActions)}`; break;
        case 6: name = `${faker.helpers.arrayElement(workoutDescriptors)} ${faker.helpers.arrayElement(workoutTargets)} ${faker.helpers.arrayElement(workoutStructures)}`; break;
        case 7: name = `${faker.helpers.arrayElement(workoutTargets)} ${faker.helpers.arrayElement(workoutStructures)}`; break;
        default: name = `${faker.helpers.arrayElement(workoutTargets)} Workout`;
    }
    name = toTitleCase(name);

    // --- Generate Other Core Fields ---
    const description = faker.lorem.paragraphs({ min: 1, max: 3 });
    const startDate = faker.date.future({ years: 16/12 }); // Within the next 16 months
    const category = faker.helpers.arrayElement(ALLOWED_CATEGORIES);
    const duration = faker.helpers.arrayElement(validDurations);

    // --- Generate Pollution Fields ---
    const dummyDataLargeText = faker.lorem.paragraphs(NUM_DUMMY_TEXT_PARAGRAPHS);
    const dummyDataArray = Array.from(
        { length: NUM_DUMMY_ARRAY_ITEMS },
        () => faker.lorem.sentence({ min: 5, max: 15 })
    );

    // --- Construct the Workout Object ---
    // Type assertion helps ensure we match the expected structure for insertion
    const workout: Omit<IWorkout, keyof mongoose.Document | 'createdAt' | 'updatedAt'> = {
        name,
        description,
        startDate,
        category,
        duration,
        dummyDataLargeText,
        dummyDataArray,
    };

    return workout;
};

/**
 * Main function to seed the database.
 */
const seedDB = async () => {
    console.log('Attempting to connect to database...');
    // connectDB uses MONGODB_URI and DB_NAME=gymondo from .env
    await connectDB();
    console.log(`Database connected (Target DB: ${mongoose.connection.name}).`); // Log the actual DB name used

    try {
        // Use the main Workout model, which targets the 'workouts' collection
        // specified in its schema or inferred by Mongoose
        const collectionName = Workout.collection.name; // Get the collection name from the model
        console.log(`Attempting to delete existing documents from collection: ${collectionName}...`);
        await Workout.deleteMany({}); // Use the main model
        console.log(`Existing documents deleted successfully from ${collectionName}.`);

        console.log(`Generating ${NUM_WORKOUTS_TO_SEED} new workout documents...`);
        const workoutsToInsert = [];
        for (let i = 0; i < NUM_WORKOUTS_TO_SEED; i++) {
            workoutsToInsert.push(generateWorkout());
             if ((i + 1) % 100 === 0) {
                console.log(`Generated ${i + 1}/${NUM_WORKOUTS_TO_SEED} workouts...`);
            }
        }
        console.log('Workout documents generated.');

        console.log(`Inserting ${workoutsToInsert.length} workouts into collection ${collectionName}...`);
        // Use the main Workout model
        await Workout.insertMany(workoutsToInsert);
        console.log(`Database collection ${collectionName} seeded successfully!`);

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    } finally {
        console.log('Closing database connection...');
        await mongoose.disconnect();
        console.log('Database connection closed.');
    }
};

// Execute the seeding function
seedDB(); 