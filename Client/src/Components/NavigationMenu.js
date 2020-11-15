/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import { AppBar, Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, Toolbar, Typography, makeStyles } from "@material-ui/core"
import {
  HashRouter,
  NavLink,
  Route
} from "react-router-dom"
import { fileUploadRoute, graphRoute, homeRoute, searchRoute } from '../Consts/Routes'

import BarChartIcon from '@material-ui/icons/BarChart'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import FileUploadView from "../Views/FileUploadView"
import GraphView from "../Views/GraphView"
import HomeIcon from '@material-ui/icons/Home'
import HomeView from '../Views/HomeView'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import SearchView from "../Views/SearchView"
import clsx from "clsx"

const drawerWidth = 240

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
}));


export default function NavigationMenu() {

  const [open, setOpen] = React.useState(false)
  const classes = useStyles()
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderNavLink = (route, title, icon) => {
    return (
      <ListItem button>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <NavLink exact to={route}>
          {title}
        </NavLink>
      </ListItem>
    )
  }

  const drawer = () => {
    return (
      <Drawer variant="persistent" anchor="left" open={open} className={classes.drawer} classes={{
        paper: classes.drawerPaper,
      }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {renderNavLink(homeRoute, "Home", <HomeIcon />)}
          {renderNavLink(graphRoute, "Graph", <BarChartIcon />)}
          {renderNavLink(searchRoute, "Search", <SearchIcon />)}
          {renderNavLink(fileUploadRoute, "File Upload", <CloudUploadIcon />)}
        </List>
      </ Drawer>
    )
  }

  return (
    <>
      <HashRouter>
        <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open, })} color="primary">
          <Toolbar>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen} className={clsx(classes.menuButton)}>
                  {/* <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen} className={clsx(classes.menuButton, open && classes.hide)}> */}
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="inherit">
                  Detonation Database
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {drawer()}
        <Box mt={16}>
          <Route exact path={homeRoute} component={HomeView} />
          <Route path={graphRoute} component={GraphView} />
          <Route path={fileUploadRoute} component={FileUploadView} />
        </Box>
        <Route path={searchRoute} component={SearchView} />
      </HashRouter >
    </>
  )
}