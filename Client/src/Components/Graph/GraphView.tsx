import { Box, Grid } from "@material-ui/core"
import { IGraphStateModel, newGraphState } from "../../Models/Graph/IGraphStateModel"
import React, { useState } from "react"

import { CustomLoader } from "../Utils/CustomLoader"
import Graph from './Graph'
import { GraphStateControl } from "./GraphControls/GraphStateControl"
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { IGraphDatasetModel } from '../../Models/Graph/IGraphDatasetModel'
import { getGraphDatasets } from "./GraphFunctions"
import { useParams } from "react-router"

interface IGraphViewParams {
  graphStateId: string
}

export default function GraphView() {
  const { graphStateId } = useParams<IGraphViewParams>()
  const [loadingDatasets, setIsLoadinDatasets] = useState(false)

  const [graphDatasets, setGraphDatasets] = useState<IGraphDatasetModel[]>([])
  const [graphState, setGraphState] = useState<IGraphStateModel>({ ...newGraphState, id: graphStateId })

  const handleGraphStateChanged = (graphState: IGraphStateModel, completeDatasets: IDatasetModel[]) => {
    console.log(graphState, 'graphState')

    const graphDatasets = getGraphDatasets(completeDatasets, graphState)
    setGraphState(graphState)
    setGraphDatasets(graphDatasets)
  }

  return (
    <>{
      loadingDatasets ?
        <CustomLoader
          visible={loadingDatasets}
        /> :
        <Box ml={8}>
          <Grid container spacing={3}>
            <Grid item container sm={7} >
              {graphDatasets && graphDatasets[0] ?
                <Graph
                  datasets={graphDatasets}
                  initialAxes={graphState.axes}
                /> : null}
            </Grid>
            <Grid item sm={5}>
              <Box ml={5} mr={5} mt={5}>
                <GraphStateControl
                  graphState={graphState}
                  onGraphStateChange={handleGraphStateChanged}
                  onLoading={loading => setIsLoadinDatasets(loading)}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
    }
    </>
  )
}