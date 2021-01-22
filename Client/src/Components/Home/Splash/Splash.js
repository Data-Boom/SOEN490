import './Splash.css'

import React from 'react'
import splashimage from './splashimage.png'

export default function Splash() {
  return (
    <div className="Splash">
      <img alt="subject to change" src={splashimage} width="100%" />
    </div>
  )
}