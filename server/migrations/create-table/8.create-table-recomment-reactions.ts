import { RecommentReactions } from '../../models/recomment.reaction.model';

console.log('======Create Recomment Reaction Table======');

const create_table_recomment_reactions = async () => {
    await RecommentReactions.sync({ force: true })
        .then(() => {
            console.log('✅Success Create Recomment Reaction Table');
        })
        .catch((err) => {
            console.log('❗️Error in Create Recomment Reaction Table : ', err);
        });
};

create_table_recomment_reactions();
