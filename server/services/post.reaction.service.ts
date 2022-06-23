import { PostReactions } from '../models/post.reaction.model';

export const insertPostReaction = async (reaction: {
    userId: number;
    postId: number;
}) => {
    return PostReactions.create({id: 0, ...reaction, type: ""})
};

export const findAllByPostIdReactions = (postId: number) => {
    return PostReactions.findAndCountAll({
        where: { postId },
    });
};

export const findOneReactions = (userId: number, postId: number) =>{
    return PostReactions.findOne({
        where: {postId, userId}
    })
}

export const deletePostReactions = (id: number) => {
    return PostReactions.destroy({
        where: { id },
    });
};
