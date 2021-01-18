import './../../App.css'

import Blurb from './Blurb/Blurb'
import React from "react"
import Splash from './Splash/Splash'

export default function HomeView(): any {
  return (
    <>
      <Splash />
      <Blurb />
    </>
  )
}
