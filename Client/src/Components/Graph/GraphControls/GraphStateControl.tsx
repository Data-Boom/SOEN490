import { IAxisStateModel, IGraphStateModel } from '../../../Models/Graph/IGraphStateModel'
import React, { useEffect, useState } from 'react'
import { callCreateGraphState, callGetGraphState } from '../../../Remote/Endpoints/GraphStateEndpoint'

import { AxesControl } from './AxesControl'
import { CustomLoader } from '../../Utils/CustomLoader'
import { DatasetList } from '../DatasetList.tsx/DatasetList'
import { ExportDatasetsButton } from './ExportDatasetsButton'
import { Grid } from '@material-ui/core'
import { IDatasetModel } from '../../../Models/Datasets/IDatasetModel'
import { SaveGraphStateControl } from './SaveGraphStateControl'
import { SearchViewModal } from '../../Search/SearchViewModal'
import SnackbarUtils from '../../Utils/SnackbarUtils'
import { getDatasets } from '../../../Remote/Endpoints/DatasetEndpoint'
import { newGraphDatasetState } from '../../../Models/Graph/IGraphDatasetModel'
import { toDatasetRows } from '../GraphFunctions'

interface IProps {
  graphState: IGraphStateModel,
  onGraphStateChange: (graphState: IGraphStateModel, completeDatasets: IDatasetModel[]) => void,
}

export const GraphStateControl = (props: IProps) => {
  const { graphState, onGraphStateChange } = { ...props }
  const [completeDatasets, setCompleteDatasets] = useState<IDatasetModel[]>([])
  const [loadingDatasets, setIsLoadinDatasets] = useState(false)

  useEffect(() => {
    const getGraphState = async (id: number) => {
      setIsLoadinDatasets(true)
      console.log(id)
      const remoteGraphState = await callGetGraphState(id)

      if (!remoteGraphState) {
        SnackbarUtils.error('Failed to fetch graph state')
      }
      else {
        const datasets = await getDatasets({ datasetId: remoteGraphState.datasets.map(dataset => dataset.id) })
        setCompleteDatasets(datasets)
        onGraphStateChange(remoteGraphState, datasets)
      }

      setIsLoadinDatasets(false)
    }


    if (graphState.id) {
      getGraphState(parseInt(graphState.id))
    }
  }, [])

  const onGraphStateSaved = async (name: string) => {
    const graphStateCopy = { ...graphState }
    graphStateCopy.name = name
    const id: string = await callCreateGraphState(graphStateCopy)
    graphStateCopy.id = id
    onGraphStateChange(graphStateCopy, completeDatasets)
  }

  const onHideDatasetSwitch = (datasetId: number) => {
    const graphDatasetsCopy = [...graphState.datasets]
    const indexToHide = graphState.datasets.findIndex(dataset => dataset.id == datasetId)
    graphDatasetsCopy[indexToHide].isHidden = !graphDatasetsCopy[indexToHide].isHidden
    onGraphStateChange({ ...graphState, datasets: graphDatasetsCopy }, completeDatasets)
  }

  const handleDatasetRemoved = (datasetId: number) => {
    const filteredDatasets = completeDatasets.filter(dataset => dataset.id !== datasetId)
    handleCompleteDatasetsUpdated(filteredDatasets)
  }

  const handleDatasetsAdded = (selectedDatasets: IDatasetModel[]) => {
    const notYetSelectedDatasets: IDatasetModel[] = selectedDatasets.filter(selectedDataset => !isInStateAlready(selectedDataset))

    const mergedDatasets: IDatasetModel[] = [...completeDatasets]
    notYetSelectedDatasets.forEach(dataset => {
      mergedDatasets.push(dataset)
    })

    handleCompleteDatasetsUpdated(mergedDatasets)
  }

  const handleCompleteDatasetsUpdated = (datasets: IDatasetModel[]) => {
    setCompleteDatasets(datasets)
    const newGraphState = getUpdatedGraphState(datasets)
    onGraphStateChange(newGraphState, datasets)
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

  const isInStateAlready = (dataset: IDatasetModel) => {
    return completeDatasets.findIndex(existingDataset => existingDataset.id === dataset.id) != -1
  }

  const handleAxesChanged = (axes: IAxisStateModel[]) => {

  }

  return (
    <>{
      loadingDatasets ?
        <CustomLoader
          visible={loadingDatasets}
        /> :
        <>
          <Grid container spacing={3}>
            <Grid item>
              <SearchViewModal onDatasetsSelected={handleDatasetsAdded} />
            </Grid>
            {completeDatasets && completeDatasets[0] ?
              <Grid item>
                <ExportDatasetsButton datasets={completeDatasets} />
              </Grid> : null
            }
          </Grid>
          <DatasetList
            datasets={toDatasetRows(completeDatasets, graphState.datasets)}
            onRemoveDatasetClick={handleDatasetRemoved}
            onHideDatasetSwitch={onHideDatasetSwitch}
          />
          <Grid container>
            <Grid item>
              <AxesControl datasets={completeDatasets} axes={graphState.axes} onAxesChange={handleAxesChanged} />
            </Grid>
            <Grid item>
              <SaveGraphStateControl
                onSaveClick={onGraphStateSaved}
              />
            </Grid>
          </Grid>
        </>
    }</>
  )
}