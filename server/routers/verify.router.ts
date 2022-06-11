import { Router } from 'express';
import * as verifyController from '../controllers/verify.controller';

const verifyRouter = Router();

verifyRouter.post('/init', verifyController.requestVerify);
verifyRouter.get('/check/:num', verifyController.completeVerify);
verifyRouter.delete('/delete', verifyController.deleteVerify);

export { verifyRouter };