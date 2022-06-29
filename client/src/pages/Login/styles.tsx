import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    loginContainer: {
        display: 'block',
        alignContent: 'center',
        textAlign: 'center',
        marginTop: '10%',
        marginLeft: '30%',
        paddingTop: '50px',
        paddingBottom: '50px',
        width: '500px',
    },
    title: {
        color: '#fa6300',
        fontWeight: 'bold',
    },

    loginInput: {
        width: '200px',
        height: '40px',
        color: '#000000',
        textAlign: 'center',
        marginTop: '10px',
        marginBottom: '5px',
        marginLeft: '30%',
    },

    errorInput: {
        width: '200px',
        height: '15px',
        color: '#000000',
        textAlign: 'center',
        marginTop: '5px',
        marginBottom: '5px',
        marginLeft: '30%',
        paddingTop: '5px',
    },

    TextInput: {
        fontSize: '30px',
        width: '200px',
    },

    loginButton: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
        width: '300px',
        fontSize: '20px',
        marginTop: '20px',
        marginBottom: '20px',
    },
    error: {
        color: '#ff0000',
        fontSize: '10px',
        marginTop: '10px',
        marginBottom: '10px',
    },

    SignupInput: {
        color: '#000000',
        fontSize: '15px',
    },

    SignupText: {
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));
