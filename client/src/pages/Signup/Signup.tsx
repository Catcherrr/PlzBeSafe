import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
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
    MenuItem,
} from '@material-ui/core';
import useStyles from './styles';
import axios from 'axios';
import { useState } from 'react';
import { IUserData, IEmailData } from '../../store/type/interfaces';

const Signup = () => {
    //.styles.tsx적용
    const classes = useStyles();

    // const [age, setAge] = useState('0');
    const [email, setEmail] = useState('');

    // const handleChangeAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setAge(event.target.value as string);
    // };

    //react-hook-form 사용해서 사용자입력데이터 가져오기
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<IUserData>();

    //email인증
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
    } = useForm<IEmailData>();

    //비밀번호 확인
    const password = useRef({});
    password.current = watch('password', '');

    const onSubmit = async (data: IUserData) => {
        console.log(data);
        console.log('email:', email);
        await axios
            .post(
                'http://localhost:1234/api/user/register',
                {
                    email: email,
                    password: data.passwordComfirmaion,
                    name: data.name,
                    age: data.age,
                    gender: data.gender.toString() === '2' ? null : data.gender,
                    address: data.address,
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => {
                console.log(response.data);
                window.location.href = '/signupok';
            })
            .catch((error) => {
                console.log(error.response);
                error.response.data.status === 4041
                    ? alert('이메일을 인증해주세요.')
                    : alert(error.response.data.message);
            });
    };

    const onSubmitEmail = async (data: IEmailData) => {
        console.log(data);
        setEmail(data.id);
        await axios
            .post(
                'http://localhost:1234/api/verify/init',
                {
                    email: data.id,
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => {
                console.log(response.data);
                alert('인증 이메일을 발송했습니다.');
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response.data.status === 5061) {
                    alert('인증메일을 확인해주세요');
                }
            });
    };

    return (
        <Paper className={classes.SignupContainer}>
            <form key={1} onSubmit={handleSubmit2(onSubmitEmail)}>
                <div>
                    <Typography variant="h3" className={classes.title}>
                        회원가입
                    </Typography>
                </div>
                <div className={classes.EmailContainer}>
                    <div className={classes.SignupInput}>
                        <FormControl variant="standard">
                            <p className={classes.InputTitle}>아이디*</p>
                            <TextField
                                id="outlined-required"
                                {...register2('id', {
                                    required: '아이디를 입력하세요.',
                                })}
                                type="email"
                                placeholder="someone@example.com"
                            />
                            {(errors2?.id?.message && (
                                <FormHelperText error id="component-error-text">
                                    {errors2.id.message}
                                </FormHelperText>
                            )) || (
                                <FormHelperText
                                    className={classes.conditiontext}
                                    id="component-error-text"
                                >
                                    아이디는 이메일 형식입니다.
                                </FormHelperText>
                            )}
                        </FormControl>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.EmailButton}
                        >
                            이메일 인증
                        </Button>
                    </div>
                </div>
            </form>
            <form key={2} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.SignupInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>비밀번호*</p>
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
                <div className={classes.SignupInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>비밀번호 확인*</p>
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
                <div className={classes.SignupInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>닉네임*</p>
                        <TextField
                            id="outlined-required"
                            {...register('name', {
                                required: '닉네임을 입력해주세요.',
                                minLength: {
                                    value: 2,
                                    message: '닉네임은 2글자 이상입니다.',
                                },
                                maxLength: {
                                    value: 10,
                                    message: '닉네임은 10글자 이하입니다.',
                                },
                            })}
                            placeholder="헬로우"
                        />
                        {(errors?.name?.message && (
                            <FormHelperText error id="component-text">
                                {errors.name.message}
                            </FormHelperText>
                        )) || (
                            <FormHelperText
                                className={classes.conditiontext}
                                id="component-error-text"
                            >
                                닉네임은 최소 2글자 이상 10글자 이하입니다.
                            </FormHelperText>
                        )}
                    </FormControl>
                </div>
                <div className={classes.SignupInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>나이</p>
                        <FormControl>
                            <TextField
                                select
                                {...register('age')}
                                defaultValue={'0'}
                                fullWidth
                            >
                                ㅇ<MenuItem value={0}>선택안함</MenuItem>
                                <MenuItem value={9}>9세이하</MenuItem>
                                <MenuItem value={10}>10세</MenuItem>
                                <MenuItem value={11}>11세</MenuItem>
                                <MenuItem value={12}>12세</MenuItem>
                                <MenuItem value={13}>13세</MenuItem>
                                <MenuItem value={14}>14세</MenuItem>
                                <MenuItem value={15}>15세</MenuItem>
                                <MenuItem value={16}>16세</MenuItem>
                                <MenuItem value={17}>17세</MenuItem>
                                <MenuItem value={18}>18세</MenuItem>
                                <MenuItem value={19}>19세</MenuItem>
                                <MenuItem value={20}>20세</MenuItem>
                                <MenuItem value={21}>21세</MenuItem>
                                <MenuItem value={22}>22세</MenuItem>
                                <MenuItem value={23}>23세</MenuItem>
                                <MenuItem value={24}>24세</MenuItem>
                                <MenuItem value={25}>25세</MenuItem>
                                <MenuItem value={26}>26세</MenuItem>
                                <MenuItem value={27}>27세</MenuItem>
                                <MenuItem value={28}>28세</MenuItem>
                                <MenuItem value={29}>29세</MenuItem>
                                <MenuItem value={30}>30세</MenuItem>
                                <MenuItem value={31}>31세</MenuItem>
                                <MenuItem value={32}>32세</MenuItem>
                                <MenuItem value={33}>33세</MenuItem>
                                <MenuItem value={34}>34세</MenuItem>
                                <MenuItem value={35}>35세</MenuItem>
                                <MenuItem value={36}>36세</MenuItem>
                                <MenuItem value={37}>37세</MenuItem>
                                <MenuItem value={38}>38세</MenuItem>
                                <MenuItem value={39}>39세</MenuItem>
                                <MenuItem value={40}>40세</MenuItem>
                                <MenuItem value={41}>41세이상</MenuItem>
                            </TextField>
                        </FormControl>
                    </FormControl>
                </div>
                <div className={classes.SignupInput}>
                    <FormControl variant="standard">
                        <p className={classes.InputTitle}>성별</p>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            defaultValue="2"
                        >
                            <FormControlLabel
                                {...register('gender')}
                                value="0"
                                control={<Radio />}
                                label="여자"
                            />
                            <FormControlLabel
                                {...register('gender')}
                                value="1"
                                control={<Radio />}
                                label="남자"
                            />
                            <FormControlLabel
                                {...register('gender')}
                                value="2"
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
                        <FormHelperText
                            className={classes.conditiontext}
                            id="component-error-text"
                        >
                            주소는 OO시 OO구 형식입니다.
                        </FormHelperText>
                    </FormControl>
                </div>
                <div>
                    <Button variant="contained" color="primary" type="submit">
                        제출
                    </Button>
                </div>
            </form>
        </Paper>
    );
};

export default Signup;
