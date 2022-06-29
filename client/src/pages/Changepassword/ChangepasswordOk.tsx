import React from 'react';
import { Typography, Button, Paper } from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';

const ChangepasswordOk = () => {
    //.styles.tsx적용
    const classes = useStyles();

    return (
        <Paper className={classes.ChagepasswordOkContainer}>
            <div>
                <Typography variant="h3" className={classes.oktitle}>
                    비밀번호 변경 완료
                </Typography>
            </div>
            <div>
                <Typography variant="subtitle1" className={classes.title}>
                    비밀번호가 변경되었습니다.
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

export default ChangepasswordOk;
