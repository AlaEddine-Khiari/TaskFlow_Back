// src/config/db.js
import mongoose from 'mongoose';

// Function to connect to the MongoDB database
export const connectDB = async () => {
  try {
    // Use the MONGO_URI environment variable from your .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connecté à MongoDB');
  } catch (error) {
    // Log the error and exit the process if connection fails
    console.error('❌ Erreur de connexion MongoDB:', error.message); // Log specific error message
    process.exit(1); // Exit with a non-zero code to indicate an error
  }
};
