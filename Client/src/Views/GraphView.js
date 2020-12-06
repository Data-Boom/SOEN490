import { Box, Button, Grid, Paper, TextField } from "@material-ui/core"

import Graph from '../Components/Graph/Graph'
import React from "react"
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
    setIDList(["0", "1", "2", "3"])
    setColourslist(["#3632ff", "#f20b34", "#7af684", "#000000"])
    loadOptionsList(datalistDemo, ["0", "1", "2", "3"])
  }

  const deleteDataset = () => {

    if (datalist.length != 0) {
      var x = document.getElementById("datasets").value
      const datalistDemo = []
      const colourlistDemo = []
      const IDlistDemo = []
      for (var i = 0; i < datalist.length; i++) {
        if (i != x) {
          datalistDemo.push(datalist[i])
          colourlistDemo.push(colourslist[i])
          IDlistDemo.push(IDList[i])
        }
      }
      colourlistDemo.push(colourslist[x])
      setIDList(IDlistDemo)
      setColourslist(colourlistDemo)
      setDatalist(datalistDemo)
      loadOptionsList(datalistDemo, IDlistDemo)
    }

  }

  const loadOptionsList = (d, id) => {
    var text = "<label for=\"cars\">Choose a Dataset to Delete:</label><br><select name=\"dataset\" id=\"datasets\">"
    for (var i = 0; i < d.length; i++) {
      text += "<option value=" + i + ">Dataset" + id[i] + "</option><br>"
    }
    text += "</select><br>"
    document.getElementById("options").innerHTML = text
  }

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
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
        <form>
          <br></br>
          <div id="options">
          </div>
        </form>
        <Button onClick={deleteDataset}>Delete dataset</Button>

      </Box>
    </>
  )
}