import { Box, Container } from '@material-ui/core'
import { IDatasetModel, exampleDatasets } from '../Models/Datasets/IDatasetModel'
import React, { useState } from 'react'

import { SearchDatasetsForm } from '../Components/Search/SearchDatasetsForm'
import { SearchResults } from '../Components/Search/SearchResults'

export default function SearchView() {

  const [rows, setRows] = useState<IDatasetModel[]>([])

  const handleSubmit = (formValues) => {
    setRows(exampleDatasets)
  }

  return (
    <Container>
      <Box pt={4}>
        <SearchDatasetsForm
          handleSubmit={handleSubmit}
        />
      </Box>
      <Box pt={4}>
        <SearchResults
          datasetResults={rows}
        />
      </Box>
    </Container>
  )
}