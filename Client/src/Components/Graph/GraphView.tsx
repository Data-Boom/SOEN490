import { Box, Grid } from "@material-ui/core"
import { IGraphStateModel, newGraphState } from "../../Models/Graph/IGraphStateModel"
import React, { useState } from "react"

import { Graph } from './Graph'
import { GraphStateControl } from "./GraphControls/GraphStateControl"
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { IGraphDatasetModel } from '../../Models/Graph/IGraphDatasetModel'
import { getGraphDatasets } from "../../Common/Helpers/GraphHelpers"
import { loadDimensionsThunk } from "../../Stores/Slices/DimensionsSlice"
import { useDispatchOnLoad } from "../../Common/Hooks/useDispatchOnLoad"
import { useParams } from "react-router"
import { useTitle } from "../../Common/Hooks/useTitle"

interface IGraphViewParams {
  graphStateId: string
}

export const GraphView = () => {
  useTitle("Graph")
  useDispatchOnLoad(loadDimensionsThunk)

  const { graphStateId } = useParams<IGraphViewParams>()

  const [graphDatasets, setGraphDatasets] = useState<IGraphDatasetModel[]>([])
  const [graphState, setGraphState] = useState<IGraphStateModel>({ ...newGraphState, id: graphStateId })


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
              axes={graphState.axes}
            />
          </Grid>
          <Grid item sm={5}>
            <Box ml={5} mr={5} mt={5}>
              <GraphStateControl
                graphState={graphState}
                onGraphStateChange={handleGraphStateChanged}
              />
            </Box>
          </Grid>
        </Grid>
      </Box >
    </>
  )
}