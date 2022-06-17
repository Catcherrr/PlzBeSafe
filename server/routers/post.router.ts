import { Router } from 'express';
import * as postController from '../controllers/post.controller';

const postRouter = Router();

postRouter.get('/one/:id', postController.findOnePost);
postRouter.get('/all/:page', postController.findAllByPagePost);
postRouter.post('/create', postController.insertPost);
postRouter.post('/modify/:id', postController.updatePost);
postRouter.delete('/delete/:id', postController.deleteOnePost);

export { postRouter };
