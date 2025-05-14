// src/controllers/utilisateurController.js
import Utilisateur from '../models/Utilisateur.js';
import jwt from 'jsonwebtoken';

// Function to generate a JSON Web Token (JWT)
const genererToken = (id) => {
  // Sign the token with the user's ID and the JWT_SECRET from environment variables
  // The token expires in 7 days
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Controller function for user registration
export const inscription = async (req, res) => {
  const { nom, email, motdepasse } = req.body;

  try {
    // Check if a user with the given email already exists (case-insensitive)
    // We use a regex with 'i' flag for case-insensitive matching
    const existe = await Utilisateur.findOne({ email: new RegExp('^' + email + '\$', 'i') });
    // Alternatively, you could convert the input email to lowercase before querying
    // const existe = await Utilisateur.findOne({ email: email.toLowerCase() });
    // This second approach requires that emails are stored in lowercase in the DB.
    // The regex approach works regardless of how they are stored.

    if (existe) {
      // If user exists, return a 400 status with an error message
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Create a new user in the database
    // Consider storing email in lowercase here if you choose the second findOne approach above
    const utilisateur = await Utilisateur.create({ nom, email, motdepasse });

    // If user creation is successful, return a 201 status with user info and a token
    res.status(201).json({
      _id: utilisateur._id,
      nom: utilisateur.nom,
      email: utilisateur.email, // Include email in the response (will be as stored)
      token: genererToken(utilisateur._id),
    });
  } catch (error) {
    // Catch any errors during the process (e.g., database errors)
    console.error('Error during inscription:', error); // Log the error server-side
    res.status(500).json({ message: 'Erreur serveur lors de l\'inscription' }); // Return a generic server error
  }
};

// Controller function for user login
export const connexion = async (req, res) => {
  const { email, motdepasse } = req.body;

  try {
    // Find the user by email (case-insensitive)
    // Using regex with 'i' flag for case-insensitive matching
    const utilisateur = await Utilisateur.findOne({ email: new RegExp('^' + email + '\$', 'i') });
    // Alternatively, use: const utilisateur = await Utilisateur.findOne({ email: email.toLowerCase() });
    // if emails are stored in lowercase in the DB.

    // Check if the user exists and if the provided password is correct
    if (!utilisateur || !(await utilisateur.verifierMotDePasse(motdepasse))) {
      // If user not found or password incorrect, return a 401 status
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // If login is successful, return user info and a token
    res.json({
      _id: utilisateur._id,
      nom: utilisateur.nom,
      email: utilisateur.email, // Include email in the response (will be as stored)
      token: genererToken(utilisateur._id),
    });
  } catch (error) {
    // Catch any errors during the process
    console.error('Error during connexion:', error); // Log the error server-side
    res.status(500).json({ message: 'Erreur serveur lors de la connexion' }); // Return a generic server error
  }
};