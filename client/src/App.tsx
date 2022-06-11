import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './pages/Routes';
import Globalstyle from './styles/global-style';
import Header from './components/header/Header';
import Navigator from './components/nav/Navigator';
import { CssBaseline, Grid } from '@material-ui/core';
import Post from './components/nav/Post/Post';

function App() {
    const [toggle, setToggle] = useState<Boolean>(true);
    const onToggleClick = () => setToggle(!toggle);
    const [postToggle, setPostToggle] = useState<Boolean>(false);
    const onPostToggleClick = () => setPostToggle(!postToggle);
    return (
        <>
            <Router>
                <Globalstyle />
                <CssBaseline />
                <Header onClick={() => onToggleClick()} />
                <Grid
                    container
                    spacing={3}
                    style={{ width: '100%', margin: 0, padding: 0 }}
                >
                    {toggle && (
                        <Grid
                            item
                            xs={12}
                            md={1}
                            style={{ width: '100%', padding: 0 }}
                        >
                            <Navigator />
                        </Grid>
                    )}
                    {postToggle && (
                        <Grid
                            item
                            xs={12}
                            md={4}
                            style={{ width: '100%', padding: 0 }}
                        >
                            <Post />
                        </Grid>
                    )}
                    <Grid
                        item
                        xs={12}
                        md={postToggle ? 7 : toggle ? 11 : 12}
                        style={{
                            width: '100%',
                            padding: 0,
                            marginTop: 15,
                        }}
                    >
                        <RoutesComponent />
                    </Grid>
                </Grid>
            </Router>
        </>
    );
}

export default App;
