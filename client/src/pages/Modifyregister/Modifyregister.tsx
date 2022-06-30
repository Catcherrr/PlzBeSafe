import React from 'react';
import {
    Typography,
    Button,
    TextField,
    Paper,
    FormHelperText,
    FormControl,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { FieldErrors, useForm } from 'react-hook-form';
import { useState } from 'react';
import { IModifyData } from '../../store/type/interfaces';
import axios from 'axios';
function Modifyregister() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IModifyData>({
        mode: 'onSubmit',
    });
    const classes = useStyles();

    const onSubmit = async (data: IModifyData) => {
        console.log(data);
        await axios
            .put(
                'http://localhost:1234/api/user/changeInfo',
                {
                    jwt: localStorage.getItem('user-token'),
                    name: data.name,
                    age: data.age,
                    gender: data.gender.toString() === '2' ? null : data.gender,
                    address: data.address,
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => {
                console.log(response.data);
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
                <div className={classes.ModifyregisterInput}>
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
                <div className={classes.ModifyregisterInput}>
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
