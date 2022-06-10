import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './pages/Routes';
import Globalstyle from './styles/global-style';
import Header from './components/header/Header';
import Navigator from './components/nav/Navigator';
import { CssBaseline, Grid } from '@material-ui/core';

function App() {
    const [toggle, setToggle] = useState<Boolean>(true);
    const onToggleClick = () => setToggle(!toggle);
    return (
        <>
            <Globalstyle />
            <CssBaseline />
            <Header onClick={() => onToggleClick()} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                {toggle && (
                    <Grid item xs={12} md={1}>
                        <Navigator />
                    </Grid>
                )}
                <Grid item xs={12} md={toggle ? 11 : 12}>
                    <Router>
                        <RoutesComponent />
                    </Router>
                </Grid>
            </Grid>
        </>
    );
}

export default App;
