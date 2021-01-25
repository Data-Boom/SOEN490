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
      handleGraphStateChanged(graphState)

      const datasets = await getDatasets({ datasetId: graphState.datasets.map(dataset => dataset.id) })
      setCompleteDatasets(datasets)

      setIsLoadinDatasets(false)
    }

    if (graphStateId) {
      getGraphState(parseInt(graphStateId))
    }
  }, [])

  const handleGraphStateChanged = (graphState: IGraphStateModel) => {
    //todo handle properly
    setGraphState(graphState)
    console.log(graphState, 'graphState')
  }

  const handleDatasetsSelected = (selectedDatasets: IDatasetModel[]) => {
    const notYetSelectedDatasets: IDatasetModel[] = selectedDatasets.filter(selectedDataset => !isInStateAlready(selectedDataset))

    const mergedDatasets: IDatasetModel[] = [...completeDatasets]
    notYetSelectedDatasets.forEach(dataset => {
      mergedDatasets.push(dataset)
    })

    handleCompleteDatasetsUpdated(mergedDatasets)
  }

  const handleCompleteDatasetsUpdated = (updatedDatasets: IDatasetModel[]) => {
    const mergedGraphDatasets = getGraphDatasets(updatedDatasets, graphState)
    setGraphDatasets(mergedGraphDatasets)
  }

  const isInStateAlready = (dataset: IDatasetModel) => {
    return completeDatasets.findIndex(existingDataset => existingDataset.id === dataset.id) != -1
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
                  onCompleteDatasetsChange={handleDatasetsSelected}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
    }
    </>
  )
}