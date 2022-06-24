import { Comments } from '../models/comment.model';

export const insertComment = async (comment: {
    userId: number;
    postId: number;
    content: string;
}) => {
    return Comments.create({ id: 0, ...comment });
};

export const updateComment = async (
    id: number,
    comment: {
        content: string;
    }
) => {
    return Comments.update(comment, {
        where: { id },
    });
};

export const findAllByPostIdComments = (postId: number) => {
    return Comments.findAndCountAll({
        where: { postId },
    });
};

export const findOneByIdComments = (id: number) => {
    return Comments.findOne({
        where: { id },
    });
};

export const deleteComments = (id: number) => {
    return Comments.destroy({
        where: { id },
    });
};
