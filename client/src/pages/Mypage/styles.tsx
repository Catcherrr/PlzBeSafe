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
        width: '15%',
        paddingTop: '30px',
        paddingBottom: '30px',
    },
    RightContainer: {
        paddingTop: '1%',
        alignContent: 'right',
        textAlign: 'left',
        height: '650px',
        width: '90%',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: '50px',
    },

    error: {
        color: '#ff0000',
        fontSize: '10px',
    },

    MypageInput: {
        width: '200px',
        height: '60px',
        color: '#000000',
        textAlign: 'center',
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '20%',
    },

    MypageImage: {
        width: '200px',
        height: '200px',
        color: '#000000',
        textAlign: 'center',
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '18%',
    },

    InputTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
    },

    MypageButton: {
        fontSize: '20px',
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '5%',
    },

    MypageText: {
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));
