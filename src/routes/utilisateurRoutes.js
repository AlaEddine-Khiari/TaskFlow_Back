// src/routes/utilisateurRoutes.js
import express from 'express';
import { inscription, connexion } from '../controllers/utilisateurController.js';

// Create a new router instance
const router = express.Router();

// Define the route for user registration (POST request to /inscription)
router.post('/inscription', inscription);

// Define the route for user login (POST request to /connexion)
router.post('/connexion', connexion);

// Export the router
export default router;
