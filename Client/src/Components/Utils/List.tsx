import { Grid, TablePagination } from "@material-ui/core"
import React, { useState } from 'react'

export interface IRowProps<T> {
  row?: T
}

interface IProps<T, ICustomRowProps> {
  RowComponent: React.ComponentType<IRowProps<T>>
  models?: T[]
  rowProps: ICustomRowProps
  withPagination: boolean
}

export function List<T, ICustomRowProps>(props: IProps<T, ICustomRowProps>) {
  const { RowComponent, models, rowProps, withPagination } = props
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)

  const rowModels = withPagination
    ? models.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : models

  return (
    <>
      <Grid container direction='column' spacing={1}>
        {rowModels.map((row, index) => <RowComponent key={index} row={row} {...rowProps} />)}
      </Grid>
      {withPagination && models.length > 0 && < TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25, 100]}
        labelRowsPerPage='Datasets per page'
        count={models.length}
        page={page}
        onChangePage={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={(event) => setRowsPerPage(Number(event.target.value))}
      />}
    </>
  )
}