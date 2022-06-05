import { Router } from 'express';
import { userRouter } from './user.router';

const router = Router();

/* ROUTE */
router.use('/api/user', userRouter);
export default router;
