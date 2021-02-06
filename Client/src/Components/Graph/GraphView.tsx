import { Box, Grid, Typography } from "@material-ui/core"
import { IGraphStateModel, newGraphState } from "../../Models/Graph/IGraphStateModel"
import React, { useState } from "react"

import Graph from './Graph'
import { GraphStateControl } from "./GraphControls/GraphStateControl"
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { IGraphDatasetModel } from '../../Models/Graph/IGraphDatasetModel'
import { Link } from "react-router-dom"
import { getGraphDatasets } from "./GraphFunctions"
import { useParams } from "react-router"

interface IGraphViewParams {
  graphStateId: string
}

export default function GraphView() {
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
      <Link to={'/uploadDataset/' + 2} >
        <Typography>
          Hello
        </Typography>
      </Link>
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