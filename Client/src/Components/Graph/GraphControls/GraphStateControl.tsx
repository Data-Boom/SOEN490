import { IAxisStateModel, IGraphStateModel } from '../../../Models/Graph/IGraphStateModel'
import { IGraphDatasetState, newGraphDatasetState } from '../../../Models/Graph/IGraphDatasetModel'
import React, { useEffect, useState } from 'react'

import { AxesControl } from './Axes/AxesControl'
import { CustomLoader } from '../../Utils/CustomLoader'
import { DatasetControl } from './DatasetControl'
import { Grid } from '@material-ui/core'
import { IDatasetModel } from '../../../Models/Datasets/IDatasetModel'
import { IDimensionModel } from '../../../Models/Dimensions/IDimensionModel'
import { SaveGraphStateForm } from './SaveGraphStateForm'
import SnackbarUtils from '../../Utils/SnackbarUtils'
import { callGetAllDimensions } from '../../../Remote/Endpoints/DimensionsEndpoint'
import { callGetDatasets } from '../../../Remote/Endpoints/DatasetEndpoint'
import { callGetGraphState } from '../../../Remote/Endpoints/GraphStateEndpoint'
import { useDimensionsSelector } from '../../../Stores/Slices/DimensionsSlice'
import { useUserSelector } from '../../../Stores/Slices/UserSlice'

interface IProps {
  graphState: IGraphStateModel,
  onGraphStateChange: (graphState: IGraphStateModel, completeDatasets: IDatasetModel[], dimensions: IDimensionModel[]) => void,
}

export const GraphStateControl = (props: IProps) => {
  const user = useUserSelector()
  const { graphState, onGraphStateChange } = { ...props }
  const dimensions = useDimensionsSelector()

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
        const dimensions = await callGetAllDimensions()
        setCompleteDatasets(datasets)
        onGraphStateChange(remoteGraphState, datasets, dimensions)
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
    onGraphStateChange(newGraphState, datasets, dimensions)
  }

  const handleDatasetStatesChange = (datasetStates: IGraphDatasetState[]) => {
    onGraphStateChange({ ...graphState, datasets: datasetStates }, completeDatasets, dimensions)
  }

  const handleAxesChanged = (axes: IAxisStateModel[]) => {
    onGraphStateChange({ ...graphState, axes: axes }, completeDatasets, dimensions)
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
          {completeDatasets && completeDatasets[0] &&
            <Grid container direction="column">
              <Grid item>
                <AxesControl datasets={completeDatasets} axes={graphState.axes} onAxesChange={handleAxesChanged} />
              </Grid>
              <Grid item>
                {user?.email && <SaveGraphStateForm
                  graphState={graphState}
                />}
              </Grid>
            </Grid>
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