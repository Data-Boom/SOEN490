import { AppBar, Box, Collapse, Container, Grid, IconButton, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'

import DataboomTestGraph from '../../Common/Assets/DataboomTestGraph.png'
import { IUserAccountModel } from '../../Models/Authentication/IUserAccountModel'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import UserDetailsTab from './UserDetailSection/UserDetailsTab'
import { getUserDetails } from '../../Remote/Endpoints/UserEndpoint'

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
          {/* todo refactor */}
          <img src={DataboomTestGraph} width="200" height="200" />
        </TableCell>
        <TableCell>{row.graphdatasets}</TableCell>
        <TableCell>{row.comments}</TableCell>
      </TableRow>
    </TableBody>
  </Table>)
}

// Tab code taken from: https://material-ui.com/components/tabs/
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginRight: 10,
  },
}))

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
const rowsOfUploads = []

//todo implement callilng endpoint for saved/uploaded datasets
// for (let i = 0; i < exampleDatasets.length; i++) {
//   rows.push(createData([exampleDatasets[i].id], 'Dataset', exampleDatasets[i].name, exampleDatasets[i].oxidizer, exampleDatasets[i].author,
//     ['Cell width', 'Cell Height of O2 explosion', 'Critical energy after N2 intake'], 'Here is a sample comment'))
//   rowsOfUploads.push(createData([exampleDatasets[i].id], 'Dataset', exampleDatasets[i].name, exampleDatasets[i].oxidizer, exampleDatasets[i].author,
//     ['Cell width', 'Cell Height of O2 explosion', 'Critical energy after N2 intake'], 'Here is a sample comment'))
// }

function createGraphData(id: number[], type: string, name: string, graphdatasets: string[], comments: string) {
  return { id, type, name, graphdatasets, comments }
}

rows.push(createGraphData([1, 2, 3], 'Graph', 'graph name', ['Cell width', 'Cell Height of O2 explosion', 'Critical energy after N2 intake'],
  'Here is a sample comment'))

function parseIdArray(id) {
  let stringTest = ""
  if (id.length > 1) {
    stringTest = String(id).split(",").join("&datasetId[]=")
    return stringTest
  } else { return id }
}

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

function RowsOfUploads(props: { rowsOfUploads: ReturnType<typeof createData> }) {
  const { rowsOfUploads } = props
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
          <Link to={"graph?datasetId[]=" + String(parseIdArray(rowsOfUploads.id))}>{rowsOfUploads.name}</Link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <div>
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
                        {rowsOfUploads.oxidizer}
                      </TableCell>
                      <TableCell>{rowsOfUploads.author}</TableCell>
                      <TableCell>{rowsOfUploads.comments}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment >
  )
}

export function ProfileView() {

  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    const fetchUser = async () => {
      const newUser: IUserAccountModel = user && await getUserDetails({ email: user.email })
      setUser(newUser)
    }

    fetchUser()
  }, [])

  const classes = useStyles()
  const [tab, setTab] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    setTab(newTab)
  }
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={tab} onChange={handleChange}>
            <Tab label="View Profile" {...a11yProps(0)} />
            <Tab label="View Favourites" {...a11yProps(1)} />
            <Tab label="View Uploads" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <Container>
          <TabPanel value={tab} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <UserDetailsTab
                  user={user}
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tab} index={1}>
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
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <TableContainer component={Paper} style={{ width: "50%" }}>
              <Table aria-label="collapsible table" >
                <TableHead>Uploads
                  <TableRow>
                    <TableCell />
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsOfUploads.map((rowsOfUpload) => (
                    <RowsOfUploads key={rowsOfUpload.title} rowsOfUploads={rowsOfUpload} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Container>
      </div>
    </>
  )
}
