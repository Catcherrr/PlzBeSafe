import { Router } from 'express';
import { userRouter } from './user.router';
import { verifyRouter } from './verify.router';

const router = Router();

/* ROUTE */
router.use('/api/user', userRouter);
router.use('/api/verify', verifyRouter);
export default router;
