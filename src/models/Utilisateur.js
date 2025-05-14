// src/models/Utilisateur.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema for the Utilisateur (User) model
const utilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true // Name is required
  },
  email: {
    type: String,
    required: true,
    unique: true // Email must be unique
  },
  motdepasse: {
    type: String,
    required: true // Password is required
  },
});

// Mongoose middleware that runs before saving a document
// Used here to hash the password before saving it to the database
utilisateurSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (e.g., during signup or password change)
  if (!this.isModified('motdepasse')) {
    return next(); // If password is not modified, move to the next middleware/save operation
  }
  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10); // 10 is the number of rounds for salting
  this.motdepasse = await bcrypt.hash(this.motdepasse, salt); // Hash the password with the salt
  next(); // Move to the next middleware/save operation
});

// Custom instance method to verify a password
// This method will be available on each Utilisateur document
utilisateurSchema.methods.verifierMotDePasse = async function (motdepasse) {
  // Compare the provided password with the hashed password stored in the database
  return await bcrypt.compare(motdepasse, this.motdepasse);
};

// Create and export the Utilisateur model based on the schema
export default mongoose.model('Utilisateur', utilisateurSchema);
