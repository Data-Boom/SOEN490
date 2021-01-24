import * as am4charts from "@amcharts/amcharts4/charts"
import * as am4core from "@amcharts/amcharts4/core"

import React, { useEffect, useState } from 'react'

import { Box } from "@material-ui/core"
import { IAxisStateModel } from "../../Models/Graph/IGraphStateModel"
import { IGraphDatasetModel } from "../../Models/Graph/IGraphDatasetModel"
import am4themes_material from "@amcharts/amcharts4/themes/animated"

interface IProps {
  datasets: IGraphDatasetModel[],
  initialAxes: IAxisStateModel[]
}

am4core.useTheme(am4themes_material)

export default function Graph(props: IProps) {
  const { datasets, initialAxes } = { ...props }
  const [chart, setChart] = useState<am4charts.XYChart>(null)

  useEffect(() => setUpGraph(), [])
  useEffect(() => rebuildGraph(), [datasets])

  const rebuildGraph = () => {
    if (chart) {
      chart.data = buildDataForGraph(datasets)
    }
  }

  const addSeries = (chart) => {
    datasets.forEach(dataset => {
      const lineSeries = chart.series.push(new am4charts.CandlestickSeries())
      const bullet = lineSeries.bullets.push(new am4charts.CircleBullet())
      lineSeries.tooltipText = dataset.name
      lineSeries.dataFields.valueX = `${dataset.id}x`
      lineSeries.dataFields.valueY = `${dataset.id}y`
    })
  }

  const buildDataForGraph = (datasets: IGraphDatasetModel[]): any[] => {
    const data = []
    for (let datasetIndex = 0; datasetIndex < datasets.length; datasetIndex++) {
      const dataset = datasets[datasetIndex]
      mergeDatasetPoints(dataset, data)
    }

    return data
  }

  const mergeDatasetPoints = (dataset: IGraphDatasetModel, data: any[]) => {
    if (!dataset || dataset.isHidden) {
      return
    }
    //for all current dataset points:
    for (let pointIndex = 0; pointIndex < dataset.points.length; pointIndex++) {
      //create new point that has previous points info and this one's
      const mergedPoint = { ...data[pointIndex], [`${dataset.id}x`]: dataset.points[pointIndex].x, [`${dataset.id}y`]: dataset.points[pointIndex].y }
      data[pointIndex] = mergedPoint
    }
  }

  const subscribeToChartEvents = (chart: am4charts.XYChart, xAxis: am4charts.Axis, yAxis: am4charts.Axis) => {
    chart.events.on("ready", function () {
      //todo zoom to values or indeces?
      initialAxes[0].zoomStartIndex &&
        initialAxes[0].zoomEndIndex &&
        xAxis.zoomToIndexes(initialAxes[0].zoomStartIndex, initialAxes[0].zoomEndIndex)

      initialAxes[1].zoomStartIndex &&
        initialAxes[1].zoomEndIndex &&
        yAxis.zoomToIndexes(initialAxes[1].zoomStartIndex, initialAxes[1].zoomEndIndex)
    })
  }

  const setUpGraph = () => {
    const chart = am4core.create("chartdiv", am4charts.XYChart)
    chart.data = buildDataForGraph(datasets)

    const xAxis = chart.xAxes.push(new am4charts.ValueAxis())
    xAxis.title.text = `${initialAxes[0].variableName}, ${initialAxes[0].units}`
    xAxis.logarithmic = initialAxes[0].logarithmic || false
    xAxis.renderer.minGridDistance = 40

    const yAxis = chart.yAxes.push(new am4charts.ValueAxis())
    yAxis.logarithmic = initialAxes[1].logarithmic || false
    yAxis.title.text = `${initialAxes[1].variableName}, ${initialAxes[1].units}`

    chart.scrollbarX = new am4core.Scrollbar()
    chart.scrollbarY = new am4core.Scrollbar()
    chart.cursor = new am4charts.XYCursor()
    chart.exporting.menu = new am4core.ExportMenu()
    addSeries(chart)
    setChart(chart)
    subscribeToChartEvents(chart, xAxis, yAxis)
  }

  return (
    <>
      <Box id="chartdiv" width='100%' height='750px'>
      </Box>
    </>
  )
}