import { Box, Grid } from "@material-ui/core"
import { IGraphStateModel, newGraphState } from "../../Models/Graph/IGraphStateModel"
import React, { useEffect, useState } from "react"

import { CustomLoader } from "../Utils/CustomLoader"
import Graph from './Graph'
import { GraphControl } from "./GraphControls/GraphControl"
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { IGraphDatasetModel } from '../../Models/Graph/IGraphDatasetModel'
import { callGetGraphState } from "../../Remote/Endpoints/GraphStateEndpoint"
import { getDatasets } from "../../Remote/Endpoints/DatasetEndpoint"
import { getGraphDatasets } from "./GraphFunctions"
import { useParams } from "react-router"

interface IGraphViewParams {
  graphStateId: string
}

export default function GraphView() {

  const [loadingDatasets, setIsLoadinDatasets] = useState(false)

  const [completeDatasets, setCompleteDatasets] = useState<IDatasetModel[]>([])
  const [graphDatasets, setGraphDatasets] = useState<IGraphDatasetModel[]>([])
  const [graphState, setGraphState] = useState<IGraphStateModel>({ ...newGraphState })
  const { graphStateId } = useParams<IGraphViewParams>()

  useEffect(() => {
    const getGraphState = async (id: number) => {
      setIsLoadinDatasets(true)

      const graphState = await callGetGraphState(id)
      const datasets = await getDatasets({ datasetId: graphState.datasets.map(dataset => dataset.id) })
      handleGraphStateChanged(graphState, datasets)

      setIsLoadinDatasets(false)
    }

    if (graphStateId) {
      getGraphState(parseInt(graphStateId))
    }
  }, [])

  const handleGraphStateChanged = (graphState: IGraphStateModel, completeDatasets: IDatasetModel[]) => {
    console.log(graphState, 'graphState')

    const graphDatasets = getGraphDatasets(completeDatasets, graphState)
    setGraphState(graphState)
    setCompleteDatasets(completeDatasets)
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
                <GraphControl
                  graphState={graphState}
                  completeDatasets={completeDatasets}
                  onGraphStateChange={handleGraphStateChanged}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
    }
    </>
  )
}