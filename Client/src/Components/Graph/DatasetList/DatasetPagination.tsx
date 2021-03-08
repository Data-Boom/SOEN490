import React, { useState } from 'react'

import { DatasetList } from "./DatasetList"
import { IDatasetRowModel } from "../../../Models/Datasets/IDatasetRowModel"
import { TablePagination } from "@material-ui/core"

interface IProps {
  datasets: IDatasetRowModel[],
  onRemoveDatasetClick: (datasetId: number) => void,
  onHideDatasetSwitch: (datasetId: number) => void
}

export const DatasetPagination = (props: IProps) => {
  const { datasets, onRemoveDatasetClick, onHideDatasetSwitch } = { ...props }

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)

  return (
    <>
      <DatasetList
        datasets={datasets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        onRemoveDatasetClick={onRemoveDatasetClick}
        onHideDatasetSwitch={onHideDatasetSwitch}
      />
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25, 100]}
        count={datasets.length}
        page={page}
        onChangePage={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={(event) => setRowsPerPage(Number(event.target.value))}
      />
    </>
  )
}