import { Router } from 'express';
import * as commentReactionController from '../controllers/comment.reaction.controller';

const commentReactionRouter = Router();

commentReactionRouter.get('/all/:commentId', commentReactionController.findAllByCommentId);
commentReactionRouter.post('/create/:commentId', commentReactionController.insertReaction);
commentReactionRouter.delete('/delete/:id', commentReactionController.deleteOneReaction);

export { commentReactionRouter };
