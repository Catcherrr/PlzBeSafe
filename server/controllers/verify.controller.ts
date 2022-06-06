import { Request, Response } from 'express';
import { sendMail } from '../modules/sendMail';
import {
    insertVerify as createVerify,
    updateVerify as modifyVerify,
    findByCodeVerify,
} from '../services/verify.service';
import { controllersReturnForm, statusCode } from '../util/responseForm';
import randomString from '../util/randomString';

const rds = randomString();
let controllersReturnForm = {};

export const requestVerify = async (req: Request, res: Response) => {
    const { email } = req.body;
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

    createVerify(email).then(() => {
        modifyVerify(email, rds, 'req').then(() => {
            sendMail({
                to: email,
                subject: '[Plz Be Safe] 이메일 인증 요청',
                html: `<p>이 <a href="http://localhost:1234/api/verify/check/${rds}">링크</a>를 클릭하시면 인증이 완료됩니다 !</p>`,
            })
                .then(() => {
                    controllersReturnForm = {
                        status: statusCode.ok.defaultValue,
                        message: '이메일 전송 성공',
                    };
                    res.status(statusCode.ok.defaultValue / 10).json(
                        controllersReturnForm
                    );
                })
                .catch((err: any) => {
                    console.log('[verify/requestVerify/sendMail] ' + err);
                    controllersReturnForm = {
                        status: statusCode.server_error.defaultValue,
                    };
                    res.status(statusCode.server_error.defaultValue / 10).json(
                        controllersReturnForm
                    );
                    return;
                });
        });
    });
};

export const completeVerify = async (req: Request, res: Response) => {
    const num = req.params.num;
    if (!num) {
        res.status(400).json({
            code: 4001,
            message: '코드가 유효하지 않습니다 !',
        });
    }

    findByCodeVerify(num)
        .then((value: any) => {
            modifyVerify(value.email, '', 'ok')
                .then(() => {
                    controllersReturnForm = {
                        status: statusCode.ok.defaultValue,
                        message: '이메일 인증 성공',
                    };
                    res.status(statusCode.ok.defaultValue / 10).json(
                        controllersReturnForm
                    );
                })
                .catch((err: any) => {
                    console.log('[verify/completeVerify/modifyVerify] ' + err);
                    controllersReturnForm = {
                        status: statusCode.server_error.defaultValue,
                    };
                    res.status(statusCode.server_error.defaultValue / 10).json(
                        controllersReturnForm
                    );
                    return;
                });
        })
        .catch((err) => {
            console.log('[verify/completeVerify/findByCodeVerify] ' + err);

            controllersReturnForm = {
                status: statusCode.client_error.noVerifyCode,
                message: '존재하지 않는 코드입니다',
            };
            res.status(statusCode.client_error.noVerifyCode / 10).json(
                controllersReturnForm
            );
        });
};
