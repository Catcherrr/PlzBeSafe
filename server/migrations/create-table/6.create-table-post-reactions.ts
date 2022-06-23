import { PostReactions } from '../../models/post.reaction.model';

console.log('======Create Post Reaction Table======');

const create_table_post_reactions = async () => {
    await PostReactions.sync({ force: true })
        .then(() => {
            console.log('✅Success Create Post Reaction Table');
        })
        .catch((err) => {
            console.log('❗️Error in Create Post Reaction Table : ', err);
        });
};

create_table_post_reactions();
