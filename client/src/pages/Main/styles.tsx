import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginBottom: '30px',
    },

    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        height: '75vh',
        overflow: 'auto',
    },
}));
