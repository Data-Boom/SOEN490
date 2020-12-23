import { List, ListItem, ListItemIcon, ListItemText, Paper, makeStyles } from "@material-ui/core"
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import { datasetUploadRoute, fileUploadRoute, graphRoute, homeRoute, searchRoute } from '../Consts/Routes'

import BarChartIcon from '@material-ui/icons/BarChart'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { DatasetUploadView } from "./DatasetUpload/DatasetUploadView"
import FileUploadView from "../Views/FileUploadView"
import GraphView from "../Views/GraphView"
import HomeIcon from '@material-ui/icons/Home'
import HomeView from '../Views/HomeView'
import React from 'react'
import { Route } from 'react-router'
import SearchIcon from '@material-ui/icons/Search'
import SearchView from "../Views/SearchView"

interface IProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

export const linkWidth: number = 240

export const ListItemLink = (props: IProps) => {
  const { icon, primary, to } = props

  const renderLink = React.useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to],
  )

  return (
    <ListItem button component={renderLink}>
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
          <ListItemLink to={homeRoute} primary="Home" icon={<HomeIcon />} />
          <ListItemLink to={graphRoute} primary="Graph" icon={<BarChartIcon />} />
          <ListItemLink to={searchRoute} primary="Search" icon={<SearchIcon />} />
          <ListItemLink to={fileUploadRoute} primary="File Upload" icon={<CloudUploadIcon />} />
          <ListItemLink to={datasetUploadRoute} primary="Dataset Upload" icon={<CloudUploadIcon />} />
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
      <Route path={fileUploadRoute} component={FileUploadView} />
      <Route path={searchRoute} component={SearchView} />
      <Route path={datasetUploadRoute} component={DatasetUploadView} />
    </>
  )
}