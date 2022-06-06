import { Users } from '../models/user.model';

export const insertUser = (user: {
    email: any;
    password: string;
    name: any;
    jwt: string;
    image: string;
    age: number;
    gender: number;
    address: string;
    level: number;
}) => {
    return Users.create(user);
};

export const updatePasswordUser = (jwt: string, password: string) => {
    return Users.update({ password }, { where: { jwt } });
};

export const findOneByEmailUser = (email: string) => {
    return Users.findOne({ where: { email } });
};

export const findOneByJwtUser = (jwt: string) => {
    return Users.findOne({ where: { jwt } });
};

export const findOneByEmailAndPasswordUser = (
    email: string,
    password: string
) => {
    return Users.findOne({ where: { email, password } });
};
