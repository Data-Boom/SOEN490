import React, { useEffect, useState } from 'react'
import { callCreateGraphState, callGetGraphState } from '../../../Remote/Endpoints/GraphStateEndpoint'

import { DatasetList } from '../DatasetList.tsx/DatasetList'
import { ExportDatasetsButton } from './ExportDatasetsButton'
import { Grid } from '@material-ui/core'
import { IDatasetModel } from '../../../Models/Datasets/IDatasetModel'
import { IGraphStateModel } from '../../../Models/Graph/IGraphStateModel'
import { SaveGraphStateControl } from './SaveGraphStateControl'
import { SearchViewModal } from '../../Search/SearchViewModal'
import { getDatasets } from '../../../Remote/Endpoints/DatasetEndpoint'
import { toDatasetRows } from '../GraphFunctions'

interface IProps {
  graphState: IGraphStateModel,
  onGraphStateChange: (graphState: IGraphStateModel, completeDatasets: IDatasetModel[]) => void,
  onLoading: (loading: boolean) => void
}

export const GraphStateControl = (props: IProps) => {
  const { graphState, onGraphStateChange, onLoading } = { ...props }
  const [completeDatasets, setCompleteDatasets] = useState<IDatasetModel[]>([])

  useEffect(() => {
    const getGraphState = async (id: number) => {
      onLoading(true)

      const graphState = await callGetGraphState(id)
      const datasets = await getDatasets({ datasetId: graphState.datasets.map(dataset => dataset.id) })
      setCompleteDatasets(datasets)
      onGraphStateChange(graphState, datasets)

      onLoading(false)
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
    handleDatasetsUpdated(filteredDatasets)
  }

  const handleDatasetsAdded = (selectedDatasets: IDatasetModel[]) => {
    const notYetSelectedDatasets: IDatasetModel[] = selectedDatasets.filter(selectedDataset => !isInStateAlready(selectedDataset))

    const mergedDatasets: IDatasetModel[] = [...completeDatasets]
    notYetSelectedDatasets.forEach(dataset => {
      mergedDatasets.push(dataset)
    })

    handleDatasetsUpdated(mergedDatasets)
  }

  const handleDatasetsUpdated = (datasets: IDatasetModel[]) => {
    setCompleteDatasets(datasets)
    const newGraphState = getUpdatedGraphState(datasets)
    onGraphStateChange(newGraphState, datasets)
  }

  const getUpdatedGraphState = (datasets: IDatasetModel[]): IGraphStateModel => {
    const graphStateCopy = { ...graphState }
    //todo ensure all new datasets are in the state
    return graphStateCopy
  }

  const isInStateAlready = (dataset: IDatasetModel) => {
    return completeDatasets.findIndex(existingDataset => existingDataset.id === dataset.id) != -1
  }

  return (
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
          <SaveGraphStateControl
            onSaveClick={onGraphStateSaved}
          />
        </Grid>
      </Grid>
    </>
  )
}