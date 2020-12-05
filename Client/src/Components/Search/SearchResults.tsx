import { ColDef, DataGrid } from '@material-ui/data-grid'

import { Grid } from '@material-ui/core'
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import React from 'react'

interface IProps {
  datasetResults: IDatasetModel[],
  button?: any
}

export const SearchResults = (props: IProps) => {

  const columns: ColDef[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'title', headerName: 'Title' },
    { field: 'oxidizer', headerName: 'Oxidizer' },
    { field: 'category', headerName: 'Category' },
    { field: 'subcategory', headerName: 'SubCategory' },
    { field: 'fuel', headerName: 'Fuel' },
    { field: 'diluent', headerName: 'Dilutent' },
    { field: 'author', headerName: 'Author' },
    { field: 'year', headerName: 'Year' },
    { field: 'outputFormat', headerName: 'Output format' },
  ]

  return (
    <Grid container spacing={3}>
      <Grid item container>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={props && props.datasetResults} columns={columns} pageSize={5} checkboxSelection />
        </div>
      </Grid>
      <Grid item container justify='flex-end'>
        <Grid item>
          {props && props.button ? (props.button) : null}
        </Grid>
      </Grid>
    </Grid>
  )

  // return (
  //   <>
  //     <Typography variant='h4' align="left">Results</Typography>
  //     <TableContainer>
  //       <Table>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>Title</TableCell>
  //             <TableCell>Oxidizer</TableCell>
  //             <TableCell>Category</TableCell>
  //             <TableCell>Subcategory</TableCell>
  //             <TableCell>Fuel</TableCell>
  //             <TableCell>Diluent</TableCell>
  //             <TableCell>Author</TableCell>
  //             <TableCell>Year</TableCell>
  //             <TableCell>Output Format</TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {renderRows(props && props.datasetResults)}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   </>
  // )
}