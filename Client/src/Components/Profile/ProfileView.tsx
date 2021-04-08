import { AppBar, Box, Collapse, Container, Grid, IconButton, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { loadUserThunk, useUserSelector } from '../../Stores/Slices/UserSlice'

import { DimensionManagementTab } from './UnitManagementSection/DimensionManagementTab'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { Link } from 'react-router-dom'
import { List } from '../Utils/List'
import PermissionsTab from './PermissionsSection/PermissionsTab'
import { ProfileGraphRow } from './ProfileGraphRow'
import { SavedDatasetsTab } from './UserSavedDatasetsSection/SavedDatasetsTab'
import UserDetailsTab from './UserDetailSection/UserDetailsTab'
import { listGraphStates } from '../../Remote/Endpoints/GraphStateEndpoint'
import { CategoryManagementTab } from './CategoryManagementSection/CategoryManagementTab';

import { useDispatch } from 'react-redux'
import { useTitle } from '../../Common/Hooks/useTitle'
import { UploadedDatasetsTab } from './UserUploadedDatasetsSection/UploadedDatasetsTab'

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

function createData(id: number[], type: string, name: string, oxidizer: string, author: string, graphdatasets: string[], comments: string) {
  return { id, type, name, oxidizer, author, graphdatasets, comments }
}

const rowsOfUploads = []

function parseIdArray(id) {
  let stringTest = ""
  if (id.length > 1) {
    stringTest = String(id).split(",").join("&datasetId[]=")
    return stringTest
  } else { return id }
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
  useTitle("Profile")

  const user = useUserSelector()
  const dispatch = useDispatch()

  useEffect(() => {
    const callListSavedGraphStates = async () => {
      const savedGraphState = await listGraphStates() || []
      setSavedGraphState(savedGraphState.reverse())
    }

    dispatch(loadUserThunk(user?.email))

    if (user && user.email)
      callListSavedGraphStates()
  }, [])

  const classes = useStyles()

  const [savedGraphState, setSavedGraphState] = useState([])
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
            <Tab label="View Saved Graphs" {...a11yProps(1)} />
            <Tab label="View Saved Datasets" {...a11yProps(2)} />
            <Tab label="Permissions" {...a11yProps(3)} />
            <Tab label="View Uploaded Datasets" {...a11yProps(4)} />
            <Tab label="Manage Units" {...a11yProps(5)} />
            <Tab label="Manage Categories" {...a11yProps(6)} />
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
            <TableContainer component={Paper} style={{ width: "100%" }}>
              <Table aria-label="collapsible table" >
                <TableHead > Saved graphs
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell >Comments</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  <List
                    RowComponent={ProfileGraphRow}
                    models={savedGraphState}
                    withPagination
                    modelType='Graphs'
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SavedDatasetsTab
                />
              </Grid>
            </Grid>
          </TabPanel>
          {/* todo delete */}
          <TabPanel value={tab} index={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <PermissionsTab
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tab} index={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {<UploadedDatasetsTab />}
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tab} index={5}>
            <DimensionManagementTab />
          </TabPanel>
          <TabPanel value={tab} index={6}>
            <CategoryManagementTab />
          </TabPanel>
        </Container>
      </div>
    </>
  )
}