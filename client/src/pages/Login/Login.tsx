import React from 'react';
import {
    Typography,
    Button,
    TextField,
    Paper,
    FormHelperText,
    FormControl,
} from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { ILoginData } from '../../store/type/interfaces';

function Login() {
    const classes = useStyles();

    const [errors, setErrors] = useState('');

    const { register, handleSubmit } = useForm<ILoginData>();

    const onSubmit = async (data: ILoginData) => {
        console.log(data);
        await axios
            .post(
                'http://localhost:1234/api/user/login',
                {
                    email: data.email,
                    password: data.password,
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => {
                localStorage.setItem('user-token', response.data.result.jwt);
                window.location.href = '/';
            })
            .catch((error) => {
                setErrors(error.response.data.message);
                console.log(error.response.data);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper className={classes.loginContainer}>
                <div>
                    <Typography variant="h3" className={classes.title}>
                        로그인
                    </Typography>
                </div>
                <div className={classes.loginInput}>
                    <FormControl variant="standard">
                        <TextField
                            id="standard-basic"
                            label="아이디"
                            variant="standard"
                            placeholder="someone@example.com"
                            type="email"
                            className={classes.TextInput}
                            {...register('email')}
                        />
                    </FormControl>
                </div>
                <div className={classes.loginInput}>
                    <FormControl variant="standard">
                        <TextField
                            id="standard-password-input"
                            label="비밀번호"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            className={classes.TextInput}
                            {...register('password')}
                        />
                    </FormControl>
                </div>
                <div className={classes.errorInput}>
                    <FormControl variant="standard">
                        <FormHelperText error id="component-error-text">
                            {errors}
                        </FormHelperText>
                    </FormControl>
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.loginButton}
                    >
                        SIGN IN
                    </Button>
                </div>
                <div>
                    <Link to="/signup" className={classes.SignupInput}>
                        <p className={classes.SignupText}>회원가입</p>
                    </Link>
                </div>
            </Paper>
        </form>
    );
}
export default Login;
