import React, { useRef } from 'react';
import {
    Typography,
    Button,
    Paper,
    FormHelperText,
    FormControl,
    Input,
} from '@material-ui/core';
import useStyles from './styles';
import { useForm } from 'react-hook-form';
import { IPasswordData } from '../../store/type/interfaces';
import axios from 'axios';

function Changepassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<IPasswordData>();

    const classes = useStyles();

    //비밀번호 확인
    const password = useRef({});
    password.current = watch('password', '');

    const onSubmit = async (data: IPasswordData) => {
        console.log(data);
        await axios
            .patch(
                'http://localhost:1234/api/user/changePassword',
                {
                    jwt: localStorage.getItem('user-token'),
                    password: data.passwordComfirmaion,
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => {
                console.log(response.data);
                window.location.href = '/changepasswordok';
            })
            .catch((error) => {
                console.log(error.response);
            });
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper className={classes.ModifyregisterContainer}>
                <div>
                    <Typography variant="h3" className={classes.title}>
                        비밀번호 변경
                    </Typography>
                </div>
                <div className={classes.ModifyregisterInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>
                            새로운 비밀번호 입력
                        </p>
                        <Input
                            {...register('password', {
                                required: '비밀번호를 입력해주세요.',
                                minLength: {
                                    value: 8,
                                    message:
                                        '비밀번호는 최소 8자리 이상입니다.',
                                },
                                maxLength: {
                                    value: 16,
                                    message: '비밀번호는 최대 16자리 입니다.',
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9]*$/,
                                    message:
                                        '비밀번호는 영어와 숫자만 가능합니다.',
                                },
                            })}
                            type="password"
                        />
                        {(errors?.password?.message && (
                            <FormHelperText error id="component-error-text">
                                {errors.password.message}
                            </FormHelperText>
                        )) || (
                            <FormHelperText
                                className={classes.conditiontext}
                                id="component-error-text"
                            >
                                비밀번호는 최소 8자리 이상 16자리 이하입니다.
                            </FormHelperText>
                        )}
                    </FormControl>
                </div>
                <div className={classes.ModifyregisterInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>비밀번호 확인</p>
                        <Input
                            {...register('passwordComfirmaion', {
                                required: '비밀번호를 다시 입력해주세요.',
                                validate: (value) =>
                                    value === password.current ||
                                    '비밀번호가 일치하지 않습니다.',
                            })}
                            type="password"
                        />
                        {errors?.passwordComfirmaion?.message && (
                            <FormHelperText error id="component-error-text">
                                {errors.passwordComfirmaion.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                </div>
                <div className={classes.ModifyregisterButton}>
                    <Button variant="contained" color="primary" type="submit">
                        수정완료
                    </Button>
                </div>
            </Paper>
        </form>
    );
}
export default Changepassword;
