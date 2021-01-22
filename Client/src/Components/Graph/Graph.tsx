import * as am4charts from "@amcharts/amcharts4/charts"
import * as am4core from "@amcharts/amcharts4/core"

import React, { useEffect, useState } from 'react'

import { Box } from "@material-ui/core"
import { IDataPointExtremes } from "../../Models/Graph/IDataPointExtremes"
import { IGraphDatasetModel } from "../../Models/Datasets/IGraphDatasetModel"
import am4themes_material from "@amcharts/amcharts4/themes/animated"

interface IProps {
  outerHeight: number,
  outerWidth: number,
  datasets: IGraphDatasetModel[],
  extremeBoundaries: IDataPointExtremes
}

am4core.useTheme(am4themes_material)

export default function Graph(props: IProps) {

  const [chart, setChart] = useState<any>(null)

  useEffect(() => {
    setUpGraph()
    return () => {
      chart.dispose()
    }
  }, [])

  const setUpGraph = () => {
    const chart = am4core.create(
      "chartdiv",
      am4charts.XYChart
    )

    // chart.data = [{
    //   "ax": 1,
    //   "ay": 0.5,
    //   "bx": 1,
    //   "by": 2.2
    // }, {
    //   "ax": 2,
    //   "ay": 1.3,
    //   "bx": 2,
    //   "by": 4.9
    // }, {
    //   "ax": 3,
    //   "ay": 2.3,
    //   "bx": 3,
    //   "by": 5.1
    // }, {
    //   "ax": 4,
    //   "ay": 2.8,
    //   "bx": 4,
    //   "by": 5.3
    // }, {
    //   "ax": 5,
    //   "ay": 3.5,
    //   "bx": 5,
    //   "by": 6.1
    // }, {
    //   "ax": 6,
    //   "ay": 5.1,
    //   "bx": 6,
    //   "by": 8.3
    // }, {
    //   "ax": 7,
    //   "ay": 6.7,
    //   "bx": 7,
    //   "by": 10.5
    // }, {
    //   "ax": 8,
    //   "ay": 8,
    //   "bx": 8,
    //   "by": 12.3
    // }, {
    //   "ax": 9,
    //   "ay": 8.9,
    //   "bx": 9,
    //   "by": 14.5
    // }, {
    //   "ax": 10,
    //   "ay": 9.7,
    //   "bx": 10,
    //   "by": 15
    // }, {
    //   "ax": 11,
    //   "ay": 10.4,
    //   "bx": 11,
    //   "by": 18.8
    // }, {
    //   "ax": 12,
    //   "ay": 11.7,
    //   "bx": 12,
    //   "by": 19
    // }]

    // const valueAxisX = chart.xAxes.push(new am4charts.ValueAxis())
    // valueAxisX.title.text = 'X Axis'
    // valueAxisX.renderer.minGridDistance = 40

    // const valueAxisY = chart.yAxes.push(new am4charts.ValueAxis())
    // valueAxisY.title.text = 'Y Axis'
    // // Create series
    // const lineSeries = chart.series.push(new am4charts.LineSeries())
    // const bullet = lineSeries.bullets.push(new am4charts.CircleBullet())
    // lineSeries.dataFields.valueY = "ay"
    // lineSeries.dataFields.valueX = "ax"
    // lineSeries.tooltipText = "X: {valueX} / Y: {valueY}"

    // const lineSeries2 = chart.series.push(new am4charts.LineSeries())
    // const bullet2 = lineSeries2.bullets.push(new am4charts.CircleBullet())
    // lineSeries2.dataFields.valueY = "by"
    // lineSeries2.dataFields.valueX = "bx"
    // lineSeries2.tooltipText = "X: {valueX} / Y: {valueY}"

    // // Scrollbars
    // chart.scrollbarX = new am4core.Scrollbar()
    // chart.scrollbarY = new am4core.Scrollbar()

    // // Add cursor and series tooltip support
    // chart.cursor = new am4charts.XYCursor()

    // am4charts.ValueAxis.prototype.getSeriesDataItem = function (series, position) {
    //   const key = this.axisFieldName + this.axisLetter
    //   const value = this.positionToValue(position)
    //   const dataItem = series.dataItems.getIndex(series.dataItems.findClosestIndex(value, function (x) {
    //     return x[key] ? x[key] : undefined
    //   }, "any"))
    //   return dataItem
    // }
    chart.paddingRight = 20

    const data = []
    let visits = 10
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10)
      data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits })
    }

    chart.data = data

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.tooltip.disabled = true
    valueAxis.renderer.minWidth = 35

    const series = chart.series.push(new am4charts.LineSeries())
    series.dataFields.dateX = "date"
    series.dataFields.valueY = "value"

    series.tooltipText = "{valueY.value}"
    chart.cursor = new am4charts.XYCursor()

    const scrollbarX = new am4charts.XYChartScrollbar()
    scrollbarX.series.push(series)
    chart.scrollbarX = scrollbarX

    setChart(chart)
  }

  return (
    <>
      <Box id="chartdiv" width='100%' height='750px'>
      </Box>
    </>
  )
}