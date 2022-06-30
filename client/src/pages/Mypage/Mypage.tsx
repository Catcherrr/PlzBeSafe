import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Mypage = () => {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [age, setAge] = useState('0');
    const [gender, setGender] = useState('0');
    const [address, setAddress] = useState('');

    useEffect(() => {
        axios
            .post(
                'http://localhost:1234/api/user/myinfo',
                {
                    jwt: localStorage.getItem('user-token'),
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => {
                setName(response.data.result.info.name);
                setAge(response.data.result.info.age);
                setGender(
                    response.data.result.info.gender === 0
                        ? '여자'
                        : response.data.result.info.gender === 1
                        ? '남자'
                        : '선택안함'
                );
                setAddress(
                    response.data.result.info.address1 +
                        ' ' +
                        response.data.result.info.address2
                );
            })
            .catch((error) => {
                console.log(error.response);
            });
    });

    return (
        <div className={classes.SignupContainer}>
            <Paper className={classes.LeftContainer}>
                <div className={classes.MypageButton}>
                    <Link to="/mypage">
                        <p className={classes.MypageText}>
                            <AccountCircleIcon />내 정보
                        </p>
                    </Link>
                </div>
                <div className={classes.MypageButton}>
                    <Link to="/modifyregister">
                        <p className={classes.MypageText}>내 정보 수정</p>
                    </Link>
                </div>
                <div className={classes.MypageButton}>
                    <Link to="/changepassword">
                        <p className={classes.MypageText}>비밀번호 수정</p>
                    </Link>
                </div>
            </Paper>
            <Paper className={classes.RightContainer}>
                <div className={classes.MypageImage}>
                    <img src="../../3.png"></img>
                </div>
                <div className={classes.MypageInput}>
                    <p className={classes.InputTitle}>닉네임</p>
                    <TextField
                        id="filled-basic"
                        InputProps={{
                            readOnly: true,
                        }}
                        value={name}
                    />
                </div>
                <div className={classes.MypageInput}>
                    <p className={classes.InputTitle}>나이</p>
                    <TextField
                        id="filled-basic"
                        InputProps={{
                            readOnly: true,
                        }}
                        value={age}
                    />
                </div>
                <div className={classes.MypageInput}>
                    <p className={classes.InputTitle}>성별</p>
                    <TextField
                        id="filled-basic"
                        InputProps={{
                            readOnly: true,
                        }}
                        value={gender}
                    />
                </div>
                <div className={classes.MypageInput}>
                    <p className={classes.InputTitle}>주소</p>
                    <TextField
                        id="filled-basic"
                        InputProps={{
                            readOnly: true,
                        }}
                        value={address}
                    />
                </div>
            </Paper>
        </div>
    );
};

export default Mypage;
