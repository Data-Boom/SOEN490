/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { AppBar, Box, Button, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, Toolbar, Typography, makeStyles } from "@material-ui/core"
import {
  HashRouter,
  NavLink,
  Route
} from "react-router-dom"
import { aboutRoute, datasetUploadRoute, fileUploadRoute, graphRoute, homeRoute, profileRoute, researchPaperAnalysisRoute, searchRoute } from '../Consts/Routes'

import { AboutView } from "./Home/AboutView"
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import BarChartIcon from '@material-ui/icons/BarChart'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { DatasetUploadView } from "./DatasetUpload/DatasetUploadView"
import FileUploadView from "./DataCell/FileUploadView"
import GraphView from "./Graph/GraphView"
import HomeIcon from '@material-ui/icons/Home'
import HomeView from './Home/HomeView'
import ImageSearchIcon from '@material-ui/icons/ImageSearch'
import InfoIcon from '@material-ui/icons/Info'
import MenuIcon from '@material-ui/icons/Menu'
import { ProfileView } from "../Views/ProfileView"
import React from 'react'
import { ResearchPaperAnalysisView } from "./ResearchPaperAnalysis/ResearchPaperAnalysisView"
import SearchIcon from '@material-ui/icons/Search'
import SearchView from "./Search/SearchView"
import clsx from "clsx"
import universitylogo from './universitylogo.png'

const drawerWidth = 240

export default function NavigationMenu(): any {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const renderNavLink = (route, title, icon, navID = null) => {
    return (
      <ListItem button>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <NavLink exact to={route} id={navID} >
          {title}
        </NavLink>
      </ListItem>
    )
  }

  const handleSignIn = (): void => {
  }

  const drawer = (): any => {
    return (
      <>
        <Drawer variant="persistent" anchor="left" open={open} className={classes.drawer} classes={{
          paper: classes.drawerPaper,
        }}>
          <div className={classes.drawerHeader}>
            <IconButton id='Close' onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {renderNavLink(homeRoute, "Home", <HomeIcon />)}
            {renderNavLink(graphRoute, "Graph", <BarChartIcon />, "graph-id")}
            {renderNavLink(searchRoute, "Search", <SearchIcon />)}
            {renderNavLink(researchPaperAnalysisRoute, "Research Analysis", <ImageSearchIcon />)}
            {renderNavLink(fileUploadRoute, "File Upload", <CloudUploadIcon />)}
            {renderNavLink(profileRoute, "Profile", <AccountBoxIcon />)}
            {renderNavLink(datasetUploadRoute, "Dataset Upload", <CloudUploadIcon />)}
            {renderNavLink(aboutRoute, "About Databoom", <InfoIcon />)}
          </List>
        </ Drawer>
      </>
    )
  }

  return (
    <>
      <HashRouter>
        <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open, })} color="primary">
          <Toolbar>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item>
                <IconButton id='Open' edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen} className={clsx(classes.menuButton)}>
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <img src={universitylogo} />
              </Grid>
              <Grid container item xs={4} justify="flex-end">
                <Typography variant="h6" color="inherit">
                  Shock and Detonation Physics Database
                </Typography>
              </Grid>
              <Grid container item xs={4} justify="flex-end">
                <Button id='btn1' onClick={handleSignIn} variant="contained">Sign In</Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {drawer()}
        <Box pt={16}>
          <Route exact path={homeRoute} component={HomeView} />
          <Route path={graphRoute} component={GraphView} />
          <Route path={fileUploadRoute} component={FileUploadView} />
          <Route path={researchPaperAnalysisRoute} component={ResearchPaperAnalysisView} />
          <Route path={searchRoute} component={SearchView} />
          <Route path={datasetUploadRoute} component={DatasetUploadView} />
          <Route path={aboutRoute} component={AboutView} />
          <Route path={profileRoute} component={ProfileView} />
        </Box>
      </HashRouter >
    </>
  )
}

//todo i dont like this useStyles() will refactor later, this is not a resuable component so whatever
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))