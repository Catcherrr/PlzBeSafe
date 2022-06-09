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

const oauth2Client = new google.auth.OAuth2(
    EMAIL_CLIENT_ID,
    EMAIL_CLIENT_SECRET,
    EMAIL_OAUTH_REDIRECT_URL
);

const GMAIL_SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send',
];

const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: GMAIL_SCOPES,
});

console.info(`authUrl: ${url}`);
