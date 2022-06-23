import React from 'react';
import axios from 'axios';
interface IUserData {
    email: string;
    password: string;
    name: string;
    age: number;
    gender: number;
    address: string;
}

function About() {
    return axios
        .post('http://localhost:1234/api/user/register', {
            email: 'test10@test.com',
            password: '1234',
            name: '김민지',
            age: 23,
            gender: 0,
            address: '서울시 구로구',
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error.response);
        });
}

export default About;
