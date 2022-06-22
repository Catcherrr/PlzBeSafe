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

function Modifyregister() {
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
                        정보수정
                    </Typography>
                </div>
                <div className={classes.ModifyregisterInput}>
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
                <div className={classes.ModifyregisterInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>아이디</p>
                        <TextField
                            id="outlined-required"
                            {...register('id', {
                                required: '아이디는 필수 값입니다.',
                            })}
                            type="email"
                            placeholder="someone@example.com"
                        />
                        {errors?.id?.message && (
                            <FormHelperText error id="component-error-text">
                                {errors.id.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                </div>
                <div className={classes.ModifyregisterInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>나이</p>
                        <Input type="number" />
                    </FormControl>
                </div>
                <div className={classes.ModifyregisterButton}>
                    <Link to="/resetpassword">
                        <Button variant="contained" color="primary">
                            비밀번호 변경
                        </Button>
                    </Link>
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
export default Modifyregister;
