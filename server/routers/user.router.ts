import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/register', userController.insertUser);
userRouter.post('/login', userController.login);
userRouter.post('/myinfo', userController.findMyInfo);
userRouter.patch('/changePassword', userController.resetPassword);
userRouter.put('/changeInfo', userController.modifyInfo);
userRouter.patch('/changeImage', userController.modifyImage);
userRouter.delete('/resign/:jwt', userController.resign);

export { userRouter };
