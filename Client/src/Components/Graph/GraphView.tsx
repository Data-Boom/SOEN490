import { Box, Grid } from "@material-ui/core"
import { IGraphStateModel, newGraphState } from "../../Models/Graph/IGraphStateModel"
import React, { useEffect, useState } from "react"

import Graph from './Graph'
import { GraphStateControl } from "./GraphControls/GraphStateControl"
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { IDimensionModel } from "../../../../Server/src/models/interfaces/IDimension"
import { IGraphDatasetModel } from '../../Models/Graph/IGraphDatasetModel'
import { callGetAllDimensions } from "../../Remote/Endpoints/DimensionsEndpoint"
import { getGraphDatasets } from "../../Common/Helpers/GraphHelpers"
import { useParams } from "react-router"

interface IGraphViewParams {
  graphStateId: string
}

export default function GraphView() {
  const { graphStateId } = useParams<IGraphViewParams>()

  const [graphDatasets, setGraphDatasets] = useState<IGraphDatasetModel[]>([])
  const [graphState, setGraphState] = useState<IGraphStateModel>({ ...newGraphState, id: graphStateId })
  const [dimensions, setDimensions] = useState<IDimensionModel[]>([])


  useEffect(() => { document.title = "Graph" }, [])

  const getDimensions = async () => {
    const databaseDimensions = await callGetAllDimensions()
    setDimensions(databaseDimensions)
  }

  useEffect(() => {
    getDimensions()
  }, [])

  const handleGraphStateChanged = (graphState: IGraphStateModel, completeDatasets: IDatasetModel[]) => {
    const graphDatasets = getGraphDatasets(completeDatasets, graphState)
    setGraphState(graphState)
    setGraphDatasets(graphDatasets)
  }

  return (
    <>
      <Box ml={8}>
        <Grid container spacing={3}>
          <Grid item container sm={7} >
            <Graph
              datasets={graphDatasets}
              dimensions={dimensions}
              axes={graphState.axes}
            />
          </Grid>
          <Grid item sm={5}>
            <Box ml={5} mr={5} mt={5}>
              <GraphStateControl
                graphState={graphState}
                dimensions={dimensions}
                onGraphStateChange={handleGraphStateChanged}
              />
            </Box>
          </Grid>
        </Grid>
      </Box >
    </>
  )
}