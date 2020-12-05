import { ColDef, DataGrid } from '@material-ui/data-grid'
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import React from 'react'

interface IProps {
  datasetResults: IDatasetModel[]
}

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: ValueGetterParams) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];

return (
  <div style={{ height: 400, width: '100%' }}>
    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
  </div>
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