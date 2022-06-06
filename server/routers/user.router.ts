import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/register', userController.insertUser);
userRouter.post('/login', userController.login);
userRouter.post('/myinfo', userController.findMyInfo);
userRouter.post('/changePassword', userController.resetPassword);

export { userRouter };
