import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
(() => {
    const result = dotenv.config({ path: path.join(__dirname, '../', '.env') });
    if (result.parsed == undefined)
        throw new Error('Cannot loaded environment variables file.');
})();
const { EMAIL_CLIENT_ID, EMAIL_CLIENT_SECRET, EMAIL_OAUTH_REDIRECT_URL } =
    process.env;

const code =
    '4/0AX4XfWi2bUBPHtxEuv48BgEIUw9sdnne8aah_R6HkURoUfO9WxclnOrLbV3qgkWtLpFQxQ';

const oauth2Client = new google.auth.OAuth2(
    EMAIL_CLIENT_ID,
    EMAIL_CLIENT_SECRET,
    EMAIL_OAUTH_REDIRECT_URL
);

const GMAIL_SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.send',
];

const getToken = async () => {
    const { tokens } = await oauth2Client.getToken(code);
    console.info(tokens);
};

getToken();
