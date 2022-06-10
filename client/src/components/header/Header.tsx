import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    Box,
    ButtonBase,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import useStyles from './style';
import { Link } from 'react-router-dom';

type Props = {
    onClick?: React.MouseEventHandler;
};

function Header({ onClick }: Props) {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Box display="flex">
                    <div className={classes.left}>
                        <ButtonBase
                            className={classes.hamburgerIcon}
                            onClick={() => onClick()}
                        >
                            <MenuIcon />
                        </ButtonBase>
                        <Typography variant="h5" className={classes.title}>
                            Please Be Safe
                        </Typography>
                    </div>
                </Box>
                <Box display="flex">
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="검색"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    <div className={classes.user}>
                        <div className={classes.userIcon}>
                            <AccountCircleIcon />
                        </div>
                    </div>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default Header;
