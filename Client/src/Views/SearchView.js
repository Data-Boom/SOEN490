import { Box, Container } from '@material-ui/core'
import React, { useState } from 'react'

import { SearchDatasetsForm } from '../Components/Search/SearchDatasetsForm'
import { SearchResults } from '../Components/Search/SearchResults'

export default function SearchView() {

  const [rows, setRows] = useState([])

  const handleSubmit = (formValues) => {
    setRows([
      { title: "test" },
      { title: "test3" },
      { title: "test4" },
      { title: "test5" },
      { title: "test2" }
    ])
  }

  return (
    <Container>
      <Box pt={4}>
        <SearchDatasetsForm
          handleSubmit={handleSubmit}
        />
      </Box>
      <Box pt={4}>
        <SearchResults></SearchResults>
      </Box>
    </Container>
  )
}