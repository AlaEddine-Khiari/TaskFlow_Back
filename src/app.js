// src/app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import utilisateurRoutes from './routes/utilisateurRoutes.js';
import tacheRoutes from './routes/tacheRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Create an Express application instance
const app = express();

// Middleware to enable Cross-Origin Resource Sharing (CORS)
// This allows your frontend running on a different origin (like localhost:xxxx for Flutter web)
// to make requests to your backend.
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to the MongoDB database
connectDB();

// Mount the user routes under the /api/utilisateurs path
app.use('/api/utilisateurs', utilisateurRoutes);

// Mount the task routes under the /api/taches path
app.use('/api/taches', tacheRoutes);

// Define a simple root route
app.get('/', (req, res) => res.send('Bienvenue sur l\'API TaskFlow 🇫🇷'));

// Start the server and listen on the specified port
// process.env.PORT is loaded from your .env file (e.g., PORT=5000)
const PORT = process.env.PORT || 5000; // Use port from env or default to 5000
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

// Basic error handling middleware (optional but good practice)
// This catches any errors that occur during request processing
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).send({ message: 'Something went wrong!' }); // Send a generic error response
});

