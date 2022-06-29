import React from 'react';
import { Typography, Button, Paper } from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';

const SignupOk = () => {
    //.styles.tsx적용
    const classes = useStyles();

    return (
        <Paper className={classes.SignupOkContainer}>
            <div>
                <Typography variant="h3" className={classes.oktitle}>
                    회원가입 완료
                </Typography>
            </div>
            <div>
                <Typography variant="subtitle1" className={classes.title}>
                    가입이 완료되었습니다.
                </Typography>
            </div>
            <div>
                <Link to="/">
                    <Button variant="contained" color="primary" type="submit">
                        확인
                    </Button>
                </Link>
            </div>
        </Paper>
    );
};

export default SignupOk;
