// Import necessary modules and controllers
import express from 'express';
import auth from '../middlewares/authenticate.js';
import validate from '../middlewares/validate.js';
import permission from '../middlewares/permission';
import adminController from '../controllers/adminController.js';

// Create an Express router
const router = express.Router();

// Admin add product route
router.post('/products', [auth, validate.productSchema, permission.admin], adminController.addProduct);

// Admin get all products route
router.get('/products', [auth, permission.admin], adminController.getProducts);

// Admin get all products (duplicate route, consider removing)
router.get('/products', [auth, permission.admin], adminController.geAllProducts);

// Admin get all users route
router.get('/users', [auth, permission.admin], adminController.geAllUsers);

// Admin get all orders route
router.get('/orders', [auth, permission.admin], adminController.geAllOrders);

// Admin get a specific order by ID route
router.get('/orders/:id', [auth, permission.admin], adminController.getOrder);

// Admin get a specific product by ID route
router.get('/products/:id', [auth, permission.admin], adminController.getProduct);

// Admin get a specific user by ID route
router.get('/users/:id', [auth, permission.admin], adminController.getUser);

// Admin get total number of products route
router.get('/total-products', [auth, permission.admin], adminController.totalProducts);

// Admin get total number of users route
router.get('/total-users', [auth, permission.admin], adminController.totalUsers);

// Admin get total number of orders route
router.get('/total-orders', [auth, permission.admin], adminController.totalOrders);

// Admin change user to admin route
router.post('/change-user-to-admin/:userId', [auth, permission.admin], adminController.changeUserToAdmin);

// Admin get orders within a date range route
router.get('/orders-in-range', [auth, permission.admin], adminController.getOrdersInRange);

// Export the router for use in the application
export default router;
