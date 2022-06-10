import React from 'react';
import styled from 'styled-components';

type ButtonProps = {
    children: string;
    width: number;
    height: number;
};

const ButtonComponent = styled.button`
    width: 120px;
    height: 40px;
    padding: 0 2 0 2;
    margin: 1px;
    border-bottom: 1px solid #e5ecea;
`;

const Button: React.FC<ButtonProps> = ({ children, width, height }) => {
    return <ButtonComponent>{children}</ButtonComponent>;
};

export default Button;
