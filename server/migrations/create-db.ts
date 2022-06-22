import { QueryInterface, Sequelize, Options } from 'sequelize';
import { config } from '../config/config';
import dotenv from 'dotenv';
dotenv.config();
class options implements Options {
    dialect!: 'mysql';
    username!: string;
    password!: string;
}

const createDBOptions = new options();
const { username, password, database } = config.development;
createDBOptions.username = username;
createDBOptions.password = password;
createDBOptions.dialect = 'mysql';

let db_name = database;

const dbCreateSequelize = new Sequelize(createDBOptions);

console.log(`======Create DataBase : ${db_name}======`);

dbCreateSequelize
    .getQueryInterface()
    .createDatabase(db_name)
    .then(() => {
        console.log('✅db create success!');
    })
    .catch((e) => {
        console.log('❗️error in create db : ', e);
    });
