import React from 'react';
import './Splash.css';

function Splash(){
    return(
        <div className = "Splash">
            <img src={require('./img_snow_wide.jpg')} width = "100%" />
            <h1>Welcome to the</h1>
            <h2>NEW</h2>
            <h3>Detonation Database</h3>
        </div>
    )
}

export default Splash;