import * as d3 from "d3"

import React, { useEffect } from 'react'

import { SvgIcon } from '@material-ui/core';

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
  let xScale, yScale, xAxis, yAxis

  let active1 = null, active2 = null, active3 = null, active4 = null

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


        var button = svg.append("circle").attr("r", 20).attr("fill", "#f20b34");
       

    //This part creates the axis/scales used for the data.

    xScale = d3.scaleLinear()
      .domain([0, 10])
      .range([0, width]).nice();
    xAxis = svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    yScale = d3.scaleLinear()
      .domain([0, 10])
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
        .attr("id", function (d) {
            var x = props.datalist.indexOf(d)
                ;
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
        

    //Legend on the graph

    svg.selectAll("mylegendDots")
        .data(props && props.datalist)
      .enter()
      .append("circle")
      .attr("cx", 615)
      .attr("cy", function (d, i) { return 300 + i * 25 }) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
      .attr("fill", function (d) {
        var x = props.datalist.indexOf(d);
        return props.colourslist[x];
      })

        //I have been trying to click anything with no luck, on online examples it's working
        //but here it is not, I am not sure if it is because we show these legends after
        //pressing a button or why.

        /*
        .on('click', function (d, i) {
            console.log("clicking on");
            d3.select(this)
            .attr('r', 40);
        })
        */
            /*
            var active = null
            var x = props.datalist.indexOf(d);
            var y = "id" + props.IDList[x];
            scatter
                .selectAll("#" + y)
                .style("opacity", function () {

                    if (active == null) {
                        active = !d3.select(this).style('opacity') ? 1 : 0;
                    }
                    else {
                        active = !active ? 1 : 0;
                    }
                    return active;
                })
            console.log(active)
            d.active = active
            console.log(active)
            */
        
        

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
        /*
        .attr("id", function (d) {
            var x = props.datalist.indexOf(d)
                ;
            return "id" + props.IDList[x];
        })
        */
      //.text(function (d) { return d })
      .text("Dataset")
      .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        /*
        .on('click', function (d) {
            console.log("nananan");
            d3.select(this)
                .attr('x', 650);
        })
        */
        
/*
        .on("click", function (d) {
            alert("hello how are you");
            
            var active = null
            var x = props.datalist.indexOf(d);
            var y = "id" + props.IDList[x];
            scatter
                .selectAll("#" + y)
                .style("opacity", function () {

                    if (active == null) {
                        active = !d3.select(this).style('opacity') ? 1 : 0;
                    }
                    else {
                        active = !active ? 1 : 0;
                    }
                    return active;
                })
            console.log(active)
            d.active = active
            console.log(active)
            
        })

*/
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

        button.on("click", function (d) {
            scatter
                .selectAll("#id1")
                .style("opacity", function () {
                    if (active1 == null) {
                        active1 = !d3.select(this).style('opacity') ? 1 : 0;
                    }
                    else {
                        active1 = !active1 ? 1 : 0;
                    }
                    return active1;
                })
        })

    //This function modifies the graph upon zooming in/out by updating the axes and points.
    function updateGraph() {
      var newX = d3.event.transform.rescaleX(xScale);
      var newY = d3.event.transform.rescaleY(yScale);

      xAxis.call(d3.axisBottom(newX))
      yAxis.call(d3.axisLeft(newY))

      scatter
        .selectAll("circle")
        .attr('cx', function (d) { return newX(d["x"]) })
        .attr('cy', function (d) { return newY(d["y"]) });
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