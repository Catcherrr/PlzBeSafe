import { Posts } from '../../models/post.model';

console.log('======Create Post Table======');

const create_table_posts = async () => {
    await Posts.sync({ force: true })
        .then(() => {
            console.log('✅Success Create Post Table');
        })
        .catch((err) => {
            console.log('❗️Error in Create Post Table : ', err);
        });
};

create_table_posts();
