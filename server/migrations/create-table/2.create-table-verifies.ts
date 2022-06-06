import { Verifies } from '../../models/verify.model';

console.log('======Create Verify Table======');

const create_table_verifies = async () => {
    await Verifies.sync({ force: true })
        .then(() => {
            console.log('✅Success Create Verify Table');
        })
        .catch((err) => {
            console.log('❗️Error in Create Verify Table : ', err);
        });
};

create_table_verifies();
