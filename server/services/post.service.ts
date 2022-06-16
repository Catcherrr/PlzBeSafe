import { Posts } from '../models/post.model';
import { findOneByJwtUser } from './user.service';

export const insertPost = async (
    post: {
        title: string;
        content: string;
        latitude: number;
        longitude: number;
        incident_date: Date | null;
    },
    jwt: string
) => {
    return findOneByJwtUser(jwt).then((data: any) => {
        if (data) {
            const value = {
                id: 0,
                userId: data.id,
                ...post,
            };

            return Posts.create(value);
        }
    });
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
    let offset = 0 + (page - 1) * limit;
    return Posts.findAll({
        offset,
        limit,
        order: [['data', 'ASC']],
    });
};

export const findOneByIdPosts = (id: number) => {
    return Posts.findOne({ where: { id } });
};

export const deletePosts = (id: number) => {
    return Posts.destroy({ where: { id } });
};
