import { Response } from 'express';
import { Users } from '../models/user.model';

export const insertUser = (user: {
    email: any;
    password: string;
    name: any;
    jwt: string;
    level: number;
}) => {
    return Users.create(user);
};

export const findOneUser = (email: string, password: string) => {
    return Users.findOne({ where: { email, password } });
};
