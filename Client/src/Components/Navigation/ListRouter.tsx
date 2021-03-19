import { List, Paper, makeStyles } from "@material-ui/core"

import { AboutView } from "../Home/AboutView"
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { AdminReviewView } from "../Admin/AdminReviewView"
import { CellSizeAnalysisView } from "../CellSizeAnalysis/CellSizeAnalysisView"
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { DatasetView } from "../DatasetUpload/DatasetView"
import DonutSmallIcon from '@material-ui/icons/DonutSmall'
import ForgotPasswordView from "../Authentication/ForgotPasswordView"
import { GraphView } from "../Graph/GraphView"
import HomeIcon from '@material-ui/icons/Home'
import HomeView from "../Home/HomeView"
import InfoIcon from '@material-ui/icons/Info'
import { ListItemLink } from "./ListItemLink"
import { LoginView } from "../Authentication/LoginView"
import MessageIcon from '@material-ui/icons/Message'
import { ProfileView } from "../Profile/ProfileView"
import { ProtectedRoute } from "./ProtectedRoute"
import React from 'react'
import ResetPasswordView from "../Authentication/ResetPasswordView"
import SearchIcon from '@material-ui/icons/Search'
import SearchView from "../Search/SearchView"
import SignUpView from "../Authentication/SignUpView"
import TimelineIcon from '@material-ui/icons/Timeline'
import { UserReviewView } from '../UserReview/UserReviewView'
import { routes } from '../../Common/Consts/Routes'
import { useUserSelector } from "../../Stores/Slices/UserSlice"

export const linkWidth = 240

const useStyles = makeStyles({
  root: {
    width: linkWidth,
  },
})

export const ListRouter = () => {
  const user = useUserSelector()
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper elevation={0}>
        <List aria-label="main mailbox folders">
          <ListItemLink id="home-menu" protectedRoute={routes.homeRoute} primary="Home" icon={<HomeIcon />} />
          <ListItemLink id="graph-menu" protectedRoute={routes.newGraphRoute} primary="Graph" icon={<TimelineIcon />} />
          <ListItemLink id="search-menu" protectedRoute={routes.searchRoute} primary="Search Datasets" icon={<SearchIcon />} />
          <ListItemLink id="dataset-menu" protectedRoute={routes.newDatasetRoute} primary="Dataset Upload" icon={<CloudUploadIcon />} />
          <ListItemLink id="cellanalysis-menu" protectedRoute={routes.cellSizeAnalysisRoute} primary="Cell Size Analysis" icon={<DonutSmallIcon />} />
          <ListItemLink id="profile-menu" protectedRoute={routes.profileRoute} primary="Profile" icon={<AccountBoxIcon />} />
          <ListItemLink id="about-menu" protectedRoute={routes.aboutRoute} primary="About Databoom" icon={<InfoIcon />} />
          <ListItemLink id="admin-review" protectedRoute={routes.adminReviewRoute} primary="Admin Review (#)" icon={<MessageIcon />} />
          <ListItemLink id="user-review" protectedRoute={routes.userReviewRoute} primary="Flagged Datasets (#)" icon={<MessageIcon />} />
        </List>
      </Paper>
    </div>
  )
}

export const getRoutedViews = () => {
  return (
    <>
      <ProtectedRoute exact protectedRoute={routes.homeRoute} component={HomeView} />
      <ProtectedRoute protectedRoute={routes.graphRoute} component={GraphView} />
      <ProtectedRoute protectedRoute={routes.searchRoute} component={SearchView} />
      <ProtectedRoute protectedRoute={routes.newDatasetRoute} component={DatasetView} />
      <ProtectedRoute protectedRoute={routes.datasetRoute} component={DatasetView} />
      <ProtectedRoute protectedRoute={routes.cellSizeAnalysisRoute} component={CellSizeAnalysisView} />
      <ProtectedRoute protectedRoute={routes.aboutRoute} component={AboutView} />
      <ProtectedRoute protectedRoute={routes.profileRoute} component={ProfileView} />
      <ProtectedRoute protectedRoute={routes.loginRoute} component={LoginView} />
      <ProtectedRoute protectedRoute={routes.signUpRoute} component={SignUpView} />
      <ProtectedRoute protectedRoute={routes.adminReviewRoute} component={AdminReviewView} />
      <ProtectedRoute protectedRoute={routes.forgotPasswordRoute} component={ForgotPasswordView} />
      <ProtectedRoute protectedRoute={routes.resetPasswordRoute} component={ResetPasswordView} />
      <ProtectedRoute protectedRoute={routes.userReviewRoute} component={UserReviewView} />
    </>
  )
}