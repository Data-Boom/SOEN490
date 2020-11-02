import React, { Component } from 'react'
import * as d3 from "d3"

//Global variables for graph creation

var margin = {
    top: 50,
    right: 210,
    bottom: 50,
    left: 70
},
    outerWidth = 1050,
    outerHeight = 500,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

var xScale, yScale, xAxis, yAxis;

//This function creates the basis for the linear x and y axis
function startLinear() {
    xScale = d3.scaleLinear()
        .range([0, width]).nice();

    yScale = d3.scaleLinear()
        .range([height, 0]).nice();

    xScale.domain([0, 10]);
    yScale.domain([0, 10]);

    xAxis = d3.axisBottom()
        .scale(xScale)
        .tickSize(-height);

    yAxis = d3.axisLeft()
        .scale(yScale)
        .tickSize(-width);

}

//sample datasets to try, just needs to gather from the backend instead.
var dataset1 = [{ x: 5.1, y: 3.5 }, { x: 4.9, y: 3 }, { x: 4.7, y: 3.2 }, { x: 4.6, y: 3.1 }, { x: 5, y: 3.6 }, { x: 5.4, y: 3.9 }]
var dataset2 = [{ x: 3, y: 8 }, { x: 9, y: 7 }, { x: 1, y: 3 }, { x: 2, y: 4 }, { x: 8, y: 1 }]
var dataset3 = [{ x: 7, y: 6 }, { x: 2, y: 5 }, { x: 7, y: 9 }, { x: 4, y: 1 }, { x: 6, y: 7 }]
var dataset4 = [{ x: 3, y: 7 }, { x: 1, y: 9 }, { x: 8, y: 7 }, { x: 1, y: 4 }, { x: 8, y: 5 }]
//Datalist is the list fed to the graphCreation
var datalist = []
var colourslist = []
datalist.push(dataset1)
datalist.push(dataset2)
datalist.push(dataset3)
datalist.push(dataset4)

class Graph extends Component {
    componentDidMount() {
        this.graphCreation(datalist)
    }
    graphCreation(datalist) {
        //Calls the function to create the axis
        startLinear();
        //This part creates the canvas for our graph
        var svg = d3.select(this.refs.canvas) // FIX WARNING "Warning: A string ref, "canvas", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://fb.me/react-strict-mode-string-ref"
            .append("svg")
            .attr("width", 1050)
            .attr("height", 500)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        //This part creates the rectangle for the inner graph
        svg.append("rect")
            .attr("fill", "none")
            .attr("width", width)
            .attr("height", height);
        //This creates the top line by making a basic line and moving it to the top (translating), and then calls the already created
        //xAxis which is all the ticks and the texts, then puts it on the bottom of the rectangle   
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .classed("label", true)
            .attr("x", width)
            .attr("y", margin.bottom - 10)
            .attr("fill", "black")
            .style("text-anchor", "end")
            .text("x axis");
        //Same as the x axis but instead for the y axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .classed("label", true)
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left)
            .attr("dy", "1.5em")
            .attr("fill", "black")
            .style("text-anchor", "end")
            .text("y axis");
        //This is the part that creates the points
        svg.append("g")
            //the myDots is a unique name, this is to refer to these dots.
            .selectAll("myDots")
            //Datalist is the list of list of points, the enter creates a loop through each one.
            .data(datalist)
            .enter()
            .append('g')
            //This gives each list of points a different colour, verifies if its in the list and changes it if it is
            .attr("fill", function () {
                var c = "hsl(" + Math.random() * 360 + ",100%,50%)";
                while (colourslist.includes(c)) {
                    c = "hsl(" + Math.random() * 360 + ",100%,50%)";
                };
                return c;
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
    }
    render() { return <div ref="canvas"></div> }
}
export default Graph