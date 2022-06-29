import { makeStyles } from '@material-ui/core/styles';

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
    },
    SignupOkContainer: {
        display: 'block',
        alignContent: 'center',
        textAlign: 'center',
        marginTop: '13%',
        marginLeft: '20%',
        paddingTop: '30px',
        paddingBottom: '30px',
        width: '700px',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: '50px',
    },

    oktitle: {
        fontWeight: 'bold',
        marginBottom: '50px',
        color: '#1976d2',
    },

    error: {
        color: '#ff0000',
        fontSize: '10px',
    },

    conditiontext: {
        color: '#000000',
    },

    SignupInput: {
        width: '300px',
        height: '70px',
        color: '#000000',
        textAlign: 'left',
        marginTop: '20px',
        marginBottom: '30px',
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

    EmailContainer: {
        display: 'flex',
    },

    EmailButton: {
        marginTop: '30px',
    },
}));
