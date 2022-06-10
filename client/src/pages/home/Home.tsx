import React from 'react';
import Header from '../../components/header/Header';
import Navigator from '../../components/nav/Navigator';
import { CssBaseline, Grid } from '@material-ui/core';
import Map from '../../components/contents/Map';

const Home = () => {
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={0} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <Navigator />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map />
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
