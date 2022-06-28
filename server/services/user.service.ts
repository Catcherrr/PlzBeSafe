import { Users } from '../models/user.model';

export const insertUser = (user: {
    email: any;
    password: string;
    name: any;
    jwt: string;
    image: string;
    age: number;
    gender: number;
    address1: string;
    address2: string;
    level: number;
}) => {
    return Users.create({ id: 0, ...user });
};

export const updateInfoUser = (
    jwt: string,
    name: string,
    age: number,
    gender: number,
    address1: string,
    address2: string
) => {
    return Users.update(
        { name, age, gender, address1, address2 },
        { where: { jwt } }
    ).then(() => Users.findOne({where: {jwt}}));
};

export const updateImageUser = (jwt: string, url: string) => {
    return Users.update({ image: url }, { where: { jwt } });
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

export const deleteUser = async (jwt: string) => {
    return Users.findOne({ where: { jwt } }).then((data: any) =>
        Users.destroy({ where: { id: data.id } })
    );
};
