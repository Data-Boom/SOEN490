import { Box, Button, Container, Grid, Paper, TextField, makeStyles } from "@material-ui/core"

import Graph from '../Components/Graph/Graph'
import React from "react"
import Search from "../Components/Search/Search"
import hideDatasets from '../Components/Graph/Graph'
import { useState } from "react"

export default function GraphView() {

  //sample datasets to try, just needs to gather from the backend instead.
  //Datalist is the list fed to the graphCreation

  const [datalist, setDatalist] = useState([])
  const [colourslist, setColourslist] = useState([])
  const [IDList, setIDList] = useState([])

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
    setIDList(["1", "2", "3", "4"])
    setColourslist(["#3632ff", "#f20b34", "#7af684", "#000000"])
  }

  return (
    <>
      <h2>GraphView</h2>
      <Button onClick={handleRequest} color="primary">Load random dataset button</Button>
      <Box ml={8}>
        <Grid container spacing={3}>
          <Grid item container sm={5} >
            <Paper elevation={3}>
              <Graph
                outerHeight={500}
                outerWidth={768}
                datalist={datalist}
                colourslist={colourslist}
                IDList={IDList}
              />
            </Paper>
          </Grid>
          <Grid item sm={7}>
          </Grid>
        </Grid>
      </Box>
    </>
  );

}