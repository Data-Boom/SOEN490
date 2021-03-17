import { ColDef, DataGrid, SelectionChangeParams, ValueGetterParams } from '@material-ui/data-grid'
import { Grid, Typography } from '@material-ui/core'
import { IData, IDatasetModel, IReference } from "../../Models/Datasets/IDatasetModel"
import React, { useState } from 'react'

import { DatasetFormModal } from '../DatasetUpload/DatasetViewModal'
import { ICategoryModel } from '../../Remote/Endpoints/CategoryEndpoint'

interface IProps {
  datasetResults: IDatasetModel[],
  handleSelectionChanged?: (selection: SelectionChangeParams) => void,
  button?: any,
  categories: ICategoryModel[],
  displayCheckbox: boolean
}

interface IProps2 {
  onDatasetsSelected: (foundDatasets: IDatasetModel[]) => void
}

export const SearchResults = (props: IProps) => {
  const { categories, displayCheckbox } = { ...props }
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

  const getCategoryId = (params: ValueGetterParams) => {
    const categoryId = params.row.category
    const foundCategory = categories.find(category => category.id == categoryId)
    return `${foundCategory.name}`
  }

  const getSubcategoryId = (params: ValueGetterParams) => {
    const subcategoryId = params.row.subcategory
    const categoryId = params.row.category
    const foundCategory = categories.find(category => category.id == categoryId)
    const foundSubcategory = foundCategory.subcategories.find(subcategory => subcategory.id == subcategoryId)
    return `${foundSubcategory.name}`
  }

  const getVariableList = (params: ValueGetterParams) => {
    const data = params.getValue('data') as IData

    return (
      <div>
        {data.variables.map(variable => (
          <Typography>{variable.name}</Typography>
        ))}
      </div>
    )
  }

  const [open, setOpen] = useState(false)

  const linkToDataset = (params: ValueGetterParams) => {
    const datasetId = params.getValue('id')

    return (<DatasetFormModal datasetId={datasetId.toString()} />)
  }

  const columns: ColDef[] = [
    { field: 'dataset_name', headerName: 'Name', width: width },
    { field: `title`, headerName: 'Title', valueGetter: getTitle, width: width * 1.2 },
    { field: 'category', headerName: 'Category', width: width * 0.8, valueGetter: getCategoryId },
    { field: 'subcategory', headerName: 'SubCategory', width: width * 0.8, valueGetter: getSubcategoryId },
    { field: 'author', headerName: 'Author', width: width, valueGetter: getAuthor },
    { field: 'year', headerName: 'Year', width: width * 0.5, valueGetter: getYear },
    { field: 'variables', headerName: 'List Of Variables', width: width * 1.5, renderCell: getVariableList },
    { field: 'dataset_button', headerName: 'View', width: width * 0.7, renderCell: linkToDataset },
  ]

  return (
    <>
      <Grid container spacing={3}>
        <Grid item container>
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid rows={props && props.datasetResults} rowHeight={120} rowsPerPageOptions={[5, 10, 20, 30, 50]} columns={columns} pageSize={5} checkboxSelection={displayCheckbox} onSelectionChange={props.handleSelectionChanged} />
          </div>
        </Grid>
        {props && props.button ? <Grid item container justify='flex-end'>
          <Grid item>
            {props.button}
          </Grid>
        </Grid> : null}
      </Grid>
    </>
  )
}