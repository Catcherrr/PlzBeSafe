import { Router } from 'express';
import * as recommentReactionController from '../controllers/recomment.reaction.controller';

const recommentReactionRouter = Router();

recommentReactionRouter.get('/all/:recommentId', recommentReactionController.findAllByRecommentId);
recommentReactionRouter.post('/create/:recommentId', recommentReactionController.insertReaction);
recommentReactionRouter.delete('/delete/:id', recommentReactionController.deleteOneReaction);

export { recommentReactionRouter };
