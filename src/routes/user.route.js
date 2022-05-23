import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
//import { newUserValidator } from '../validators/user.validator';
//import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

// //route to create a new user
router.post('', newUserValidator, userController.newUser);

export default router;
