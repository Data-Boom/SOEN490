import { Box, Container, Divider, FormControl, FormControlLabel, Grid, InputLabel, Radio, RadioGroup, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'
import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import { SearchForm } from '../Components/Search/SearchForm'
import Typography from '@material-ui/core/Typography'

export default function SearchView() {

  const [rows, setRows] = useState([])

  const renderResults = () => {
    return (
      <>
        <Typography variant='h4' align="left">Results</Typography>
        <TableContainer>
          <Table size={"small"}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Oxidizer</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Subcategory</TableCell>
                <TableCell align="right">Fuel</TableCell>
                <TableCell align="right">Diluent</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right">Output Format</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderRows(rows)}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  }

  const renderRows = (rows) => {
    return rows.map((row) => (
      <TableRow key={row.name}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.title}</TableCell>
        <TableCell align="right">{row.oxidizer}</TableCell>
        <TableCell align="right">{row.category}</TableCell>
        <TableCell align="right">{row.subcategory}</TableCell>
        <TableCell align="right">{row.fuel}</TableCell>
        <TableCell align="right">{row.diluent}</TableCell>
        <TableCell align="right">{row.author}</TableCell>
        <TableCell align="right">{row.year}</TableCell>
        <TableCell align="right">{row.outputFormat}</TableCell>
      </TableRow>
    ))
  }

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
        <SearchForm
          handleSubmit={handleSubmit}
        />
      </Box>
      <Box pt={4}>
        {renderResults()}
      </Box>
    </Container>
  )
}