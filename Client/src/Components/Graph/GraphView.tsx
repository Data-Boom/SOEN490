import { Box, Grid } from "@material-ui/core"
import { IGraphStateModel, newGraphState } from "../../Models/Graph/IGraphStateModel"
import React, { useEffect, useState } from "react"
import { loadDimensionsThunk, useDimensionsSelector } from "../../Stores/Slices/DimensionsSlice"

import { Graph } from './Graph'
import { GraphStateControl } from "./GraphControls/GraphStateControl"
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { IGraphDatasetModel } from '../../Models/Graph/IGraphDatasetModel'
import { getGraphDatasets } from "../../Common/Helpers/GraphHelpers"
import { useDispatchOnLoad } from "../../Common/Hooks/useDispatchOnLoad"
import { useParams } from "react-router"
import { useTitle } from "../../Common/Hooks/useTitle"

interface IGraphViewParams {
  graphStateId: string
}

export const GraphView = () => {
  useTitle("Graph")
  useDispatchOnLoad(loadDimensionsThunk)
  const dimensions = useDimensionsSelector()
  const { graphStateId } = useParams<IGraphViewParams>()

  const [graphDatasets, setGraphDatasets] = useState<IGraphDatasetModel[]>([])
  const [graphState, setGraphState] = useState<IGraphStateModel>({ ...newGraphState, id: graphStateId })
  const [completeDatasets, setCompleteDatasets] = useState<IDatasetModel[]>([])

  const handleGraphStateChanged = (graphState: IGraphStateModel, completeDatasets: IDatasetModel[]) => {
    console.log(dimensions, 'dimensions')
    const graphDatasets = getGraphDatasets(completeDatasets, graphState, dimensions)
    setGraphState(graphState)
    setGraphDatasets(graphDatasets)
    setCompleteDatasets(completeDatasets)
  }

  useEffect(() => { handleGraphStateChanged(graphState, completeDatasets); console.log(dimensions, 'dimensions from effect') }, [dimensions])

  return (
    <>
      <Box>
        <Grid container>
          <Grid item container sm={7} >
            <Graph
              datasets={graphDatasets}
              axes={graphState.axes}
            />
          </Grid>
          <button onClick={() => handleGraphStateChanged(graphState, completeDatasets)}></button>
          <Grid item sm={5}>
            <Box mr={5} mt={5}>
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