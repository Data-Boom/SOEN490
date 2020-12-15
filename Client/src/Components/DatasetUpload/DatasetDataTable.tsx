import 'react-data-grid/dist/react-data-grid.css'

import DataGrid from 'react-data-grid'
import { IData } from '../../Models/Datasets/IDatasetModel'
import React from 'react'

interface IProps {
  data: IData,
  // onDataChange: () => void
}

export const DatasetDataTable = (props: IProps) => {

  // const getColumns = (): DataGrid.Column<string>[] => {
  //   const columns: DataGrid.Column<string>[] = [{ key: "test", name: "test" }]

  //   return columns
  // }

  // const getRow = (index: number) => {
  //   const rows: DataGrid.Row[] = []

  //   return rows
  // }

  const onDataChange = () => {
  }

  const getRowCount = () => {
    return (props && props.data.contents && props.data.contents[0] && props.data.contents[0].point.length)
  }

  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
    { key: 'count', name: 'Count' }]

  const rows = [{ id: 0, title: 'row1', count: 20 }, { id: 1, title: 'row1', count: 40 }, { id: 2, title: 'row1', count: 60 }]


  return (
    <>
      <DataGrid
        columns={columns}
        rows={rows}
      />
    </>
  )
}