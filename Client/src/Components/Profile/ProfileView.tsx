import { AppBar, Box, Container, Grid, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { loadUserThunk, useUserSelector } from '../../Stores/Slices/UserSlice'

import { List } from '../Utils/List'
import { ProfileGraphRow } from './ProfileGraphRow'
import { SavedDatasetsTab } from './UserSavedDatasetsSection/SavedDatasetsTab'
import { UploadedDatasetsTab } from './UserUploadedDatasetsSection/UploadedDatasetsTab'
import UserDetailsTab from './UserDetailSection/UserDetailsTab'
import { listGraphStates } from '../../Remote/Endpoints/GraphStateEndpoint'
import { useDispatch } from 'react-redux'
import { useTitle } from '../../Common/Hooks/useTitle'

// Tab code taken from: https://material-ui.com/components/tabs/
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export function TabPanel(props: TabPanelProps) {
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

export function a11yProps(index: any) {
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
            <Tab label="View Uploaded Datasets" {...a11yProps(3)} />
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
          <TabPanel value={tab} index={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {<UploadedDatasetsTab />}
              </Grid>
            </Grid>
          </TabPanel>
        </Container>
      </div>
    </>
  )
}