import { Grid, TablePagination } from "@material-ui/core"
import React, { useState } from 'react'

export interface IRowProps<T> {
  row: T
}

interface IProps<T> {
  RowComponent: React.ComponentType<IRowProps<T>>,
  entities: unknown[]
  rowProps: unknown
}

export function PaginatedList<T>(props: IProps<T>) {
  const { RowComponent, entities, rowProps } = props
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)

  return (
    <>
      <Grid container direction='column' spacing={1}>
        {entities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => <RowComponent key={index} row={row} {...rowProps} />)}
      </Grid>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25, 100]}
        count={entities.length}
        page={page}
        onChangePage={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={(event) => setRowsPerPage(Number(event.target.value))}
      />
    </>
  )
}