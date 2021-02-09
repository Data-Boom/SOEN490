import { AppBar, Box, Button, Collapse, Container, Grid, IconButton, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { fetchAllAdmins, updatePermissions } from '../../Remote/Endpoints/PermissionsEndpoint'

import AddNewAdminForm from '../Profile/PermissionsSection/AddNewAdminForm'
import AddingAdminsTab from './PermissionsSection/AddingAdminsTab'
import { ConfirmationModal } from '../Authentication/ConfirmationModal'
import { IUserAccountModel } from '../../Models/Authentication/IUserAccountModel'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { Link } from 'react-router-dom'
import { ProfileGraphStateList } from './ProfileGraphList'
import { UserContext } from '../../App'
import UserDetailsTab from './UserDetailSection/UserDetailsTab'
import { getUserDetails } from '../../Remote/Endpoints/UserEndpoint'
import { listGraphStates } from '../../Remote/Endpoints/GraphStateEndpoint'

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

  const handleAddNewAdmin = async (newAdmin: string) => {
    let test = await updatePermissions({
      email: newAdmin,
      operation: "add"
    })
    console.log(test)
  }

  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const { user, setUser } = useContext(UserContext)
  useEffect(() => {
    const fetchUser = async () => {
      const newUser: IUserAccountModel = user && await getUserDetails({ email: user.email })
      setUser(newUser)
    }
    fetchUser()
  }, [])

  const [savedGraphState, setSavedGraphState] = useState([])

  useEffect(() => {
    const callListSavedGraphStates = async () => {
      const savedGraphState = await listGraphStates()
      setSavedGraphState(savedGraphState.reverse())
    }
    callListSavedGraphStates()
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
            <Tab label="Permissions" {...a11yProps(2)} />
            <Tab label="View Uploads" {...a11yProps(3)} />
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
                  <ProfileGraphStateList
                    graphDataset={savedGraphState}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                Admin list
                <AddNewAdminForm
                  onSubmit={handleAddNewAdmin}
                />
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper} style={{ width: "100%" }}>
                  <Table aria-label="collapsabile table">
                    <TableHead >
                      <TableRow>
                        <TableCell align="left">Current Admins:
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        Admin emails
                      </Grid>
                      <Grid item xs={2}>
                        <Button variant="outlined" color="secondary" onClick={() => setConfirmModalOpen(true)}>
                          X
                        </Button>
                        <ConfirmationModal
                          title="Are you sure you want to remove this Admin?"
                          description="By clicking the Remove button the user will no longer have admin rights"
                          acceptButton="Remove"
                          cancelButton="Cancel"
                          open={confirmModalOpen}
                          onClose={() => setConfirmModalOpen(false)}
                          onSubmit={() => console.log('confirm pressed')}
                        />
                      </Grid>
                    </Grid>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tab} index={3}>
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
