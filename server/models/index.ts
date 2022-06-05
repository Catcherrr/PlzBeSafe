import { Sequelize } from 'sequelize-typescript';
import { config } from '../config/config';

const { database, username, password, host } = config.development;

export const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
});
