import { Button } from "@material-ui/core"
import React from "react"

export default function SearchView() {

  // const [count, setCount] = useState(0)
  const handleRequest = () => {
    alert('GOT EEM')
  }

  return (
    <>
      <h2>SEARCH</h2>
      <Button onClick={handleRequest}>DEEZ NUTS FOR 2020</Button>
     
    </>
  )
}