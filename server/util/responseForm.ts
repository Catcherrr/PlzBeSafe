export const statusCode = {
    ok: {
        defaultValue: 2000,
        created: 2010,
        accepted: 2020,
    },
    client_error: {
        defaultValue: 4000,
        unauthorized: 4010,
        noEmail: 4041,
        noPassword: 4042,
        noToken: 4043,
        noName: 4044,
        wrongEmail: 4045,
        wrongPassword: 4046,
        noVerifyCode: 4047,
        noDataBase: 4050,
        conflictEmail: 4091,
    },
    server_error: {
        defaultValue: 5000,
        waiting: 5030,
        internalError: 5060,
        dbInsertError: 5061,
        dbUpdateError: 5062,
        dbSelectError: 5063,
        smtpError: 5064,
    },
};
