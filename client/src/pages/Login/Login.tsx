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
import { FieldErrors, useForm } from 'react-hook-form';

interface IUserData {
    id: string;
    password: string;
}

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserData>({
        mode: 'onSubmit',
    });
    const classes = useStyles();

    const onValid = (data: IUserData) => {
        console.log('# onValid', data);
    };

    const onInValid = (errors: FieldErrors) => {
        console.log('# onInValid', errors);
    };

    return (
        <form onSubmit={handleSubmit(onValid, onInValid)}>
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
                            {...register('id', {
                                required: 'id를 입력해주세요',
                            })}
                        />

                        {errors?.id?.message && (
                            <FormHelperText error id="component-error-text">
                                {errors.id.message}
                            </FormHelperText>
                        )}
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
                            {...register('password', {
                                required: '비밀번호는 필수 값입니다.',
                                pattern: {
                                    value: /^[a-zA-Z]*$/,
                                    message: '비밀번호는 영어만 가능합니다.',
                                },
                            })}
                        />

                        {errors?.password?.message && (
                            <FormHelperText error id="component-error-text">
                                {errors.password.message}
                            </FormHelperText>
                        )}
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
                        회원가입
                    </Link>
                </div>
            </Paper>
        </form>
    );
}
export default Login;
