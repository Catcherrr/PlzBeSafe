import { Comments } from '../models/comment.model';
import { CommentReactions } from '../models/comment.reaction.model';
import { Posts } from '../models/post.model';
import { PostReactions } from '../models/post.reaction.model';
import { Users } from '../models/user.model';

export const insertPost = async (post: {
    userId: number;
    title: string;
    content: string;
    latitude: number;
    longitude: number;
    incident_date: Date | null;
}) => {
    return Posts.create({ id: 0, ...post });
};

export const updatePost = async (
    id: number,
    post: {
        title: string;
        content: string;
        latitude: number;
        longitude: number;
        incident_date: Date | null;
    }
) => {
    return Posts.update(post, { where: { id } });
};

export const findAllByPagePosts = (page: number) => {
    const limit = 10;
    let offset = page > 1 ? (page - 1) * limit : 0;
    return Posts.findAll({
        offset,
        limit,
        order: [['createdAt', 'DESC']],
    });
};

export const findOneByIdPosts = (id: number) => {
    return Posts.findOne({ 
        include:[{model: Users, as: 'user', attributes: ['name']}, 
            {model: Comments, as: 'comments', 
                attributes: ['content', 'updatedAt'],
                include: [{model: CommentReactions, as:'commentReactions', attributes: ['type', 'createdAt']}, {model: Users, as: 'user', attributes: ['name']}]
            },
            {model: PostReactions, as: 'postReactions', attributes: ['type', 'createdAt']}
        ],
        where: {id}});
};

export const deletePosts = (id: number) => {
    return Posts.destroy({ where: { id } });
};
