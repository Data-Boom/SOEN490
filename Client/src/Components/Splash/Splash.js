import React from 'react';
import './Splash.css';

function Splash(){
    return(
        <div className = "Splash">
            <img src={require('./splashimage.png')} width = "100%" />
        </div>
    )
}

export default Splash;