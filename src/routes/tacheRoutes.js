// src/routes/tacheRoutes.js
import express from 'express';
import { creerTache, getTaches, updateTache, supprimerTache } from '../controllers/tacheController.js';
import { proteger } from '../middleware/auth.js'; // Import the authentication middleware

// Create a new router instance
const router = express.Router();

// Apply the authentication middleware to all task routes
// This means any request to these routes will first go through the 'proteger' middleware
router.use(proteger);

// Define routes for /api/taches
router.route('/')
  .post(creerTache) // POST request to create a new task
  .get(getTaches);  // GET request to get all tasks for the authenticated user

// Define routes for /api/taches/:id
router.route('/:id')
  .put(updateTache)    // PUT request to update a specific task by ID
  .delete(supprimerTache); // DELETE request to delete a specific task by ID

// Export the router
export default router;
