// src/middleware/auth.js
import jwt from 'jsonwebtoken';
import Utilisateur from '../models/Utilisateur.js';

// Middleware function to protect routes (authenticate user)
export const proteger = async (req, res, next) => {
  let token;

  // Check if the Authorization header is present and starts with 'Bearer'
  // Example: Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user associated with the token's ID
      // .select('-motdepasse') excludes the password field from the result
      req.utilisateur = await Utilisateur.findById(decoded.id).select('-motdepasse');

      // If user is found, proceed to the next middleware or route handler
      next();
    } catch (error) {
      // If token verification fails or user not found
      console.error('Error in auth middleware:', error.message); // Log the specific error
      res.status(401).json({ message: 'Non autorisé, token invalide' }); // Return 401 status
    }
  }

  // If no token is present in the header
  if (!token) {
    res.status(401).json({ message: 'Non autorisé, token manquant' }); // Return 401 status
  }
};
