import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import {
    Box,
    Input,
    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    FormHelperText,
    Container,
    Paper,
} from '@material-ui/core';
import useStyles from './styles';

interface IUserData {
    name: string;
    age: number;
    id: string;
    password: string;
    email: string;
}

const Signup = () => {
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
            <Paper className={classes.SignupContainer}>
                <div>
                    <Typography variant="h3" className={classes.title}>
                        회원가입
                    </Typography>
                </div>
                <div className={classes.SignupInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>닉네임</p>
                        <TextField
                            id="outlined-required"
                            {...register('name', {
                                required: '닉네임은 필수 값입니다.',
                                minLength: {
                                    value: 5,
                                    message: '닉네임은 5글자 이상이어야합니다.',
                                },
                                maxLength: {
                                    value: 10,
                                    message:
                                        '닉네임은 10글자 이하이어야 합니다.',
                                },
                            })}
                        />
                        {errors?.name?.message && (
                            <FormHelperText error id="component-error-text">
                                {errors.name.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                </div>
                <div className={classes.SignupInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>아이디</p>
                        <TextField
                            id="outlined-required"
                            {...register('id', {
                                required: '아이디는 필수 값입니다.',
                            })}
                        />
                        {errors?.id?.message && (
                            <FormHelperText error id="component-error-text">
                                {errors.id.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                </div>
                <div className={classes.SignupInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>비밀번호</p>
                        <Input
                            {...register('password', {
                                required: '비밀번호는 필수 값입니다.',
                                pattern: {
                                    value: /^[a-zA-Z]*$/,
                                    message: '비밀번호는 영어만 가능합니다.',
                                },
                            })}
                            type="password"
                        />
                        {errors?.password?.message && (
                            <FormHelperText error id="component-error-text">
                                {errors.password.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                </div>
                <div className={classes.SignupInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>이메일</p>
                        <Input
                            {...register('email', {
                                required: 'email은 필수 값 입니다.',
                            })}
                            type="email"
                        />
                        {errors?.email?.message && (
                            <FormHelperText error id="component-error-text">
                                {errors.email.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                </div>
                <div>
                    <Button variant="contained" color="primary" type="submit">
                        제출
                    </Button>
                </div>
            </Paper>
        </form>
    );
};

export default Signup;
