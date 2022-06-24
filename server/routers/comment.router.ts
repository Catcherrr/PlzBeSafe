import { Router } from 'express';
import * as commentController from '../controllers/comment.controller';

const commentRouter = Router();

commentRouter.get('/one/:id', commentController.findOneComment);
commentRouter.get('/all/:postId', commentController.findAllByPostId);
commentRouter.post('/create/:postId', commentController.insertComment);
commentRouter.post('/modify/:id', commentController.updateComment);
commentRouter.delete('/delete/:id', commentController.deleteOneComment);

export { commentRouter };
