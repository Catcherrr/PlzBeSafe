import { CommentReactions } from '../models/comment.reaction.model';

export const insertReaction = async (reaction: {
    userId: number;
    commentId: number;
}) => {
    return CommentReactions.create({id: 0, ...reaction, type: ""})
};

export const findAllByCommentIdReactions = (commentId: number) => {
    return CommentReactions.findAndCountAll({
        where: { commentId },
    });
};

export const findOneReactions = (userId: number, commentId: number) =>{
    return CommentReactions.findOne({
        where: {commentId, userId}
    })
}

export const deleteReactions = (id: number) => {
    return CommentReactions.destroy({
        where: { id },
    });
};
