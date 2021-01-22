import { ColDef, DataGrid, SelectionChangeParams, ValueGetterParams } from '@material-ui/data-grid'
import { IDatasetModel, IReference } from "../../Models/Datasets/IDatasetModel"

import { Grid } from '@material-ui/core'
import React from 'react'

interface IProps {
  datasetResults: IDatasetModel[],
  handleSelectionChanged: (selection: SelectionChangeParams) => void,
  button?: any,
}

export const SearchResults = (props: IProps) => {
  console.log(props.datasetResults);
  const width = 160

  const getTitle = (params: ValueGetterParams) => {
    const reference = params.getValue('reference') as IReference
    return `${reference.title}`
  }

  const getAuthor = (params: ValueGetterParams) => {
    const reference = params.getValue('reference') as IReference
    if (!reference.authors[0]) {
      return 'N/A'
    }
    return `${reference.authors[0].firstName} ${reference.authors[0].lastName}`
  }

  const getYear = (params: ValueGetterParams) => {
    const reference = params.getValue('reference') as IReference
    return `${reference.year}`
  }

  const columns: ColDef[] = [
    { field: 'dataset_name', headerName: 'Name', width: width },
    { field: `title`, headerName: 'Title', valueGetter: getTitle, width: width * 1.2 },
    { field: 'category', headerName: 'Category', width: width },
    { field: 'subcategory', headerName: 'SubCategory', width: width },
    { field: 'author', headerName: 'Author', width: width, valueGetter: getAuthor },
    { field: 'year', headerName: 'Year', width: width, valueGetter: getYear },
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