// src/controllers/tacheController.js
import Tache from '../models/Tache.js';

// Controller function to create a new task
export const creerTache = async (req, res) => {
  // Extract task details from the request body
  const { titre, description, dateLimite, priorite, categorie } = req.body;

  try {
    // Create a new Tache instance
    const tache = new Tache({
      // Associate the task with the authenticated user (user ID is attached by the auth middleware)
      utilisateur: req.utilisateur._id,
      titre,
      description,
      dateLimite,
      priorite,
      categorie,
    });

    // Save the new task to the database
    await tache.save();

    // Return the created task with a 201 status code
    res.status(201).json(tache);
  } catch (error) {
    // Catch any errors during creation
    console.error('Error creating task:', error); // Log the error server-side
    res.status(500).json({ message: 'Erreur serveur lors de la création de la tâche' }); // Return a generic server error
  }
};

// Controller function to get all tasks for the authenticated user
export const getTaches = async (req, res) => {
  try {
    // Find all tasks associated with the authenticated user ID
    const taches = await Tache.find({ utilisateur: req.utilisateur._id });

    // Return the list of tasks
    res.json(taches);
  } catch (error) {
    // Catch any errors during fetching
    console.error('Error fetching tasks:', error); // Log the error server-side
    res.status(500).json({ message: 'Erreur serveur lors du chargement des tâches' }); // Return a generic server error
  }
};

// Controller function to update a specific task
export const updateTache = async (req, res) => {
  try {
    // Find the task by its ID from the request parameters
    const tache = await Tache.findById(req.params.id);

    // Check if the task exists and if it belongs to the authenticated user
    if (!tache || String(tache.utilisateur) !== String(req.utilisateur._id)) {
      // If task not found or doesn't belong to the user, return 404
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    // Update the task properties with data from the request body
    // Object.assign is used to merge properties from req.body into the tache object
    Object.assign(tache, req.body);

    // Save the updated task to the database
    await tache.save();

    // Return the updated task
    res.json(tache);
  } catch (error) {
    // Catch any errors during update
    console.error('Error updating task:', error); // Log the error server-side
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la tâche' }); // Return a generic server error
  }
};

// Controller function to delete a specific task
export const supprimerTache = async (req, res) => {
  try {
    // Find the task by its ID
    const tache = await Tache.findById(req.params.id);

    // Check if the task exists and if it belongs to the authenticated user
    if (!tache || String(tache.utilisateur) !== String(req.utilisateur._id)) {
      // If task not found or doesn't belong to the user, return 404
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    // Delete the task from the database
    await tache.deleteOne();

    // Return a success message
    res.json({ message: 'Tâche supprimée' });
  } catch (error) {
    // Catch any errors during deletion
    console.error('Error deleting task:', error); // Log the error server-side
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la tâche' }); // Return a generic server error
  }
};
