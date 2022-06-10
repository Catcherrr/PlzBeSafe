import { alpha, makeStyles } from '@material-ui/core/styles';
/*xs, extra-small: 0px
sm, small: 600px
md, medium: 900px
lg, large: 1200px
xl, extra-large: 1536px */
export default makeStyles((theme) => ({
    title: {
        display: 'none',
        marginLeft: '50px',
        color: '#fa6300',
        fontWeight: 'bold',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    left: {
        position: 'relative',
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    },
    search: {
        'position': 'relative',
        'borderRadius': theme.shape.borderRadius,
        'backgroundColor': alpha(theme.palette.common.black, 0.15),
        '&:hover': { backgroundColor: alpha(theme.palette.common.black, 0.25) },
        'marginRight': 0,
        'marginLeft': 0,
        'width': '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    user: {
        position: 'relative',
        marginRight: theme.spacing(3),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },

    hamburgerIcon: {
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: alpha(theme.palette.common.white, 0),
        border: alpha(theme.palette.common.white, 0),
    },

    searchIcon: {
        padding: theme.spacing(0, 1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userIcon: {
        padding: theme.spacing(0, 1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fa6300',
    },

    inputRoot: {
        color: '#000000',
    },

    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    },

    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#ffdd00',
    },
}));
