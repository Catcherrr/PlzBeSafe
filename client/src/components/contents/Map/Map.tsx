import React from 'react';
import GoogleMapReact from 'google-map-react';

import useStyles from './style';

const Map = () => {
    const classes = useStyles();
    const cordinates = { lat: 37.541, lng: 126.986 };
    const key = process.env.API_KEY || '';
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key }}
                defaultCenter={cordinates}
                center={cordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
            ></GoogleMapReact>
        </div>
    );
};

export default Map;
