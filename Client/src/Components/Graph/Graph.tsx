import * as am4charts from "@amcharts/amcharts4/charts"
import * as am4core from "@amcharts/amcharts4/core"

import React, { useEffect, useState } from 'react'

import { Box } from "@material-ui/core"
import { IAxisStateModel } from "../../Models/Graph/IGraphStateModel"
import { IGraphDatasetModel } from "../../Models/Graph/IGraphDatasetModel"
import am4themes_material from "@amcharts/amcharts4/themes/animated"

interface IProps {
  datasets: IGraphDatasetModel[],
  axes: IAxisStateModel[]
}

am4core.useTheme(am4themes_material)

export default function Graph(props: IProps) {
  const { datasets, axes } = { ...props }
  const [chart, setChart] = useState<am4charts.XYChart>(null)
  const [xAxis, setXAxis] = useState<am4charts.Axis>(null)
  const [yAxis, setYAxis] = useState<am4charts.Axis>(null)

  useEffect(() => setUpGraph(), [])
  useEffect(() => rebuildGraph(), [datasets])

  const rebuildGraph = () => {
    //rebuild only if both variables are selected
    if (chart && axes[0].variableName && axes[1].variableName && axes[0].units && axes[1].units) {
      chart.data = buildDataForGraph(datasets)
      updateAxis(xAxis, yAxis)
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
      axes[0].zoomStartIndex &&
        axes[0].zoomEndIndex &&
        xAxis.zoomToIndexes(axes[0].zoomStartIndex, axes[0].zoomEndIndex)

      axes[1].zoomStartIndex &&
        axes[1].zoomEndIndex &&
        yAxis.zoomToIndexes(axes[1].zoomStartIndex, axes[1].zoomEndIndex)
    })
  }

  const updateAxis = (xAxis, yAxis) => {
    xAxis.title.text = `${axes[0].variableName}, ${axes[0].units}`
    xAxis.logarithmic = axes[0].logarithmic || false
    xAxis.renderer.minGridDistance = 40

    yAxis.logarithmic = axes[1].logarithmic || false
    yAxis.title.text = `${axes[1].variableName}, ${axes[1].units}`
  }

  const setUpGraph = () => {
    const chart = am4core.create("chartdiv", am4charts.XYChart)
    chart.data = buildDataForGraph(datasets)

    const xAxis = chart.xAxes.push(new am4charts.ValueAxis())
    const yAxis = chart.yAxes.push(new am4charts.ValueAxis())
    updateAxis(xAxis, yAxis)

    chart.scrollbarX = new am4core.Scrollbar()
    chart.scrollbarY = new am4core.Scrollbar()
    chart.cursor = new am4charts.XYCursor()
    chart.exporting.menu = new am4core.ExportMenu()
    addSeries(chart)

    setChart(chart)
    setXAxis(xAxis)
    setYAxis(yAxis)
    subscribeToChartEvents(chart, xAxis, yAxis)
  }

  return (
    <>
      <Box id="chartdiv" width='100%' height='750px'>
      </Box>
    </>
  )
}