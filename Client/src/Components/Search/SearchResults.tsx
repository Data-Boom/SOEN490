import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core"

import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import React from 'react'

interface IProps {
  datasetResults: IDatasetModel[]
}

export const SearchResults = (props: IProps) => {
  const renderRows = (rows: IDatasetModel[]) => {
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

  return (
    <>
      <Typography variant='h4' align="left">Results</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Title</TableCell>
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
            {renderRows(props && props.datasetResults)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}