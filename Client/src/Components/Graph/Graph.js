import * as d3 from "d3"

import React, { useEffect, useState } from 'react'

import { Button } from "@material-ui/core"

export default function Graph(props) {

  const margin = {
    top: 50,
    right: 70,
    bottom: 50,
    left: 70
  },
    outerWidth = props && props.outerWidth || 768,
    outerHeight = props && props.outerHeight || 500,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom

  const [isXLog, setXToggle] = useState(false)
  const [isYLog, setYToggle] = useState(false)

  const handleXScaleClick = () => {
    setXToggle(!isXLog)
  }

  const handleYScaleClick = () => {
    setYToggle(!isYLog)
  }

  let active1 = null, active2 = null, active3 = null, active4 = null
  let active = [null, null, null, null]

  const ref = React.useRef(null)
  const changeX = React.useRef(null)
  const changeY = React.useRef(null)

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

  useEffect(() => {
    //cleans up all the points from the graph
    d3.select(ref.current).selectAll("*").remove()
    //This part creates the canvas for our graph
    var svg = d3.select(ref.current) // FIX WARNING "Warning: A string ref, "canvas", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://fb.me/react-strict-mode-string-ref"
      .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //This part creates the axis/scales used for the data.
    const xScale = getScale(isXLog, width, 0)
    const yScale = getScale(isYLog, 0, height)

    //Calls the function to create the axis
    const xAxis = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));
    const yAxis = svg.append("g")
      .call(d3.axisLeft(yScale));

    //This part creates an area where points will not be drawn if they are not within this area.
    var clip = svg.append("defs").append("SVG:clipPath")
      .attr("id", "clip")
      .append("SVG:rect")
      .attr("width", width)
      .attr("height", height)
      .attr("x", 0)
      .attr("y", 0);

    //This is the part that creates the points
    var scatter = svg.append("g")
      .attr("clip-path", "url(#clip)");

    scatter
      //the myDots is a unique name, this is to refer to these dots.
      .selectAll("myDots")
      //Datalist is the list of list of points, the enter creates a loop through each one.
      .data(props && props.datalist)
      .enter()
      .append('g')
      //This gives each list of points a different colour, verifies if its in the list and changes it if it is
      .attr("fill", function (d) {
        var x = props.datalist.indexOf(d);
        return props.colourslist[x];
      })
      .attr("id", function (d) {
        var x = props.datalist.indexOf(d);
        return "id" + props.IDList[x];
      })
      .attr("stroke", "black")
      .attr("stroke-width", 2)

      //This is for the inner list (dataset1, etc). again, the myPoints is a unique name
      .selectAll("myPoints")
      .data(function (d) {
        return d;
      })
      .enter()
      .append("circle")
      .style("opacity", 1)
      .attr("r", 10)
      //This gives the value of the x position
      .attr("cx", function (d) {
        return xScale(d["x"]);
      })
      //this gives the value of the y position
      .attr("cy", function (d) {
        return yScale(d["y"]);
      })

    //This allows the user to zoom in/out onto the graph.
    var zoom = d3.zoom()
      .scaleExtent([1, 20])
      .extent([[0, 0], [width, height]])
      .on("zoom", updateGraph);
    //This rectangle is the area in which the user can zoom into.
    svg.append("rect")
      .attr("fill", "none")
      .attr("width", width)
      .attr("height", height)
      .style("pointer-events", "all")
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .call(zoom)

    //Legend on the graph
    svg.selectAll("mylegendDots")
      .data(props && props.datalist)
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
        var x = props.datalist.indexOf(d);
        return "legenddotid" + props.IDList[x];
      })
      //An option to make the legend hide and show datasets when clicked on.
      .on("click", function (d) {
        var x = props.datalist.indexOf(d);
        scatter
          .selectAll("#id" + props.IDList[x])
          .style("opacity", function () {
            if (active[x] == null) {
              active[x] = !d3.select(this).style('opacity') ? 1 : 0;
            }
            else {
              active[x] = !active[x] ? 1 : 0;
            }
            return active[x];
          })
        //This will change the icon when the datasets are hidden or visible
        svg
          .selectAll("#legenddotid" + props.IDList[x])
          .attr("xlink:href", function () {
            if (active[x] == 0) {
              return "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJ9809ku1l9OC6QM7kT2UimZhtywkCrB_0aQ&usqp=CAU";
            }
            else {
              return "https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/eye-24-512.png";
            }
          })
      })

    //The name labels for the datasets mentioned in the legend
    svg.selectAll("mylabels")
      .data(props && props.datalist)
      .enter()
      .append("text")
      .attr("x", 625)
      .attr("y", function (d, i) { return 300 + i * 25 }) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("fill", function (d) {
        var x = props.datalist.indexOf(d);
        return props.colourslist[x];
      })
      .text(function (d) {
        var x = props.datalist.indexOf(d);
        return "dataset" + props.IDList[x];
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")

    //delete icon to delete the data
    svg.selectAll("deleteIcon")
      .data(props && props.datalist)
      .enter()
      .append("text")
      .attr("x", 560)
      .attr("y", function (d, i) { return 305 + i * 25 }) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("fill", '#69a3b2')
      .text("delete")



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
  }, [props, isXLog, isYLog])

  function removeDatasets() {

  }

  function removeDatasets() {

  }

  return (
    <>
      <svg
        ref={ref}
        width={outerWidth}
        height={outerHeight}
        viewBox={`0 0 ${outerWidth} ${outerHeight}`}
        preserveAspectRatio="xMidYMid meet">
      </svg>
      <div>
        <Button onClick={handleXScaleClick} color="primary">Change X Scale</Button>
        <Button onClick={handleYScaleClick} color="primary">Change Y Scale</Button>
      </div>
    </>
  )
}