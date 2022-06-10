import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './pages/Routes';
import Globalstyle from './styles/global-style';

function App(): JSX.Element {
    console.log(process.env.KEY);
    return (
        <>
            <Globalstyle />
            <Router>
                <RoutesComponent />
            </Router>
        </>
    );
}

export default App;
