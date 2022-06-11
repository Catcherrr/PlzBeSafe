import React, { useState } from 'react';
import {
    CircularProgress,
    Grid,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import HelpIcon from '@material-ui/icons/Help';

import useStyles from './styles';
import { Link } from 'react-router-dom';

const Post = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.icon}>
                <Link to="/about">
                    <WarningIcon />
                </Link>
            </div>
            <div className={classes.icon}>
                <Link to="/howtouse">
                    <ImportContactsIcon />
                </Link>
            </div>
            <div className={classes.icon}>
                <Link to="/inquiry">
                    <HelpIcon />
                </Link>
            </div>
        </div>
    );
};

export default Post;
