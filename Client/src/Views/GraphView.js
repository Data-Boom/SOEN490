import { Box, Button, Container, Grid, Paper, TextField, makeStyles } from "@material-ui/core"

import Graph from '../Components/Graph/Graph'
import React from "react"
import { useState } from "react"

export default function GraphView() {

  //sample datasets to try, just needs to gather from the backend instead.
  //Datalist is the list fed to the graphCreation

  //<Button onClick={handleRequest}>Why am I here?</Button>
  const [datalist, setDatalist] = useState([])
  const [colourslist, setColourslist] = useState([])

  const handleRequest = () => {
    var dataset1 = [{ x: 5.1, y: 3.5 }, { x: 4.9, y: 3 }, { x: 4.7, y: 3.2 }, { x: 4.6, y: 3.1 }, { x: 5, y: 3.6 }, { x: 5.4, y: 3.9 }]
    var dataset2 = [{ x: 3, y: 8 }, { x: 9, y: 7 }, { x: 1, y: 3 }, { x: 2, y: 4 }, { x: 8, y: 1 }]
    var dataset3 = [{ x: 7, y: 6 }, { x: 2, y: 5 }, { x: 7, y: 9 }, { x: 4, y: 1 }, { x: 6, y: 7 }]
    var dataset4 = [{ x: 3, y: 7 }, { x: 1, y: 9 }, { x: 8, y: 7 }, { x: 1, y: 4 }, { x: 8, y: 5 }]
    const datalistDemo = []
    datalistDemo.push(dataset1)
    datalistDemo.push(dataset2)
    datalistDemo.push(dataset3)
    datalistDemo.push(dataset4)
    console.log(datalistDemo)
    setDatalist(datalistDemo)
    setColourslist(["#3632ff", "#f20b34", "#7af684", "#000000"])
  }

  const deleteDataset = () => {
    //alert("dataset deleted");
  }
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <h2>GraphView</h2>
      <Button onClick={handleRequest} color="primary">Load random dataset button</Button>
      <Box ml={8}>
        <Grid container spacing={3}>
          <Grid item container sm={6} >
            <Paper elevation={3}>
              <Graph
                outerHeight={500}
                outerWidth={768}
                datalist={datalist}
                colourslist={colourslist}
              />
            </Paper>
          </Grid>
          <Grid item sm={6}>
            <TextField id="standard-basic" label="Standard" />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          </Grid>
        </Grid>

        <form>
          <br></br>
          <select id="mySelect" size="4">
            <option>Red</option>
            <option>Black</option>
            <option>Blue</option>
            <option>Green</option>
          </select>
          <br></br>
          <button onclick="deleteChoice()">Delete dataset</button>
        </form>


        <script>



          function deleteChoice()
           {
            // var choice = document.getElementById("mySelect")
            // x.remove(x.selectedIndex)
          };




        </script>

      </Box>




    </>
  )
}