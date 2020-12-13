import { Box, Button, Container } from '@material-ui/core'
import { ICompleteDatasetEntity, exampleDatasets } from '../../Models/Datasets/ICompleteDatasetEntity'
import React, { useState } from 'react'

import { SearchDatasetsForm } from '../Search/SearchDatasetsForm'
import { SearchResults } from '../Search/SearchResults'
import { SelectionChangeParams } from '@material-ui/data-grid'

interface IProps {
  handleDatasetsSelected: (datasets: ICompleteDatasetEntity[]) => void
}

export default function SearchView(props: IProps) {

  const [foundDatasets, setFoundDatasets] = useState<ICompleteDatasetEntity[]>([])

  // array of selected ids
  const [selection, setSelection] = useState<SelectionChangeParams>(null)

  const handleSearchClick = (formValues) => {
    // todo actually call backend
    setFoundDatasets(exampleDatasets)
  }

  const handleSelectionChanged = (selection: SelectionChangeParams) => {
    setSelection(selection)
  }

  const handleSubmitSelection = () => {
    let selectedDatasets: ICompleteDatasetEntity[] = []

    //add all datasets from found datasets by index to selected datasets
    for (let i = 0; i < selection.rowIds.length; i++) {
      selectedDatasets.push(foundDatasets[selection.rowIds[i]])
    }

    // once all selected datasets were added, call the parent callback with the selected datasets, 
    // let the parent decide what to do with the selected datasets
    props.handleDatasetsSelected(selectedDatasets)
  }

  const addToGraphButton = <Button variant='contained' color='primary' onClick={handleSubmitSelection}>Add to graph</Button>

  return (
    <Container>
      <Box pt={4}>
        <SearchDatasetsForm
          handleSubmit={handleSearchClick}
        />
      </Box>
      <Box pt={4}>
        <SearchResults
          datasetResults={foundDatasets}
          handleSelectionChanged={handleSelectionChanged}
          button={addToGraphButton}
        />
      </Box>
    </Container>
  )
}