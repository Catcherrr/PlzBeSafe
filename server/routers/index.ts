import { Router } from 'express';
import { userRouter } from './user.router';
import { verifyRouter } from './verify.router';
import { postRouter } from './post.router';
import { commentRouter } from './comment.router';
import { recommentRouter } from './recomment.router';
import { postReactionRouter } from './post.reaction.router';
import { commentReactionRouter } from './comment.reaction.router';
import { recommentReactionRouter } from './recomment.reaction.router';

const router = Router();

/* ROUTE */
router.use('/api/user', userRouter);
router.use('/api/verify', verifyRouter);
router.use('/api/post', postRouter);
router.use('/api/comment', commentRouter);
router.use('/api/recomment', recommentRouter);
router.use('/api/post/reaction', postReactionRouter);
router.use('/api/comment/reaction', commentReactionRouter);
router.use('/api/recomment/reaction', recommentReactionRouter);

export default router;
