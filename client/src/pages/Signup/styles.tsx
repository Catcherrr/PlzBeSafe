import { alpha, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    SignupContainer: {
        display: 'block',
        alignContent: 'center',
        textAlign: 'center',
        marginTop: '1%',
        marginLeft: '10%',
        paddingTop: '30px',
        paddingBottom: '30px',
        width: '1000px',
        height: '600px',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: '50px',
    },

    error: {
        color: '#ff0000',
        fontSize: '10px',
    },

    SignupInput: {
        width: '200px',
        height: '70px',
        color: '#000000',
        textAlign: 'center',
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '40%',
    },

    InputTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
    },

    SignupButton: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
        width: '400px',
        fontSize: '20px',
    },
}));
