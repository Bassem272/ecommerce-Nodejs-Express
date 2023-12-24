import express from 'express';

import auth from  '../middlewares/authenticate.js'
import validate from '../middlewares/validate.js'
import permission from '../middlewares/permission';

import userController from '../controllers/userController.js';


const router = express.Router();

router.post('/register', [validate.registerSchema], userController.register);

router.post('/verify-email',[validate.verifyEmailSchema], userController.verifyEmail);
router.post('/forgot-password', [validate.forgotPasswordSchema], userController.forgotPassword);
router.post('/reset-password', [validate.resetPasswordSchema], userController.resetPassword);
router.post('/login', [validate.loginSchema], userController.logIn);



export default router;