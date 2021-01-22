/* eslint-disable react/display-name */

import { AppBar, Box, Button, Divider, Drawer, Grid, IconButton, Toolbar, Typography, makeStyles } from "@material-ui/core"
import { HashRouter, Link, Redirect, useHistory } from 'react-router-dom'
import { ListRouter, getRoutedViews } from "./ListRouter"
import React, { Component, useContext, useState } from 'react'
import { withRouter } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MenuIcon from '@material-ui/icons/Menu'
import { UserContext } from "../App"
import clsx from "clsx"
import { linkWidth } from './ListRouter'
import { homeRoute, signInRoute, signOutRoute } from "../Common/Consts/Routes"
import universitylogo from './universitylogo.png'
import { IUserAccountModel } from '../Remote/Models/IUserAccountModel'
import { removeUserInStorage } from '../Common/Storage'
import { callLogIn } from "../Remote/Endpoints/AuthenticationEndpoint";
import { ISignInUserModel } from "../Models/Authentication/ISignUpModel";

const drawerWidth = linkWidth

export default function NavigationMenu() {
  const { user, setUser } = useContext(UserContext)
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleSignIn = () => {
  }

  const history = useHistory();

  function logout() {

    removeUserInStorage();
    window.location.replace("/");

  }




  const drawer = (): any => {
    return (
      <Drawer variant="persistent" anchor="left" open={open} className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
        <div className={classes.drawerHeader}>
          <IconButton id='Close' onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {ListRouter()}
      </ Drawer>
    )
  }

  const renderGreeting = () => {
    return user && user.firstName ? (
      <Typography>
        Hello, {user.firstName} {user.lastName}
        <Button variant="contained" onClick={logout}>Sign out</Button>
      </Typography>

    )
      : (
        <Button component={Link} to={signInRoute} id='btn1' onClick={handleSignIn} variant="contained">Sign In</Button>
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
                {renderGreeting()}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {drawer()}
        <Box pt={16}>
          {getRoutedViews()}
        </Box>
      </HashRouter>

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