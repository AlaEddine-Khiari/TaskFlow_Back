// src/models/Tache.js
import mongoose from 'mongoose';

// Define the schema for the Tache (Task) model
const tacheSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Utilisateur model
    ref: 'Utilisateur', // The model to which this ObjectId refers
    required: true // Each task must be associated with a user
  },
  titre: {
    type: String,
    required: true // Task title is required
  },
  description: String, // Optional description
  dateLimite: Date, // Optional deadline date
  priorite: {
    type: String,
    enum: ['basse', 'moyenne', 'haute'], // Priority must be one of these values
    default: 'moyenne' // Default priority is 'moyenne'
  },
  categorie: String, // Optional category
  terminee: {
    type: Boolean,
    default: false // Default completion status is false
  },
}, {
  // Add timestamps for createdAt and updatedAt fields automatically
  timestamps: true
});

// Create and export the Tache model based on the schema
export default mongoose.model('Tache', tacheSchema);
