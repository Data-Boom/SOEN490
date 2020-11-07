import './Splash.css'

import React from 'react'
import splashimage from './splashimage.png'

export default function Splash() {
  return (
    <div className="Splash">
      <img src={splashimage} width="100%" />
    </div>
  )
}