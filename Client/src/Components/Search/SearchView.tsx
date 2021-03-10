import { Box, Button, Container } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import { ISearchDatasetsFormModel } from './ISearchDatasetsFormModel'
import { SearchDatasetsForm } from './SearchDatasetsForm'
import { SearchResults } from './SearchResults'
import { SelectionChangeParams } from '@material-ui/data-grid'
import { callGetDatasets } from '../../Remote/Endpoints/DatasetEndpoint'
import { listCategories } from '../../Remote/Endpoints/CategoryEndpoint'
import { listDatapoints } from '../../Remote/Endpoints/DatapointEndpoint'

interface IProps {
  handleDatasetsSelected?: (datasets: IDatasetModel[]) => void
}

export default function SearchView(props: IProps) {
  const { handleDatasetsSelected } = { ...props }

  const [foundDatasets, setFoundDatasets] = useState<IDatasetModel[]>([])

  // array of selected ids
  const [selection, setSelection] = useState<SelectionChangeParams>({ rowIds: [] })

  const [categories, setCategories] = useState([])

  const [datapoint, setDatapoints] = useState([])

  useEffect(() => {
    const callListCategories = async () => {
      const getCategories = await listCategories()
      setCategories(getCategories || [])
    }
    callListCategories()
  }, [])

  useEffect(() => {
    const callListDatapoints = async () => {
      const getDatapoints = await listDatapoints()
      setDatapoints(getDatapoints || [])
    }
    callListDatapoints()
  }, [])

  const handleSearchClick = async (query: ISearchDatasetsFormModel) => {
    const datasets = await callGetDatasets(query) || []
    setFoundDatasets(datasets)
  }

  const handleSelectionChanged = (selection: SelectionChangeParams) => {
    setSelection(selection)
  }

  const handleSubmitSelection = () => {
    const selectedDatasets: IDatasetModel[] = []

    //add all datasets from found datasets by index to selected datasets
    for (let i = 0; i < selection.rowIds.length; i++) {
      selectedDatasets.push(foundDatasets.find(dataset => dataset.id == selection.rowIds[i]))
    }

    // once all selected datasets were added, call the parent callback with the selected datasets, 
    // let the parent decide what to do with the selected datasets
    props.handleDatasetsSelected(selectedDatasets)
  }

  const addToGraphButton = handleDatasetsSelected ?
    <Button id="add-graph" variant='contained' color='primary' onClick={handleSubmitSelection}>Add to graph</Button> :
    null

  return (
    <Container>
      <Box pt={4}>
        <SearchDatasetsForm
          handleSubmit={handleSearchClick}
          categories={categories}
          datapoint={datapoint}
        />
      </Box>
      <Box pt={4}>
        <SearchResults
          datasetResults={foundDatasets}
          categories={categories}
          handleSelectionChanged={handleSelectionChanged}
          button={addToGraphButton}
        />
      </Box>
    </Container>
  )
}