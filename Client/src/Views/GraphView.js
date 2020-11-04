import { Button } from "@material-ui/core"
import React from "react"

export default function GraphView() {

  // const [count, setCount] = useState(0)
  const handleRequest = () => {
    alert('clicked')
  }

  return (
    <>
      <h2>GraphView</h2>
      <Button onClick={handleRequest}>Issa graph page</Button>
    </>
  )
}