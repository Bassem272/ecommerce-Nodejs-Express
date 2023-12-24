// Import necessary modules and controllers
import express from 'express';
import auth from '../middlewares/authenticate.js';
import validate from '../middlewares/validate.js';
import permission from '../middlewares/permission';
import userController from '../controllers/userController.js';

// Create an Express router
const router = express.Router();

// User registration route
router.post('/register', [validate.registerSchema], userController.register);

// Email verification route
router.post('/verify-email', [validate.verifyEmailSchema], userController.verifyEmail);

// Password reset route
router.post('/reset-password', [validate.resetPasswordSchema], userController.resetPassword);

// User login route
router.post('/login', [validate.loginSchema], userController.logIn);

// Forgot password route
router.post('/forgot-password', [auth, permission.user, validate.forgotPasswordSchema], userController.resetPassword);

// User logout route
router.get('/logout', [auth, permission.user], userController.logOut);

// User profile route
router.get('/profile', [auth, permission.user], userController.getProfile);

// Update user address route
router.put('/update-address', [auth, permission.user, validate.updateAddressSchema], userController.updateAddress);

// User order placement route
router.post('/order', [auth, permission.user, validate.orderSchema], userController.newOrder);

// User order history route
router.get('/orders', [auth, permission.user], userController.getOrders);

// User cart retrieval route
router.get('/cart', [auth, permission.user], userController.getCart);

// User cart update route
router.post('/cart', [auth, permission.user, validate.productSchema], userController.addToCart);

// User cart item removal route
router.delete('/cart', auth, permission.user, userController.removeFromCart);

// Export the router for use in the application
export default router;
