import './../App.css'

import React, { useEffect, useState } from "react"

import Blurb from '../Components/Blurb/Blurb'
import { Box } from '@material-ui/core'
import DataCell from '../Components/DataCell/DataCell'
import Splash from '../Components/Splash/Splash'
import fetch from "node-fetch"

export default function HomeView() {

  const [apiResponse, setApiResponse] = useState('')

  function callAPI() {
    fetch('http://localhost:4000/note')
      .then(res => res.json())
      .then(data => setApiResponse(data))
  }

  useEffect(() => {
    callAPI()
  }, [])

  return (
    <>
      <Splash />
      <Blurb />
      <p>{apiResponse}</p>
    </>
  )
}
