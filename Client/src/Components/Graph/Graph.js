import * as d3 from "d3"

import React, { useEffect } from 'react'
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
  let xScale, yScale, xAxis, yAxis, xLog, yLog
  var xToggle = false, yToggle = false;
  const ref = React.useRef(null)

  useEffect(() => {
    //Calls the function to create the axis
    //This part creates the canvas for our graph
    d3.select(ref.current).selectAll("*").remove()
    var svg = d3.select(ref.current) // FIX WARNING "Warning: A string ref, "canvas", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://fb.me/react-strict-mode-string-ref"
      .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //This part creates the axis/scales used for the data.
    xScale = d3.scaleLinear()
      .domain([0, 10])
      .range([0, width]).nice();
    xLog = d3.scaleLog()
      .range([0, width]).nice();
    xAxis = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));
    yScale = d3.scaleLinear()
      .domain([0, 10])
      .range([height, 0]).nice();
    yLog = d3.scaleLog()
      .range([height, 0]).nice();
    yAxis = svg.append("g")
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
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      //This is for the inner list (dataset1, etc). again, the myPoints is a unique name
      .selectAll("myPoints")
      .data(function (d) {
        return d;
      })
      .enter()
      .append("circle")
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
      .call(zoom);

    // These buttons allow the graph to switch between logarithmic scales and linear scales for each axis.
    var xButton = svg.append("circle").attr("r", 10).attr("fill", "#f20b34").attr("cx", width).attr("cy", height).on("click", function (d) {
      xToggle = !xToggle;
      if (xToggle == true) {
        xAxis.call(d3.axisBottom(xLog))
        scatter
          .selectAll("circle")
          .attr('cx', function (d) { return xLog(d["x"]) })
      }
      else {
        xAxis.call(d3.axisBottom(xScale))
        scatter
          .selectAll("circle")
          .attr('cx', function (d) { return xScale(d["x"]) })
      }
    });
    var yButton = svg.append("circle").attr("r", 10).attr("fill", "#f20b34").on("click", function (d) {
      yToggle = !yToggle;
      if (yToggle == true) {
        yAxis.call(d3.axisLeft(yLog))
        scatter
          .selectAll("circle")
          .attr('cy', function (d) { return yLog(d["y"]) })
      }
      else {
        yAxis.call(d3.axisLeft(yScale))
        scatter
          .selectAll("circle")
          .attr('cy', function (d) { return yScale(d["y"]) })
      }
    });
    //This function modifies the graph upon zooming in/out by updating the axes and points.
    function updateGraph() {
      if (xToggle == true) {
        var newX = d3.event.transform.rescaleX(xLog);
        xAxis.call(d3.axisBottom(newX))
        scatter
          .selectAll("circle")
          .attr('cx', function (d) { return newX(d["x"]) })
      }
      else {
        var newX = d3.event.transform.rescaleX(xScale);
        xAxis.call(d3.axisBottom(newX))
        scatter
          .selectAll("circle")
          .attr('cx', function (d) { return newX(d["x"]) })
      }
      if (yToggle == true) {
        var newY = d3.event.transform.rescaleY(yLog);
        yAxis.call(d3.axisLeft(newY))

        scatter
          .selectAll("circle")
          .attr('cy', function (d) { return newY(d["y"]) });
      }
      else {
        var newY = d3.event.transform.rescaleY(yScale);
        yAxis.call(d3.axisLeft(newY))

        scatter
          .selectAll("circle")
          .attr('cy', function (d) { return newY(d["y"]) });
      }
    }
  }, [props])

  return (
    <svg
      ref={ref}
      width={outerWidth}
      height={outerHeight}
      viewBox={`0 0 ${outerWidth} ${outerHeight}`}
      preserveAspectRatio="xMidYMid meet">
    </svg>
  )
}