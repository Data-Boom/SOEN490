import { Button } from "@material-ui/core"
import React from "react"

export default function GraphView() {

  // const [count, setCount] = useState(0)
  const handleRequest = () => {
    // alert('clicked')
  }

  return (
    <Button onClick={() => handleRequest}>test</Button>
  )
}