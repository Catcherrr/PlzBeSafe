import { Request, Response } from 'express';
import {
    insertUser as register,
    findOneByEmailUser as checkEmail,
    findOneByJwtUser as findMine,
    findOneByEmailAndPasswordUser as signin,
    updatePasswordUser as updatePassword,
} from '../services/user.service';
import { controllersReturnForm, statusCode } from '../util/responseForm';
import * as dotenv from 'dotenv';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

dotenv.config();
const TOKEN_KEY = process.env.TOKEN_KEY || '';
let controllersReturnForm = {};

// 가입
export const insertUser = async (req: Request, res: Response) => {
    const { email, password, name, image, age, gender, address } = req.body;

    if (!email) {
        controllersReturnForm = {
            status: statusCode.client_error.noEmail,
            message: '이메일을 입력해주세요',
        };
        res.status(statusCode.client_error.noEmail / 10).json(
            controllersReturnForm
        );
        return;
    }

    if (!password) {
        controllersReturnForm = {
            status: statusCode.client_error.noPassword,
            message: '비밀번호를 입력해주세요',
        };
        res.status(statusCode.client_error.noPassword / 10).json(
            controllersReturnForm
        );
        return;
    }

    if (!name) {
        controllersReturnForm = {
            status: statusCode.client_error.noName,
            message: '이름을 입력해주세요',
        };
        res.status(statusCode.client_error.noName / 10).json(
            controllersReturnForm
        );
        return;
    }

    checkEmail(email)
        .then((value: any) => {
            if (value) {
                controllersReturnForm = {
                    status: statusCode.client_error.conflictEmail,
                    message: '이미 사용중인 이메일입니다',
                };
                res.status(statusCode.client_error.conflictEmail / 10).json(
                    controllersReturnForm
                );
                return;
            } else {
                const transPw = crypto
                    .createHash('SHA512')
                    .update(password)
                    .digest('base64');
                const token = jwt.sign({ email }, TOKEN_KEY, {
                    expiresIn: '365d',
                    subject: 'email',
                });

                const user = {
                    email: email,
                    password: transPw,
                    name: name,
                    jwt: token,
                    image: image,
                    age: age,
                    gender: gender,
                    address: address,
                    level: 0,
                };

                register(user)
                    .then((data: any) => {
                        controllersReturnForm = {
                            status: statusCode.ok.defaultValue,
                            jwt: data.jwt,
                            message: '회원가입 성공',
                        };
                        res.status(statusCode.ok.defaultValue / 10).json(
                            controllersReturnForm
                        );
                        return;
                    })
                    .catch((err: any) => {
                        console.log(
                            '[user/insertUser/checkMail/register] ' + err
                        );
                        controllersReturnForm = {
                            status: statusCode.server_error.dbInsertError,
                            message: '회원을 등록하지 못했습니다',
                        };
                        res.status(
                            statusCode.server_error.dbInsertError / 10
                        ).json(controllersReturnForm);
                        return;
                    });
            }
        })
        .catch((err: any) => {
            console.log('[user/insertUser/checkMail] ' + err);
            controllersReturnForm = {
                status: statusCode.server_error.defaultValue,
            };
            res.status(statusCode.server_error.defaultValue / 10).json(
                controllersReturnForm
            );
            return;
        });
};

// 로그인
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const transPw = crypto
        .createHash('SHA512')
        .update(password)
        .digest('base64');

    signin(email, transPw)
        .then((data: any) => {
            if (data) {
                controllersReturnForm = {
                    status: statusCode.ok.defaultValue,
                    jwt: data.jwt,
                    message: '로그인 성공',
                };
                res.status(statusCode.ok.defaultValue / 10).json(
                    controllersReturnForm
                );
            } else {
                controllersReturnForm = {
                    status: statusCode.client_error.wrongEmailAndPassword,
                    message: '이메일 또는 비밀번호를 확인해주세요',
                };
                res.status(
                    statusCode.client_error.wrongEmailAndPassword / 10
                ).json(controllersReturnForm);
            }
            return;
        })
        .catch((err: any) => {
            console.log('[user/login/signin] ' + err);
            controllersReturnForm = {
                status: statusCode.server_error.defaultValue,
            };
            res.status(statusCode.server_error.defaultValue / 10).json(
                controllersReturnForm
            );
            return;
        });
};

// 내 정보 조회
export const findMyInfo = async (req: Request, res: Response) => {
    const { jwt } = req.body;
    return findMine(jwt)
        .then((data: any) => {
            if (data) {
                controllersReturnForm = {
                    status: statusCode.ok.defaultValue,
                    jwt: data.jwt,
                    message: '내 정보 조회 성공',
                };
                res.status(statusCode.ok.defaultValue / 10).json(
                    controllersReturnForm
                );
                return;
            } else {
                controllersReturnForm = {
                    status: statusCode.client_error.unauthorized,
                    message: '유효하지 않은 토큰입니다',
                };
                res.status(statusCode.client_error.unauthorized / 10).json(
                    controllersReturnForm
                );
                return;
            }
        })
        .catch((err: any) => {
            console.log('[user/findMyInfo/findMine] ' + err);
            controllersReturnForm = {
                status: statusCode.server_error.defaultValue,
            };
            res.status(statusCode.server_error.defaultValue / 10).json(
                controllersReturnForm
            );
            return;
        });
};

// 비밀번호 재설정
export const resetPassword = async (req: Request, res: Response) => {
    const { password, jwt } = req.body;

    const transPw = crypto
        .createHash('SHA512')
        .update(password)
        .digest('base64');

    return updatePassword(jwt, transPw)
        .then((data: any) => {
            if (data) {
                controllersReturnForm = {
                    status: statusCode.ok.defaultValue,
                    jwt: data.jwt,
                    message: '비밀번호 재설정 성공',
                };
                res.status(statusCode.ok.defaultValue / 10).json(
                    controllersReturnForm
                );
            } else {
                controllersReturnForm = {
                    status: statusCode.client_error.unauthorized,
                    message: '유효하지 않은 토큰입니다',
                };
                res.status(statusCode.client_error.unauthorized / 10).json(
                    controllersReturnForm
                );
            }
            return;
        })
        .catch((err: any) => {
            console.log('[user/resetPassword/updatePassword] ' + err);
            controllersReturnForm = {
                status: statusCode.server_error.defaultValue,
                err,
            };
            res.status(statusCode.server_error.defaultValue / 10).json(
                controllersReturnForm
            );
            return;
        });
};
