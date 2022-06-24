import { CommentReactions } from '../../models/comment.reaction.model';

console.log('======Create Comment Reaction Table======');

const create_table_comment_reactions = async () => {
    await CommentReactions.sync({ force: true })
        .then(() => {
            console.log('✅Success Create Comment Reaction Table');
        })
        .catch((err) => {
            console.log('❗️Error in Create Comment Reaction Table : ', err);
        });
};

create_table_comment_reactions();
