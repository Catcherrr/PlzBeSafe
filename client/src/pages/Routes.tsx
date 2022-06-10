import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './Main/Main';

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/first" render={() => <h1>처음</h1>} />
        </Routes>
    );
};

export default RoutesComponent;
