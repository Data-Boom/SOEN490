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

  //todo order is important? (code should be order agnostic)
  useEffect(() => initiateGraph(), [])
  useEffect(() => chartRef.current && handleUnitsUpdated(), [axes[0].units, axes[1].units])
  useEffect(() => chartRef.current && handleDatasetsUpdated(), [datasets])

  const handleUnitsUpdated = () => {
    //cleanup series used for old variables
    chartRef.current.series.clear()
    const xAxis = chartRef.current.xAxes.getIndex(0)
    const yAxis = chartRef.current.yAxes.getIndex(0)
    updateAxis(xAxis, yAxis)
  }

  const handleDatasetsUpdated = () => {
    pushAddedUpdatedDatasets(chartRef.current)
    pullRemovedDatasets(chartRef.current)
  }

  const pushAddedUpdatedDatasets = (chart: am4charts.XYChart) => {
    datasets.forEach(dataset => {
      let datasetSeries = chart.series.values.find(series => series.name == getSeriesName(dataset))

      if (!datasetSeries) {
        datasetSeries = setUpSeries(chartRef.current, dataset)
      }

      //optimization to only set data if it wasnt set before
      if (!datasetSeries.data || datasetSeries.data.length == 0) {
        datasetSeries.data = dataset.points
      }

      toggleVisibilityIfNeed(datasetSeries, dataset)
    })
  }

  const toggleVisibilityIfNeed = (datasetSeries: am4charts.Series, dataset: IGraphDatasetModel) => {
    if (shouldHideDataset(datasetSeries, dataset)) {
      datasetSeries.hide()
      return
    }

    if (shouldShowDataset(datasetSeries, dataset)) {
      datasetSeries.show()
      return
    }
  }

  const shouldHideDataset = (datasetSeries: am4charts.Series, dataset: IGraphDatasetModel) => {
    return dataset.isHidden && (!datasetSeries.isHidden || !datasetSeries.isHiding)
  }

  const shouldShowDataset = (datasetSeries: am4charts.Series, dataset: IGraphDatasetModel) => {
    return !dataset.isHidden && (datasetSeries.isHidden || datasetSeries.isHiding)
  }

  const pullRemovedDatasets = (chart: am4charts.XYChart) => {
    chart.series.values.forEach(series => {
      if (!datasets.find(dataset => getSeriesName(dataset) == series.name)) {
        chart.series.removeValue(series)
      }
    })
  }

  const setUpSeries = (chart: am4charts.XYChart, dataset: IGraphDatasetModel): am4charts.XYSeries => {
    const datasetSeries = chart.series.push(new am4charts.XYSeries())
    const bullet = datasetSeries.bullets.push(new am4core.Circle())
    bullet.radius = 5
    bullet.tooltipText = `${dataset.name}
        ${axes[0].variableName}: {x} ${axes[0].units}
        ${axes[1].variableName}: {y} ${axes[1].units}`

    datasetSeries.dataFields.valueX = `x`
    datasetSeries.dataFields.valueY = `y`
    datasetSeries.name = getSeriesName(dataset)
    datasetSeries.data = []
    return datasetSeries
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

  const updateAxis = (xAxis: any, yAxis: any) => {
    xAxis.title.text = `${axes[0].variableName}, ${axes[0].units}`
    xAxis.logarithmic = axes[0].logarithmic || false
    xAxis.renderer.minGridDistance = 40
    xAxis.keepSelection = true

    yAxis.title.text = `${axes[1].variableName}, ${axes[1].units}`
    yAxis.logarithmic = axes[1].logarithmic || false
    yAxis.keepSelection = true
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