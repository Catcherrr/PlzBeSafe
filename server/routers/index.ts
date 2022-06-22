import { Router } from 'express';
import { userRouter } from './user.router';
import { verifyRouter } from './verify.router';
import { postRouter } from './post.router';

const router = Router();

/* ROUTE */
router.use('/api/user', userRouter);
router.use('/api/verify', verifyRouter);
router.use('/api/post', postRouter);
export default router;
