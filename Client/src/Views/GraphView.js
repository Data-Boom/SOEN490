import { Button } from "@material-ui/core"
import React from "react"
import Graph from '../Components/Graph/Graph'

export default function GraphView() {
  const handleRequest = () => {
    alert('clicked')
  }

  return (
    <>
      <h2>GraphView</h2>
      <Button onClick={handleRequest}>Why am I here?</Button>
      <Graph />
    </>
  )
}