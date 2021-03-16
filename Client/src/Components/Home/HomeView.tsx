import './../../App.css'

import React, { useEffect } from "react"

import Blurb from './Blurb/Blurb'
import Splash from './Splash/Splash'

export default function HomeView(): any {
  useEffect(() => { document.title = "Home" }, [])
  return (
    <>
      <Splash />
      <Blurb />
    </>
  )
}
