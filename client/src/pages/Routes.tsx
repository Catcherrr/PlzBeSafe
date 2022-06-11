import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './About/About';
import Login from './Login/Login';
import Main from './Main/Main';

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
        </Routes>
    );
};

export default RoutesComponent;
