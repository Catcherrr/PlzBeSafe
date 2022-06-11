import React from 'react';
import Map from '../../components/contents/Map/Map';
import useStyles from './styles';

function Main() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Map />
        </div>
    );
}
export default Main;
