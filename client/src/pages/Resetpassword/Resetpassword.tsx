import React from 'react';
import {
    Typography,
    Button,
    TextField,
    Paper,
    FormHelperText,
    FormControl,
    Input,
} from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { FieldErrors, useForm } from 'react-hook-form';

interface IUserData {
    name: string;
    age: number;
    id: string;
    password: string;
    email: string;
}

function Resetpassword() {
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
            <Paper className={classes.ModifyregisterContainer}>
                <div>
                    <Typography variant="h3" className={classes.title}>
                        비밀번호 변경
                    </Typography>
                </div>
                <div className={classes.ModifyregisterInput}>
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
                <div className={classes.ModifyregisterInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>비밀번호 확인</p>
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
                <div className={classes.ModifyregisterButton}>
                    <Button variant="contained" color="primary" type="submit">
                        수정완료
                    </Button>
                </div>
            </Paper>
        </form>
    );
}
export default Resetpassword;
