import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/register', userController.insertUser);
userRouter.post('/login', userController.login);

export { userRouter };
