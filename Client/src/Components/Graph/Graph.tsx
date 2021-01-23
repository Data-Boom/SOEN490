import * as am4charts from "@amcharts/amcharts4/charts"
import * as am4core from "@amcharts/amcharts4/core"

import React, { useEffect, useState } from 'react'

import { Box } from "@material-ui/core"
import { IAxisStateModel } from "../../Models/Graph/IGraphStateModel"
import { IGraphDatasetModel } from "../../Models/Graph/IGraphDatasetModel"

interface IProps {
  datasets: IGraphDatasetModel[],
  initialAxes: IAxisStateModel[]
}


export default function Graph(props: IProps) {
  const { datasets, initialAxes } = { ...props }
  const [chart, setChart] = useState<any>(null)

  useEffect(() => {
    const chart = setUpGraph()
    rebuildGraph(chart)
    return () => {
      // chart.dispose()
    }
  }, [])

  useEffect(() => {
    if (!chart) {
      return
    }

    rebuildGraph(chart)
  }, [datasets])

  const rebuildGraph = (chart) => {
    chart.data = chart && buildDataForGraph(datasets)
    addSeries(chart)
    chart.exporting.menu = new am4core.ExportMenu()
  }

  const addSeries = (chart) => {
    datasets.forEach(dataset => {
      const lineSeries = chart.series.push(new am4charts.CandlestickSeries())
      const bullet = lineSeries.bullets.push(new am4charts.CircleBullet())
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

  const setUpGraph = () => {
    const chart = am4core.create("chartdiv", am4charts.XYChart)

    const xAxis = chart.xAxes.push(new am4charts.ValueAxis())
    xAxis.title.text = `${initialAxes[0].variableName}, ${initialAxes[0].units}`
    xAxis.logarithmic = initialAxes[0].logarithmic || false
    xAxis.renderer.minGridDistance = 40

    const yAxis = chart.yAxes.push(new am4charts.ValueAxis())
    yAxis.logarithmic = initialAxes[1].logarithmic || false
    yAxis.title.text = `${initialAxes[1].variableName}, ${initialAxes[1].units}`

    chart.events.on("ready", function () {
      //todo zoom to values or indeces?
      initialAxes[0].zoomStartIndex &&
        initialAxes[0].zoomEndIndex &&
        xAxis.zoomToIndexes(initialAxes[0].zoomStartIndex, initialAxes[0].zoomEndIndex)

      initialAxes[1].zoomStartIndex &&
        initialAxes[1].zoomEndIndex &&
        yAxis.zoomToIndexes(initialAxes[1].zoomStartIndex, initialAxes[1].zoomEndIndex)
    })

    // Scrollbars
    chart.scrollbarX = new am4core.Scrollbar()
    chart.scrollbarY = new am4core.Scrollbar()

    // Add cursor and series tooltip support
    chart.cursor = new am4charts.XYCursor()

    am4charts.ValueAxis.prototype.getSeriesDataItem = function (series, position) {
      const key = this.AxisFieldName + this.AxisLetter
      const value = this.positionToValue(position)
      const dataItem = series.dataItems.getIndex(series.dataItems.findClosestIndex(value, function (x) {
        return x[key] ? x[key] : undefined
      }, "any"))
      return dataItem
    }

    setChart(chart)
    return chart
  }

  return (
    <>
      <Box id="chartdiv" width='100%' height='750px'>
      </Box>
    </>
  )
}