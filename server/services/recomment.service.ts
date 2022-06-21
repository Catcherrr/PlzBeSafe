import { Recomments } from '../models/recomment.model';

export const insertRecomment = async (recomment: {
    userId: number;
    commentId: number;
    content: string;
}) => {
    return Recomments.create({ id: 0, ...recomment });
};

export const updateRecomment = async (
    id: number,
    recomment: {
        content: string;
    }
) => {
    return Recomments.update(recomment, {
        where: { id },
    });
};

export const findAllByCommentIdRecomments = (commentId: number) => {
    return Recomments.findAndCountAll({
        where: { commentId },
    });
};

export const findOneByIdRecomments = (id: number) => {
    return Recomments.findOne({
        where: { id },
    });
};

export const deleteRecomments = (id: number) => {
    return Recomments.destroy({
        where: { id },
    });
};
