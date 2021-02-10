import { ColDef, DataGrid, SelectionChangeParams, ValueGetterParams } from '@material-ui/data-grid'
import { Button, Grid, Modal, Typography } from '@material-ui/core'
import { IDatasetModel, IReference } from "../../Models/Datasets/IDatasetModel"
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { DatasetFormModal } from '../DatasetUpload/DatasetViewModal'

interface IProps {
  datasetResults: IDatasetModel[],
  handleSelectionChanged: (selection: SelectionChangeParams) => void,
  button?: any,
}

interface IProps2 {
  onDatasetsSelected: (foundDatasets: IDatasetModel[]) => void
}

export const SearchResults = (props: IProps) => {
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


  //render DatasetViewModal in here
  const getNameLink = (params: ValueGetterParams) => {
    const datasetID = params.getValue('id')
    const datasetName = params.getValue('dataset_name')

    const handleDatasetName = () => {
      setOpen(true)
    }

    const return1 = () => {
      alert("first return")

      return (<DatasetFormModal onDatasetSelected={return1}
      />)
    }



    return (
      <><Button variant="outlined" onClick={return1}>{datasetName}</Button>
      </>
    )

    /*return (
      <Link to={'/uploadDataset/' + datasetID} >
        <Typography>
          <>
            <Button variant="outlined">{datasetName}</Button>
          </>
        </Typography>
      </Link>
    )*/
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
      <Button variant="outlined" > Test DatasetViewModal </Button>
      <Grid container spacing={3}>
        <Grid item container>
          <div style={{ height: 400, width: '100%' }}>

            <DataGrid rows={props && props.datasetResults} columns={columns} pageSize={5} checkboxSelection onSelectionChange={props.handleSelectionChanged} onCellClick={getNameLink} />
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