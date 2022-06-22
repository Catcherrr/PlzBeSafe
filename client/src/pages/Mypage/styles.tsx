import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    SignupContainer: {
        display: 'flex',
        marginTop: '1%',
        marginLeft: '1%',
        marginRight: '1%',
        height: '650px',
        width: '98%',
    },
    LeftContainer: {
        display: 'block',
        textAlign: 'center',
        alignContent: 'left',
        height: '650px',
        width: '49%',
        paddingTop: '30px',
        paddingBottom: '30px',
    },
    RightContainer: {
        alignContent: 'right',
        height: '650px',
        width: '50%',
        marginLeft: '1%',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: '50px',
    },

    error: {
        color: '#ff0000',
        fontSize: '10px',
    },

    ModifyregisterInput: {
        width: '200px',
        height: '70px',
        color: '#000000',
        textAlign: 'center',
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '35%',
    },

    InputTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
    },

    ModifyregisterButton: {
        fontSize: '20px',
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '5%',
    },
}));
