// src/config/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Ensure env vars are loaded

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME;

    if (!mongoURI) {
      throw new Error('MONGODB_URI not defined in .env file');
    }
    if (!dbName) {
        throw new Error('DB_NAME not defined in .env file');
    }

    // Append the database name to the URI if not already present
    // Mongoose 6+ prefers specifying dbName in options
    const conn = await mongoose.connect(mongoURI, {
      dbName: dbName,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}, Database: ${conn.connection.name}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB; 