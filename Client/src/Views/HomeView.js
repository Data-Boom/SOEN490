import './../App.css'

import React, { useEffect, useState } from "react"

import Blurb from '../Components/Blurb/Blurb'
import DataCell from '../Components/DataCell/DataCell'
import Splash from '../Components/Splash/Splash'
import Title from '../Components/Title/Title'
import fetch from "node-fetch"
import Graph from '../Components/Graph/Graph'

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
    <div className="App">
      <Title></Title>
      <Splash />
      <Blurb />
      <DataCell />
      <p className="App-intro">{apiResponse}</p>
    </div>
  )
}
