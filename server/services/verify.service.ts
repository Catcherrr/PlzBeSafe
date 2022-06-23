import { Verifies } from '../models/verify.model';

export const insertVerify = async (email: string) => {
    return Verifies.create({ email: email, status: '', code: '' });
};

export const updateVerify = async (
    email: string,
    code: string,
    status: string
) => {
    return Verifies.update(
        { status: status, code: code },
        { where: { email } }
    );
};

export const removeVerify = (email: string) => {
    return Verifies.destroy({ where: { email } });
};

export const findStatusByEmailVerify = async (email: string) => {
    return Verifies.findOne({ where: { email } })
};

export const findByCodeVerify = async (code: string) => {
    return Verifies.findOne({ where: { code } }).then((data: any) => {
        return data;
    });
};
