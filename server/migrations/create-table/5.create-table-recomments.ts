import { Recomments } from '../../models/recomment.model';

console.log('======Create Recomment Table======');

const create_table_recomments = async () => {
    await Recomments.sync({ force: true })
        .then(() => {
            console.log('✅Success Create Recomment Table');
        })
        .catch((err) => {
            console.log('❗️Error in Create Recomment Table : ', err);
        });
};

create_table_recomments();
