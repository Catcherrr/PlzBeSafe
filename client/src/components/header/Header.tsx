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
import useStyles from './styles';
import { Link } from 'react-router-dom';

type Props = {
    onClick?: React.MouseEventHandler;
    moving: string;
};

function Header({ onClick }: Props) {
    const classes = useStyles();
    const moving =
        localStorage.getItem('user-token') == null ? '/login' : '/mypage';
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Box display="flex">
                    <div className={classes.left}>
                        <ButtonBase
                            className={classes.hamburgerIcon}
                            onClick={onClick}
                        >
                            <MenuIcon />
                        </ButtonBase>
                        <Link to="/">
                            <Typography variant="h5" className={classes.title}>
                                Please Be Safe
                            </Typography>
                        </Link>
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

                    <Link to={moving} className={classes.user}>
                        <div className={classes.userIcon}>
                            <AccountCircleIcon />
                        </div>
                    </Link>

                    <Link to="/mypage" className={classes.user}>
                        <Typography variant="h6">마이페이지</Typography>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default Header;
