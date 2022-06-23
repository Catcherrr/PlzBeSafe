import { RecommentReactions } from '../models/recomment.reaction.model';

export const insertReaction = async (reaction: {
    userId: number;
    recommentId: number;
}) => {
    return RecommentReactions.create({id: 0, ...reaction, type: ""})
};

export const findAllByRecommentIdReactions = (recommentId: number) => {
    return RecommentReactions.findAndCountAll({
        where: { recommentId },
    });
};

export const findOneReactions = (userId: number, recommentId: number) =>{
    return RecommentReactions.findOne({
        where: {recommentId, userId}
    })
}

export const deleteReactions = (id: number) => {
    return RecommentReactions.destroy({
        where: { id },
    });
};
