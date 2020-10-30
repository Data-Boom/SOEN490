import './Splash.css'

import React from 'react'
import splashimage from './splashimage.png'

function Splash() {
  return (
    <div className="Splash">
      <img src={splashimage} width="100%" />
    </div>
  )
}

export default Splash