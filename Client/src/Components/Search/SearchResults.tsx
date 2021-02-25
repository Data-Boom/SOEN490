import { ColDef, DataGrid, SelectionChangeParams, ValueGetterParams } from '@material-ui/data-grid'
import { IDatasetModel, IReference } from "../../Models/Datasets/IDatasetModel"
import React, { useState } from 'react'

import { DatasetFormModal } from '../DatasetUpload/DatasetViewModal'
import { Grid } from '@material-ui/core'

interface IProps {
  datasetResults: IDatasetModel[],
  handleSelectionChanged: (selection: SelectionChangeParams) => void,
  button?: any,
}

interface IProps2 {
  onDatasetsSelected: (foundDatasets: IDatasetModel[]) => void
}

export const SearchResults = (props: IProps) => {
  const { datasetResults } = { ...props }
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

  const [open, setOpen] = useState(false)

  const getNameLink = (params: ValueGetterParams) => {
    const datasetId = params.getValue('id')
    const datasetName = params.getValue('dataset_name')

    return (<DatasetFormModal datasetId={datasetId.toString()} datasetName={datasetName.toString()} />)
  }

  const columns: ColDef[] = [
    { field: 'dataset_name', headerName: 'Name', width: width, renderCell: getNameLink },
    { field: `title`, headerName: 'Title', valueGetter: getTitle, width: width * 1.2 },
    { field: 'category', headerName: 'Category', width: width },
    { field: 'subcategory', headerName: 'SubCategory', width: width },
    { field: 'author', headerName: 'Author', width: width, valueGetter: getAuthor },
    { field: 'year', headerName: 'Year', width: width, valueGetter: getYear },
  ]

  return (
    <>
      <Grid container spacing={3}>
        <Grid item container>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={props && props.datasetResults} rowsPerPageOptions={[5, 20, 30, 50, datasetResults.length].sort((a, b) => a - b)} columns={columns} pageSize={5} checkboxSelection onSelectionChange={props.handleSelectionChanged} />
          </div>
        </Grid>
        {props && props.button ? <Grid item container justify='flex-end'>
          <Grid item>
            {props.button}
          </Grid>
        </Grid> : null}
      </Grid></>
  )
}