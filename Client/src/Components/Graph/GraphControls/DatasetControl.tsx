import { Button, Grid } from '@material-ui/core'
import { DatasetRow, IDatasetRowProps } from './DatasetRow'

import { ExportDatasetsButton } from './ExportDatasetsButton'
import { IDatasetModel } from '../../../Models/Datasets/IDatasetModel'
import { IGraphDatasetState } from '../../../Models/Graph/IGraphDatasetModel'
import { List } from '../../Utils/List'
import React from 'react'
import { SearchViewModal } from '../../Search/SearchViewModal'
import { toDatasetRows } from '../../../Common/Helpers/GraphHelpers'

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

  const handleRemoveAllDatasets = () => {
    onCompleteDatasetsChange([])
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item>
          <SearchViewModal onDatasetsSelected={handleDatasetsAdded} />
        </Grid>
        {completeDatasets && completeDatasets[0] ?
          <Grid item>
            <Grid container spacing={4}>
              <Grid item>
                <ExportDatasetsButton datasets={completeDatasets} />
              </Grid>
              <Grid item>
                <Button id="remove-all-datasets" onClick={handleRemoveAllDatasets} color="secondary" variant="contained">Remove Datasets</Button>
              </Grid>
            </Grid>
          </Grid> : null
        }
      </Grid>
      <List
        RowComponent={DatasetRow}
        models={toDatasetRows(completeDatasets, datasetStates)}
        rowProps={{ onRemoveDatasetClick: handleDatasetRemoved, onHideDatasetSwitch: onHideDatasetSwitch } as IDatasetRowProps}
        withPagination
      />
    </>
  )
}