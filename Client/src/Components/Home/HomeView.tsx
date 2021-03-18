import './../../App.css'

import Blurb from './Blurb/Blurb'
import React from "react"
import Splash from './Splash/Splash'
import { useTitle } from '../../Common/Hooks/useTitle'

export default function HomeView(): any {
  useTitle("Home")

  return (
    <>
      <Splash />
      <Blurb />
    </>
  )
}
