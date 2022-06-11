import React from 'react';
import WarningIcon from '@material-ui/icons/Warning';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import HelpIcon from '@material-ui/icons/Help';

import useStyles from './styles';
import { Link } from 'react-router-dom';

const Navigator = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.icon}>
                <Link to="/about">
                    <WarningIcon />
                </Link>
                <span className={classes.iconDesc}>서비스 소개</span>
            </div>
            <div className={classes.icon}>
                <Link to="/howtouse">
                    <ImportContactsIcon />
                </Link>
                <span className={classes.iconDesc}>사용법</span>
            </div>
            <div className={classes.icon}>
                <Link to="/inquiry">
                    <HelpIcon />
                </Link>
                <span className={classes.iconDesc}>문의하기</span>
            </div>
        </div>
    );
};

export default Navigator;