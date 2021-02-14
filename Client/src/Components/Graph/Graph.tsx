import * as am4charts from "@amcharts/amcharts4/charts"
import * as am4core from "@amcharts/amcharts4/core"

import React, { useEffect, useRef } from 'react'

import { Box } from "@material-ui/core"
import { IAxisStateModel } from "../../Models/Graph/IGraphStateModel"
import { IGraphDatasetModel } from "../../Models/Graph/IGraphDatasetModel"
import am4themes_material from "@amcharts/amcharts4/themes/animated"

interface IProps {
  datasets: IGraphDatasetModel[],
  axes: IAxisStateModel[]
}

am4core.useTheme(am4themes_material)

const getSeriesName = (dataset: IGraphDatasetModel) => {
  return `${dataset.id}`
}

export default function Graph(props: IProps) {
  const { datasets, axes } = { ...props }
  const chartRef = useRef<am4charts.XYChart>()

  useEffect(() => initiateGraph(), [])
  useEffect(() => chartRef.current && syncGraphData(), [datasets])

  const syncGraphData = () => {
    const xAxis = chartRef.current.xAxes.getIndex(0)
    const yAxis = chartRef.current.yAxes.getIndex(0)
    console.log(chartRef.current.xAxes, 'undef')
    updateAxis(xAxis, yAxis)
    addSeries(chartRef.current)
    console.log(chartRef.current.series, 'series')
  }

  const addSeries = (chart: am4charts.XYChart) => {
    console.log("🚀 ~ file: Graph.tsx ~ line 40 ~ addSeries ~ datasets", datasets)
    datasets.forEach(dataset => {
      const datasetSeriesIndex = chart.series.values.findIndex(series => series.name == getSeriesName(dataset))
      //ensures that a series was only added once to optimize perfomance
      if (datasetSeriesIndex === -1) {
        const lineSeries = chart.series.push(new am4charts.CandlestickSeries())
        const bullet = lineSeries.bullets.push(new am4charts.CircleBullet())
        //todo make tooltip nice
        bullet.tooltipText = `${dataset.name}
        ${axes[0].variableName}: {${dataset.id}x} ${axes[0].units}
        ${axes[1].variableName}: {${dataset.id}y} ${axes[1].units}`

        lineSeries.dataFields.valueX = `${dataset.id}x`
        lineSeries.dataFields.valueY = `${dataset.id}y`
        lineSeries.name = getSeriesName(dataset)
        lineSeries.data = []
        mergeDatasetPoints(dataset, lineSeries.data)
      }
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
    console.log(dataset.points, 'dataset.points')
    for (let pointIndex = 0; pointIndex < dataset.points.length; pointIndex++) {
      //create new point that has previous points info and this one's
      const mergedPoint = { ...data[pointIndex], [`${dataset.id}x`]: dataset.points[pointIndex].x, [`${dataset.id}y`]: dataset.points[pointIndex].y }
      console.log(mergedPoint, 'mergedPoint')
      data[pointIndex] = mergedPoint
    }
    console.log(data, 'data')
  }

  const subscribeToChartEvents = (chart: am4charts.XYChart, xAxis: am4charts.Axis, yAxis: am4charts.Axis) => {
    chart.events.on("ready", function () {
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

  const initiateGraph = () => {
    chartRef.current = am4core.create("chartdiv", am4charts.XYChart)

    chartRef.current.scrollbarX = new am4core.Scrollbar()
    chartRef.current.scrollbarY = new am4core.Scrollbar()
    chartRef.current.cursor = new am4charts.XYCursor()
    chartRef.current.exporting.menu = new am4core.ExportMenu()

    const xAxis = chartRef.current.xAxes.push(new am4charts.ValueAxis())
    const yAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis())
    subscribeToChartEvents(chartRef.current, xAxis, yAxis)
    chartRef.current = chartRef.current
  }

  return (
    <Box id="chartdiv" width='100%' height='750px'>
    </Box>
  )
}