import * as am4charts from "@amcharts/amcharts4/charts"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets"

import React, { useEffect, useRef } from 'react'

import { Box } from "@material-ui/core"
import { IAxisStateModel } from "../../Models/Graph/IGraphStateModel"
import { IGraphDatasetModel } from "../../Models/Graph/IGraphDatasetModel"
import am4themes_material from "@amcharts/amcharts4/themes/animated"
import { useDimensionsSelector } from "../../Stores/Slices/DimensionsSlice"

interface IProps {
  datasets: IGraphDatasetModel[],
  axes: IAxisStateModel[]
}

am4core.useTheme(am4themes_material)

const getSeriesName = (dataset: IGraphDatasetModel) => {
  return `${dataset.id}`
}

export const Graph = (props: IProps) => {
  const { datasets, axes } = { ...props }
  const dimensions = useDimensionsSelector()
  const chartRef = useRef<am4charts.XYChart>()

  useEffect(() => initiateGraph(), [])
  useEffect(() => chartRef.current && handleUnitsUpdated(), [axes[0].units, axes[1].units, axes[0].variableName, axes[1].variableName])
  useEffect(() => chartRef.current && handleAxesScaleUpdated(), [axes[0].logarithmic, axes[1].logarithmic])
  useEffect(() => chartRef.current && handleDatasetsUpdated(), [datasets])

  const handleUnitsUpdated = () => {
    //cleanup series used for old variables, no series will trigger points rebuild on axes update
    chartRef.current.series.clear()
    const xAxis = chartRef.current.xAxes.getIndex(0)
    const yAxis = chartRef.current.yAxes.getIndex(0)
    updateAxis(xAxis, yAxis)
  }

  const handleAxesScaleUpdated = () => {
    const xAxis = chartRef.current.xAxes.getIndex(0) as any
    const yAxis = chartRef.current.yAxes.getIndex(0) as any
    xAxis.logarithmic = axes[0].logarithmic || false
    yAxis.logarithmic = axes[1].logarithmic || false
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

      toggleHideShow(datasetSeries, dataset)
      changeDatasetBullets(datasetSeries, dataset)
    })
  }

  const changeDatasetBullets = (datasetSeries: am4charts.Series, dataset: IGraphDatasetModel) => {
    const xUnitName = getUnitName(axes[0].units)
    const yUnitName = getUnitName(axes[1].units)
    let bullet: am4core.Rectangle | am4core.Triangle | am4plugins_bullets.Star | am4core.Circle
    datasetSeries.bullets.pop()
    if (dataset.shape == "square") {
      bullet = datasetSeries.bullets.push(new am4core.Rectangle())
      bullet.width = 10
      bullet.height = 10
      bullet.horizontalCenter = "middle"
      bullet.verticalCenter = "middle"
    }
    else if (dataset.shape == "triangle") {
      bullet = datasetSeries.bullets.push(new am4core.Triangle())
      bullet.horizontalCenter = "middle"
      bullet.verticalCenter = "middle"
      bullet.direction = "top"
      bullet.width = 10
      bullet.height = 10
    }
    else if (dataset.shape == "star") {
      bullet = datasetSeries.bullets.push(new am4plugins_bullets.Star());
      bullet.radius = 5
      bullet.pointCount = 6
    }
    else {
      bullet = datasetSeries.bullets.push(new am4core.Circle())
      bullet.radius = 5
    }
    bullet.fill = am4core.color(dataset.color || "#000000")
    bullet.stroke = am4core.color(dataset.color || "#000000")
    bullet.tooltipText = `${dataset.name}
        ${axes[0].variableName}: {x} ${xUnitName}
        ${axes[1].variableName}: {y} ${yUnitName}`
  }

  const toggleHideShow = (datasetSeries: am4charts.Series, dataset: IGraphDatasetModel) => {
    if (shouldHideDataset(datasetSeries, dataset)) {
      return datasetSeries.hide()
    }

    if (shouldShowDataset(datasetSeries, dataset)) {
      return datasetSeries.show()
    }
  }

  const shouldHideDataset = (datasetSeries: am4charts.Series, dataset: IGraphDatasetModel) => {
    return dataset.isHidden && (!datasetSeries.isHidden || !datasetSeries.isHiding)
  }

  const shouldShowDataset = (datasetSeries: am4charts.Series, dataset: IGraphDatasetModel) => {
    return !dataset.isHidden && (datasetSeries.isHidden || datasetSeries.isHiding)
  }

  const pullRemovedDatasets = (chart: am4charts.XYChart) => {
    const seriesCopy = [...chart.series.values]
    seriesCopy.forEach(series => {
      if (!datasets.find(dataset => getSeriesName(dataset) == series.name)) {
        chart.series.removeValue(series)
      }
    })
  }

  const getUnitName = (unitId: number): string => {
    let name = ''
    dimensions.forEach(dimension => {
      dimension.units.forEach(unit => {
        if (unit.id == unitId) {
          name = unit.name
          return name
        }
      })
    })
    return name
  }

  const setUpSeries = (chart: am4charts.XYChart, dataset: IGraphDatasetModel): am4charts.XYSeries => {
    const datasetSeries = chart.series.push(new am4charts.XYSeries())
    changeDatasetBullets(datasetSeries, dataset)
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
    const xUnitName = getUnitName(axes[0].units)
    const yUnitName = getUnitName(axes[1].units)
    xAxis.title.text = `${axes[0].variableName}, ${xUnitName} `
    xAxis.logarithmic = axes[0].logarithmic || false
    xAxis.renderer.minGridDistance = 40
    xAxis.keepSelection = true

    yAxis.title.text = `${axes[1].variableName}, ${yUnitName} `
    yAxis.logarithmic = axes[1].logarithmic || false
    yAxis.keepSelection = true
  }

  const initiateGraph = () => {
    chartRef.current = am4core.create("chartdiv", am4charts.XYChart)

    chartRef.current.scrollbarX = new am4core.Scrollbar()
    chartRef.current.scrollbarY = new am4core.Scrollbar()
    chartRef.current.cursor = new am4charts.XYCursor()
    chartRef.current.cursor.behavior = "zoomXY"
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