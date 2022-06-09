import { Request, Response } from 'express';
import {
    insertUser as register,
    findOneByEmailUser as checkEmail,
    findOneByJwtUser as findMine,
    findOneByEmailAndPasswordUser as signin,
    updatePasswordUser as updatePassword,
    updateInfoUser as updateInfo,
    updateImageUser as updateImage,
    deleteUser,
} from '../services/user.service';
import { statusCode } from '../util/responseForm';
import { serviceReturnForm, statusTrans } from '../modules/controller.modules';
import * as dotenv from 'dotenv';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

dotenv.config();
const TOKEN_KEY = process.env.TOKEN_KEY || '';
let serviceReturnForm = {};

// 가입
export const insertUser = async (req: Request, res: Response) => {
    const { email, password, name, image, age, gender, address } = req.body;
    const [address1, address2] = address.split(' ');

    if (!email) {
        serviceReturnForm = {
            status: statusCode.client_error.noEmail,
            message: '이메일을 입력해주세요',
        };
        res.status(statusTrans(statusCode.client_error.noEmail)).json(
            serviceReturnForm
        );
        return;
    }

    if (!password) {
        serviceReturnForm = {
            status: statusCode.client_error.noPassword,
            message: '비밀번호를 입력해주세요',
        };
        res.status(statusTrans(statusCode.client_error.noPassword)).json(
            serviceReturnForm
        );
        return;
    }

    if (!name) {
        serviceReturnForm = {
            status: statusCode.client_error.noName,
            message: '이름을 입력해주세요',
        };
        res.status(statusTrans(statusCode.client_error.noName)).json(
            serviceReturnForm
        );
        return;
    }

    return checkEmail(email)
        .then((value: any) => {
            if (value) {
                serviceReturnForm = {
                    status: statusCode.client_error.conflictEmail,
                    message: '이미 사용중인 이메일입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.conflictEmail)
                ).json(serviceReturnForm);
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
                    address1: address1,
                    address2: address2,
                    level: 0,
                };

                register(user)
                    .then((data: any) => {
                        serviceReturnForm = {
                            status: statusCode.ok.defaultValue,
                            message: '회원가입 성공',
                            jwt: data.jwt,
                        };
                        res.status(
                            statusTrans(statusCode.ok.defaultValue)
                        ).json(serviceReturnForm);
                        return;
                    })
                    .catch((err: any) => {
                        console.log(
                            '[user/insertUser/checkMail/register] ' + err
                        );
                        serviceReturnForm = {
                            status: statusCode.server_error.dbInsertError,
                            message: '회원가입 실패',
                        };
                        res.status(
                            statusTrans(statusCode.server_error.dbInsertError)
                        ).json(serviceReturnForm);
                        return;
                    });
            }
        })
        .catch((err: any) => {
            console.log('[user/insertUser/checkMail] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.defaultValue,
                message: '서버 오류',
            };
            res.status(statusTrans(statusCode.server_error.defaultValue)).json(
                serviceReturnForm
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

    return checkEmail(email)
        .then((data: any) => {
            if (data) {
                signin(email, transPw)
                    .then((data: any) => {
                        if (data) {
                            serviceReturnForm = {
                                status: statusCode.ok.defaultValue,
                                message: '로그인 성공',
                                result: { jwt: data.jwt },
                            };
                            res.status(
                                statusTrans(statusCode.ok.defaultValue)
                            ).json(serviceReturnForm);
                        } else {
                            serviceReturnForm = {
                                status: statusCode.client_error.wrongPassword,
                                message: '비밀번호를 확인해주세요',
                            };
                            res.status(
                                statusTrans(
                                    statusCode.client_error.wrongPassword
                                )
                            ).json(serviceReturnForm);
                        }
                        return;
                    })
                    .catch((err: any) => {
                        console.log('[user/login/signin] ' + err);
                        serviceReturnForm = {
                            status: statusCode.server_error.defaultValue,
                            message: '로그인 실패',
                        };
                        res.status(
                            statusTrans(statusCode.server_error.defaultValue)
                        ).json(serviceReturnForm);
                        return;
                    });
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.wrongEmail,
                    message: '이메일을 확인해주세요',
                };
                res.status(
                    statusTrans(statusCode.client_error.wrongPassword)
                ).json(serviceReturnForm);
                return;
            }
        })
        .catch((err: any) => {
            serviceReturnForm = {
                status: statusCode.server_error.dbSelectError,
                message: '이메일이 정확한지 확인해주세요',
            };
            res.status(statusTrans(statusCode.server_error.dbSelectError)).json(
                serviceReturnForm
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
                const { password, jwt, id, email, level, ...info } =
                    data.dataValues;
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '내 정보 조회 성공',
                    result: { info },
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.unauthorized,
                    message: '유효하지 않은 토큰입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.unauthorized)
                ).json(serviceReturnForm);
                return;
            }
        })
        .catch((err: any) => {
            console.log('[user/findMyInfo/findMine] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.defaultValue,
                message: '내 정보 조회 실패',
            };
            res.status(statusTrans(statusCode.server_error.defaultValue)).json(
                serviceReturnForm
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
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '비밀번호 재설정 성공',
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.unauthorized,
                    message: '유효하지 않은 토큰입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.unauthorized)
                ).json(serviceReturnForm);
            }
            return;
        })
        .catch((err: any) => {
            console.log('[user/resetPassword/updatePassword] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbUpdateError,
                message: '비밀번호 재설정 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbUpdateError)).json(
                serviceReturnForm
            );
            return;
        });
};

// 내 정보 수정
export const modifyInfo = async (req: Request, res: Response) => {
    const { jwt, name, age, gender, address } = req.body;
    const [address1, address2] = address.split(' ');

    return updateInfo(jwt, name, age, gender, address1, address2)
        .then((data: any) => {
            if (data) {
                const { password, jwt, id, email, level, ...info } =
                    data.dataValues;
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '정보 변경 성공',
                    result: { info },
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.unauthorized,
                    message: '유효하지 않은 토큰입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.unauthorized)
                ).json(serviceReturnForm);
            }
        })
        .catch((err: any) => {
            console.log('[user/modifyInfo/updateInfo] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbUpdateError,
                message: '정보 변경 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbUpdateError)).json(
                serviceReturnForm
            );
            return;
        });
};
// 이미지 수정
export const modifyImage = async (req: Request, res: Response) => {
    const { jwt, url } = req.body;

    return updateImage(jwt, url)
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '이미지 변경 성공',
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.unauthorized,
                    message: '유효하지 않은 토큰입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.unauthorized)
                ).json(serviceReturnForm);
            }
        })
        .catch((err: any) => {
            console.log('[user/modifyImage/updateImage] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbUpdateError,
                message: '이미지 변경 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbUpdateError)).json(
                serviceReturnForm
            );
            return;
        });
};
// 회원 탈퇴
export const resign = async (req: Request, res: Response) => {
    const jwt = req.body;

    return deleteUser(jwt)
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '회원 탈퇴 성공',
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.unauthorized,
                    message: '유효하지 않은 토큰입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.unauthorized)
                ).json(serviceReturnForm);
            }
        })
        .catch((err: any) => {
            console.log('[user/resign/deleteUser] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbUpdateError,
                message: '회원 탈퇴 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbUpdateError)).json(
                serviceReturnForm
            );
            return;
        });
};
