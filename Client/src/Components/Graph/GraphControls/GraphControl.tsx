import { DatasetList } from '../DatasetList.tsx/DatasetList'
import { ExportDatasetsButton } from './ExportDatasetsButton'
import { Grid } from '@material-ui/core'
import { IDatasetModel } from '../../../Models/Datasets/IDatasetModel'
import { IGraphStateModel } from '../../../Models/Graph/IGraphStateModel'
import React from 'react'
import { SaveGraphStateControl } from './SaveGraphStateControl'
import { SearchViewModal } from '../../Search/SearchViewModal'
import { callCreateGraphState } from '../../../Remote/Endpoints/GraphStateEndpoint'
import { toDatasetRows } from '../GraphFunctions'

interface IProps {
  graphState: IGraphStateModel,
  completeDatasets: IDatasetModel[],
  onGraphStateChange: (graphState: IGraphStateModel, completeDatasets: IDatasetModel[]) => void
}

export const GraphControl = (props: IProps) => {
  const { graphState, completeDatasets, onGraphStateChange } = { ...props }

  const onGraphStateSaved = async (name: string) => {
    const graphStateCopy = { ...graphState }
    graphStateCopy.name = name
    const id: string = await callCreateGraphState(graphStateCopy)
    graphStateCopy.id = id
    onGraphStateChange(graphStateCopy, completeDatasets)
  }

  const onRemoveDataset = (datasetId: number) => {
    const filteredDatasets = graphState.datasets.filter(dataset => dataset.id !== datasetId)
    onGraphStateChange({ ...graphState, datasets: filteredDatasets }, completeDatasets)
  }

  const onHideDatasetSwitch = (datasetId: number) => {
    const graphDatasetsCopy = [...graphState.datasets]
    const indexToHide = graphState.datasets.findIndex(dataset => dataset.id == datasetId)
    graphDatasetsCopy[indexToHide].isHidden = !graphDatasetsCopy[indexToHide].isHidden
    onGraphStateChange({ ...graphState, datasets: graphDatasetsCopy }, completeDatasets)
  }

  const handleDatasetsSelected = (selectedDatasets: IDatasetModel[]) => {
    const notYetSelectedDatasets: IDatasetModel[] = selectedDatasets.filter(selectedDataset => !isInStateAlready(selectedDataset))

    const mergedDatasets: IDatasetModel[] = [...completeDatasets]
    notYetSelectedDatasets.forEach(dataset => {
      mergedDatasets.push(dataset)
    })

    handleCompleteDatasetsUpdated(mergedDatasets, completeDatasets)
  }

  const isInStateAlready = (dataset: IDatasetModel) => {
    return completeDatasets.findIndex(existingDataset => existingDataset.id === dataset.id) != -1
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item>
          <SearchViewModal onDatasetsSelected={handleDatasetsSelected} />
        </Grid>
        {completeDatasets && completeDatasets[0] ?
          <Grid item>
            <ExportDatasetsButton datasets={completeDatasets} />
          </Grid> : null
        }
      </Grid>
      <DatasetList
        datasets={toDatasetRows(completeDatasets, graphState.datasets)}
        onRemoveDatasetClick={onRemoveDataset}
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