import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'

import DataboomTestGraph from './DataboomTestGraph.png'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { Link } from 'react-router-dom'
import Profile from '../Components/Profile/Profile'
import React from 'react'
import { exampleDatasets } from '../Models/Datasets/ICompleteDatasetEntity'
import { makeStyles } from '@material-ui/core/styles'

const renderGraphRow = (row) => {
  return (<Table size="small" aria-label="purchases">
    <TableHead>
      <TableRow>
        <TableCell>Graph image</TableCell>
        <TableCell>Datasets in graph</TableCell>
        <TableCell>Comments</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow >
        <TableCell component="th" scope="row">
          <img src={DataboomTestGraph} width="200" height="200" />
        </TableCell>
        <TableCell>{row.graphdatasets}</TableCell>
        <TableCell>{row.comments}</TableCell>
      </TableRow>
    </TableBody>
  </Table>)
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

//no oxidizer, add material detials and composition, comments keep author
function createData(id: number[], type: string, name: string, oxidizer: string, author: string, graphdatasets: string[], comments: string) {
  return { id, type, name, oxidizer, author, graphdatasets, comments }
}

const rows = []

for (let i = 0; i < exampleDatasets.length; i++) {
  rows.push(createData([exampleDatasets[i].id], 'Dataset', exampleDatasets[i].name, exampleDatasets[i].oxidizer, exampleDatasets[i].author,
    ['Cell width', 'Cell Height of O2 explosion', 'Critical energy after N2 intake'], 'Here is a sample comment'))
}

function createGraphData(id: number[], type: string, name: string, graphdatasets: string[], comments: string) {
  return { id, type, name, graphdatasets, comments }
}

rows.push(createGraphData([1, 2, 3], 'Graph', 'graph name', ['Cell width', 'Cell Height of O2 explosion', 'Critical energy after N2 intake'],
  'Here is a sample comment'))

function parseIdArray(id) {
  let stringTest = ""
  console.log(id.length)
  if (id.length > 1) {
    stringTest = String(id).split(",").join("&datasetId[]=")
    return stringTest
  } else { return id }
}

// eslint-disable-next-line no-undef
function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()
  return (
    < React.Fragment >
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Link to={"graph?datasetId[]=" + String(parseIdArray(row.id))}>{row.name}</Link>
        </TableCell>
        <TableCell align="right">{row.type}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <div>
                {row.type === "Dataset" ? (
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Oxidizer</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Comments</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {row.oxidizer}
                        </TableCell>
                        <TableCell>{row.author}</TableCell>
                        <TableCell>{row.comments}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ) : (
                    renderGraphRow(row)
                  )}
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment >
  )
}

export default function CollapsibleTable() {
  return (
    <>
      <Profile
        name="John Doe"
        email="j_doe@live.concordia.ca"
        dateOfBirth="1984-04-13"
        organization="Concordia University"
        password="test"
      />

      <TableContainer component={Paper} style={{ width: "50%" }}>
        <Table aria-label="collapsible table" >
          <TableHead> Favourites
	          <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="right">Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.title} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
