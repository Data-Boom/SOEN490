import { Box, Grid } from "@material-ui/core"
import { IGraphStateModel, newGraphState } from "../../Models/Graph/IGraphStateModel"
import React, { useContext, useEffect, useState } from "react"

import Graph from './Graph'
import { GraphStateControl } from "./GraphControls/GraphStateControl"
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { IGraphDatasetModel } from '../../Models/Graph/IGraphDatasetModel'
import { StoreContext } from "../../Context/StoreContext"
import { getGraphDatasets } from "../../Common/Helpers/GraphHelpers"
import { useParams } from "react-router"

interface IGraphViewParams {
  graphStateId: string
}

export default function GraphView() {
  const { graphStateId } = useParams<IGraphViewParams>()

  const [graphDatasets, setGraphDatasets] = useState<IGraphDatasetModel[]>([])
  const [graphState, setGraphState] = useState<IGraphStateModel>({ ...newGraphState, id: graphStateId })

  const { store } = useContext(StoreContext)

  useEffect(() => { store.dimensionsStore.loadDimensions() }, [])

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