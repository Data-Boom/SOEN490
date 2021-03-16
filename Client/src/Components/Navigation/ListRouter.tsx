import { List, ListItem, ListItemIcon, ListItemText, Paper, makeStyles } from "@material-ui/core"
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import { aboutRoute, adminReviewRoute, cellSizeAnalysisRoute, datasetRoute, forgotPasswordRoute, graphRoute, homeRoute, loginRoute, newDatasetRoute, newGraphRoute, profileRoute, searchRoute, signUpRoute, userReviewRoute } from '../../Common/Consts/Routes'

import { AboutView } from "../Home/AboutView"
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { AdminReviewView } from "../Admin/AdminReviewView"
import { CellSizeAnalysisView } from "../CellSizeAnalysis/CellSizeAnalysisView"
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { DatasetView } from "../DatasetUpload/DatasetView"
import DonutSmallIcon from '@material-ui/icons/DonutSmall'
import ForgotPasswordView from "../Authentication/ForgotPasswordView"
import GraphView from "../Graph/GraphView"
import HomeIcon from '@material-ui/icons/Home'
import HomeView from "../Home/HomeView"
import InfoIcon from '@material-ui/icons/Info'
import LoginView from "../Authentication/LoginView"
import MessageIcon from '@material-ui/icons/Message'
import { ProfileView } from "../Profile/ProfileView"
import React from 'react'
import ResetPasswordView from "../Authentication/ResetPasswordView"
import { Route } from 'react-router'
import SearchIcon from '@material-ui/icons/Search'
import SearchView from "../Search/SearchView"
import SignUpView from "../Authentication/SignUpView"
import TimelineIcon from '@material-ui/icons/Timeline'
import { UserReviewView } from '../UserReview/UserReviewView'
import { resetPasswordRoute } from "../../Remote/Endpoints/AuthenticationEndpoint"

interface IProps {
  id: string;
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

export const linkWidth = 240

//# of datasets to review shown in side bar
export const numOfDatasetsToReview = 10


export const ListItemLink = (props: IProps) => {
  const { id, icon, primary, to } = props

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to],
  )

  return (
    <ListItem id={id} button component={renderLink}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  )
}

const useStyles = makeStyles({
  root: {
    width: linkWidth,
  },
})

export const ListRouter = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper elevation={0}>
        <List aria-label="main mailbox folders">
          <ListItemLink id="home-menu" to={homeRoute} primary="Home" icon={<HomeIcon />} />
          <ListItemLink id="graph-menu" to={newGraphRoute} primary="Graph" icon={<TimelineIcon />} />
          <ListItemLink id="search-menu" to={searchRoute} primary="Search Datasets" icon={<SearchIcon />} />
          <ListItemLink id="dataset-menu" to={datasetRoute} primary="Dataset Upload" icon={<CloudUploadIcon />} />
          <ListItemLink id="cellanalysis-menu" to={cellSizeAnalysisRoute} primary="Cell Size Analysis" icon={<DonutSmallIcon />} />
          <ListItemLink id="profile-menu" to={profileRoute} primary="Profile" icon={<AccountBoxIcon />} />
          <ListItemLink id="about-menu" to={aboutRoute} primary="About Databoom" icon={<InfoIcon />} />
          <ListItemLink id="admin-review" to={adminReviewRoute} primary="Admin Review (#)" icon={<MessageIcon />} />
          <ListItemLink id="user-review" to={userReviewRoute} primary="Flagged Datasets (#)" icon={<MessageIcon />} />
        </List>
      </Paper>
    </div>
  )
}

export const getRoutedViews = () => {
  return (
    <>
      <Route exact path={homeRoute} component={HomeView} />
      <Route path={graphRoute} component={GraphView} />
      <Route path={searchRoute} component={SearchView} />
      <Route path={newDatasetRoute} component={DatasetView} />
      <Route path={cellSizeAnalysisRoute} component={CellSizeAnalysisView} />
      <Route path={aboutRoute} component={AboutView} />
      <Route path={profileRoute} component={ProfileView} />
      <Route path={loginRoute} component={LoginView} />
      <Route path={signUpRoute} component={SignUpView} />
      <Route path={adminReviewRoute} component={AdminReviewView} />
      <Route path={forgotPasswordRoute} component={ForgotPasswordView} />
      <Route path={resetPasswordRoute} component={ResetPasswordView} />
      <Route path={userReviewRoute} component={UserReviewView} />
    </>
  )
}