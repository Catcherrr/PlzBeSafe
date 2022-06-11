import { alpha, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginBottom: '30px',
    },

    container: {
        padding: '25px',
    },
    icon: {
        'display': 'flex',
        'flexDirection': 'row',
        'justifyContent': 'flex-start',
        'alignItems': 'center',
        'color': alpha(theme.palette.common.black, 1),
        '&:hover': { color: alpha('#fa6300', 1) },
        'marginBottom': '30px',
    },
    iconDesc: { fontSize: '0.8em', display: 'flex', marginLeft: '3px' },
    list: {
        height: '75vh',
        overflow: 'auto',
    },
}));