const nodemailer = require('nodemailer');
import dotenv from 'dotenv';
dotenv.config();

const {
    EMAIL_ID,
    EMAIL_PASSWORD,
    EMAIL_CLIENT_ID,
    EMAIL_CLIENT_SECRET,
    EMAIL_ACCESS_TOKEN,
    EMAIL_OAUTH_TOKEN_EXPIRE,
    EMAIL_REFRESH_TOKEN,
} = process.env;
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: EMAIL_ID,
        pass: EMAIL_PASSWORD,
        clientId: EMAIL_CLIENT_ID,
        clientSecret: EMAIL_CLIENT_SECRET,
        refreshToken: EMAIL_REFRESH_TOKEN,
        accessToken: EMAIL_ACCESS_TOKEN,
        expires: Number.parseInt(EMAIL_OAUTH_TOKEN_EXPIRE || '', 10),
    },
});

export const sendMail = (mailOptions: {
    to: string;
    subject: string;
    html: string;
}) =>
    new Promise((resolve: any, reject: any) => {
        transporter.sendMail(mailOptions, (err: any) => {
            if (err) {
                console.error(
                    `메일 보내기 실패 ! - [${err.name}] ${err.message}`
                );

                return reject(err);
            }
            resolve();
        });
    });
