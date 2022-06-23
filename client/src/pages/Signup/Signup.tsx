import React from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import {
    Input,
    Typography,
    Button,
    TextField,
    FormControl,
    FormHelperText,
    Paper,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core';
import useStyles from './styles';
import axios from 'axios';
import { useState } from 'react';

interface IUserData {
    email: string;
    password: string;
    name: string;
    age: number;
    gender: number;
    address: string;
}

const Signup = () => {
    //.styles.tsx적용
    const classes = useStyles();

    //라디오 버튼
    const [value, setValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    console.log(value);

    //react-hook-form 사용해서 사용자입력데이터 가져오기
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserData>();

    const onSubmit = async (data: IUserData) => {
        console.log(data);
        await axios
            .post(
                'http://localhost:1234/api/user/register',
                {
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    age: data.age,
                    gender: value,
                    address: data.address,
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper className={classes.SignupContainer}>
                <div>
                    <Typography variant="h3" className={classes.title}>
                        회원가입
                    </Typography>
                </div>
                <div className={classes.SignupInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>닉네임*</p>
                        <TextField
                            id="outlined-required"
                            {...register('name', {
                                required: '닉네임을 입력하세요.',
                                minLength: {
                                    value: 2,
                                    message: '닉네임은 2글자 이상입니다.',
                                },
                                maxLength: {
                                    value: 10,
                                    message: '닉네임은 10글자 이하입니다.',
                                },
                            })}
                            placeholder="2 ~ 10글자로 적어주세요"
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
                        <p className={classes.InputTitle}>아이디*</p>
                        <TextField
                            id="outlined-required"
                            {...register('email', {
                                required: '아이디를 입력하세요.',
                            })}
                            type="email"
                            placeholder="someone@example.com"
                        />
                        {errors?.email?.message && (
                            <FormHelperText error id="component-error-text">
                                {errors.email.message}
                            </FormHelperText>
                        )}
                    </FormControl>
                </div>
                <div className={classes.SignupInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>비밀번호*</p>
                        <Input
                            {...register('password', {
                                required: '비밀번호를 입력해주세요.',
                                minLength: {
                                    value: 2,
                                    message:
                                        '비밀번호는 최소 8자리 이상입니다.',
                                },
                                maxLength: {
                                    value: 10,
                                    message: '비밀번호는 최대 16자리 입니다.',
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9]*$/,
                                    message:
                                        '비밀번호는 영어와 숫자만 가능합니다.',
                                },
                            })}
                            type="password"
                            placeholder="8 ~ 16자리로 적어주세요"
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
                        <p className={classes.InputTitle}>나이</p>
                        <Input {...register('age')} type="number" />
                    </FormControl>
                </div>
                <div className={classes.SignupInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>성별</p>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            value={value}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="0"
                                control={<Radio />}
                                label="여자"
                            />
                            <FormControlLabel
                                value="1"
                                control={<Radio />}
                                label="남자"
                            />
                            <FormControlLabel
                                value=""
                                control={<Radio />}
                                label="선택안함"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={classes.SignupInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>주소</p>
                        <TextField
                            id="outlined-required"
                            {...register('address')}
                            placeholder="서울시 강남구"
                        />
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
