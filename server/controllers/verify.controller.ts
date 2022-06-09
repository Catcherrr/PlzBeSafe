import { Request, Response } from 'express';
import { sendMail } from '../modules/sendMail';
import {
    insertVerify as createVerify,
    updateVerify as modifyVerify,
    findByCodeVerify,
    removeVerify,
} from '../services/verify.service';
import { statusCode } from '../util/responseForm';
import { serviceReturnForm, statusTrans } from '../modules/controller.modules';
import randomString from '../util/randomString';

const rds = randomString();
let serviceReturnForm = {};

export const requestVerify = async (req: Request, res: Response) => {
    const { email } = req.body;
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

    createVerify(email)
        .then(() => {
            modifyVerify(email, rds, 'req')
                .then(() => {
                    sendMail({
                        to: email,
                        subject: '[Plz Be Safe] 이메일 인증 요청',
                        html: `<p>이 <a href="http://localhost:1234/api/verify/check/${rds}">링크</a>를 클릭하시면 인증이 완료됩니다 !</p>`,
                    })
                        .then(() => {
                            serviceReturnForm = {
                                status: statusCode.ok.defaultValue,
                                message: '이메일 전송 성공',
                            };
                            res.status(
                                statusTrans(statusCode.ok.defaultValue)
                            ).json(serviceReturnForm);
                        })
                        .catch((err: any) => {
                            console.log(
                                '[verify/requestVerify/sendMail] ' + err
                            );
                            serviceReturnForm = {
                                status: statusCode.server_error.smtpError,
                                message: '이메일 전송에 실패했습니다',
                            };
                            res.status(
                                statusTrans(statusCode.server_error.smtpError)
                            ).json(serviceReturnForm);
                            return;
                        });
                })
                .catch((err: any) => {
                    console.log('[verify/requestVerify] ' + err);
                    serviceReturnForm = {
                        status: statusCode.server_error.dbUpdateError,
                        message: '데이터를 수정하지 못했습니다',
                    };
                    res.status(
                        statusTrans(statusCode.server_error.dbUpdateError)
                    ).json(serviceReturnForm);
                    return;
                });
        })
        .catch((err: any) => {
            console.log('[verify/requestVerify] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbInsertError,
                message: '데이터를 삽입하지 못했습니다',
            };
            res.status(statusTrans(statusCode.server_error.dbInsertError)).json(
                serviceReturnForm
            );
            return;
        });
};

export const completeVerify = async (req: Request, res: Response) => {
    const num = req.params.num;
    if (!num) {
        serviceReturnForm = {
            status: statusCode.client_error.noVerifyCode,
            message: '유효하지 않은 인증 코드입니다',
        };
        res.status(statusTrans(statusCode.client_error.noVerifyCode)).json(
            serviceReturnForm
        );
    }

    findByCodeVerify(num)
        .then((value: any) => {
            modifyVerify(value.email, '', 'ok')
                .then(() => {
                    serviceReturnForm = {
                        status: statusCode.ok.defaultValue,
                        message: '이메일 인증 성공',
                    };
                    res.status(statusTrans(statusCode.ok.defaultValue)).json(
                        serviceReturnForm
                    );
                })
                .catch((err: any) => {
                    console.log('[verify/completeVerify/modifyVerify] ' + err);
                    serviceReturnForm = {
                        status: statusCode.server_error.dbUpdateError,
                        message: '데이터를 수정하지 못했습니다',
                    };
                    res.status(
                        statusTrans(statusCode.server_error.dbUpdateError)
                    ).json(serviceReturnForm);
                    return;
                });
        })
        .catch((err) => {
            console.log('[verify/completeVerify/findByCodeVerify] ' + err);

            serviceReturnForm = {
                status: statusCode.client_error.noVerifyCode,
                message: '유효하지 않은 인증 코드입니다',
            };
            res.status(statusTrans(statusCode.client_error.noVerifyCode)).json(
                serviceReturnForm
            );
        });
};

export const deleteVerify = async (req: Request, res: Response) => {
    const email = req.body;

    if (!email) {
        serviceReturnForm = {
            status: statusCode.client_error.noEmail,
            message: '이메일을 전달해주세요',
        };
        res.status(statusTrans(statusCode.client_error.noEmail)).json(
            serviceReturnForm
        );
    }

    return removeVerify(email)
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '인증 데이터 삭제 성공',
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.wrongEmail,
                    message: '존재하지 않는 이메일입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.wrongEmail)
                ).json(serviceReturnForm);
            }
        })
        .catch((err) => {
            console.log('[verify/completeVerify/findByCodeVerify] ' + err);

            serviceReturnForm = {
                status: statusCode.client_error.noVerifyCode,
                message: '유효하지 않은 인증 코드입니다',
            };
            res.status(statusTrans(statusCode.client_error.noVerifyCode)).json(
                serviceReturnForm
            );
        });
};
