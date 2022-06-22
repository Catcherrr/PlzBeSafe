import React from 'react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    Input,
    Typography,
    Button,
    TextField,
    FormControl,
    FormHelperText,
    Paper,
    Container,
} from '@material-ui/core';
import useStyles from './styles';

const Mypage = () => {
    const classes = useStyles();

    return (
        <div className={classes.SignupContainer}>
            <Paper className={classes.LeftContainer}>
                <div>
                    <React.Fragment>
                        <img src={'../../logo192.png'}></img>
                    </React.Fragment>
                </div>
                <div className={classes.ModifyregisterInput}>
                    <p className={classes.InputTitle}>닉네임</p>
                    <TextField
                        id="standard-read-only-input"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div className={classes.ModifyregisterInput}>
                    <p className={classes.InputTitle}>아이디</p>
                    <TextField
                        id="standard-read-only-input"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div className={classes.ModifyregisterInput}>
                    <p className={classes.InputTitle}>나이</p>
                    <TextField
                        id="standard-read-only-input"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </div>
                <div className={classes.ModifyregisterButton}>
                    <Button variant="contained" color="primary">
                        비밀번호 변경
                    </Button>
                </div>
                <div className={classes.ModifyregisterButton}>
                    <Link to="/modifyregister">
                        <Button variant="contained" color="primary">
                            회원 수정
                        </Button>
                    </Link>
                </div>
            </Paper>
            <Paper className={classes.RightContainer}></Paper>
        </div>
    );
};

export default Mypage;
