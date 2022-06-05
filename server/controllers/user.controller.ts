import { Request, Response } from 'express';
import {
    insertUser as register,
    findOneUser as signin,
} from '../services/user.service';
import * as dotenv from 'dotenv';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

dotenv.config();
const TOKEN_KEY = process.env.TOKEN_KEY || '';

export const insertUser = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    if (!email) {
        res.status(400).json({
            code: 4001,
            message: '이메일이 입력되지 않았습니다 !',
        });
        return;
    }

    if (!password) {
        res.status(400).json({
            code: 4001,
            message: '비밀번호가 입력되지 않았습니다 !',
        });
        return;
    }

    if (!name) {
        res.status(400).json({
            code: 4001,
            message: '이름이 입력되지 않았습니다 !',
        });
        return;
    }

    const transPw = crypto
        .createHash('SHA512')
        .update(password)
        .digest('base64');
    const token = jwt.sign({ email }, TOKEN_KEY, {
        expiresIn: '24h',
        subject: 'email',
    });

    const user = {
        email: email,
        password: transPw,
        name: name,
        jwt: token,
        level: 1,
    };

    register(user)
        .then((data: object) => data)
        .catch((err: any) => {
            return {
                status: 500,
                code: 5001,
                message: err.message || 'DB에서 유저를 생성하는 데 오류 발생 !',
            };
        });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const transPw = crypto
        .createHash('SHA512')
        .update(password)
        .digest('base64');

    signin(email, transPw)
        .then((data: any) => {
            if (data) res.json(data);
            else
                res.status(400).json({
                    code: 4001,
                    message: '이메일 또는 비밀번호를 확인해주세요 !',
                });
        })
        .catch((err: any) => {
            res.status(500).json({
                code: 5001,
                message: err.message || '이메일로 유저 찾는 데 오류 발생 !',
            });
        });
};

module.exports = {
    insertUser,
    login,
};
