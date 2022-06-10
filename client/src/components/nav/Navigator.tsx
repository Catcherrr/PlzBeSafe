import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
    display: flexbox;
    justify-content: flex-start;
    height: 1080px;
    background: green;
`;

const Navigator = () => {
    return <Background>네비게이터</Background>;
};

export default Navigator;
