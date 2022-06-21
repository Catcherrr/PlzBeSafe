import { Router } from 'express';
import * as recommentController from '../controllers/recomment.controller';

const recommentRouter = Router();

recommentRouter.get('/one/:id', recommentController.findOneRecomment);
recommentRouter.get('/all/:commentId', recommentController.findAllByCommentId);
recommentRouter.post('/create/:commentId', recommentController.insertRecomment);
recommentRouter.post('/modify/:id', recommentController.updateRecomment);
recommentRouter.delete('/delete/:id', recommentController.deleteOneRecomment);

export { recommentRouter };
