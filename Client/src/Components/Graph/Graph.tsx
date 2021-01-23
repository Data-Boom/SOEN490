import * as am4charts from "@amcharts/amcharts4/charts"
import * as am4core from "@amcharts/amcharts4/core"

import React, { useEffect, useState } from 'react'

import { Box } from "@material-ui/core"
import { IGraphDatasetModel } from "../../Models/Graph/IGraphDatasetModel"
import { IGraphStateModel } from "../../Models/Graph/IGraphStateModel"
import am4themes_material from "@amcharts/amcharts4/themes/animated"

interface IProps {
  datasets: IGraphDatasetModel[],
  graphInitialState: IGraphStateModel
}

am4core.useTheme(am4themes_material)

export default function Graph(props: IProps) {
  const { datasets, graphInitialState } = { ...props }
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
  }, [datasets.length])

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
    //for all current dataset points:
    for (let pointIndex = 0; pointIndex < dataset.points.length; pointIndex++) {
      //create new point that has previous points info and this one's
      const mergedPoint = { ...data[pointIndex], [`${dataset.id}x`]: dataset.points[pointIndex].x, [`${dataset.id}y`]: dataset.points[pointIndex].y }
      data[pointIndex] = mergedPoint
    }
  }

  const setUpGraph = () => {
    const chart = am4core.create(
      "chartdiv",
      am4charts.XYChart
    )

    const value1xisX = chart.xAxes.push(new am4charts.ValueAxis())
    value1xisX.title.text = `${graphInitialState.axes[0].variableName}, ${graphInitialState.axes[0].units}`
    value1xisX.renderer.minGridDistance = 40

    const value1xisY = chart.yAxes.push(new am4charts.ValueAxis())
    value1xisY.title.text = `${graphInitialState.axes[1].variableName}, ${graphInitialState.axes[1].units}`

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