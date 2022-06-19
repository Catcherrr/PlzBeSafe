import { Comments } from '../../models/comment.model';

console.log('======Create Comment Table======');

const create_table_comments = async () => {
    await Comments.sync({ force: true })
        .then(() => {
            console.log('✅Success Create Comment Table');
        })
        .catch((err) => {
            console.log('❗️Error in Create Comment Table : ', err);
        });
};

create_table_comments();
