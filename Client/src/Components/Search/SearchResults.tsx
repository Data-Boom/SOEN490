import { ColDef, DataGrid, SelectionChangeParams } from '@material-ui/data-grid'

import { Grid } from '@material-ui/core'
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import React from 'react'

interface IProps {
  datasetResults: IDatasetModel[],
  handleSelectionChanged: (selection: SelectionChangeParams) => void,
  button?: any,
}

export const SearchResults = (props: IProps) => {

  const columns: ColDef[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'title', headerName: 'Title' },
    { field: 'oxidizer', headerName: 'Oxidizer' },
    { field: 'category', headerName: 'Category' },
    { field: 'subcategory', headerName: 'SubCategory' },
    { field: 'fuel', headerName: 'Fuel' },
    { field: 'diluent', headerName: 'Diluent' },
    { field: 'author', headerName: 'Author' },
    { field: 'year', headerName: 'Year' },
    { field: 'outputFormat', headerName: 'Output format' },
  ]

  return (
    <Grid container spacing={3}>
      <Grid item container>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={props && props.datasetResults} columns={columns} pageSize={5} checkboxSelection onSelectionChange={props.handleSelectionChanged} />
        </div>
      </Grid>
      {props && props.button ? <Grid item container justify='flex-end'>
        <Grid item>
          {props.button}
        </Grid>
      </Grid> : null}
    </Grid>
  )
}