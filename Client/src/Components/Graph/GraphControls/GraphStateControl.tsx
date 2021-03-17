import { IAxisStateModel, IGraphStateModel } from '../../../Models/Graph/IGraphStateModel'
import { IGraphDatasetState, newGraphDatasetState } from '../../../Models/Graph/IGraphDatasetModel'
import React, { useEffect, useState } from 'react'

import { AxesControl } from './Axes/AxesControl'
import { CustomLoader } from '../../Utils/CustomLoader'
import { DatasetControl } from './DatasetControl'
import { Grid } from '@material-ui/core'
import { IDatasetModel } from '../../../Models/Datasets/IDatasetModel'
import { SaveGraphStateForm } from './SaveGraphStateForm'
import SnackbarUtils from '../../Utils/SnackbarUtils'
import { callGetDatasets } from '../../../Remote/Endpoints/DatasetEndpoint'
import { callGetGraphState } from '../../../Remote/Endpoints/GraphStateEndpoint'

interface IProps {
  graphState: IGraphStateModel,
  onGraphStateChange: (graphState: IGraphStateModel, completeDatasets: IDatasetModel[]) => void,
}

export const GraphStateControl = (props: IProps) => {
  const { graphState, onGraphStateChange } = { ...props }

  const [completeDatasets, setCompleteDatasets] = useState<IDatasetModel[]>([])
  const [loadingDatasets, setIsLoadingDatasets] = useState(false)

  useEffect(() => {
    const getGraphState = async (id: number) => {
      setIsLoadingDatasets(true)
      const remoteGraphState = await callGetGraphState(id)

      if (!remoteGraphState) {
        SnackbarUtils.error('Failed to fetch graph state')
      }
      else {
        const datasets = await callGetDatasets({ datasetId: remoteGraphState.datasets.map(dataset => dataset.id) })
        setCompleteDatasets(datasets)
        onGraphStateChange(remoteGraphState, datasets)
      }

      setIsLoadingDatasets(false)
    }

    if (graphState.id) {
      getGraphState(parseInt(graphState.id))
    }
  }, [])

  const handleCompleteDatasetsChange = (datasets: IDatasetModel[]) => {
    setCompleteDatasets(datasets)
    const newGraphState = getUpdatedGraphState(datasets)
    onGraphStateChange(newGraphState, datasets)
  }

  const handleDatasetStatesChange = (datasetStates: IGraphDatasetState[]) => {
    onGraphStateChange({ ...graphState, datasets: datasetStates }, completeDatasets)
  }

  const handleAxesChanged = (axes: IAxisStateModel[]) => {
    onGraphStateChange({ ...graphState, axes: axes }, completeDatasets)
  }

  const getUpdatedGraphState = (datasets: IDatasetModel[]): IGraphStateModel => {
    const graphDatasetStates = []
    //todo ensure all new datasets are in the state
    datasets.forEach(dataset => {
      const graphDatasetIndex = graphState.datasets.findIndex(datasetState => datasetState.id == dataset.id)
      if (graphDatasetIndex == -1) {
        graphDatasetStates.push({ ...newGraphDatasetState, id: dataset.id })
      }
      else {
        graphDatasetStates.push({ ...graphState.datasets[graphDatasetIndex], id: dataset.id })
      }
    })
    return { ...graphState, datasets: graphDatasetStates }
  }

  return (
    <>{
      loadingDatasets ?
        <CustomLoader
          visible={loadingDatasets}
        /> :
        <>
          {completeDatasets && completeDatasets[0] ?
            <Grid container direction="column">
              <Grid item>
                <AxesControl datasets={completeDatasets} axes={graphState.axes} onAxesChange={handleAxesChanged} />
              </Grid>
              <Grid item>
                <SaveGraphStateForm
                  graphState={graphState}
                />
              </Grid>
            </Grid> :
            null
          }
          <DatasetControl
            datasetStates={graphState.datasets}
            completeDatasets={completeDatasets}
            onDatasetStatesChange={handleDatasetStatesChange}
            onCompleteDatasetsChange={handleCompleteDatasetsChange}
          />
        </>
    }</>
  )
}