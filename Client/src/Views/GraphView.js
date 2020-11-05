import { Button } from "@material-ui/core"
import React from "react"
import Graph from '../Components/Graph/Graph'

export default function GraphView() {
  //<Button onClick={handleRequest}>Why am I here?</Button>
  // const [count, setCount] = useState(0)
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