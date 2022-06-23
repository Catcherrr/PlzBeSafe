import { Router } from 'express';
import * as postReactionController from '../controllers/post.reaction.controller';

const postReactionRouter = Router();

postReactionRouter.get('/all/:postId', postReactionController.findAllByPostId);
postReactionRouter.post('/create/:postId', postReactionController.insertReaction);
postReactionRouter.delete('/delete/:id', postReactionController.deleteOneReaction);

export { postReactionRouter };
