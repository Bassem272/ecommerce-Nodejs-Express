// Import necessary modules and controllers
import express from 'express';
import auth from '../middlewares/authenticate.js';
import permission from '../middlewares/permission';
import userController from '../controllers/userController.js';

// Create an Express router
const router = express.Router();

// Get all products route
router.get('/products', [auth, permission.user], userController.getProducts);

// Get a specific product by ID route
router.get('/products/:id', [auth, permission.user], userController.getProduct);

// Search products route
router.get('/search', [auth, permission.user], userController.searchProducts);

// Export the router for use in the application
export default router;
