import { ColDef, DataGrid, SelectionChangeParams, ValueGetterParams } from '@material-ui/data-grid'
import { Grid, List, ListItem, ListItemText } from '@material-ui/core'
import { IData, IDatasetModel, IReference } from "../../Models/Datasets/IDatasetModel"

import { DatasetFormModal } from '../DatasetUpload/DatasetViewModal'
import React from 'react'
import { ICategoryModel } from '../../Models/Profile/ICategoryModel'

interface IProps {
  datasetResults: IDatasetModel[],
  handleSelectionChanged?: (selection: SelectionChangeParams) => void,
  button?: any,
  categories: ICategoryModel[],
  displayCheckbox: boolean
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
      <List dense disablePadding style={{ maxHeight: '100%', overflow: 'auto', width: '100%' }}>
        {data.variables.map(variable =>
          <ListItem key={variable.name} dense disableGutters style={{ paddingTop: '0', paddingBottom: '0' }}>
            <ListItemText primary={variable.name} style={{ paddingTop: '0', paddingBottom: '0', marginTop: '0', marginBottom: '0' }} />
          </ListItem>
        )}
      </List>
    )
  }

  const linkToDataset = (params: ValueGetterParams) => {
    const datasetId = params.getValue('id')

    return (<DatasetFormModal datasetId={datasetId.toString()} />)
  }

  const columns: ColDef[] = [
    { field: 'dataset_name', headerName: 'Name', flex: 1 },
    { field: `title`, headerName: 'Title', valueGetter: getTitle, flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1, valueGetter: getCategoryId },
    { field: 'subcategory', headerName: 'SubCategory', flex: 1, valueGetter: getSubcategoryId },
    { field: 'author', headerName: 'Author', flex: 1, valueGetter: getAuthor },
    { field: 'year', headerName: 'Year', flex: 1, valueGetter: getYear },
    { field: 'variables', headerName: 'List Of Variables', flex: 2, renderCell: getVariableList },
    { field: 'dataset_button', headerName: 'View', flex: 1, renderCell: linkToDataset },
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