import { Router } from "express";
import { createUser, loginUser, getCurrentUser, logOutUser } from "../controllers/user.controllers.js";
import { body } from "express-validator";
import {authToken} from "../middleware/auth.js";

const router = Router();

router.post('/register',
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    createUser);

router.post('/login',
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
    loginUser
)

router.get('/login',authToken,getCurrentUser);
router.get('/logout',authToken,logOutUser);


export default router;