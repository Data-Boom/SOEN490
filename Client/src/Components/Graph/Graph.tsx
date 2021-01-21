import * as d3 from "d3"

import { Button, Grid, TextField } from "@material-ui/core"
import React, { useState } from 'react'

import { IDataPointExtremes } from "../../Models/Graph/IDataPointExtremes"
import { IGraphDatasetModel } from "../../Models/Datasets/IGraphDatasetModel"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

interface IProps {
  outerHeight: number,
  outerWidth: number,
  datasets: IGraphDatasetModel[],
  extremeBoundaries: IDataPointExtremes
}

export default function Graph(props: IProps) {

  //todo this somehow can be done with map/reduce method of an array
  const datalist: any[] = []
  props.datasets.forEach(dataset => datalist.push(dataset.points))
  const colourslist: string[] = []
  props.datasets.forEach(dataset => colourslist.push(dataset.color))
  const IDList: number[] = []
  props.datasets.forEach(dataset => IDList.push(dataset.id))

  const margin = {
    top: 50,
    right: 70,
    bottom: 50,
    left: 70
  }
  const outerWidth = props && props.outerWidth || 768
  const outerHeight = props && props.outerHeight || 500
  const width = outerWidth - margin.left - margin.right
  const height = outerHeight - margin.top - margin.bottom
  const extremeBoundaries = props.extremeBoundaries

  const [isXLog, setXToggle] = useState(false)
  const [isYLog, setYToggle] = useState(false)
  const [showSettings, setSettingsToggle] = useState(false)
  const [boundaries, setBoundaries] = useState<IDataPointExtremes>(
    extremeBoundaries
  )
  // This loops through the selected arrays to find the min/max for both x and y.

  const handleXScaleClick = () => {
    if (boundaries.minX <= 0 && !isXLog) {
      setBoundaries({
        ...boundaries,
        minX: 1
      })
    }
    setXToggle(!isXLog)
  }

  const handleYScaleClick = () => {
    if (boundaries.minY <= 0 && !isYLog) {
      setBoundaries({
        ...boundaries,
        minY: 1
      })
    }
    setYToggle(!isYLog)
  }

  const handleSettingsClick = () => {
    setSettingsToggle(!showSettings)
  }

  const handleXUpperBoundChange = (event) => {
    const { value } = event.target
    if ((value < extremeBoundaries.maxX)) {
      setBoundaries({
        ...boundaries,
        maxX: (Math.ceil(extremeBoundaries.maxX))
      })
    }
    else {
      setBoundaries({
        ...boundaries,
        maxX: value
      })
    }
  }
  const handleXLowerBoundChange = (event) => {
    const { value } = event.target
    if ((value <= 0 && isXLog) || (value > extremeBoundaries.minX)) {
      setBoundaries({
        ...boundaries,
        minX: (Math.floor(extremeBoundaries.minX))
      })
    }
    else {
      setBoundaries({
        ...boundaries,
        minX: value
      })
    }
  }

  const handleYUpperBoundChange = (event) => {
    const { value } = event.target
    if ((value < extremeBoundaries.maxY)) {
      setBoundaries({
        ...boundaries,
        maxY: (Math.ceil(extremeBoundaries.maxY))
      })
    }
    else {
      setBoundaries({
        ...boundaries,
        maxY: value
      })
    }
  }
  const handleYLowerBoundChange = (event) => {
    const { value } = event.target
    if ((value <= 0 && isYLog) || (value > extremeBoundaries.minY)) {
      setBoundaries({
        ...boundaries,
        minY: (Math.floor(extremeBoundaries.minY))
      })
    }
    else {
      setBoundaries({
        ...boundaries,
        minY: value
      })
    }
  }

  const active = [null, null, null, null]

  const ref = React.useRef(null)

  const getScale = (isLog, rangeFrom, rangeTo) => {
    let scale
    if (isLog) {
      scale = d3.scaleLog().domain([1, 10])
    }
    else {
      scale = d3.scaleLinear().domain([0, 10])
    }
    return scale.range([rangeTo, rangeFrom]).nice()
  }

  React.useEffect(() => {
    //cleans up all the points from the graph
    d3.select(ref.current).selectAll("*").remove()
    //This part creates the canvas for our graph
    const svg = d3.select(ref.current) // FIX WARNING "Warning: A string ref, "canvas", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://fb.me/react-strict-mode-string-ref"
      .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    //This part creates the axis/scales used for the data.
    const xScale = getScale(isXLog, width, 0)
    xScale.domain([boundaries.minX, boundaries.maxX])
    const yScale = getScale(isYLog, 0, height)
    yScale.domain([boundaries.minY, boundaries.maxY])
    //Calls the function to create the axis
    const xAxis = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
    const yAxis = svg.append("g")
      .call(d3.axisLeft(yScale))

    //This part creates an area where points will not be drawn if they are not within this area.
    svg.append("defs").append("SVG:clipPath")
      .attr("id", "clip")
      .append("SVG:rect")
      .attr("width", width)
      .attr("height", height)
      .attr("x", 0)
      .attr("y", 0)

    //This allows the user to zoom in/out onto the graph.
    const zoom = d3.zoom()
      .scaleExtent([1, 10])
      .extent([[0, 0], [width, height]])
      .translateExtent([[0, 0], [width, height]])
      .on("zoom", updateGraph)
    //This rectangle is the area in which the user can zoom into.
    svg.append("rect")
      .attr("fill", "none")
      .attr("width", width)
      .attr("height", height)
      .style("pointer-events", "all")
      .call(zoom)

    //This is the part that creates the points
    const scatter = svg.append("g")
      .attr("clip-path", "url(#clip)")

    scatter
      //the myDots is a unique name, this is to refer to these dots.
      .selectAll("myDots")
      //Datalist is the list of list of points, the enter creates a loop through each one.
      .data(datalist)
      .enter()
      .append('g')
      //This gives each list of points a different colour, verifies if its in the list and changes it if it is
      .attr("fill", function (d) {
        const x = datalist.indexOf(d)
        return colourslist[x]
      })
      .attr("id", function (d) {
        const x = datalist.indexOf(d)
        return "id" + IDList[x]
      })
      .attr("stroke", "black")
      .attr("stroke-width", 2)

      //This is for the inner list (dataset1, etc). again, the myPoints is a unique name
      .selectAll("myDots")
      .data(function (d): any {
        return d
      })
      .enter()
      .append("circle")
      .style("opacity", 1)
      .attr("r", 10)
      //This gives the value of the x position
      .attr("cx", function (d) {
        return xScale(d["x"])
      })
      //this gives the value of the y position
      .attr("cy", function (d) {
        return yScale(d["y"])
      })
      // This allows us to change the opacity of a dot on click.
      .on("click", function () {
        const opacity = d3.select(this).style('opacity')
        if (opacity == '0.5') {
          d3.select(this).style('opacity', 1)
        }
        else {
          d3.select(this).style('opacity', 0.5)
        }
      })

    //Legend on the graph
    svg.selectAll()
      .data(datalist)
      .enter()
      //linking an image to be part of the legend instead of a circle
      .append('image')
      .attr('xlink:href', "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/eye-24-512.png")
      .attr('width', 20)
      .attr('height', 20)
      .attr("x", 600)
      .attr("y", function (d, i) { return 290 + i * 25 }) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("r", 7)
      .attr("id", function (d) {
        const x = datalist.indexOf(d)
        return "legenddotid" + IDList[x]
      })
      //An option to make the legend hide and show datasets when clicked on.
      .on("click", function (d) {
        const x = datalist.indexOf(d)
        scatter
          .selectAll("#id" + IDList[x])
          .style("opacity", function () {
            if (active[x] == null) {
              active[x] = !d3.select(this).style('opacity') ? 1 : 0
            }
            else {
              active[x] = !active[x] ? 1 : 0
            }
            return active[x]
          })
        //This will change the icon when the datasets are hidden or visible
        svg
          .selectAll("#legenddotid" + IDList[x])
          .attr("xlink:href", function () {
            if (active[x] == 0) {
              return "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJ9809ku1l9OC6QM7kT2UimZhtywkCrB_0aQ&usqp=CAU"
            }
            else {
              return "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/eye-24-512.png"
            }
          })
      })

    //The name labels for the datasets mentioned in the legend
    svg.selectAll()
      .data(datalist)
      .enter()
      .append("text")
      .attr("x", 625)
      .attr("y", function (d, i) { return 300 + i * 25 }) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("fill", function (d) {
        const x = datalist.indexOf(d)
        return colourslist[x]
      })
      .text(function (d) {
        const x = datalist.indexOf(d)
        return "dataset" + IDList[x]
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")


    //This function modifies the graph upon zooming in/out by updating the axes and points.
    function updateGraph() {
      const newXScale = d3.event.transform.rescaleX(xScale)
      xAxis.call(d3.axisBottom(newXScale))
      scatter
        .selectAll("circle")
        .attr('cx', function (d) { return (newXScale(d["x"])) })

      const newYScale = d3.event.transform.rescaleY(yScale)
      yAxis.call(d3.axisLeft(newYScale))
      scatter
        .selectAll("circle")
        .attr('cy', function (d) { return (newYScale(d["y"])) })
    }
  }, [props, isXLog, isYLog, boundaries])

  return (
    <>
      <svg
        ref={ref}
        width={outerWidth}
        height={outerHeight}
        viewBox={`0 0 ${outerWidth} ${outerHeight}`}
        preserveAspectRatio="xMidYMid meet"
        id='graph'
      />
      <div>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Button id='settingsToggle' variant="contained" onClick={handleSettingsClick} color="primary">Settings
              {showSettings ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Button>
          </Grid>
          {showSettings &&
            <>
              <Grid item xs={4}>
                <Button size="small" id='btn1' variant="contained" onClick={handleXScaleClick} color="primary">Change X Scale</Button>
              </Grid>
              <Grid item xs={4}>
                <TextField size="small" id="xLowerBound" variant="outlined" value={boundaries.minX} type="number" label="X Lower Bound" onChange={handleXLowerBoundChange} />
              </Grid>
              <Grid item xs={4}>
                <TextField size="small" id="xUpperBound" variant="outlined" value={boundaries.maxX} type="number" label="X Upper Bound" onChange={handleXUpperBoundChange} />
              </Grid>
              <Grid item xs={4}>
                <Button size="small" id='btn2' variant="contained" onClick={handleYScaleClick} color="primary">Change Y Scale</Button>
              </Grid>
              <Grid item xs={4}>
                <TextField size="small" id="yLowerBound" variant="outlined" value={boundaries.minY} type="number" label="Y Lower Bound" onChange={handleYLowerBoundChange} />
              </Grid>
              <Grid item xs={4}>
                <TextField size="small" id="yUpperBound" variant="outlined" value={boundaries.maxY} type="number" label="Y Upper Bound" onChange={handleYUpperBoundChange} />
              </Grid>
            </>
          }
        </Grid>
      </div>
    </>
  )
}