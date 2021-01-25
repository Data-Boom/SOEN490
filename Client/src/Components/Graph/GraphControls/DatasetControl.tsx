import { DatasetList } from '../DatasetList/DatasetList'
import { ExportDatasetsButton } from './ExportDatasetsButton'
import { Grid } from '@material-ui/core'
import { IDatasetModel } from '../../../Models/Datasets/IDatasetModel'
import { IGraphDatasetState } from '../../../Models/Graph/IGraphDatasetModel'
import React from 'react'
import { SearchViewModal } from '../../Search/SearchViewModal'
import { toDatasetRows } from '../GraphFunctions'

//todo either refactor or delete this file
interface IProps {
  datasetStates: IGraphDatasetState[],
  completeDatasets: IDatasetModel[],
  onDatasetStatesChange: (datasetStates: IGraphDatasetState[]) => void,
  onCompleteDatasetsChange: (completeDatasets: IDatasetModel[]) => void,
}

export const DatasetControl = (props: IProps) => {
  const { datasetStates, completeDatasets, onDatasetStatesChange, onCompleteDatasetsChange } = { ...props }

  const onHideDatasetSwitch = (datasetId: number) => {
    const graphDatasetsCopy = [...datasetStates]
    const indexToHide = datasetStates.findIndex(dataset => dataset.id == datasetId)
    graphDatasetsCopy[indexToHide].isHidden = !graphDatasetsCopy[indexToHide].isHidden
    onDatasetStatesChange(graphDatasetsCopy)
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
    onCompleteDatasetsChange(datasets)
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
        datasets={toDatasetRows(completeDatasets, datasetStates)}
        onRemoveDatasetClick={handleDatasetRemoved}
        onHideDatasetSwitch={onHideDatasetSwitch}
      />
    </>
  )
}